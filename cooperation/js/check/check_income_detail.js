var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

// 返回
$(".back").click(() => {
    history.back();
});

// 查看劳务、服务内容
$(".bus_content_box").click(() => {
    location.href = "./business_content.html";
    // 储存是收入还是发票的标志
    sessionStorage.setItem("serverContType","zf");
});

// 获取数据ID
var incomeDetailId = sessionStorage.getItem("incomeDetailId");
console.log("数据ID" + incomeDetailId);

// 请求数据
$.post(urlDns + "/control_app/hhr/zf/showUI", {
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
        $(".name").val(data.username);
        $(".income_type").text(data.khh);
        $(".income_account").val(data.kcode);

        $(".comName").text(data.comname);
        $(".bus_name").val(data.name);
        $(".bus_content").text(data.descripts);
        
        $(".timeBox").text(data.startdate + "至" + data.enddate);
        $(".timeBox").css("justify-content", "flex-end");
        $(".amountNum").val(data.fkmoney);
        // if (data.reasons) {
        //     $(".returnCont").text(data.reasons);
        // }
    }
});