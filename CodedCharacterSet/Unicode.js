(function(){
    "use strict";
    var b = Fkd.BinarySimulator, u = Fkd.Utility;
    
    var codedCharacterSet = b.CodedCharacterSet["Unicode"] = new b.CodedCharacterSet();
    codedCharacterSet.CodePoint = u.inherits(function(){
        u.base(codedCharacterSet.CodePoint).call(this, codedCharacterSet);
        if(arguments.length == 1 && u.isUInt(arguments[0])){
            var integerValue = arguments[0];
            this._integerValue = integerValue;
        }else if(arguments.length == 4 && u.isUInt(arguments[0]) && u.isUInt(arguments[1]) && u.isUInt(arguments[2]) && u.isUInt(arguments[3])){
            var group = arguments[0], plane = arguments[1], row = arguments[2], cell = arguments[3];
            this._integerValue = group << 6 | plane << 4 | row << 2 | cell << 0;
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    }, b.CodePoint);
    codedCharacterSet.CodePoint.prototype.getCell = function(){
        return this._integerValue >>> 0 & 0xff;
    };
    codedCharacterSet.CodePoint.prototype.getGroup = function(){
        return this._integerValue >>> 6 & 0xff;
    };
    codedCharacterSet.CodePoint.prototype.getIntegerValue = function(){
        return this._integerValue;
    };
    codedCharacterSet.CodePoint.prototype.getPlane = function(){
        return this._integerValue >>> 4 & 0xff;
    };
    codedCharacterSet.CodePoint.prototype.getRow = function(){
        return this._integerValue >>> 2 & 0xff;
    };
    codedCharacterSet.CodePoint.prototype.toString = function(){
        var integerValue = this.getIntegerValue().toString(16).toUpperCase();
        if(integerValue.length > 4){
            return "U+" + integerValue;
        }else{
            return "U+" + ("0000" + integerValue).slice(-4);
        }
    };
})();