var pass_app = localStorage.getItem("pass_app");
var tel_app = localStorage.getItem("tel_app");
var code_app = localStorage.getItem("code_app");

var user_id = sessionStorage.getItem("user_id");
var user_name = sessionStorage.getItem("user_name");

// 返回
$(".back").click(() => {
    history.back();
});

$.post(urlDns + "/share/bs_app/nssetting/showUI", {
    // yztype   8-全部，0-有单位，1-无单位
    id: user_id,
    tel_app: tel_app,
    pass_app: pass_app,
    code_app: code_app,
}, function (data) {
    console.log(JSON.stringify(data))
    $(".name").text(user_name);
    // 增值税
    $(".zzs_zsl").text(data.zzs_bili);
    $(".zzs_nsfs").text(data.zzs_method);
    $(".zzs_hdde").text(data.zzs_checkmoney);
    // 个税
    $(".gs_fzl").text(data.gs_bili);
    $(".gs_nsfs").text(data.gs_method);
    $(".gs_hdde").text(data.gs_checkmoney);
    // 城建税
    $(".cjs_sl").text(data.cjs_bili);
    $(".cjs_nsfs").text(data.cjs_method);
    $(".cjs_hdde").text(data.cjs_checkmoney);
    // 教育费附加
    $(".jyfj_sl").text(data.jys_bili);
    $(".jyfj_nsfs").text(data.jys_method);
    $(".jyfj_hdde").text(data.jys_checkmoney);
    // 地方教育费附加
    $(".dfjyfj_sl").text(data.dfs_bili);
    $(".dfjyfj_nsfs").text(data.dfs_method);
    $(".dfjyfj_hdde").text(data.zzs_checkmoney);

})