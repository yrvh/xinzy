mui.init();
// 返回
$(".back").click(() => {
    // alert(111)
    // history.back();
    location.href = "./cooperation_com.html";
});

// 获取接受服务单位的id
var comid = sessionStorage.getItem("comids");
console.log(comid);

// 协议ID，两个分配比例
// var hhr_ms_id, hhr_ms_fpbili, hhr_ms_fpbili2;

// 加载提示
var index = layer.load(1, {
    // 数组中第一个参数是button的透明度
    // 第二个是背景颜色
    shade: [0.3, "white"]
});

// 加载提示
var index = layer.load(1, {
    // 数组中第一个参数是button的透明度
    // 第二个是背景颜色
    shade: [0.3, "white"]
});
// 请求协议文本
var ajaxPost = $.ajax({
    url: urlDns + "/user_app/hhr/showXY",
    type: 'post',
    dataType: "json",
    data: {
        comid: comid
    },
    timeout: 120000, //2分钟超时
    //请求成功
    success: function(data) {
        layer.close(index);
        console.log(JSON.stringify(data))
            // console.log(data.hhr_ms_fpbili2)
            // console.log(data.hhr_ms_fpbili);

        hhr_ms_id = data.hhr_ms_id;
        // hhr_ms_fpbili = data.hhr_ms_fpbili;
        // hhr_ms_fpbili2 = data.hhr_ms_fpbili2;
        // $("#serviceFee").val(data.hhr_ms_fpbili);
        // $("#serviceFee_exceed").val(data.hhr_ms_fpbili2);
        $(".cont").html(data.hhr_ms_text);

        // 当协议内容不超过一页时，直接允许同意
        if ($(document.body).height() < $(window).height() - 155) {
            // 减掉的290是除了$(".cont")以外其他元素的高度
            $(".cont").css("height", "calc(100vh - 135px)");
            $(".cont").css("margin-bottom", "0");
            $(".agree").css({ "background-color": "#7EB6FF", }).on("click", function() {
                // 储存分配比例
                sessionStorage.setItem("hhr_ms_fpbili", hhr_ms_fpbili);
                sessionStorage.setItem("hhr_ms_fpbili2", hhr_ms_fpbili2);
                // hhr_ms_id 合作伙伴与商秘公司的协议id
                sessionStorage.setItem("hhr_ms_id", hhr_ms_id);
                location.href = "./cooperation_contract_com.html";

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

// 监听当用户滑动到底部才允许同意协议
$(window).scroll(() => {
    // 加1是因为有些手机的$(this).scrollTop()有零点几的偏差
    if ($(window).scrollTop() + $(window).height() + 1 >= $(document).height()) {
        $(".agree").css({ "background-color": "#7EB6FF", }).on("click", function() {
            // 储存分配比例
            // sessionStorage.setItem("hhr_ms_fpbili", hhr_ms_fpbili);
            // sessionStorage.setItem("hhr_ms_fpbili2", hhr_ms_fpbili2);
            // hhr_ms_id 合作伙伴与商秘公司的协议id
            sessionStorage.setItem("hhr_ms_id", hhr_ms_id);
            location.href = "./cooperation_contract_com.html";
        });

    }
});

// 拒绝按钮
$(".refuse").click(() => {
    history.back();
});