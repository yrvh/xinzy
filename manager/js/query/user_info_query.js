var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

// 返回
$(".back").click(() => {
    history.back();
})

$.post(urlDns + "/control_app/ms/fr/user/userCount", {
    usertype: "2",
    tel_app: tel_app,
    pass_app: pass_app,
    code_app: code_app
}, function (data) {
    console.log(JSON.stringify(data))
    $(".user_num").text(data.dw_8);
    $(".com_djlqr").text(data.dw_6);
    $(".com_dzgsh").text(data.dw_1);
    $(".com_zgshth").text(data.dw_11);
    $(".com_dwszl").text(data.dw_3);
    $(".com_ddwqr").text(data.dw_2);
    $(".com_dwth").text(data.dw_22);
})

$(".user_all").click(() => {
    // 全部
    $(".user_all").css("border-bottom", "3px solid #7EB6FF")
    $(".user_com").css("border", "none")
    $(".user_free").css("border", "none")
    $(".user_coop").css("border", "none")
		$(".com_ul").css("display","block")
		$(".free_ul").css("display","block")
		$(".coop_ul").css("display","block")

    $.post(urlDns + "/control_app/ms/fr/user/list", {
        tel_app: tel_app,
        pass_app: pass_app,
        code_app: code_app,
        page: "1", //第几页
        rows: "20",  //页数大小
        tel: "",//搜索字段
        usertype: "",//用户类型1.业者  2.单位    11  合作伙伴
        status: "1" //1.审核通过      0.注册当中
    }, function (data) {
        console.log(JSON.stringify(data))
        var htmlStr = "";
        for (var i = 0; i < data.rows.length; i++) {
            htmlStr += `
            <li class="" user_id="${data.rows[i].id}">
                <span>张三</span>
                <div>
                    <span class="com_djlqr">1384785486</span>
                    <img src="../../../img/next.png" alt="">
                </div>
            </li>
            
            `;
        }
    })
})
$(".user_com").click(() => {
    // 单位
    $(".user_com").css("border-bottom", "3px solid #7EB6FF")
    $(".user_all").css("border", "none")
    $(".user_free").css("border", "none")
    $(".user_coop").css("border", "none")
		$(".com_ul").css("display","block")
		$(".free_ul").css("display","none")
		$(".coop_ul").css("display","none")

    $.post(urlDns + "/control_app/ms/fr/user/userCount", {
        usertype: "2",
        tel_app: tel_app,
        pass_app: pass_app,
        code_app: code_app
    }, function (data) {
        console.log(JSON.stringify(data))
        $(".user_num").text(data.dw_8);
        $(".com_djlqr").text(data.dw_6);
        $(".com_dzgsh").text(data.dw_1);
        $(".com_zgshth").text(data.dw_11);
        $(".com_dwszl").text(data.dw_3);
        $(".com_ddwqr").text(data.dw_2);
        $(".com_dwth").text(data.dw_22);
    })
})
$(".user_free").click(() => {
    // 业者
    $(".user_free").css("border-bottom", "3px solid #7EB6FF")
    $(".user_com").css("border", "none")
    $(".user_all").css("border", "none")
    $(".user_coop").css("border", "none")
		$(".com_ul").css("display","none")
		$(".free_ul").css("display","block")
		$(".coop_ul").css("display","none")

    $.post(urlDns + "/control_app/ms/fr/user/userCount", {
        usertype: "1",
        tel_app: tel_app,
        pass_app: pass_app,
        code_app: code_app
    }, function (data) {
        console.log(JSON.stringify(data))
        $(".user_num").text(data.yz_8);
        $(".free_dshfwf").text(data.yz_1);
        $(".free_fwfybtg").text(data.yz_11);
        $(".free_dszfwf").text(data.yz_111);
        $(".free_ddwqr").text(data.yz_5);
        $(".free_dwth").text(data.yz_55);
        $(".free_dwsfrxx").text(data.yz_33);
        $(".free_dqrgrxx").text(data.yz_2);
        $(".free_grxxbtg").text(data.yz_22);
        $(".free_dwszl").text(data.yz_3);
        $(".free_dzgsh").text(data.yz_7);
        $(".free_zgth").text(data.yz_77);
        $(".free_dyzqrzl").text(data.yz_4);
        $(".free_yzth").text(data.yz_44);
    })
})
$(".user_coop").click(() => {
    // 合作伙伴
    $(".user_coop").css("border-bottom", "3px solid #7EB6FF")
    $(".user_com").css("border", "none")
    $(".user_free").css("border", "none")
    $(".user_all").css("border", "none")
		$(".com_ul").css("display","none")
		$(".free_ul").css("display","none")
		$(".coop_ul").css("display","block")

    $.post(urlDns + "/control_app/ms/fr/user/userCount", {
        usertype: "11",
        tel_app: tel_app,
        pass_app: pass_app,
        code_app: code_app
    }, function (data) {
        console.log(JSON.stringify(data))
        $(".user_num").text(data.hhr_8);
        $(".cooper_dshfwf").text(data.hhr_1);
        $(".cooper_fwfybtg").text(data.hhr_11);
        $(".cooper_dwsgrxx").text(data.hhr_33);
        $(".cooper_dqrgrxx").text(data.hhr_2);
        $(".cooper_grxxbtg").text(data.hhr_22);
        $(".cooper_dwszl").text(data.hhr_3);
        $(".cooper_dzgsh").text(data.hhr_7);
        $(".cooper_zgth").text(data.hhr_77);
        $(".cooper_dhzhbqrzl").text(data.hhr_4);
        $(".cooper_hzhbth").text(data.hhr_44);
    })
})


// 点击单位用户的item项  跳到该公司的详情页
