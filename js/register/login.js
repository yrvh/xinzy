localStorage.removeItem("upid");

$(function() {
	// 线上新版本号
	// var onlineVersion;
	// 请求最新安装包版本号
	var getVersion = $.ajax({
		url: urlDns + "/app_get_last",
		type: 'post',
		dataType: "json",
		data: {},
		// async: false,
		timeout: 120000, //2分钟超时
		//请求成功
		success: function(data) {
			console.log(JSON.stringify(data));
			console.log(data.app_version.replace(/\./g, ""))
			var onlineVersion = data.app_version;
			judge(data.app_version);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(textStatus)
			// layer.close(threeContractWeit);
			if (textStatus == 'timeout') {
				getVersion.abort();
				alert("请求超时");
			}
			if (textStatus == 'error') {
				console.log(errorThrown)
				getVersion.abort();
				alert("请求错误" + errorThrown);

			}
		}
	});



})

// 比较最新版本和本地版本号
function judge(onlineVersion) {
	// 获取本地版本号
	$.getJSON("../../manifest.json", function(manifest) {
		var localVersion = manifest.version.name.replace(/\./g, "");
		console.log(localVersion)
		console.log(onlineVersion)
		// 当有新的版本，更新
		if (onlineVersion.replace(/\./g, "") > localVersion) {
			$(".updateApp_tipCont").text("更新版本到" + onlineVersion);
			$(".updateAppTips").css("display", "block");
		}

	});
}

// 确认更新版本
$(".updateBtn").click(() => {
	var getVersion = $.ajax({
		url: urlDns + "/app_get_last",
		type: 'post',
		dataType: "json",
		data: {},
		async: false,
		timeout: 120000, //2分钟超时
		//请求成功
		success: function(data) {
			dowload(data.app_urls)
			$(".updateAppTips").css("display", "none");
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log(textStatus)
			// layer.close(threeContractWeit);
			if (textStatus == 'timeout') {
				getVersion.abort();
				alert("请求超时");
			}
			if (textStatus == 'error') {
				console.log(errorThrown)
				getVersion.abort();
				alert("请求错误" + errorThrown);

			}
		}
	});
})


var dtask = null;
// 下载的文件名
var fileName = "";
//下载文件
function dowload(url) {
	var options = {
		method: "GET"
	};
	dtask = plus.downloader.createDownload(url, options);
	dtask.addEventListener("statechanged", function(task, status) {
		switch (task.state) {
			case 1: // 开始
				mui.toast("开始下载...")
				break;
			case 2: // 已连接到服务器
				// mui.toast("连接到服务器...")
				break;
			case 3: // 已接收到数据
				// alert(task.downloadedSize)    // 已下载文件大小
				// alert(task.totalSize)    // 文件大小
				break;
			case 4: // 下载完成
				mui.toast("下载完成！")
				console.log(task.totalSize)
				plus.io.resolveLocalFileSystemURL(task.filename, function(entry) {
					// alert(entry.toLocalURL() + "") // 显示下载的文件存储绝对地址
					console.log(entry.toLocalURL()) //绝对地址 
					// 判断文件是否存在，不存在则不安装
					var file = entry.toLocalURL()
					openNewApp(file)
				});
				// alert(task.filename) // 显示下载好的文件名称
				break;
		}
	});
	dtask.start();

}

// 安装新的APP
function openNewApp(url) {
	plus.runtime.install(url, {}, function() {
		// alert("安装成功")
	}, function() {
		alert("安装失败")
	});

}


var verify = sessionStorage.getItem("verify");
var inreg = sessionStorage.getItem("inreg");
var checkedXzy = sessionStorage.getItem("checkedXzy");
// 已经点击过薪自由条款，返回时保留原本填好的数据状态
if (checkedXzy == 1) {
	$("#agree").attr("checked", "true");
	$("#loginBox").css("display", "none");
	$("#registerBox").css("display", "block");
	$(".tip").css("left", "calc(75% - 8px)");
	var tel = sessionStorage.getItem("tel");
	var pwd1 = sessionStorage.getItem("password");
	var pwd2 = sessionStorage.getItem("password2");
	var reUserName = sessionStorage.getItem("reUserName");
	var verify = sessionStorage.getItem("verify");
	$("#reUserName").val(reUserName);
	$("#reUserNum").val(tel);
	$("#verify").val(verify);
	$("#rePwd").val(pwd1);
	$("#confirmPwd").val(pwd2);
}

// 从下一页返回来时保留填写的数据和状态
if (verify || inreg) {
	$("#loginBox").css("display", "none");
	$("#registerBox").css("display", "block");
	$(".tip").css("left", "calc(75% - 8px)");
	var tel = sessionStorage.getItem("tel");
	var pwd1 = sessionStorage.getItem("password");
	var pwd2 = sessionStorage.getItem("password2");
	var reUserName = sessionStorage.getItem("reUserName");
	// console.log(tel)
	$("#reUserName").val(reUserName);
	$("#reUserNum").val(tel);
	$("#verify").val(verify);
	$("#rePwd").val(pwd1);
	$("#confirmPwd").val(pwd2);
	$(".tipsBox").css("left", "50%");
	$(".loginBtn").css("color", "#cccccc");
	$(".registerBtn").css("color", "#333333");
}

// 切换登录或注册界面
$(".loginBtn").click(function(e) {
	// 登录
	$("#registerBox").css("display", "none");
	$("#loginBox").css("display", "block");
	$(".tipsBox").css("left", 0);
	$(".z-index").css("height", "320px");
	$(".loginBtn").css("color", "#333333");
	$(".registerBtn").css("color", "#cccccc");
});
$(".registerBtn").click(function(e) {
	// 注册
	$("#loginBox").css("display", "none");
	$("#registerBox").css("display", "block");
	$(".tipsBox").css("left", "50%");
	$(".z-index").css("height", "440px");
	$(".loginBtn").css("color", "#cccccc");
	$(".registerBtn").css("color", "#333333");
	$(".black3").css("display", "block");
});

// 自行注册
$(".close").click(() => {
	$(".black3").css("display", "none");
});

// 跳转扫码注册
$(".open").click(() => {
	location.href = "./scan_res.html";
});

// 获取验证码
$(".getVerify").on("click", get_code);

function get_code() {
	var tel = $("#reUserNum").val();
	if (tel == "") {
		errorTips("请输入手机号");
	} else {
		$(".getVerify").off("click");
		// 向后台发请求获取验证码
		$.post(urlDns + "/getMsm_app", {
			tel: tel
		}, function(data) {
			console.log(JSON.stringify(data));
			if (data.result == 0) {
				errorTips(data.message);
				$(".getVerify").text("获取验证码");
				$(".getVerify").css("color", "#7EB6FF");
				$(".getVerify").on("click", get_code);
			} else {
				// 倒计时
				var time = 59;
				$(".getVerify").text(time + "秒");
				$(".getVerify").css("color", "gray");
				var t = setInterval(() => {
					time = time - 1;
					$(".getVerify").text(time + "秒");
					if (time < 1) {
						clearInterval(t);
						$(".getVerify").text("重新获取");
						$(".getVerify").css("color", "#7EB6FF");
						$(".getVerify").on("click", get_code);
					}
				}, 1000);
			}
		});
	}
}


// 给用户弹出错误提示的方法
function errorTips(info) {
	$(".error").text(info);
	$(".errorBg").css("display", "block");
	$('.errorBg').click(() => {
		$(".errorBg").css("display", "none");
	});
	setTimeout(function() {
		$(".errorBg").css("display", "none");
	}, 3000);
}

// 手机号正则
var userNumReg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
// 检验密码格式 8-18位字母和数字组成
var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
// 验证码格式
var verReg = /^\d{6}$/;

// 登录
$("#login").click(function() {
	var userNum = $("#userNum").val();
	var pwd = $("#pwd").val();
	if (userNum == "") {
		errorInfo = "请输入手机号或用户名";
		errorTips(errorInfo);
	} else if (pwd == "") {
		errorInfo = "请输入密码";
		errorTips(errorInfo);
	} else {
		// console.log(111)
		// console.log(userNum)
		// console.log(pwd);
		var index = layer.load(1, {
			// 数组中第一个参数是button的透明度
			// 第二个是背景颜色
			shade: [0.3, "white"]
		});
		// 登陆请求
		var loginPost = $.ajax({
			url: urlDns + "/user_app/login",
			type: 'post',
			dataType: "json",
			data: {
				tel: userNum,
				password: pwd
			},
			timeout: 120000, //2分钟超时
			//请求成功
			success: function(data) {
				layer.close(index);
				console.log(JSON.stringify(data));
				// console.log(data.ishave_dw);

				if (data.status == 100) {
					// 密码不正确
					errorTips("密码不正确");
				} else if (data.status == -1) {
					// 用户不存在
					// sessionStorage.setItem("status", data.status);
					// location.href = "audit.html";
					errorTips("用户不存在");
				} else {
					// 用户存在，通过验证
					loginBtn_click(); // 记住密码
					var telApp = data.tel;
					var passApp = data.password;
					// 存储验证随机数、验证手机号密码
					localStorage.setItem("code_app", data.code_app);
					localStorage.setItem("tel_app", data.tel);
					localStorage.setItem("pass_app", data.password);
					localStorage.setItem("userType", data.userType);
					localStorage.setItem("ishave_dw", data.ishave_dw);

					if (data.userType == 1) {
						// 角色是业者
						if (data.dlregid == 0) {
							// data.dlregid == 0  自行注册

							if (data.status == 4 || data.status == 1 || data.status == 5 || data.status == 2 || data.status == 3 ||
								data.status == 44) {
								// 4待业者确认资料
								// 1服务费待审核
								// 5待单位确认
								// 2待确认个人信息
								// 44业者退回
								// 3待完善资料
								// console.log(11111111111)
								sessionStorage.clear();
								sessionStorage.setItem("status", data.status);
								sessionStorage.setItem("userId", data.userid);
								sessionStorage.setItem("tel", userNum);
								location.href = "./audit.html";
							}
							if (data.status == 11) {
								// 服务费用不通过，跳转到修改服务费页面
								sessionStorage.setItem("editServiceFee", "1");
								location.href = "./onLineContract.html";
							}
							if (data.status == 55 || data.status == 22) {
								// 55被单位退回，重新修改个人信息
								// 22个人信息不通过，重新修改个人信息
								sessionStorage.clear();
								sessionStorage.setItem("userId", data.userid);
								sessionStorage.setItem("tel", userNum);
								sessionStorage.setItem("updateInfo", 1);
								location.href = "./freeInfo.html";
							}
							if (data.status == 0 || data.status == 8) {
								// sessionStorage.clear();
								// 审核全部完成，进入首页
								sessionStorage.setItem("userId", data.userid);
								sessionStorage.setItem("tel", userNum);
								sessionStorage.setItem("ishave_dw", data.ishave_dw);
								location.href = "../../index.html";
							}
							if (data.status == 175) {
								// sessionStorage.clear();
								// 用户需要同意三方协议,然后进入系统
								// console.log("哈哈哈哈")
								$(".threeBoxBg").css("display", "block");
								sessionStorage.setItem("userId", data.userid);
								sessionStorage.setItem("tel", userNum);
								console.log(data.status);
								var code_app = localStorage.getItem("code_app");
								// 等待提示
								var threeContractWeit = layer.load(1, {
									// 数组中第一个参数是button的透明度
									// 第二个是背景颜色
									shade: [0.3, "white"]
								});
								// 请求三方协议内容
								var threeContractPost = $.ajax({
									url: urlDns + "/user_app/yz/check_3_xieyiUI",
									type: 'post',
									dataType: "json",
									data: {
										"tel_app": telApp,
										"pass_app": passApp,
										"code_app": code_app
									},
									timeout: 120000, //2分钟超时
									//请求成功
									success: function(data) {
										console.log(JSON.stringify(data));
										layer.close(threeContractWeit);
										if (data.result == 0) {
											location.reload();
										} else {

											$(".cont").html(data.text);

										}

									},
									error: function(XMLHttpRequest, textStatus, errorThrown) {
										console.log(textStatus)
										layer.close(threeContractWeit);
										if (textStatus == 'timeout') {
											threeContractPost.abort();
											alert("请求超时");
											$(".threeBoxBg").css("display", "none");
										}
										if (textStatus == 'error') {
											console.log(errorThrown)
											threeContractPost.abort();
											$(".threeBoxBg").css("display", "none");
											alert("请求错误" + errorThrown);

										}
									}
								});
							}

						} else {
							// 代理注册

							if (data.status == 4 || data.status == 11 || data.status == 33 || data.status == 44 || data.status == 55 ||
								data.status == 66) {
								// 4待业者确认资料
								// 11待审核
								// 33 44 55 66资料完善中
								sessionStorage.clear();
								sessionStorage.setItem("status", data.status);
								sessionStorage.setItem("userId", data.userid);
								sessionStorage.setItem("tel", userNum);
								location.href = "./audit.html";
							}
							if (data.status == 175) {
								sessionStorage.clear();
								// 用户需要同意三方协议,然后进入系统
								// console.log("哈哈哈哈")
								$(".threeBoxBg").css("display", "block");
								sessionStorage.setItem("userId", data.userid);
								sessionStorage.setItem("tel", userNum);
								console.log(data.status);
								var code_app = localStorage.getItem("code_app");
								// 等待提示
								var threeContractWeit = layer.load(1, {
									// 数组中第一个参数是button的透明度
									// 第二个是背景颜色
									shade: [0.3, "white"]
								});
								// 请求三方协议内容
								var threeContractPost = $.ajax({
									url: urlDns + "/user_app/yz/check_3_xieyiUI",
									type: 'post',
									dataType: "json",
									data: {
										"tel_app": telApp,
										"pass_app": passApp,
										"code_app": code_app
									},
									timeout: 120000, //2分钟超时
									//请求成功
									success: function(data) {
										console.log(JSON.stringify(data));
										layer.close(threeContractWeit);
										if (data.result == 0) {
											location.reload();
										} else {
											$(".cont").html(data.text);

										}

									},
									error: function(XMLHttpRequest, textStatus, errorThrown) {
										console.log(textStatus)
										layer.close(threeContractWeit);
										if (textStatus == 'timeout') {
											threeContractPost.abort();
											alert("请求超时");
											$(".threeBoxBg").css("display", "none");
										}
										if (textStatus == 'error') {
											console.log(errorThrown)
											threeContractPost.abort();
											$(".threeBoxBg").css("display", "none");
											alert("请求错误" + errorThrown);

										}
									}
								});
							}
							if (data.status == 8) {
								sessionStorage.clear();
								// 审核全部完成，进入首页
								sessionStorage.setItem("userId", data.userid);
								sessionStorage.setItem("tel", userNum);
								location.href = "../../index.html";
							}

						}
					}
					if (data.userType == 11) {
						// 合作伙伴
						console.log("合作伙伴" + data.userType);
						if (data.status == 4 || data.status == 1 || data.status == 5 || data.status == 2 || data.status == 3 || data
							.status == 44) {
							// 4待业者确认资料
							// 1服务费待审核
							// 5待单位确认
							// 2待确认个人信息
							// 44业者退回
							// 3待完善资料
							// console.log(11111111111)
							sessionStorage.clear();
							sessionStorage.setItem("status", data.status);
							sessionStorage.setItem("userId", data.userid);
							sessionStorage.setItem("tel", userNum);
							location.href = "./audit.html";
						}

						// ===============================================
						if (data.status == 11) {
							// 服务费用不通过，跳转到修改服务费页面
							sessionStorage.setItem("editServiceFee", "1");
							location.href = "./onLineContract.html";
						}

						if (data.status == 55 || data.status == 22) {
							// 55被单位退回，重新修改个人信息
							// 22个人信息不通过，重新修改个人信息
							sessionStorage.clear();
							sessionStorage.setItem("userId", data.userid);
							sessionStorage.setItem("tel", userNum);
							sessionStorage.setItem("updateInfo", 1);
							location.href = "./freeInfo.html";
						}

						// ==============================================================

						if (data.status == 0 || data.status == 8) {
							// sessionStorage.clear();
							// 审核全部完成，进入首页
							sessionStorage.setItem("userId", data.userid);
							sessionStorage.setItem("tel", userNum);
							sessionStorage.setItem("ishave_dw", data.ishave_dw);
							location.href = "../../cooperation/page/index.html";
						}

						// ==============================================================
						if (data.status == 175) {
							// sessionStorage.clear();
							// 用户需要同意三方协议,然后进入系统
							// console.log("哈哈哈哈")
							$(".threeBoxBg").css("display", "block");
							sessionStorage.setItem("userId", data.userid);
							sessionStorage.setItem("tel", userNum);
							console.log(data.status);
							var code_app = localStorage.getItem("code_app");
							// 等待提示
							var threeContractWeit = layer.load(1, {
								// 数组中第一个参数是button的透明度
								// 第二个是背景颜色
								shade: [0.3, "white"]
							});
							// 请求三方协议内容
							var threeContractPost = $.ajax({
								url: urlDns + "/user_app/yz/check_3_xieyiUI",
								type: 'post',
								dataType: "json",
								data: {
									"tel_app": telApp,
									"pass_app": passApp,
									"code_app": code_app
								},
								timeout: 120000, //2分钟超时
								//请求成功
								success: function(data) {
									console.log(JSON.stringify(data));
									layer.close(threeContractWeit);
									if (data.result == 0) {
										location.reload();
									} else {

										$(".cont").html(data.text);

									}

								},
								error: function(XMLHttpRequest, textStatus, errorThrown) {
									console.log(textStatus)
									layer.close(threeContractWeit);
									if (textStatus == 'timeout') {
										threeContractPost.abort();
										alert("请求超时");
										$(".threeBoxBg").css("display", "none");
									}
									if (textStatus == 'error') {
										console.log(errorThrown)
										threeContractPost.abort();
										$(".threeBoxBg").css("display", "none");
										alert("请求错误" + errorThrown);

									}
								}
							});
						}

						// =================================================================
					}
					if (data.userType == 4) {
						// 角色是秘书公司

						if (data.poststatus == 1) {
							// 风控主管
							location.href = "../../check_manager/page/tabPage/home.html";
						}
						if (data.poststatus == 2) {
							// 业务员

							if (data.status == 222) {
								// 业务员停用状态
							}

							if (data.status == 888) {
								// 业务员启用状态
							}
						}
						if(data.poststatus == 4) {
							// 公司法人
							location.href = "../../manager/page/tabPage/home.html"
						}
					}

				}

			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				layer.close(index);
				if (textStatus === 'timeout') {
					loginPost.abort();
					alert("请求超时");
				}
				if (textStatus == 'error') {
					loginPost.abort();
					alert("请求错误" + errorThrown);
				}
			}
		})
	}
	// location.href = "../../index.html";
});

// 不同意三方协议
$(".disagreeThree").click(() => {
	var tel_app = localStorage.getItem("tel_app");
	var pass_app = localStorage.getItem("pass_app");
	var code_app = localStorage.getItem("code_app");
	var userType = localStorage.getItem("userType");
	var index = layer.load(1, {
		// 数组中第一个参数是button的透明度
		// 第二个是背景颜色
		shade: [0.3, "white"]
	});
	var agreeContractPost = $.ajax({
		url: urlDns + "/user_app/yz/uncheck_3_xieyi",
		type: 'post',
		dataType: "json",
		data: {
			"tel_app": tel_app,
			"pass_app": pass_app,
			"code_app": code_app
		},
		timeout: 120000, //2分钟超时
		//请求成功
		success: function(data) {
			console.log(JSON.stringify(data));
			layer.close(index);
			if (data.result == 0) {
				location.reload();
			} else {
				// 合作伙伴
				if (userType == 11) {
					// 审核全部完成，进入首页
					location.href = "../../cooperation/page/index.html";
				}

				// 业者
				if (userType == 1) {
					location.href = "../../index.html";
				}
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			layer.close(index);
			if (textStatus == 'timeout') {
				agreeContractPost.abort();
				alert("请求超时");
			}
			if (textStatus == 'error') {
				agreeContractPost.abort();
				alert("请求错误" + errorThrown);
			}
		}
	});

});

// 同意三方协议
$(".agreeThree").click(() => {
	var tel_app = localStorage.getItem("tel_app");
	var pass_app = localStorage.getItem("pass_app");
	var code_app = localStorage.getItem("code_app");
	var userType = localStorage.getItem("userType");
	var ishave_dw = localStorage.getItem("ishave_dw");
	console.log("用户类型" + userType)
	var index = layer.load(1, {
		// 数组中第一个参数是button的透明度
		// 第二个是背景颜色
		shade: [0.3, "white"]
	});
	var agreeContractPost = $.ajax({
		url: urlDns + "/user_app/yz/check_3_xieyi",
		type: 'post',
		dataType: "json",
		data: {
			"tel_app": tel_app,
			"pass_app": pass_app,
			"code_app": code_app
		},
		timeout: 120000, //2分钟超时
		//请求成功
		success: function(data) {
			console.log(JSON.stringify(data));
			layer.close(index);
			if (data.result == 0) {
				location.reload();
			} else {
				// 合作伙伴
				if (userType == 11) {
					// 审核全部完成，进入首页
					location.href = "../../cooperation/page/index.html";
				}

				// 业者
				if (userType == 1) {
					location.href = "../../index.html";
				}

			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			layer.close(index);
			if (textStatus == 'timeout') {
				agreeContractPost.abort();
				alert("请求超时");
			}
			if (textStatus == 'error') {
				agreeContractPost.abort();
				alert("请求错误" + errorThrown);
			}
		}
	});
});

$(function() {
	var strName = localStorage.getItem('keyName');
	var strPass = localStorage.getItem('keyPass');
	if (strName) {
		$('#userNum').val(strName);
		$('#pwd').val(strPass);
		$("#remPwd").attr("checked", "true");
	}
});

// 记住密码
function loginBtn_click() {
	var strName = $('#userNum').val();
	var strPass = $('#pwd').val();
	localStorage.setItem('keyName', strName);
	if ($('#remPwd').is(':checked')) {
		localStorage.setItem('keyPass', strPass);
	} else {
		localStorage.removeItem('keyPass');
	}
}

// 自行注册按钮
$("#selRegister").click(function() {
	// 提示给用户的信息
	var errorInfo = "";
	// 用户名
	var reUserName = $("#reUserName").val();
	// 手机号
	var reUserNum = $("#reUserNum").val();
	// 密码
	var pwd1 = $("#rePwd").val();
	// 确认密码
	var pwd2 = $("#confirmPwd").val();
	// 验证码
	var verify = $("#verify").val();
	// 勾选同意条款的按钮
	// $("#agree").attr("checked", "true")
	var agree = document.getElementById("agree").checked;
	// console.log($("#agree").prop("checked"));

	// 判断用户数据的错误类型
	if (reUserNum == "") {
		errorInfo = "请输入手机号";
		errorTips(errorInfo);
	} else if (!userNumReg.test(reUserNum)) {
		errorInfo = "手机号不正确";
		errorTips(errorInfo);
	} else if (verify == "") {
		errorInfo = "请输入验证码";
		errorTips(errorInfo);
	} else if (pwd1 == "") {
		errorInfo = "请输入密码";
		errorTips(errorInfo);
	} else if (!pwdReg.test(pwd1)) {
		errorInfo = "密码由8-18位字母和数字组成";
		errorTips(errorInfo);
	} else if (pwd2 == "") {
		errorInfo = "请确认密码";
		errorTips(errorInfo);
	} else if (pwd1 != pwd2) {
		errorInfo = "两次密码不一致";
		errorTips(errorInfo);
	} else if (!agree) {
		errorInfo = "请阅读并同意条款";
		errorTips(errorInfo);
	} else {
		var index = layer.load(1, {
			// 数组中第一个参数是button的透明度
			// 第二个是背景颜色
			shade: [0.3, "white"]
		});

		// 访问服务器先判断用户是否已经存在
		var hasUserPost = $.ajax({
			url: urlDns + "/user_app/isExits",
			type: 'post',
			dataType: "json",
			data: {
				tel: reUserNum,
				username: reUserName,
				code: verify
			},
			timeout: 120000, //2分钟超时
			//请求成功
			success: function(data) {
				layer.close(index);
				console.log(JSON.stringify(data))
				if (data.status == 1) {
					localStorage.setItem('reUserName', reUserName);
					localStorage.setItem('tel', reUserNum);
					localStorage.setItem('password', pwd1);
					localStorage.setItem('password2', pwd2);
					localStorage.setItem('verify', verify);
					// 告知freeInfo页面是新用户注册还是用户信息被退回修改的
					localStorage.setItem('isUpdate', 1);
					location.href = "./chooseIdentity.html";
				}
				if (data.status == 0) {
					console.log("手机号已存在")
					errorTips("手机号已存在");
				}
				if (data.status == -1) {
					console.log("用户名已存在")
					errorTips("用户名已存在");
				}
				if (data.status == -2) {
					console.log("手机号已存在")
					errorTips("手机号已存在");
				}
				if (data.status == -3) {
					console.log("验证码错误")
					errorTips("验证码错误");
				}

			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				layer.close(index);
				if (textStatus == 'timeout') {
					hasUserPost.abort();
					alert("请求超时");
					console.log("请求超时")
				}
				if (textStatus == 'error') {
					hasUserPost.abort();
					console.log("请求错误")
					alert("请求错误" + errorThrown);
				}
			}
		});
	}


});


//同意条款
$("#agree").click(() => {
	// console.log($("#agree").prop("checked"))
	// 用户名
	var reUserName = $("#reUserName").val();
	// 手机号
	var reUserNum = $("#reUserNum").val();
	// 密码
	var pwd1 = $("#rePwd").val();
	// 确认密码
	var pwd2 = $("#confirmPwd").val();
	// 验证码
	var verify = $("#verify").val();

	sessionStorage.setItem('reUserName', reUserName);
	sessionStorage.setItem('tel', reUserNum);
	sessionStorage.setItem('password', pwd1);
	sessionStorage.setItem('password2', pwd2);
	sessionStorage.setItem('verify', verify);
	sessionStorage.setItem('checkedXzy', 1);

	// 同意的时候打开条款页面
	if ($("#agree").prop("checked") == true) {
		location.href = "./xzyClause.html";
	}
});
$(".clause").click(() => {
	location.href = "./xzyClause.html";
});


$(".ok").click(() => {
	// 用户名
	var reUserName = $("#reUserName").val();
	// 手机号
	var reUserNum = $("#reUserNum").val();
	// 密码
	var pwd1 = $("#rePwd").val();
	// 确认密码
	var pwd2 = $("#confirmPwd").val();
	// 验证码
	var verify = $("#verify").val();

	sessionStorage.setItem('reUserName', reUserName);
	sessionStorage.setItem('tel', reUserNum);
	sessionStorage.setItem('password', pwd1);
	sessionStorage.setItem('password2', pwd2);
	sessionStorage.setItem('verify', verify);
	sessionStorage.setItem('isUpdate', 1);
	location.href = "./businessCom.html";
});
$(".cancel").click(() => {
	$(".resTip").css("display", "none");
});

// 忘记密码
$(".forgetPwd").click(() => {
	location.href = "./findPwd.html";
});
