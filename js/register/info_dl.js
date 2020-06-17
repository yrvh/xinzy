// 返回
$(".back").click(() => {
    sessionStorage.removeItem("src1");
    sessionStorage.removeItem("src2");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("idNumber");
    sessionStorage.removeItem("accountBank");
    sessionStorage.removeItem("accountName");
    sessionStorage.removeItem("comName");
    sessionStorage.removeItem("tel_yl");
    sessionStorage.removeItem("identity");
    sessionStorage.removeItem("whcd");
    sessionStorage.removeItem("nation");
    sessionStorage.removeItem("zip_code");
    // 获取当前窗口
    var curr = plus.webview.currentWebview();
    // 获取所有Webview窗口
    var wvs = plus.webview.all();
    for (var i = 0, len = wvs.length; i < len; i++) {
        //关闭除setting页面外的其他页面
        if (wvs[i].getURL() == curr.getURL())
            continue;
        plus.webview.close(wvs[i]);
    }
    // 清除缓存
    sessionStorage.clear();
    localStorage.clear();
    //打开login页面后再关闭setting页面
    plus.webview.open("./login.html");
    curr.close();
});

// 把注册时的号码渲染过来
var tel = sessionStorage.getItem("tel");
$("#tel").text(tel);


// 从下一级页面回来，渲染已经填写的信息
var name = sessionStorage.getItem("name");
console.log(name)
var email = sessionStorage.getItem("email");
console.log(email)
var idNumber = sessionStorage.getItem("idNumber");
var accountBank = sessionStorage.getItem("accountBank");
var accountName = sessionStorage.getItem("accountName");
var account = sessionStorage.getItem("account");
var comName = sessionStorage.getItem("comName");
var tel_yl = sessionStorage.getItem("tel_yl");
var identity = sessionStorage.getItem("identity");
var whcd = sessionStorage.getItem("whcd");
var nation = sessionStorage.getItem("nation");
var zip_code = sessionStorage.getItem("zip_code");
var src1 = sessionStorage.getItem("idCardImg1");
// 经营范围
var businessRange_dl = sessionStorage.getItem("businessRange_dl");
// 通讯地址
var address_dl = sessionStorage.getItem("address_dl");
// 年收入范围
var incomeRangeText = sessionStorage.getItem('incomeRangeText');

if (name && name != "null") {
    // console.log(1111111111111)
    $("#realName").val(name);
}
if (email) {
    $("#email").val(email);
}
if (idNumber) {
    $("#idNumber").val(idNumber);
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
if (comName) {
    $("#comName").val(comName);
}
if (tel_yl) {
    $("#tel_yl").val(tel_yl);
} else {
    // 没改过预留电话号，默认是注册账号
    $("#tel_yl").val(tel);
}
if (identity) {
    $("#identity").val(identity);
}
if (whcd) {
    $("#whcd").val(whcd);
}
if (nation) {
    $("#nation").val(nation);
}
if (zip_code) {
    $("#zip_code").val(zip_code);
}
if (businessRange_dl) {
    $(".range").text(businessRange_dl);
}
if (address_dl) {
    $(".address").text(address_dl);
}
if (src1) {
    $("#uploadText").text("已上传");
}
if (incomeRangeText) {
    $("#incomeRangeText").text(incomeRangeText);
}



// 跳转上传身份证
$(".id_photoBox").click(() => {
    var name = $("#realName").val(); // 姓名
    var email = $("#email").val(); // 邮箱
    var idNumber = $("#idNumber").val(); // 身份证号码
    var accountBank = $("#accountBank").val(); // 开户行
    var accountName = $("#accountName").val(); // 开户名
    var account = $("#account").val(); // 账号
    var comName = $("#comName").val(); // 个体工商户名称
    var tel_yl = $("#tel_yl").val(); // 预留手机号
    var identity = $("#identity").val(); // 政治面貌
    var whcd = $("#whcd").val(); // 文化程度
    var nation = $("#nation").val(); // 民族
    var zip_code = $("#zip_code").val(); // 邮编
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("idNumber", idNumber);
    sessionStorage.setItem("accountBank", accountBank);
    sessionStorage.setItem("accountName", accountName);
    sessionStorage.setItem("account", account);
    sessionStorage.setItem("comName", comName);
    sessionStorage.setItem("tel_yl", tel_yl);
    sessionStorage.setItem("identity", identity);
    sessionStorage.setItem("whcd", whcd);
    sessionStorage.setItem("nation", nation);
    sessionStorage.setItem("zip_code", zip_code);
    location.href = "./upLoadIdCard_dl.html";
})

// 跳转经营范围
$(".rangeBox").click(() => {
    var name = $("#realName").val(); // 姓名
    var email = $("#email").val(); // 邮箱
    var idNumber = $("#idNumber").val(); // 身份证号码
    var accountBank = $("#accountBank").val(); // 开户行
    var accountName = $("#accountName").val(); // 开户名
    var account = $("#account").val(); // 账号
    var comName = $("#comName").val(); // 个体工商户名称
    var tel_yl = $("#tel_yl").val(); // 预留手机号
    var identity = $("#identity").val(); // 政治面貌
    var whcd = $("#whcd").val(); // 文化程度
    var nation = $("#nation").val(); // 民族
    var zip_code = $("#zip_code").val(); // 邮编
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("idNumber", idNumber);
    sessionStorage.setItem("accountBank", accountBank);
    sessionStorage.setItem("accountName", accountName);
    sessionStorage.setItem("account", account);
    sessionStorage.setItem("comName", comName);
    sessionStorage.setItem("tel_yl", tel_yl);
    sessionStorage.setItem("identity", identity);
    sessionStorage.setItem("whcd", whcd);
    sessionStorage.setItem("nation", nation);
    sessionStorage.setItem("zip_code", zip_code);
    location.href = "./businessRange_dl.html";
})

// 跳转通讯地址
$(".addressBox").click(() => {
    var name = $("#realName").val(); // 姓名
    var email = $("#email").val(); // 邮箱
    var idNumber = $("#idNumber").val(); // 身份证号码
    var accountBank = $("#accountBank").val(); // 开户行
    var accountName = $("#accountName").val(); // 开户名
    var account = $("#account").val(); // 账号
    var comName = $("#comName").val(); // 个体工商户名称
    var tel_yl = $("#tel_yl").val(); // 预留手机号
    var identity = $("#identity").val(); // 政治面貌
    var whcd = $("#whcd").val(); // 文化程度
    var nation = $("#nation").val(); // 民族
    var zip_code = $("#zip_code").val(); // 邮编
    sessionStorage.setItem("name", name);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("idNumber", idNumber);
    sessionStorage.setItem("accountBank", accountBank);
    sessionStorage.setItem("accountName", accountName);
    sessionStorage.setItem("account", account);
    sessionStorage.setItem("comName", comName);
    sessionStorage.setItem("tel_yl", tel_yl);
    sessionStorage.setItem("identity", identity);
    sessionStorage.setItem("whcd", whcd);
    sessionStorage.setItem("nation", nation);
    sessionStorage.setItem("zip_code", zip_code);
    location.href = "./address_dl.html";
})

// 跳转彩色免冠照片
// $(".in_photo").click(() => {
//     var name = $("#realName").val(); // 姓名
//     var email = $("#email").val(); // 邮箱
//     var idNumber = $("#idNumber").val(); // 身份证号码
//     var accountBank = $("#accountBank").val(); // 开户行
//     var accountName = $("#accountName").val(); // 开户名
//     var account = $("#account").val(); // 账号
//     var comName = $("#comName").val(); // 个体工商户名称
//     var tel_yl = $("#tel_yl").val(); // 预留手机号
//     var identity = $("#identity").val(); // 政治面貌
//     var whcd = $("#whcd").val(); // 文化程度
//     var nation = $("#nation").val(); // 民族
//     var zip_code = $("#zip_code").val(); // 邮编
//     sessionStorage.setItem("name", name);
//     sessionStorage.setItem("email", email);
//     sessionStorage.setItem("idNumber", idNumber);
//     sessionStorage.setItem("accountBank", accountBank);
//     sessionStorage.setItem("accountName", accountName);
//     sessionStorage.setItem("account", account);
//     sessionStorage.setItem("comName", comName);
//     sessionStorage.setItem("tel_yl", tel_yl);
//     sessionStorage.setItem("identity", identity);
//     sessionStorage.setItem("whcd", whcd);
//     sessionStorage.setItem("nation", nation);
//     sessionStorage.setItem("zip_code", zip_code);
//     location.href = "./inch_photo_upload.html";
// })

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

// 确认提交
$(".submit").click(() => {
    var name = $("#realName").val(); // 姓名
    var email = $("#email").val(); // 邮箱
    var idNumber = $("#idNumber").val(); // 身份证号码
    var accountBank = $("#accountBank").val(); // 开户行
    var accountName = $("#accountName").val(); // 开户名
    var account = $("#account").val(); // 账号
    var comName = $("#comName").val(); // 个体工商户名称
    var tel_yl = $("#tel_yl").val(); // 预留手机号
    var identity = $("#identity").val(); // 政治面貌
    var whcd = $("#whcd").val(); // 文化程度
    var nation = $("#nation").val(); // 民族
    var zip_code = $("#zip_code").val(); // 邮编
    // 经营范围
    var businessRange_dl = $(".range").text();
    // 通讯地址
    var address_dl = $(".address").text();
    // 两张身份证
    var src1 = sessionStorage.getItem("idCardImg1");
    var src2 = sessionStorage.getItem("idCardImg2");
    // 一寸照
    // var inch_photo = sessionStorage.getItem("inch_photo");

    // 年收入范围
    var incomeRange = sessionStorage.getItem("incomeRange");
    var incomeRangeText = $("#incomeRangeText").text();

    // console.log("手机号" + tel)
    // console.log("姓名" + name)
    // console.log("邮箱" + email)
    // console.log("身份证号" + idNumber)
    // console.log("开户行" + accountBank)
    // console.log("开户名" + accountName)
    // console.log("账号" + account)
    // console.log("个体工商户名称" + comName)
    // console.log("经营范围" + businessRange_dl)
    // console.log("政治面貌" + identity)
    // console.log("文化程度" + whcd)
    // console.log("民族" + nation)
    // console.log("地址" + address_dl)
    // console.log("邮编" + zip_code)
    // console.log("预留手机号" + tel_yl)
    // console.log("身份证正面" + src1)
    // console.log("身份证背面" + src2)
    // console.log("一寸照" + inch_photo)

    // else if (inch_photo == null) {
    //     errorInfo = "请上传一寸彩色免冠照";
    //     errorTips(errorInfo);
    // }
    if (name == "") {
        errorInfo = "请输入姓名";
        errorTips(errorInfo);
    } else if (email == "") {
        errorInfo = "请输入邮箱";
        errorTips(errorInfo);
    } else if (!emailReg.test(email)) {
        errorInfo = "邮箱格式不正确";
        errorTips(errorInfo);
    } else if (idNumber == "") {
        errorInfo = "请输入身份证号";
        errorTips(errorInfo);
    } else if (!idNumReg.test(idNumber)) {
        errorInfo = "身份证号格式不正确";
        errorTips(errorInfo);
    } else if (src1 == null) {
        errorInfo = "请上传身份证照片";
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
        errorInfo = "请输入开户账号";
        errorTips(errorInfo);
    } else if (!bankCardReg.test(account)) {
        errorInfo = "银行卡号格式不正确";
        errorTips(errorInfo);
    } else if (comName == "") {
        errorInfo = "请输入个体工商户名称";
        errorTips(errorInfo);
    } else if (businessRange_dl == "") {
        errorInfo = "请输入经营范围";
        errorTips(errorInfo);
    } else if (tel_yl == "") {
        errorInfo = "请输入个体工商户注册所需的电话号码";
        errorTips(errorInfo);
    } else if (identity == "") {
        errorInfo = "请输入政治面貌";
        errorTips(errorInfo);
    } else if (whcd == "") {
        errorInfo = "请输入文化程度";
        errorTips(errorInfo);
    } else if (nation == "") {
        errorInfo = "请输入民族";
        errorTips(errorInfo);
    } else if (address_dl == "") {
        errorInfo = "请输入通讯地址";
        errorTips(errorInfo);
    } else if (zip_code == "") {
        errorInfo = "请输入邮编";
        errorTips(errorInfo);
    } else {
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

        var task = plus.uploader.createUpload(urlDns + "/api/reg_dl/yz/add", { method: "POST" },
            function(t, status) { //上传完成
                // console.log("1:" + t.responseText.result)
                // console.log("2:" + JSON.stringify(status))
                var responseText = JSON.parse(t.responseText);
                if (status == 200) {

                    console.log(JSON.stringify(responseText))
                        // wt.close(); //关闭等待提示按钮
                        // if (responseText.result == 1) {
                        //     console.log("上传成功：" + responseText.result + "," + responseText.message);
                    layer.close(index);
                    errorTips("注册成功，等待审核")
                    setTimeout(() => {
                        // 获取当前窗口
                        var curr = plus.webview.currentWebview();
                        // 获取所有Webview窗口
                        var wvs = plus.webview.all();
                        for (var i = 0, len = wvs.length; i < len; i++) {
                            //关闭除setting页面外的其他页面
                            if (wvs[i].getURL() == curr.getURL())
                                continue;
                            plus.webview.close(wvs[i]);
                        }
                        // 清除缓存
                        sessionStorage.clear();
                        localStorage.clear();
                        //打开login页面后再关闭setting页面
                        plus.webview.open("./login.html");
                        curr.close();
                    }, 3000);
                    // } else {
                    //     // 需要重新登录
                    //     if (window.plus) {
                    //         goToLogin("./login.html");
                    //     } else {
                    //         document.addEventListener('plusready', goToLogin, false);
                    //     }
                    // }
                } else {
                    alert("上传失败：" + responseText.message);
                    // wt.close(); //关闭等待提示按钮
                }
            }
        );
        //添加其他参数
        task.addData("tel", tel);
        task.addData("realname", name);
        task.addData("email", email);
        task.addData("idCardNum", idNumber);
        task.addData("khh", accountBank);
        task.addData("accountName", accountName);
        task.addData("account", account);
        task.addData("comname", comName);
        task.addData("businessRange", businessRange_dl);
        task.addData("zzmm", identity);
        task.addData("whcd", whcd);
        task.addData("mzu", nation);
        task.addData("address", address_dl);
        task.addData("ybian", zip_code);
        task.addData("yltel", tel_yl);
        task.addData("monthsy", incomeRange);


        // 两张身份证
        task.addFile(src1, { key: "idCardUpUrl" });
        task.addFile(src2, { key: "idCardDownUrl" });

        // 一寸彩色照
        // task.addFile(inch_photo, { key: "ycurl" });


        task.start();
    }



});

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