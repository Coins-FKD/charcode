(function(){
    "use strict";
    var b = Fkd.BinarySimulator, u = Fkd.Utility;
    
    var codedCharacterSet = b.CodedCharacterSet["ISO/IEC 6429:1992"] = new b.CodedCharacterSet();
    codedCharacterSet.CodePoint = u.inherits(function(){
        u.base(codedCharacterSet.CodePoint).call(this, codedCharacterSet);
        if(arguments.length == 1 && new Object(arguments[0]) instanceof Number){
            var byteValue = arguments[0];
            this._byteValue = byteValue;
        }else if(arguments.length == 2 && new Object(arguments[0]) instanceof Number && new Object(arguments[1]) instanceof Number){
            var column = arguments[0], row = argumnts[1];
            this._byteValue = column << 4 | row;
        }else{
            throw new Error("cannot found the method which matches given parameters");
        }
    }, b.CodePoint);
    codedCharacterSet.getByteValue = function(){
        return this._byteValue;
    };
    codedCharacterSet.getColumn = function(){
        return this._byteValue >> 4;
    };
    codedCharacterSet.getRow = function(){
        return this._byteValue & 0xff;
    };
    codedCharacterSet.toString = function(){
        return this.getColumn() + "/" + this.getRow();
    };
})();