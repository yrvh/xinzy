var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 返回
$(".back").click(() => {
    // 清除缓存  
    sessionStorage.removeItem("staff_edit_name");
    sessionStorage.removeItem("staff_edit_tel");
    sessionStorage.removeItem("staff_edit_email");
    sessionStorage.removeItem("staff_edit_idCard");
    sessionStorage.removeItem("staffIC1");
    sessionStorage.removeItem("staffIC2");
    sessionStorage.removeItem("staff_didUpload");

    history.back();
});


// 邮箱正则
var emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
// 身份证正则
var idNumReg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
// 手机号正则
var userNumReg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;


// 上传身份证回来如果有已经填写的信息，进行渲染
var staff_edit_name = sessionStorage.getItem("staff_edit_name");
var staff_edit_tel = sessionStorage.getItem("staff_edit_tel");
var staff_edit_email = sessionStorage.getItem("staff_edit_email");
var staff_edit_idCard = sessionStorage.getItem("staff_edit_idCard");

if (staff_edit_name) {
    $(".name").val(staff_edit_name);
}
if (staff_edit_tel) {
    $(".tel").val(staff_edit_tel);
}
if (staff_edit_email) {
    $(".email").val(staff_edit_email);
}
if (staff_edit_idCard) {
    $(".idCard").val(staff_edit_idCard);
}


// 判断证件照片是否已经上传
var staff_didUpload = sessionStorage.getItem("staff_didUpload");
console.log(staff_didUpload);
if (staff_didUpload == 1) {
    $(".uploadTips").text("已上传");
} else {
    $(".uploadTips").text("未上传");
}

// 证件照片
$(".idCardPt").click(() => {
    // 储存已经填写的信息
    var name = $(".name").val();
    var tel = $(".tel").val();
    var email = $(".email").val();
    var idCard = $(".idCard").val();
    sessionStorage.setItem("staff_edit_name", name);
    sessionStorage.setItem("staff_edit_tel", tel);
    sessionStorage.setItem("staff_edit_email", email);
    sessionStorage.setItem("staff_edit_idCard", idCard);
    location.href = "./uploadIdCard.html";
});

$(".save").click(() => {
    var name = $(".name").val();
    var tel = $(".tel").val();
    var email = $(".email").val();
    var idCard = $(".idCard").val();
    var uploadTips = $(".uploadTips").text();
    var staffIC1 = sessionStorage.getItem("staffIC1");
    var staffIC2 = sessionStorage.getItem("staffIC2");

    if (name == "") {
        errorTips("请输入姓名");
    } else if (tel == "") {
        errorTips("请输入手机号");
    } else if (!userNumReg.test(tel)) {
        errorTips("手机号不正确");
    } else if (email == "") {
        errorTips("请输入邮箱");
    } else if (!emailReg.test(email)) {
        errorTips("邮箱格式不正确");
    } else if (idCard == "") {
        errorTips("请输入身份证号码");
    } else if (!idNumReg.test(idCard)) {
        errorTips("身份证号码不正确");
    } else if (uploadTips != "已上传") {
        errorTips("请上传证件照片");
    } else {
        var index = layer.load(1, {
            // 数组中第一个参数是button的透明度
            // 第二个是背景颜色
            shade: [0.3, "white"]
        });
        var task = plus.uploader.createUpload(urlDns + "/control_app/ms/employee_manage/add", { method: "POST" },
            function(t, status) { //上传完成
                var responseText = JSON.parse(t.responseText);
                if (status == 200) {
                    if (responseText.result == 0) {
                        // 需要重新登录
                        if (window.plus) {
                            goToLogin("../../../page/register/login.html");
                        } else {
                            document.addEventListener('plusready', goToLogin, false);
                        }
                    } else {

                        // console.log(t)
                        // wt.close(); //关闭等待提示按钮
                        layer.close(index);
                        console.log("上传成功：" + responseText.result + "," + responseText.message);
                        // 清除等待提示的加载圈
                        layer.close(index);
                        // 清除缓存  
                        sessionStorage.removeItem("staff_edit_name");
                        sessionStorage.removeItem("staff_edit_tel");
                        sessionStorage.removeItem("staff_edit_email");
                        sessionStorage.removeItem("staff_edit_idCard");
                        sessionStorage.removeItem("staffIC1");
                        sessionStorage.removeItem("staffIC2");
                        sessionStorage.removeItem("staff_didUpload");
                        $(".success").css("display", "block");
                        setTimeout(() => {
                            $(".success").css("display", "none");
                            history.back();
                        }, 800);

                    }

                } else {
                    layer.close(index);
                    alert("上传失败：" + responseText.message);
                    // wt.close(); //关闭等待提示按钮
                }
            }
        );
        //添加其他参数
        task.addData("realname", name);
        task.addData("tel", tel);
        task.addData("email", email);
        task.addData("idCardNum", idCard);
        task.addData("tel_app", tel_app);
        task.addData("pass_app", pass_app);
        task.addData("code_app", code_app);

        // 两张身份证
        task.addFile(staffIC1, { key: "idCardUpUrl" });
        task.addFile(staffIC2, { key: "idCardDownUrl" });

        task.start();
    }
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
    }, 1500);
}