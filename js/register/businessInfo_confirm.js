var tel_app = localStorage.getItem("tel_app");
var pass_app = localStorage.getItem("pass_app");
var code_app = localStorage.getItem("code_app");

var tel = sessionStorage.getItem("tel");
$.post(urlDns + "/user_app/yz/checkUI", {
    tel: tel,
    tel_app: tel_app,
    pass_app: pass_app,
    code_app: code_app
}, function(data) {
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
                $(".pageNum").text("(2/5)");
            }
            if (data.ishave_dw == 0) {
                // 无单位
                $(".pageNum").text("(2/4)");
            }

        }
        console.log(JSON.stringify(data));
        console.log("发证日期：" + data.registerCompany)
        $("#creditNum").text(data.xycode);
        $("#name").text(data.jyname);
        $("#businessName").text(data.comname);
        $("#date").text(data.addtime);
        $(".rangeText").text(data.businessRange);
        // $("#address").text(data.address);
        $("#registerUnit").text(data.registerCompany);
        $("#getDate").text(data.getCardTime);
        // $("#area_name").text(data.area_name_dg.replace("_", " "));
        $("#accountBank").text(data.bank_name_dg);
        $("#accountName").text(data.kh_name_dg);
        $("#account").text(data.code_dg);
    }

});

$(".pre").click(() => {
    // history.back();
    location.href = "./freeInfo_confirm.html";
});
$(".next").click(() => {
    location.href = "./incomeInfo_confirm.html";

});

$(".photos").click(() => {
    sessionStorage.setItem("photoType", "business");
    location.href = "./idCardPhotos.html";
});

// 经营范围
$(".range").click(() => {
    sessionStorage.setItem("type", "businessRange");
    location.href = "../textPage.html";
});