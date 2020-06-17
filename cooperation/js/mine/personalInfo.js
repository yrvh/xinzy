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
    type: 1,
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
        $("#realName").text(data.realname);
        $("#tel").text(data.tel);
        $("#email").text(data.email);
        $("#idNumber").text(data.idcard);
        // $("#area_name").text(data.khh_sr);
        $("#accountBank").text(data.khh_sr);
        $("#accountName").text(data.kh_name_sr);
        $("#account").text(data.code_sr);

    }


});

$(".uploadIdCard").click(() => {
    location.href = "./idCardPhotos.html";
});