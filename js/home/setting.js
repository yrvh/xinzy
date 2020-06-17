// 返回
$(".back").click(() => {
	mui.back();
});

var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

// 修改密码
$(".noSubmit").click(() => {
	location.href = "./changePwd.html";
});

//退出登录
$(".loginOut").click(() => {
	// 如果直接清除缓存再跳转登录页面，当前已经打开过的Webview页面
	// 还没有关闭，若是这时候再登录进来，tabbar页面之间的切换就会出现问题
	// 每退出登录一次就会加载一个tabbar，所以要关闭所有Webview页面再跳转
	// 登录页面

	$.post(urlDns + "/user_app/logout", {
		pass_app: pass_app,
		tel_app: tel_app,
		code_app: code_app
	}, function(data) {
		console.log(JSON.stringify(data));
		if(window.plus) {
//			goToLogin("../../../page/register/login.html");
			// 获取当前窗口
			var curr = plus.webview.currentWebview();
			// 获取所有Webview窗口
			var wvs = plus.webview.all();
			for(var i = 0, len = wvs.length; i < len; i++) {
				//关闭除setting页面外的其他页面
				if(wvs[i].getURL() == curr.getURL())
					continue;
				plus.webview.close(wvs[i]);
			}
			// 清除缓存
			sessionStorage.clear();
			localStorage.clear();
			//打开login页面后再关闭setting页面
			plus.webview.open("../../page/register/login.html");
			curr.close();
		} else {
			document.addEventListener('plusready', goToLogin, false);
		}

	});

});