mui.init();
// 返回
$(".back").click(() => {
    // alert(111)
    // history.back();
    location.href = "./cooperation_contract_accept.html";
});

// 获取接受服务单位的id
var comid = sessionStorage.getItem("comids");
console.log(comid);


// 协议ID，分配比例
var yz_ms_id, yz_ms_fpbili;

// 委托协议下载地址
var contractAddress;



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
        console.log(data.hhr_ms_fpbili2)
        console.log(data.xieyi_wt);

        yz_ms_id = data.yz_ms_id;
        yz_ms_fpbili = data.yz_ms_fpbili;
        contractAddress = data.xieyi_wt;
        $("#serviceFee").val(data.yz_ms_fpbili);
        $(".cont").html(data.yz_ms_text);

        // 当协议内容不超过一页时，直接允许同意
        if ($(document.body).height() < $(window).height() - 155) {
            // 减掉的290是除了$(".cont")以外其他元素的高度
            $(".cont").css("height", "calc(100vh - 135px)");
            $(".cont").css("margin-bottom", "0");
            $(".agree").css({ "background-color": "#7EB6FF", }).on("click", function() {
                // 储存分配比例
                sessionStorage.setItem("yz_ms_fpbili", yz_ms_fpbili);
                // yz_ms_id 合作伙伴（作为业者）与商秘公司的协议id
                sessionStorage.setItem("yz_ms_id", yz_ms_id);
                // 弹出下载询问框
                $(".black").css("display", "block");
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
            sessionStorage.setItem("yz_ms_fpbili", yz_ms_fpbili);
            // yz_ms_id 合作伙伴（作为业者）与商秘公司的协议id
            sessionStorage.setItem("yz_ms_id", yz_ms_id);
            // 弹出下载询问框
            $(".black").css("display", "block");
        });

    }
});

// 确认下载
$(".downLoad").click(() => {
    // alert(1)
    dowload(contractAddress);

});

var dtask = null;
// 下载的文件名
var fileName = "";
//下载文件
function dowload(url) {
    var options = { method: "GET" };
    dtask = plus.downloader.createDownload(url, options);
    dtask.addEventListener("statechanged", function(task, status) {
        $(".black").css("display", "none");
        $(".black2").css("display", "block");

        switch (task.state) {
            case 1: // 开始
                console.log("开始下载...");
                break;
            case 2: // 已连接到服务器
                console.log("链接到服务器...");
                break;
            case 3: // 已接收到数据
                // 进度
                var a = Math.floor(task.downloadedSize / task.totalSize * 100)
                console.log(a)
                $('#jqmeter-container').jQMeter({
                    // 总进度
                    goal: '$1,00',
                    // 已完成的进度
                    raised: "$" + a,
                    // 进度条方向
                    orientation: 'horizontal',
                    // 进度条宽高
                    width: '270px',
                    height: '20px',
                    // 背景颜色
                    bgColor: "#cccccc",
                    // 进度条颜色
                    barColor: "#7EB6FF"
                });
                // if (a == 100) {
                //     $('.black2').css("display", "none");
                //     $(".black3").css("display", "block");
                // }
                break;
            case 4: // 下载完成
                console.log("下载完成！");
                $('.black2').css("display", "none");
                $(".black3").css("display", "block");
                // console.log(task.totalSize)
                plus.io.resolveLocalFileSystemURL(task.filename, function(entry) {
                    console.log(entry.toLocalURL()) //绝对地址                                      
                });
                fileName = task.filename;
                break;
        }

    });
    dtask.start();
}


// 下一步：填写个人信息
$(".close").click(() => {
    var hasContractImg = sessionStorage.getItem('hasContractImg');
    console.log(hasContractImg)
    if (hasContractImg) {
        if (hasContractImg == 1) {
            sessionStorage.setItem("hasContractImg", 1);
        } else {
            sessionStorage.setItem("hasContractImg", 0);
        }
    } else {
        sessionStorage.setItem("hasContractImg", 0);
    }

    location.href = "./free_coopera.html";
});

// 打开文件
$(".open").click(() => {
    plus.runtime.openFile(fileName, {}, function(e) { //调用第三方应用打开文件
        alert('打开失败');
    });
    location.href = "./free_coopera.html";
});

// 取消下载
$(".cancel").click(() => {
    $(".black").css("display", "none");
});

// 拒绝按钮
$(".refuse").click(() => {
    history.back();
});