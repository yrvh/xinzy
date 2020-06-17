// 返回
$(".back").click(() => {
	sessionStorage.removeItem("addtype");
	sessionStorage.removeItem("income_status");
	history.back();
});

var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log(pass_app)
// console.log(tel_app)
// console.log(code_app)
getInfo(0) // 初次加载时, 获取页面信息 0:单位录入   1:业者录入

// 角色切换
$(".input_com").click(() => {
	$(".input_com").css("background-color", "#7EB6FF");
	$(".input_com").css("color", "white");
	$(".input_free").css("background-color", "white");
	$(".input_free").css("color", "#7EB6FF");
	$("#input_free").css("display", "none");
	$("#input_com").css("display", "block");
	getInfo(0) // 重新获取单位录入的 页面数据信息
});
$(".input_free").click(() => {
	$(".input_free").css("background-color", "#7EB6FF");
	$(".input_free").css("color", "white");
	$(".input_com").css("background-color", "white");
	$(".input_com").css("color", "#7EB6FF");
	$("#input_com").css("display", "none");
	$("#input_free").css("display", "block");
	getInfo(1) // 重新获取业者录入的 页面数据信息

});

// 判断下一个 页面返回来是处在 单位录入还是业者录入的界面
var addtype = sessionStorage.getItem("addtype");
if (addtype == "sf") {
	$(".input_com").css("background-color", "#7EB6FF");
	$(".input_com").css("color", "white");
	$(".input_free").css("background-color", "white");
	$(".input_free").css("color", "#7EB6FF");
	$("#input_free").css("display", "none");
	$("#input_com").css("display", "block");
}
if (addtype == "yz") {
	$(".input_free").css("background-color", "#7EB6FF");
	$(".input_free").css("color", "white");
	$(".input_com").css("background-color", "white");
	$(".input_com").css("color", "#7EB6FF");
	$("#input_com").css("display", "none");
	$("#input_free").css("display", "block");
}

// 跳转列表
// 录入方式addtype（业者录入为："yz"    单位录入:"sf"）
// 状态码income_status（1：待业者确认，3：业者退回，2.待秘书公司确认，5：秘书公司退回，6：完成）
// ========单位录入=======
$("#input_com .noSubmit").click(() => {
	sessionStorage.setItem("addtype", "sf");
	sessionStorage.setItem("income_status", 1);
	location.href = './incomeManaList.html';
});

$("#input_com .noExamine").click(() => {
	sessionStorage.setItem("addtype", "sf");
	sessionStorage.setItem("income_status", 3);
	location.href = './incomeManaList.html';
});

$("#input_com .ToBack").click(() => {
	sessionStorage.setItem("addtype", "sf");
	sessionStorage.setItem("income_status", 2);
	location.href = './incomeManaList.html';
});

$("#input_com .completed").click(() => {
	sessionStorage.setItem("addtype", "sf");
	sessionStorage.setItem("income_status", 5);
	location.href = './incomeManaList.html';
});

$("#input_com .confirmed").click(() => {
	sessionStorage.setItem("addtype", "sf");
	sessionStorage.setItem("income_status", 6);
	location.href = './incomeManaList.html';
});

// =======业者录入============
$("#input_free .noSubmit").click(() => {
	sessionStorage.setItem("addtype", "yz");
	sessionStorage.setItem("income_status", 2);
	location.href = './incomeManaList.html';
});

$("#input_free .noExamine").click(() => {
	sessionStorage.setItem("addtype", "yz");
	sessionStorage.setItem("income_status", 5);
	location.href = './incomeManaList.html';
});

$("#input_free .ToBack").click(() => {
	sessionStorage.setItem("addtype", "yz");
	sessionStorage.setItem("income_status", 6);
	location.href = './incomeManaList.html';
});


// 请求数据的函数
function getInfo(enterType) {
	enterType = enterType.toString()
	
	mui.get(urlDns + "/control_app/ms/fr_zg/zf/index", {
		pass_app: pass_app,
		tel_app: tel_app,
		code_app: code_app,
		type: enterType
	}, function(data) {
		console.log(JSON.stringify(data));
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
				$("#input_com .noSubmitNum").text(data.send);
				$("#input_com .noExamineNum").text(data.yz_nopass);
				$("#input_com .ToBackNum").text(data.ms_pass);
				$("#input_com .completedNum").text(data.ms_nopass);
				$("#input_com .confirmedNum").text(data.yz_pass);
			}

			// 业者录入
			if(enterType == '1') {
				$("#input_free .noSubmitNum").text(data.wait_check);
				$("#input_free .noExamineNum").text(data.ms_pass);
				$("#input_free .ToBackNum").text(data.ms_nopass);
			}

		}

	});
}
