var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

mui.init();
var flag = false;

// 该条记录的id
var incomeDetailId = sessionStorage.getItem("incomeDetailId");
console.log(incomeDetailId);

var isIn = sessionStorage.getItem("isIn");
console.log(isIn)
if (isIn == 0) {
    // 待审核、退回、通过等，内容不可编辑
    $(".serverName").attr("disabled", "true");
    $(".amount").attr("disabled", "true");
    $("header span").text("收入");
    $(".accptCom").off("click");
    $(".next").text("");
    // 服务内容
    $(".serverContBox").click(() => {
        sessionStorage.setItem("type", "onlyRead");
        location.href = "../textPage.html";
    });
    getData(incomeDetailId);
} else if (isIn == 1) {
    // 待提交，内容可编辑
    $(".serverName").removeAttr("disabled");
    $(".amount").removeAttr("disabled");
    $("header span").text("收入");
    $("#startTime").on("click", starTimeLen);
    $("#endTime").on("click", endTimeLen);
    $(".del_submit").css("display", "block");

    $.post(urlDns + "/control_app/yz/zf/editUI", {
        id: incomeDetailId,
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
            $(".comName").text(data.comname);
            $(".comName").attr("id", data.ttid);
            $(".serverName").val(data.name);
            $(".serverCont").text(data.descripts);
            $("#startDate").text(data.startdate);
            $("#endDate").text(data.enddate);
            $(".amountNum").val(data.fkmoney);
            $(".returnCont").text(data.reasons);

        }

    });


    // 选择单位
    $(".accptCom").on("click", function() {
        // 存一下周期，防止已经修改过，跳到下一个页面返回来后没保存
        var newStartDate = $("#startDate").text();
        var newEndDate = $("#endDate").text();
        var newServerName = $(".serverName").val();
        var newAmountNum = $(".amountNum").val();
        sessionStorage.setItem("newStartDate", newStartDate);
        sessionStorage.setItem("newEndDate", newEndDate);
        sessionStorage.setItem("newServerName", newServerName);
        sessionStorage.setItem("newAmountNum", newAmountNum);
        location.href = './incomeDetail_chooseCom.html';

    });

    // 如果修改过服务内容，获取服务内容进行渲染
    var newCont = sessionStorage.getItem("newCont");
    console.log(newCont);
    if (newCont) {
        setTimeout(() => {
            $(".serverCont").text(newCont);
        }, 100);

    }
    // 如果修改过发票抬头，获取发票抬头进行渲染
    var selectHeaderName = sessionStorage.getItem("selectHeaderName");
    var selectHeaderId = sessionStorage.getItem("selectHeaderId");
    console.log(selectHeaderId);
    if (selectHeaderId) {
        setTimeout(() => {
            $(".comName").text(selectHeaderName);
            $(".comName").attr("id", selectHeaderId);
        }, 100);

    }

    // 防止周期已经修改过，跳到下一个页面返回来后没保存
    var newStartDate = sessionStorage.getItem("newStartDate");
    var newEndDate = sessionStorage.getItem("newEndDate");
    if (newStartDate) {
        setTimeout(() => {
            $("#startDate").text(newStartDate);
            $("#endDate").text(newEndDate);
        }, 100);
    }

    // 防止劳务名称已经修改过，跳到下一个页面返回来后没保存
    var newServerName = sessionStorage.getItem("newServerName");
    if (newServerName) {
        setTimeout(() => {
            $(".serverName").val(newServerName);
        }, 100);
    }

    // 防止收入金额已经修改过，跳到下一个页面返回来后没保存
    var newAmountNum = sessionStorage.getItem("newAmountNum");
    if (newAmountNum) {
        setTimeout(() => {
            $(".amountNum").val(newAmountNum);
        }, 100);
    }

    // 填写服务内容
    $(".serverContBox").click(() => {
        sessionStorage.setItem("type", "cont");
        // 存一下周期，防止已经修改过，跳到下一个页面返回来后没保存
        var newStartDate = $("#startDate").text();
        var newEndDate = $("#endDate").text();
        var newServerName = $(".serverName").val();
        var newAmountNum = $(".amountNum").val();
        sessionStorage.setItem("newServerName", newServerName);
        sessionStorage.setItem("newStartDate", newStartDate);
        sessionStorage.setItem("newEndDate", newEndDate);
        sessionStorage.setItem("newAmountNum", newAmountNum);
        location.href = "../textPage.html";
    });

} else if (isIn == 2) {
    // 新增页面
    $(".serverName").removeAttr("disabled");
    $(".amount").removeAttr("disabled");
    $("header span").text("新增收入");
    $("#startTime").on("click", starTimeLen);
    $("#endTime").on("click", endTimeLen);
    // 选择单位
    $(".accptCom").on("click", function() {
        // 存一下周期，防止已经修改过，跳到下一个页面返回来后没保存
        var newStartDate = $("#startDate").text();
        var newEndDate = $("#endDate").text();
        var newServerName = $(".serverName").val();
        var newAmountNum = $(".amountNum").val();
        sessionStorage.setItem("newStartDate", newStartDate);
        sessionStorage.setItem("newEndDate", newEndDate);
        sessionStorage.setItem("newServerName", newServerName);
        sessionStorage.setItem("newAmountNum", newAmountNum);
        location.href = './incomeDetail_chooseCom.html';

    });

    // 如果修改过服务内容，获取服务内容进行渲染
    var newCont = sessionStorage.getItem("newCont");
    console.log(newCont);
    if (newCont) {
        setTimeout(() => {
            $(".serverCont").text(newCont);
        }, 100);

    }
    // 如果修改过发票抬头，获取发票抬头进行渲染
    var selectHeaderName = sessionStorage.getItem("selectHeaderName");
    var selectHeaderId = sessionStorage.getItem("selectHeaderId");
    console.log(selectHeaderId);
    if (selectHeaderId) {
        setTimeout(() => {
            $(".comName").text(selectHeaderName);
            $(".comName").attr("id", selectHeaderId);
        }, 100);
    }

    // 防止周期已经修改过，跳到下一个页面返回来后没保存
    var newStartDate = sessionStorage.getItem("newStartDate");
    var newEndDate = sessionStorage.getItem("newEndDate");
    if (newStartDate) {
        setTimeout(() => {
            $("#startDate").text(newStartDate);
            $("#endDate").text(newEndDate);
        }, 100);
    }

    // 防止劳务名称已经修改过，跳到下一个页面返回来后没保存
    var newServerName = sessionStorage.getItem("newServerName");
    if (newServerName) {
        setTimeout(() => {
            $(".serverName").val(newServerName);
        }, 100);
    }

    // 防止收入金额已经修改过，跳到下一个页面返回来后没保存
    var newAmountNum = sessionStorage.getItem("newAmountNum");
    if (newAmountNum) {
        setTimeout(() => {
            $(".amountNum").val(newAmountNum);
        }, 100);
    }

    // 填写服务内容
    $(".serverContBox").click(() => {
        sessionStorage.setItem("type", "cont");
        // 存一下周期，防止已经修改过，跳到下一个页面返回来后没保存
        var newStartDate = $("#startDate").text();
        var newEndDate = $("#endDate").text();
        var newServerName = $(".serverName").val();
        var newAmountNum = $(".amountNum").val();
        sessionStorage.setItem("newServerName", newServerName);
        sessionStorage.setItem("newStartDate", newStartDate);
        sessionStorage.setItem("newEndDate", newEndDate);
        sessionStorage.setItem("newAmountNum", newAmountNum);
        location.href = "../textPage.html";
    });
} else if (isIn == 4) {
    // 审核通过，内容不可编辑
    $(".serverName").attr("disabled", "true");
    $(".amount").attr("disabled", "true");
    $("header span").text("收入");
    $(".accptCom").off("click");
    $(".next").text("");
    // 显示私人账户净收入
    // $(".income").css("display", "block");
    // $(".incomeTitle").css("display", "block");
    // 服务内容
    $(".serverContBox").click(() => {
        sessionStorage.setItem("type", "onlyRead");
        location.href = "../textPage.html";
    });
    getData(incomeDetailId);
} else if (isIn == 3) {
    // 审核退回，内容不可编辑
    // editIncome_back 判断该条记录是否处于修改的状态，1为正在修改
    var editIncome_back = sessionStorage.getItem("editIncome_back");
    console.log(editIncome_back);
    if (editIncome_back == 1) {
        flag = true;
        $(".next").text("取消");
        $(".serverName").removeAttr("disabled");
        $(".amount").removeAttr("disabled");
        $("footer").css("display", "block");
        // 隐藏退回理由
        $(".returnTitle").css("display", "none");
        $(".returnCont").css("display", "none");
        // 日期可选择
        $(".timeBox").html(`
                <section id="startTime">
                    <span id="startDate">2019-08</span>
                    <img src="../../img/calendar.png" alt="">
                </section>
                至
                <section id="endTime">
                    <span id="endDate">2019-09</span>
                    <img src="../../img/calendar.png" alt="">
                </section>
            `);
        $(".timeBox").css("justify-content", "space-around");
        $("#startTime").on("click", starTimeLen);
        $("#endTime").on("click", endTimeLen);

        // 选择单位
        $(".accptCom").on("click", function() {
            // 存一下周期，防止已经修改过，跳到下一个页面返回来后没保存
            var newStartDate = $("#startDate").text();
            var newEndDate = $("#endDate").text();
            var newServerName = $(".serverName").val();
            var newAmountNum = $(".amountNum").val();
            var newCont = $(".serverCont").text();
            sessionStorage.setItem("newStartDate", newStartDate);
            sessionStorage.setItem("newEndDate", newEndDate);
            sessionStorage.setItem("newServerName", newServerName);
            sessionStorage.setItem("newAmountNum", newAmountNum);
            sessionStorage.setItem("newCont", newCont);
            location.href = './incomeDetail_chooseCom.html';

        });
        // 如果修改过服务内容，获取服务内容进行渲染
        var newCont = sessionStorage.getItem("newCont");
        console.log(newCont);
        if (newCont) {
            setTimeout(() => {
                $(".serverCont").text(newCont);
            }, 100);

        }
        // 如果修改过发票抬头，获取发票抬头进行渲染
        var selectHeaderName = sessionStorage.getItem("selectHeaderName");
        var selectHeaderId = sessionStorage.getItem("selectHeaderId");
        console.log(selectHeaderName);
        console.log(selectHeaderId);
        if (selectHeaderId) {
            setTimeout(() => {
                $(".comName").text(selectHeaderName);
                $(".comName").attr("id", selectHeaderId);
            }, 100);

        }

        // 防止周期已经修改过，跳到下一个页面返回来后没保存
        var newStartDate = sessionStorage.getItem("newStartDate");
        var newEndDate = sessionStorage.getItem("newEndDate");
        if (newStartDate) {
            setTimeout(() => {
                $("#startDate").text(newStartDate);
                $("#endDate").text(newEndDate);
            }, 100);
        }

        // 防止劳务名称已经修改过，跳到下一个页面返回来后没保存
        var newServerName = sessionStorage.getItem("newServerName");
        if (newServerName) {
            setTimeout(() => {
                $(".serverName").val(newServerName);
            }, 100);
        }

        // 防止收入金额已经修改过，跳到下一个页面返回来后没保存
        var newAmountNum = sessionStorage.getItem("newAmountNum");
        if (newAmountNum) {
            setTimeout(() => {
                $(".amountNum").val(newAmountNum);
            }, 100);
        }

        // 填写服务内容
        $(".serverContBox").click(() => {
            sessionStorage.setItem("type", "cont");
            // 存一下周期，防止已经修改过，跳到下一个页面返回来后没保存
            var newStartDate = $("#startDate").text();
            var newEndDate = $("#endDate").text();
            var newServerName = $(".serverName").val();
            var newAmountNum = $(".amountNum").val();
            var selectHeaderName = $(".comName").text();
            var selectHeaderId = $(".comName").attr("id");
            sessionStorage.setItem("newServerName", newServerName);
            sessionStorage.setItem("newStartDate", newStartDate);
            sessionStorage.setItem("newEndDate", newEndDate);
            sessionStorage.setItem("newAmountNum", newAmountNum);
            sessionStorage.setItem("selectHeaderName", selectHeaderName);
            sessionStorage.setItem("selectHeaderId", selectHeaderId);
            location.href = "../textPage.html";
        });
    } else {
        $(".serverName").attr("disabled", "true");
        $(".amount").attr("disabled", "true");
        $("header span").text("收入");
        $(".accptCom").off("click");
        $(".next").text("修改");

        // 显示退回理由
        $(".returnTitle").css("display", "block");
        $(".returnCont").css("display", "block");
        // 服务内容
        $(".serverContBox").click(() => {
            sessionStorage.setItem("type", "onlyRead");
            location.href = "../textPage.html";
        });
        getData(incomeDetailId);
    }

}

var year = new Date().getFullYear();
var month = new Date().getMonth() + 1;

// 格式化时间
function format(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num
    }
}
$("#startDate").text(year + "-" + format(month));
$("#endDate").text(year + "-" + format(month));

// 返回
$(".back").click(() => {
    // 清掉的这些数据，是为了防止业者修改了数据没有提交就返回了
    // 第二次进来进行了渲染
    sessionStorage.removeItem("newCont");
    sessionStorage.removeItem("selectHeaderName");
    sessionStorage.removeItem("selectHeaderId");

    sessionStorage.removeItem("newServerName");
    sessionStorage.removeItem("newStartDate");
    sessionStorage.removeItem("newEndDate");
    sessionStorage.removeItem("newAmountNum");
    sessionStorage.removeItem("editIncome_back");
    history.back();
});

// 保存
$(".next").click(() => {
    // 抬头id
    var comId = $(".comName").attr("id");
    // 服务名称
    var serverName = $(".serverName").val();
    // 服务内容
    var serverCont = $(".serverCont").text();
    // 开始日期
    var startDate = $("#startDate").text();
    // 结束日期
    var endDate = $("#endDate").text();
    // 收款金额
    var amountNum = $(".amountNum").val();
    if (isIn == 1) {
        // 待提交进来，修改保存的接口
        $.post(urlDns + "/control_app/yz/zf/edit", {
            id: incomeDetailId,
            ttid: comId,
            name: serverName,
            descripts: serverCont,
            starttime: startDate,
            endtime: endDate,
            fkmoney: amountNum,
            pass_app: pass_app,
            tel_app: tel_app,
            code_app: code_app
        }, function(data) {
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                // if (data.status == 1) {
                // 清掉的这些数据，是为了防止业者
                // 第二次进来进行渲染了旧数据
                sessionStorage.removeItem("newCont");
                sessionStorage.removeItem("selectHeaderName");
                sessionStorage.removeItem("selectHeaderId");

                sessionStorage.removeItem("newServerName");
                sessionStorage.removeItem("newStartDate");
                sessionStorage.removeItem("newEndDate");
                sessionStorage.removeItem("newAmountNum");
                history.back();
                // } else {
                //     alert("修改失败");
                // }
            }

        });
    }

    if (isIn == 2) {
        // 新增收入的保存
        $.post(urlDns + "/control_app/yz/zf/add", {
            ttid: comId,
            name: serverName,
            descripts: serverCont,
            starttime: startDate,
            endtime: endDate,
            fkmoney: amountNum,
            pass_app: pass_app,
            tel_app: tel_app,
            code_app: code_app
        }, function(data) {
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                // if (data.status == 1) {
                // 清掉的这些数据，是为了防止业者
                // 第二次进来进行渲染了旧数据
                sessionStorage.removeItem("newCont");
                sessionStorage.removeItem("selectHeaderName");
                sessionStorage.removeItem("selectHeaderId");

                sessionStorage.removeItem("newServerName");
                sessionStorage.removeItem("newStartDate");
                sessionStorage.removeItem("newEndDate");
                sessionStorage.removeItem("newAmountNum");
                history.back();
                // } else {
                //     alert("修改失败");
                // }
            }

        });
    }

    if (isIn == 3) {
        // 收入被退回的修改
        flag = !flag;
        if (flag == true) {
            sessionStorage.setItem("editIncome_back", 1);
            $(".next").text("取消");
            $(".serverName").removeAttr("disabled");
            $(".amount").removeAttr("disabled");
            $("footer").css("display", "block");
            // 隐藏退回理由
            $(".returnTitle").css("display", "none");
            $(".returnCont").css("display", "none");
            // 日期可选择
            $(".timeBox").html(`
                <section id="startTime">
                    <span id="startDate">2019-08</span>
                    <img src="../../img/calendar.png" alt="">
                </section>
                至
                <section id="endTime">
                    <span id="endDate">2019-09</span>
                    <img src="../../img/calendar.png" alt="">
                </section>
            `);
            $(".timeBox").css("justify-content", "space-around");
            $("#startTime").on("click", starTimeLen);
            $("#endTime").on("click", endTimeLen);

            $("#startDate").text(firstDate);
            $("#endDate").text(lastDate);
            // 选择单位
            $(".accptCom").on("click", function() {
                // 存一下周期，防止已经修改过，跳到下一个页面返回来后没保存
                var newStartDate = $("#startDate").text();
                var newEndDate = $("#endDate").text();
                var newServerName = $(".serverName").val();
                var newAmountNum = $(".amountNum").val();
                var newCont = $(".serverCont").text();
                sessionStorage.setItem("newStartDate", newStartDate);
                sessionStorage.setItem("newEndDate", newEndDate);
                sessionStorage.setItem("newServerName", newServerName);
                sessionStorage.setItem("newAmountNum", newAmountNum);
                sessionStorage.setItem("newCont", newCont);
                location.href = './incomeDetail_chooseCom.html';

            });

            // 填写服务内容
            $(".serverContBox").click(() => {
                sessionStorage.setItem("type", "cont");
                // 存一下周期，防止已经修改过，跳到下一个页面返回来后没保存
                var newStartDate = $("#startDate").text();
                var newEndDate = $("#endDate").text();
                var newServerName = $(".serverName").val();
                var newAmountNum = $(".amountNum").val();
                var selectHeaderName = $(".comName").text();
                var selectHeaderId = $(".comName").attr("id");
                sessionStorage.setItem("newServerName", newServerName);
                sessionStorage.setItem("newStartDate", newStartDate);
                sessionStorage.setItem("newEndDate", newEndDate);
                sessionStorage.setItem("newAmountNum", newAmountNum);
                sessionStorage.setItem("selectHeaderName", selectHeaderName);
                sessionStorage.setItem("selectHeaderId", selectHeaderId);
                location.href = "../textPage.html";
            });
        } else {
            sessionStorage.setItem("editIncome_back", 0);
            $(".next").text("修改");
            $(".serverName").attr("disabled", "true");
            $(".amount").attr("disabled", "true");
            $(".accptCom").off("click");
            $("footer").css("display", "none");
            // 显示退回理由
            $(".returnTitle").css("display", "block");
            $(".returnCont").css("display", "block");
            // 服务内容
            $(".serverContBox").click(() => {
                sessionStorage.setItem("type", "onlyRead");
                location.href = "../textPage.html";
            });
            getData(incomeDetailId);
        }
    }


});

// 退回后的删除
$(".del").click(() => {
    var ids = [];
    ids.push(incomeDetailId);

    $.ajax({
        type: "post",
        url: urlDns + "/control_app/yz/zf/del",
        // 当参数为数组时，直接传过去后台接收不到，要设置traditional: true
        traditional: true,
        data: {
            "id": ids,
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
                    goToLogin("../register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                // if (data.status == 1) {
                sessionStorage.removeItem("newCont");
                sessionStorage.removeItem("selectHeaderName");
                sessionStorage.removeItem("selectHeaderId");

                sessionStorage.removeItem("newServerName");
                sessionStorage.removeItem("newStartDate");
                sessionStorage.removeItem("newEndDate");
                sessionStorage.removeItem("newAmountNum");
                history.back();
                // } else {
                //     alert("删除失败");
                // }
            }

        }
    });
});

// 退回修改后的提交
$(".submit").click(() => {
    // 抬头id
    var comId = $(".comName").attr("id");
    // 服务名称
    var serverName = $(".serverName").val();
    // 服务内容
    var serverCont = $(".serverCont").text();
    // 开始日期
    var startDate = $("#startDate").text();
    // 结束日期
    var endDate = $("#endDate").text();
    // 收款金额
    var amountNum = $(".amountNum").val();
    $.ajax({
        type: "post",
        url: urlDns + "/control_app/yz/zf/edit",
        data: {
            id: incomeDetailId,
            ttid: comId,
            name: serverName,
            descripts: serverCont,
            starttime: startDate,
            endtime: endDate,
            fkmoney: amountNum,
            pass_app: pass_app,
            tel_app: tel_app,
            code_app: code_app
        },
        dataType: "json",
        success: function(data) {
            // console.log(JSON.stringify(data));
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                // if (data.status == 1) {
                sessionStorage.removeItem("newCont");
                sessionStorage.removeItem("selectHeaderName");
                sessionStorage.removeItem("selectHeaderId");

                sessionStorage.removeItem("newServerName");
                sessionStorage.removeItem("newStartDate");
                sessionStorage.removeItem("newEndDate");
                sessionStorage.removeItem("newAmountNum");
                history.back();
                // } else {
                //     alert("删除失败");
                // }
            }

        }
    });
});


var firstDate, endDate;
// 请求页面数据的方法
function getData(id) {
    $.post(urlDns + "/control_app/yz/zf/editUI", {
        id: id,
        pass_app: pass_app,
        tel_app: tel_app,
        code_app: code_app
    }, function(data) {
        console.log(JSON.stringify(data))
        if (data.result == 0) {
            // 需要重新登录
            if (window.plus) {
                goToLogin("../register/login.html");
            } else {
                document.addEventListener('plusready', goToLogin, false);
            }
        } else {
            // if (data.status == 1) {
            firstDate = data.startdate;
            lastDate = data.enddate;
            $(".comName").text(data.comname);
            $(".comName").attr("id", data.ttid);
            $(".serverName").val(data.name);
            $(".serverCont").text(data.descripts);
            $(".amountNum").val(data.fkmoney);
            $(".returnCont").text(data.reasons);
            $(".timeBox").text(data.startdate + "至" + data.enddate);
            $(".timeBox").css("justify-content", "flex-end");
            // }
        }

    });
}




var startMonth = 0;
var startYear = year - 1;
// 服务周期开始时间
function starTimeLen() {
    var dtPicker = new mui.DtPicker({
        type: 'month',
        beginDate: new Date(year - 1, month - 1),
        endDate: new Date(year, month - 1)
    });
    /*  type参数：'datetime'-完整日期视图(年月日时分)
            'date'--年视图(年月日)
            'time' --时间视图(时分)
            'month'--月视图(年月)
            'hour'--时视图(年月日时)
    */
    dtPicker.show(function(selectItems) {
        var y = selectItems.y.text; //获取选择的年
        var m = selectItems.m.text; //获取选择的月
        startYear = y;
        startMonth = m;
        // var d = selectItems.d.text; //获取选择的日
        var date = y + "-" + m;
        $("#startDate").text(date);
    })
}

// 服务周期结束时间
function endTimeLen() {
    var dtPicker = new mui.DtPicker({
        type: 'month',
        beginDate: new Date(startYear, startMonthFormat(startMonth)),
        endDate: new Date(year, month - 1)
    });

    dtPicker.show(function(selectItems) {
        var y = selectItems.y.text; //获取选择的年
        var m = selectItems.m.text; //获取选择的月
        startMonth = m;
        // var d = selectItems.d.text; //获取选择的日
        var date = y + "-" + m;
        $("#endDate").text(date);
    });
}

// // 获取开始时间年份的可选范围
// function year_range(i) {
//     if (i >= 6) {
//         console.log(year - 1)
//         return year - 1;
//     } else {
//         console.log(year)
//         return year;
//     }
// }

// 获取结束时间月份的可选范围
function startMonthFormat(i) {
    if (i == 0) {
        return 0;
    } else {
        return i - 1;
    }
}

// 待提交的删除
$(".del_wait").click(() => {
    var ids = [];
    ids.push(incomeDetailId);

    $.ajax({
        type: "post",
        url: urlDns + "/control_app/yz/zf/del",
        // 当参数为数组时，直接传过去后台接收不到，要设置traditional: true
        traditional: true,
        data: {
            "id": ids,
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
                    goToLogin("../register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                // if (data.status == 1) {

                history.back();
                // } else {
                //     alert("删除失败");
                // }
            }

        }
    });
});

// 待提交状态下的单个提交
$(".submit_wait").click(() => {
    // console.log("哈哈哈")
    var ids = [];
    ids.push(incomeDetailId);
    console.log(JSON.stringify(ids))
    $.ajax({
        type: "post",
        url: urlDns + "/control_app/yz/zf/send",
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
                    goToLogin("../register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                // if (data.status == 1) {

                history.back();
                // } else {
                //     alert("删除失败");
                // }
            }

        }
    });
});