mui.init({
    swipeBack: true //启用右滑关闭功能
});


// 手机号
var tel = sessionStorage.getItem('tel');
// 密码
var password = sessionStorage.getItem('password');
// 姓名
var realname = sessionStorage.getItem('realname');
// 邮箱
var email = sessionStorage.getItem('email');
// 身份证号
var idCardNum = sessionStorage.getItem('idCardNum');
// 开户机构
var accountBank = sessionStorage.getItem('accountBank');
// 开户名
var accountName = sessionStorage.getItem('accountName');
// 开户账号
var account = sessionStorage.getItem('account');
// 用户注册的角色
var userType = sessionStorage.getItem('userType');
// 选择的开票方式
var type = localStorage.getItem('type');
// 两张身份证照片
var src1 = sessionStorage.getItem('idCardImg1');
var src2 = sessionStorage.getItem('idCardImg2');


// 返回
$(".back").click(() => {
    // history.back();
    location.href = "./selectCompany.html";
});


// 页面加载进来，渲染公司列表
getCompanyInfo(0, "");

// 获取公司列表的方法
function getCompanyInfo(type, name) {
    $.post(urlDns + "/user_app/yz/comlist", {
        type: type,
        name: name
    }, function(data) {
        // console.log(111);
        // var data = JSON.stringify(data);
        // console.log(data);
        // console.log(data.rows[0].icon);
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
    });
}


// 清空搜索框
$(".toEmpty").click(() => {
    $(".searchIn>input").val("");
});

// 搜索(目前只有一家商务秘书公司，暂时不给用户进行搜索)
// $(".search").click(() => {
//     // alert(111)
//     var name = $("#name").val();
//     getCompanyInfo(0, name);
// });


var comids;
// 点击接受服务单位
// .on后面加进来的元素不起作用，要用事件代理来解决
$(document).on("click", ".companyBox .item", function(e) {
    var comids = $(this).attr("id");
    sessionStorage.setItem('comids', comids);
    // page.chooseType();
    location.href = "./onLineContract.html";
});

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
//     location.href = "./onLineContract.html";
//     // mui.openWindow({
//     //     url: "./onLineContract.html",
//     //     id: "onLineContract",
//     // });
// }

// function upLoadPhoto() {
//     location.href = "./upLoadContract.html";
// }

// -------------------------------------------------
// --------------------------------------------------

// // 取消下载
// $(".cancel").click(() => {
//     $(".black").css("display", "none");
// });

// // 确认下载
// $(".downLoad").click(() => {
//     $.post(urlDns + "/user_app/yz/showXY", { comid: comids }, (data) => {
//         console.log(data.xieyi);
//         dowload(data.xieyi);
//     });
// });

// var dtask = null;
// // 下载的文件名
// var fileName = "";
// //下载文件
// function dowload(url) {
//     var options = { method: "GET" };
//     dtask = plus.downloader.createDownload(url, options);
//     dtask.addEventListener("statechanged", function(task, status) {
//         $(".black").css("display", "none");
//         $(".black2").css("display", "block");

//         switch (task.state) {
//             case 1: // 开始
//                 console.log("开始下载...");
//                 break;
//             case 2: // 已连接到服务器
//                 console.log("链接到服务器...");
//                 break;
//             case 3: // 已接收到数据
//                 // 进度
//                 var a = Math.floor(task.downloadedSize / task.totalSize * 100)
//                 console.log(a)
//                 $('#jqmeter-container').jQMeter({
//                     // 总进度
//                     goal: '$1,00',
//                     // 已完成的进度
//                     raised: "$" + a,
//                     // 进度条方向
//                     orientation: 'horizontal',
//                     // 进度条宽高
//                     width: '270px',
//                     height: '20px',
//                     // 背景颜色
//                     bgColor: "#cccccc",
//                     // 进度条颜色
//                     barColor: "#7EB6FF"
//                 });
//                 if (a = 100) {
//                     $('.black2').css("display", "none");
//                     $(".black3").css("display", "block");
//                 }
//                 break;
//             case 4: // 下载完成
//                 console.log("下载完成！");
//                 // console.log(task.totalSize)
//                 fileName = task.filename;
//                 break;
//         }

//     });
//     dtask.start();
// }

// // 完成注册，等待审核
// $(".close").click(() => {
//     var task = plus.uploader.createUpload(urlDns + "/user_app/yz/add", { method: "POST" },
//         function(t, status) { //上传完成
//             if (status == 200) {
//                 var responseText = JSON.parse(t.responseText).status;
//                 // console.log(responseText);
//                 if (responseText == 1) {
//                     console.log("上传成功：" + responseText.status + "," + responseText.message);
//                     location.href = "audit.html";
//                 }
//             } else {
//                 alert("上传失败：" + status);
//                 // wt.close(); //关闭等待提示按钮
//             }
//         }
//     );
//     //添加其他参数
//     task.addData("tel", tel);
//     task.addData("password", password);
//     task.addData("realname", realname);
//     task.addData("email", email);
//     task.addData("idCardNum", idCardNum);
//     task.addData("accountBank", accountBank);
//     task.addData("accountName", accountName);
//     task.addData("account", account);
//     task.addData("userType", userType);
//     task.addData("type", type);
//     task.addData("comids", comids);

//     // 两张身份证
//     task.addFile(src1, { key: "idCardUpUrl" });
//     task.addFile(src2, { key: "idCardDownUrl" });

//     task.start();

// });

// // 打开文件
// $(".open").click(() => {
//     // console.log(fileName);


//     var task = plus.uploader.createUpload(urlDns + "/user_app/yz/add", { method: "POST" },
//         function(t, status) { //上传完成
//             if (status == 200) {
//                 // console.log(t.responseText);
//                 // console.log(JSON.parse(t.responseText).status)

//                 var responseText = JSON.parse(t.responseText).status;
//                 // console.log(responseText);
//                 if (responseText == 1) {
//                     console.log("上传成功：" + responseText.status + "," + responseText.message);
//                     // var t = JSON.stringify(t);
//                     // console.log(t)
//                     // wt.close(); //关闭等待提示按钮
//                     // plus.io.resolveLocalFileSystemURL(fileName, function(entry) {
//                     // console.log(entry.toLocalURL()) //绝对地址      
//                     // });
//                     plus.runtime.openFile(fileName, {}, function(e) { //调用第三方应用打开文件
//                         alert('打开失败');
//                     });


//                     location.href = "audit.html";
//                 }

//             } else {
//                 alert("上传失败：" + status);
//                 // wt.close(); //关闭等待提示按钮
//             }
//         }
//     );
//     //添加其他参数
//     task.addData("tel", tel);
//     task.addData("password", password);
//     task.addData("realname", realname);
//     task.addData("email", email);
//     task.addData("idCardNum", idCardNum);
//     task.addData("accountBank", accountBank);
//     task.addData("accountName", accountName);
//     task.addData("account", account);
//     task.addData("userType", userType);
//     task.addData("type", type);
//     task.addData("comids", comids);

//     // 两张身份证
//     task.addFile(src1, { key: "idCardUpUrl" });
//     task.addFile(src2, { key: "idCardDownUrl" });

//     task.start();

// });