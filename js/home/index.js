mui.init();
//要切换的子页面
var subpages = [
    'page/home/home.html',
    'page/home/message.html',
    'page/home/mine.html'
];

//子页面样式，这里只有主页的底部是公用的，所以距离底部51个px,距离顶部0个px
var subpage_style = {
    top: '0px',
    bottom: '50px'
};

var aniShow = {};

//创建子页面，首个选项卡页面显示，其它均隐藏；
mui.plusReady(function() {
    var self = plus.webview.currentWebview();
    for (var i = 0; i < 5; i++) {
        var temp = {};
        var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
        if (i > 0) //不是第一个就隐藏
        {
            sub.hide();
        } else //第一个不隐藏，并且在标志数组中记录下来。
        {
            temp[subpages[i]] = "true";
            mui.extend(aniShow, temp);
        }
        self.append(sub); //加入子页面
    }
});


//当前激活选项
var activeTab = subpages[0];
// var title = document.getElementById("title");
//选项卡点击事件
mui('.mui-bar-tab').on('tap', 'a', function(e) {
    var targetTab = this.getAttribute('href');
    if (targetTab == activeTab) {
        return;
    }
    //更换标题
    //              title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
    //显示目标选项卡
    //若为iOS平台或非首次显示，则直接显示
    if (mui.os.ios || aniShow[targetTab]) {
        plus.webview.show(targetTab);
    } else {
        //否则，使用fade-in动画，且保存变量
        var temp = {};
        temp[targetTab] = "true";
        mui.extend(aniShow, temp);
        plus.webview.show(targetTab, "fade-in", 300);
    }
    //隐藏当前;
    plus.webview.hide(activeTab);
    //更改当前活跃的选项卡
    activeTab = targetTab;
});


//自定义事件，模拟点击“首页选项卡”
document.addEventListener('gohome', function() {
    var defaultTab = document.getElementById("defaultTab");
    //模拟首页点击
    mui.trigger(defaultTab, 'tap');
    //切换选项卡高亮
    var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
    if (defaultTab !== current) {
        current.classList.remove('mui-active');
        defaultTab.classList.add('mui-active');
    }
});


//监听手机返回键提示退出应用
// 方法一
var backButtonPress = 0;
mui.back = function(event) {
    backButtonPress++;
    if (backButtonPress > 1) {
        plus.runtime.quit();
    } else {
        plus.nativeUI.toast('再按一次退出应用');
    }
    setTimeout(function() {
        backButtonPress = 0;
    }, 1000);
    return false;
};
// //方法二
// mui.back = function() {
// 	var btn = ["确定", "取消"];
// 	mui.confirm('确认关闭当前窗口？', 'Hello MUI', btn, function(e) {
// 		if(e.index == 0) {
// 			plus.runtime.quit();
// 		}
// 	});
// }