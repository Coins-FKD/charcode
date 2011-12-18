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
        // 注: ビルトインクラスがconstructorに来ると動かない（[[Class]]のため）
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
        public static const accessProtected:String;
        public static const notImplemented:String;
    }
    */
    b.ErrorMessage = {
        accessProtected: "accesibility error: this is protected constructor",
        notImplemented: "not implemented",
        outOfRange: (function(){
            function a(message){
                return a.toString(message);
            }
            a.toString = function(message){
                return "out of range" + (message === void 0 ? "" : ": " + message);
            };
            return a;
        })(),
        overload: "cannot found the method which matches given parameters"
    };
    /*
    public class Buffer{
        public function Buffer();
        public function Buffer(size:uint);
        public function Buffer(array:Array);
        public function Buffer(buffer:Buffer);
        
        public function get(index:uint):uint;
        public function getLength():uint;
        public function push(...args):uint;
        public function set(index:uint, value:uint):void;
        public function slice():Buffer;
        public function slice(start:int):Buffer;
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
            if(!(0 <= index && index < this.getLength())) throw new Error(b.ErrorMessage.outOfRange("index"));
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
        var originalLength = this.getLength();
        try{
            this._buffer.length += arguments.length;
            for(var i = 0, len = arguments.length; i < len; i++){
                this.set(originalLength + i, arguments[i]);
            }
        }catch(e){
            this._buffer.length = originalLength;
            throw e;
        }
        return this._buffer.length;
    };
    b.Buffer.prototype.set = function(index, value){
        if(arguments.length == 2 && u.isUInt(index) && u.isUInt(value)){
            if(!(0 <= index && index < this.getLength())) throw new Error(b.ErrorMessage.outOfRange("index"));
            if(!(0x00 <= value && value <= 0xff)) throw new Error(b.ErrorMessage.outOfRange("value"));
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
        protected function CodePoint(codedCharacterSet:CodedCharacterSet);
        
        public function getCodedCharacterSet():CodedCharacterSet;
        public override function toString():String; // 実装必須
    }
    */
    b.CodePoint = function(codedCharacterSet){
        if(this.constructor == b.CodePoint) throw new Error(b.ErrorMessage.accessProtected);
        if(arguments.length == 1 && codedCharacterSet instanceof b.CodedCharacterSet){
            this._codedCharacterSet = codedCharacterSet;
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    };
    b.CodePoint.prototype.getCodedCharacterSet = function(){
        return this._codedCharacterSet;
    };
    b.CodePoint.prototype.toString = function(){
        throw new Error(b.ErrorMessage.notImplemented);
    };
    
    /*
    public class CodedCharacterSet{
        public var CodePoint:Function; // CodePointの派生クラス

        public function CodedCharacterSet();
        
        public function getCodePoint(...args):CodePoint;
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

    /*
    public class Encoding{
        public var encode:Function;
        public var decode:Function;
        
        public function Encoding(encode:Function, decode:Function);
        
        public static function getEncoding(name:String):Encoding;
        
        public class Converter{
            public function Converter(from:Encoding, to:Encoding);
            
            public function convert(codePoints:Array):Array; // CodePoint[]->CodePoint[]
        }
    }
    */
    b.Encoding = function(encode, decode){
        if(arguments.length == 2 && typeof(encode) == "function" && typeof(decode) == "function"){
            this.encode = encode;
            this.decode = decode;
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    };
    b.Encoding.getEncoding = function(){
        if(arguments.length == 0 && new Object(arguments[0]) instanceof String){
            throw new Error(b.ErrorMessage.notImplemented);
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    };
    b.Encoding.Converter = function(from, to){
        if(arguments.length == 2 && from instanceof b.Encoding && to instanceof b.Encoding){
            this._from = from;
            this._to = to;
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    };
    b.Encoding.Converter.prototype.convert = function(codePoints){
        if(this._from == this._to){
            return codePoints.slice();
        }
        throw new Error("unsupported conversion");
    };
    
    /*
    public class ExtendedString{
        public function ExtendedString(value:String);
        public function ExtendedString(value:String, encoding:Encoding);
        
        public function encode(to:Encoding):ExtendedString;
        public function getEncoding():Encoding;
        public override function toString():String;
    }
    */
    b.ExtendedString = function(value, encoding){
        if((arguments.length == 1 && new Object(value) instanceof String) || (arguments.length == 2 && new Object(value) instanceof String && encoding instanceof b.Encoding)){
            if(encoding === void 0) encoding = b.Encoding["UTF-8"];
            var bufferArray = [];
            for(var i = 0, len = value.length; i < len; i++){
                bufferArray.push(value.charCodeAt(i) >>> 8, value.charCodeAt(i) & 0xff);
            }
            this._buffer = encoding.encode(b.Encoding["UTF-16"].decode(new b.Buffer(bufferArray)));
            this._encoding = encoding;
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    };
    b.ExtendedString.prototype.encode = function(to){
        if(arguments.length == 1 && to instanceof b.Encoding){
            var extendedString = new b.ExtendedString("", to);
            extendedString._buffer = to.encode(new b.Encoding.Converter(this.getEncoding(), to).convert(this.getEncoding().decode(this._buffer)));
            return extendedString;
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    };
    b.ExtendedString.prototype.getEncoding = function(){
        if(arguments.length == 0){
            return this._encoding;
        }else{
            throw new Error(b.ErrorMessage.overload);
        }
    };
    b.ExtendedString.prototype.toString = function(){
        var buffer = b.Encoding["UTF-16"].encode(new b.Encoding.Converter(this.getEncoding(), b.Encoding["UTF-16"]).convert(this.getEncoding().decode(this._buffer)));
        var result = [];
        for(var i = 0, len = buffer.getLength(); i < len; i+=2){
            result.push(String.fromCharCode(buffer.get(i) << 8 | buffer.get(i + 1)));
        }
        return result.join("");
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