// 返回
$(".back").click(()=>{
	sessionStorage.removeItem("addtype");
	sessionStorage.removeItem("income_status");
   history.back();
})
var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

getInfo(0)   // 初次加载时, 获取页面信息 0:单位录入   1:业者录入

// 单位录入
$(".com_write").click(()=>{
    $(".com_write").css("background-color","#7EB6FF");
    $(".com_write").css("color","white");
    $(".free_write").css("background-color","white");
    $(".free_write").css("color","#7EB6FF");
    $(".com_ul").css("display","block");
    $(".free_ul").css("display","none");
		
		getInfo(0) // 重新获取单位录入的 页面数据信息
})

// 业者录入
$(".free_write").click(()=>{
    $(".free_write").css("background-color","#7EB6FF");
    $(".free_write").css("color","white");
    $(".com_write").css("background-color","white");
    $(".com_write").css("color","#7EB6FF");
    $(".free_ul").css("display","block");
    $(".com_ul").css("display","none");

    getInfo(1) // 重新获取业者录入的 页面数据信息
})



// 判断下一个 页面返回来是处在 单位录入还是业者录入的界面
var addtype = sessionStorage.getItem("addtype");
if (addtype == "sf") {
	$(".com_write").css("background-color","#7EB6FF");
	$(".com_write").css("color","white");
	$(".free_write").css("background-color","white");
	$(".free_write").css("color","#7EB6FF");
	$(".com_ul").css("display","block");
	$(".free_ul").css("display","none");
}
if (addtype == "yz") {
	$(".free_write").css("background-color","#7EB6FF");
	$(".free_write").css("color","white");
	$(".com_write").css("background-color","white");
	$(".com_write").css("color","#7EB6FF");
	$(".free_ul").css("display","block");
	$(".com_ul").css("display","none");
}


// 跳转列表
// 录入方式addtype（业者录入为："yz"    单位录入:"sf"）
// 状态码income_status（1：待业者确认，3：业者退回，2.待秘书公司确认，5：秘书公司退回，6：完成）
// ========单位录入=======
$(".com_dyzqr_li").click(() => {
	sessionStorage.setItem("addtype", "sf");
	sessionStorage.setItem("income_status", 1);
	location.href = './business_query_list.html';
});

$(".com_yzth_li").click(() => {
	sessionStorage.setItem("addtype", "sf");
	sessionStorage.setItem("income_status", 3);
	location.href = './business_query_list.html';
});

$(".com_dsmgsqr_li").click(() => {
	sessionStorage.setItem("addtype", "sf");
	sessionStorage.setItem("income_status", 2);
	location.href = './business_query_list.html';
});

$(".com_smgsth_li").click(() => {
	sessionStorage.setItem("addtype", "sf");
	sessionStorage.setItem("income_status", 5);
	location.href = './business_query_list.html';
});

$(".com_ywc_li").click(() => {
	sessionStorage.setItem("addtype", "sf");
	sessionStorage.setItem("income_status", 6);
	location.href = './business_query_list.html';
});

// =======业者录入============
$(".free_dsmgsqr_li").click(() => {
	sessionStorage.setItem("addtype", "yz");
	sessionStorage.setItem("income_status", 2);
	location.href = './business_query_list.html';
});

$(".free_smgsth_li").click(() => {
	sessionStorage.setItem("addtype", "yz");
	sessionStorage.setItem("income_status", 5);
	location.href = './business_query_list.html';
});

$(".free_ywc_li").click(() => {
	sessionStorage.setItem("addtype", "yz");
	sessionStorage.setItem("income_status", 6);
	location.href = './business_query_list.html';
});


// 请求数据的函数
function getInfo(enterType) {
	enterType = enterType.toString()
	
	mui.post(urlDns + "/control_app/ms/fr_zg/zf/index",{
	    // 0.单位录入1.业者录入
	    type:"0",
	    tel_app:tel_app,
	    pass_app:pass_app,
	    code_app:code_app
	},function(data){
	    console.log(JSON.stringify(data))
			if (data.result == 0) {
				// 需要重新登录
				if (window.plus) {
					goToLogin("../../register/login.html");
				} 
				else {
					document.addEventListener('plusready', goToLogin, false);
				}
			} 
			else {
				// 单位录入
				if(enterType == '0') {
					$(".com_dyzqr").text(data.send);
					$(".com_yzth").text(data.yz_nopass);
					$(".com_dsmgsqr").text(data.yz_pass);
					$(".com_smgsth").text(data.ms_nopass);
					$(".com_ywc").text(data.ms_pass);
				}
			
				// 业者录入
				if(enterType == '1') {
					$(".free_dsmgsqr").text(data.wait_check);
					$(".free_smgsth").text(data.ms_nopass);
					$(".free_ywc").text(data.ms_pass);
				}
			
			}
	})
}