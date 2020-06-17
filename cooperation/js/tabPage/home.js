mui.init();

// 收入管理
$(".user_mana").click(() => {
    mui.openWindow('../income/income_a.html');
});

// 发票管理
$(".staff_mana").click(() => {
    mui.openWindow('../invoice/invoice.html');
});

// 纳税记录
$(".contract_mana").click(() => {
    mui.openWindow('../taxes/taxes.html');
});

// 名下业者/单位查询
$(".taxes_setting").click(() => {
    mui.openWindow('../check/check.html');
});

// 代理注册