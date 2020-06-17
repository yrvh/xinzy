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


var id = sessionStorage.getItem("id");
console.log(id)

var page = 1;
var status = 0;


// 标题渲染
if (id == "noSubmit") {
    status = 0;
    $("header span").text("待提交");
    sessionStorage.setItem("isIn", 1);
    var htmlStr = "";
    $.post(urlDns + "/control_app/yz/zf/list", {
        // 状态  待提交0
        status: status,
        // 第几页
        page: 1,
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
            for (var i = 0; i < data.rows.length; i++) {
                htmlStr += `
                <div class="item">
                    <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
                    <div class="comTime">
                        <span class="comName">${data.rows[i].comname}</span>
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
}

if (id == "noExamine") {
    status = 2;
    $("header span").text("待审核");
    $(".next").css("display", "none");
    sessionStorage.setItem("isIn", 0);
    var htmlStr = "";
    $.post(urlDns + "/control_app/yz/zf/list", {
        // 状态  待审核2
        status: status,
        // 第几页
        page: 1,
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
            for (var i = 0; i < data.rows.length; i++) {
                htmlStr += `
                <div class="item">
                    <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
                    <div class="comTime">
                        <span class="comName">${data.rows[i].comname}</span>
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
}
if (id == "ToBack") {
    status = 5;
    $("header span").text("审核退回");
    $(".next").css("display", "none");
    sessionStorage.setItem("isIn", 3);
    $(".searchBox").css("display", "block");
    $(".filterBox").css("display", "block");
    $(".list").css("margin-top", "148px");
    var htmlStr = "";
    $.post(urlDns + "/control_app/yz/zf/list", {
        // 状态 退回5
        status: status,
        // 第几页
        page: 1,
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
            for (var i = 0; i < data.rows.length; i++) {
                htmlStr += `
                <div class="item">
                    <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
                    <div class="comTime">
                        <span class="comName">${data.rows[i].comname}</span>
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


    // 搜索
    $(".search").click(() => {
        var searchCont = $(".searchCont").val();
        var htmlStr = "";
        $.post(urlDns + "/control_app/yz/zf/list", {
            // 状态  退回5
            status: status,
            // 第几页
            page: 1,
            // 一页的条数
            rows: 20,
            // 搜索框的内容
            name: searchCont,
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
                for (var i = 0; i < data.rows.length; i++) {
                    htmlStr += `
                        <div class="item">
                            <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
                            <div class="comTime">
                                <span class="comName">${data.rows[i].comname}</span>
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
                page = 1;
            }

        });
    });


    // 过滤
    $(".ok").click(() => {
        // 收起过滤条件
        $(".nextImg").attr("src", "../../img/next.png");
        $(".filterParamBg").css("display", "none");
        open = !open;

        var selectComId = $(".selectComName").attr("id");
        var startDate = $("#startDate").text();
        var endDate = $("#endDate").text();
        var htmlStr = "";
        $.post(urlDns + "/control_app/yz/zf/list", {
            // 状态  退回5
            status: status,
            // 第几页
            page: 1,
            // 一页的条数
            rows: 20,
            // 搜索框的内容
            name: "",
            // 过滤条件的开始时间和结束时间
            startdate: startDate,
            enddate: endDate,
            // 过滤条件的发票抬头
            comid: selectComId,
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
                for (var i = 0; i < data.rows.length; i++) {
                    htmlStr += `
                <div class="item">
                    <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
                    <div class="comTime">
                        <span class="comName">${data.rows[i].comname}</span>
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
                page = 1;
            }

        });
    });
}
if (id == "completed") {
    status = 6;
    $("header span").text("审核通过");
    $(".next").css("display", "none");
    sessionStorage.setItem("isIn", 4);
    $(".searchBox").css("display", "block");
    $(".filterBox").css("display", "block");
    $(".list").css("margin-top", "148px");
    var htmlStr = "";
    $.post(urlDns + "/control_app/yz/zf/list", {
        // 状态  通过6
        status: status,
        // 第几页
        page: 1,
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
            for (var i = 0; i < data.rows.length; i++) {
                htmlStr += `
                <div class="item">
                    <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
                    <div class="comTime">
                        <span class="comName">${data.rows[i].comname}</span>
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

    // 搜索
    $(".search").click(() => {
        var searchCont = $(".searchCont").val();
        var htmlStr = "";
        $.post(urlDns + "/control_app/yz/zf/list", {
            // 状态  通过6
            status: status,
            // 第几页
            page: 1,
            // 一页的条数
            rows: 20,
            // 搜索框的内容
            name: searchCont,
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
                for (var i = 0; i < data.rows.length; i++) {
                    htmlStr += `
                        <div class="item">
                            <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
                            <div class="comTime">
                                <span class="comName">${data.rows[i].comname}</span>
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
                page = 1;
            }

        });
    });


    // 过滤
    $(".ok").click(() => {
        // 收起过滤条件
        $(".nextImg").attr("src", "../../img/next.png");
        $(".filterParamBg").css("display", "none");
        open = !open;

        var selectComId = $(".selectComName").attr("id");
        var startDate = $("#startDate").text();
        var endDate = $("#endDate").text();
        console.log(startDate)
        console.log(endDate)
        var htmlStr = "";
        $.post(urlDns + "/control_app/yz/zf/list", {
            // 状态  通过6
            status: status,
            // 第几页
            page: 1,
            // 一页的条数
            rows: 20,
            // 搜索框的内容
            name: "",
            // 过滤条件的开始时间和结束时间
            startdate: startDate,
            enddate: endDate,
            // 过滤条件的发票抬头
            comid: selectComId,
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
                for (var i = 0; i < data.rows.length; i++) {
                    htmlStr += `
                        <div class="item">
                            <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
                            <div class="comTime">
                                <span class="comName">${data.rows[i].comname}</span>
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
                page = 1;
            }

        });
    });
}

// 清空搜索框
$(".toEmpty").click(() => {
    $(".searchIn>input").val("");
});

// 当点击搜索框的时候，把筛选条件框收起来
$(".searchBox").click(() => {
    $(".nextImg").attr("src", "../../img/next.png");
    $(".filterParamBg").css("display", "none");
    open = !open;
});

// 待提交页面的选择按钮
var flag = false;
$(".next").click(() => {
    flag = !flag;
    if (flag) {
        // 选中的复选框的值
        $(".comTime").css("padding-left", "33px");
        $(".amount").css("padding-left", "33px");
        $(".select").css("display", "block");
        $("footer").css("display", "block");
        $(".next").text("取消选择");
        $(".back").css("display", "none");
        $(".select_all").css("display", "block");
        $(".list").css("margin-bottom", "70px");
    } else {
        $(":checkbox[name='hh']").prop("checked", false);
        $(".comTime").css("padding-left", "15px");
        $(".amount").css("padding-left", "15px");
        $(".select").css("display", "none");
        $("footer").css("display", "none");
        $("footer").css("display", "none");
        $(".next").text("选择");
        $(".back").css("display", "block");
        $(".select_all").css("display", "none");
        $(".list").css("margin-bottom", "20px");

    }

});

// 全选按钮
$(".select_all").click(() => {
    $(":checkbox[name='hh']").prop("checked", "checked");
});

// 提交
$(".submit").click(() => {
    var value = $('input[type=checkbox]:checked').map(function() { return this.value });
    // console.log(JSON.stringify(value));
    var ids = [];
    for (var i = 0; i < value.length; i++) {
        a = value[i];
        console.log(value[i]);
        ids.push(value[i]);
    }
    console.log(ids instanceof Array)
    console.log(JSON.stringify(ids))

    $.ajax({
        type: "post",
        url: urlDns + "/control_app/yz/zf/send",
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
                    goToLogin("../register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                // if (data.status == 1) {
                // history.back()
                // 刷新页面数据
                $(".success").css("display", "block");
                setTimeout(() => {
                    $(".success").css("display", "none");
                    location.reload();
                }, 1000);
                // } else {
                //     alert("提交失败");
                // }
            }

        }
    });
});

// 删除
$(".del").click(() => {
    var value = $('input[type=checkbox]:checked').map(function() { return this.value });
    // console.log(JSON.stringify(value));
    var ids = [];
    for (var i = 0; i < value.length; i++) {
        console.log(value[i])
        ids.push(value[i]);
    }
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
                location.reload();
                // } else {
                //     alert("删除失败");
                // }
            }

        }
    });
});


// 展开/收起过滤条件
var open = false;
$(".filterBox").click(() => {
    open = !open;
    if (open == true) {
        $(".nextImg").attr("src", "../../img/down.png");
        $(".filterParamBg").css("display", "block");
    } else {
        $(".nextImg").attr("src", "../../img/next.png");
        $(".filterParamBg").css("display", "none");
    }
});

// 点击空白收起过滤条件
$(".noneParamBg").click(() => {
    $(".filterParamBg").css("display", "none");
    $(".nextImg").attr("src", "../../img/next.png");
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

// -------------------------------------------------------
var comArr = [];
$.post(urlDns + "/control_app/yz/tt/list", {
    pass_app: pass_app,
    tel_app: tel_app,
    code_app: code_app
}, function(data) {
    // console.log(JSON.stringify(data))
    if (data.result == 0) {
        // 需要重新登录
        if (window.plus) {
            goToLogin("../register/login.html");
        } else {
            document.addEventListener('plusready', goToLogin, false);
        }
    } else {
        for (var i = 0; i < data.rows.length; i++) {
            comArr.push({ "value": data.rows[i].id, "text": data.rows[i].name });
        }
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

// -----------------------------------------------------------

// 重置筛选条件
$(".reset").click(() => {
    $(".selectComName").text("");
    $("#startDate").text(year + "-" + format(month));
    $("#endDate").text(year + "-" + format(month));
});

// 跳转详情页面
$(document).on("click", ".list .href", function(e) {
    var detailId = $(this).attr("detailId");
    console.log(detailId)
    sessionStorage.setItem('incomeDetailId', detailId);
    // page.chooseType();
    location.href = "./incomeDetail.html";
});

// 加载下一页
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        page = page + 1;
        console.log(page)
        $.post(urlDns + "/control_app/yz/zf/list", {
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
                        <div class="item">
                            <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
                            <div class="comTime">
                                <span class="comName">${data.rows[i].comname}</span>
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
                    $(".list").append(htmlStr);
                }
            }


        });
    }
});