(function(){
    "use strict";

    var b = Fkd.BinarySimulator;
    var u = Fkd.Utility;
    var w = new Function("return this")();
    function eq(x, y){
        var xlen = typeof(x.getLength) == "function" ? x.getLength() : x.length;
        var ylen = typeof(y.getLength) == "function" ? y.getLength() : y.length;
        if(xlen != ylen) return false;
        for(var i = 0; i < xlen; i++){
            if(x[i] !== y[i]) return false;
        }
        return true;
    }
    
    (function(){
        var Base = function Base(parameter1){
            this.parameter1 = parameter1;
        };
        var Derived1 = u.inherits(function Derived1(parameter1, parameter2){
            u.base(Derived1).call(this, parameter1);
            this.parameter2 = parameter2;
        }, Base);
        var Derived2 = u.inherits(function Derived2(parameter1, parameter2, parameter3){
            u.base(Derived2).call(this, parameter1, parameter2);
            this.parameter3 = parameter3;
        }, Derived1);
        var a = new Base(1), b = new Derived1(2, 3), c = new Derived2(4, 5, 6);
        if(a.parameter1 === 1 && b.parameter1 === 2 && b.parameter2 === 3 && c.parameter1 === 4 && c.parameter2 === 5 && c.parameter3 === 6){}else{throw new Error();}
        a = new Base(7), b = new Derived1(8, 9), c = new Derived2(10, 11, 12);
        if(a.parameter1 === 7 && b.parameter1 === 8 && b.parameter2 === 9 && c.parameter1 === 10 && c.parameter2 === 11 && c.parameter3 === 12){}else{throw new Error();}
    })();
    (function(){
        function Class(parameter1, parameter2){
            this.parameter1 = parameter1;
            this.parameter2 = parameter2;
        }
        // if(u.applyConstructor(Date, [2001, 1, 1]).getTime() === new Date(2001, 1, 1).getTime()){}else{throw new Error();} [[Class]]でビルトインクラスが動かないので無理
        var a = u.applyConstructor(Class, [1, 2]);
        if(a.parameter1 === 1 && a.parameter2 === 2){}else{throw new Error();}
    })();
    (function(){
        if(u.isInt(void 0) === false){}else{throw new Error();}
        if(u.isInt(null) === false){}else{throw new Error();}
        if(u.isInt({}) === false){}else{throw new Error();}
        if(u.isInt(function(){}) === false){}else{throw new Error();}
        if(u.isInt([]) === false){}else{throw new Error();}
        if(u.isInt(new String("6")) === false){}else{throw new Error();}
        if(u.isInt(new Boolean(true)) === false){}else{throw new Error();}
        if(u.isInt("6") === false){}else{throw new Error();}
        if(u.isInt(true) === false){}else{throw new Error();}
        if(u.isInt(new Number(6)) === true){}else{throw new Error();}
        if(u.isInt(-Math.pow(2, 31) - 1) === false){}else{throw new Error();}
        if(u.isInt(-Math.pow(2, 31)) === true){}else{throw new Error();}
        if(u.isInt(0) === true){}else{throw new Error();}
        if(u.isInt(Math.pow(2, 31) - 1) === true){}else{throw new Error();}
        if(u.isInt(Math.pow(2, 31)) === false){}else{throw new Error();}
        if(u.isInt(0.1) === false){}else{throw new Error();}
        if(u.isInt(Number.NaN) === false){}else{throw new Error();}
    })();
    (function(){
        if(u.isUInt(void 0) === false){}else{throw new Error();}
        if(u.isUInt(null) === false){}else{throw new Error();}
        if(u.isUInt({}) === false){}else{throw new Error();}
        if(u.isUInt(function(){}) === false){}else{throw new Error();}
        if(u.isUInt([]) === false){}else{throw new Error();}
        if(u.isUInt(new String("6")) === false){}else{throw new Error();}
        if(u.isUInt(new Boolean(true)) === false){}else{throw new Error();}
        if(u.isUInt("6") === false){}else{throw new Error();}
        if(u.isUInt(true) === false){}else{throw new Error();}
        if(u.isUInt(new Number(6)) === true){}else{throw new Error();}
        if(u.isUInt(-1) === false){}else{throw new Error();}
        if(u.isUInt(0) === true){}else{throw new Error();}
        if(u.isUInt(Math.pow(2, 32) - 1) === true){}else{throw new Error();}
        if(u.isUInt(Math.pow(2, 32)) === false){}else{throw new Error();}
        if(u.isUInt(0.1) === false){}else{throw new Error();}
        if(u.isUInt(Number.NaN) === false){}else{throw new Error();}
    })();
    (function(){
        if(b.Encoding["UTF-8"].encode([b.CodedCharacterSet["Unicode"].getCodePoint(0x7f)]).toString() == "7F"){}else{throw new Error();}
        if(b.Encoding["UTF-8"].encode([b.CodedCharacterSet["Unicode"].getCodePoint(0x80)]).toString() == "C2 80"){}else{throw new Error();}
        if(b.Encoding["UTF-8"].encode([b.CodedCharacterSet["Unicode"].getCodePoint(0x7ff)]).toString() == "DF BF"){}else{throw new Error();}
        if(b.Encoding["UTF-8"].encode([b.CodedCharacterSet["Unicode"].getCodePoint(0x800)]).toString() == "E0 A0 80"){}else{throw new Error();}
        if(b.Encoding["UTF-8"].encode([b.CodedCharacterSet["Unicode"].getCodePoint(0xffff)]).toString() == "EF BF BF"){}else{throw new Error();}
        if(b.Encoding["UTF-8"].encode([b.CodedCharacterSet["Unicode"].getCodePoint(0x10000)]).toString() == "F0 90 80 80"){}else{throw new Error();}
        if(b.Encoding["UTF-8"].encode([b.CodedCharacterSet["Unicode"].getCodePoint(0x1fffff)]).toString() == "F7 BF BF BF"){}else{throw new Error();}
        if(b.Encoding["UTF-8"].decode(new b.Buffer([0x7f]))[0] == b.CodedCharacterSet["Unicode"].getCodePoint(0x7f)){}else{throw new Error();}
        if(b.Encoding["UTF-8"].decode(new b.Buffer([0xc2, 0x80]))[0] == b.CodedCharacterSet["Unicode"].getCodePoint(0x80)){}else{throw new Error();}
        if(b.Encoding["UTF-8"].decode(new b.Buffer([0xdf, 0xbf]))[0] == b.CodedCharacterSet["Unicode"].getCodePoint(0x7ff)){}else{throw new Error();}
        if(b.Encoding["UTF-8"].decode(new b.Buffer([0xe0, 0xa0, 0x80]))[0] == b.CodedCharacterSet["Unicode"].getCodePoint(0x800)){}else{throw new Error();}
        if(b.Encoding["UTF-8"].decode(new b.Buffer([0xef, 0xbf, 0xbf]))[0] == b.CodedCharacterSet["Unicode"].getCodePoint(0xffff)){}else{throw new Error();}
        if(b.Encoding["UTF-8"].decode(new b.Buffer([0xf0, 0x90, 0x80, 0x80]))[0] == b.CodedCharacterSet["Unicode"].getCodePoint(0x10000)){}else{throw new Error();}
        if(b.Encoding["UTF-8"].decode(new b.Buffer([0xf7, 0xbf, 0xbf, 0xbf]))[0] == b.CodedCharacterSet["Unicode"].getCodePoint(0x1fffff)){}else{throw new Error();}
    })();
    (function(){
        if(b.Encoding["UTF-16"].encode([b.CodedCharacterSet["Unicode"].getCodePoint(0xcdef)]).toString() == "CD EF"){}else{throw new Error();}
        if(b.Encoding["UTF-16"].encode([b.CodedCharacterSet["Unicode"].getCodePoint(0x10000)]).toString() == "D8 00 DC 00"){}else{throw new Error();}
        if(b.Encoding["UTF-16"].encode([b.CodedCharacterSet["Unicode"].getCodePoint(0x10ffff)]).toString() == "DB FF DF FF"){}else{throw new Error();}
        if(b.Encoding["UTF-16"].decode(new b.Buffer([0xcd, 0xef]))[0] == b.CodedCharacterSet["Unicode"].getCodePoint(0xcdef)){}else{throw new Error();}
        if(b.Encoding["UTF-16"].decode(new b.Buffer([0xd8, 0x00, 0xdc, 0x00]))[0] == b.CodedCharacterSet["Unicode"].getCodePoint(0x10000)){}else{throw new Error();}
        if(b.Encoding["UTF-16"].decode(new b.Buffer([0xdb, 0xff, 0xdf, 0xff]))[0] == b.CodedCharacterSet["Unicode"].getCodePoint(0x10ffff)){}else{throw new Error();}
    })();
    (function(){
        if(b.Encoding["EUC-JP"].encode([b.CodedCharacterSet["ASCII"].getCodePoint(0x7f)]).toString() == "7F"){}else{throw new Error();}
        if(b.Encoding["EUC-JP"].encode([b.CodedCharacterSet["ISO/IEC 6429:1992"].getCodePoint(0x80)]).toString() == "80"){}else{throw new Error();}
        if(b.Encoding["EUC-JP"].encode([b.CodedCharacterSet["JIS X 0208:1997"].getCodePoint(1, 2)]).toString() == "A1 A2"){}else{throw new Error();}
        if(b.Encoding["EUC-JP"].encode([b.CodedCharacterSet["JIS X 0201 片仮名"].getCodePoint(0x21)]).toString() == "8E A1"){}else{throw new Error();}
        if(b.Encoding["EUC-JP"].encode([b.CodedCharacterSet["JIS X 0212:1990"].getCodePoint(1, 2)]).toString() == "8F A1 A2"){}else{throw new Error();}
        if(b.Encoding["EUC-JP"].encode([b.CodedCharacterSet["ASCII"].getCodePoint(0x74), b.CodedCharacterSet["ASCII"].getCodePoint(0x65), b.CodedCharacterSet["ASCII"].getCodePoint(0x73), b.CodedCharacterSet["ASCII"].getCodePoint(0x74)]).toString() == "74 65 73 74"){}else{throw new Error();}
        if(b.Encoding["EUC-JP"].encode([b.CodedCharacterSet["JIS X 0208:1997"].getCodePoint(5, 38), b.CodedCharacterSet["JIS X 0208:1997"].getCodePoint(5, 25), b.CodedCharacterSet["JIS X 0208:1997"].getCodePoint(5, 40)]).toString() == "A5 C6 A5 B9 A5 C8"){}else{throw new Error();}
        if(b.Encoding["EUC-JP"].encode([b.CodedCharacterSet["JIS X 0208:1997"].getCodePoint(27, 78), b.CodedCharacterSet["JIS X 0208:1997"].getCodePoint(24, 19)]).toString() == "BB EE B8 B3"){}else{throw new Error();}
        if(b.Encoding["EUC-JP"].decode(new b.Buffer([0x7f]))[0] == b.CodedCharacterSet["ASCII"].getCodePoint(0x7f)){}else{throw new Error();}
        if(b.Encoding["EUC-JP"].decode(new b.Buffer([0x80]))[0] == b.CodedCharacterSet["ISO/IEC 6429:1992"].getCodePoint(0x80)){}else{throw new Error();}
        if(b.Encoding["EUC-JP"].decode(new b.Buffer([0xa1, 0xa2]))[0] == b.CodedCharacterSet["JIS X 0208:1997"].getCodePoint(1, 2)){}else{throw new Error();}
        if(b.Encoding["EUC-JP"].decode(new b.Buffer([0x8e, 0xa1]))[0] == b.CodedCharacterSet["JIS X 0201 片仮名"].getCodePoint(0x21)){}else{throw new Error();}
        if(b.Encoding["EUC-JP"].decode(new b.Buffer([0x8f, 0xa1, 0xa2]))[0] == b.CodedCharacterSet["JIS X 0212:1990"].getCodePoint(1, 2)){}else{throw new Error();}
        if(eq(b.Encoding["EUC-JP"].decode(new b.Buffer([0x74, 0x65, 0x73, 0x74])), [b.CodedCharacterSet["ASCII"].getCodePoint(0x74), b.CodedCharacterSet["ASCII"].getCodePoint(0x65), b.CodedCharacterSet["ASCII"].getCodePoint(0x73), b.CodedCharacterSet["ASCII"].getCodePoint(0x74)])){}else{throw new Error();}
        if(eq(b.Encoding["EUC-JP"].decode(new b.Buffer([0xa5, 0xc6, 0xa5, 0xb9, 0xa5, 0xc8])), [b.CodedCharacterSet["JIS X 0208:1997"].getCodePoint(5, 38), b.CodedCharacterSet["JIS X 0208:1997"].getCodePoint(5, 25), b.CodedCharacterSet["JIS X 0208:1997"].getCodePoint(5, 40)])){}else{throw new Error();}
        if(eq(b.Encoding["EUC-JP"].decode(new b.Buffer([0xbb, 0xee, 0xb8, 0xb3])), [b.CodedCharacterSet["JIS X 0208:1997"].getCodePoint(27, 78), b.CodedCharacterSet["JIS X 0208:1997"].getCodePoint(24, 19)])){}else{throw new Error();}
    })();
    (function(){
        if(b.Encoding["ISO-2022-JP"].encode([b.CodedCharacterSet["ASCII"].getCodePoint(0x7f)]).toString() == "7F"){}else{throw new Error();}
        if(b.Encoding["ISO-2022-JP"].encode([b.CodedCharacterSet["JIS X 0201 ラテン文字"].getCodePoint(0x7f)]).toString() == "1B 28 4A 7F 1B 28 42"){}else{throw new Error();}
        if(b.Encoding["ISO-2022-JP"].encode([b.CodedCharacterSet["JIS X 0208:1978"].getCodePoint(1, 2)]).toString() == "1B 24 40 21 22 1B 28 42"){}else{throw new Error();}
        if(b.Encoding["ISO-2022-JP"].encode([b.CodedCharacterSet["JIS X 0208:1983"].getCodePoint(1, 2)]).toString() == "1B 24 42 21 22 1B 28 42"){}else{throw new Error();}
        if(b.Encoding["ISO-2022-JP"].encode([b.CodedCharacterSet["JIS X 0208:1990"].getCodePoint(84, 5)]).toString() == "1B 24 42 74 25 1B 28 42"){}else{throw new Error();}
        if(b.Encoding["ISO-2022-JP"].encode([b.CodedCharacterSet["ASCII"].getCodePoint(0x74), b.CodedCharacterSet["ASCII"].getCodePoint(0x65), b.CodedCharacterSet["ASCII"].getCodePoint(0x73), b.CodedCharacterSet["ASCII"].getCodePoint(0x74)]).toString() == "74 65 73 74"){}else{throw new Error();}
        if(b.Encoding["ISO-2022-JP"].encode([b.CodedCharacterSet["JIS X 0208:1983"].getCodePoint(5, 38), b.CodedCharacterSet["JIS X 0208:1983"].getCodePoint(5, 25), b.CodedCharacterSet["JIS X 0208:1983"].getCodePoint(5, 40)]).toString() == "1B 24 42 25 46 25 39 25 48 1B 28 42"){}else{throw new Error();}
        if(b.Encoding["ISO-2022-JP"].encode([b.CodedCharacterSet["JIS X 0208:1983"].getCodePoint(27, 78), b.CodedCharacterSet["JIS X 0208:1983"].getCodePoint(24, 19)]).toString() == "1B 24 42 3B 6E 38 33 1B 28 42"){}else{throw new Error();}
        if(eq(b.Encoding["ISO-2022-JP"].decode(new b.Buffer([0x7f])), [b.CodedCharacterSet["ASCII"].getCodePoint(0x7f)])){}else{throw new Error();}
        if(eq(b.Encoding["ISO-2022-JP"].decode(new b.Buffer([0x1b, 0x28, 0x4a, 0x7f, 0x1b, 0x28, 0x42])), [b.CodedCharacterSet["JIS X 0201 ラテン文字"].getCodePoint(0x7f)])){}else{throw new Error();}
        if(eq(b.Encoding["ISO-2022-JP"].decode(new b.Buffer([0x1b, 0x24, 0x40, 0x21, 0x22, 0x1b, 0x28, 0x42])), [b.CodedCharacterSet["JIS X 0208:1978"].getCodePoint(1, 2)])){}else{throw new Error();}
        if(eq(b.Encoding["ISO-2022-JP"].decode(new b.Buffer([0x1b, 0x24, 0x42, 0x21, 0x22, 0x1b, 0x28, 0x42])), [b.CodedCharacterSet["JIS X 0208:1983"].getCodePoint(1, 2)])){}else{throw new Error();}
        if(eq(b.Encoding["ISO-2022-JP"].decode(new b.Buffer([0x1b, 0x24, 0x42, 0x74, 0x25, 0x1b, 0x28, 0x42])), [b.CodedCharacterSet["JIS X 0208:1990"].getCodePoint(84, 5)])){}else{throw new Error();}
        if(eq(b.Encoding["ISO-2022-JP"].decode(new b.Buffer([0x74, 0x65, 0x73, 0x74])), [b.CodedCharacterSet["ASCII"].getCodePoint(0x74), b.CodedCharacterSet["ASCII"].getCodePoint(0x65), b.CodedCharacterSet["ASCII"].getCodePoint(0x73), b.CodedCharacterSet["ASCII"].getCodePoint(0x74)])){}else{throw new Error();}
        if(eq(b.Encoding["ISO-2022-JP"].decode(new b.Buffer([0x1b, 0x24, 0x42, 0x25, 0x46, 0x25, 0x39, 0x25, 0x48, 0x1b, 0x28, 0x42])), [b.CodedCharacterSet["JIS X 0208:1983"].getCodePoint(5, 38), b.CodedCharacterSet["JIS X 0208:1983"].getCodePoint(5, 25), b.CodedCharacterSet["JIS X 0208:1983"].getCodePoint(5, 40)])){}else{throw new Error();}
        if(eq(b.Encoding["ISO-2022-JP"].decode(new b.Buffer([0x1b, 0x24, 0x42, 0x3b, 0x6e, 0x38, 0x33, 0x1b, 0x28, 0x42])), [b.CodedCharacterSet["JIS X 0208:1983"].getCodePoint(27, 78), b.CodedCharacterSet["JIS X 0208:1983"].getCodePoint(24, 19)])){}else{throw new Error();}
    })();
    (function(){
        if(new b.ExtendedString("テスト").getEncoding() == b.Encoding["UTF-8"]){}else{throw new Error();}
        if(new b.ExtendedString("テスト").getBuffer().toString() == "E3 83 86 E3 82 B9 E3 83 88"){}else{throw new Error();}
        if(new b.ExtendedString("テスト").toString() == "テスト"){}else{throw new Error();}
        if(new b.ExtendedString("テスト", b.Encoding["UTF-16"]).getEncoding() == b.Encoding["UTF-16"]){}else{throw new Error();}
        if(new b.ExtendedString("テスト", b.Encoding["UTF-16"]).getBuffer().toString() == "30 C6 30 B9 30 C8"){}else{throw new Error();}
        if(new b.ExtendedString("テスト", b.Encoding["UTF-16"]).toString() == "テスト"){}else{throw new Error();}
        if(new b.ExtendedString("テスト").encode(b.Encoding["UTF-16"]).getEncoding() == b.Encoding["UTF-16"]){}else{throw new Error();}
        if(new b.ExtendedString("テスト").encode(b.Encoding["UTF-16"]).getBuffer().toString() == "30 C6 30 B9 30 C8"){}else{throw new Error();}
        if(new b.ExtendedString("テスト").encode(b.Encoding["UTF-16"]).toString() == "テスト"){}else{throw new Error();}
        if(new b.ExtendedString("テスト", b.Encoding["ISO-2022-JP"]).getBuffer().toString() == "1B 24 42 25 46 25 39 25 48 1B 28 42"){}else{throw new Error();}
        if(new b.ExtendedString("テスト", b.Encoding["ISO-2022-JP"]).toString() == "テスト"){}else{throw new Error();}
        if(new b.ExtendedString("テスト").encode(b.Encoding["ISO-2022-JP"]).getBuffer().toString() == "1B 24 42 25 46 25 39 25 48 1B 28 42"){}else{throw new Error();}
        if(new b.ExtendedString("テスト").encode(b.Encoding["ISO-2022-JP"]).toString() == "テスト"){}else{throw new Error();}
    })();
})();