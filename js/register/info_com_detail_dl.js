// 返回
$(".back").click(() => {
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

var tel_user = sessionStorage.getItem("tel");
$("#tel_fr input").val(tel_user);

var uid = sessionStorage.getItem("uid");
// 联系人手机号为账号手机号
// var tel_lxr = sessionStorage.getItem("tel");
// console.log("联系人手机号：" + tel_lxr)
// $("#capital_com input").val(tel_lxr);
// 公司logo
var logo_com = sessionStorage.getItem("logo_com");
if (logo_com != null) {
    $("#com_logo").attr("src", logo_com);
}
// 统一社会信用代码
var code_com = sessionStorage.getItem("code_com");
$("#code_com input").val(code_com);
// 单位名称
var name_com = sessionStorage.getItem("name_com");
$("#name_com input").val(name_com);
// 单位名称缩写
var name_abbr_com = sessionStorage.getItem("name_abbr_com");
$("#name_abbr_com input").val(name_abbr_com);
// 注册资本
var capital_com = sessionStorage.getItem("capital_com");
$("#capital_com input").val(capital_com);
// 单位类型
var type_com = sessionStorage.getItem("type_com");
$("#type_com .rangeText").text(type_com);
// 固定电话
var tel_com = sessionStorage.getItem("tel_com");
$("#tel_com input").val(tel_com);
// 成立日期
var date_com = sessionStorage.getItem("date_com");
$("#date_com .rangeText").text(date_com);
// 经营期限
var term_com = sessionStorage.getItem("term_com");
$("#term_com input").val(term_com);
// 公司登记机关
var office_com = sessionStorage.getItem("office_com");
$("#office_com input").val(office_com);
// 发证日期
var cer_time_com = sessionStorage.getItem("cer_time_com");
$("#cer_time_com .rangeText").text(cer_time_com);
// 法定代表人姓名
var name_fr = sessionStorage.getItem("name_fr");
$("#name_fr input").val(name_fr);
// 法人证件号码
var cer_num_fr = sessionStorage.getItem("cer_num_fr");
$("#cer_num_fr input").val(cer_num_fr);

// 法人手机号码
var tel_fr = sessionStorage.getItem("tel_fr");
console.log("法人手机号" + tel_fr)
if (tel_fr != null) {
    console.log(123456)
    $("#tel_fr input").val(tel_fr);
}

// 法人电子邮箱
var email_fr = sessionStorage.getItem("email_fr");
$("#email_fr input").val(email_fr);
// 联系人姓名
var name_lxr = sessionStorage.getItem("name_lxr");
$("#name_lxr input").val(name_lxr);
// 联系人证件号码
var cer_num_lxr = sessionStorage.getItem("cer_num_lxr");
$("#cer_num_lxr input").val(cer_num_lxr);
// 联系人手机号码
var tel_lxr = sessionStorage.getItem("tel");
$("#tel_lxr input").val(tel_lxr);
// 联系人电子邮箱
var email_lxr = sessionStorage.getItem("email_lxr");
$("#email_lxr input").val(email_lxr);
// 开户行
var accountBank = sessionStorage.getItem("accountBank");
$("#accountBank").val(accountBank);
// 开户名
var accountName = sessionStorage.getItem("accountName");
$("#accountName").val(accountName);
// 账号
var account = sessionStorage.getItem("account");
$("#account").val(account);
// 详细地址
var address_dl_com = sessionStorage.getItem("address_dl_com");
if (address_dl_com) {
    $("#address_com .rangeText").text(address_dl_com)
}
// 业务范围
var range_business_com = sessionStorage.getItem("range_business_com");
if (range_business_com) {
    $("#range_com .rangeText").text(range_business_com)
}
// 主营业务
var main_business_com = sessionStorage.getItem("main_business_com");
if (main_business_com) {
    $("#business_com .rangeText").text(main_business_com)
}

// 营业执照
var license = sessionStorage.getItem("license");
if (license) {
    $("#cer_photo_com .rangeText").text("已上传");
}

// 法人证件照
var idCardImg1_fr = sessionStorage.getItem("idCardImg1_fr");
if (idCardImg1_fr) {
    $("#cer_photo_fr .rangeText").text("已上传");
}

// 联系人证件照
var idCardImg1_lxr = sessionStorage.getItem("idCardImg1_lxr");
if (idCardImg1_lxr) {
    $("#cer_photo_lxr .rangeText").text("已上传");
}
// 住所
// 省
var province = sessionStorage.getItem("province")
    // 市
var city = sessionStorage.getItem("city")
    // 区
var area = sessionStorage.getItem("area")
if (province) {
    $("#place_com .rangeText").text(province + "-" + city + "-" + area);
}

// 启用联系人与否
var in_off = false;
$("#in_off").click(() => {
    in_off = !in_off;
    if (in_off == false) {
        // 不启用联系人，法人号码为账号号码,不允许编辑
        $("#tel_fr input").attr("disabled", "disabled");
        $("#tel_fr input").val(tel_user);
        // console.log("不启用联系人")

        $("#in_off").attr("src", "../../img/off.png");
        $("#name_lxr").css("display", "none");
        $("#cer_type_lxr").css("display", "none");
        $("#cer_num_lxr").css("display", "none");
        $("#cer_photo_lxr").css("display", "none");
        $("#tel_lxr").css("display", "none");
        $("#email_lxr").css("display", "none");
        // 标记不启用联系人
        sessionStorage.setItem("in_off", in_off);
    }
    if (in_off == true) {
        // 启用联系人，联系人号码为账号号码,法人号码不能和账号一样
        $("#tel_fr input").removeAttr("disabled");

        $("#in_off").attr("src", "../../img/in.png");
        $("#name_lxr").css("display", "block");
        $("#cer_type_lxr").css("display", "block");
        $("#cer_type_lxr").css("display", "flex");
        $("#cer_num_lxr").css("display", "block");
        $("#cer_photo_lxr").css("display", "block");
        $("#cer_photo_lxr").css("display", "flex");
        $("#tel_lxr").css("display", "block");
        $("#email_lxr").css("display", "block");
        // 标记已经启用联系人
        sessionStorage.setItem("in_off", in_off);

    }
});
// 显示从二级页面回来联系人的启动与否
var in_off = sessionStorage.getItem("in_off");
console.log(in_off)
if (in_off == "false") {
    $("#tel_fr input").attr("disabled", "disabled");
    $("#tel_fr input").val(tel_user);

    $("#in_off").attr("src", "../../img/off.png");
    $("#name_lxr").css("display", "none");
    $("#cer_type_lxr").css("display", "none");
    $("#cer_num_lxr").css("display", "none");
    $("#cer_photo_lxr").css("display", "none");
    $("#tel_lxr").css("display", "none");
    $("#email_lxr").css("display", "none");
}
if (in_off == "true") {
    $("#tel_fr input").removeAttr("disabled");

    $("#in_off").attr("src", "../../img/in.png");
    $("#name_lxr").css("display", "block");
    $("#cer_type_lxr").css("display", "block");
    $("#cer_type_lxr").css("display", "flex");
    $("#cer_num_lxr").css("display", "block");
    $("#cer_photo_lxr").css("display", "block");
    $("#cer_photo_lxr").css("display", "flex");
    $("#tel_lxr").css("display", "block");
    $("#email_lxr").css("display", "block");
}

// 选择单位类型
var com_type = [];
// 获取类型
$.post(urlDns + "/api/reg_dl/sf/get_company_type", function(data) {
        console.log(data)
        var data = JSON.stringify(data);
        data = data.replace(/id/g, "value");
        com_type = JSON.parse(data);

    })
    // console.log(com_type)
    // 选择类型
$("#type_com").click(() => {
    var popPicker = new mui.PopPicker();
    popPicker.setData(com_type)
        // [{ value: 'ywj', text: '北海骄龙网络有限公司' },
        //     { value: 'aaa', text: 'xxxxxxx有限公司' },
        //     { value: 'lj', text: 'xxxxxxx有限公司' },
        //     { value: 'ymt', text: 'xxxxxxx有限公司' },
        // ]
    popPicker.show(function(selectItems) {
        // getProData(selectItems[0].value, selectItems[0].text);
        $("#type_com .rangeText").text(selectItems[0].text)
        sessionStorage.setItem("companytypeid", selectItems[0].value);
    })
});


// 住所
$("#place_com").click(() => {
    var popPicker = new mui.PopPicker({ layer: 3 });
    popPicker.setData(regions)
        // [{ value: 'ywj', text: '北海骄龙网络有限公司' },
        //     { value: 'aaa', text: 'xxxxxxx有限公司' },
        //     { value: 'lj', text: 'xxxxxxx有限公司' },
        //     { value: 'ymt', text: 'xxxxxxx有限公司' },
        // ]
    popPicker.show(function(selectItems) {
        // console.log(selectItems[1].text)
        $("#place_com .rangeText").text(selectItems[0].text + "-" + selectItems[1].text + "-" + selectItems[2].text)
            // 省
        sessionStorage.setItem("province", selectItems[0].text)
            // 市
        sessionStorage.setItem("city", selectItems[1].text)
            // 区
        sessionStorage.setItem("area", selectItems[2].text)

        console.log(selectItems[0].value)
        sessionStorage.setItem("province_id", selectItems[0].value)
        sessionStorage.setItem("city_id", selectItems[1].value)
        sessionStorage.setItem("area_id", selectItems[2].value)
    })
})

// 成立日期
$("#date_com").click(() => {
    var dtPicker = new mui.DtPicker({
        type: 'date',
        beginYear: "1900",
        endDate: new Date()
    });
    /*  type参数：'datetime'-完整日期视图(年月日时分)
            'date'--年视图(年月日)
            'time' --时间视图(时分)
            'month'--月视图(年月)
            'hour'--时视图(年月日时)
    */
    dtPicker.show(function(selectItems) {
        console.log(selectItems.text)
        $("#date_com .rangeText").text(selectItems.text);
    })
})


// 发证日期
$("#cer_time_com").click(() => {
    var dtPicker = new mui.DtPicker({
        type: 'date',
        beginYear: "1900",
        endDate: new Date()
    });
    /*  type参数：'datetime'-完整日期视图(年月日时分)
            'date'--年视图(年月日)
            'time' --时间视图(时分)
            'month'--月视图(年月)
            'hour'--时视图(年月日时)
    */
    dtPicker.show(function(selectItems) {
        console.log(selectItems.text)
        $("#cer_time_com .rangeText").text(selectItems.text);
    })
})

// 上传公司商标
$("#logo_com").click(() => {
    // alert(111)
    page.imgUp();
})

//弹出系统按钮选择框
var page = null;
page = {
    imgUp: function() {
        var m = this;
        /* console.log(m);*/
        plus.nativeUI.actionSheet({
            cancel: "取消",
            buttons: [
                { title: "拍摄" },
                { title: "相册" }
            ]
        }, function(e) { //1 是拍照  2 从相册中选择 
            switch (e.index) {
                case 1:
                    appendByCamera();
                    break;
                case 2:
                    appendByGallery();
                    break;
            }
        });
    }
}


// 拍照添加文件
function appendByCamera() {
    plus.camera.getCamera().captureImage(function(e) {
        console.log("e is" + e);
        plus.io.resolveLocalFileSystemURL(e, function(entry) {
            var path = entry.toLocalURL();
            // ===============================
            plus.zip.compressImage({
                    src: path,
                    dst: '_doc/zip_' + path.substr(path.lastIndexOf('/') + 1),
                    quality: 60, //质量1-100	
                    overwrite: true,
                    width: "50%", //缩小到原来的一半			
                    height: "50%" //缩小到原来的一半		
                },
                function(event) {

                    console.log("<=====压缩文件路径=====>" + event.target);
                    console.log("<=====压缩后的大小=====>" + event.size); //除1024单位为K
                    console.log("<=====压缩后的宽度=====>" + event.width);
                    console.log("<=====压缩后的高度=====>" + event.height);
                    // var filesize = 1 * 1024 * 1024;
                    // if (event.size > filesize) {
                    //     alert("上传图片大小不能超过1M！");
                    //     return;
                    // }
                    $("#com_logo")[0].src = event.target;
                    // 选择好照片就判断一次是否可以使用“确定按钮”
                    // showNext();
                },
                function(error) {
                    errorTips("图片上传出错");
                    console.log("压缩失败:" + error.message);
                });
            // ========================================
            // $(".headimg")[indexa].src = path;


        }, function(e) {
            mui.toast("读取拍照文件错误：" + e.message);
        });

    });
}
// 从相册添加文件
function appendByGallery() {
    plus.gallery.pick(function(path) {
        console.log(path);

        // ===============================
        plus.zip.compressImage({
                src: path,
                dst: '_doc/zip_' + path.substr(path.lastIndexOf('/') + 1),
                quality: 60, //质量1-100	
                overwrite: true,
                width: "50%", //缩小到原来的一半			
                height: "50%" //缩小到原来的一半		
            },
            function(event) {

                console.log("<=====压缩文件路径=====>" + event.target);
                console.log("<=====压缩后的大小=====>" + event.size); //除1024单位为K
                console.log("<=====压缩后的宽度=====>" + event.width);
                console.log("<=====压缩后的高度=====>" + event.height);
                // var filesize = 1 * 1024 * 1024;
                // if (event.size > filesize) {
                //     alert("上传图片大小不能超过1M！");
                //     return;
                // }
                $("#com_logo")[0].src = event.target;
                // 选择好照片就判断一次是否可以使用“确定按钮”
                // showNext();
            },
            function(error) {
                errorTips("图片上传出错");
                console.log("压缩失败:" + error.message);
            });
    });
}

// 详细地址
$("#address_com").click(() => {
    saveInfo();
    location.href = "./com_dl_detail/address_detail.html";
})

// 业务范围
$("#range_com").click(() => {
    saveInfo();
    location.href = "./com_dl_detail/range_business.html";
})

// 主营业务
$("#business_com").click(() => {
    saveInfo();
    location.href = "./com_dl_detail/main_business.html";
})

// 营业执照
$("#cer_photo_com").click(() => {
    saveInfo();
    location.href = "./com_dl_detail/business_license.html";
})

// 法人证件照
$("#cer_photo_fr").click(() => {
    saveInfo();
    location.href = "./com_dl_detail/upLoadIdCard_fr.html";
})

// 联系人证件照
$("#cer_photo_lxr").click(() => {
    saveInfo();
    location.href = "./com_dl_detail/upLoadIdCard_lxr.html";
})

// 与业者协议模板
$(".xieyi_info").click(() => {
    saveInfo();
    location.href = "./com_dl_detail/agreementTem_com_dl.html";
});

// 手机号正则
var userNumReg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
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
// 统一社会信用代码正则
var com_codeReg = /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/i;

// 提交
$(".save").click(() => {

    // 公司logo
    var logo_com = $("#com_logo").attr("src");
    // 统一社会信用代码
    var code_com = $("#code_com input").val();
    // 单位名称
    var name_com = $("#name_com input").val();
    // 单位名称缩写
    var name_abbr_com = $("#name_abbr_com input").val();
    // 注册资本
    var capital_com = $("#capital_com input").val();
    // 单位类型ID
    var companytypeid = sessionStorage.getItem("companytypeid");
    // 住所省份
    var province_id = sessionStorage.getItem("province_id");
    // 住所城市
    var city_id = sessionStorage.getItem("city_id");
    // 住所区域
    var area_id = sessionStorage.getItem("area_id");
    console.log(province_id)
    console.log(city_id)
    console.log(area_id)
        // 详细地址
    var address_dl_com = sessionStorage.getItem("address_dl_com");
    // 固定电话
    var tel_com = $("#tel_com input").val();
    // 成立日期
    var date_com = $("#date_com .rangeText").text();
    // 经营期限
    var term_com = $("#term_com input").val();
    // 业务范围
    var range_business_com = sessionStorage.getItem("range_business_com");
    // 主营业务
    var main_business_com = sessionStorage.getItem("main_business_com");
    // 公司登记机关
    var office_com = $("#office_com input").val();
    // 发证日期
    var cer_time_com = $("#cer_time_com .rangeText").text();
    // 营业执照
    var license = sessionStorage.getItem("license");
    // 法定代表人姓名
    var name_fr = $("#name_fr input").val();
    // 法人证件号码
    var cer_num_fr = $("#cer_num_fr input").val();
    // 法人证件照
    var idCardImg1_fr = sessionStorage.getItem("idCardImg1_fr");
    var idCardImg2_fr = sessionStorage.getItem("idCardImg2_fr");
    // 法人手机号码
    var tel_fr = $("#tel_fr input").val();
    // 法人电子邮箱
    var email_fr = $("#email_fr input").val();
    // 联系人姓名
    var name_lxr = $("#name_lxr input").val();
    // 联系人证件号码
    var cer_num_lxr = $("#cer_num_lxr input").val();
    // 联系人证件照
    var idCardImg1_lxr = sessionStorage.getItem("idCardImg1_lxr");
    var idCardImg2_lxr = sessionStorage.getItem("idCardImg2_lxr");
    // 联系人手机号码
    var tel_lxr = $("#tel_lxr input").val();
    // 联系人电子邮箱
    var email_lxr = $("#email_lxr input").val();
    // 开户行
    var accountBank = $("#accountBank").val();
    // 开户名
    var accountName = $("#accountName").val();
    // 账号
    var account = $("#account").val();
    // 协议内容
    var xieyiText = sessionStorage.getItem("xieyiText");

    // 启用联系人的图标
    var in_off = $("#in_off").attr("src");

    if (code_com == "") {
        errorTips("统一社会信用代码不能为空");
    } else if (!com_codeReg.test(code_com)) {
        errorTips("统一社会信用代码不正确");
    } else if (name_com == "") {
        errorTips("单位名称不能为空");
    } else if (name_abbr_com == "") {
        errorTips("单位名称缩写不能为空");
    } else if (capital_com == "") {
        errorTips("注册资本不能为空");
    } else if (companytypeid == "") {
        errorTips("请选择单位类型");
    } else if (province_id == "") {
        errorTips("请选择住所所在地");
    } else if (address_dl_com == "") {
        errorTips("请填写详细地址");
    } else if (tel_com == "") {
        errorTips("固定电话不能为空");
    } else if (date_com == "") {
        errorTips("请选择成立日期");
    } else if (term_com == "") {
        errorTips("请填写经营期限");
    } else if (range_business_com == "") {
        errorTips("请填写业务范围");
    } else if (main_business_com == "") {
        errorTips("请填写主营业务");
    } else if (office_com == "") {
        errorTips("请填写登记机关");
    } else if (cer_time_com == "") {
        errorTips("请选择发证日期");
    } else if (license == null) {
        errorTips("请上传营业执照");
    } else if (name_fr == "") {
        errorTips("请填写法人姓名");
    } else if (cer_num_fr == "") {
        errorTips("请填写法人证件号码");
    } else if (!idNumReg.test(cer_num_fr)) {
        errorTips("法人证件号码有误");
    } else if (idCardImg1_fr == null) {
        errorTips("请上传法人证件照");
    } else if (tel_fr == "") {
        errorTips("请填写法人手机号码");
    } else if (!userNumReg.test(tel_fr)) {
        errorTips("法人手机号码不正确");
    } else if (email_fr == "") {
        errorTips("请填写法人电子邮箱");
    } else if (email_fr == "") {
        errorTips("请填写法人电子邮箱");
    } else if (accountBank == "") {
        errorTips("开户行不能为空");
    } else if (accountName == "") {
        errorTips("开户名不能为空");
    } else if (account == "") {
        errorTips("开户账号不能为空");
    } else if (!bankCardReg.test(account)) {
        errorInfo = "开户账号格式不正确";
        errorTips(errorInfo);
    } else if (xieyiText == "") {
        errorTips("请编辑协议模板");
    } else {

        if (in_off != "../../img/off.png") {
            console.log("启用")
                // 启用了联系人
            if (name_lxr == "") {
                errorTips("请填写联系人姓名");
            } else if (cer_num_lxr == "") {
                errorTips("请填写联系人证件号码");
            } else if (idCardImg1_lxr == null) {
                errorTips("请上传联系人证件照");
            } else if (email_lxr == "") {
                errorTips("请填写联系人电子邮箱");
            } else if (tel_fr == tel_lxr) {
                errorTips("您启用了联系人，法人手机号码不能和联系人一样");
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

                var task = plus.uploader.createUpload(urlDns + "/api/reg_dl/sf/add", { method: "POST" },
                    function(t, status) { //上传完成
                        // console.log("1:" + t.responseText.result)
                        // console.log("2:" + JSON.stringify(status))
                        var responseText = JSON.parse(t.responseText);
                        if (status == 200) {

                            console.log(JSON.stringify(responseText))
                                // wt.close(); //关闭等待提示按钮
                            if (responseText.result == 1) {
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
                            }
                            // else {
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
                task.addData("uid", uid);

                // 法人信息
                task.addData("tel_fr", tel_fr);
                task.addData("ishavefr", "1");
                task.addData("idCardNum_fr", cer_num_fr);
                task.addData("email_fr", email_fr);
                task.addData("realname_fr", name_fr);
                // 公司信息
                task.addData("xycode", code_com);
                task.addData("name", name_com);
                task.addData("namePY", name_abbr_com);
                task.addData("capital", capital_com);
                task.addData("companytypeid", companytypeid);
                task.addData("province", province_id);
                task.addData("city", city_id);
                task.addData("area", area_id);
                task.addData("address", address_dl_com);
                task.addData("tel", tel_com);
                task.addData("createtime", date_com);
                task.addData("endtime", term_com);
                task.addData("businessRange", range_business_com);
                task.addData("zybusiness", main_business_com);
                task.addData("registerCompany", office_com);
                task.addData("getCarTime", cer_time_com);
                // 账户信息
                task.addData("khh", accountBank);
                task.addData("accountName", accountName);
                task.addData("account", account);
                // 协议
                task.addData("xiyi", xieyiText);
                // 联系人信息
                task.addData("idCardNum_lxr", cer_num_lxr);
                task.addData("email_lxr", email_lxr);
                task.addData("realname_lxr", name_lxr);



                // 法人身份证
                task.addFile(idCardImg1_fr, { key: "idCardUpUrl_fr" });
                task.addFile(idCardImg2_fr, { key: "idCardDownUrl_fr" });

                // 公司商标
                if (logo_com != "../../img/logo_com_default.png") {
                    task.addFile(logo_com, { key: "logoupload" });
                }


                // 营业执照
                task.addFile(license, { key: "yyzzupload" });

                // 联系人身份证
                task.addFile(idCardImg1_lxr, { key: "idCardUpUrl_lxr" });
                task.addFile(idCardImg2_lxr, { key: "idCardDownUrl_lxr" });


                task.start();
            }

        } else {
            // 不启用联系人
            console.log("不启用")

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

            var task = plus.uploader.createUpload(urlDns + "/api/reg_dl/sf/add", { method: "POST" },
                function(t, status) { //上传完成
                    // console.log("1:" + t.responseText.result)
                    // console.log("2:" + JSON.stringify(status))
                    var responseText = JSON.parse(t.responseText);
                    if (status == 200) {

                        console.log(JSON.stringify(responseText))
                            // wt.close(); //关闭等待提示按钮
                        if (responseText.result == 1) {
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
                        }
                        // else {
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
            task.addData("uid", uid);

            // 法人信息
            task.addData("tel_fr", tel_fr);
            task.addData("ishavefr", "0");
            task.addData("idCardNum_fr", cer_num_fr);
            task.addData("email_fr", email_fr);
            task.addData("realname_fr", name_fr);
            // 公司信息
            task.addData("xycode", code_com);
            task.addData("name", name_com);
            task.addData("namePY", name_abbr_com);
            task.addData("capital", capital_com);
            task.addData("companytypeid", companytypeid);
            task.addData("province", province_id);
            task.addData("city", city_id);
            task.addData("area", area_id);
            task.addData("address", address_dl_com);
            task.addData("tel", tel_com);
            task.addData("createtime", date_com);
            task.addData("endtime", term_com);
            task.addData("businessRange", range_business_com);
            task.addData("zybusiness", main_business_com);
            task.addData("registerCompany", office_com);
            task.addData("getCarTime", cer_time_com);
            // 账户信息
            task.addData("khh", accountBank);
            task.addData("accountName", accountName);
            task.addData("account", account);
            // 协议
            task.addData("xiyi", xieyiText);

            // 法人身份证
            task.addFile(idCardImg1_fr, { key: "idCardUpUrl_fr" });
            task.addFile(idCardImg2_fr, { key: "idCardDownUrl_fr" });

            // 公司商标
            if (logo_com != "../../img/logo_com_default.png") {
                task.addFile(logo_com, { key: "logoupload" });
            }

            // 营业执照
            task.addFile(license, { key: "yyzzupload" });

            task.start();



        }
    }
});

// 缓存信息
function saveInfo() {
    // 公司logo
    var logo_com = $("#com_logo").attr("src");
    sessionStorage.setItem("logo_com", logo_com);
    // 统一社会信用代码
    var code_com = $("#code_com input").val();
    sessionStorage.setItem("code_com", code_com);
    // 单位名称
    var name_com = $("#name_com input").val();
    sessionStorage.setItem("name_com", name_com);
    // 单位名称缩写
    var name_abbr_com = $("#name_abbr_com input").val();
    sessionStorage.setItem("name_abbr_com", name_abbr_com);
    // 注册资本
    var capital_com = $("#capital_com input").val();
    sessionStorage.setItem("capital_com", capital_com);
    // 单位类型
    var type_com = $("#type_com .rangeText").text();
    sessionStorage.setItem("type_com", type_com);
    // 固定电话
    var tel_com = $("#tel_com input").val();
    sessionStorage.setItem("tel_com", tel_com);
    // 成立日期
    var date_com = $("#date_com .rangeText").text();
    sessionStorage.setItem("date_com", date_com);
    // 经营期限
    var term_com = $("#term_com input").val();
    sessionStorage.setItem("term_com", term_com);
    // 公司登记机关
    var office_com = $("#office_com input").val();
    sessionStorage.setItem("office_com", office_com);
    // 发证日期
    var cer_time_com = $("#cer_time_com .rangeText").text();
    sessionStorage.setItem("cer_time_com", cer_time_com);
    // 法定代表人姓名
    var name_fr = $("#name_fr input").val();
    sessionStorage.setItem("name_fr", name_fr);
    // 法人证件号码
    var cer_num_fr = $("#cer_num_fr input").val();
    sessionStorage.setItem("cer_num_fr", cer_num_fr);
    // 法人手机号码
    var tel_fr = $("#tel_fr input").val();
    sessionStorage.setItem("tel_fr", tel_fr);
    // 法人电子邮箱
    var email_fr = $("#email_fr input").val();
    sessionStorage.setItem("email_fr", email_fr);
    // 联系人姓名
    var name_lxr = $("#name_lxr input").val();
    sessionStorage.setItem("name_lxr", name_lxr);
    // 联系人证件号码
    var cer_num_lxr = $("#cer_num_lxr input").val();
    sessionStorage.setItem("cer_num_lxr", cer_num_lxr);
    // 联系人手机号码
    var tel_lxr = $("#tel_lxr input").val();
    sessionStorage.setItem("tel_lxr", tel_lxr);
    // 联系人电子邮箱
    var email_lxr = $("#email_lxr input").val();
    sessionStorage.setItem("email_lxr", email_lxr);
    // 开户行
    var accountBank = $("#accountBank").val();
    sessionStorage.setItem("accountBank", accountBank);
    // 开户名
    var accountName = $("#accountName").val();
    sessionStorage.setItem("accountName", accountName);
    // 账号
    var account = $("#account").val();
    sessionStorage.setItem("account", account);
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