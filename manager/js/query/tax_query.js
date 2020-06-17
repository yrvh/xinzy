var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

// 返回
$(".back").click(()=>{
    history.back();
})


// 有单位
$(".com_write").click(()=>{
    $(".com_write").css("background-color","#7EB6FF");
    $(".com_write").css("color","white");
    $(".free_write").css("background-color","white");
    $(".free_write").css("color","#7EB6FF");
    $(".com_ul").css("display","block");
    $(".free_ul").css("display","none");

    $.post(urlDns + "/share/bs_app/index",{
        // 0.有单位 1.无单位
        yztype:"0",
        tel_app:tel_app,
        pass_app:pass_app,
        code_app:code_app
    },function(data){
        console.log(JSON.stringify(data))
        $(".com_w").text(data.w_bs);
        $(".com_f").text(data.n_bs);
        $(".com_s").text(data.y_bs);
        
    })
    

})

// 没有单位
$(".free_write").click(()=>{
    $(".free_write").css("background-color","#7EB6FF");
    $(".free_write").css("color","white");
    $(".com_write").css("background-color","white");
    $(".com_write").css("color","#7EB6FF");
    $(".free_ul").css("display","block");
    $(".com_ul").css("display","none");

    $.post(urlDns + "/share/bs_app/index",{
        // 0.有单位 1.无单位
        yztype:"1",
        tel_app:tel_app,
        pass_app:pass_app,
        code_app:code_app
    },function(data){
        console.log(JSON.stringify(data))
        $(".free_w").text(data.w_bs);
        $(".free_f").text(data.n_bs);
        $(".free_s").text(data.y_bs);
        
    })
})

// 跳转列表
