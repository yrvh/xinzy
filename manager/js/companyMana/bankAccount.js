$(".back").click(() => {
    history.back();
});

var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

var bankId = sessionStorage.getItem('bankId');
console.log("bankId:" + bankId)
$(function() {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/sf/showInfo_step03",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            "card_id": bankId,
            "pass_app": pass_app,
            "tel_app": tel_app,
            "code_app": code_app
        },
        //请求成功
        success: function(data) {
            layer.close(index);
            console.log(JSON.stringify(data));
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../../../page/register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {

                // $(".area_name").text(data.area_name.replace("_", " "));
                $(".organization").text(data.khh);
                $(".name").text(data.kh_name);
                $(".code").text(data.code.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 '));

            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            layer.close(index);
            if (textStatus == 'timeout') {
                getData.abort();　
                alert("请求超时");
            }
            if (textStatus == 'error') {
                getData.abort();　
                alert("请求错误" + errorThrown);
            }
        }
    });
});