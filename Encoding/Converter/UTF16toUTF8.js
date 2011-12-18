(function(oldFunction){
    "use strict";
    var b = Fkd.BinarySimulator, u = Fkd.Utility;
    
    b.Encoding.Converter.prototype.convert = function(codePoints){
        if(this._from == b.Encoding["UTF-16"] && this._to == b.Encoding["UTF-8"]){
            return codePoints.slice();
        }else{
            return oldFunction.call(this, codePoints);
        }
    };
})(Fkd.BinarySimulator.Encoding.Converter.prototype.convert);