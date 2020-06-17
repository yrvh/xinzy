mui.init();

var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

$(".back").click(() => {
    history.back();
});


$.post(urlDns + "/control_app/yz/info/showUI", {
    type: 2,
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
        $("#cont").val(data.businessRange);
        var length = data.businessRange.length;
        $(".tips").text(length + "/300汉字");


    }


});