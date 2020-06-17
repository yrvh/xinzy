mui.init();

var tel_app = localStorage.getItem("tel_app");
var pass_app = localStorage.getItem("pass_app");
var code_app = localStorage.getItem("code_app");

$(".comfirm").click(() => {
    location.href = "../../main.html";
});

// 返回
$(".pre").click(() => {
    history.back();
});

var tel = sessionStorage.getItem("tel");
// 判断和单位的协议是文本还是图片
var xytype;
// 判断业者是否有单位
var ishave_dw;
// ajax请求默认异步请求，但xytype变量在里面赋值还没有完，底下的代码就执行完了，
// xytype的值可能用的原来的值，所以将请求设置为同步请求
$.ajaxSettings.async = false;
$.post(urlDns + "/user_app/yz/checkUI", {
    tel: tel,
    tel_app: tel_app,
    pass_app: pass_app,
    code_app: code_app
}, function(data) {
    if (data.result == 0) {
        // 需要重新登录
        if (window.plus) {
            goToLogin("./login.html");
        } else {
            document.addEventListener('plusready', goToLogin, false);
        }
    } else {
        localStorage.setItem("ishave_dw", data.ishave_dw);
        localStorage.setItem("userType", data.userType);
        console.log(JSON.stringify(data));
        console.log("用户类型：" + data.userType)
            // console.log(data.zzshdde);
            // console.log(data.gshdde);
        console.log(data.ishave_dw);
        // console.log(data.dlregid);
        // zzsjntype增值税是按月还是按季，1.按月 2. 按季度 3.按年
        console.log(data.zzsjntype);
        if (data.zzsjntype == 1) {
            $(".valueAddedTitle").text("增值税（按月）");
        } else if (data.zzsjntype == 2) {
            $(".valueAddedTitle").text("增值税（按季）");
        } else if (data.zzsjntype == 3) {
            $(".valueAddedTitle").text("增值税（按年）");
        }
        if (data.dlregid == 0) {
            // 自行注册
            $(".next").css("display", "none");
            $(".btnBox").css("display", "block");
        }
        if (data.dlregid > 0) {
            // 代理注册
            $(".next").css("display", "block");
            $(".btnBox").css("display", "none");
            if (data.ishave_dw == 1) {
                // 有单位
                $(".pageNum").text("(3/5)");
            }
            if (data.ishave_dw == 0) {
                // 无单位
                $(".pageNum").text("(3/4)");
            }
        }

        xytype = data.xytype;
        ishave_dw = data.ishave_dw;
        console.log("收入范围：" + data.monthsy)
            // 收入范围
        $(".incomeNum").text(data.monthsy);
        // 行业类型
        $(".type").text(data.hyname);
        // 增值税核定定额
        $(".valueAddedNum").text(data.zzshdde);
        // 个税核定定额
        $(".personalIncomeNum").text(data.gshdde);
    }

});
// console.log(xytype);

// 下一页的跳转地址
var nextUrl;
if (ishave_dw == 1) {
    sessionStorage.setItem("ishave_dw", 1);
    // 有单位

    // xytype为1，协议是文本，为2是图片
    if (xytype == 1) {
        // 和单位的协议是文本
        nextUrl = "./twoContract_confirm.html";
    }
    if (xytype == 2) {
        // 和单位的协议是图片
        nextUrl = "./twoContractImg_confirm.html";
    }

}
if (ishave_dw == 0) {
    sessionStorage.setItem("ishave_dw", 0);
    // 无单位
    nextUrl = "./businessComContract_comfirm.html";
}

// 下一页
$(".next").click(() => {
    location.href = nextUrl;
});

// 同意按钮
$(".agree").click(() => {
    $.post(urlDns + "/user_app/yz/check", {
        tel_app: tel_app,
        pass_app: pass_app,
        code_app: code_app
    }, function(data) {
        if (data.result == 0) {
            // 需要重新登录
            if (window.plus) {
                goToLogin("./login.html");
            } else {
                document.addEventListener('plusready', goToLogin, false);
            }
        } else {
            // sessionStorage.clear();
            // $(".success").css("display", "block");
            // setTimeout(() => {
            //     $(".success").css("display", "none");
            //     location.href = "./login.html";
            // }, 1000);
            getContrat();
        }

    });

});

// 退回
$(".refuse").click(() => {
    sessionStorage.setItem("type", "return");
    location.href = "../textPage.html";
});

// 弹出三方协议
function getContrat() {
    $(".threeBoxBg").css("display", "block");

    var threeContractPost = $.ajax({
        url: urlDns + "/user_app/yz/check_3_xieyiUI",
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
            console.log("用户类型：" + data.userType)
            if (data.result == 0) {
                location.reload();
            } else {

                $(".cont").html(data.text);

            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(textStatus)
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

// 同意三方协议
$(".agreeThree").click(() => {
    var userType = localStorage.getItem("userType");
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
})

// 不同意三方协议
$(".disagreeThree").click(() => {
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
})