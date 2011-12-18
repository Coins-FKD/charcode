(function(){
    "use strict";
    var b = Fkd.BinarySimulator, u = Fkd.Utility;
    
    var codedCharacterSet = b.CodedCharacterSet["JIS X 0208:1997"] = new b.CodedCharacterSet();
    codedCharacterSet.CodePoint = u.inherits(function(){
        u.base(codedCharacterSet.CodePoint).call(this, codedCharacterSet);
        if(arguments.length == 2 && u.isUInt(arguments[0]) && u.isUInt(arguments[1])){
            var row = arguments[0], cell = arguments[1];
            if(!(1 <= row && row <= 94)) throw new Error("out of range: row");
            if(!(1 <= cell && cell <= 94)) throw new Error("out of range: cell");
            this._row = row;
            this._cell = cell;
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    }, b.CodePoint);
    codedCharacterSet.CodePoint.prototype.getCell = function(){
        return this._cell;
    };
    codedCharacterSet.CodePoint.prototype.getRow = function(){
        return this._row;
    };
    codedCharacterSet.CodePoint.prototype.toString = function(){
        return this.getCell() + "-" + this.getRow();
    };
})();