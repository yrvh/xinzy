mui.init();

var tel_app = localStorage.getItem("tel_app");
var pass_app = localStorage.getItem("pass_app");
var code_app = localStorage.getItem("code_app");
console.log(tel_app)
console.log(pass_app)
console.log(code_app)

// 提示框
var comfirmTip = sessionStorage.getItem("comfirmTip");
console.log(comfirmTip)
if (comfirmTip == 1) {
    $(".bgBlack").css("display", "block");
}
$(".ok").click(() => {
    $(".bgBlack").css("display", "none");
    sessionStorage.setItem("comfirmTip", 0);
});

// 下一页
$(".next").click(() => {
    location.href = "./businessInfo_confirm.html";
});

// 查看身份证
$(".uploadIdCard").click(() => {
    sessionStorage.setItem("photoType", "idCard");
    location.href = "./idCardPhotos.html";
});

var tel = sessionStorage.getItem("tel");

// var userId = sessionStorage.getItem("userId");

$.post(urlDns + "/user_app/yz/checkUI", {
    tel: tel,
    tel_app: tel_app,
    pass_app: pass_app,
    code_app: code_app
}, function(data) {
    console.log(JSON.stringify(data))
        // console.log(data.result)
    if (data.result == 0) {
        // 需要重新登录
        if (window.plus) {
            goToLogin("./login.html");
        } else {
            document.addEventListener('plusready', goToLogin, false);
        }
    } else {
        if (data.dlregid > 0) {
            // 代理注册
            if (data.ishave_dw == 1) {
                // 有单位
                $(".pageNum").text("(1/5)");
            }
            if (data.ishave_dw == 0) {
                // 无单位
                $(".pageNum").text("(1/4)");
            }

        }
        // console.log(11111)
        // // 储存一个协议id，退回时要提交该参数  
        // sessionStorage.setItem("xyid", data.xyid);
        console.log(JSON.stringify(data));
        $("#realName").text(data.realname);
        $("#tel").text(data.tel);
        $("#email").text(data.email);
        $("#idNumber").text(data.cardcode);
        // $("#area_name").text(data.area_name.replace("_", " "));
        console.log(data.bank_name)
        $("#accountBank").text(data.bank_name);
        $("#accountName").text(data.kh_name);
        $("#account").text(data.code);
    }

});