$.ajaxSettings.async = false;
// 返回
$(".back").click(() => {
    location.href = "./cooperation_contract_com.html";
});

var tel = localStorage.getItem("tel");
$("#tel").text(tel);

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
        submit();
    }
});

// 提交信息
function submit() {
    // 用户名
    var reUserName = sessionStorage.getItem('reUserName');
    // 手机号
    var tel = localStorage.getItem('tel');
    // 密码
    var password = localStorage.getItem('password');
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
    // 年收入范围
    var incomeRangeText = sessionStorage.getItem("incomeRange");

    // 营销员工号
    var yxy_code = $("#yxy_code").val();

    // 两个协议id
    var hhr_ms_id = sessionStorage.getItem("hhr_ms_id");
    var yz_ms_id = sessionStorage.getItem("yz_ms_id");
    // 三个分配比例
    // var hhr_ms_fpbili = sessionStorage.getItem("hhr_ms_fpbili");
    // var hhr_ms_fpbili2 = sessionStorage.getItem("hhr_ms_fpbili2");
    var yz_ms_fpbili = sessionStorage.getItem("yz_ms_fpbili");

    // 两张身份证照片
    var src1 = sessionStorage.getItem('idCardImg1');
    var src2 = sessionStorage.getItem('idCardImg2');
    // 秘书公司id
    var comids = sessionStorage.getItem('comids');


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

    var task = plus.uploader.createUpload(urlDns + "/user_app/hhr/add", { method: "POST" },
        function(t, status) { //上传完成
            console.log("返回字段：" + JSON.stringify(t))
            console.log("返回状态：" + JSON.stringify(status))
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

    task.addData("hhr_ms_xieyiID", hhr_ms_id);
    task.addData("yz_ms_xieyiID", yz_ms_id);

    task.addData("fpbili_yz", yz_ms_fpbili);
    // task.addData("fpbili_hhr01", hhr_ms_fpbili);
    // task.addData("fpbili_hhr02", hhr_ms_fpbili2);
    // 推荐人id，合作伙伴不存在推荐人，为0
    task.addData("upid", "0");
    task.addData("comids", comids);
    task.addData("monthsy", incomeRangeText);
    if (yxy_code != "") {
        task.addData("employeecode", yxy_code);
    }

    // 两张身份证
    task.addFile(src1, { key: "idCardUpUrl" });
    task.addFile(src2, { key: "idCardDownUrl" });

    task.start();
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
    // 账号
    var account = $("#account").val();
    sessionStorage.setItem("realname", realname);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("idCardNum", idCardNum);
    sessionStorage.setItem("accountBank", accountBank);
    sessionStorage.setItem("accountName", accountName);
    sessionStorage.setItem("account", account);

    window.location = "./cooperation_upLoadIdCard.html";
    // mui.openWindow('./upLoadIdCard.html');
});

// 判断用户是否已经上传证件照，显示对应的文字
var didUpload = sessionStorage.getItem('didUpload');
if (didUpload) {
    $(".uploadText").text("已上传");
} else {
    $(".uploadText").text("未上传");
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