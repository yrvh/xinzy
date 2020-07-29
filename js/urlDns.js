// 老叶电脑
// var urlDns = "https://192.168.2.23"; 

// 本地服务器
// var urlDns = "https://192.168.2.9";

// 阿里云服务器                                              
// var urlDns = "https://jolongnet.cn";

// 腾讯云
var urlDns = "https://111.230.225.181";


// 输入框精确到小数点后两位的控制函数
function clearNoNum(obj) {
    obj.value = obj.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符   
    obj.value = obj.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
    obj.value = obj.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数   
    if (obj.value.indexOf(".") < 0 && obj.value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
        obj.value = parseFloat(obj.value);
    }
}

// 向服务器发送请求是判断是否在登录状态的方法，如果没登录，
// 跳转登录页面
function goToLogin(address) {
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
    plus.webview.open(address);
    curr.close();
}

// if (window.plus) {
//     document.addEventListener('plusready', goToLogin, true);
// } else {
//     document.addEventListener('plusready', goToLogin, false);
// }
// $.ajaxSetup({
//     crossDomain: true
// });

//=============格式化金钱===================
function formatMoney(number, places, symbol, thousand, decimal) {
				number = number || 0;
				places = !isNaN(places = Math.abs(places)) ? places : 2;
				symbol = symbol !== undefined ? symbol : "$";
				thousand = thousand || ",";
				decimal = decimal || ".";
				var negative = number < 0 ? "-" : "",
					i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
					j = (j = i.length) > 3 ? j % 3 : 0;
				return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
			}

// console.log(formatMoney(54321)) // $54,321