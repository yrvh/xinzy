var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 返回
$(".back").click(() => {
    mui.back();
});

// 数据请求放在自运行函数里，避免新增或删除操作返回后数据没有刷新
$(function() {
    $.get(urlDns + "/control_app/yz/zf/index", {
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
            $(".noSubmitNum").text(data.waisend);
            $(".noExamineNum").text(data.send);
            $(".ToBackNum").text(data.ms_nopass);
            $(".completedNum").text(data.ms_pass);
        }


    });
});



// 新增
$(".next").click(() => {
    sessionStorage.setItem("isIn", 2);
    location.href = './incomeDetail.html';
});

$(".noSubmit").click(() => {
    sessionStorage.setItem("id", "noSubmit");
    location.href = './incomeDetailList.html';
});
$(".noExamine").click(() => {
    sessionStorage.setItem("id", "noExamine");
    location.href = './incomeDetailList.html';
});
$(".ToBack").click(() => {
    sessionStorage.setItem("id", "ToBack");
    location.href = './incomeDetailList.html';
});
$(".completed").click(() => {
    sessionStorage.setItem("id", "completed");
    location.href = './incomeDetailList.html';
});