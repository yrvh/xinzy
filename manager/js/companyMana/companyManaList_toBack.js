$(".back").click(() => {
    history.back();
});

var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);


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
            "status": 11,
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
                <div class="item" comId="${data.rows[i].id}">
                    <input class="select" name="hh" value="beihai" type="checkbox">
                    <div>
                        <img class="comImg" src="${data.rows[i].icon}" alt="">
                        <span id="">${data.rows[i].name}</span>
                    </div>
                    <img class="comInfo" src="../../../img/next.png" alt="">
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


// 跳转详情页面
$(document).on("click", ".companyBox .item", function(e) {
    var comId = $(this).attr("comId");
    console.log(comId)
        // 存储一个标志，记录是待审核的还是通过或退回的
    sessionStorage.setItem('com_status', 1);
    // 存储单位的ID
    sessionStorage.setItem('comDetailId', comId);
    // page.chooseType();
    location.href = "./companyManaDetail_one.html";
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
            "status": 11,
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
                <div class="item" comId="${data.rows[i].id}">
                    <input class="select" name="hh" value="beihai" type="checkbox">
                    <div>
                        <img class="comImg" src="${data.rows[i].icon != '/img/R.png'?data.rows[i].icon:'../../../img/com_default_Icon.png'}" alt="">
                        <span id="">${data.rows[i].name}</span>
                    </div>
                    <img class="comInfo" src="../../../img/next.png" alt="">
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

// 清空搜索框
$(".toEmpty").click(() => {
    $(".searchIn>input").val("");
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
            status: 11,
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
                <div class="item" comId="${data.rows[i].id}">
                    <input class="select" name="hh" value="beihai" type="checkbox">
                    <div>
                        <img class="comImg" src="${data.rows[i].icon}" alt="">
                        <span id="">${data.rows[i].name}</span>
                    </div>
                    <img class="comInfo" src="../../../img/next.png" alt="">
                </div>
                `;
                    }
                    $(".companyBox").append(htmlStr);
                }
            }


        });
    }
});