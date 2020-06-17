var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 返回
$(".back").click(() => {
    mui.back();
});

// 用户信息查询
$(".user_query").click(()=>{
    location.href = "./user_info_query.html";
})

// 用户状态查询
$(".user_status_query").click(()=>{
    location.href = "./user_status_query.html";
})
