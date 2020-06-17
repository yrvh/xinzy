var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 返回
$(".back").click(() => {
    history.back();
});

// 同步请求
$.ajaxSetup({
    async: false
});

// 默认省份信息
var defaultId = {};

// 省份数组
var provinceArr = [];

$(function() {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });

    // 请求省份列表
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/zg/ns/getRegion",
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
                // layer.close(index);
                for (var i = 0; i < data.rows.length; i++) {
                    var object = {};
                    object.value = data.rows[i].id;
                    object.text = data.rows[i].name;
                    provinceArr.push(object);
                }
            }


        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            // layer.close(index);
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

    // console.log(defaultId)
    // 请求初始数据
    var getDefaultData = $.ajax({
        url: urlDns + "/control_app/ms/zg/ns/getOneMisirate",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            "regionid": defaultId.value,
            // 教育税 3
            "typeid": 3,
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
                $(".taxesValue").text(data.sv + "%");
                $(".discountValue").text(data.yhfd + "%");
                $(".province").text(defaultId.text);
            }


        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            layer.close(index);
            if (textStatus == 'timeout') {
                getDefaultData.abort();　
                alert("请求超时");
            }
            if (textStatus == 'error') {
                getDefaultData.abort();　
                alert("请求错误" + errorThrown);
            }
        }
    });

})




// 弹出省份选择列表
$(".provinceBox").click(() => {
    var popPicker = new mui.PopPicker();
    popPicker.setData(provinceArr)
        // [{ value: 'ywj', text: '北海骄龙网络有限公司' },
        //     { value: 'aaa', text: 'xxxxxxx有限公司' },
        //     { value: 'lj', text: 'xxxxxxx有限公司' },
        //     { value: 'ymt', text: 'xxxxxxx有限公司' },
        // ]
    popPicker.show(function(selectItems) {
        getProData(selectItems[0].value, selectItems[0].text);
    })
});


// 请求单个省份数据的方法
function getProData(id, name) {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/zg/ns/getOneMisirate",
        type: 'post',
        dataType: "json",
        timeout: 120000, //2分钟超时
        data: {
            "regionid": id,
            // 教育税 3
            "typeid": 3,
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
                $(".taxesValue").text(data.sv + "%");
                $(".discountValue").text(data.yhfd + "%");
                $(".province").text(name);
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