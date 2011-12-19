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
            if(!(
                row == 1 ||
                row == 2 && (
                    1 <= cell && cell <= 14 ||
                    26 <= cell && cell <= 33 ||
                    42 <= cell && cell <= 48 ||
                    60 <= cell && cell <= 74 ||
                    82 <= cell && cell <= 89 ||
                    cell == 94
                ) ||
                row == 3 && (
                    16 <= cell && cell <= 25 ||
                    33 <= cell && cell <= 58 ||
                    65 <= cell && cell <= 90
                ) ||
                row == 4 && (
                    1 <= cell && cell <= 83
                ) ||
                row == 5 && (
                    1 <= cell && cell <= 86
                ) ||
                row == 6 && (
                    1 <= cell && cell <= 24 ||
                    33 <= cell && cell <= 56
                ) ||
                row == 7 && (
                    1 <= cell && cell <= 33 ||
                    49 <= cell && cell <= 81
                ) ||
                row == 8 && (
                    1 <= cell && cell <= 32
                ) ||
                (16 <= row && row <= 46) ||
                row == 47 && (
                    1 <= cell && cell <= 51
                ) ||
                (48 <= row && row <= 83) ||
                row == 84 && (
                    1 <= cell && cell <= 6
                )
            )){
                throw new Error("undefined code point");
            }
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