// // 获取地址栏的参数
// // 调用方法
// // console.log(getQueryString("参数名"));
// function getQueryString(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     // unescape() 函数可对通过 escape() 编码的字符串进行解码。
//     if (r != null) return unescape(r[2]);
//     return null;
// }
var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);

$(".updateTime").css("display", "block");
var contractImg = sessionStorage.getItem("header_contractImg");
console.log(contractImg);
var header_contractImg = JSON.parse(contractImg);
console.log(header_contractImg);
var hasHeaderContractImg = sessionStorage.getItem("hasHeaderContractImg");
console.log(hasHeaderContractImg);
var comAddress = sessionStorage.getItem("comAddress");
console.log(comAddress)

var headerName = sessionStorage.getItem("headerName", headerName);
var taxesCode = sessionStorage.getItem("taxesCode", taxesCode);
var email = sessionStorage.getItem("email", email);


var headerId = sessionStorage.getItem("headerId");
console.log(headerId);
if (hasHeaderContractImg == 1) {
    $(".uploadTips").text("已上传");

} else {
    $(".uploadTips").text("未上传");
}


if (headerName) {
    $(".headerName").val(headerName);
}
if (taxesCode) {
    $(".taxesCode").val(taxesCode);
}
if (headerName) {
    $(".email").val(email);
}
if (comAddress) {
    $(".addressStr").text(comAddress);
} else {
    var oldHeaderImg = "";
    $.post(urlDns + "/control_app/yz/tt/editUI", {
        id: headerId,
        pass_app: pass_app,
        tel_app: tel_app,
        code_app: code_app
    }, function(data) {
        console.log(JSON.stringify(data));
        if (data.result == 0) {
            // 需要重新登录
            if (window.plus) {
                goToLogin("../register/login.html");
            } else {
                document.addEventListener('plusready', goToLogin, false);
            }
        } else {
            sessionStorage.setItem("ishaveyw", data.ishaveyw);
            if (data.ishaveyw == 1) {
                // 1 有收入记录，纳税识别号和业务合同不能修改
                // 0 可以修改
                $(".taxesCode").attr("disabled", "disabled");
                $(".taxesCode").attr("disabled", "disabled");

            }

            $(".headerName").val(data.name);
            $(".taxesCode").val(data.nscode);
            $(".email").val(data.email);
            $(".addressStr").text(data.address);
            if (data.urls == 0) {
                $(".uploadTips").text("未上传");
                sessionStorage.setItem("hasHeaderContractImg", 0);
            } else {
                $(".uploadTips").text("已上传");
                sessionStorage.setItem("hasHeaderContractImg", 1);
                var imgs = [];
                for (var i = 0; i < data.urls.length; i++) {
                    imgs.push(data.urls[i].url);
                }
                sessionStorage.setItem("header_contractImg", JSON.stringify(imgs));
            }
            $(".time").text(data.updatetime);
        }


    });
}


// setTimeout(() => {
//     if (headerName) {
//         $(".headerName").val(headerName);
//     }
//     if (taxesCode) {
//         $(".taxesCode").val(taxesCode);
//     }
//     if (headerName) {
//         $(".email").val(email);
//     }
//     if (comAddress) {
//         $(".addressStr").text(comAddress);
//     }

// }, 200);

// 跳转上传合同图片页面
$(".contractBox").click(() => {
    var headerName = $(".headerName").val();
    var taxesCode = $(".taxesCode").val();
    var email = $(".email").val();
    var address = $(".addressStr").text();
    sessionStorage.setItem("comAddress", address);
    sessionStorage.setItem("headerName", headerName);
    sessionStorage.setItem("taxesCode", taxesCode);
    sessionStorage.setItem("email", email);

    location.href = "./header_contract.html";
});

// 公司地址
$(".address").click(() => {
    sessionStorage.setItem("type", "header_address")
    var headerName = $(".headerName").val();
    var taxesCode = $(".taxesCode").val();
    var email = $(".email").val();
    var address = $(".addressStr").text();
    sessionStorage.setItem("comAddress", address);
    sessionStorage.setItem("headerName", headerName);
    sessionStorage.setItem("taxesCode", taxesCode);
    sessionStorage.setItem("email", email);
    location.href = "../textPage.html";
});

// 返回
$(".back").click(() => {
    history.back();
    sessionStorage.removeItem("header_contractImg");
    sessionStorage.removeItem("comAddress");
    sessionStorage.removeItem("hasHeaderContractImg");
    sessionStorage.removeItem("headerName");
    sessionStorage.removeItem("taxesCode");
    sessionStorage.removeItem("email");
});

// // 默认抬头的单选框
// var flag = false;
// $(".radioImg").click(() => {
//     flag = !flag;
//     if (flag) {
//         $(".radioImg").attr("src", "../../img/radio_select.png");
//     } else {
//         $(".radioImg").attr("src", "../../img/radio_none.png");
//     }
// });



// 编辑修改保存
$(".save").click(() => {
    // 发票抬头
    var headerName = $(".headerName").val();
    // 纳税识别号
    var taxesCode = $(".taxesCode").val();
    // 邮箱
    var email = $(".email").val();
    // 业务合同
    var contract = $(".uploadTips").text();
    // 邮寄地址
    var addressValue = $(".addressStr").text();
    console.log(addressValue)

    var img = sessionStorage.getItem("header_contractImg");
    img = JSON.parse(img);

    if (contract == "已上传") {
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
        console.log(headerName)
        console.log(taxesCode)
        console.log(email)
        console.log(addressValue)
        var task = plus.uploader.createUpload(urlDns + "/control_app/yz/tt/edit", { method: "POST" },
            function(t, status) { //上传完成
                var responseText = JSON.parse(t.responseText);
                if (status == 200) {
                    if (responseText.result == 0) {
                        // 需要重新登录
                        if (window.plus) {
                            goToLogin("../register/login.html");
                        } else {
                            document.addEventListener('plusready', goToLogin, false);
                        }
                    } else {

                        // console.log(t)
                        // wt.close(); //关闭等待提示按钮
                        console.log("上传成功：" + responseText.result + "," + responseText.message);
                        sessionStorage.removeItem("header_contractImg");
                        sessionStorage.removeItem("comAddress");
                        sessionStorage.removeItem("hasHeaderContractImg");
                        sessionStorage.removeItem("headerName");
                        sessionStorage.removeItem("taxesCode");
                        sessionStorage.removeItem("email");
                        layer.close(index);
                        $(".success").css("display", "block");
                        setTimeout(() => {
                            $(".success").css("display", "none");
                            history.back();
                        }, 1000);
                    }

                } else {
                    alert("保存失败：" + responseText.message);
                    // wt.close(); //关闭等待提示按钮
                }
            }
        );
        //添加其他参数
        task.addData("id", headerId);
        task.addData("name", headerName);
        task.addData("nscode", taxesCode);
        task.addData("email", email);
        task.addData("address", addressValue);
        task.addData("pass_app", pass_app);
        task.addData("tel_app", tel_app);
        task.addData("code_app", code_app);

        // 业务合同图片
        for (var i = 0; i < img.length; i++) {
            console.log(img[i]);
            task.addFile(img[i], { key: "files" + i });
        }

        task.start();
    } else {
        // 没上传合同图片，弹出确认框
        $(".black3").css("display", "block");

    }
});

$(".open").click(() => {
    // 发票抬头
    var headerName = $(".headerName").val();
    // 纳税识别号
    var taxesCode = $(".taxesCode").val();
    // 邮箱
    var email = $(".email").val();
    // 业务合同
    var contract = $(".uploadTips").text();
    // 邮寄地址
    var addressValue = $(".addressStr").text();
    console.log(addressValue)


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
    console.log(headerName)
    console.log(taxesCode)
    console.log(email)
    console.log(addressValue)

    var task = plus.uploader.createUpload(urlDns + "/control_app/yz/tt/edit", { method: "POST" },
        function(t, status) { //上传完成
            if (status == 200) {
                if (data.result == 0) {
                    // 需要重新登录
                    if (window.plus) {
                        goToLogin("../register/login.html");
                    } else {
                        document.addEventListener('plusready', goToLogin, false);
                    }
                } else {
                    var responseText = JSON.parse(t.responseText).status;
                    // console.log(t)
                    // wt.close(); //关闭等待提示按钮
                    if (responseText == 1) {
                        console.log("上传成功：" + responseText.status + "," + responseText.message);
                        sessionStorage.removeItem("header_contractImg");
                        sessionStorage.removeItem("comAddress");
                        sessionStorage.removeItem("hasHeaderContractImg");
                        sessionStorage.removeItem("headerName");
                        sessionStorage.removeItem("taxesCode");
                        sessionStorage.removeItem("email");
                        layer.close(index);
                        $(".success").css("display", "block");
                        setTimeout(() => {
                            $(".success").css("display", "none");
                            history.back();
                        }, 1000);
                    }
                }

            } else {
                alert("添加失败：" + status);
                // wt.close(); //关闭等待提示按钮
            }
        }
    );
    //添加其他参数
    task.addData("id", headerId);
    task.addData("name", headerName);
    task.addData("nscode", taxesCode);
    task.addData("email", email);
    task.addData("address", addressValue);
    task.addData("tel_app", tel_app);
    task.addData("pass_app", pass_app);
    task.addData("code_app", code_app);


    task.start();
});

$(".close").click(() => {
    $(".black3").css("display", "none");
});

// 删除
$(".del").click(() => {
    console.log(111)
    console.log(headerId)
    $.post(urlDns + "/control_app/yz/tt/del", {
        id: headerId,
        pass_app: pass_app,
        tel_app: tel_app,
        code_app: code_app
    }, function(data) {
        if (data.result == 0) {
            // 需要重新登录
            if (window.plus) {
                goToLogin("../register/login.html");
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

    });
});