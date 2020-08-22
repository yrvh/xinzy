var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

// 字数
var wordNum = 0;
var tel = sessionStorage.getItem("tel");
var incomeDetailId = sessionStorage.getItem("incomeDetailId");
var isIn = sessionStorage.getItem("isIn");


// 获取传过来的参数type，以分辨是从哪个页面点进来的
var type = sessionStorage.getItem("type");
console.log(type)
if (type == "cont") {
    // console.log(isIn)
    $(".title").text("劳务、服务内容");
    $("#cont").attr("placeholder", "请填写劳务、服务内容");
    wordNum = 300;
    $(".next").on("click", function() {
        var newCont = $("#cont").val();
        sessionStorage.setItem("newCont", newCont);
        history.back();
    });

    // 不是新增收入进来的页面，请求服务内容
    if (isIn != 2) {
        $.post(urlDns + "/control_app/yz/zf/editUI", {
            id: incomeDetailId,
            pass_app: pass_app,
            tel_app: tel_app,
            code_app: code_app
        }, function(data) {
            console.log(JSON.stringify(data))
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("./register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }

            } else {
                // if (data.status == 1) {
                $("#cont").val(data.descripts);
                $(".tips").text(data.descripts.length + "/" + wordNum);
                // }
            }

        });
    }


    var newCont = sessionStorage.getItem("newCont");
    console.log(newCont);
    if (newCont) {

        $(".next").css("color", "#7EB6FF");
        setTimeout(() => {
            $("#cont").val(newCont);
        }, 100);
    }
}
if (type == "address") {
    var comAddress = sessionStorage.getItem("comAddress");
    if (comAddress) {
        $(".cont").val(comAddress);
    }
    $(".title").text("公司邮寄地址");
    $("#cont").attr("placeholder", "请填写公司邮寄地址");
    wordNum = 100;
    $(".next").on("click", function() {
        var newValue = $("#cont").val();
        sessionStorage.setItem("comAddress", newValue);
        history.back();
    });
}
if (type == "header_address") {
    $(".title").text("公司邮寄地址");
    wordNum = 100;
    var comAddress = sessionStorage.getItem("comAddress");
    console.log(comAddress);
    var headerId = sessionStorage.getItem("headerId");
    console.log(headerId);
    if (comAddress) {
        // console.log(111)s
        $("#cont").val(comAddress);
        $(".tips").text(comAddress.length + "/100汉字");
    }
    // $.post(urlDns + "/control_app/yz/tt/editUI", { id: headerId }, function(data) {
    //     console.log(JSON.stringify(data));
    //     if (data.status == 1) {
    //         $(".cont").val(data.address);
    //         $(".tips").text(data.address.length + "/100汉字");
    //     }

    // });
    $(".next").on("click", function() {
        var newValue = $("#cont").val();
        console.log(newValue)
        sessionStorage.setItem("comAddress", newValue);
        history.back();
    });
}
if (type == "businessRange") {
    $(".title").text("经营范围");
    $(".next").css("display", "none");
    $("textarea").attr("disabled", "disabled");
    // var tel = sessionStorage.getItem("tel");
    $.post(urlDns + "/user_app/yz/checkUI", {
        tel: tel,
        pass_app: pass_app,
        tel_app: tel_app,
        code_app: code_app
    }, function(data) {
        console.log(JSON.stringify(data.businessRange));
        if (data.result == 0) {
            // 需要重新登录
            if (window.plus) {
                goToLogin("./register/login.html");
            } else {
                document.addEventListener('plusready', goToLogin, false);
            }
        } else {
            $("textarea").val(data.businessRange);
            $(".tips").text(data.businessRange.length + "/300汉字");
        }

    });
}
if (type == "onlyRead") {
    // 收入管理模块的查看
    $(".title").text("劳务、服务内容");
    $(".next").css("display", "none");
    $("textarea").attr("disabled", "disabled");
    wordNum = 300;
    $.post(urlDns + "/control_app/yz/zf/editUI", {
        id: incomeDetailId,
        pass_app: pass_app,
        tel_app: tel_app,
        code_app: code_app
    }, function(data) {
        console.log(JSON.stringify(data))
        if (data.result == 0) {
            // 需要重新登录
            if (window.plus) {
                goToLogin("./register/login.html");
            } else {
                document.addEventListener('plusready', goToLogin, false);
            }
        } else {
            // if (data.status == 1) {
            $("#cont").text(data.descripts);
            $(".tips").text(data.descripts.length + "/" + wordNum);
            // }
        }

    });
}
if (type == "onlyRead_fp") {
    // 发票模块的查看
    $(".title").text("劳务、服务内容");
    $(".next").css("display", "none");
    $("textarea").attr("disabled", "disabled");
    wordNum = 300;
    $.post(urlDns + "/control_app/yz/fp/editUI", {
        id: incomeDetailId,
        pass_app: pass_app,
        tel_app: tel_app,
        code_app: code_app
    }, function(data) {
        console.log(JSON.stringify(data))
        if (data.result == 0) {
            // 需要重新登录
            if (window.plus) {
                goToLogin("./register/login.html");
            } else {
                document.addEventListener('plusready', goToLogin, false);
            }
        } else {
            // if (data.status == 1) {
            $("#cont").text(data.descripts);
            $(".tips").text(data.descripts.length + "/" + wordNum);
            // }
        }

    });
}

if (type == "return") {
    $(".next").text("提交");
    $(".title").text("退回理由");
    $("#cont").attr("placeholder", "请填写退回理由");
    wordNum = 100;
    $(".next").on("click", returnReason);
}

if (type == "incomeReturn") {
    // 收入记录的id
    var incomeDetailId = sessionStorage.getItem("incomeDetailId");
    console.log(incomeDetailId);

    $(".next").text("确定");
    $(".title").text("退回理由");
    $("#cont").attr("placeholder", "请填写退回理由");
    wordNum = 100;

    $(".next").click(() => {
        var reasons = $("#cont").val();
        $.post(urlDns + "/control_app/yz/zf/back", {
            id: incomeDetailId,
            reasons: reasons,
            pass_app: pass_app,
            tel_app: tel_app,
            code_app: code_app
        }, function(data) {
            console.log(JSON.stringify(data));
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("./register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                // if (data.status == 1) {
                history.go(-3);
                // location.href="./page/income/income_acceptCom/incomeDetailList_a.html";
                // }
            }
        });
    });
}

// 退回请求
function returnReason() {
    var xyid = sessionStorage.getItem("xyid");
    var cont = $("#cont").val();
    // console.log(xyid)
    // console.log(cont)
    $.post(urlDns + "/user_app/yz/uncheck", {
        contents: cont,
        pass_app: pass_app,
        tel_app: tel_app,
        code_app: code_app
    }, function(data) {
        console.log(JSON.stringify(data));
        if (data.result == 0) {
            // 需要重新登录
            if (window.plus) {
                goToLogin("./register/login.html");
            } else {
                document.addEventListener('plusready', goToLogin, false);
            }
        } else {
            console.log("6343002")
            sessionStorage.setItem("status", data.code);
            $(".success").css("display", "block");
            setTimeout(() => {
                $(".success").css("display", "none");
                location.href = "./register/audit.html";
            }, 1000);


        }

    });
}

// 初始内容
var initVal = $("#cont").val();

// 返回
$(".back").click(() => {
    history.back();
});

// 返回字数的方法
var checkStrLengths = function(str, maxLength) {
    var maxLength = maxLength;
    var result = 0;
    if (str && str.length > maxLength) {
        result = maxLength;
        // mui.toast("字数达到上限")
        // alert("字数达到上限");
        var newVal = $("#cont").val().slice(0, wordNum);
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
    if (textVal == initVal) {
        $(".next").css("color", "rgb(153, 153, 153)");

    } else {
        $(".next").css("color", "#7EB6FF");
    }

    if (textVal) {
        len = checkStrLengths(textVal, wordNum);
    } else {
        len = 0
    }

    //显示字数
    $(".tips").html(len + '/' + wordNum + "汉字");
});

// 确定按钮的执行事件
function writeCont() {
    history.back();
}