// 返回登录页面
$(".backBox").click(() => {
    location.href = "./login.html";
});

var findPwdTel = sessionStorage.getItem("findPwdTel");
var findPwdVerify = sessionStorage.getItem("findPwdVerify");
console.log(findPwdTel)
console.log(findPwdVerify)
    // 检验密码格式 8-18位字母和数字组成
var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,18}$/;

$(".nextBtn").click(() => {
    var pwd1 = $("#tel").val();
    var pwd2 = $("#verify").val();
    if (pwd1 == "") {
        errorTips("请输入新密码");
    } else if (!pwdReg.test(pwd1)) {
        errorTips("密码由8-18位字母和数字组成");
    } else if (pwd2 == "") {
        errorTips("请确认新密码");
    } else if (pwd1 != pwd2) {
        errorTips("两次密码不一致");
    } else {
        // 等待提示
        var postTips = layer.load(1, {
            // 数组中第一个参数是button的透明度
            // 第二个是背景颜色
            shade: [0.3, "white"]
        });
        // 修改密码
        var changePwdPost = $.ajax({
            url: urlDns + "/findpassword_app",
            type: 'post',
            dataType: "json",
            timeout: 120000, //2分钟超时
            data: {
                tel: findPwdTel,
                password: pwd1
            },
            //请求成功
            success: function(data) {
                layer.close(postTips);
                console.log(JSON.stringify(data));
                if (data.result == 1) {
                    sessionStorage.removeItem("findPwdTel");
                    errorTips("修改成功！");
                    setTimeout(() => {
                        location.href = "./login.html";
                    }, 1500);

                } else if (data.result == 0) {
                    errorTips(data.message);
                } else {
                    errorTips("修改失败");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(textStatus)
                layer.close(postTips);
                if (textStatus == 'timeout') {
                    changePwdPost.abort();
                    alert("请求超时");
                }
                if (textStatus == 'error') {
                    console.log(errorThrown)
                    changePwdPost.abort();　
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