var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
console.log("tel_app：" + tel_app);
console.log("pass_app：" + pass_app);

// 在实际使用过程中发现,app刚打开时显示的是"设置"界面而不是"首页"
// 原因在于我们通过getWebviewById时,首页并没有加载出来,所以通过方法拿到的是个空
// 因此我们这里需要做一个回调
// 在首页加载完毕之后通知index界面,将首页显示在最前端
function plusRd() {
    //拿到index界面,这里index是启动页,所以用getLaunchWebview方法
    var indexWV = plus.webview.getLaunchWebview();
    mui.fire(indexWV, 'homeReady');
}
if (window.plus) {
    plusRd()
} else {
    document.addEventListener('plusready', plusRd, false);
}


var ishave_dw = sessionStorage.getItem("ishave_dw");
console.log(ishave_dw);
$(".income").click(() => {
    $.get(urlDns + "/control_app/yz/zf/index", {
        pass_app: pass_app,
        tel_app: tel_app,
        code_app: code_app
    }, function(data) {
    	console.log(JSON.stringify(data))
        if (data.result == 0) {
            // 需要重新登录
            if (window.plus) {
                goToLogin("../register/login.html");
            } else {
                document.addEventListener('plusready', goToLogin, false);
            }
        } else {
            // console.log(JSON.stringify(data));
            if (data.ishave_dw == 0) {
                // 没有单位的业者
                mui.openWindow('../income/income.html');
            }
            if (data.ishave_dw == 1) {
                mui.openWindow('../income/income_acceptCom/income_a.html');
            }
        }

    });

});

$(".invoice").click(() => {
    mui.openWindow('../invoice/invoice.html');
});

$(".taxes").click(() => {
    mui.openWindow('../taxes/taxes.html');
});