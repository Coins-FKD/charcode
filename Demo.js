$(function(){
    "use strict";
    var b = Fkd.BinarySimulator, u = Fkd.Utility;
    
    window.onerror = function(){
        var Wr=[];
        Wr.push("Error:"+arguments[0]);
        Wr.push("File:"+arguments[1]);
        Wr.push("Line:"+arguments[2]);
        alert(Wr.join("\n"));
    };
    function initialize(){
        $("#from_codepoints").empty();
        $("#to_codepoints").empty();
        $("#to_buffer").html("");
    }
    function reload(fromEncoding, toEncoding, fromBuffer){
        var fromCodePoints = fromEncoding.decode(fromBuffer);
        $("#from_codepoints").empty();
        for(var i = 0, len = fromCodePoints.length; i < len; i++){
            var codedCharacterSetName;
            switch(fromCodePoints[i].getCodedCharacterSet()){
                case b.CodedCharacterSet["ASCII"]:
                    codedCharacterSetName = "ASCII";
                    break;
                case b.CodedCharacterSet["JIS X 0201 ラテン文字"]:
                    codedCharacterSetName = "JIS X 0201 ラテン文字";
                    break;
                case b.CodedCharacterSet["JIS X 0208:1978"]:
                    codedCharacterSetName = "JIS X 0208:1978";
                    break;
                case b.CodedCharacterSet["JIS X 0208:1983"]:
                    codedCharacterSetName = "JIS X 0208:1983";
                    break;
                case b.CodedCharacterSet["JIS X 0208:1990"]:
                    codedCharacterSetName = "JIS X 0208:1990";
                    break;
                case b.CodedCharacterSet["Unicode"]:
                    codedCharacterSetName = "Unicode";
                    break;
                default:
                    throw new Error("unknown coded character set");
            }
            $("#from_codepoints").append($("<li>" + codedCharacterSetName + "の" + fromCodePoints[i].toString() + "</li>"));
        }
        
        var toCodePoints = new b.Encoding.Converter(fromEncoding, toEncoding).convert(fromCodePoints);
        $("#to_codepoints").empty();
        for(var i = 0, len = toCodePoints.length; i < len; i++){
            var codedCharacterSetName;
            switch(toCodePoints[i].getCodedCharacterSet()){
                case b.CodedCharacterSet["ASCII"]:
                    codedCharacterSetName = "ASCII";
                    break;
                case b.CodedCharacterSet["JIS X 0201 ラテン文字"]:
                    codedCharacterSetName = "JIS X 0201 ラテン文字";
                    break;
                case b.CodedCharacterSet["JIS X 0208:1978"]:
                    codedCharacterSetName = "JIS X 0208:1978";
                    break;
                case b.CodedCharacterSet["JIS X 0208:1983"]:
                    codedCharacterSetName = "JIS X 0208:1983";
                    break;
                case b.CodedCharacterSet["JIS X 0208:1990"]:
                    codedCharacterSetName = "JIS X 0208:1990";
                    break;
                case b.CodedCharacterSet["Unicode"]:
                    codedCharacterSetName = "Unicode";
                    break;
                default:
                    throw new Error("unknown coded character set");
            }
            $("#to_codepoints").append($("<li>" + codedCharacterSetName + "の" + toCodePoints[i].toString() + "</li>"));
        }
        
        $("#to_buffer").html(toEncoding.encode(toCodePoints).toString())
    }
    
    function from_string(){
        $("#from_buffer").val("");
        initialize();
        var fromEncoding = b.Encoding[$("#from_encoding").val()];
        var toEncoding = b.Encoding[$("#to_encoding").val()];
        var fromString = new b.ExtendedString($("#from_string").val(), fromEncoding);
        var fromBuffer = fromString.getBuffer()
        $("#from_buffer").val(fromBuffer);
        reload(fromEncoding, toEncoding, fromBuffer);
    }
    $("#from_string").blur(from_string);
    $("#from_string").keydown(function(e){
        if(e.keyCode == 13 || e.charCode == 13 || e.which == 13){
            from_string();
        }
    });
    function from_buffer(){
        $("#from_string").val("");
        initialize();
        if(!$("#from_buffer").val().match(/^(?:[0-9A-Fa-f]{2}(?: [0-9A-Fa-f]{2})*)?$/)){
            throw new Error("unknown format");
        }
        var bufferArray = $("#from_buffer").val().split(' ');
        for(var i = 0, len = bufferArray.length; i < len; i++){
            bufferArray[i] = parseInt(bufferArray[i], 16);
        }
        var fromBuffer = new b.Buffer(bufferArray);
        var fromEncoding = b.Encoding[$("#from_encoding").val()];
        var toEncoding = b.Encoding[$("#to_encoding").val()];
        
        var fromString = new b.ExtendedString("", fromEncoding);
        fromString._buffer = fromBuffer;
        $("#from_string").val(fromString.toString());
        
        reload(fromEncoding, toEncoding, fromBuffer);
    }
    $("#from_buffer").blur(from_buffer);
    $("#from_buffer").keydown(function(e){
        if(e.keyCode == 13 || e.charCode == 13 || e.which == 13){
            from_buffer();
        }
    });
    $("#from_encoding").change(function(){
        $("#from_string").blur();
    });
    $("#to_encoding").change(function(){
        $("#from_string").blur();
    });
});
