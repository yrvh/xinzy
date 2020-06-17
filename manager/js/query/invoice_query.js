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

    $.post(urlDns + "/control_app/ms/fr_zg/zf/index",{
        // 0.单位录入1.业者录入
        type:"0",
        tel_app:tel_app,
        pass_app:pass_app,
        code_app:code_app
    },function(data){
        console.log(JSON.stringify(data))
        $(".com_dyzqr").text(data.send);
        $(".com_yzth").text(data.yz_nopass);
        $(".com_dsmgsqr").text(data.yz_pass);
        $(".com_smgsth").text(data.ms_nopass);
        $(".com_ywc").text(data.ms_pass);
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

    $.post(urlDns + "/control_app/ms/fr_zg/zf/index",{
        // 0.单位录入1.业者录入
        type:"1",
        tel_app:tel_app,
        pass_app:pass_app,
        code_app:code_app
    },function(data){
        console.log(JSON.stringify(data))
        $(".free_dsmgsqr").text(data.wait_check);
        $(".free_smgsth").text(data.ms_nopass);
        $(".free_ywc").text(data.ms_pass);
        
    })
})