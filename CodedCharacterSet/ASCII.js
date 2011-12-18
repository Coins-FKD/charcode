(function(){
    "use strict";
    var b = Fkd.BinarySimulator, u = Fkd.Utility;
    
    var codedCharacterSet = b.CodedCharacterSet["ASCII"] = new b.CodedCharacterSet();
    codedCharacterSet.CodePoint = u.inherits(function(){
        u.base(codedCharacterSet.CodePoint).call(this, codedCharacterSet);
        if(arguments.length == 1 && u.isUInt(arguments[0])){
            var byteValue = arguments[0];
            this._byteValue = byteValue;
        }else if(arguments.length == 2 && u.isUInt(arguments[0]) && u.isUInt(arguments[1])){
            var column = arguments[0], row = arguments[1];
            this._byteValue = column << 4 | row;
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    }, b.CodePoint);
    codedCharacterSet.CodePoint.prototype.getByteValue = function(){
        return this._byteValue;
    };
    codedCharacterSet.CodePoint.prototype.getColumn = function(){
        return this._byteValue >> 4;
    };
    codedCharacterSet.CodePoint.prototype.getRow = function(){
        return this._byteValue & 0xf;
    };
    codedCharacterSet.CodePoint.prototype.toString = function(){
        return this.getColumn() + "/" + this.getRow();
    };
})();