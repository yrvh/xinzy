var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

// 返回
$(".back").click(() => {
    history.back();
});

// 获取数据ID
var taxesDetailId = sessionStorage.getItem("taxesDetailId");
console.log(taxesDetailId);


// 请求数据
$.post(urlDns + "/control/hhr/ns/showUI", {
    pass_app: pass_app,
    tel_app: tel_app,
    code_app: code_app,
    // yzid(业者ID)
    yzid: taxesDetailId
}, function (data) {
    console.log(JSON.stringify(data))
    if (data.result == 0) {
        // 需要重新登录
        if (window.plus) {
            goToLogin("../../register/login.html");
        } else {
            document.addEventListener('plusready', goToLogin, false);
        }
    } else {
        var htmlStr = "";
        for (var i = 0; i < data.rows.length; i++) {
            htmlStr += `
                <div class="itemBox">
                    <div class="item">
                        <span>2019-07-28 13:11</span>
                        <div>
                            <span class="amount">300.00</span>
                            <img class="nextImg" src="../../../img/next.png" alt="">
                        </div>
                    </div>
                    <div class="itemOpen">
                        <table>
                            <tr>
                                <td>应纳税种</td>
                                <td>纳税金额</td>
                            </tr>
                            <tr>
                                <td>增值税</td>
                                <td>200.00</td>
                            </tr>
                            <tr>
                                <td>个人所得税</td>
                                <td>50.00</td>
                            </tr>
                            <tr>
                                <td>个人所得税</td>
                                <td>50.00</td>
                            </tr>
                            <tr>
                                <td>教育费附加</td>
                                <td>1000.00</td>
                            </tr>
                        </table>
                    </div>
                </div>
            `;
        }
        $(".companyBox").html(htmlStr);
    }
});