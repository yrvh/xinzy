var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 返回
$(".back").click(() => {
    sessionStorage.removeItem("del_staff_id");
    history.back();
});
// 同步请求
// $.ajaxSetup({
//     async: false
// });

// 要删除员工的id
var del_staff_id = sessionStorage.getItem("del_staff_id");
console.log(del_staff_id)

// 业务员列表
var staffArr = [];

// 被删除的业务员名字
var delStaffName = "";

$(function() {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });

    var ajaxPost = $.ajax({
        url: urlDns + "/control_app/ms/auto_bussiness/getKhbyuser_auto",
        // 当参数为数组时，直接传过去后台接收不到，要设置traditional: true
        traditional: true,
        type: 'post',
        dataType: "json",
        data: {
            "outemployeeid": del_staff_id,
            "pass_app": pass_app,
            "tel_app": tel_app
        },
        timeout: 120000, //2分钟超时
        //请求成功
        success: function(data) {
            console.log(JSON.stringify(data));
            layer.close(index);
            if (data.result == 0) {
                if (window.plus) {
                    goToLogin("../../../page/register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                delStaffName = data[0].outusername;
                // 总的html代码
                var htmlStr = "";
                // 单位的html代码
                var htmlStr_com = '';
                // 业者的html代码
                var htmlStr_free = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].usertype == 1) {
                        // usertype == 1 业者  2 单位
                        htmlStr_free += `
                        <div class="item">
                            <div class="freeName" id="${data[i].id}">${data[i].name}</div>
                            <span class="acceptStaffTips">接手人：</span>
                            <div class="acceptStaff" id_msid="${data[i].id + '_' + data[i].msid}" id="${data[i].id}" msid="${data[i].msid}">${data[i].msname}</div>
                        </div>
                    `;
                    }
                    if (data[i].usertype == 2) {
                        // usertype == 1 业者  2 单位

                        // 如果有公司图标，用公司图标，没上传的给默认图片
                        if (data[i].icon != "") {
                            htmlStr_com += `
                            <div class="item">
                                <img class="comImg" src="${data[i].icon}" alt="">
                                <div class="comName" id="${data[i].id}">${data[i].name}</div>
                                <span class="acceptStaffTips">接手人：</span>
                                <div class="acceptStaff" id_msid="${data[i].id + '_' + data[i].msid}" id="${data[i].id}" msid="${data[i].msid}">${data[i].msname}</div>
                            </div>
                        `;
                        } else {
                            htmlStr_com += `
                            <div class="item">
                                <img class="comImg" src="../../../img/com_default_Icon.png" alt="">
                                <div class="comName" id="${data[i].id}">${data[i].name}</div>
                                <span class="acceptStaffTips">接手人：</span>
                                <div class="acceptStaff" id_msid="${data[i].id + '_' + data[i].msid}" id="${data[i].id}" msid="${data[i].msid}">${data[i].msname}</div>
                            </div>
                        `;
                        }

                    }
                }
                if (htmlStr_com != "") {
                    htmlStr_com = '<div class="title">单位用户</div>' + htmlStr_com;
                }
                if (htmlStr_free != "") {
                    htmlStr_free = '<div class="title">业者用户</div>' + htmlStr_free;
                }
                htmlStr = htmlStr_com + htmlStr_free;
                $(".cont").html(htmlStr);
                $(".staff").text(data.outusername);
                $(".staff").text(delStaffName);
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

    // 获取除了要删除的员工以外的所有业务员
    var getStaffData = $.ajax({
        url: urlDns + "/control_app/ms/auto_bussiness/getUser",
        // 当参数为数组时，直接传过去后台接收不到，要设置traditional: true
        traditional: true,
        type: 'post',
        dataType: "json",
        data: {
            "outemployeeid": del_staff_id,
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
                for (var i = 0; i < data.length; i++) {
                    var object = {};
                    object.value = data[i].id;
                    object.text = data[i].name;
                    staffArr.push(object);
                }
            }

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            layer.close(index);
            if (textStatus == 'timeout') {
                getStaffData.abort();
                alert("请求超时");
            }
            if (textStatus == 'error') {
                getStaffData.abort();　
                alert("请求错误" + errorThrown);
            }
        }
    });


});

// 弹出所有可选接手人
$(document).on("click", ".acceptStaff", function() {
    var _this = $(this);
    var thisId = $(this).attr("id");

    var popPicker = new mui.PopPicker();
    popPicker.setData(staffArr)
        // [{ value: 'ywj', text: '北海骄龙网络有限公司' },
        //     { value: 'aaa', text: 'xxxxxxx有限公司' },
        //     { value: 'lj', text: 'xxxxxxx有限公司' },
        //     { value: 'ymt', text: 'xxxxxxx有限公司' },
        // ]
    popPicker.show(function(selectItems) {
        var id_msid = thisId + "_" + selectItems[0].value;
        _this.attr("id_msid", id_msid);
        _this.attr("msid", selectItems[0].value);
        _this.text(selectItems[0].text);
    })


});


// 确定
$(".accept").click(() => {
    var idArr = [];

    // 遍历得到所有的id_msid
    $(".acceptStaff").each(function() {
        // console.log($(this).attr("id_msid"));
        idArr.push($(this).attr("id_msid"));
    });
    // console.log(JSON.stringify(idArr))

    // 分配业务及删除请求
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
            "outid": del_staff_id,
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
                    history.go(-2);
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