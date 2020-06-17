var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

var status_CK = sessionStorage.getItem("status_CK");

// 返回
$(".back").click(() => {
    history.back();
});



// 请求数据
$.post(urlDns + "/control_app/hhr/fp/list", {
    // 状态
    status: status_CK,
    // 第几页
    page: 1,
    // 一页的条数
    rows: 20,
    // 搜索框的内容
    // name: "",
    // 过滤条件的开始时间和结束时间
    startdate: "",
    enddate: "",
    // 过滤条件的业者ID
    yzid: "",
    pass_app: pass_app,
    tel_app: tel_app,
    code_app: code_app
}, function(data) {
    console.log(JSON.stringify(data));
    if (data.result == 0) {
        // 需要重新登录
        if (window.plus) {
            goToLogin("../../register/login.html");
        } else {
            document.addEventListener('plusready', goToLogin, false);
        }
    } else {
        // 未开票余额、总金额
        $(".del .num").text(data.wk_allmoney);
        $(".submit .num").text(data.allmoney);

        var htmlStr = "";
        for (var i = 0; i < data.rows.length; i++) {
            htmlStr += `
                <div>
                    <input class="select" name="hh" value="beihai" type="checkbox">
                    <div class="comTime">
                        <span class="comName">${data.rows[i].realname}</span>
                        <div class="href" detailId="${data.rows[i].id}">
                            <span class="time">${data.rows[i].adddate}</span>
                            <img src="../../img/next.png" alt="">
                        </div>
                    </div>
                    <div class="amount">
                        <span>${data.rows[i].title}</span>
                        <span>${data.rows[i].money}</span>
                    </div>
                </div>
            `;
        }
        $(".list").html(htmlStr);
    }

});


// 跳转详情页面
$(document).on("click", ".list .href", function(e) {
    var detailId = $(this).attr("detailId");
    console.log(detailId)
    sessionStorage.setItem('incomeDetailId', detailId);
    // page.chooseType();
    location.href = "./check_invoice_detail.html";
});