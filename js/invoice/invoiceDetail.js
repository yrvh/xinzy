mui.init();

// 返回
$(".back").click(() => {
    history.back();
});

var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 该条记录的id
var incomeDetailId = sessionStorage.getItem("incomeDetailId");
console.log(incomeDetailId);
var isIn = sessionStorage.getItem("isIn");
console.log(isIn)

$(function() {
    $.post(urlDns + "/control_app/yz/fp/editUI", {
        id: incomeDetailId,
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
            $(".comName").text(data.comname);
            $(".serverName").val(data.name);
            $(".serverCont").text(data.descripts);
            $(".timeBox").text(data.adddate);
            $(".amount").val(data.money);
        }

    });
});

$(".server").click(() => {
    sessionStorage.setItem("type", "onlyRead_fp");
    location.href = "../textPage.html";
});
// if (isIn == 1) {
//     // 未报税
// }
// if (isIn == 0) {
//     // 已报税

// }
// if (isIn == 2) {
//     // 待报税
// }