var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

var id = sessionStorage.getItem("id");

// 返回
$(".back").click(()=>{
    history.back();
})

$.post(urlDns + "/share/bs_app/showUI",{
    // 0.有单位 1.无单位
    id:id,
    tel_app:tel_app,
    pass_app:pass_app,
    code_app:code_app
},function(data){
    console.log(JSON.stringify(data))
    $(".name").text(data.username);
    $(".nssbh").text(data.xycode);
    $(".zsfs").text(data.nsmethod);
    $(".sbzq").text(data.nszq);
    $(".ynsk").text(data.ynsk);
    $(".zzs").text(data.zzs);
    $(".gs").text(data.gs);
    $(".csjs").text(data.citys);
    $(".jyfj").text(data.jyfj);
    $(".dfjyfj").text(data.dfjy);
    $(".bsje").text(data.allmoney);
    
})