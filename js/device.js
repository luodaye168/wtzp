
//layui加载模块
layui.use(['layer', 'laytpl', 'form'], function () {
    var layer = layui.layer
        , laytpl = layui.laytpl
        , form = layui.form
    $(function () {
        getsensor()
    })
    function getsensor() {
        $.ajax({
            method: 'POST',
            url: '/my/sensor',
            data: { 'device_id': device_id },
            success: function (res) {
                data = { sensor: res.data }
                // console.log(data)
                var getTpl1 = sensor_tpl.innerHTML
                    , view1 = document.getElementById('sensor_view');
                laytpl(getTpl1).render(data, function (html) {
                    view1.innerHTML = html;
                });
            }
        })

        $.ajax({
            method: 'POST',
            url: '/my/switch',
            data: { 'device_id': device_id },
            success: function (res) {
                data = { switch: res.data }
                // console.log(data)
                var getTpl = switch_tpl.innerHTML
                    , view = document.getElementById('switch_view');
                laytpl(getTpl).render(data, function (html) {
                    view.innerHTML = html;
                });
                var stream_name = ''
                $('.layui-input-block').click(function (e) {
                    let on_key = $(this).attr('on-key')
                    let off_key = $(this).attr('off-key')
                    stream_name = $(this).attr('stream-name')
                    // console.log($('.layui-form-item input:checkbox[name=' + stream_name + ']+.layui-unselect').hasClass('layui-form-onswitch'))
                    var api = new OneNetApi(api_key);
                    // console.log(api_key)
                    //判断是手动点击还是模拟点击
                    if (e.hasOwnProperty('originalEvent') && live_flag == true) {
                        if ($('.layui-form-item input:checkbox[name=' + stream_name + ']+.layui-unselect').hasClass('layui-form-onswitch')) {
                            console.log(stream_name + "开" + on_key)
                            send_key = on_key
                        }
                        else {
                            console.log(stream_name + "关" + off_key)
                            send_key = off_key
                        }
                        console.log(send_key)
                        //下发指令
                        api.sendCommand(device_id, send_key).done(function (data) {
                            if (data.error != 'succ'){
                                layer.msg(下发指令失败)
                            }
                        });
                    }
                })
                form.render();
                // 开发中
                $('.layui-layout-right,.layui-icon-log,.layui-icon-next,.layui-icon-add-circle').click(function () {
                    layer.msg('开发中...')
                })
            }
        })
    }

});

//定义设备在线标志位
var live_flag = false
//从url获取参数
function getQueryVariable(variable) {
    // variable = decodeURI(variable)
    var query = window.location.search.substring(1);
    query = decodeURI(query)
    var vars = query.split("&");//数据分隔符
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split(":");//键值对分隔符
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
const api_key = getQueryVariable('api_key')
const device_id = getQueryVariable('device_id')
const device_name = getQueryVariable('device_name')
//打印url传过来的三个参数
// console.log(api_key, device_id, device_name)
//将url传过来的设备名写进头部span
$('#device_name').html(device_name)
//点击左上角<图标回到首页
$('#return').click(function () {
    window.parent.location.href = '/index.html'
})

//定义询问设备是否在线函数，
function online(api_key, device_id) {
    var api = new OneNetApi(api_key);
    str = api.sendCommand(device_id, 'online?').done(function (data) {
        //将设备在线状态写进头部span
        if (data.error == "succ" && data.errno == 0) {
            live_flag = true
            $('#online').html("<span style='color: rgb(250,250,250);'>(在线)</span>")
            $('.layui-form-item input+div').css("background-color", "")
        }
        else if (data.errno == 10) {
            live_flag = false
            $('#online').html("<span style='color: #FFB800;'>(离线)</span>")
            $('.layui-form-item input+div').css("background-color", "rgb(200,200,200)")
            // $('.layui-panel').css("color", "#f0f0f0")
            // $(".layui-form-item input").attr('disabled', 'true');
        }
        else {
            $('#online').html("<span style='color: rgb(217,48,37);'>(错误码:" + data.errno + ")</span>")
        }
    });
}
//询问设备是否在线
online(api_key, device_id)
setInterval(function () { online(api_key, device_id) }, 5000)

//high_low为3时，请求的是传感器的数据,1或0请求开关
function getdata(stream_name, high_low) {
    var api = new OneNetApi(api_key);
    api.getDataStreams(device_id).done(function (data) {
        var jsonObject = data
        // console.log(jsonObject.error)
        //为数据流名称绑定id
        if (jsonObject.error == 'timeout') {
            return layer.msg('出错啦')
        }
        var stream_id = -1
        for (var i = 0; i < data.data.length; i++) {
            if ((jsonObject.data)[i].id == stream_name)
                stream_id = i
        };
        //如果没有该stream_name则stream_id为undefined
        if (stream_id === -1) {
            console.log("存在非法的控制台未定义的数据流：" + stream_name)
            layer.msg("存在非法的控制台未定义的数据流：" + stream_name)
        }
        else if (stream_id != -1) {
            if (high_low != 3 && (jsonObject.data)[stream_id].current_value == high_low) {
                // console.log(stream_name, "开", $('.layui-form-item input:checkbox[name=' + stream_name + ']').is(":checked"))
                if (!$('.layui-form-item input:checkbox[name=' + stream_name + ']+.layui-unselect').hasClass('layui-form-onswitch')) {
                    $('.layui-form-item input:checkbox[name=' + stream_name + ']+.layui-unselect').click()
                }
            }
            else if (high_low != 3 && (jsonObject.data)[stream_id].current_value != high_low) {
                // console.log(stream_name, "关", $('.layui-form-item input:checkbox[name=' + stream_name + ']').is(":checked"))
                if ($('.layui-form-item input:checkbox[name=' + stream_name + ']+.layui-unselect').hasClass('layui-form-onswitch')) {
                    $('.layui-form-item input:checkbox[name=' + stream_name + ']+.layui-unselect').click()
                }
            }
            else if (high_low == 3) {
                $('#' + stream_name).html((jsonObject.data)[stream_id].current_value)
            }
        }
    })
}

