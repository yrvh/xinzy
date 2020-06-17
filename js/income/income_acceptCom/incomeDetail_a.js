var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

mui.init();

// 返回
$(".back").click(() => {
    history.back();
});

// 该条记录的id
var incomeDetailId = sessionStorage.getItem("incomeDetailId");
console.log(incomeDetailId);

var isIn = sessionStorage.getItem("isIn");
console.log(isIn)
if (isIn == 1) {
    // 显示退回/确认按钮
    $("footer").css("display", "block");

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
                goToLogin("../../register/login.html");
            } else {
                document.addEventListener('plusready', goToLogin, false);
            }
        } else {
            $(".comName").text(data.comname);
            $(".comName").attr("id", data.ttid);
            $(".serverName").val(data.name);
            $(".serverCont").text(data.descripts);
            $(".timeBox").text(data.startdate + "至" + data.enddate);
            $(".timeBox").css("justify-content", "flex-end");
            $(".amountNum").val(data.fkmoney);
            if (data.reasons) {
                $(".returnCont").text(data.reasons);
            }
        }
    });
}


if (isIn == 0) {
    // 不显示退回/确认按钮
    $("footer").css("display", "none");
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
                goToLogin("../../register/login.html");
            } else {
                document.addEventListener('plusready', goToLogin, false);
            }
        } else {
            $(".comName").text(data.comname);
            $(".comName").attr("id", data.ttid);
            $(".serverName").val(data.name);
            $(".serverCont").text(data.descripts);
            $(".timeBox").text(data.startdate + "至" + data.enddate);
            $(".timeBox").css("justify-content", "flex-end");
            $(".amountNum").val(data.fkmoney);
            if (data.reasons) {
                $(".returnTitle").css("display", "block");
                $(".returnCont").css("display", "block");
                $(".returnCont").text(data.reasons);
            }


        }

    });

}

// 劳务、服务内容详情
$(".serverContBox").click(() => {
    sessionStorage.setItem("type", "onlyRead");
    location.href = "../../textPage.html";
});

// 确认
$(".ok").click(() => {
    var ids = [];
    ids.push(incomeDetailId);

    $.ajax({
        type: "post",
        url: urlDns + "/control_app/yz/zf/check",
        // 当参数为数组时，直接传过去后台接收不到，要设置traditional: true
        traditional: true,
        data: {
            "ids": ids,
            "pass_app": pass_app,
            "tel_app": tel_app,
            "code_app": code_app
        },
        dataType: "json",
        success: function(data) {
            // console.log(JSON.stringify(data));
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../../register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                $(".success").css("display", "block");
                setTimeout(() => {
                    $(".success").css("display", "none");
                    history.go(-2);
                }, 1000);


            }

        }
    });
});

// 退回
$(".return").click(() => {
    sessionStorage.setItem("type", "incomeReturn");
    location.href = "../../textPage.html";
});