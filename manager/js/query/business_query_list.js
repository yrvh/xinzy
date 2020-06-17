mui.init();
// 返回
$(".back").click(() => {
    history.back();
});

var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

// 录入方式addtype（业者录入为："yz"    单位录入:"sf"）
// 状态码income_status（1：待业者确认，3：业者退回，2.待秘书公司确认，5：秘书公司退回，6：完成）
// 获取录入方式
var addtype = sessionStorage.getItem("addtype");
// 获取状态码
var income_status = sessionStorage.getItem("income_status");

// 渲染标题
if (addtype == "sf") {
    if (income_status == 1) {
        $("header span").text("待业者确认");
    }
    if (income_status == 3) {
        $("header span").text("业者退回");
    }
    if (income_status == 2) {
        $("header span").text("待商秘公司确认");
    }
    if (income_status == 5) {
        $("header span").text("商秘公司退回");
    }
    if (income_status == 6) {
        $("header span").text("已完成");
    }
}
if (addtype == "yz") {
    if (income_status == 2) {
        $("header span").text("待商秘公司审核");
    }
    if (income_status == 5) {
        $("header span").text("商秘公司退回");
    }
    if (income_status == 6) {
        $("header span").text("完成");
    }
}


// 请求数据
$.post(urlDns + "/control_app/hhr/zf/list", {
    // 状态
    status: income_status,
    // 录入方式
    addtype: addtype,
    // 第几页
    page: 1,
    // 一页的条数
    rows: 20,
    // 搜索框的内容
    name: "",
    // 过滤条件的开始时间和结束时间
    startdate: "",
    enddate: "",
    // 过滤条件的单位ID
    sfid: "",
    // 过滤条件的业者ID
    yzid: "",
    pass_app: pass_app,
    tel_app: tel_app,
    code_app: code_app
}, function(data) {
    console.log(JSON.stringify(data));
    if (data.result == 0) {
        // 需要重新登录
        if (window.plus) {
            goToLogin("../../register/login.html");
        } else {
            document.addEventListener('plusready', goToLogin, false);
        }
    } else {
        var htmlStr = "";
        for (var i = 0; i < data.rows.length; i++) {
            htmlStr += `
                <div>
                    <input class="select" name="hh" value="beihai" type="checkbox">
                    <div class="comTime">
                        <span class="comName">${data.rows[i].realname}</span>
                        <div class="href" detailId="${data.rows[i].id}">
                            <span class="time">${data.rows[i].zq}</span>
                            <img src="../../img/next.png" alt="">
                        </div>
                    </div>
                    <div class="amount">
                        <span>${data.rows[i].name}</span>
                        <span>${data.rows[i].fkmoney}</span>
                    </div>
                </div>
            `;
        }
        $(".list").html(htmlStr);
    }

});


// 跳转详情页面
$(document).on("click", ".list .href", function(e) {
    var detailId = $(this).attr("detailId");
    console.log(detailId)
    sessionStorage.setItem('incomeDetailId', detailId);
    // page.chooseType();
    location.href = "./check_income_detail.html";
});


// 展开/收起过滤条件
var open = false;
$(".filterBox").click(() => {
    open = !open;
    if (open == true) {
        $(".nextImg").attr("src", "../../../img/down.png");
        $(".filterParamBg").css("display", "block");
    } else {
        $(".nextImg").attr("src", "../../../img/next.png");
        $(".filterParamBg").css("display", "none");
    }
});

// 点击空白收起过滤条件
$(".noneParamBg").click(() => {
    $(".filterParamBg").css("display", "none");
    $(".nextImg").attr("src", "../../../img/next.png");
    open = !open;
});

// 当点击搜索框的时候，把筛选条件框收起来
$(".searchBox").click(() => {
    $(".nextImg").attr("src", "../../../img/next.png");
    $(".filterParamBg").css("display", "none");
    open = !open;
});


// 选择筛选的日期
$("#startTime").on("click", starTimeLen);
$("#endTime").on("click", endTimeLen);
var year = new Date().getFullYear();
var month = new Date().getMonth() + 1;
var nowdate = new Date().getDate();
// 默认时间为当前月份
$("#startDate").text(year + "-" + format(month) + "-" + format(nowdate));
$("#endDate").text(year + "-" + format(month) + "-" + format(nowdate));

// 格式化时间
function format(num) {
    if (num < 10) {
        return "0" + num;
    } else {
        return num
    }
}

// 服务周期开始时间
function starTimeLen() {
    var dtPicker = new mui.DtPicker({
        type: 'date',
        // beginDate: new Date(year, 00),
        endDate: new Date(year, month - 1, nowdate)
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
        var d = selectItems.d.text; //获取选择的日
        var date = y + "-" + m + "-" + d;
        $("#startDate").text(date);
    })
}

// 服务周期结束时间
function endTimeLen() {
    var dtPicker = new mui.DtPicker({
        type: 'date',
        // beginDate: new Date(year, 00),
        endDate: new Date(year, month - 1, nowdate)
    });

    dtPicker.show(function(selectItems) {
        var y = selectItems.y.text; //获取选择的年
        var m = selectItems.m.text; //获取选择的月
        var d = selectItems.d.text; //获取选择的日
        var date = y + "-" + m + "-" + d;
        $("#endDate").text(date);
    });
}


// 重置筛选条件
$(".reset").click(() => {
    $(".selectComName").text("");
    $("#startDate").text(year + "-" + format(month));
    $("#endDate").text(year + "-" + format(month));
});

// ================================================
var comArr = [];
$.post(urlDns + "/control_app/yz/tt/list", {
        pass_app: pass_app,
        tel_app: tel_app,
        code_app: code_app
    },
    function(data) {
        // console.log(JSON.stringify(data))
        for (var i = 0; i < data.rows.length; i++) {
            comArr.push({ "value": data.rows[i].id, "text": data.rows[i].name });
        }
        // console.log(JSON.stringify(comArr))
    });

// 选择接受服务单位
$(".selectCom").on("click", selectCom);

function selectCom() {
    var popPicker = new mui.PopPicker();
    popPicker.setData(comArr)
        // [{ value: 'ywj', text: '北海骄龙网络有限公司' },
        //     { value: 'aaa', text: 'xxxxxxx有限公司' },
        //     { value: 'lj', text: 'xxxxxxx有限公司' },
        //     { value: 'ymt', text: 'xxxxxxx有限公司' },
        // ]
    popPicker.show(function(selectItems) {
        $(".selectComName").text(selectItems[0].text);
        $(".selectComName").attr("id", selectItems[0].value);
        // console.log(selectItems[0].text);
        // console.log(selectItems[0].value);
    })
}
// ================================================



// 加载下一页
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        page = page + 1;
        console.log(page)
        $.post(urlDns + "/control_app/yz/fp/list", {
            // 状态  待提交0
            status: status,
            // 第几页
            page: page,
            // 一页的条数
            rows: 20,
            // 搜索框的内容
            name: "",
            // 过滤条件的开始时间和结束时间
            startdate: "",
            enddate: "",
            // 过滤条件的发票抬头
            comid: "",
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
                if (data.rows.length > 0) {
                    var htmlStr = "";
                    for (var i = 0; i < data.rows.length; i++) {
                        htmlStr += `
                            <div class="${data.rows[i].id}">
                                <input class="select" name="hh" value="beihai" type="checkbox">
                                <div class="comTime">
                                    <span class="comName">${data.rows[i].comname}</span>
                                    <div class="href" detailId="${data.rows[i].id}">
                                        <span class="time">${data.rows[i].addtime}</span>
                                        <img src="../../img/next.png" alt="">
                                    </div>
                                </div>
                                <div class="amount">
                                    <span>${data.rows[i].name}</span>
                                    <span>${data.rows[i].money}</span>
                                </div>
                            </div>
                        `;
                    }
                    $(".list").append(htmlStr);
                }
            }


        });
    }
});