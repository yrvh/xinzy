sessionStorage.removeItem("name")

// 返回
$(".back").click(() => {
    location.href = "./login.html";
    localStorage.removeItem("upid");
});

// 扫码储存的id
var upid = localStorage.getItem("upid");
console.log(upid);


var checkedXzy = sessionStorage.getItem("checkedXzy");
// 已经点击过薪自由条款，返回时保留原本填好的数据状态
if (checkedXzy == 1) {
    $("#agree").attr("checked", "true");
    var tel = sessionStorage.getItem("tel_dl");
    var pwd1 = sessionStorage.getItem("password_dl");
    var pwd2 = sessionStorage.getItem("password2_dl");
    var verify = sessionStorage.getItem("verify_dl");
    var usertype = sessionStorage.getItem("usertype");
    $("#accountBank").val(tel);
    $("#accountName").val(verify);
    $("#account").val(pwd1);
    $("#password").val(pwd2);

    if (usertype == 1) {
        $(".uploadText").text("自由职业者（含合作伙伴）");
    }
    if (usertype == 2) {
        $(".uploadText").text("接受服务单位");
    }
}

// 用户类型，1为业者，2为单位
// 选择注册角色
var usertype = 1;
$(".uploadIdCard").click(() => {
    var popPicker = new mui.PopPicker();
    popPicker.setData([{
        value: 'yz',
        text: '自由职业者（含合作伙伴）'
    }, {
        value: 'dw',
        text: '接受服务单位'
    }])
    popPicker.show(function(selectItems) {
        // getProData(selectItems[0].value, selectItems[0].text);
        $(".uploadText").text(selectItems[0].text)
        if (selectItems[0].value == "yz") {
            usertype = 1;
            sessionStorage.setItem("usertype", usertype);
        }
        if (selectItems[0].value == "dw") {
            usertype = 2;
            sessionStorage.setItem("usertype", usertype);

        }
        // console.log("用户类型" + usertype)
    })
});

// 获取验证码
$(".get_check_code").on("click", get_code);

function get_code() {
    var tel = $("#accountBank").val();
    if (tel == "") {
        errorTips("请输入手机号");
    } else {
        $(".get_check_code").off("click")
            // 向后台发请求获取验证码
        $.post(urlDns + "/getMsm_app", {
            tel: tel
        }, function(data) {
            console.log(JSON.stringify(data));
            if (data.result == 0) {
                errorTips(data.message);
                $(".get_check_code").text("获取验证码");
                $(".get_check_code").css("color", "#7EB6FF");
                $(".get_check_code").on("click", get_code);
            } else {
                // console.log(data.msm)
                // 存一下在session里，防止查看条款跳转页面没保存好
                sessionStorage.setItem("check_code", data.msm);

                // 倒计时
                var time = 59;
                $(".get_check_code").text(time + "秒");
                $(".get_check_code").css("color", "gray");
                var t = setInterval(() => {
                    time = time - 1;
                    $(".get_check_code").text(time + "秒");
                    if (time < 1) {
                        clearInterval(t);
                        $(".get_check_code").text("重新获取");
                        $(".get_check_code").css("color", "#7EB6FF");
                        $(".get_check_code").on("click", get_code);
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
// var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;

// 提交
$(".submit").click(function() {
    submitFun();
});

// 继续完善资料
$(".open").click(() => {
    var usertype = sessionStorage.getItem("usertype");
    // 业者
    if (usertype == 1) {
        location.href = "./info_dl.html";
    }
    // 单位
    if (usertype == 2) {
        location.href = "./info_com_detail_dl.html";
    }

});

// 不完善资料，直接提交
$(".close").click(() => {
    errorTips("注册成功，等待审核")
    setTimeout(() => {
        // 获取当前窗口
        var curr = plus.webview.currentWebview();
        // 获取所有Webview窗口
        var wvs = plus.webview.all();
        for (var i = 0, len = wvs.length; i < len; i++) {
            //关闭除setting页面外的其他页面
            if (wvs[i].getURL() == curr.getURL())
                continue;
            plus.webview.close(wvs[i]);
        }
        // 清除缓存
        sessionStorage.clear();
        localStorage.clear();
        //打开login页面后再关闭setting页面
        plus.webview.open("./login.html");
        curr.close();
    }, 3000);
});

// 提交的请求
function submitFun() {
    // console.log("验证码" + check_code)
    // 手机号
    var reUserNum = $("#accountBank").val();
    // // 密码
    // var pwd1 = $("#account").val();
    // // 确认密码
    // var pwd2 = $("#password").val();
    // 验证码
    var verify = $("#accountName").val();
    // 勾选同意条款的按钮
    // $("#agree").attr("checked", "true")
    var agree = document.getElementById("agree").checked;
    // console.log($("#agree").prop("checked"));
    var usertype = sessionStorage.getItem("usertype");
    console.log(usertype)

    var check_code = sessionStorage.getItem("check_code");


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
    } else if (verify != check_code) {
        errorInfo = "验证码错误";
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

        var hasUserPost = $.ajax({
            url: urlDns + "/api/reg_dl/index",
            type: 'post',
            dataType: "json",
            data: {
                usertype: usertype,
                tel: reUserNum,
                // password: pwd1,
                upid: upid
            },
            timeout: 120000, //2分钟超时
            //请求成功
            success: function(data) {
                layer.close(index);
                console.log(JSON.stringify(data))
                if (data.status == 0) {
                    errorTips(data.message);
                }
                // 注册成功
                if (data.status == 1) {
                    sessionStorage.setItem("tel", reUserNum);
                    sessionStorage.setItem("uid", data.uid);
                    $(".black3").css("display", "block");
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

}


//同意条款
$("#agree").click(() => {
    // console.log($("#agree").prop("checked"))
    // 手机号
    var reUserNum = $("#accountBank").val();
    // 密码
    var pwd1 = $("#account").val();
    // 确认密码
    var pwd2 = $("#password").val();
    // 验证码
    var verify = $("#accountName").val();

    sessionStorage.setItem('tel_dl', reUserNum);
    sessionStorage.setItem('password_dl', pwd1);
    sessionStorage.setItem('password2_dl', pwd2);
    sessionStorage.setItem('verify_dl', verify);
    sessionStorage.setItem('checkedXzy', 1);
    sessionStorage.setItem('usertype', usertype);

    // 同意的时候打开条款页面
    if ($("#agree").prop("checked") == true) {
        location.href = "./xzyClause_dl.html";
    }
});
$(".clause").click(() => {
    location.href = "./xzyClause_dl.html";
});