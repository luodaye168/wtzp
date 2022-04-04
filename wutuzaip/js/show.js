// var api_key="NpJZqIWprs7J9OJmPbLb1XKD26c=" //我
// var device_id="759744237"
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split(":");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

var api_key = "Jv9=4GlC9mUikaJQgKt5HQl3qzc="
var device_id = "698798850"
// var api_key = getQueryVariable('api_key')
// var device_id = getQueryVariable('device_id')
// console.log(api_key)
// console.log(device_id)
// var j1 = getQueryVariable('j1')
// var j2 = getQueryVariable('j2')
// var j3 = getQueryVariable('j3')
var j1 = 1
var j2 = 1
var j3 = 1


send('online?')
setInterval("send('online?')", "3000")
var wendu = 0
var shidu = 0
var co2 = 0
var ph = 0
var ec = 0

function getdata() {
    var api = new OneNetApi(api_key);
    api.getDataStreams(device_id).done(function (data) {
        // console.log('读取设备多个数据流：', data);
        var jsonObject = data

        for (var i = 0; i < data.data.length; i++) {
            if ((jsonObject.data)[i].id == 'temp')
                wendu = i
            if ((jsonObject.data)[i].id == 'humi')
                shidu = i
            if ((jsonObject.data)[i].id == 'CO2')
                co2 = i
            if ((jsonObject.data)[i].id == 'ph')
                ph = i
            if ((jsonObject.data)[i].id == 'ec')
                ec = i

        }


        document.getElementById("wendu").innerHTML = (jsonObject.data)[wendu].current_value;
        document.getElementById("shidu").innerHTML = (jsonObject.data)[shidu].current_value;
        document.getElementById("co2").innerHTML = (jsonObject.data)[co2].current_value;
        document.getElementById("ph").innerHTML = (jsonObject.data)[ph].current_value;
        document.getElementById("ec").innerHTML = (jsonObject.data)[ec].current_value;

    });
}

function send(num) {
    var num;
    var api = new OneNetApi(api_key);
    api.sendCommand(device_id, num).done(function (data) {
        if (data.error == 'succ') {
            getdata()
            document.getElementById('live').innerHTML = '(在线)'
            document.getElementById('live').style.color = 'rgb(82,181,129)'
        }
        else {
            document.getElementById('live').innerHTML = '(离线)'
            document.getElementById('live').style.color = 'black'
            document.getElementById('wendu').innerHTML = '***'
            document.getElementById('shidu').innerHTML = '***'
            document.getElementById('co2').innerHTML = '***'
            document.getElementById('ph').innerHTML = '***'
            document.getElementById('ec').innerHTML = '***'
        }

    });
}

