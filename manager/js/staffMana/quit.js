var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 返回
$(".back").click(() => {
    history.back();
});

var page = 1;

$(function() {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/employee_manage/list",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            // 第几页
            "page": 1,
            // 页数大小
            "rows": 20,
            // 搜索框的内容
            "name": "",
            // 状态：1使用中 2停用
            "status": 2,
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
                    htmlStr += `
                    <div class="item">
                        <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
                        <section class="toDetail" staffId="${data.rows[i].id}">
                            <div class="comInfoBox">
                                <div id="">${data.rows[i].name}</div>
                            </div>
                            <span class="tel">${data.rows[i].tel}</span>
                            <img class="comInfo" src="../../../img/next.png" alt="">
                        </section>

                    </div>
                `;
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
        $(".searchBox").css("display", "none");
        $(".statusBox").css("display", "block");
        $(".back").css("display", "none");
        $(".select_all").css("display", "block");
        $("footer").css("display", "block");
        $(".comBox").css("top", "44px");
        $(".comBox").css("margin-bottom", "70px");
    } else {
        $(":checkbox[name='hh']").prop("checked", false);
        $(".next").text("选择");
        $(".select").css("display", "none");
        $(".comInfoBox").css("left", "0px");
        $(".staffBox").css("display", "none");
        $(".searchBox").css("display", "block");
        $(".statusBox").css("display", "none");
        $(".select_all").css("display", "none");
        $(".back").css("display", "block");
        $("footer").css("display", "none");
        $(".comBox").css("top", "88px");
        $(".comBox").css("margin-bottom", "20px");
    }

});


// 搜索
$(".search").click(() => {
    var name = $("#name").val();
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/employee_manage/list",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            // 第几页
            "page": 1,
            // 页数大小
            "rows": 20,
            // 搜索框的内容
            "name": name,
            // 状态：1使用中 2停用
            "status": 2,
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
                    htmlStr += `
                    <div class="item">
                        <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
                        <section class="toDetail" staffId="${data.rows[i].id}">
                            <div class="comInfoBox">
                                <div id="">${data.rows[i].name}</div>
                            </div>
                            <span class="tel">${data.rows[i].tel}</span>
                            <img class="comInfo" src="../../../img/next.png" alt="">
                        </section>

                    </div>
                `;
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

// 清空搜索框
$(".toEmpty").click(() => {
    $(".searchIn>input").val("");
});

// 跳转详情页面
$(document).on("click", ".companyBox .toDetail", function(e) {
    var staffId = $(this).attr("staffId");
    console.log(staffId)
        // 存储员工的ID
    sessionStorage.setItem('staffId', staffId);
    // page.chooseType();
    location.href = "./staffInfo_notEdit.html";
});


// 全选按钮
$(".select_all").click(() => {
    $(":checkbox[name='hh']").prop("checked", "checked");
});


// 删除
$(".distrib").click(() => {
    console.log(111)
    var value = $('input[type=checkbox]:checked').map(function() { return this.value });
    // console.log(JSON.stringify(value));
    if (value.length == 0) {
        // 没选择公司，提示用户
        errorTips("请选择单位");
    } else {
        var index = layer.load(1, {
            // 数组中第一个参数是button的透明度
            // 第二个是背景颜色
            shade: [0.3, "white"]
        });
        var ids = [];
        for (var i = 0; i < value.length; i++) {
            a = value[i];
            console.log(value[i]);
            ids.push(a);
        }
        // console.log(ids instanceof Array)
        // console.log(JSON.stringify(ids))

        // var ajaxPost = $.ajax({
        //     url: urlDns + "/control_app/ms/employee_manage/edit_status",
        //     // 当参数为数组时，直接传过去后台接收不到，要设置traditional: true
        //     traditional: true,
        //     type: 'post',
        //     dataType: "json",
        //     data: {
        //         "id": ids,
        //         // 要启用，状态传1 ，停用2
        //         "status": 1,
        //         "pass_app": pass_app,
        //         "tel_app": tel_app,
        //         "code_app": code_app
        //     },
        //     timeout: 120000, //2分钟超时
        //     //请求成功
        //     success: function(data) {
        //         console.log(JSON.stringify(data));
        //         layer.close(index);
        //         if (data.result == 0) {
        //             // 需要重新登录
        //             if (window.plus) {
        //                 goToLogin("../../../page/register/login.html");
        //             } else {
        //                 document.addEventListener('plusready', goToLogin, false);
        //             }
        //         } else {
        //             $(".success").css("display", "block");
        //             setTimeout(() => {
        //                 $(".success").css("display", "none");
        //                 location.reload();
        //             }, 1000);
        //         }

        //     },
        //     error: function(XMLHttpRequest, textStatus, errorThrown) {
        //         layer.close(index);
        //         if (textStatus == 'timeout') {
        //             ajaxPost.abort();
        //             alert("请求超时");
        //         }
        //         if (textStatus == 'error') {
        //             ajaxPost.abort();　
        //             alert("请求错误" + errorThrown);
        //         }
        //     }
        // });
    }
});

// 加载下一页
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        page = page + 1;
        $.post(urlDns + "/control_app/ms/employee_manage/list", {
            // 第几页
            page: page,
            // 页数大小
            rows: 20,
            // 搜索框的内容
            name: "",
            // 状态：1使用中 2停用
            status: 2,
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
                        htmlStr += `
                        <div class="item">
                            <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
                            <section class="toDetail" staffId="${data.rows[i].id}">
                                <div class="comInfoBox">
                                    <div id="">${data.rows[i].name}</div>
                                </div>
                                <span class="tel">${data.rows[i].tel}</span>
                                <img class="comInfo" src="../../../img/next.png" alt="">
                            </section>
    
                        </div>
                    `;
                    }
                    $(".companyBox").append(htmlStr);
                }
            }


        });
    }
});