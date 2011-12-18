(function(){
    "use strict";
    var b = Fkd.BinarySimulator, u = Fkd.Utility;
    
    b.Encoding["UTF-16"] = new b.Encoding(function(codePoints){
        var buffer = new b.Buffer();
        for(var i = 0, len = codePoints.length; i < len; i++){
            // サロゲートペア
            if(0xffff < codePoints[i].getIntegerValue()){
                buffer.push(codePoints[i].getIntegerValue() - 0x10000 >> 18 & 0x3 | 0xd8, codePoints[i].getIntegerValue() - 0x10000 >> 10 & 0xff, codePoints[i].getIntegerValue() >> 8 & 0x3 | 0xdc, codePoints[i].getIntegerValue() & 0xff);
            }else{
                buffer.push(codePoints[i].getIntegerValue() >> 8 & 0xff, codePoints[i].getIntegerValue() & 0xff);
            }
        }
        return buffer;
    }, function(buffer){
        var codePoints = [];
        for(var i = 0, len = buffer.getLength(); i < len;){
            if(i + 1 >= len){
                throw new Error("invalid byte array");
            }
            var highSurrogateCodePoint = buffer.get(i) << 8 | buffer.get(i + 1);
            if(0xd800 <= highSurrogateCodePoint && highSurrogateCodePoint <= 0xdbff){
                if(i + 2 >= len){
                    throw new Error("invalid byte array");
                }
                var lowSurrogateCodePoint = buffer.get(i + 2) << 8 | buffer.get(i + 3);
                if(0xdc00 <= lowSurrogateCodePoint && lowSurrogateCodePoint <= 0xdfff){
                    codePoints.push(b.CodedCharacterSet["Unicode"].getCodePoint((highSurrogateCodePoint - 0xd800 << 10) + (lowSurrogateCodePoint - 0xdc00) + 0x10000));
                    i += 4;
                }else{
                    throw new Error("invalid byte array");
                }
            }else if(0xdc00 <= highSurrogateCodePoint && highSurrogateCodePoint <= 0xdfff){
                throw new Error("invalid byte array");
            }else{
                codePoints.push(b.CodedCharacterSet["Unicode"].getCodePoint(highSurrogateCodePoint));
                i += 2;
            }
        }
        return codePoints;
    });
})();