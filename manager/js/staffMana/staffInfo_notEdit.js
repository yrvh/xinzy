var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 返回
$(".back").click(() => {
    history.back();
});

// 员工id
var staffId = sessionStorage.getItem("staffId");
// console.log(staffId);

// 业务员下是否还有业务的标志
var hasBusiness;


$(function() {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/employee_manage/showZl",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            "id": staffId,
            "pass_app": pass_app,
            "tel_app": tel_app,
            "code_app": code_app
        },
        //请求成功
        success: function(data) {
            console.log(JSON.stringify(data));
            // console.log(data.isHaveKh);
            layer.close(index);
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../../../page/register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                hasBusiness = data.isHaveKh;
                $(".name").val(data.name);
                $(".tel").val(data.tel);
                $(".email").val(data.email);
                $(".idCard").val(data.idcardcode);
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

// 证件照片
$(".idCardPhoto").click(() => {
    console.log(111)
    location.href = "./idCardPt_noEdit.html";
});


// 启用
$(".use").click(() => {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var ids = [];
    ids.push(staffId);

    var ajaxPost = $.ajax({
        url: urlDns + "/control_app/ms/employee_manage/edit_status",
        // 当参数为数组时，直接传过去后台接收不到，要设置traditional: true
        traditional: true,
        type: 'post',
        dataType: "json",
        data: {
            "id": ids,
            // 要启用，状态传1 ，停用2
            "status": 1,
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
                    history.back();
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
});

// 删除
$(".del").click(() => {

    // console.log(hasBusiness)

    // 判断业务员有无业务
    if (hasBusiness == 0) {
        var idArr = [];
        // 没有业务，直接删除
        var index = layer.load(1, {
            // 数组中第一个参数是button的透明度
            // 第二个是背景颜色
            shade: [0.3, "white"]
        });
        var ajaxPost = $.ajax({
            url: urlDns + "/control_app/ms/auto_bussiness/yw_aoto_change",
            // 当参数为数组时，直接传过去后台接收不到，要设置traditional: true
            traditional: true,
            type: 'post',
            dataType: "json",
            data: {
                // 要删除的员工id
                "outid": staffId,
                // 要分配的业务
                "datas": idArr,
                // 业务员的状态 1删除  2停用
                "type": 2,
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
                        history.back();
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
    if (hasBusiness == 1) {
        // 有业务，提示分配
        $(".black3").css("display", "block");
    }
});

// 取消
$(".close").click(() => {
    $(".black3").css("display", "none");
});

// 确定
$(".open").click(() => {
    sessionStorage.setItem("del_staff_id", staffId);
    location.href = "./business_out_delStaff.html";
});