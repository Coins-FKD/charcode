(function(){
    "use strict";
    var b = Fkd.BinarySimulator, u = Fkd.Utility;
    
    b.Encoding["UTF-8"] = new b.Encoding(function(codePoints){
        var buffer = new b.Buffer();
        for(var i = 0, len = codePoints.length; i < len; i++){
            if(0x0000 <= codePoints[i].getIntegerValue() && codePoints[i].getIntegerValue() <= 0x007f){
                buffer.push(codePoints[i].getIntegerValue());
            }else if(0x0080 <= codePoints[i].getIntegerValue() && codePoints[i].getIntegerValue() <= 0x07ff){
                buffer.push((codePoints[i].getIntegerValue() >>> 6) + 0xc0, (codePoints[i].getIntegerValue() & 0x3f) + 0x80);
            }else if(0x0800 <= codePoints[i].getIntegerValue() && codePoints[i].getIntegerValue() <= 0xffff){
                buffer.push((codePoints[i].getIntegerValue() >>> 12) + 0xe0, (codePoints[i].getIntegerValue() >>> 6 & 0x3f) + 0x80, (codePoints[i].getIntegerValue() & 0x3f) + 0x80);
            }else if(0x10000 <= codePoints[i].getIntegerValue() && codePoints[i].getIntegerValue() <= 0x1fffff){
                buffer.push((codePoints[i].getIntegerValue() >>> 18) + 0xf0, (codePoints[i].getIntegerValue() >>> 12 & 0x3f) + 0x80, (codePoints[i].getIntegerValue() >>> 6 & 0x3f) + 0x80, (codePoints[i].getIntegerValue() & 0x3f) + 0x80);
            }else{
                throw new Error("invalid code point");
            }
        }
        return buffer;
    }, function(buffer){
        var codePoints = [];
        for(var i = 0, len = buffer.length(); i < len;){
            var numberOfBufferElements;
            if(0x00 <= buffer.get(i) && buffer.get(i) <= 0x7f){
                numberOfBufferElements = 1;
            }else if(0xc2 <= buffer.get(i) && buffer.get(i) <= 0xdf){
                numberOfBufferElements = 2;
            }else if(0xe0 <= buffer.get(i) && buffer.get(i) <= 0xef){
                numberOfBufferElements = 3;
            }else if(0xf0 <= buffer.get(i) && buffer.get(i) <= 0xf7){
                numberOfBufferElements = 4;
            }else{
                throw new Error("invalid byte array");
            }
            var bufferForNextCodePoint = buffer.slice(i, i + numberOfBufferElements);
            // 区点位置の途中でバイト列が終わっていたら
            if(bufferForNextCodePoint.length() != numberOfBufferElements){
                throw new Error("invalid byte array");
            }
            // 2つ目以降の区点位置が80-BF内にあるか
            for(var j = 1, len2 = bufferForNextCodePoint.length(); j < len2; j++){
                if(!(0x80 <= bufferForNextCodePoint.get(j) && bufferForNextCodePoint.get(j) <= 0xbf)){
                    throw new Error("invalid byte array");
                }
            }
            var integerValue;
            switch(numberOfBufferElements){
                case 1:
                    integerValue = bufferForNextCodePoint.get(0) & 0x7f;
                    if(!(0x00 <= integerValue && integerValue <= 0x7f)){
                        throw new Error("invalid byte array");
                    }
                    break;
                case 2:
                    integerValue = bufferForNextCodePoint.get(0) << 6 & 0x7c0 | bufferForNextCodePoint.get(1) << 0 & 0x3f;
                    if(!(0x80 <= integerValue && integerValue <= 0x7ff)){
                        throw new Error("invalid byte array");
                    }
                    break;
                case 3:
                    integerValue = bufferForNextCodePoint.get(0) << 12 & 0xf000 | bufferForNextCodePoint.get(1) << 6 & 0xfc0 | bufferForNextCodePoint.get(2) << 0 & 0x3f;
                    if(!(0x800 <= integerValue && integerValue <= 0xffff)){
                        throw new Error("invalid byte array");
                    }
                    break;
                case 4:
                    integerValue = bufferForNextCodePoint.get(0) << 18 & 0x1c0000 | bufferForNextCodePoint.get(1) << 12 & 0x3f000 | bufferForNextCodePoint.get(2) << 6 & 0xfc0 | bufferForNextCodePoint.get(3) << 0 & 0x3f;
                    if(!(0x10000 <= integerValue && integerValue <= 0x1fffff)){
                        throw new Error("invalid byte array");
                    }
                    break;
            }
            codePoints.push(b.CodedCharacterSet["Unicode"].getCodePoint(integerValue));
            i += numberOfBufferElements;
        }
        return codePoints;
    });
})();