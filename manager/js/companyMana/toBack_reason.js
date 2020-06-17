var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 返回
$(".back").click(() => {
    history.back();
});

// 获取公司的ID
var comDetailId = sessionStorage.getItem("comDetailId");
console.log(comDetailId);


// 返回字数的方法
var checkStrLengths = function(str, maxLength) {
    var maxLength = maxLength;
    var result = 0;
    if (str && str.length > maxLength) {
        result = maxLength;
        // mui.toast("字数达到上限")
        // alert("字数达到上限");
        var newVal = $("#cont").val().slice(0, 300);
        $("#cont").val(newVal);
    } else {
        result = str.length;
    }
    return result;
}

// 监听textarea发生改变
$("#cont").on('input propertychange', function() {
    var textVal = $("#cont").val();
    var len;

    // 内容没有发生改变，确定按钮不可用
    if (textVal.length > 0) {
        $(".next").css("color", "#7EB6FF");
        $(".next").on("click", toBack);

    } else {
        $(".next").css("color", "rgb(153, 153, 153)");
        $(".next").off("click", toBack);
    }

    if (textVal) {
        len = checkStrLengths(textVal, 300);
    } else {
        len = 0
    }

    //显示字数
    $(".tips").html(len + '/' + 300 + "汉字");
});


// 退回的方法
function toBack() {
    var cont = $("#cont").val();
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/sf/uncheck",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            "id": comDetailId,
            "contents": cont,
            "pass_app": pass_app,
            "tel_app": tel_app,
            "code_app": code_app
        },
        //请求成功
        success: function(data) {
            console.log(JSON.stringify(data));
            layer.close(index);
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../../../page/register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                $(".success").css("display", "block");
                setTimeout(() => {
                    $(".success").css("display", "none");
                    history.go(-4);
                }, 1000);
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            layer.close(index);
            if (textStatus == 'timeout') {
                getData.abort();　
                alert("请求超时");
            }
            if (textStatus == 'error') {
                getData.abort();　
                alert("请求错误" + errorThrown);
            }
        }
    });
}