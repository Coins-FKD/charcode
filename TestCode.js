(function(){
    "use strict";

    var n = Fkd.BinarySimulator;
    var w = new Function("return this")();
    (function(){
        w.now = 0;
        if(n.Encoding["UTF-8"].encode([n.CodedCharacterSet["Unicode"].getCodePoint(0x7f)]).toString() == "7F"){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-8"].encode([n.CodedCharacterSet["Unicode"].getCodePoint(0x80)]).toString() == "C2 80"){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-8"].encode([n.CodedCharacterSet["Unicode"].getCodePoint(0x7ff)]).toString() == "DF BF"){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-8"].encode([n.CodedCharacterSet["Unicode"].getCodePoint(0x800)]).toString() == "E0 A0 80"){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-8"].encode([n.CodedCharacterSet["Unicode"].getCodePoint(0xffff)]).toString() == "EF BF BF"){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-8"].encode([n.CodedCharacterSet["Unicode"].getCodePoint(0x10000)]).toString() == "F0 90 80 80"){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-8"].encode([n.CodedCharacterSet["Unicode"].getCodePoint(0x1fffff)]).toString() == "F7 BF BF BF"){}else{throw new Error();}w.now++;
        w.now = 10;
        if(n.Encoding["UTF-8"].decode(new n.Buffer([0x7f]))[0] == n.CodedCharacterSet["Unicode"].getCodePoint(0x7f)){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-8"].decode(new n.Buffer([0xc2, 0x80]))[0] == n.CodedCharacterSet["Unicode"].getCodePoint(0x80)){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-8"].decode(new n.Buffer([0xdf, 0xbf]))[0] == n.CodedCharacterSet["Unicode"].getCodePoint(0x7ff)){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-8"].decode(new n.Buffer([0xe0, 0xa0, 0x80]))[0] == n.CodedCharacterSet["Unicode"].getCodePoint(0x800)){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-8"].decode(new n.Buffer([0xef, 0xbf, 0xbf]))[0] == n.CodedCharacterSet["Unicode"].getCodePoint(0xffff)){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-8"].decode(new n.Buffer([0xf0, 0x90, 0x80, 0x80]))[0] == n.CodedCharacterSet["Unicode"].getCodePoint(0x10000)){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-8"].decode(new n.Buffer([0xf7, 0xbf, 0xbf, 0xbf]))[0] == n.CodedCharacterSet["Unicode"].getCodePoint(0x1fffff)){}else{throw new Error();}w.now++;
        w.now = 20;
        if(n.Encoding["UTF-16"].encode([n.CodedCharacterSet["Unicode"].getCodePoint(0xcdef)]).toString() == "CD EF"){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-16"].encode([n.CodedCharacterSet["Unicode"].getCodePoint(0x10000)]).toString() == "D8 00 DC 00"){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-16"].encode([n.CodedCharacterSet["Unicode"].getCodePoint(0x10ffff)]).toString() == "DB FF DF FF"){}else{throw new Error();}w.now++;
        w.now = 30;
        if(n.Encoding["UTF-16"].decode(new n.Buffer([0xcd, 0xef]))[0] == n.CodedCharacterSet["Unicode"].getCodePoint(0xcdef)){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-16"].decode(new n.Buffer([0xd8, 0x00, 0xdc, 0x00]))[0] == n.CodedCharacterSet["Unicode"].getCodePoint(0x10000)){}else{throw new Error();}w.now++;
        if(n.Encoding["UTF-16"].decode(new n.Buffer([0xdb, 0xff, 0xdf, 0xff]))[0] == n.CodedCharacterSet["Unicode"].getCodePoint(0x10ffff)){}else{throw new Error();}w.now++;
    })();
})();