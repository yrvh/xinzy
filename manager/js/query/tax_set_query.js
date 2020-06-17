var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

// 返回
$(".back").click(() => {
    history.back();
});

$.post(urlDns + "/share/bs_app/nssetting/list", {
    // yztype   8-全部，0-有单位，1-无单位
    yztype: "8",
    tel_app: tel_app,
    pass_app: pass_app,
    code_app: code_app,
    // 搜索内容
    name: "",
    // 页数
    page: "",
    // 页数大小
    rows: ""
}, function (data) {
    console.log(JSON.stringify(data))
    var htmlStr = "";
    for (var i = 0; i < data.rows.length; i++) {
        htmlStr += `
        <div class="item">
            <section class="toDetail" user_id="${data.rows[i].id}" user_name="${data.rows[i].name}">
                <div class="comInfoBox">
                    <div id="">${data.rows[i].name}</div>
                </div>
                <span class="tel">${data.rows[i].tel}</span>
                <img class="comInfo" src="../../../img/next.png" alt="">
            </section>

        </div>
        `;
    }
    $(".companyBox").html(htmlStr);
})

// 跳转详情页面
$(document).on("click", ".companyBox .toDetail", function(e) {
    var user_id = $(this).attr("user_id");
    var user_name = $(this).attr("user_name");
    console.log(user_id)
        // 存储员工的ID
    sessionStorage.setItem('user_id', user_id);
    sessionStorage.setItem('user_name', user_name);
    // page.chooseType();
    location.href = "./tax_set_detail.html";
});
