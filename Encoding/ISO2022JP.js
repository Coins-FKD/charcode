(function(){
    "use strict";
    var b = Fkd.BinarySimulator, u = Fkd.Utility;
    
    b.Encoding["ISO-2022-JP"] = new b.Encoding(function(codePoints){
        var buffer = new b.Buffer();
        var codedCharacterSet = b.CodedCharacterSet["ASCII"];
        for(var i = 0, len = codePoints.length; i < len; i++){
            // 制御文字
            if((codePoints[i].getCodedCharacterSet() == b.CodedCharacterSet["ASCII"] || codePoints[i].getCodedCharacterSet() == b.CodedCharacterSet["JIS X 0201 ラテン文字"]) && 0x00 <= codePoints[i].getByteValue() && codePoints[i].getByteValue() <= 0x1f){
                if(codePoints[i].getByteValue() == 0x0e){
                    throw new Error("SO cannot be encoded in ISO-2022-JP");
                }
                if(codePoints[i].getByteValue() == 0x0f){
                    throw new Error("SI cannot be encoded in ISO-2022-JP");
                }
                if(codePoints[i].getByteValue() == 0x0e){
                    throw new Error("ESC cannot be encoded in ISO-2022-JP");
                }
                if(codePoints[i].getByteValue() == 0x0d && i + 1 < len && codePoints[i + 1].getByteValue() == 0x0a && !(codedCharacterSet == b.CodedCharacterSet["ASCII"] || codedCharacterSet == b.CodedCharacterSet["JIS X 0201 ラテン文字"])){
                    buffer.push(0x1b, 0x28, 0x42);
                    codedCharacterSet = b.CodedCharacterSet["ASCII"];
                }
                buffer.push(codePoints[i].getByteValue());
            }else{
                switch(codePoints[i].getCodedCharacterSet()){
                    case b.CodedCharacterSet["ASCII"]:
                        if(codedCharacterSet != b.CodedCharacterSet["ASCII"]){
                            buffer.push(0x1b, 0x28, 0x42);
                            codedCharacterSet = b.CodedCharacterSet["ASCII"];
                        }
                        buffer.push(codePoints[i].getByteValue());
                        break;
                    case b.CodedCharacterSet["JIS X 0201 ラテン文字"]:
                        if(codedCharacterSet != b.CodedCharacterSet["JIS X 0201 ラテン文字"]){
                            buffer.push(0x1b, 0x28, 0x4a);
                            codedCharacterSet = b.CodedCharacterSet["JIS X 0201 ラテン文字"];
                        }
                        buffer.push(codePoints[i].getByteValue());
                        break;
                    case b.CodedCharacterSet["JIS X 0208:1978"]:
                        if(codedCharacterSet != b.CodedCharacterSet["JIS X 0208:1978"]){
                            buffer.push(0x1b, 0x24, 0x40);
                            codedCharacterSet = b.CodedCharacterSet["JIS X 0208:1978"];
                        }
                        buffer.push(codePoints[i].getRow() + 0x20, codePoints[i].getCell() + 0x20);
                        break;
                    case b.CodedCharacterSet["JIS X 0208:1983"]:
                    case b.CodedCharacterSet["JIS X 0208:1990"]:
                        if(codedCharacterSet != b.CodedCharacterSet["JIS X 0208:1983"]){
                            buffer.push(0x1b, 0x24, 0x42);
                            codedCharacterSet = b.CodedCharacterSet["JIS X 0208:1983"];
                        }
                        buffer.push(codePoints[i].getRow() + 0x20, codePoints[i].getCell() + 0x20);
                        break;
                }
            }
        }
        if(codedCharacterSet != b.CodedCharacterSet["ASCII"]){
            buffer.push(0x1b, 0x28, 0x42);
        }
        return buffer;
    }, function(buffer){
        var codePoints = [];
        var codedCharacterSet = b.CodedCharacterSet["ASCII"];
        for(var i = 0, len = buffer.getLength(); i < len;){
            var numberOfBufferElements;
            if(buffer.get(i) == 0x1b){
                numberOfBufferElements = 3;
            }else if(0x00 <= buffer.get(i) && buffer.get(i) <= 0x1f || codedCharacterSet == b.CodedCharacterSet["ASCII"] || codedCharacterSet == b.CodedCharacterSet["JIS X 0201 ラテン文字"]){
                numberOfBufferElements = 1;
            }else if(codedCharacterSet == b.CodedCharacterSet["JIS X 0208:1978"] || codedCharacterSet == b.CodedCharacterSet["JIS X 0208:1983"]){
                numberOfBufferElements = 2;
            }

            var bufferForNextCodePoint = buffer.slice(i, i + numberOfBufferElements);
            // 区点位置の途中でバイト列が終わっていたら
            if(bufferForNextCodePoint.getLength() != numberOfBufferElements){
                throw new Error("invalid byte array: lack of byte array");
            }
            if(bufferForNextCodePoint.get(0) != 0x1b){
                // SI, SO, ESC, 80-FFを含んでいたらエラー
                for(var j = 0, len2 = bufferForNextCodePoint.getLength(); j < len2; j++){
                    if(!(0x00 <= bufferForNextCodePoint.get(j) && bufferForNextCodePoint.get(j) <= 0x0d || 0x10 <= bufferForNextCodePoint.get(j) && bufferForNextCodePoint.get(j) <= 0x1a || 0x1c <= bufferForNextCodePoint.get(j) && bufferForNextCodePoint.get(j) <= 0x7f)){
                        throw new Error("invalid byte array: SI, SO, bare ESC and 80-FF must not be used");
                    }
                }
            }
            
            if(bufferForNextCodePoint.get(0) == 0x1b){
                if(bufferForNextCodePoint.get(1) == 0x28 && bufferForNextCodePoint.get(2) == 0x42){
                    codedCharacterSet = b.CodedCharacterSet["ASCII"];
                }else if(bufferForNextCodePoint.get(1) == 0x28 && bufferForNextCodePoint.get(2) == 0x4a){
                    codedCharacterSet = b.CodedCharacterSet["JIS X 0201 ラテン文字"];
                }else if(bufferForNextCodePoint.get(1) == 0x24 && bufferForNextCodePoint.get(2) == 0x40){
                    codedCharacterSet = b.CodedCharacterSet["JIS X 0208:1978"];
                }else if(bufferForNextCodePoint.get(1) == 0x24 && bufferForNextCodePoint.get(2) == 0x42){
                    codedCharacterSet = b.CodedCharacterSet["JIS X 0208:1983"];
                }else{
                    throw new Error("undefined designate");
                }
            }else if(0x00 <= bufferForNextCodePoint.get(0) && bufferForNextCodePoint.get(0) <= 0x1f){
                if(bufferForNextCodePoint.get(0) == 0x0d && i + 2 < buffer.getLength() && buffer.get(i + 2) == 0x0a && !(codedCharacterSet == b.CodedCharacterSet["ASCII"] || codedCharacterSet == b.CodedCharacterSet["JIS X 0201 ラテン文字"])){
                    throw new Error("ASCII or JIS X 0201 LATIN designate must be needed before a new line(CR+LF)");
                }
                codePoints.push(b.CodedCharacterSet["ASCII"].getCodePoint(bufferForNextCodePoint.get(0)));
            }else if(codedCharacterSet == b.CodedCharacterSet["ASCII"] || codedCharacterSet == b.CodedCharacterSet["JIS X 0201 ラテン文字"]){
                codePoints.push(codedCharacterSet.getCodePoint(bufferForNextCodePoint.get(0)));
            }else if(codedCharacterSet == b.CodedCharacterSet["JIS X 0208:1978"] || codedCharacterSet == b.CodedCharacterSet["JIS X 0208:1983"]){
                if(codedCharacterSet == b.CodedCharacterSet["JIS X 0208:1983"] && bufferForNextCodePoint.get(0) - 0x20 == 84 && (bufferForNextCodePoint.get(1) - 0x20 == 5 || bufferForNextCodePoint.get(1) - 0x20 == 6)){
                    codePoints.push(b.CodedCharacterSet["JIS X 0208:1990"].getCodePoint(bufferForNextCodePoint.get(0) - 0x20, bufferForNextCodePoint.get(1) - 0x20));
                }else{
                    codePoints.push(codedCharacterSet.getCodePoint(bufferForNextCodePoint.get(0) - 0x20, bufferForNextCodePoint.get(1) - 0x20));
                }
            }
            i += numberOfBufferElements;
        }
        if(!(codedCharacterSet == b.CodedCharacterSet["ASCII"])){
            throw new Error("ASCII designate must be needed before the end of a string");
        }
        return codePoints;
    });
})();