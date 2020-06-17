mui.init();

// 获取接受服务单位的id
var comid = sessionStorage.getItem("comids");
var realname = sessionStorage.getItem("realname");
console.log(comid)
$(".cont").css('margin-top', '64px');
var yz_sf_xieyiID;

// 加载提示
var index = layer.load(1, {
    // 数组中第一个参数是button的透明度
    // 第二个是背景颜色
    shade: [0.3, "white"]
});
// 请求协议文本
var ajaxPost = $.ajax({
    url: urlDns + "/user_app/yz/showXY",
    type: 'post',
    dataType: "json",
    data: {
        comid: comid
    },
    timeout: 120000, //2分钟超时
    //请求成功
    success: function(data) {
        console.log(JSON.stringify(data));
        layer.close(index);
        // alert(111)
        // console.log(realname)
        // console.log(comid)
        // console.log(data.xieyi);
        // console.log(JSON.stringify(data))
        // $(".first span").text(realname);
        // $(".first span").attr("yz_sf_xieyiID", data.moldelid);
        yz_sf_xieyiID = data.moldelid;
        $(".second span").text(data.comname);
        $(".cont").html(data.xieyi);

        // 当协议内容不超过一页时，直接允许同意
        if ($(document.body).height() < $(window).height() - 155) {
            // 减掉的290是除了$(".cont")以外其他元素的高度
            $(".cont").css("height", "calc(100vh - 135px)");
            $(".cont").css("margin-bottom", "0");
            $(".agree").css({ "background-color": "#7EB6FF", }).on("click", function() {
                sessionStorage.setItem("yz_sf_xieyiID", yz_sf_xieyiID);
                location.href = "./onLineContract.html";

            });
        }
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        layer.close(index);
        if (textStatus == 'timeout') {
            ajaxPost.abort();
            alert("请求超时");
        }
        if (textStatus == 'error') {
            ajaxPost.abort();
            alert("请求错误" + errorThrown);
        }
    }
});




$(".back").click(() => {
    // history.back();
    location.href = "./acceptCom.html";
});

// 监听当用户滑动到底部才允许同意协议
$(window).scroll(() => {
    // 加1是因为有些手机的$(this).scrollTop()有零点几的偏差
    if ($(window).scrollTop() + $(window).height() + 1 >= $(document).height()) {
        $(".agree").css({ "background-color": "#7EB6FF", }).on("click", function() {
            // hasContractImg 判断是否要向服务器提交协议图片
            sessionStorage.setItem("hasContractImg", 0);
            sessionStorage.setItem("yz_sf_xieyiID", yz_sf_xieyiID);
            location.href = "./onLineContract.html";
        });

    }
});
// console.log($(document.body).height())
// console.log($(window).height())



// 拒绝按钮
$(".refuse").click(() => {
    history.back();
});