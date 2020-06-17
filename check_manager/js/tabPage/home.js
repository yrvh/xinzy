mui.init();

// 用户管理
$(".user_mana").click(()=>{
	mui.openWindow('../userMana/userMana.html')
})
// 收入管理
$(".income_mana").click(()=>{
	mui.openWindow('../incomeMana/incomeMana.html')
})
// 税收政策设置
$(".taxes_set").click(()=>{
	mui.openWindow('../taxesSet/taxesSet.html')
})
// 纳税设置审核
$(".taxes_check").click(()=>{
	mui.openWindow('../taxesCheck/taxesCheck.html')
})
// 协议管理
$(".contract_mana").click(()=>{
	mui.openWindow('../contractMana/contractMana.html')
})
// 发票管理
$(".invoice_mana").click(()=>{
	mui.openWindow('../invoiceMana/invoiceMana.html')
})