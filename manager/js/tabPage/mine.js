mui.init();

var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
console.log("tel_app：" + tel_app);
console.log("pass_app：" + pass_app);

// 请求用户名和手机号
$(function() {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });


    var getData = $.ajax({
        url: urlDns + "/control_app/ms/info/index",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            "pass_app": pass_app,
            "tel_app": tel_app,
            "code_app": code_app
        },
        //请求成功
        success: function(data) {
            console.log(JSON.stringify(data));
            layer.close(index);
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../../../page/register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                $(".userName").text(data.username);
                $(".tel").text(data.tel);
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

// 公司信息
$(".comInfo").click(() => {
    mui.openWindow('../mine/com_info.html');
});

// 账户信息
$(".accountInfo").click(() => {
    mui.openWindow('../mine/account_info.html');
});

// 设置
$(".changePwd").click(() => {
    mui.openWindow('../mine/setting.html');
});