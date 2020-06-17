var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

// 返回
$(".back").click(() => {
    history.back();
});


// 请求数据
$.get(urlDns + "/control_app/hhr/fp/index", {
    pass_app: pass_app,
    tel_app: tel_app,
    code_app: code_app
}, function(data) {
    console.log(JSON.stringify(data));
    if (data.result == 0) {
        // 需要重新登录
        if (window.plus) {
            goToLogin("../../register/login.html");
        } else {
            document.addEventListener('plusready', goToLogin, false);
        }
    } else {
        // 单位录入
        $(".noSubmitNum").text(data.wss_size);
        $(".noExamineNum").text(data.yss_size);
        $(".ToBackNum").text(data.ybs_size);
        $(".completedNum").text(data.del_size);
        $(".cancellationNum").text(data.yfc_size);
    }

});

// 跳转数据列表
$(".noSubmit").click(() => {
    sessionStorage.setItem("status_CK", 0);
    location.href = "./check_invoice_list.html";
});
$(".noExamine").click(() => {
    sessionStorage.setItem("status_CK", 1);
    location.href = "./check_invoice_list.html";
});
$(".ToBack").click(() => {
    sessionStorage.setItem("status_CK", 2);
    location.href = "./check_invoice_list.html";
});
$(".completed").click(() => {
    sessionStorage.setItem("status_CK", 4);
    location.href = "./check_invoice_list.html";
});
$(".cancellation").click(() => {
    sessionStorage.setItem("status_CK", 3);
    location.href = "./check_invoice_list.html";
});