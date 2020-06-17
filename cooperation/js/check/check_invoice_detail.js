var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

// 返回
$(".back").click(() => {
    history.back();
});

// 获取数据ID
var incomeDetailId = sessionStorage.getItem("incomeDetailId");
console.log(incomeDetailId);

// 请求数据
$.post(urlDns + "/control_app/hhr/fp/showUI", {
    id: incomeDetailId,
    pass_app: pass_app,
    tel_app: tel_app,
    code_app: code_app
}, function(data) {
    console.log(JSON.stringify(data))
    if (data.result == 0) {
        // 需要重新登录
        if (window.plus) {
            goToLogin("../../register/login.html");
        } else {
            document.addEventListener('plusready', goToLogin, false);
        }
    } else {
        $(".comName").text(data.sfname);
        $(".serverName").val(data.title);
        $(".serverCont").text(data.text);
        $(".timeBox").text(data.adddate);
        $(".amount").val(data.money);
        $(".timeBox").css("justify-content", "flex-end");
    }
});


// 查看劳务、服务内容
$(".server").click(() => {
    location.href = "./business_content.html";
    // 储存是收入还是发票的标志
    sessionStorage.setItem("serverContType","fp");
});