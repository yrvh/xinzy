var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);


// 返回
$(".back").click(() => {
    mui.back();
});

$(function() {
    $.post(urlDns + "/control_app/yz/fp/index", {
        pass_app: pass_app,
        tel_app: tel_app,
        code_app: code_app
    }, function(data) {
        console.log(JSON.stringify(data));
        if (data.result == 0) {
            // 需要重新登录
            if (window.plus) {
                goToLogin("../register/login.html");
            } else {
                document.addEventListener('plusready', goToLogin, false);
            }
        } else {
            sessionStorage.setItem("ishave_dw", data.ishave_dw);
            if (data.ishave_dw == 0) {
                // 没有单位业者
                // 允许对发票抬头进行操作
                $(".next").css("display", "block");

            }
            if (data.ishave_dw == 1) {
                // 有单位业者
                // 不显示发票抬头的按钮
                $(".next").css("display", "none");
            }
            $(".noSend").text(data.nosend);
            $(".send").text(data.send);
            $(".waitSend").text(data.waisend);
        }

    });
});
$(".noSubmit").click(() => {
    sessionStorage.setItem("invoiceId", "noSubmit");
    location.href = './invoiceDetailList.html';
});
$(".noExamine").click(() => {
    sessionStorage.setItem("invoiceId", "noExamine");
    location.href = './invoiceDetailList.html';
});
$(".ToBack").click(() => {
    sessionStorage.setItem("invoiceId", "ToBack");
    location.href = './invoiceDetailList.html';
});

var ishave_dw = sessionStorage.getItem("ishave_dw");
console.log(ishave_dw)
    // 要判断用户有无单位以是否显示发票抬头按钮
$(".next").click(() => {
    location.href = "../income/incomeDetail_chooseCom.html";
});