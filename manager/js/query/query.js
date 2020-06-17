var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 返回
$(".back").click(() => {
    mui.back();
});

// 用户查询
$(".user_query").click(() => {
    location.href = './user_info.html';
    
});

// 业务查询
$(".business_query").click(() => {
    location.href = './business_query.html';
});

// 发票查询
$(".invoice_query").click(() => {
    location.href = './invoice_query.html';
});

// 报税查询
$(".tax_query").click(() => {
    location.href = './tax_query.html';
});

// 纳税设置查询
$(".tax_set_query").click(() => {
    location.href = './tax_set_query.html';
});

// 税收政策设置查询
$(".policy_query").click(() => {
    location.href = '../../page/taxesMana/taxesMana.html';
});
