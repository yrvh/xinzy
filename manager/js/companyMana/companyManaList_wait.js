var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

$(".back").click(() => {
    // location.href = "./companyMana.html";
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
            "status": 1,
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
                    if (data.rows[i].icon != "/img/R.png") {
                        // 有上传单位logo的，显示单位的logo
                        htmlStr += `
                        <div class="item">
                            <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
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
                        // 没上传单位logo，给默认图片
                        htmlStr += `
                        <div class="item">
                            <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
                            <section class="toDetail" comId="${data.rows[i].id}">
                                <div class="comInfoBox">
                                    <img class="comImg" src="../../../img/com_default_Icon.png" alt="">
                                    <span id="">${data.rows[i].name}</span>
                                </div>
                                <img class="comInfo" src="../../../img/next.png" alt="">
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
});



// 选择按钮
var flag = false;
$(".next").click(() => {
    flag = !flag;
    if (flag == true) {
        $(".next").text("取消选择");
        $(".select").css("display", "block");
        $(".comInfoBox").css("left", "20px");
        $(".back").css("display", "none");
        $(".select_all").css("display", "block");
        $("footer").css("display", "block");
        $(".comBox").css("margin-bottom", "70px");
    } else {
        $(":checkbox[name='hh']").prop("checked", false);
        $(".next").text("选择");
        $(".select").css("display", "none");
        $(".comInfoBox").css("left", "0px");
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
    sessionStorage.setItem('com_status', 0);
    // 存储单位的ID
    sessionStorage.setItem('comDetailId', comId);
    // page.chooseType();
    location.href = "./companyManaDetail_one.html";
});

// 给单位通过
$(".pass").click(() => {
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

        var ajaxPost = $.ajax({
            url: urlDns + "/control_app/ms/sf/check",
            // 当参数为数组时，直接传过去后台接收不到，要设置traditional: true
            traditional: true,
            type: 'post',
            dataType: "json",
            data: {
                "id": ids,
                "pass_app": pass_app,
                "tel_app": tel_app,
                "code_app": code_app
            },
            timeout: 120000, //2分钟超时
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
                    ajaxPost.abort();
                    alert("请求超时");
                }
                if (textStatus == 'error') {
                    ajaxPost.abort();　
                    alert("请求错误" + errorThrown);
                }
            }
        });
    }

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
            "status": 1,
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
                        <section class="toDetail" comId="${data.rows[i].id}">
                            <div class="comInfoBox">
                                <img class="comImg" src="${data.rows[i].icon}" alt="">
                                <span id="">${data.rows[i].name}</span>
                            </div>
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

// 全选按钮
$(".select_all").click(() => {
    $(":checkbox[name='hh']").prop("checked", "checked");
});

// 加载下一页
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        page = page + 1;

        $.post(urlDns + "/control_app/ms/sf/list", {
            // page, 第几页
            page: page,
            // rows, 页数大小
            rows: 20,
            // 搜索框内容
            name: "",
            // status (1,等待审核  11审核退回  8审核通过)
            status: 1,
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
                        if (data.rows[i].icon != "/img/R.png") {
                            // 有上传单位logo的，显示单位的logo
                            htmlStr += `
                        <div class="item">
                            <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
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
                            // 没上传单位logo，给默认图片
                            htmlStr += `
                        <div class="item">
                            <input class="select" name="hh" value="${data.rows[i].id}" type="checkbox">
                            <section class="toDetail" comId="${data.rows[i].id}">
                                <div class="comInfoBox">
                                    <img class="comImg" src="../../../img/com_default_Icon.png" alt="">
                                    <span id="">${data.rows[i].name}</span>
                                </div>
                                <img class="comInfo" src="../../../img/next.png" alt="">
                            </section>
                        </div>
                    `;
                        }

                    }
                    $(".companyBox").append(htmlStr);
                }
            }


        });
    }
});