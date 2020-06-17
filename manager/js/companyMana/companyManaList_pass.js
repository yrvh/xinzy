var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);


$(".back").click(() => {
    history.back();
});

// 所有业务员的数组
var staffArr = [];

var page = 1;
// 判断是否是过滤的状态，0位全部，1为已分配，2为未分配
var isFilter = 0;

$(function() {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/sf/list",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            // page, 第几页
            "page": 1,
            // rows, 页数大小
            "rows": 20,
            // 搜索框内容
            "name": "",
            // status (1,等待审核  11审核退回  8审核通过)
            "status": 8,
            "pass_app": pass_app,
            "tel_app": tel_app,
            "code_app": code_app,
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
                var htmlStr = "";
                for (var i = 0; i < data.rows.length; i++) {

                    if (data.rows[i].employeename == "") {
                        htmlStr += `
                        <div class="item" comId="${data.rows[i].id}">
                            <input class="select" name="hh" value="${data.rows[i].id}" type="radio">
                                <section class="toDetail" comId="${data.rows[i].id}">
                                    <div class="comInfoBox">
                                            <img class="comImg" src="${data.rows[i].icon != '/img/R.png'?data.rows[i].icon:'../../../img/com_default_Icon.png'}" alt="">
                                            <span id="">${data.rows[i].name}</span>
                                        </div>
                                    <img class="comInfo" src="../../../img/next.png" alt="">
                                </section>
                        </div>
                    `;
                    } else {
                        htmlStr += `
                        <div class="item">
                            <input class="select" name="hh" value="${data.rows[i].id}" type="radio">
                                <section class="toDetail" comId="${data.rows[i].id}">
                                    <div class="comInfoBox">
                                        <img class="comImg" src="${data.rows[i].icon != '/img/R.png'?data.rows[i].icon:'../../../img/com_default_Icon.png'}" alt="">
                                        <span id="">${data.rows[i].name}</span>
                                    </div>
                                    <img class="comInfo" src="../../../img/next.png" alt="">
                                    <div class="staffBox">
                                        <span class="tip">业务员：</span>
                                        <span class="staffName">${data.rows[i].employeename}</span>
                                    </div>
                                </section>
                        </div>
                    `;
                    }
                }
                $(".companyBox").html(htmlStr);

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

    // 请求所有业务员数据
    $.post(urlDns + "/control_app/ms/sf/fpUI", {
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
            for (var i = 0; i < data.rows.length; i++) {
                staffArr.push({ "value": data.rows[i].id, "text": data.rows[i].name });
            }
            console.log(JSON.stringify(staffArr));

        }

    });




});



// 选择按钮
var flag = false;
$(".next").click(() => {
    flag = !flag;
    if (flag == true) {
        $(".next").text("取消选择");
        $(".select").css("display", "block");
        $(".comInfoBox").css("left", "20px");
        $(".staffBox").css("display", "block");
        $(".comInfo").css("display", "none");
        $(".searchBox").css("display", "none");
        $(".statusBox").css("display", "block");
        $(".back").css("display", "none");
        $(".select_all").css("display", "block");
        $("footer").css("display", "block");
        $(".comBox").css("margin-bottom", "70px");
    } else {
        $(":radio[name='hh']").prop("checked", false);
        $(".next").text("选择");
        $(".select").css("display", "none");
        $(".comInfoBox").css("left", "0px");
        $(".staffBox").css("display", "none");
        $(".comInfo").css("display", "block");
        $(".searchBox").css("display", "block");
        $(".statusBox").css("display", "none");
        $(".select_all").css("display", "none");
        $(".back").css("display", "block");
        $("footer").css("display", "none");
        $(".comBox").css("margin-bottom", "20px");
    }

});


// 跳转详情页面
$(document).on("click", ".companyBox .toDetail", function(e) {
    var comId = $(this).attr("comId");
    console.log(comId)
        // 存储一个标志，记录是待审核的还是通过或退回的
    sessionStorage.setItem('com_status', 1);
    // 存储单位的ID
    sessionStorage.setItem('comDetailId', comId);
    // page.chooseType();
    location.href = "./companyManaDetail_one.html";
});

// // 全选按钮
// $(".select_all").click(() => {
//     $(":checkbox[name='hh']").prop("checked", "checked");
// });


// 分配业务按钮，弹出选择列表
$(".distrib").click(() => {
    var value = $('input[type=radio]:checked').map(function() { return this.value });
    console.log(JSON.stringify(value[0]));
    if (value.length == 0) {
        // 没选择公司，提示用户
        errorTips("请选择单位");
    } else {
        var popPicker = new mui.PopPicker();
        popPicker.setData(staffArr)
            // [{ value: 'ywj', text: '北海骄龙网络有限公司' },
            //     { value: 'aaa', text: 'xxxxxxx有限公司' },
            //     { value: 'lj', text: 'xxxxxxx有限公司' },
            //     { value: 'ymt', text: 'xxxxxxx有限公司' },
            // ]
        popPicker.show(function(selectItems) {
            // $(".selectComName").text(selectItems[0].text);
            // $(".selectComName").attr("id", selectItems[0].value);
            // console.log(selectItems[0].text);
            // console.log(selectItems[0].value);
            sendStaff(value[0], selectItems[0].value);
        })
    }

});
// /control_app/ms/sf/fp   业务分配接口，需要参数：sfid(单位id),fpid(分配到的业务员ID)

function sendStaff(comTd, staffId) {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/sf/fp",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            // 单位id
            "sfid": comTd,
            // 业务员id
            "fpid": staffId,
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
                    location.reload();
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


// 给用户弹出错误提示的方法
function errorTips(info) {
    $(".error").text(info);
    $(".errorBg").css("display", "block");
    $('.errorBg').click(() => {
        $(".errorBg").css("display", "none");
    });
    setTimeout(function() {
        $(".errorBg").css("display", "none");
    }, 1500);
}

// 业务状态按钮
$(".statusBox").click(() => {
    var popPicker = new mui.PopPicker();
    popPicker.setData([
        { value: 'all', text: '全部' },
        { value: 'already', text: '已分配' },
        { value: 'notHave', text: '未分配' },
    ])

    popPicker.show(function(selectItems) {
        filterStatus(selectItems[0].value, selectItems[0].text)

    })
});

// 搜索
$(".search").click(() => {
    var searchCont = $("#name").val();
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/sf/list",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            // page, 第几页
            "page": 1,
            // rows, 页数大小
            "rows": 20,
            // 搜索框内容
            "name": searchCont,
            // status (1,等待审核  11审核退回  8审核通过)
            "status": 8,
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
                var htmlStr = "";
                for (var i = 0; i < data.rows.length; i++) {

                    if (data.rows[i].employeename == "") {
                        htmlStr += `
                        <div class="item" comId="${data.rows[i].id}">
                            <input class="select" name="hh" value="${data.rows[i].id}" type="radio">
                                <section class="toDetail" comId="${data.rows[i].id}">
                                    <div class="comInfoBox">
                                            <img class="comImg" src="${data.rows[i].icon}" alt="">
                                            <span id="">${data.rows[i].name}</span>
                                        </div>
                                    <img class="comInfo" src="../../../img/next.png" alt="">
                                </section>
                        </div>
                    `;
                    } else {
                        htmlStr += `
                        <div class="item">
                            <input class="select" name="hh" value="${data.rows[i].id}" type="radio">
                                <section class="toDetail" comId="${data.rows[i].id}">
                                    <div class="comInfoBox">
                                        <img class="comImg" src="${data.rows[i].icon}" alt="">
                                        <span id="">${data.rows[i].name}</span>
                                    </div>
                                    <img class="comInfo" src="../../../img/next.png" alt="">
                                    <div class="staffBox">
                                        <span class="tip">业务员：</span>
                                        <span class="staffName">${data.rows[i].employeename}</span>
                                    </div>
                                </section>
                        </div>
                    `;
                    }
                }
                $(".companyBox").html(htmlStr);
                page = 1;
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
});

// 清空搜索框
$(".toEmpty").click(() => {
    $(".searchIn>input").val("");
});

// 筛选业务状态的方法
function filterStatus(v, t) {
    if (v == "all") {
        $(".status").text("全部");
        isFilter = 0;
        var index = layer.load(1, {
            // 数组中第一个参数是button的透明度
            // 第二个是背景颜色
            shade: [0.3, "white"]
        });
        var getData = $.ajax({
            url: urlDns + "/control_app/ms/sf/list",
            type: 'post',
            dataType: "json",
            timeout: 120000, //2分钟超时
            data: {
                "page": 1,
                "rows": 20,
                "name": "",
                "status": 8,
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
                    var htmlStr = "";
                    for (var i = 0; i < data.rows.length; i++) {

                        if (data.rows[i].employeename == "") {
                            htmlStr += `
                            <div class="item" comId="${data.rows[i].id}">
                                <input class="select" name="hh" value="${data.rows[i].id}" type="radio">
                                    <section class="toDetail" comId="${data.rows[i].id}">
                                        <div class="comInfoBox">
                                                <img class="comImg" src="${data.rows[i].icon}" alt="">
                                                <span id="">${data.rows[i].name}</span>
                                            </div>
                                            <img class="comInfo" src="../../../img/next.png" alt="">
                                    </section>
                            </div>
                        `;
                        } else {
                            htmlStr += `
                            <div class="item">
                                <input class="select" name="hh" value="${data.rows[i].id}" type="radio">
                                    <section class="toDetail" comId="${data.rows[i].id}">
                                        <div class="comInfoBox">
                                            <img class="comImg" src="${data.rows[i].icon}" alt="">
                                            <span id="">${data.rows[i].name}</span>
                                        </div>
                                        <img class="comInfo" src="../../../img/next.png" alt="">
                                        <div class="staffBox">
                                            <span class="tip">业务员：</span>
                                            <span class="staffName">${data.rows[i].employeename}</span>
                                        </div>
                                    </section>
                            </div>
                        `;
                        }
                    }
                    $(".companyBox").html(htmlStr);
                    $(".select").css("display", "block");
                    $(".comInfoBox").css("left", "20px");
                    $(".staffBox").css("display", "block");
                    $(".comInfo").css("display", "none");
                    page = 1;

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
    if (v == "already") {
        $(".status").text("已分配");
        //已分配
        isFilter = 1;
        var index = layer.load(1, {
            // 数组中第一个参数是button的透明度
            // 第二个是背景颜色
            shade: [0.3, "white"]
        });
        var getData = $.ajax({
            url: urlDns + "/control_app/ms/sf/list",
            type: 'post',
            dataType: "json",
            timeout: 120000, //2分钟超时
            data: {
                "page": 1,
                "rows": 20,
                "name": "",
                "status": 8,
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
                    var htmlStr = "";
                    for (var i = 0; i < data.rows.length; i++) {

                        if (data.rows[i].employeename != "") {
                            htmlStr += `
                            <div class="item">
                                <input class="select" name="hh" value="${data.rows[i].id}" type="radio">
                                    <section class="toDetail" comId="${data.rows[i].id}">
                                        <div class="comInfoBox">
                                            <img class="comImg" src="${data.rows[i].icon}" alt="">
                                            <span id="">${data.rows[i].name}</span>
                                        </div>
                                        <img class="comInfo" src="../../../img/next.png" alt="">
                                        <div class="staffBox">
                                            <span class="tip">业务员：</span>
                                            <span class="staffName">${data.rows[i].employeename}</span>
                                        </div>
                                    </section>
                            </div>
                        `;
                        } else {
                            htmlStr += "";
                        }
                    }
                    $(".companyBox").html(htmlStr);
                    $(".select").css("display", "block");
                    $(".staffBox").css("display", "block");
                    $(".comInfo").css("display", "none");
                    $(".comInfoBox").css("left", "20px");
                    page = 1;

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

    if (v == "notHave") {
        $(".status").text("未分配");
        // 未分配
        isFilter = 2;
        var index = layer.load(1, {
            // 数组中第一个参数是button的透明度
            // 第二个是背景颜色
            shade: [0.3, "white"]
        });
        var getData = $.ajax({
            url: urlDns + "/control_app/ms/sf/list",
            type: 'post',
            dataType: "json",
            timeout: 120000, //2分钟超时
            data: {
                "page": 1,
                "rows": 20,
                "name": "",
                "status": 8,
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
                    var htmlStr = "";
                    for (var i = 0; i < data.rows.length; i++) {

                        if (data.rows[i].employeename == "") {
                            htmlStr += `
                            <div class="item" comId="${data.rows[i].id}">
                                <input class="select" name="hh" value="${data.rows[i].id}" type="radio">
                                    <section class="toDetail" comId="${data.rows[i].id}">
                                        <div class="comInfoBox">
                                                <img class="comImg" src="${data.rows[i].icon}" alt="">
                                                <span id="">${data.rows[i].name}</span>
                                            </div>
                                            <img class="comInfo" src="../../../img/next.png" alt="">
                                    </section>
                            </div>
                        `;
                        } else {
                            htmlStr += "";
                        }
                    }
                    $(".companyBox").html(htmlStr);
                    $(".select").css("display", "block");
                    $(".comInfoBox").css("left", "20px");
                    $(".comInfo").css("display", "none");

                    page = 1;

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
}

// 加载下一页
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        page = page + 1;
        if (isFilter == 0) {
            // 全部数据
            $.post(urlDns + "/control_app/ms/sf/list", {
                page: page,
                rows: 20,
                name: "",
                status: 8,
                pass_app: pass_app,
                tel_app: tel_app,
                code_app: code_app
            }, (data) => {
                console.log(JSON.stringify(data));
                if (data.result == 0) {
                    // 需要重新登录
                    if (window.plus) {
                        goToLogin("../../../page/register/login.html");
                    } else {
                        document.addEventListener('plusready', goToLogin, false);
                    }
                } else {
                    if (data.rows.length > 0) {
                        var htmlStr = "";
                        for (var i = 0; i < data.rows.length; i++) {

                            if (data.rows[i].employeename == "") {
                                htmlStr += `
                                <div class="item" comId="${data.rows[i].id}">
                                    <input class="select" name="hh" value="${data.rows[i].id}" type="radio">
                                        <section class="toDetail" comId="${data.rows[i].id}">
                                            <div class="comInfoBox">
                                                    <img class="comImg" src="${data.rows[i].icon}" alt="">
                                                    <span id="">${data.rows[i].name}</span>
                                                </div>
                                            <img class="comInfo" src="../../../img/next.png" alt="">
                                        </section>
                                </div>
                            `;
                            } else {
                                htmlStr += `
                                <div class="item">
                                    <input class="select" name="hh" value="${data.rows[i].id}" type="radio">
                                        <section class="toDetail" comId="${data.rows[i].id}">
                                            <div class="comInfoBox">
                                                <img class="comImg" src="${data.rows[i].icon}" alt="">
                                                <span id="">${data.rows[i].name}</span>
                                            </div>
                                            <img class="comInfo" src="../../../img/next.png" alt="">
                                            <div class="staffBox">
                                                <span class="tip">业务员：</span>
                                                <span class="staffName">${data.rows[i].employeename}</span>
                                            </div>
                                        </section>
                                </div>
                            `;
                            }
                        }
                        $(".companyBox").append(htmlStr);
                        $(".select").css("display", "block");
                        $(".comInfoBox").css("left", "20px");
                        if (flag == true) {
                            $(".staffBox").css("display", "block");
                            $(".comInfo").css("display", "none");
                        } else {
                            $(":radio[name='hh']").prop("checked", false);
                            $(".staffBox").css("display", "none");
                            $(".comInfo").css("display", "block");
                        }
                    }
                }


            });
        }
        if (isFilter == 1) {
            // 已分配的状态
            $.post(urlDns + "/control_app/ms/sf/list", {
                page: page,
                rows: 20,
                name: "",
                status: 8,
                pass_app: pass_app,
                tel_app: tel_app,
                code_app: code_app
            }, (data) => {
                console.log(JSON.stringify(data));
                if (data.result == 0) {
                    // 需要重新登录
                    if (window.plus) {
                        goToLogin("../../../page/register/login.html");
                    } else {
                        document.addEventListener('plusready', goToLogin, false);
                    }
                } else {
                    if (data.rows.length > 0) {
                        var htmlStr = "";
                        for (var i = 0; i < data.rows.length; i++) {

                            if (data.rows[i].employeename != "") {
                                htmlStr += `
                            <div class="item">
                                <input class="select" name="hh" value="${data.rows[i].id}" type="radio">
                                    <section class="toDetail" comId="${data.rows[i].id}">
                                        <div class="comInfoBox">
                                            <img class="comImg" src="${data.rows[i].icon}" alt="">
                                            <span id="">${data.rows[i].name}</span>
                                        </div>
                                        <img class="comInfo" src="../../../img/next.png" alt="">
                                        <div class="staffBox">
                                            <span class="tip">业务员：</span>
                                            <span class="staffName">${data.rows[i].employeename}</span>
                                        </div>
                                    </section>
                            </div>
                        `;
                            } else {
                                htmlStr += "";
                            }
                        }
                        $(".companyBox").append(htmlStr);
                        $(".select").css("display", "block");
                        $(".comInfoBox").css("left", "20px");
                        if (flag == true) {
                            $(".staffBox").css("display", "block");
                            $(".comInfo").css("display", "none");
                        } else {
                            $(":radio[name='hh']").prop("checked", false);
                            $(".staffBox").css("display", "none");
                            $(".comInfo").css("display", "block");
                        }
                    }
                }


            });
        }
        if (isFilter == 2) {
            // 未分配的状态
            $.post(urlDns + "/control_app/ms/sf/list", {
                page: page,
                rows: 20,
                name: "",
                status: 8,
                pass_app: pass_app,
                tel_app: tel_app,
                code_app: code_app
            }, (data) => {
                console.log(JSON.stringify(data));
                if (data.result == 0) {
                    // 需要重新登录
                    if (window.plus) {
                        goToLogin("../../../page/register/login.html");
                    } else {
                        document.addEventListener('plusready', goToLogin, false);
                    }
                } else {
                    if (data.rows.length > 0) {
                        var htmlStr = "";
                        for (var i = 0; i < data.rows.length; i++) {

                            if (data.rows[i].employeename == "") {
                                htmlStr += `
                            <div class="item" comId="${data.rows[i].id}">
                                <input class="select" name="hh" value="${data.rows[i].id}" type="radio">
                                    <section class="toDetail" comId="${data.rows[i].id}">
                                        <div class="comInfoBox">
                                                <img class="comImg" src="${data.rows[i].icon}" alt="">
                                                <span id="">${data.rows[i].name}</span>
                                            </div>
                                        <img class="comInfo" src="../../../img/next.png" alt="">
                                    </section>
                            </div>
                        `;
                            } else {
                                htmlStr += "";
                            }
                        }
                        $(".companyBox").append(htmlStr);
                        $(".select").css("display", "block");
                        $(".comInfoBox").css("left", "20px");
                        if (flag == true) {
                            $(".staffBox").css("display", "block");
                            $(".comInfo").css("display", "none");
                        } else {
                            $(":radio[name='hh']").prop("checked", false);
                            $(".staffBox").css("display", "none");
                            $(".comInfo").css("display", "block");
                        }
                    }
                }


            });
        }


    }
});