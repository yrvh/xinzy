mui.init();

var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

$(".back").click(() => {
    mui.back();
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
            goToLogin("./register/login.html");
        } else {
            document.addEventListener('plusready', goToLogin, false);
        }
    } else {
        console.log(data.address)
        $("#creditNum").text(data.xycode);
        $("#name").text(data.jyname);
        $("#businessName").text(data.shname);
        $("#date").text(data.regtime);
        $(".rangeText").text(data.businessRange);
        $("#address").text(data.address);
        $("#registerUnit").text(data.registerCompany);
        $("#getDate").text(data.getCartTime);
        // $("#area_name").text(data.area_name_dg.replace("_", " "));
        $("#accountBank").text(data.khh_dg);
        $("#accountName").text(data.kh_name_dg);
        $("#account").text(data.code_dg);

    }


});

// 经营范围
$(".rangeBox").click(() => {
    location.href = "./businessRange.html";
});

// 营业执照
$(".photos").click(() => {
    location.href = "./certificate.html";
});