mui.init();
var contractImg = sessionStorage.getItem("contractImg");
console.log(contractImg);
// var contractImgArr = JSON.parse(contractImg);
// for (var i = 0; i < contractImgArr.length; i++) {
//     console.log(contractImgArr[i]);
// }
// editServiceFee 修改分配比例的标志
var editServiceFee = sessionStorage.getItem("editServiceFee");
console.log(editServiceFee);
// xyId 协议ID
var xyId;


var tel_app = localStorage.getItem("tel_app");
var pass_app = localStorage.getItem("pass_app");
var code_app = localStorage.getItem("code_app");


// 监听当用户滑动到底部才允许同意协议
$(window).scroll(() => {
    // var a = $(window).scrollTop();
    // var b = $(window).height()
    // console.log("1:" + a)
    // console.log("2:" + b)
    // console.log("3:" + $(document).height())
    // console.log($(document).height() - b)

    // 加1是因为有些手机的$(this).scrollTop()有零点几的偏差
    if ($(this).scrollTop() + $(this).height() + 1 >= $(document).height()) {

        $(".agree").css({ "background-color": "#7EB6FF", }).on("click", function() {

            // 存储分配比例
            var serviceFee = $("#serviceFee").val();
            sessionStorage.setItem("serviceFee", serviceFee);

            // 弹出下载询问框
            $(".black").css("display", "block");
            // $.cookie("user", tel);
            // location.href = "../../index.html";
        });

    }
});


if (editServiceFee == 1) {
    console.log("请求协议")
    $(".black4").css("display", "block");
    $(".refuse").css("display", "none");
    $(".agree").css("display", "none");
    $(".submit").css("display", "block");
    $(".back").css("display", "none");
    $(".ok").click(() => {
        $(".black4").css("display", "none");
    });
    $.get(urlDns + "/user_app/yz/bili_editUI", {
        tel_app: tel_app,
        pass_app: pass_app,
        code_app: code_app
    }, function(data) {
        console.log(JSON.stringify(data));
        console.log(data.bili);
        console.log(data.descripts);
        xyId = data.xyId;
        $("#serviceFee").val(data.bili);
        $(".cont").html(data.descripts);
        $(".reason").text(data.reason);
        // 当协议内容不超过一页时，直接允许同意
        if ($(document.body).height() < $(window).height() - 165) {
            // 减掉的124是除了$(".cont")以外其他元素的高度
            $(".cont").css("height", "calc(100vh - 188px)");
        }
    });
    // 修改服务费比例的提交按钮
    $(".submit").click(() => {
        console.log(11111)
        var edit = $("#serviceFee").val();
        $.post(urlDns + "/user_app/yz/bili_edit", {
            xyId: xyId,
            fpbili: edit,
            tel_app: tel_app,
            pass_app: pass_app,
            code_app: code_app
        }, function(data) {
            console.log(JSON.stringify(data));
            // data.status == 1 提交成功
            if (data.result == 1) {
                // 变成服务费待审核的状态
                sessionStorage.setItem("status", 1);
                location.href = "./audit.html";
            } else {
                if (window.plus) {
                    goToLogin("./login.html");
                } else {
                    document.addEventListener('plusready', goToLogin, false);
                }
            }
        });
    });

    // 当协议内容不超过一页时，直接允许同意
    if ($(document.body).height() < $(window).height() - 165) {
        // 减掉的124是除了$(".cont")以外其他元素的高度
        $(".cont").css("height", "calc(100vh - 188px)");
    }
} else {
    // 获取接受服务单位的id
    var comid = sessionStorage.getItem("comids");
    console.log(comid)
        // // console.log(typeof(comid));
        // // 用户名
        // var reUserName = sessionStorage.getItem('reUserName');
        // // 手机号
        // var tel = sessionStorage.getItem('tel');
        // // 密码
        // var password = sessionStorage.getItem('password');
        // // 姓名
        // var realname = sessionStorage.getItem('realname');
        // // 邮箱
        // var email = sessionStorage.getItem('email');
        // // 身份证号
        // var idCardNum = sessionStorage.getItem('idCardNum');
        // // 开户机构
        // var accountBank = sessionStorage.getItem('accountBank');
        // // 开户名
        // var accountName = sessionStorage.getItem('accountName');
        // // 开户账号
        // var account = sessionStorage.getItem('account');
        // 用户注册的角色
    var userType = sessionStorage.getItem('userType');
    // 选择的开票方式
    var type = localStorage.getItem('type');
    // 两张身份证照片
    // var src1 = sessionStorage.getItem('idCardImg1');
    // var src2 = sessionStorage.getItem('idCardImg2');
    var isUpdate = sessionStorage.getItem('isUpdate');
    // 上传的协议图片
    var contractImg = sessionStorage.getItem('contractImg');

    if (contractImg) {
        // 储存在sessionStorage里的是字符串，取出来要序列化
        contractImg = JSON.parse(contractImg);
        // console.log(contractImg[0]);
        // console.log(contractImg[1]);
        // console.log(contractImg.length);
    }

    // 协议模板id

    // 请求协议文本
    // $.ajaxSettings.async = false;
    $.post(urlDns + "/user_app/yz/showXY", { comid: comid }, function(data) {
        // alert(111)
        // console.log(realname)
        // console.log(comid)
        // console.log(data.xieyi);
        console.log(JSON.stringify(data))
            // $(".first span").text(realname);
            // $(".second span").text(data.comname_ms);
            // $(".cont").html(data.xieyi_ms);
            // moldelId = data.moldelid;
            // mid = data.moldelid;
            // console.log(moldelId)

        // 选择单位，到这一步要签和公司的协议
        if (type == 1) {
            // $(".first span").attr("moldelId", data.moldelid);
            console.log("moldelid:" + data.moldelid_ms)
            $(".cont").html(data.xieyi_ms);
            // 储存的是单位的moldelid
            sessionStorage.setItem("yz_ms_xieyiID", data.moldelid_ms);
            // 当协议内容不超过一页时，直接允许同意
            if ($(document.body).height() < $(window).height() - 165) {
                // 减掉的124是除了$(".cont")以外其他元素的高度
                $(".cont").css("height", "calc(100vh - 188px)");
                $(".cont").css("margin-bottom", "0");
                $(".agree").css({ "background-color": "#7EB6FF", }).on("click", function() {
                    // 存储分配比例
                    var serviceFee = $("#serviceFee").val();
                    sessionStorage.setItem("serviceFee", serviceFee);

                    // 弹出下载询问框
                    $(".black").css("display", "block");
                });
            }
        }
        // 选择公司，同意公司的协议
        if (type == 0) {
            // $(".first span").attr("moldelId", data.moldelid_ms);
            console.log("moldelid_ms:" + data.moldelid)
            $(".cont").html(data.xieyi);
            sessionStorage.setItem("yz_sf_xieyiID", 0);
            sessionStorage.setItem("yz_ms_xieyiID", data.moldelid);
            console.log($(document.body).height())
            console.log($(window).height())
                // 当协议内容不超过一页时，直接允许同意
                // setTimeout(() => {
            if ($(document.body).height() < $(window).height() - 155) {
                // 减掉的124是除了$(".cont")以外其他元素的高度
                $(".cont").css("height", "calc(100vh - 188px)");
                $(".cont").css("margin-bottom", "0");
                $(".agree").css({ "background-color": "#7EB6FF", }).on("click", function() {
                    // 存储分配比例
                    var serviceFee = $("#serviceFee").val();
                    sessionStorage.setItem("serviceFee", serviceFee);

                    // 弹出下载询问框
                    $(".black").css("display", "block");
                });

            }
            console.log($(".cont").height())
                // }, 1000);

        }

    });

    $(".back").click(() => {
        // history.back();
        var type = localStorage.getItem('type');
        console.log(type)
        var hasContractImg = sessionStorage.getItem('hasContractImg');
        console.log(hasContractImg)


        if (type == 0) {
            // 无单位业者
            location.href = "./businessCom.html";
        } else {
            // 有单位业者
            if (hasContractImg == 1) {
                // 有协议图片
                location.href = "./upLoadContract.html";
            } else {
                // 没有协议图片
                location.href = "./onLineContract_acceptCom.html";
            }
        }
    });


    // console.log($(document.body).height())
    // console.log($(window).height())

    // 给个setTimeout是因为为了避免页面还没渲染完成就执行了此段代码，
    // 这样会造成$(".cont")的高度为0，页面白色背景就只有下面代码
    // 给$(".cont")设置的高度，不会根据$(".cont")实际内容的
    // 高度来计算
    // setTimeout(() => {
    //     // 当协议内容不超过一页时，直接允许同意
    //     if ($(document.body).height() < $(window).height() - 185) {
    //         // 减掉的124是除了$(".cont")以外其他元素的高度
    //         $(".cont").css("height", "calc(100vh - 188px)");
    //         $(".cont").css("margin-bottom", "0");
    //         $(".agree").css({ "background-color": "#7EB6FF", }).on("click", function() {
    //             // 存储分配比例
    //             var serviceFee = $("#serviceFee").val();
    //             sessionStorage.setItem("serviceFee", serviceFee);

    //             // 弹出下载询问框
    //             $(".black").css("display", "block");
    //         });
    //     }
    // }, 700);



    // 确认下载
    $(".downLoad").click(() => {
        $.post(urlDns + "/user_app/yz/showXY", { comid: comid }, (data) => {
            console.log(data.xieyi_wt);
            dowload(data.xieyi_wt);
        });
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

        location.href = "./freeInfo.html";
    });

    // 打开文件
    $(".open").click(() => {
        plus.runtime.openFile(fileName, {}, function(e) { //调用第三方应用打开文件
            alert('打开失败');
        });
        location.href = "./freeInfo.html";
    });


    // 拒绝按钮
    $(".refuse").click(() => {
        history.back();
    });
    // 取消下载
    $(".cancel").click(() => {
        $(".black").css("display", "none");
    });


    // 解决拒绝和同意按钮被输入键盘顶上去的问题
    var h = $(window).height();
    $(window).resize(function() {
        if ($(window).height() < h) {
            // $('.btnBox').hide();
            $('.btnBox').removeClass("position");
            $(".cont").css("margin-bottom", "20px");
        } else {
            // $('.btnBox').show();
            $('.btnBox').addClass("position");
            $(".cont").css("margin-bottom", "70px");
        }
    });
}