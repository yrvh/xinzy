// 返回
$(".back").click(() => {
    mui.back();
});



var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

$(function() {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/sf/index",
        type: 'post',
        dataType: "json",
        data: {
            "pass_app": pass_app,
            "tel_app": tel_app,
            "code_app": code_app
        },
        timeout: 120000, //2分钟超时
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

                $(".waitCheck").text(data.waitcheck);
                $(".pass").text(data.pass);
                $(".toBack").text(data.checkback);
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

// 待审核
$(".inServiceBox").click(() => {
    location.href = "./companyManaList_wait.html";
});

// 审核通过
$(".inRegisterBox").click(() => {
    location.href = "./companyManaList_pass.html";
});

// 审核退回
$(".notUseBox").click(() => {
    location.href = "./companyManaList_toBack.html";
});