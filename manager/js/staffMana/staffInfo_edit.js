var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

// 返回
$(".back").click(() => {
    // 清除缓存
    sessionStorage.removeItem("edit_staff");
    sessionStorage.removeItem("staff_edit_name");
    sessionStorage.removeItem("staff_edit_tel");
    sessionStorage.removeItem("staff_edit_email");
    sessionStorage.removeItem("staff_edit_idCard");

    sessionStorage.removeItem("staffIC1");
    sessionStorage.removeItem("staffIC2");
    sessionStorage.removeItem("staff_didUpload");
    sessionStorage.removeItem("infoid");

    history.back();
});

// 员工id
var staffId = sessionStorage.getItem("staffId");
// console.log(staffId);




// 上传身份证回来如果有已经填写的信息，进行渲染
var staff_edit_name = sessionStorage.getItem("staff_edit_name");
var staff_edit_tel = sessionStorage.getItem("staff_edit_tel");
var staff_edit_email = sessionStorage.getItem("staff_edit_email");
var staff_edit_idCard = sessionStorage.getItem("staff_edit_idCard");



// 判断是否处于编辑的状态
var edit_staff = sessionStorage.getItem("edit_staff");
if (edit_staff == 1) {
    // 处于编辑的状态
    $(".name").val(staff_edit_name);
    $(".tel").val(staff_edit_tel);
    $(".email").val(staff_edit_email);
    $(".idCard").val(staff_edit_idCard);
    $(".save").css("display", "block");
    $(".cancel").css("display", "block");
    $(".back").css("display", "none");


    // 判断证件照片是否已经上传
    var staff_didUpload = sessionStorage.getItem("staff_didUpload");
    console.log(staff_didUpload)
    if (staff_didUpload == 1) {
        $(".uploadTips").text("已上传");
    } else {
        $(".uploadTips").text("未上传");
    }
} else {
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
            layer.close(index);
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../../../page/register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                if (data.idcardzm != "" && data.idcardfm != "") {
                    $(".uploadTips").text("已上传");
                    sessionStorage.setItem('staff_didUpload', 1);
                }
                $(".name").val(data.name);
                $(".tel").val(data.tel);
                $(".email").val(data.email);
                $(".idCard").val(data.idcardcode);
                sessionStorage.setItem('staffIC1', data.idcardzm);
                sessionStorage.setItem('staffIC2', data.idcardfm);
                // 存储信息id，修改提交时要用
                sessionStorage.setItem("infoid", data.infoid);
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





// 停用
$(".stop").click(() => {
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
            "status": 2,
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

// 编辑，显示保存按钮，输入框可输入
$(".edit").click(() => {
    sessionStorage.setItem("edit_staff", 1);
    $(".save").css("display", "block");
    $(".cancel").css("display", "block");
    $(".back").css("display", "none");
    $("input").removeAttr("disabled");
});

// 取消
$(".cancel").click(() => {
    sessionStorage.setItem("edit_staff", 0);
    $(".save").css("display", "none");
    $(".cancel").css("display", "none");
    $(".back").css("display", "block");
    $("input").attr("disabled", "disabled");

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
            // layer.close(index);
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../../../page/register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                if (data.idcardzm != "" && data.idcardfm != "") {
                    $(".uploadTips").text("已上传");
                    sessionStorage.setItem('staff_didUpload', 1);
                }
                $(".name").val(data.name);
                $(".tel").val(data.tel);
                $(".email").val(data.email);
                $(".idCard").val(data.idcardcode);
                sessionStorage.setItem('staffIC1', data.idcardzm);
                sessionStorage.setItem('staffIC2', data.idcardfm);
                // 存储信息id，修改提交时要用
                sessionStorage.setItem("infoid", data.infoid);
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
});

// 身份证照片
$(".idCardPt").click(() => {
    var edit_staff = sessionStorage.getItem("edit_staff");
    if (edit_staff == 1) {
        // 信息处于编辑状态
        var name = $(".name").val();
        var tel = $(".tel").val();
        var email = $(".email").val();
        var idCard = $(".idCard").val();

        sessionStorage.setItem("staff_edit_name", name);
        sessionStorage.setItem("staff_edit_tel", tel);
        sessionStorage.setItem("staff_edit_email", email);
        sessionStorage.setItem("staff_edit_idCard", idCard);
        location.href = "./idCardPt_edit.html";
    } else {
        location.href = "./idCardPt_edit.html";
    }


});


// 邮箱正则
var emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
// 身份证正则
var idNumReg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
// 手机号正则
var userNumReg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;

// 保存
$(".save").click(() => {
    var name = $(".name").val();
    var tel = $(".tel").val();
    var email = $(".email").val();
    var idCard = $(".idCard").val();
    var uploadTips = $(".uploadTips").text();
    var staffIC1 = sessionStorage.getItem("staffIC1");
    var staffIC2 = sessionStorage.getItem("staffIC2");
    var infoid = sessionStorage.getItem("infoid");

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
        var task = plus.uploader.createUpload(urlDns + "/control_app/ms/employee_manage/edit", { method: "POST" },
            function(t, status) { //上传完成
                var responseText = JSON.parse(t.responseText);
                if (status == 200) {
                    layer.close(index);
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

                        console.log("上传成功：" + responseText.status + "," + responseText.message);
                        // 清除等待提示的加载圈
                        // 清除缓存  
                        sessionStorage.removeItem("staff_edit_name");
                        sessionStorage.removeItem("staff_edit_tel");
                        sessionStorage.removeItem("staff_edit_email");
                        sessionStorage.removeItem("staff_edit_idCard");
                        sessionStorage.removeItem("staffIC1");
                        sessionStorage.removeItem("staffIC2");
                        sessionStorage.removeItem("staff_didUpload");
                        sessionStorage.removeItem("infoid");
                        sessionStorage.removeItem("edit_staff");
                        $(".success").css("display", "block");
                        setTimeout(() => {
                            $(".success").css("display", "none");
                            location.reload();
                        }, 800);

                    }

                } else {
                    layer.close(index);
                    alert("上传失败：" + status);
                    // wt.close(); //关闭等待提示按钮
                }
            }
        );
        //添加其他参数
        task.addData("userid", staffId);
        task.addData("infoid", infoid);
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