mui.init({
    swipeBack: true //启用右滑关闭功能
});
$.ajaxSettings.async = false;
var tel = localStorage.getItem("tel");
var realname = sessionStorage.getItem('realname');
var updateInfo = sessionStorage.getItem('updateInfo');
console.log(updateInfo)
console.log(tel)

// 判断是新用户注册还是退回修改个人信息
var isUpdate = localStorage.getItem('isUpdate');
console.log(isUpdate)
    // 获取是否要上传协议图片的判断标志
var hasContractImg = sessionStorage.getItem('hasContractImg');

// // 省市联动的数据
// var province = [];
// // 请求省市联动的数据
// var getData = $.ajax({
//     url: urlDns + "/share_app/get_area_banks",
//     type: 'post',
//     dataType: "json",
//     timeout: 120000, //2分钟超时
//     data: {},
//     //请求成功
//     success: function(data) {
//         // console.log("地区数据" + JSON.stringify(data));
//         province = data
//     },
//     error: function(XMLHttpRequest, textStatus, errorThrown) {
//         if (textStatus == 'timeout') {
//             // getData.abort();　
//             alert("请求超时");
//         }
//         if (textStatus == 'error') {
//             // getData.abort();　
//             alert("请求错误" + errorThrown);
//         }
//     }
// });

if (updateInfo == 1) {
    var tel_app = localStorage.getItem("tel_app");
    var pass_app = localStorage.getItem("pass_app");
    var code_app = localStorage.getItem("code_app");

    $(".back").css("display", "none");
    // console.log(111)
    console.log(realname)
        // 业者被退回修改个人信息
        // 查找一个用户信息有没有存在session里，如果有，就不用该请求返回的数据做渲染，
        // 避免在业者修改之后从下一页返回来查看的时候又重新渲染了一次data的数据，造成
        // 用户原来改过的数据恢复了退回来时的状态（realname只是随便拿的一个字段）
    if (realname == null || realname == "") {
        console.log(111)

        var index = layer.load(1, {
            // 数组中第一个参数是button的透明度
            // 第二个是背景颜色
            shade: [0.3, "white"]
        });
        var getData = $.ajax({
            url: urlDns + "/user_app/yz/gr_xx_editUI",
            type: 'post',
            dataType: "json",
            timeout: 120000, //2分钟超时
            data: {
                "tel_app": tel_app,
                "pass_app": pass_app,
                "code_app": code_app
            },
            //请求成功
            success: function(data) {
                console.log(JSON.stringify(data));
                console.log("电话号码：" + data.tel)
                layer.close(index);
                console.log(JSON.stringify(data.reasons));
                console.log("开户行" + data.khh);
                console.log("开户名" + data.kh_name);
                console.log("开户卡号" + data.code);



                $(".bgBlack").css("display", "block");
                $(".tipsCont").text(data.reasons);
                sessionStorage.setItem("realname", data.realname);
                sessionStorage.setItem("email", data.email);
                sessionStorage.setItem("idCardNum", data.idCardNum);
                sessionStorage.setItem("idCardImg1", data.upcardid);
                sessionStorage.setItem("idCardImg2", data.downcardid);
                sessionStorage.setItem("accountBank", data.khh);
                sessionStorage.setItem("accountName", data.kh_name);
                sessionStorage.setItem("account", data.code);
                sessionStorage.setItem("carduserid", data.carduserid);

                // 判断身份证已上传的参数
                sessionStorage.setItem("didUpload", 1);
                sessionStorage.setItem("isUpdate", 2);
                $("#realName").val(data.realname);
                $("#tel").text(data.tel);
                $("#email").val(data.email);
                $("#idNumber").val(data.idCardNum);
                $("#accountBank").text(data.khh);
                $("#accountName").val(data.kh_name);
                $("#account").val(data.code);
                console.log(data.code)
                $(".uploadText").text("已上传");

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
$(".ok").click(() => {
    $(".bgBlack").css("display", "none");
});

// 根据退回理由内容的多少获取提示框的高度，给提示框添加定位
var innerWidth = $(".tipsBox").innerWidth();
$(".tipsBox").css("top", "calc((100vh - " + innerWidth + "px)/2)");

// 获取注册的手机号渲染在页面上
var realname = sessionStorage.getItem('realname');
var email = sessionStorage.getItem('email');
var idCardNum = sessionStorage.getItem('idCardNum');
// 开户名
var accountBank = sessionStorage.getItem('accountBank');
var accountName = sessionStorage.getItem('accountName');
var account = sessionStorage.getItem('account');
// 年收入范围
var incomeRangeText = sessionStorage.getItem('incomeRangeText');
// 营销员工号
var yxy_code = sessionStorage.getItem('yxy_code');
// 有无单位
var type = localStorage.getItem('type');
// console.log(type)
if (type == 0) {
    // 无单位，显示输入营销员工号
    $(".yxy_code_box").css("display", "block");
} else if (type == 1) {
    // 有单位
    $(".yxy_code_box").css("display", "none");
}
$("#tel").text(tel);
// 如果已经填写了该页的信息，当用户没有返回至登录/注册页时，保留这些信息在页面上
if (realname) {
    $("#realName").val(realname);
}
if (email) {
    $("#email").val(email);
}
if (idCardNum) {
    $("#idNumber").val(idCardNum);
}
if (accountBank) {
    $("#accountBank").val(accountBank);

}
if (accountName) {
    $("#accountName").val(accountName);
}
if (account) {
    $("#account").val(account);
}
if (incomeRangeText) {
    $("#incomeRangeText").text(incomeRangeText);
}
if (yxy_code) {
    $("#yxy_code").val(yxy_code);
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
    }, 3000);
}

// 邮箱正则
var emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
// 身份证正则
//  第一位不可能是0
//  第二位到第六位可以是0-9
//  第七位到第十位是年份，所以七八位为19或者20
//  十一位和十二位是月份，这两位是01-12之间的数值
//  十三位和十四位是日期，是从01-31之间的数值
//  十五，十六，十七都是数字0-9
//  十八位可能是数字0-9，也可能是X
var idNumReg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
// 控制银行卡号长度正则
var bankCardReg = /^\d{10,20}$/;
yxy_codeReg = /^\d{4}$/;

// 银行卡号是否已经被注册
var hasBankCode = true;
// 身份证号时候已经被注册
var hasIdCard = true;
// 完成
$(".next").click(() => {
    // 判断是新用户注册还是退回修改个人信息
    var isUpdate = localStorage.getItem('isUpdate');
    console.log(isUpdate)
        // 真实姓名
    var realname = $("#realName").val();
    // console.log(realname)
    // 邮箱
    var email = $("#email").val();
    // console.log(email)
    // 身份证号码
    var idCardNum = $("#idNumber").val();
    // console.log(idCardNum)
    // 开户行
    var accountBank = $("#accountBank").val();
    // 开户名
    var accountName = $("#accountName").val();
    // console.log(accountName)
    // 账号
    var account = $("#account").val();
    // console.log(account)
    // 身份证上传提示
    var upload = $(".uploadText").text();

    // 年收入范围
    var incomeRangeText = $("#incomeRangeText").text();

    // 营销员工号
    var yxy_code = $("#yxy_code").val();
    console.log(typeof(incomeRangeText))






    // isUpdate == 1新用户注册
    if (isUpdate == 1) {
        // 身份证是否已经注册的请求
        $.post(urlDns + "/share/checkIdCard", {
            idcard: idCardNum
        }, function(data) {
            hasIdCard = data.valid;

        });
        // // 银行卡号是否已经注册的请求
        // $.post(urlDns + "/share/bankCard", {
        //     code: account
        // }, function(data) {
        //     console.log("卡号：" + data.valid)
        //     hasBankCode = data.valid;

        // });
        // 判断用户数据的错误类型
        if (realname == "") {
            errorInfo = "请输入姓名";
            errorTips(errorInfo);
        } else if (email == "") {
            errorInfo = "请输入电子邮箱";
            errorTips(errorInfo);
        } else if (!emailReg.test(email)) {
            errorInfo = "邮箱格式不正确";
            errorTips(errorInfo);
        } else if (idCardNum == "") {
            errorInfo = "请输入身份证号码";
            errorTips(errorInfo);
        } else if (!idNumReg.test(idCardNum)) {
            errorInfo = "身份证号格式不正确";
            errorTips(errorInfo);
        } else if (hasIdCard != true) {
            errorInfo = "身份证号码已被注册";
            errorTips(errorInfo);
        } else if (incomeRangeText == "") {
            errorInfo = "请选择年收入范围";
            errorTips(errorInfo);
        } else if (accountBank == "") {
            errorInfo = "请输入开户行";
            errorTips(errorInfo);
        } else if (accountName == "") {
            errorInfo = "请输入开户名";
            errorTips(errorInfo);
        } else if (account == "") {
            errorInfo = "请输入账号";
            errorTips(errorInfo);
        } else if (upload != "已上传") {
            errorInfo = "请上传身份证照片";
            errorTips(errorInfo);
        } else if (!bankCardReg.test(account)) {
            errorInfo = "银行卡号格式不正确";
            errorTips(errorInfo);
        } else if (yxy_code != "" && !yxy_codeReg.test(yxy_code)) {
            errorInfo = "营销员工号为四位整数";
            errorTips(errorInfo);
        } else {
            // 线上签订协议，没有协议图片
            if (hasContractImg == 0) {
                reg_noImg();
            }

            // 用户上传了与单位的协议图片
            if (hasContractImg == 1) {
                reg_hasImg();
            }

        }
    }

    // 用户修改个人信息的提交
    if (isUpdate == 2) {
        console.log(222222222222)
        var carduserid = sessionStorage.getItem("carduserid");
        console.log(carduserid)

        // 身份证是否已经注册的请求
        $.post(urlDns + "/share/checkIdCard", {
            idcard: idCardNum,
            realname: realname,
            tel_app: tel_app,
            pass_app: pass_app
        }, function(data) {
            hasIdCard = data.valid;

        });
        // // 银行卡号是否已经注册的请求
        // $.post(urlDns + "/share/bankCard", {
        //     code: account,
        //     carduserid: carduserid,
        //     tel_app: tel_app,
        //     pass_app: pass_app
        // }, function(data) {
        //     hasBankCode = data.valid;

        // });

        // 判断用户数据的错误类型
        if (realname == "") {
            errorInfo = "请输入姓名";
            errorTips(errorInfo);
        } else if (email == "") {
            errorInfo = "请输入电子邮箱";
            errorTips(errorInfo);
        } else if (!emailReg.test(email)) {
            errorInfo = "邮箱格式不正确";
            errorTips(errorInfo);
        } else if (idCardNum == "") {
            errorInfo = "请输入身份证号码";
            errorTips(errorInfo);
        } else if (!idNumReg.test(idCardNum)) {
            errorInfo = "身份证号格式不正确";
            errorTips(errorInfo);
        } else if (hasIdCard != true) {
            errorInfo = "身份证号码已被注册";
            errorTips(errorInfo);
        } else if (accountBank == "") {
            errorInfo = "请输入开户行";
            errorTips(errorInfo);
        } else if (accountName == "") {
            errorInfo = "请输入开户名";
            errorTips(errorInfo);
        } else if (account == "") {
            errorInfo = "请输入账号";
            errorTips(errorInfo);
        } else if (upload != "已上传") {
            errorInfo = "请上传身份证照片";
            errorTips(errorInfo);
        } else if (!bankCardReg.test(account)) {
            errorInfo = "银行卡号格式不正确";
            errorTips(errorInfo);
        } else {
            edit_info();
        }

    }




});

// 返回上一页
$(".back").click(() => {
    // history.back();
    location.href = "./onLineContract.html";
});

// 判断用户是否已经上传证件照，显示对应的文字
var didUpload = sessionStorage.getItem('didUpload');
if (didUpload) {
    $(".uploadText").text("已上传");
} else {
    $(".uploadText").text("未上传");
}

// 证件上传
$(".uploadIdCard").click(() => {
    // 真实姓名
    var realname = $("#realName").val();
    // console.log(realname)
    // 邮箱
    var email = $("#email").val();
    // console.log(email)
    // 身份证号码
    var idCardNum = $("#idNumber").val();
    // console.log(idCardNum)
    // 开户行
    var accountBank = $("#accountBank").val();
    // console.log(accountBank)
    // 开户名
    var accountName = $("#accountName").val();
    // console.log(accountName)
    // 营销员工号
    var yxy_code = $("#yxy_code").val();
    // 账号
    var account = $("#account").val();
    sessionStorage.setItem("realname", realname);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("idCardNum", idCardNum);
    sessionStorage.setItem("accountBank", accountBank);
    sessionStorage.setItem("accountName", accountName);
    sessionStorage.setItem("account", account);
    sessionStorage.setItem("yxy_code", yxy_code);

    window.location = "./upLoadIdCard.html";
    // mui.openWindow('./upLoadIdCard.html');
});


// 选择地区
// layer: 2 二级联动
// $(".areaBox").click(() => {
//     var popPicker = new mui.PopPicker({ layer: 2 });
//     popPicker.setData(province)
//         // [{ value: 'ywj', text: '北海骄龙网络有限公司' },
//         //     { value: 'aaa', text: 'xxxxxxx有限公司' },
//         //     { value: 'lj', text: 'xxxxxxx有限公司' },
//         //     { value: 'ymt', text: 'xxxxxxx有限公司' },
//         // ]
//     popPicker.show(function(selectItems) {
//         // 一级selectItems[0].text  二级selectItems[1].text
//         // console.log(selectItems[0].text + " " + selectItems[1].text);
//         // console.log(selectItems[0].value + "_" + selectItems[1].value);
//         $(".area").text(selectItems[0].text + " " + selectItems[1].text);
//         $(".area").attr("ids", selectItems[0].value + "_" + selectItems[1].value);

//     })
// });

function reg_noImg() {
    // 真实姓名
    var realname = $("#realName").val();
    // console.log(realname)
    // 邮箱
    var email = $("#email").val();
    // console.log(email)
    // 身份证号码
    var idCardNum = $("#idNumber").val();
    // console.log(idCardNum)
    // 开户地区
    var accountBank = $("#accountBank").val();
    // 开户名
    var accountName = $("#accountName").val();
    // console.log(accountName)
    // 账号
    var account = $("#account").val();
    // console.log(account)
    // 身份证上传提示
    var upload = $(".uploadText").text();

    // 获取接受服务单位的id
    var comid = sessionStorage.getItem("comids");
    // console.log(comid)
    // 用户名
    var reUserName = localStorage.getItem('reUserName');
    // console.log(reUserName)
    // 手机号
    var tel = localStorage.getItem('tel');
    // console.log(tel)
    // 密码
    var password = localStorage.getItem('password');
    // console.log(password)
    // 用户注册的角色
    var userType = localStorage.getItem('userType');
    // console.log(userType)
    // 选择的开票方式
    var type = localStorage.getItem('type');
    // console.log(type)
    // 两张身份证照片
    var src1 = sessionStorage.getItem('idCardImg1');
    var src2 = sessionStorage.getItem('idCardImg2');
    // console.log(src1)
    // 分配比例
    var serviceFee = sessionStorage.getItem("serviceFee");
    // console.log(serviceFee)
    // 协议模板id
    // var modelId = sessionStorage.getItem('modelId');
    // console.log(modelId)
    // 获取是否要上传协议图片的判断标志
    var hasContractImg = sessionStorage.getItem('hasContractImg');
    // console.log(hasContractImg)

    // 年收入范围
    var incomeRangeText = sessionStorage.getItem("incomeRange");

    // 营销员工号
    var yxy_code = $("#yxy_code").val();


    // console.log(isUpdate)
    // 和秘书公司协议的模板id
    var yz_ms_xieyiID = sessionStorage.getItem('yz_ms_xieyiID');
    // 和单位协议的模板id
    var yz_sf_xieyiID = sessionStorage.getItem('yz_sf_xieyiID');
    // 推荐人id
    var upid = localStorage.getItem("upid");
    if (upid) {
        upid = '"' + upid + '"';
    } else {
        upid = "0";
    }
    console.log(upid)
    console.log(typeof(upid))


    console.log(reUserName)
    console.log(tel)
    console.log(email)
    console.log(idCardNum)
    console.log(accountName)
    console.log(account)
    console.log(userType)
    console.log(type)
    console.log(comid)
        // console.log(modelId)
    console.log(serviceFee)
    console.log(src1)
    console.log(yz_ms_xieyiID);
    console.log(yz_sf_xieyiID);
    var khAreaId = $(".area").attr("ids");
    // console.log(khAreaId)


    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });

    // 请求超时
    var postTimeOut = setTimeout(() => {
        layer.close(index);
        errorTips("请求超时");
    }, 300000);

    var task = plus.uploader.createUpload(urlDns + "/user_app/yz/add", { method: "POST" },
        function(t, status) { //上传完成
            console.log("返回字段：" + JSON.stringify(t))
            console.log("返回状态：" + JSON.stringify(status))
            var responseText = JSON.parse(t.responseText);
            if (status == 200) {

                // console.log(t)
                // wt.close(); //关闭等待提示按钮
                if (responseText.result == 1) {
                    console.log("上传成功：" + responseText.result + "," + responseText.message);
                    // 提交成功，清除请求超时的定时器
                    clearTimeout(postTimeOut);
                    // 清除等待提示的加载圈
                    layer.close(index);
                    $(".success").css("display", "block");
                    setTimeout(() => {
                        $(".success").css("display", "none");
                        location.href = "audit.html";
                    }, 800);

                }
            } else {
                alert("上传失败：" + responseText.message);
                // wt.close(); //关闭等待提示按钮
            }
        }
    );
    //添加其他参数
    task.addData("username", reUserName);
    task.addData("tel", tel);
    task.addData("password", password);
    task.addData("realname", realname);
    task.addData("email", email);
    task.addData("idCardNum", idCardNum);
    task.addData("khh", accountBank);
    task.addData("accountName", accountName);
    task.addData("account", account);
    task.addData("userType", userType);
    task.addData("type", type);
    task.addData("comids", comid);
    task.addData("yz_ms_xieyiID", yz_ms_xieyiID);
    task.addData("yz_sf_xieyiID", yz_sf_xieyiID);
    task.addData("monthsy", incomeRangeText);
    if (yxy_code != "") {
        task.addData("employeecode", yxy_code);
    }
    task.addData("fpbili", serviceFee);
    // 推荐人id
    task.addData("upid", upid);

    // 两张身份证
    task.addFile(src1, { key: "idCardUpUrl" });
    task.addFile(src2, { key: "idCardDownUrl" });

    task.start();
}


function reg_hasImg() {
    // 真实姓名
    var realname = $("#realName").val();
    // console.log(realname)
    // 邮箱
    var email = $("#email").val();
    // console.log(email)
    // 身份证号码
    var idCardNum = $("#idNumber").val();
    // console.log(idCardNum)
    // 开户地区
    var accountBank = $("#accountBank").val();
    // 开户名
    var accountName = $("#accountName").val();
    // console.log(accountName)
    // 账号
    var account = $("#account").val();
    // console.log(account)
    // 身份证上传提示
    var upload = $(".uploadText").text();

    // 获取接受服务单位的id
    var comid = sessionStorage.getItem("comids");
    // console.log(comid)
    // 用户名
    var reUserName = localStorage.getItem('reUserName');
    // console.log(reUserName)
    // 手机号
    var tel = localStorage.getItem('tel');
    // console.log(tel)
    // 密码
    var password = localStorage.getItem('password');
    // console.log(password)
    // 用户注册的角色
    var userType = localStorage.getItem('userType');
    // console.log(userType)
    // 选择的开票方式
    var type = localStorage.getItem('type');
    // console.log(type)
    // 两张身份证照片
    var src1 = sessionStorage.getItem('idCardImg1');
    var src2 = sessionStorage.getItem('idCardImg2');
    // console.log(src1)
    // 分配比例
    var serviceFee = sessionStorage.getItem("serviceFee");
    console.log(serviceFee)
        // 协议模板id
        // var modelId = sessionStorage.getItem('modelId');
        // console.log(modelId)
        // 获取是否要上传协议图片的判断标志
    var hasContractImg = sessionStorage.getItem('hasContractImg');
    // console.log(hasContractImg)

    // 判断是新用户注册还是退回修改个人信息
    var isUpdate = localStorage.getItem('isUpdate');
    // console.log(isUpdate)
    // 和秘书公司协议的模板id
    var yz_ms_xieyiID = sessionStorage.getItem('yz_ms_xieyiID');
    // 和单位协议的模板id
    var yz_sf_xieyiID = sessionStorage.getItem('yz_sf_xieyiID');
    // 推荐人id
    var upid = localStorage.getItem("upid");
    if (upid) {
        upid = '"' + upid + '"';
    } else {
        upid = "0";
    }
    // 年收入范围
    var incomeRangeText = sessionStorage.getItem("incomeRange");

    // 营销员工号
    var yxy_code = $("#yxy_code").val();


    // console.log(reUserName)
    // console.log(tel)
    // console.log(email)
    // console.log(idCardNum)
    // console.log(accountName)
    // console.log(account)
    // console.log(userType)
    // console.log(type)
    // console.log(comid)
    //     // console.log(modelId)
    // console.log(serviceFee)
    // console.log(src1)
    // console.log(yz_ms_xieyiID);
    // console.log(yz_sf_xieyiID);



    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });

    // 请求超时
    var postTimeOut = setTimeout(() => {
        layer.close(index);
        errorTips("请求超时");
    }, 300000);

    // 上传的协议图片
    var contractImg = sessionStorage.getItem('contractImg');
    // 储存在sessionStorage里的是字符串，取出来要序列化
    contractImg = JSON.parse(contractImg);

    var task = plus.uploader.createUpload(urlDns + "/user_app/yz/add", { method: "POST" },
        function(t, status) { //上传完成
            var responseText = JSON.parse(t.responseText);
            if (status == 200) {

                // console.log(t)
                // wt.close(); //关闭等待提示按钮
                if (responseText.result == 1) {
                    console.log("上传成功：" + responseText.result + "," + responseText.message);
                    layer.close(index);
                    $(".success").css("display", "block");
                    setTimeout(() => {
                        $(".success").css("display", "none");
                        location.href = "./audit.html";
                    }, 800);
                }
            } else {
                alert("上传失败：" + responseText.message);
                // wt.close(); //关闭等待提示按钮
            }
        }
    );
    //添加其他参数
    task.addData("username", reUserName);
    task.addData("tel", tel);
    task.addData("password", password);
    task.addData("realname", realname);
    task.addData("email", email);
    task.addData("idCardNum", idCardNum);
    task.addData("khh", accountBank);
    task.addData("accountName", accountName);
    task.addData("account", account);
    task.addData("userType", userType);
    task.addData("type", type);
    task.addData("comids", comid);
    task.addData("yz_ms_xieyiID", yz_ms_xieyiID);
    task.addData("yz_sf_xieyiID", yz_sf_xieyiID);
    task.addData("fpbili", serviceFee);
    // 推荐人id
    task.addData("upid", upid);
    task.addData("monthsy", incomeRangeText);
    if (yxy_code != "") {
        task.addData("employeecode", yxy_code);
    }


    // 两张身份证
    task.addFile(src1, { key: "idCardUpUrl" });
    task.addFile(src2, { key: "idCardDownUrl" });

    // 要提的交照片
    for (var i = 0; i < contractImg.length; i++) {
        console.log(contractImg[i]);
        task.addFile(contractImg[i], { key: "contractImg" + i });
    }

    task.start();
}

// 选择年收入范围
$(".incomeRange").click(() => {
    var popPicker = new mui.PopPicker();
    popPicker.setData([{ value: '1', text: '0-60,000' },
        { value: '2', text: '60,000-360,000' },
        { value: '3', text: '360,000-600,000' },
        { value: '4', text: '600,000-1,200,000' },
        { value: '5', text: '1,200,000-2,400,000' },
        { value: '6', text: '>2,400,000' },
    ])



    popPicker.show(function(selectItems) {
        // getProData(selectItems[0].value, selectItems[0].text);
        $("#incomeRangeText").text(selectItems[0].text)
        sessionStorage.setItem("incomeRange", selectItems[0].value);
        sessionStorage.setItem("incomeRangeText", selectItems[0].text);

    })
});

function edit_info() {
    // 真实姓名
    var realname = $("#realName").val();
    // console.log(realname)
    // 邮箱
    var email = $("#email").val();
    // console.log(email)
    // 身份证号码
    var idCardNum = $("#idNumber").val();
    // console.log(idCardNum)
    // 开户地区
    var accountBank = $("#accountBank").val();
    // 开户名
    var accountName = $("#accountName").val();
    // console.log(accountName)
    // 账号
    var account = $("#account").val();
    // console.log(account)
    // 身份证上传提示
    var upload = $(".uploadText").text();

    // 获取接受服务单位的id
    var comid = sessionStorage.getItem("comids");
    // console.log(comid)
    // 用户名
    var reUserName = localStorage.getItem('reUserName');
    // console.log(reUserName)
    // 手机号
    var tel = localStorage.getItem('tel');
    // console.log(tel)
    // 密码
    var password = localStorage.getItem('password');
    // console.log(password)
    // 用户注册的角色
    var userType = localStorage.getItem('userType');
    // console.log(userType)
    // 选择的开票方式
    var type = localStorage.getItem('type');
    // console.log(type)
    // 两张身份证照片
    var src1 = sessionStorage.getItem('idCardImg1');
    var src2 = sessionStorage.getItem('idCardImg2');
    // console.log(src1)
    // 分配比例
    var serviceFee = sessionStorage.getItem("serviceFee");
    // console.log(serviceFee)
    // 协议模板id
    // var modelId = sessionStorage.getItem('modelId');
    // console.log(modelId)
    // 获取是否要上传协议图片的判断标志
    var hasContractImg = sessionStorage.getItem('hasContractImg');
    // console.log(hasContractImg)

    // 判断是新用户注册还是退回修改个人信息
    var isUpdate = localStorage.getItem('isUpdate');
    // console.log(isUpdate)
    // 和秘书公司协议的模板id
    var yz_ms_xieyiID = sessionStorage.getItem('yz_ms_xieyiID');
    // 和单位协议的模板id
    var yz_sf_xieyiID = sessionStorage.getItem('yz_sf_xieyiID');

    // 年收入范围
    var incomeRangeText = sessionStorage.getItem("incomeRange");

    // 营销员工号
    var yxy_code = $("#yxy_code").val();


    // console.log(reUserName)
    // console.log(tel)
    // console.log(email)
    // console.log(idCardNum)
    // console.log(accountName)
    // console.log(account)
    // console.log(userType)
    // console.log(type)
    // console.log(comid)
    //     // console.log(modelId)
    // console.log(serviceFee)
    // console.log(src1)
    // console.log(yz_ms_xieyiID);
    // console.log(yz_sf_xieyiID);
    // var khAreaId = $(".area").attr("ids");
    // console.log(khAreaId)


    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });

    // 请求超时
    var postTimeOut = setTimeout(() => {
        layer.close(index);
        errorTips("请求超时");
    }, 300000);

    var userId = sessionStorage.getItem('userId');
    var task = plus.uploader.createUpload(urlDns + "/user_app/yz/gr_xx_edit", { method: "POST" },
        function(t, status) { //上传完成
            // console.log("1:" + t.responseText.result)
            // console.log("2:" + JSON.stringify(status))
            // var responseText = JSON.parse(t.responseText);
            if (status == 200) {

                console.log(JSON.stringify(responseText))
                    // wt.close(); //关闭等待提示按钮
                if (responseText.result == 1) {
                    console.log("上传成功：" + responseText.result + "," + responseText.message);
                    layer.close(index);
                    $(".success").css("display", "block");
                    setTimeout(() => {
                        $(".success").css("display", "none");
                        location.href = "audit.html";
                    }, 1000);
                } else {
                    // 需要重新登录
                    if (window.plus) {
                        goToLogin("./login.html");
                    } else {
                        document.addEventListener('plusready', goToLogin, false);
                    }
                }
            } else {
                alert("上传失败：" + responseText.message);
                // wt.close(); //关闭等待提示按钮
            }
        }
    );
    //添加其他参数
    task.addData("realname", realname);
    task.addData("email", email);
    task.addData("idCardNum", idCardNum);
    task.addData("khh", accountBank);
    task.addData("accountName", accountName);
    task.addData("account", account);
    task.addData("tel_app", tel_app);
    task.addData("pass_app", pass_app);
    task.addData("code_app", code_app);
    task.addData("monthsy", incomeRangeText);
    if (yxy_code != "") {
        task.addData("employeecode", yxy_code);
    }

    // 两张身份证
    task.addFile(src1, { key: "idCardUpUrl" });
    task.addFile(src2, { key: "idCardDownUrl" });

    task.start();
}