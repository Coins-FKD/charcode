(function(){
    "use strict";
    var b = Fkd.BinarySimulator, u = Fkd.Utility;
    
    b.Encoding["EUC-JP"] = new b.Encoding(function(codePoints){
        var buffer = new b.Buffer();
        for(var i = 0, len = codePoints.length; i < len; i++){
            switch(codePoints[i].getCodedCharacterSet()){
                case b.CodedCharacterSet["ASCII"]:
                    buffer.push(codePoints[i].getByteValue());
                    break;
                case b.CodedCharacterSet["ISO/IEC 6429:1992"]:
                    buffer.push(codePoints[i].getByteValue());
                    break;
                case b.CodedCharacterSet["JIS X 0208:1997"]:
                    buffer.push(codePoints[i].getRow() + 0xa0, codePoints[i].getCell() + 0xa0);
                    break;
                case b.CodedCharacterSet["JIS X 0201 片仮名"]:
                    buffer.push(0x8e, codePoints[i].getByteValue() + 0x80);
                    break;
                case b.CodedCharacterSet["JIS X 0212:1990"]:
                    buffer.push(0x8f, codePoints[i].getRow() + 0xa0, codePoints[i].getCell() + 0xa0);
                    break;
            }
        }
        return buffer;
    }, function(buffer){
        var codePoints = [];
        for(var i = 0, len = buffer.getLength(); i < len;){
            var numberOfBufferElements;
            // ASCII
            if(buffer.get(i) == 0xa0 || buffer.get(i) == 0xff){
                throw new Error("invalid byte array: first byte must not be A0 or FF");
            }else if(0x00 <= buffer.get(i) && buffer.get(i) <= 0x8d || 0x90 <= buffer.get(i) && buffer.get(i) <= 0x9f){
                numberOfBufferElements = 1;
            }else if(buffer.get(i) == 0x8e || 0xa1 <= buffer.get(i) && buffer.get(i) <= 0xfe){
                numberOfBufferElements = 2;
            }else if(buffer.get(i) == 0x8f){
                numberOfBufferElements = 3;
            }
            
            var bufferForNextCodePoint = buffer.slice(i, i + numberOfBufferElements);
            // 区点位置の途中でバイト列が終わっていたら
            if(bufferForNextCodePoint.getLength() != numberOfBufferElements){
                throw new Error("invalid byte array: lack of byte array");
            }
                        
            switch(numberOfBufferElements){
                case 1:
                    if(0x00 <= bufferForNextCodePoint.get(0) && bufferForNextCodePoint.get(0) <= 0x7f){
                        codePoints.push(b.CodedCharacterSet["ASCII"].getCodePoint(bufferForNextCodePoint.get(0)));
                    }else if(0x80 <= bufferForNextCodePoint.get(0) && bufferForNextCodePoint.get(0) <= 0x8d || 0x90 <= bufferForNextCodePoint.get(0) && bufferForNextCodePoint.get(0) <= 0x9f){
                        codePoints.push(b.CodedCharacterSet["ISO/IEC 6429:1992"].getCodePoint(bufferForNextCodePoint.get(0)));
                    }
                    break;
                case 2:
                    if(0xa1 <= bufferForNextCodePoint.get(0) && bufferForNextCodePoint.get(0) <= 0xfe){
                        if(!(0xa1 <= bufferForNextCodePoint.get(1) && bufferForNextCodePoint.get(1) <= 0xfe)){
                            throw new Error("invalid byte array: second byte must be A1-FE when the bytes represent JIS X 0208's code point");
                        }
                        codePoints.push(b.CodedCharacterSet["JIS X 0208:1997"].getCodePoint(bufferForNextCodePoint.get(0) - 0xa0, bufferForNextCodePoint.get(1) - 0xa0));
                    }else if(bufferForNextCodePoint.get(0) == 0x8e){
                        if(!(0xa1 <= bufferForNextCodePoint.get(1) && bufferForNextCodePoint.get(1) <= 0xdf)){
                            throw new Error("invalid byte array: second byte must be A1-DF when the bytes represent JIS X 0201 KATAKANA's code point");
                        }
                        codePoints.push(b.CodedCharacterSet["JIS X 0201 片仮名"].getCodePoint(bufferForNextCodePoint.get(1) - 0x80));
                    }
                    break;
                case 3:
                    if(!(0xa1 <= bufferForNextCodePoint.get(1) && bufferForNextCodePoint.get(1) <= 0xfe)){
                        throw new Error("invalid byte array: second byte must be A1-FE when the bytes represent JIS X 0212's code point");
                    }
                    if(!(0xa1 <= bufferForNextCodePoint.get(2) && bufferForNextCodePoint.get(2) <= 0xfe)){
                        throw new Error("invalid byte array: third byte must be A1-FE when the bytes represent JIS X 0212's code point");
                    }
                    codePoints.push(b.CodedCharacterSet["JIS X 0212:1990"].getCodePoint(bufferForNextCodePoint.get(1) - 0xa0, bufferForNextCodePoint.get(2) - 0xa0));
                    break;
            }
            i += numberOfBufferElements;
        }
        return codePoints;
    });
})();