// 底部tabBar的切换功能
//要切换的子页面
// top和bottom需要设置为44px,用来让开导航和底部选项卡
mui.init({
    subpages: [{
            url: './page/home.html',
            id: './page/home.html',
            styles: { top: '0', bottom: '50px' }
        },
        {
            url: './page/message.html',
            id: './page/message.html',
            styles: { top: '0', bottom: '50px' }
        },
        {
            url: './page/mine.html',
            id: './page/mine.html',
            styles: { top: '0', bottom: '50px' }
        }
    ]
});

// 将home作为第一个显示的界面
mui.plusReady(function() {
    var view = plus.webview.getWebviewById('./page/home.html');
    view.show();
});

// 在实际使用过程中发现,app刚打开时显示的是"设置"界面而不是"首页"
// 原因在于我们通过getWebviewById时,首页并没有加载出来,所以通过方法拿到的是个空
// 因此我们这里需要做一个回调
// 在首页加载完毕之后通知index界面,将首页显示在最前端
// 在home页面给个函数
function plusRd() {
    window.addEventListener('homeReady', function() {
        var view = plus.webview.getWebviewById('./page/home.html');
        view.show();
    });
}
if (window.plus) {
    plusRd()
} else {
    document.addEventListener('plusready', plusRd, false);
}

// 选项卡上的按钮绑定点击事件
mui("#tabBar").on('tap', 'a', function(e) {
    var id = this.getAttribute('id');
    var view = plus.webview.getWebviewById(id);
    view.show();
});



// mui框架默认会监听Android手机的back按键
// mui.init({
//     keyEventBind: {
//         backbutton: false //关闭back按键监听
//     }
// });