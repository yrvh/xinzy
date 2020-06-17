// 返回
$(".back").click(() => {
    history.back();
});

var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 下一页
$(".next").click(() => {
    location.href = "./companyManaDetail_two.html";
});

// 获取公司的ID
var comDetailId = sessionStorage.getItem("comDetailId");
console.log(comDetailId);

$(function() {
    var index = layer.load(1, {
        // 数组中第一个参数是button的透明度
        // 第二个是背景颜色
        shade: [0.3, "white"]
    });
    var getData = $.ajax({
        url: urlDns + "/control_app/ms/sf/showInfo_step01",
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
            // console.log(data.cname)
            layer.close(index);
            console.log(JSON.stringify(data));
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../../../page/register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                if (data.icon != "/img/R.png") {
                    console.log(data.icon)
                    $(".logo").attr("src", data.icon);
                } else {
                    $(".logo").attr("src", "../../../img/com_default_Icon.png");
                }
                $("#creditNum").text(data.xycode);
                $("#name").text(data.cname);
                $("#businessName").text(data.cname_py);
                $("#type").text(data.cTypeName);
                $(".rangeText").text(data.area);
                $(".addressText").text(data.address);
                $("#telephone").text(data.tel);
                $("#date").text(data.creattime);
                $(".scope").text(data.businessRange);
                $(".mainBusiness").text(data.zybusiness);
                $("#registerUnit").text(data.registerCompany);
                $("#getDate").text(data.getCartTime);


                console.log(data.ishavelxr)
                if (data.ishavelxr == 1) {
                    // 启用了联系人
                    $(".contacts").css("display", "block");
                    // 法人信息
                    console.log(data.realname_fr)
                    $("#ceoName").text(data.realname_fr);
                    $("#ceoCertifiType").text("身份证");
                    $("#ceoNum").text(data.idcard_fr);
                    $("#ceotTel").text(data.tel_fr);
                    $("#ceoEmail").text(data.email_fr);
                    // 联系人信息
                    $("#contactsName").text(data.realname);
                    $("#certificatesType").text("身份证");
                    $("#certificatesNum").text(data.idcard);
                    $("#contactsTel").text(data.usertel);
                    $("#contactsEmail").text(data.email);
                } else {
                    // 未启用联系人，没有联系人信息
                    $(".contacts").css("display", "none");
                    // 法人信息
                    $("#ceoName").text(data.realname);
                    $("#ceoCertifiType").text("身份证");
                    $("#ceoNum").text(data.idcard);
                    $("#ceotTel").text(data.usertel);
                    $("#ceoEmail").text(data.email);
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
});

// 公司商标照片
$(".com_logo").click(() => {
    location.href = "./com_logo.html";
});

// 法人证件照片
$(".idCardPhoto_fr").click(() => {
    location.href = "./idCardPhotos_fr.html";
});

// 联系人证件照片
$(".idCardPhoto_lxr").click(() => {
    location.href = "./idCardPhotos_lxr.html";
});


// 营业执照
$(".photos").click(() => {
    location.href = "./certificPhoto.html";
});

// 详细地址
$(".addressBox").click(() => {
    location.href = "./address.html";
});

// 业务范围
$(".business_range").click(() => {
    location.href = "./business_range.html";
});

// 主营业务
$(".major_business").click(() => {
    location.href = "./major_business.html";
});