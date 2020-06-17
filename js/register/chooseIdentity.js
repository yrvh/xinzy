// 返回上一页
$(".back").click(() => {
    // history.back();
    location.href = "./login.html";
});

// 获取注册页面传过来的手机号和密码
var account = {};
mui.plusReady(function() {
    account = plus.webview.currentWebview();
    // console.log(account.tel)
});

// 注册为业者
$("#free").click(() => {

    // userType 用户类型：0.平台管理者 1.自由业者 2.受服务公司 3.支付平台 4.秘书公司
    localStorage.setItem('userType', 1);
    location.href = "./selectCompany.html";
});

// 注册为单位
$(".accept").click(() => {
    // userType 用户类型：0.平台管理者 1.自由业者 2.受服务公司 3.支付平台 4.秘书公司
    alert("敬请期待");
});

// 注册为合作伙伴
$(".cooperation").click(() => {

    // userType 用户类型：0.平台管理者 1.自由业者 2.受服务公司 3.支付平台 4.秘书公司
    // sessionStorage.setItem('userType', 1);
    location.href = "./cooperation_com.html";
});