// 当用户点击确定之后，再次进来该页面，要显示原本要上传的图片
// 页面加载进来，获取localstorage的图片路径，判断是否存在，存在就渲染上去
var src1 = sessionStorage.getItem('idCardImg1');
var src2 = sessionStorage.getItem('idCardImg2');
// console.log(src1);
if (src1) {
    $("#headimg1").attr("src", src1);
    $("#headimg2").attr("src", src2);
}

// 返回
$(".back").click(() => {
    // history.back();
    location.href = "./free_coopera.html";
});

//扩展API完成后执行的操作
function plusReady() {
    //给选中的li增加判别class
    $(".list li").on("tap", ".imageup", function() {
        // alert('11');
        var $li = $(this).parents("li");
        console.log($($li).text())
        $li.addClass("selectLi");
        $li.siblings().removeClass("selectLi");
        page.imgUp();
    })
}

//弹出系统按钮选择框
var page = null;
page = {
    imgUp: function() {
        var m = this;
        /* console.log(m);*/
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
}


// 拍照添加文件
function appendByCamera() {
    plus.camera.getCamera().captureImage(function(e) {
        console.log("e is" + e);
        plus.io.resolveLocalFileSystemURL(e, function(entry) {
            var path = entry.toLocalURL();
            var indexa = liIndex()
            console.log(indexa);
            // ===============================
            plus.zip.compressImage({
                    src: path,
                    dst: '_doc/zip_' + path.substr(path.lastIndexOf('/') + 1),
                    quality: 60, //质量1-100	
                    overwrite: true,
                    width: "50%", //缩小到原来的一半			
                    height: "50%" //缩小到原来的一半		
                },
                function(event) {

                    console.log("<=====压缩文件路径=====>" + event.target);
                    console.log("<=====压缩后的大小=====>" + event.size); //除1024单位为K
                    console.log("<=====压缩后的宽度=====>" + event.width);
                    console.log("<=====压缩后的高度=====>" + event.height);
                    // var filesize = 1 * 1024 * 1024;
                    // if (event.size > filesize) {
                    //     alert("上传图片大小不能超过1M！");
                    //     return;
                    // }
                    $(".headimg")[indexa].src = event.target;
                    // 选择好照片就判断一次是否可以使用“确定按钮”
                    showNext();
                },
                function(error) {
                    errorTips("图片上传出错");
                    console.log("压缩失败:" + error.message);
                });
            // ========================================
            // $(".headimg")[indexa].src = path;


        }, function(e) {
            mui.toast("读取拍照文件错误：" + e.message);
        });

    });
}
// 从相册添加文件
function appendByGallery() {
    plus.gallery.pick(function(path) {
        var indexa = liIndex();
        console.log(indexa);
        console.log(path);

        // ===============================
        plus.zip.compressImage({
                src: path,
                dst: '_doc/zip_' + path.substr(path.lastIndexOf('/') + 1),
                quality: 60, //质量1-100	
                overwrite: true,
                width: "50%", //缩小到原来的一半			
                height: "50%" //缩小到原来的一半		
            },
            function(event) {

                console.log("<=====压缩文件路径=====>" + event.target);
                console.log("<=====压缩后的大小=====>" + event.size); //除1024单位为K
                console.log("<=====压缩后的宽度=====>" + event.width);
                console.log("<=====压缩后的高度=====>" + event.height);
                // var filesize = 1 * 1024 * 1024;
                // if (event.size > filesize) {
                //     alert("上传图片大小不能超过1M！");
                //     return;
                // }
                $(".headimg")[indexa].src = event.target;
                // 选择好照片就判断一次是否可以使用“确定按钮”
                showNext();
            },
            function(error) {
                errorTips("图片上传出错");
                console.log("压缩失败:" + error.message);
            });
        // ========================================
        // $(".headimg")[indexa].src = path;
        // // 选择好照片就判断一次是否可以使用“确定按钮”
        // showNext();
    });
}

// 判断用户是否选择好了两张图片，对确定按钮进行显示或者隐藏
function showNext() {
    var showNextSrc1 = $("#headimg1").attr("src");
    var showNextSrc2 = $("#headimg2").attr("src");
    if (showNextSrc1 != "../../img/IDCard1.png" && showNextSrc2 != "../../img/IDCard2.png") {
        $(".next").css("color", "#7EB6FF");
        // 确定上传
        $("body").on("click", ".next", clickNext);
        // console.log(111)
    } else {
        // console.log(222)
        // 给元素解绑点击事件
        $("body").off("click", ".next", clickNext);
    }
}
// 页面加载先调用一次进行判断
showNext();

// 确定按钮的点击事件
function clickNext() {
    sessionStorage.setItem('idCardImg1', files1.src) //存
    sessionStorage.setItem('idCardImg2', files2.src)
        // console.log(localStorage.getItem('img1'))
        // localStorage.getItem('getMenu') //取
        // upload();
        // 写入一个标志，告诉完善个人信息页面是否已经上传
    sessionStorage.setItem('didUpload', 1);
    // history.go(-1);
    location.href = "./free_coopera.html";
}


// //服务端接口路径
// var server = urlDns + "/app/test";
// //获取图片元素
var files1 = document.getElementById('headimg1');
var files2 = document.getElementById('headimg2');


//判断点击的是上传的第几个li             
function liIndex() {
    var lis = $(".list").children();
    console.log(lis.length)
    for (var i = 0; i < lis.length; i++) {
        console.log($(lis[i]).attr("class"))
        var lisClass = $(lis[i]).attr("class").split(" ");
        if (lisClass[2] == "selectLi") {
            console.log(i);
            // alert(i)
            return i - 1;
        }
    }
}


//扩展API是否准备好，如果没有准备好则监听plusReady 
if (window.plus) {
    plusReady();
} else {
    document.addEventListener("plusready", plusReady, false);
}