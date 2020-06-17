// 返回登录页面
$(".backBox").click(() => {
    location.href = "./login.html";
});

// 手机号正则
var telReg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;

// 获取验证码
var getVerifyTimeout;
$(".getVerify").click(() => {
    var tel = $("#tel").val();
    if (!telReg.test(tel)) {
        errorTips("手机号码不正确");
    } else {
        var time = 60;
        $(".getVerify").attr('disabled', true);
        $(".getVerify").css("color", "gray");
        // 等待提示
        var postTips = layer.load(1, {
            // 数组中第一个参数是button的透明度
            // 第二个是背景颜色
            shade: [0.3, "white"]
        });
        // 请求验证码
        var getVerifyPost = $.ajax({
            url: urlDns + "/getMsm_findps_app",
            type: 'post',
            dataType: "json",
            timeout: 30000, //2分钟超时
            data: {
                tel: tel
            },
            //请求成功
            success: function(data) {
                layer.close(postTips);
                console.log(JSON.stringify(data));
                if (data.result == 0) {
                    errorTips(data.message);
                    $(".getVerify").css("color", "#7EB6FF");
                    $(".getVerify").attr('disabled', false);

                } else {
                    // 倒计时重新获取验证码
                    getVerifyTimeout = setInterval(function() {
                        time = time - 1;
                        $(".getVerify").text(time + "秒后重新获取");
                        if (time < 1) {
                            clearInterval(getVerifyTimeout);
                            $(".getVerify").text("重新获取");
                            $(".getVerify").css("color", "#7EB6FF");
                            $(".getVerify").attr('disabled', false);
                        }
                    }, 1000);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus)
                layer.close(postTips);
                if (textStatus == 'timeout') {
                    getVerifyPost.abort();
                    alert("请求超时");
                    $(".getVerify").text("重新获取");
                    $(".getVerify").css("color", "#7EB6FF");
                    $(".getVerify").attr('disabled', false);
                }
                if (textStatus == 'error') {
                    console.log(errorThrown)
                    getVerifyPost.abort();　
                    alert("请求错误" + errorThrown);
                    $(".getVerify").text("重新获取");
                    $(".getVerify").css("color", "#7EB6FF");
                    $(".getVerify").attr('disabled', false);
                }
            }
        });

    }
});

// 下一步，验证验证码
$(".nextBtn").click(() => {
    var tel = $("#tel").val();
    var verify = $("#verify").val();
    if (tel == "") {
        errorTips("请输入手机号");
    } else if (!telReg.test(tel)) {
        errorTips("手机号码不正确");
    } else if (verify == "") {
        errorTips("请输入验证码");
    } else {
        // 等待提示
        var postTips = layer.load(1, {
            // 数组中第一个参数是button的透明度
            // 第二个是背景颜色
            shade: [0.3, "white"]
        });
        // 验证验证码
        var getVerifyPost = $.ajax({
            url: urlDns + "/check_code_app",
            type: 'post',
            dataType: "json",
            timeout: 30000, //半分钟超时
            data: {
                code: verify
            },
            //请求成功
            success: function(data) {
                layer.close(postTips);
                console.log(JSON.stringify(data));
                if (data.result == 1) {
                    sessionStorage.setItem("findPwdTel", tel);
                    location.href = "./resetPwd.html";
                } else {
                    errorTips("验证码错误");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus)
                layer.close(postTips);
                if (textStatus == 'timeout') {
                    getVerifyPost.abort();
                    alert("请求超时");
                }
                if (textStatus == 'error') {
                    console.log(errorThrown)
                    getVerifyPost.abort();　
                    alert("请求错误" + errorThrown);
                }
            }
        });
    }
});

// 给用户弹出错误提示的方法
function errorTips(info) {
    $(".error").text(info);
    $(".errorBg").css("display", "block");

    var t = setTimeout(function() {
        $(".errorBg").css("display", "none");
    }, 3000);

    $('.errorBg').click(() => {
        $(".errorBg").css("display", "none");
        clearTimeout(t);
    });
}