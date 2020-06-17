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

var contractImg = sessionStorage.getItem("header_contractImg");
// console.log(contractImg);
var header_contractImg = JSON.parse(contractImg);
console.log(header_contractImg);
var hasHeaderContractImg = sessionStorage.getItem("hasHeaderContractImg");
console.log(hasHeaderContractImg);
var comAddress = sessionStorage.getItem("comAddress");
console.log(comAddress)


var headerName = sessionStorage.getItem("headerName", headerName);
var taxesCode = sessionStorage.getItem("taxesCode", taxesCode);
var email = sessionStorage.getItem("email", email);
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
}
if (hasHeaderContractImg == 1) {
    $(".uploadTips").text("已上传");

} else {
    $(".uploadTips").text("未上传");
}

// var type = sessionStorage.getItem("type");
// console.log(type)
// if (type == 0) {
//     $(".title").text("新增发票抬头");
//     $(".setDefalt div").css("border", "none");
//     $(".del").css("display", "none");
//     $(".save").css("display", "none");
//     $(".onlySave").css("display", "block");

// }
// if (type == 1) {
//     $(".title").text("发票抬头");
//     $(".updateTime").css("display", "block");
//     $(".del").css("display", "block");
//     $(".save").css("display", "block");
//     $(".onlySave").css("display", "none");

// }

$(".contractBox").click(() => {
    var headerName = $(".headerName").val();
    var taxesCode = $(".taxesCode").val();
    var email = $(".email").val();
    sessionStorage.setItem("headerName", headerName);
    sessionStorage.setItem("taxesCode", taxesCode);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("ishaveyw", 0);
    location.href = "./header_contract.html";
});

// 公司地址
$(".address").click(() => {
    var headerName = $(".headerName").val();
    var taxesCode = $(".taxesCode").val();
    var email = $(".email").val();
    sessionStorage.setItem("headerName", headerName);
    sessionStorage.setItem("taxesCode", taxesCode);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("type", "address")
    location.href = "../textPage.html";
});

// 返回
$(".back").click(() => {
    history.back();
    sessionStorage.removeItem("header_contractImg");
    sessionStorage.removeItem("comAddress");
    sessionStorage.removeItem("headerName");
    sessionStorage.removeItem("taxesCode");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("hasHeaderContractImg");
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

// 新增保存
$(".onlySave").click(() => {
    // 发票抬头
    var headerName = $(".comName").val();
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
        var task = plus.uploader.createUpload(urlDns + "/control_app/yz/tt/add", { method: "POST" },
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
                        sessionStorage.removeItem("headerName");
                        sessionStorage.removeItem("taxesCode");
                        sessionStorage.removeItem("email");
                        sessionStorage.removeItem("hasHeaderContractImg");

                        layer.close(index);
                        $(".success").css("display", "block");
                        setTimeout(() => {
                            $(".success").css("display", "none");
                            history.back();
                        }, 1000);
                    }

                } else {
                    alert("添加失败：" + responseText.message);
                    // wt.close(); //关闭等待提示按钮
                }
            }
        );
        //添加其他参数
        task.addData("name", headerName);
        task.addData("nscode", taxesCode);
        task.addData("email", email);
        task.addData("address", addressValue);
        task.addData("pass_app", pass_app);
        task.addData("tel_app", tel_app);
        task.addData("code_app", code_app);

        // 业务合同图片
        for (var i = 0; i < img.length; i++) {
            console.log(img[i])
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
    var headerName = $(".comName").val();
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
    var task = plus.uploader.createUpload(urlDns + "/control_app/yz/tt/add", { method: "POST" },
        function(t, status) { //上传完成
            // console.log(JSON.stringify(t))
            // console.log(JSON.stringify(status))
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
                    // if (responseText == 1) {
                    console.log("上传成功：" + responseText.status + "," + responseText.message);
                    sessionStorage.removeItem("header_contractImg");
                    sessionStorage.removeItem("comAddress");
                    sessionStorage.removeItem("headerName");
                    sessionStorage.removeItem("taxesCode");
                    sessionStorage.removeItem("email");
                    layer.close(index);
                    $(".success").css("display", "block");
                    setTimeout(() => {
                        $(".success").css("display", "none");
                        history.back();
                    }, 800);

                    // }
                }

            } else {
                alert("添加失败：" + status);
                // wt.close(); //关闭等待提示按钮
            }
        }
    );
    //添加其他参数
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