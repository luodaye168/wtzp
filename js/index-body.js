function online(api_key, device_id) {
    var api = new OneNetApi(api_key);
    str = api.sendCommand(device_id, 'online?').done(function (data) {
        if (data.error == "succ" && data.errno == 0) {
            $('#' + device_id).html("<span style='color: rgb(82, 181, 129);'>在线</span>")
        }
        else if (data.errno == 10) {
            $('#' + device_id).html("<span style='color: rgb(128, 131, 133);'>离线</span>")
        }
        else {
            $('#' + device_id).html("<span style='color: rgb(217,48,37);'>错误码:" + data.errno + "</span>")
        }
    });
}

var laytpl = layui.laytpl
//第三步：渲染模版
var data = { //数据
    "list": [
        {
            id: 1,
            user_id: 50, //index
            owner_id: 50,
            device_id: "698798850",
            device_name: "测试设备1号",
            api_key: "Jv9=4GlC9mUikaJQgKt5HQl3qzc=",
            img_src: "/images/260.png",
        },
        {
            id: 2,
            user_id: 50, //index
            owner_id: 50,
            device_id: "759744237",
            device_name: "测试设备2号",
            api_key: "NpJZqIWprs7J9OJmPbLb1XKD26c=",
            img_src: "/images/32.png",

        },
        {
            id: 3,
            user_id: 50, //index
            owner_id: 50,
            device_id: "69798850",
            device_name: "测试设备3号艾恩人民",
            api_key: "Jv9=4GlC9mUikaJQgKt5HQl3qzc",
            img_src: "/images/260.png",
        },
    
        {
            id: 4,
            user_id: 50, //index
            owner_id: 50,
            device_id: "698798853",
            device_name: "测试设备1号",
            api_key: "Jv9=4GlC9mUikaJQgKt5HQl3qzc=",
            img_src: "/images/260.png",
        },
        {
            id: 5,
            user_id: 50, //index
            owner_id: 50,
            device_id: "759744235",
            device_name: "测试设备2号",
            api_key: "NpJZqIWprs7J9OJmPbLb1XKD26c=",
            img_src: "/images/32.png",

        },
        {
            id: 6,
            user_id: 50, //index
            owner_id: 50,
            device_id: "69798853",
            device_name: "测试设备3号艾恩人民",
            api_key: "Jv9=4GlC9mUikaJQgKt5HQl3qz",
            img_src: "/images/26.png",
        },
        {
            id: 6,
            user_id: 50, //index
            owner_id: 50,
            device_id: "697988533",
            device_name: "测试设备3号艾恩人民",
            api_key: "Jv9=4GlC9mUikaJQgKt5HQl3qzc=",
            img_src: "/images/32.png",
        },
    
    ]
}

var getTpl = demo.innerHTML
    , view = document.getElementById('view');
laytpl(getTpl).render(data, function (html) {
    view.innerHTML = html;
});

var layer = layui.layer
$('.layui-panel').click(function () {
    let click_id = $(this).attr('click-id')
    console.log(click_id)
    layer.msg(click_id)
})