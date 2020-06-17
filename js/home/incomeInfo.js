mui.init();

var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 返回
$(".back").click(() => {
    mui.back();
});


$.post(urlDns + "/control_app/yz/info/showUI", {
    type: 3,
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
        $(".incomeNum").text(data.monthsy);
        $(".type").text(data.hyname);
        $(".valueAddedNum").text(data.zzshdde);
        $(".personalIncomeNum").text(data.gshdde);
        if (data.zzsjntype == 1) {
            $(".valueAddedTitle").text("增值税（按月）");
        } else if (data.zzsjntype == 2) {
            $(".valueAddedTitle").text("增值税（按季）");
        } else if (data.zzsjntype == 3) {
            $(".valueAddedTitle").text("增值税（按年）");
        }
    }


});