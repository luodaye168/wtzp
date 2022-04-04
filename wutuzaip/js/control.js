var live_flag = 0
var value1 = 5
var value2 = 6
var value3 = 7
var value4 = 8
var loading_flag = 0
var no_loading_flag = 0
var no_loading_flag_new = 0
var err_num = 0

send('online?')
setInterval("send('online?')", "4000")

function text(text) {
    var text_tip = document.getElementById("loading_text")
    text_tip.innerText = text
    text_tip.style.display = "inline";
}

function loading_tip() {
    document.getElementById("loading_img").style.display = "none";
    text("操作成功");
    loading_flag = 0;
    err_num = 0;
}

function getdata() {
    var api = new OneNetApi(api_key);

    api.getDataStreams(device_id).done(function (data) {
        // console.log('读取设备多个数据流：', data);
        // console.log(data.data.length)
        var jsonObject = data
        no_loading_flag = no_loading_flag_new
        document.getElementById("loading_text").style.display = "none";


        for (var i = 0; i < data.data.length; i++) {
            if ((jsonObject.data)[i].id == 'velue_wind2')
                value1 = i
            if ((jsonObject.data)[i].id == 'velue_wind1')
                value2 = i
            if ((jsonObject.data)[i].id == 'call_119')
                value3 = i
            if ((jsonObject.data)[i].id == 'velue_light')
                value4 = i
        }

        if ((jsonObject.data)[value1].current_value == j1) {
            document.getElementById("inner").style.left = 0;
            document.getElementById("inner").childNodes[1].checked = true;
            document.getElementById("inner").className = "inner-on";
        }
        else {
            document.getElementById("inner").style.left = -51 + "px";
            document.getElementById("inner").childNodes[1].checked = false;
            document.getElementById("inner").className = "inner-off";
        }

        if ((jsonObject.data)[value2].current_value == j2) {
            document.getElementById("inner2").style.left = 0;
            document.getElementById("inner2").childNodes[1].checked = true;
            document.getElementById("inner2").className = "inner-on";
        }
        else {
            document.getElementById("inner2").style.left = -51 + "px";
            document.getElementById("inner2").childNodes[1].checked = false;
            document.getElementById("inner2").className = "inner-off";
        }

        if ((jsonObject.data)[value3].current_value == j3) {
            document.getElementById("inner3").style.left = 0;
            document.getElementById("inner3").childNodes[1].checked = true;
            document.getElementById("inner3").className = "inner-on";
        }
        else {
            document.getElementById("inner3").style.left = -51 + "px";
            document.getElementById("inner3").childNodes[1].checked = false;
            document.getElementById("inner3").className = "inner-off";
        }

        if ((jsonObject.data)[value4].current_value == j4) {
            document.getElementById("inner4").style.left = 0;
            document.getElementById("inner4").childNodes[1].checked = true;
            document.getElementById("inner4").className = "inner-on";
        }
        else {
            document.getElementById("inner4").style.left = -51 + "px";
            document.getElementById("inner4").childNodes[1].checked = false;
            document.getElementById("inner4").className = "inner-off";
        }

        no_loading_flag_new = (jsonObject.data)[value4].current_value + (jsonObject.data)[value3].current_value + (jsonObject.data)[value2].current_value + (jsonObject.data)[value1].current_value
        if (no_loading_flag_new != no_loading_flag) {
            if (loading_flag == 1 && live_flag == 1) {
                loading_tip();
            }
        }
    });

    // console.log("loading:" + loading_flag);
    // console.log("err_num:" + err_num)

    if (loading_flag == 1) {
        setInterval(err(), "1800")
        function err() {
            err_num = err_num + 1
            if (err_num > 2) {
                text("操作失败");
                document.getElementById("loading_img").style.display = "none";
                loading_flag = 0;
                err_num = 0;
                clearInterval()
            }

        }
    }

}


function send(key) {
    if (key != "online?") {
        console.log("按键:" + key);
        if (live_flag == 1) {
            document.getElementById("loading_img").style.display = "inline";
            loading_flag = 1;
        }
    }

    var num = 999;
    switch (key) {

        case 1:
            s = document.getElementById("inner").className;
            if (s == 'inner-off' && live_flag == 1) {
                console.log('打开velue_wind2')
                if (j1 == 1)
                    num = '11'
                else
                    num = '10'

            }
            else if (s == 'inner-on' && live_flag == 1) {
                console.log('关闭velue_wind2')
                if (j1 == 1)
                    num = '10'
                else
                    num = '11'
            }
            else
                text("设备离线")
            break;

        case 2:
            s = document.getElementById("inner2").className;
            if (s == 'inner-off' && live_flag == 1) {
                console.log('打开velue_wind1')
                if (j2 == 1)
                    num = '21'
                else
                    num = '20'
            }

            else if (s == 'inner-on' && live_flag == 1) {
                console.log('关闭velue_wind1')
                if (j2 == 1)
                    num = '20'
                else
                    num = '21'
            }
            else
                text("设备离线")
            break;

        case 3:
            s = document.getElementById("inner3").className;
            if (s == 'inner-off' && live_flag == 1) {
                console.log('打开call_911')
                if (j3 == 1)
                    num = '31'
                else
                    num = '30'
            }

            else if (s == 'inner-on' && live_flag == 1) {
                console.log('关闭call_911')
                if (j3 == 1)
                    num = '30'
                else
                    num = '31'
            }
            else
                text("设备离线")
            break;

        case 4:

            s = document.getElementById("inner4").className;
            if (s == 'inner-off' && live_flag == 1) {
                console.log('打开植物灯')
                if (j4 == 1)
                    num = '41'
                else
                    num = '40'
            }

            else if (s == 'inner-on' && live_flag == 1) {
                console.log('关闭植物灯')
                if (j4 == 1)
                    num = '40'
                else
                    num = '41'
            }
            else
                text("设备离线")

            // document.getElementById("loading_img").style.display = "inline";
            // loading_flag = 1;
            break;

        default:
            num = key
            break
    }
    if (num != "online?")
        console.log("发送：" + num)
    console.log()
    var api = new OneNetApi(api_key);
    api.sendCommand(device_id, num).done(function (data) {

        if (data.error == 'succ') {
            live_flag = 1
            getdata()
            document.getElementById('live').innerHTML = '(在线)'
            document.getElementById('live').style.color = 'rgb(82,181,129)'
        }
        else {
            live_flag = 0
            document.getElementById('live').innerHTML = '(离线)'
            document.getElementById('live').style.color = 'rgb(128, 131, 133)'

            console.log("loading:" + loading_flag);
            console.log("err_num:" + err_num)
            document.getElementById("loading_img").style.display = "none";
            document.getElementById("loading_text").style.display = "none";

            document.getElementById("inner").style.left = -51 + "px";
            document.getElementById("inner").childNodes[1].checked = false;
            document.getElementById("inner").className = "inner-off";

            document.getElementById("inner2").style.left = -51 + "px";
            document.getElementById("inner2").childNodes[1].checked = false;
            document.getElementById("inner2").className = "inner-off";

            document.getElementById("inner3").style.left = -51 + "px";
            document.getElementById("inner3").childNodes[1].checked = false;
            document.getElementById("inner3").className = "inner-off";

            document.getElementById("inner4").style.left = -51 + "px";
            document.getElementById("inner4").childNodes[1].checked = false;
            document.getElementById("inner4").className = "inner-off";
        }

    });
}
