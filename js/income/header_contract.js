mui.init();
$.ajaxSettings.async = false;
var phptos = 0;
$(".back").click(() => {
    history.back();
});

// 判断业务合同是否能够修改
var ishaveyw = sessionStorage.getItem("ishaveyw");
console.log("ishaveyw:" + ishaveyw)

var srcStr = sessionStorage.getItem("header_contractImg");
var src = JSON.parse(srcStr);
if (srcStr) {
    $(".complete").css("background-color", "#7EB6FF");
    $(".complete").on("click", submit);
    if (phptos >= 10) {
        $(document).off("click", ".addImg", imgUp);
    }
    var imgStr = "";
    phptos = src.length;
    var imgBoxStr = ` 
                <div class="imgBox addImg">
                    <img class="bgImg" src="../../img/camera.png" alt="">
                    <div class="tips">${phptos}/10)</div>
                </div>     
            `;
    for (var i = 0; i < src.length; i++) {

        imgStr += `
                        <div class="imgBox">
                            <img class="targetImg" src="${src[i]}" alt="">
                            <div class="delBox">
                                <img class="del" src="../../img/del.png" alt="">
                            </div>
                        </div>
                    `;
    }
    $(".addImg").remove();
    $(".photosBox").append(imgStr);
    $(".photosBox").append(imgBoxStr);
    $(".complete").css("background-color", "#7EB6FF");
    $(".complete").on("click", submit);
}

if (ishaveyw == 0) {
    // 1 有收入记录，纳税识别号和业务合同不能修改
    // 0 可以修改
    // 给上传图片框绑定点击事件
    $(document).on("click", ".addImg", imgUp);

    // 删除图片
    $(document).on("click", ".del", delImg);
}


// 删除图片的方法
function delImg() {
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
}

function submit() {

    // 储存图片地址进sessionStorage
    var header_contractImg = [];
    var targetImg = $(".targetImg");
    for (var i = 0; i < targetImg.length; i++) {
        header_contractImg.push(targetImg[i].src);
    }
    // console.log(JSON.stringify(contractImg))
    // sessionStorage只能存储字符串，先把数据以字符串的形式存着，
    // 到了onLineContract页面取出来再序列化
    sessionStorage.setItem("header_contractImg", JSON.stringify(header_contractImg));
    if (header_contractImg.length > 0) {
        sessionStorage.setItem("hasHeaderContractImg", 1);
    } else {
        sessionStorage.setItem("hasHeaderContractImg", 0);
    }
    history.back();
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