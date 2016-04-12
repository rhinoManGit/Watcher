/**
 * Created by wd14931 on 2016/3/26.
 */
;void function(){

    $('.J-Sendemail').click(function() {

        $.ajax({
            type: "GET",
            url: "/email",
            //data: {username: $("#username").val(), content: $("#content").val()},
            dataType: "json",
            success: function (data) {
                console.log(data);
            }
        });
    });
}();