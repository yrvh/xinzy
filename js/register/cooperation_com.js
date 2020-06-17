mui.init({
    swipeBack: true //启用右滑关闭功能
});

// 返回
$(".back").click(() => {
    // alert(111)
    // history.back();
    location.href = "./chooseIdentity.html";
});

$(".searchIn>input").val("");
// 清空搜索框
$(".toEmpty").click(() => {
    $(".searchIn>input").val("");
});


var index = layer.load(1, {
    // 数组中第一个参数是button的透明度
    // 第二个是背景颜色
    shade: [0.3, "white"]
});
var name = $("#name").val();
// console.log(name);
// 接受服务单位
var ajaxPost = $.ajax({
    url: urlDns + "/user_app/hhr/comlist",
    type: 'post',
    dataType: "json",
    data: {

    },
    timeout: 120000, //2分钟超时
    //请求成功
    success: function(data) {
        console.log(JSON.stringify(data));
        layer.close(index);
        var companyInfo = data.rows;
        var htmlStr = "";
        if (companyInfo.length != 0) {
            for (var i = 0; i < companyInfo.length; i++) {
                htmlStr += `
                <div class="item" id="${companyInfo[i].id}">
                    <div>
                        <img class="comImg" src="${companyInfo[i].icon}" alt="">
                        <span>${companyInfo[i].name}</span>
                    </div>
                    <img class="comInfo" src="../../img/next.png" alt="">
                </div>
                `;
            }
            $(".companyBox").html(htmlStr);

        } else {
            $(".companyBox").html("");
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


//扩展API完成后执行的操作
function plusReady() {
    // 点击接受服务单位
    // .on后面加进来的元素不起作用，要用事件代理来解决
    $(document).on("click", ".companyBox .item", function(e) {
        // alert(1111)
        // console.log(111)
        // console.log($(this).attr("id"));

        // 选中单位的ID
        var comids = $(this).attr("id");
        sessionStorage.setItem('comids', comids);
        location.href = "./cooperation_contract_accept.html";
    });
}


// //弹出系统按钮选择框
// var page = null;
// page = {
//     chooseType: function() {
//         var m = this;
//         /* console.log(m);*/
//         plus.nativeUI.actionSheet({
//             cancel: "取消",
//             title: "请选择签订协议方式",
//             buttons: [
//                 { title: "线上协议文本" },
//                 { title: "上传协议图片" }
//             ]
//         }, function(e) { //1 是拍照  2 从相册中选择 
//             switch (e.index) {
//                 case 1:
//                     onLine();
//                     break;
//                 case 2:
//                     upLoadPhoto();
//                     break;
//             }
//         });
//     }
// }

// function onLine() {
//     location.href = "./onLineContract_acceptCom.html";
//     // mui.openWindow({
//     //     url: "./onLineContract.html",
//     //     id: "onLineContract",
//     // });
// }

// function upLoadPhoto() {
//     location.href = "./upLoadContract.html";
// }

//扩展API是否准备好，如果没有准备好则监听plusReady 
if (window.plus) {
    plusReady();
} else {
    document.addEventListener("plusready", plusReady, false);
}