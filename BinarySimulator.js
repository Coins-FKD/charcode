(function(){
    "use strict";
    
    var u = {};
    /**
     * derivedClassをbaseClassで継承します。
     * @param derivedClass 継承先としたいクラス。
     * @param baseClass 継承元としたいクラス。
     * @return derivedClass。
     * function inherits(derivedClass:Function, baseClass:Function):Function;
     */
    u.inherits = function(derivedClass, baseClass){
        var emptyConstructor = function(){};
        emptyConstructor.prototype = baseClass.prototype;
        derivedClass.prototype = new emptyConstructor();
        derivedClass.prototype.constructor = derivedClass;
        return derivedClass;
    };
    /**
     * derivedClassの継承元のクラスを返します。
     * @param derivedClass 継承先のクラス。
     * @return 継承元のクラス。
     * function base(derivedClass:Function):Function;
     */
    u.base = function(derivedClass){
        delete(derivedClass.prototype.constructor);
        var baseClass = derivedClass.prototype.constructor;
        derivedClass.prototype.constructor = derivedClass;
        return baseClass;
    };
    /**
     * コンストラクタに可変長引数を渡します。
     * @param constructor コンストラクタ。
     * @param argumentsOfConstructor コンストラクタに渡す引数の配列。
     * @return コンストラクタのインスタンス。
     * function applyConstructor(constructor:Function, argumentsOfConstructor:Array):Object;
     */
    u.applyConstructor = function(constructor, argumentsOfConstructor){
        var emptyConstructor = function(){};
        emptyConstructor.prototype = constructor.prototype;
        var newObject = new emptyConstructor();
        var returnValue = constructor.apply(newObject, argumentsOfConstructor);
        if(typeof(returnValue) == "object" || typeof(returnValue) == "function"){
            return returnValue;
        }else{
            return newObject;
        }
    };
    /**
     * parameterがint型として扱えるかどうかを判定します。
     * @param parameter 判定対象の値。
     * @return parameter parameterがint型として扱えるかどうか。
     * function isInt(parameter:Object):Boolean;
     */
    u.isInt = function(parameter){
        return new Object(parameter) instanceof Number && parameter % 1 == 0 && parameter >> 0 == parameter;
    };
    /**
     * parameterがuint型として扱えるかどうかを判定します。
     * @param parameter 判定対象の値。
     * @return parameter parameterがuint型として扱えるかどうか。
     * function isUInt(parameter:Object):Boolean;
     */
    u.isUInt = function(parameter){
        return new Object(parameter) instanceof Number && parameter % 1 == 0 && parameter >>> 0 == parameter;
    };
    
    var b = {};
    
    /*
    public final class ErrorMessage{
        public static const overload:String;
    }
    */
    b.ErrorMessage = {
        overload: "cannot found the method which matches given arguments"
    };
    /*
    public class Buffer{
        public function Buffer();
        public function Buffer(length:uint);
        public function Buffer(buffer:Array);
        public function Buffer(buffer:Buffer);
        public function get(index:uint):uint;
        public function getLength():uint;
        public function push(...args):uint;
        public function set(index:uint, value:uint):void;
        public function slice(start:int = 0):Buffer;
        public function slice(start:int, end:int):Buffer;
        public override function toString():String;
    }
    */
    b.Buffer = function(){
        this._buffer = [];
        if(arguments.length == 0){
        }else if(arguments.length == 1 && u.isUInt(arguments[0])){
            var size = arguments[0];
            for(var i = 0; i < size; i++){
                this._buffer.push(0);
            }
        }else if(arguments.length == 1 && arguments[0] instanceof Array){
            var array = arguments[0];
            Array.prototype.push.apply(this._buffer, array);
        }else if(arguments.length == 1 && arguments[0] instanceof b.Buffer){
            var buffer = arguments[0];
            Array.prototype.push.apply(this._buffer, buffer._buffer);
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    };
    b.Buffer.prototype.get = function(index){
        if(arguments.length == 1 && u.isUInt(index)){
            return this._buffer[index];
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    };
    b.Buffer.prototype.getLength = function(){
        if(arguments.length == 0){
            return this._buffer.length;
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    };
    b.Buffer.prototype.push = function(){
        return Array.prototype.push.apply(this._buffer, arguments);
    };
    b.Buffer.prototype.set = function(index, value){
        if(arguments.length == 2 && u.isUInt(index) && u.isUInt(value)){
            this._buffer[index] = value;
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    };
    b.Buffer.prototype.slice = function(start, end){
        if(arguments.length == 0 || arguments.length == 1 && u.isInt(start) || arguments.length == 2 && u.isInt(start) && u.isInt(end)){
            return new b.Buffer(Array.prototype.slice.apply(this._buffer, arguments));
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    };
    b.Buffer.prototype.toString = function(){
        if(arguments.length == 0){
            var result = [];
            for(var i = 0, len = this.getLength(); i < len; i++){
                result.push(("0" + this.get(i).toString(16).toUpperCase()).slice(-2));
            }
            return result.join(" ");
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    };
    
    /*
    public class CodePoint{
        public var codedCharacterSet:CodedCharacterSet;

        public function CodePoint(codedCharacterSet:CodedCharacterSet);
    }
    */
    b.CodePoint = function(codedCharacterSet){
        if(this.constructor == b.CodedCharacterSet) throw new Error("accesibility error: this is protected constructor");
        this.codedCharacterSet = codedCharacterSet;
    };
    
    /*
    public function CodedCharacterSet{
        public function CodedCharacterSet();
        public function getCodePoint(params arguments:Array):CodePoint;
    }
    */
    b.CodedCharacterSet = function(){
        this._codePoints = {};
    };
    b.CodedCharacterSet.prototype.getCodePoint = function(){
        var newCodePoint = u.applyConstructor(this.CodePoint, arguments);
        var serializedNewCodePoint = newCodePoint.toString();
        if(this._codePoints[serializedNewCodePoint] === void 0){
            this._codePoints[serializedNewCodePoint] = newCodePoint;
        }
        return this._codePoints[serializedNewCodePoint];
    };
    
    b.CodedCharacterSet["Unicode"] = new b.CodedCharacterSet();
    b.CodedCharacterSet["Unicode"].CodePoint = u.inherits(function(){
        u.base(this.constructor).call(this, b.CodedCharacterSet["Unicode"]);
        if(arguments.length == 1 && new Object(arguments[0]) instanceof Number){
            var integerValue = arguments[0];
            this._integerValue = integerValue;
        }else if(arguments.length == 4 && new Object(arguments[0]) instanceof Number && new Object(arguments[1]) instanceof Number && new Object(arguments[2]) instanceof Number && new Object(arguments[3]) instanceof Number){
            var group = arguments[0], plane = arguments[1], row = arguments[2], cell = arguments[3];
            this._integerValue = group << 6 | plane << 4 | row << 2 | cell << 0;
        }else{
            throw new Error("cannot found the method which matches given parameters");
        }
    }, b.CodePoint);
    b.CodedCharacterSet["Unicode"].CodePoint.prototype.getCell = function(){
        return this._integerValue >>> 0 & 0xff;
    };
    b.CodedCharacterSet["Unicode"].CodePoint.prototype.getGroup = function(){
        return this._integerValue >>> 6 & 0xff;
    };
    b.CodedCharacterSet["Unicode"].CodePoint.prototype.getIntegerValue = function(){
        return this._integerValue;
    };
    b.CodedCharacterSet["Unicode"].CodePoint.prototype.getPlane = function(){
        return this._integerValue >>> 4 & 0xff;
    };
    b.CodedCharacterSet["Unicode"].CodePoint.prototype.getRow = function(){
        return this._integerValue >>> 2 & 0xff;
    };
    b.CodedCharacterSet["Unicode"].CodePoint.prototype.toString = function(){
        var integerValue = this.getIntegerValue().toString(16).toUpperCase();
        if(integerValue.length > 4){
            return "U+" + integerValue;
        }else{
            return "U+" + ("0000" + integerValue).slice(-4);
        }
    };
            
    /*
    public class Encoding{
        public var encode:Function;
        public var decode:Function;
        
        public function Encoding(encode:Function, decode:Function);
        
        public static function getEncoding(name:String):Encoding;
    }
    */
    b.Encoding = function(encode, decode){
        this.encode = encode;
        this.decode = decode;
    };

    b.Encoding.getEncoding = function(){
        
    };
    
    /*
    public class String{
        public var encoding:Encoding;
    
        public function String();
        public function getCodePoints():Array;
    }
    */
    b.String = function(){
    };
    
    new Function("return this")().Fkd = new Function("return this")().Fkd || {};
    Fkd.BinarySimulator = Fkd.BinarySimulator || {};
    for(var key in b){
        if(b.hasOwnProperty(key)){
            Fkd.BinarySimulator[key] = b[key];
        }
    }
    Fkd.Utility = Fkd.Utility || {};
    for(var key in u){
        if(u.hasOwnProperty(key)){
            Fkd.Utility[key] = u[key];
        }
    }
})();

/*
HTtpUtility.PraseQueryString
文字符号化方式

CodedCharacterSet
  Unicode
  JISX
  getCodePoint(unit):CodePoint

CodePoint
  CharacterSet
  plane
  

Encoding
 Encode(String):Buffer
 Decode(Buffer):String
 s GetEncoding()

Buffer内に文字符号化方式の情報を組み込む
句点位置列は概念的な存在であってバイナリじゃ表せないんDA
じゃあお前句点位置列をバイト列に直せるのか？
無理　句点位置列をバイト列に直すのは文字符号化方式の情報が無いと無理だってばよ
じゃあ文字符号化方式の情報を組み込むのか？
String
  _buffer
  _encoding
  getCodePoint()

バイト列→句点位置列は常に成り立つわけじゃないぞ
句点位置列を文字列と定義するのであれば、そしてバイト列に直せることを必須要件とするのであれば絶対に文字符号化方式の情報を内部に組み込むことが必要になってくる



getCodePoint()


String==CodePoint[]
getCodePoint()
*/