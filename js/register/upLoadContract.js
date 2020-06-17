mui.init();
$.ajaxSettings.async = false;
$(".back").click(() => {
    // history.back();
    location.href = "./acceptCom.html";
});

// onLineContract页面是以contractImg的存在判断用户是否是上传
// 图片的，为了避免用户还没完成注册返回来选择线上签协议，页面加载的时候
// 清除一下缓存
sessionStorage.removeItem("contractImg");

// 获取接受服务单位的id
var comid = sessionStorage.getItem("comids");
console.log(comid)
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
var isUpdate = sessionStorage.getItem('isUpdate');
// console.log(isUpdate)


// 给上传图片框绑定点击事件
$(document).on("click", ".addImg", imgUp);

// 删除图片
$(document).on("click", ".del", function(e) {
    phptos -= 1;
    if (phptos == 0) {
        $(".tips").text("上传图片");
        $(".complete").css("background-color", "rgb(231, 231, 231)");
        $(".complete").off("click", submit);
    } else {
        $(".tips").text("(" + phptos + "/10)");
    }
    var removeHtml = $(this).parents(".imgBox");
    // console.log($(removeHtml))
    $(removeHtml).remove();
    if (phptos == 9) {
        $(document).on("click", ".addImg", imgUp);
    }

});

function submit() {
    // type为1，业者选择接受服务单位，还要跳转同意和公司的协议
    if (type == 1) {
        // 储存图片地址进sessionStorage
        // var contractImg = [];
        var targetImgs = $(".targetImg");
        var targetImg = [];
        for (var i = 0; i < targetImgs.length; i++) {
            console.log(targetImgs[i].src)
            targetImg.push(targetImgs[i].src)

        }
        // for (var i = 0; i < targetImg.length; i++) {

        //     plus.zip.compressImage({
        //             src: targetImg[i].src,
        //             dst: '_doc/zip_' + targetImg[i].src.substr(targetImg[i].src.lastIndexOf('/') + 1),
        //             quality: 60, //质量1-100	
        //             overwrite: true,
        //             width: "50%", //缩小到原来的一半			
        //             height: "50%" //缩小到原来的一半		
        //         },
        //         function(event) {
        //             contractImg.push(event.target);
        //         },
        //         function(error) {
        //             // errorTips("图片上传出错");
        //             console.log("压缩失败:" + error.message);
        //         });
        // }
        // console.log(JSON.stringify(contractImg))
        // sessionStorage只能存储字符串，先把数据以字符串的形式存着，
        // 到了onLineContract页面取出来再序列化
        // setTimeout(() => {
        // console.log(targetImg.length);
        // console.log(JSON.stringify(targetImg))
        sessionStorage.setItem("contractImg", JSON.stringify(targetImg));
        // hasContractImg 判断是否要向服务器提交协议图片
        sessionStorage.setItem("hasContractImg", 1);
        sessionStorage.setItem("yz_sf_xieyiID", 0);
        location.href = "./onLineContract.html";
        // }, 1000);

    }
}



//弹出系统按钮选择框
function imgUp() {
    plus.nativeUI.actionSheet({
        cancel: "取消",
        buttons: [
            { title: "拍摄" },
            { title: "相册" }
        ]
    }, function(e) { //1 是拍照  2 从相册中选择 
        switch (e.index) {
            case 1:
                appendByCamera();

                break;
            case 2:
                appendByGallery();
                break;
        }
    });
}

var phptos = 0;
// 拍照添加文件
function appendByCamera() {
    plus.camera.getCamera().captureImage(function(e) {
        // console.log("e is" + e);
        plus.io.resolveLocalFileSystemURL(e, function(entry) {
            phptos += 1;
            $(".complete").css("background-color", "#7EB6FF");
            $(".complete").on("click", submit);
            if (phptos >= 10) {
                $(document).off("click", ".addImg", imgUp);
            }
            var path = entry.toLocalURL();
            var imgHtmlStr = `
                <img class="targetImg" src="${path}" alt="">
                <div class="delBox">
                    <img class="del" src="../../img/del.png" alt="">
                </div>
            `;
            var imgBoxHtmlStr = `
                <div class="imgBox addImg">
                    <img class="bgImg" src="../../img/camera.png" alt="">
                    <div class="tips">(${phptos}/10)</div>
                </div>     
            `;
            $(".addImg").html(imgHtmlStr);
            $(".addImg").removeClass("addImg");
            $(".photosBox").append(imgBoxHtmlStr);
        }, function(e) {
            mui.toast("读取拍照文件错误：" + e.message);
        });

    });
}

// 从相册添加文件
function appendByGallery() {
    console.log(phptos)
    var maxNum = 10 - phptos;
    plus.gallery.pick(function(path) {
        phptos += path.files.length;
        if (phptos >= 10) {
            phptos = 10;
            $(document).off("click", ".addImg", imgUp);
        }

        var paths = path.files.length;

        // console.log(phptos)
        // alert(typeof(path.files.length))  //number
        var imgHtmlStr = "";
        var imgBoxHtmlStr = `
                <div class="imgBox addImg">
                    <img class="bgImg" src="../../img/camera.png" alt="">
                    <div class="tips">(${phptos}/10)</div>
                </div>     
            `;
        for (var i = 0; i < paths; i++) {

            imgHtmlStr += `
                        <div class="imgBox">
                            <img class="targetImg" src="${path.files[i]}" alt="">
                            <div class="delBox">
                                <img class="del" src="../../img/del.png" alt="">
                            </div>
                        </div>
                    `;


        }

        $(".addImg").remove();
        $(".photosBox").append(imgHtmlStr);
        $(".photosBox").append(imgBoxHtmlStr);
        $(".complete").css("background-color", "#7EB6FF");
        $(".complete").on("click", submit);
    }, function(e) {
        console.log("取消选择图片");
    }, {
        filter: "image",
        multiple: true,
        maximum: maxNum,
        system: false,
        onmaxed: function() {
            plus.nativeUI.alert('最多只能选择' + maxNum + '张图片');
        }
    });
}

// document.addEventListener("DOMContentLoaded", function(event) {
//     ImagesZoom.init({
//         "elem": ".list"
//     });
// }, false);