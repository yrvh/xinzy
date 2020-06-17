var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

// 返回
$(".back").click(() => {
    history.back();
});


// 请求数据
$.post(urlDns + "/control/hhr/ns/index", {
    pass_app: pass_app,
    tel_app: tel_app,
    code_app: code_app,
    // 开始时间
    startdate:"",
    // 结束时间
    enddate:"",
    // yzid(业者ID)
    yzid:""
}, function(data) {
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

                <div class="item" detailId="${data.rows[i].userid}">
                    <input class="select" name="hh" value="beihai" type="checkbox">
                    <section class="toDetail">
                        <div class="comInfoBox">
                            <div id="">${data.rows[i].username}</div>
                        </div>
                        <span class="tel">${data.rows[i].adddate}</span>
                        <img class="comInfo" src="../../../img/next.png" alt="">
                    </section>

                </div>
            `;
        }
        $(".companyBox").html(htmlStr);
    }
});


// 跳转详情页面
$(document).on("click", ".companyBox .item", function(e) {
    var detailId = $(this).attr("detailId");
    console.log(detailId)
    sessionStorage.setItem('taxesDetailId', detailId);
    // page.chooseType();
    location.href = "./check_taxes_detail.html";
});
