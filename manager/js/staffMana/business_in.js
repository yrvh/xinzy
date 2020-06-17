var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 返回
$(".back").click(() => {
    history.back();
});

var business_out_id = sessionStorage.getItem("business_out_id");
// console.log(business_out_id)
business_out_id = JSON.parse(business_out_id);

// 选择的业务员id
var staffId;

// 默认的业务员信息
var defaultId = {};

// 业务员的数组
var staffArr = [];

// 同步请求
$.ajaxSetup({
    async: false
});

$(function() {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });

    // 请求业务员列表
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/business_change/list",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            "pass_app": pass_app,
            "tel_app": tel_app,
            "code_app": code_app
        },
        //请求成功
        success: function(data) {
            console.log(JSON.stringify(data));
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../../../page/register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                // console.log(data.rows[0].name)
                defaultId.value = data.rows[0].id;
                defaultId.text = data.rows[0].name;
                staffId = defaultId.value;
                // layer.close(index);
                for (var i = 0; i < data.rows.length; i++) {
                    var object = {};
                    object.value = data.rows[i].id;
                    object.text = data.rows[i].name;
                    staffArr.push(object);
                }
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

    // console.log(defaultId.value)
    // 请求初始数据
    var getDefaultData = $.ajax({
        url: urlDns + "/control_app/ms/business_change/user_list",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            "id": defaultId.value,
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
                // 总的html代码
                var htmlStr = "";
                // 单位的html代码
                var htmlStr_com = '';
                // 业者的html代码
                var htmlStr_free = '';
                for (var i = 0; i < data.rows.length; i++) {
                    if (data.rows[i].usertype == 1) {
                        // usertype == 1 业者  2 单位
                        htmlStr_free += `
                        <div class="item">
                            <div class="freeName">${data.rows[i].name}</div>
                        </div>
                    `;
                    }
                    if (data.rows[i].usertype == 2) {
                        // usertype == 1 业者  2 单位
                        htmlStr_com += `
                        <div class="item">
                            <div class="comName">${data.rows[i].name}</div>
                        </div>
                    `;
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
                $(".staff").text(defaultId.text);
                staffId = defaultId.value;
            }


        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            layer.close(index);
            if (textStatus == 'timeout') {
                getDefaultData.abort();　
                alert("请求超时");
            }
            if (textStatus == 'error') {
                // getDefaultData.abort();　
                alert("请求错误" + errorThrown);
            }
        }
    });
});

// 选择业务员
$(".staffNameBox").click(() => {
    var popPicker = new mui.PopPicker();
    popPicker.setData(staffArr)
        // [{ value: 'ywj', text: '北海骄龙网络有限公司' },
        //     { value: 'aaa', text: 'xxxxxxx有限公司' },
        //     { value: 'lj', text: 'xxxxxxx有限公司' },
        //     { value: 'ymt', text: 'xxxxxxx有限公司' },
        // ]
    popPicker.show(function(selectItems) {
        staffId = selectItems[0].value;
        getStaffData(selectItems[0].value, selectItems[0].text);
    })
});

// 请求业务员下业务数据的方法
function getStaffData(id, name) {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/business_change/user_list",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            "id": id,
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
                // 总的html代码
                var htmlStr = "";
                // 单位的html代码
                var htmlStr_com = '';
                // 业者的html代码
                var htmlStr_free = '';
                for (var i = 0; i < data.rows.length; i++) {
                    if (data.rows[i].usertype == 1) {
                        // usertype == 1 业者  2 单位
                        htmlStr_free += `
                        <div class="item">
                            <div class="freeName">${data.rows[i].name}</div>
                        </div>
                    `;
                    }
                    if (data.rows[i].usertype == 2) {
                        // usertype == 1 业者  2 单位
                        htmlStr_com += `
                        <div class="item">
                            <div class="comName">${data.rows[i].name}</div>
                        </div>
                    `;
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
                $(".staff").text(name);

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

// 确定按钮
$(".accept").click(() => {
    // console.log(staffId)
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/business_change/change",
        type: 'post',
        // 当参数为数组时，直接传过去后台接收不到，要设置traditional: true
        // 防止深度序列化
        traditional: true,
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            "id": business_out_id,
            "userid": staffId,
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
                    history.go(-2);
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
});