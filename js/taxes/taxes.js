mui.init();


var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");
// console.log("tel_app：" + tel_app);
// console.log("pass_app：" + pass_app);


$(".back").click(() => {
    mui.back();
});

var page = 1;

// 点击展开详情列表
$(document).on("click", ".contBox .item", function(e) {
    // console.log($(e.target).siblings(".itemOpen"));
    if ($(this).siblings(".itemOpen").hasClass("block")) {
        $(this).find(".nextImg").attr("src", "../../img/next.png");
        $(this).removeClass("changeImg");
        $(".block").removeClass("block");
    } else {
        $(".changeImg").find(".nextImg").attr("src", "../../img/next.png");
        $(".changeImg").removeClass("changeImg");
        $(".block").removeClass("block");
        $(this).addClass("changeImg");
        $(this).find(".nextImg").attr("src", "../../img/down.png");
        $(this).siblings(".itemOpen").addClass("block");
    }

});

$.post(urlDns + "/control_app/yz/ns/list", {
    page: 1,
    rows: 20,
    pass_app: pass_app,
    tel_app: tel_app,
    code_app: code_app
}, (data) => {
    console.log(JSON.stringify(data));
    if (data.result == 0) {
        // 需要重新登录
        if (window.plus) {
            goToLogin("../register/login.html");
        } else {
            document.addEventListener('plusready', goToLogin, false);
        }
    } else {
        var rows = data.rows;
        $(".total").text(data.allmoney);
        var htmlStr = "";
        for (var i = 0; i < rows.length; i++) {
            // for(var j = 0;j<rows[i].types.length)
            htmlStr += `
            <div class="itemBox">
                <div class="item">
                    <span>${rows[i].bsdate}</span>
                    <div>
                        <span class="amount">${rows[i].money}</span>
                        <img class="nextImg" src="../../img/next.png" alt="">
                    </div>
                </div>
                <div class="itemOpen">
                    <table>
                    `;
            for (var j = 0; j < rows[i].types.length; j++) {
                htmlStr += `
            <tr>
                <td>${rows[i].types[j].nsname}</td>
                <td>${rows[i].types[j].nsmoney}</td>
            </tr>
            `;
            }
            htmlStr += `
                    </table >
                </div >
            </div >
        `;
        }
        $(".contBox").html(htmlStr);
    }

});


// 加载下一页
$(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
        page = page + 1;
        console.log(page)

        $.post(urlDns + "/control_app/yz/ns/list", {
            page: page,
            rows: 20,
            pass_app: pass_app,
            tel_app: tel_app,
            code_app: code_app
        }, (data) => {
            console.log(JSON.stringify(data));
            if (data.result == 0) {
                // 需要重新登录
                if (window.plus) {
                    goToLogin("../register/login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            } else {
                var rows = data.rows;
                $(".total").text(data.allmoney);
                if (rows > 0) {
                    var htmlStr = "";
                    for (var i = 0; i < rows.length; i++) {
                        // for(var j = 0;j<rows[i].types.length)
                        htmlStr += `
                        <div class="itemBox">
                            <div class="item">
                                <span>${rows[i].bsdate}</span>
                                <div>
                                    <span class="amount">${rows[i].money}</span>
                                    <img class="nextImg" src="../../img/next.png" alt="">
                                </div>
                            </div>
                            <div class="itemOpen">
                                <table>
                         `;
                        for (var j = 0; j < rows[i].types.length; j++) {
                            htmlStr += `
                            <tr>
                                <td>${rows[i].types[j].nsname}</td>
                                <td>${rows[i].types[j].nsmoney}</td>
                            </tr>
                        `;
                        }
                        htmlStr += `
                                </table >
                            </div >
                        </div >
                    `;
                    }
                    $(".contBox").append(htmlStr);
                }
            }


        });
    }
});