// 返回
$(".pre").click(() => {
    history.back();
});

var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);


// 获取公司的ID
var comDetailId = sessionStorage.getItem("comDetailId");
console.log(comDetailId);

var com_status = sessionStorage.getItem("com_status");
console.log(com_status);

$(function() {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/sf/showInfo_step02",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            "sf_userid": comDetailId,
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
                    <div bankId="${data.rows[i].id}">
                        <span class="name">${data.rows[i].khh}</span>
                        <span class="account">${data.rows[i].code.replace(/^(\d{4})\d+(\d{4})$/,"**** $2")}</span>
                        <img src="../../../img/next.png" alt="">
                    </div>
                `;
                }
                $(".contBox").html(htmlStr);
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

// 跳转详细银行账号信息
$(document).on("click", ".contBox>div", function(e) {
    var bankId = $(this).attr("bankId");
    console.log(bankId)
        // 存储ID
    sessionStorage.setItem('bankId', bankId);
    location.href = "./bankAccount.html";
});

// 下一页
$(".next").click(() => {
    if (com_status == 0) {
        // 待审核的状态
        location.href = "contract_wait.html";
    } else {
        location.href = "contract_p_b.html";
    }

});