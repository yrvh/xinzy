var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 返回
$(".back").click(() => {
    mui.back();
});

// 待提交
$(".noSubmit").click(() => {
    sessionStorage.setItem("id", "noSubmit");
    location.href = './incomeDetailList_a.html';
});

// 待付款
// $(".noExamine").click(() => {
//     sessionStorage.setItem("id", "noExamine");
//     location.href = './incomeDetailList_a.html';
// });

// ToBack
$(".ToBack").click(() => {
    sessionStorage.setItem("id", "ToBack");
    location.href = './incomeDetailList_a.html';
});

// 业者退回
$(".completed").click(() => {
    sessionStorage.setItem("id", "completed");
    location.href = './incomeDetailList_a.html';
});

// 已完成
$(".confirmed").click(() => {
    sessionStorage.setItem("id", "confirmed");
    location.href = './incomeDetailList_a.html';
});