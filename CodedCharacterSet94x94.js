// 現在未使用
(function(){
    "use strict";
    var b = Fkd.BinarySimulator, u = Fkd.Utility;
    
    var codedCharacterSet = b.CodedCharacterSet94x94 = u.inherits(function(){
        u.base(codedCharacterSet).call(this);
    }, b.CodedCharacterSet);
    codedCharacterSet.prototype.CodePoint = u.inherits(function(){
        u.base(codedCharacterSet.prototype.CodePoint).call(this, codedCharacterSet);
        if(arguments.length == 2 && u.isUInt(arguments[0]) && u.isUInt(arguments[1])){
            var row = arguments[0], cell = arguments[1];
            if(!(0x01 <= row && row <= 0xfe)) throw new Error("out of range: row");
            if(!(0x01 <= cell && cell <= 0xfe)) throw new Error("out of range: cell");
            this._row = row;
            this._cell = cell;
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    }, b.CodePoint);
    codedCharacterSet.prototype.CodePoint.prototype.getCell = function(){
        return this._cell;
    };
    codedCharacterSet.prototype.CodePoint.prototype.getRow = function(){
        return this._row;
    };
    codedCharacterSet.prototype.CodePoint.prototype.toString = function(){
        return this.getCell() + "-" + this.getRow();
    };
})();