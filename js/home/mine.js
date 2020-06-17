mui.init();

var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
console.log("tel_app：" + tel_app);
console.log("pass_app：" + pass_app);

$.post(urlDns + "/control_app/yz/info/index", {
    pass_app: pass_app,
    tel_app: tel_app,
    code_app: code_app
}, function(data) {
    console.log(JSON.stringify(data));
    if (data.result == 0) {
        // 需要重新登录
        if (window.plus) {
            goToLogin("../register/login.html");
        } else {
            document.addEventListener('plusready', goToLogin, false);
        }
    } else {
        $(".userName").text(data.realname);
        $(".tel").text(data.tel);
        if (data.ishave_dw == 0) {
            // 无单位业者，不显示和单位的协议一项
            $(".acceptComContract").css("display", "none");
        }
    }

});

// 设置
$(".changePwd").click(() => {
    // mui.openWindow('./changePwd.html');
    mui.openWindow('./setting.html');
});

// 个人信息
$(".personalInfo").click(() => {
    mui.openWindow('./personalInfo.html');
});

// 商户信息
$(".businessInfo").click(() => {
    mui.openWindow('./businessInfo.html');
});

// 收入纳税信息
$(".taxesInfo").click(() => {
    mui.openWindow('./incomeInfo.html');
});

// 接受服务单位协议
$(".acceptComContract").click(() => {
    var ajaxPost = $.ajax({
        url: urlDns + "/control_app/yz/info/showUI",
        // 当参数为数组时，直接传过去后台接收不到，要设置traditional: true
        traditional: true,
        type: 'post',
        dataType: "json",
        data: {
            "type": 4,
            "pass_app": pass_app,
            "tel_app": tel_app,
            "code_app": code_app
        },
        timeout: 120000, //2分钟超时
        //请求成功
        success: function(data) {
            console.log(JSON.stringify(data));
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                // console.log(data.address)
                if (data.text) {
                    // 有文本返回，跳转到协议文本页面
                    mui.openWindow('./acceptComContract_text.html');
                    console.log(111)
                }
                if (data.imgs) {
                    // 返回的是图片，跳转协议图片页面
                    mui.openWindow('./contract_img.html');
                    console.log(222)
                }

            }


        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // layer.close(index);
            if (textStatus == 'timeout') {
                ajaxPost.abort();
                alert("请求超时");
            }
            if (textStatus == 'error') {
                ajaxPost.abort();　
                alert("请求错误" + errorThrown);
            }
        }
    });

});

// 商务秘书公司协议
$(".businessComContract").click(() => {
    mui.openWindow('./businessContract_text.html');
});