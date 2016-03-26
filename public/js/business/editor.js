/**
 * Created by wd14931 on 2016/3/24.
 */

$("#J-Iframe").load(function(){

    var getNum = function(){
        var num = 1;

        if($('#text-input')[0].value.match(/(\n)/g)){
            num = $('#text-input')[0].value.match(/(\n)/g).length + 1;
        }

        return num;
    };

    var addNumber = function(num){

        var iLen = $('.line_number li').length;

        var bMid = (num + 2) - iLen,
            sLi = '';

        if(bMid > 0){
            for(var i = 1; i < bMid; i++){
                sLi = '<li>'+(iLen + i)+'</li>';
                $('.line_number ul').append(sLi);
            }
        }
    };

    var deleteNumber = function(num){

        var iLen = $('.line_number li').length;

        var bMid = num - iLen;

        if(bMid < 0){
            for(var i = 1; i < (Math.abs(bMid) + 1); i++){
                $('.line_number li:eq(' + ($('.line_number li').length - 1) + ')').remove();
            }
        }
    };

    var initLineNumber = function(){

        var num = getNum();
        var iLen = $('.line_number li').length;

        if(num - iLen > 0)
            addNumber(getNum());
        else
            deleteNumber(getNum());
    };

    initLineNumber();

    var textbox = document.getElementById("text-input");

    function Editor(input, preview) {
        this.update = function () {
            preview.innerHTML = markdown.toHTML(input.value);
        };
        input.editor = this;
        this.update();
    }

    new Editor(textbox, document.getElementById("J-Iframe").contentWindow.document.getElementById('preview'));

    EventUtil.addHandler(textbox, "input", function(event){
        event = EventUtil.getEvent(event);

        this.editor.update();
    });

     EventUtil.addHandler(textbox, "keydown", function(event){
         event = EventUtil.getEvent(event);

         if(event.keyCode === 13){
             addNumber(getNum());
         }else if(event.keyCode === 8){
             deleteNumber(getNum());
         }
     });

    EventUtil.addHandler(textbox, "paste", function(event){
        var event = EventUtil.getEvent(event);
        var text = EventUtil.getClipboardText(event);

        setTimeout(function(){
            addNumber(getNum());
        }, 0);
    });

    EventUtil.addHandler(textbox, "cut", function(event){
        var event = EventUtil.getEvent(event);
        var text = EventUtil.getClipboardText(event);

        setTimeout(function(){
            deleteNumber(getNum());
        }, 0);
    });
});