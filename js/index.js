$(function () {
    
    getUserInfo()
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            console.log(res)
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        }
    })
}

function renderAvatar(user) {
    var name = user.username
    $('.welcome').html(name) //'欢迎&nbsp;&nbsp' +
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()

    }
}

$('#userinfo').click(function(){
    location.href='./user/user_info.html'
})


$('#icon-turn').click(function () {
    $(this).toggleClass("layui-icon-shrink-right ")
    $(this).toggleClass("layui-icon-spread-left")
    if ($(this).hasClass("layui-icon-shrink-right")) {
        $('.layui-side').css({ 'left': '0', 'transition': 'left 0.5s' })
        // $('.layui-body').css({ 'left': '200px', 'transition': 'left 0.5s' })
        $('.layui-layout-left').css({ 'left': '200px', 'transition': 'left 0.5s' })
        // $('.layui-footer').css({ 'left': '200px', 'transition': 'left 0.5s' })
    }
    else {
        $('.layui-side').css({ 'left': '-200px', 'transition': 'left 0.5s' })
        $('.layui-body').css({ 'left': '0', 'transition': 'left 0.5s' })
        $('.layui-layout-left').css({ 'left': '0', 'transition': 'left 0.5s' })
        $('.layui-footer').css({ 'left': '0', 'transition': 'left 0.5s' })
    }
})

// iframe点击事件
var IframeOnClick = {
    resolution: 200,
    iframes: [],
    interval: null,
    Iframe: function () {
        this.element = arguments[0];
        this.cb = arguments[1];
        this.hasTracked = false;
    },
    track: function (element, cb) {
        this.iframes.push(new this.Iframe(element, cb));
        if (!this.interval) {
            var _this = this;
            this.interval = setInterval(function () { _this.checkClick(); }, this.resolution);
        }
    },
    checkClick: function () {
        if (document.activeElement) {
            var activeElement = document.activeElement;
            for (var i in this.iframes) {
                if (activeElement === this.iframes[i].element) { // user is in this Iframe  
                    if (this.iframes[i].hasTracked == false) {
                        this.iframes[i].cb.apply(window, []);
                        this.iframes[i].hasTracked = true;
                    }
                } else {
                    this.iframes[i].hasTracked = false;
                }
            }
        }
    }
};
IframeOnClick.track(document.getElementById("iFrame"), function () {
    $("#icon-turn").addClass("layui-icon-spread-left")
    $("#icon-turn").removeClass("layui-icon-shrink-right")
    $('.layui-side').css({ 'left': '-200px', 'transition': 'left 0.5s' })
    $('.layui-body').css({ 'left': '0', 'transition': 'left 0.5s' })
    $('.layui-layout-left').css({ 'left': '0', 'transition': 'left 0.5s' })
    $('.layui-footer').css({ 'left': '0', 'transition': 'left 0.5s' })
});