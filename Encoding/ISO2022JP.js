(function(){
    "use strict";
    var b = Fkd.BinarySimulator, u = Fkd.Utility;
    
    b.Encoding["ISO-2022-JP"] = new b.Encoding(function(codePoints){
        var buffer = new b.Buffer();
        for(var i = 0, len = codePoints.length; i < len; i++){
            switch(codePoints.get(i).CodedCharacterSet){
                case n.CodedCharacterSet["ASCII"]:
                    buffer.push(codePoints[i].getIntegerValue());
                    break;
                case n.CodedCharacterSet["ISO/IEC 6429:1992"]:
                    buffer.push(codePoints[i].getIntegerValue());
                    break;
                case n.CodedCharacterSet["JIS X 0208:1997"]:
                    buffer.push(codePoints[i].getCell() + 0x80, codePoints[i].getRow() + 0x80);
                    break;
                case n.CodedCharacterSet["JIS X 0201 片仮名"]:
                    buffer.push(0x8e, codePoints[i].getIntegerValue() + 0x80);
                    break;
                case n.CodedCharacterSet["JIS X 0212:1990"]:
                    buffer.push(0x8f, codePoints[i].getCell() + 0x80, codePoints[i].getRow + 0x80);
                    break;
            }
        }
        return buffer;
    }, function(buffer){
        var codePoints = [];
        var codedCharacterSet = n.CodedCharacterSet["ASCII"];
        for(var i = 0, len = buffer.getLength(); i < len;){
            var numberOfBufferElements;
            if(buffer.get(i) == 0x1b){
                numberOfBufferElements = 3;
            }else if(0x00 <= buffer.get(i) && buffer.get(i) <= 0x1f || codedCharacterSet == n.CodedCharacterSet["ASCII"] || codedCharacterSet == n.CodedCharacterSet["JIS X 0201 ラテン文字"]){
                numberOfBufferElements = 1;
            }else if(codedCharacterSet == n.CodedCharacterSet["JIS X 0208:1978"] || codedCharacterSet == n.CodedCharacterSet["JIS X 0208:1983"]){
                numberOfBufferElements = 2;
            }else{
                throw new Error("invalid byte array: 80-FF must not be used");
            }

            var bufferForNextCodePoint = buffer.slice(i, i + numberOfBufferElements);
            // 区点位置の途中でバイト列が終わっていたら
            if(bufferForNextCodePoint.getLength() != numberOfBufferElements){
                throw new Error("invalid byte array: lack of byte array");
            }
            
            if(bufferForNextCodePoint.get(0) == 0x1b){
                if(bufferForNextCodePoint.get(1) == 0x28 && bufferForNextCodePoint.get(2) == 0x42){
                    codedCharacterSet = n.CodedCharacterSet["ASCII"];
                }else if(bufferForNextCodePoint.get(1) == 0x28 && bufferForNextCodePoint.get(2) == 0x4a){
                    codedCharacterSet = n.CodedCharacterSet["JIS X 0201 ラテン文字"];
                }else if(bufferForNextCodePoint.get(1) == 0x24 && bufferForNextCodePoint.get(2) == 0x40){
                    codedCharacterSet = n.CodedCharacterSet["JIS X 0208:1978"];
                }else if(bufferForNextCodePoint.get(1) == 0x24 && bufferForNextCodePoint.get(2) == 0x42){
                    codedCharacterSet = n.CodedCharacterSet["JIS X 0208:1983"];
                }else{
                    throw new Error("undefined designate");
                }
            }else if(0x00 <= bufferForNextCodePoint.get(0) && bufferForNextCodePoint.get(0) <= 0x1f){
                codePoints.push(n.CodedCharacterSet["ASCII"].getCodePoint(bufferForNextCodePoint.get(0)));
            }else if(codedCharacterSet == n.CodedCharacterSet["ASCII"] || codedCharacterSet == n.CodedCharacterSet["JIS X 0201 ラテン文字"]){
                codePoints.push(codedCharacterSet.getCodePoint(bufferForNextCodePoint.get(0)));
            }else if(codedCharacterSet == n.CodedCharacterSet["JIS X 0208:1978"] || n.CodedCharacterSet["JIS X 0208:1983"]){
                codePoints.push(codedCharacterSet.getCodePoint(bufferForNextCodePoint.get(0) - 0x80, bufferForNextCodePoint.get(1) - 0x80));
            }
            i += numberOfBufferElements;
        }
        return codePoints;
    });
})();