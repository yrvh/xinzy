mui.init();


var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 返回
$(".back").click(() => {
    history.back();
});

// 检验密码格式 8-18位字母和数字组成
var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;
$(".next").click(() => {
    var newPwd = $("#newPwd").val();
    var comfirmPwd = $("#comfirmPwd").val();
    var oldPwd = $("#oldPwd").val();

    if (oldPwd == "") {
        errorInfo = "请输入旧密码";
        errorTips(errorInfo);
    } else if (newPwd == "") {
        errorInfo = "请输入新密码";
        errorTips(errorInfo);
    } else if (!pwdReg.test(newPwd)) {
        errorInfo = "新密码由8-18位字母和数字组成";
        errorTips(errorInfo);
    } else if (comfirmPwd == "") {
        errorInfo = "请确认新密码";
        errorTips(errorInfo);
    } else if (newPwd != comfirmPwd) {
        errorTips("新密码和确认密码不一致");
    } else {
        // console.log("请求接口")
        $.post(urlDns + "/control_app/yz/edit_password", {
            oldpassword: oldPwd,
            newpassword: newPwd,
            pass_app: pass_app,
            tel_app: tel_app,
            code_app: code_app
        }, function(data) {
            console.log(JSON.stringify(data));
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../../../page/register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                if (data.status == 1) {
                    errorTips("修改成功");
                    localStorage.setItem("pass_app", newPwd);
                    setTimeout(() => {
                        history.back();
                    }, 1500);
                }
                if (data.status == 0) {
                    errorTips("原密码不正确");
                }
            }

        });
    }
});

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