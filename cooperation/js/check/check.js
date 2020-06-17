// 返回
$(".back").click(() => {
    mui.back();
});

// 收入信息查询
$(".noSubmit").click(() => {
    location.href = "./check_income.html";
});

// 发票记录查询
$(".noExamine").click(() => {
    location.href = "./check_invoice.html";
});

// 纳税记录查询
$(".ToBack").click(() => {
    location.href = "./check_taxes_list.html";
});