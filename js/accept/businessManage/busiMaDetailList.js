mui.init();

$(".back").click(() => {
    history.back();
});

// 批量选择
var choose = false;
$(".next").click(() => {
    choose = !choose;
    if (choose) {
        $(".checkBox").css("display", "block");
        $("footer").css("display", "block");
        $(".realname").css("left", "22px");
        $(".next").text("取消选择");
    } else {
        $(".checkBox").css("display", "none");
        $("footer").css("display", "none");
        $(".realname").css("left", "0");
        $(".next").text("选择");
    }

});