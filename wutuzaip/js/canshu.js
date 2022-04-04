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
// var uid = getQueryVariable('uid')
// var topic = getQueryVariable('topic')
var j1 = 1
var j2 = 1
var j3 = 1
var j4 = 1
var uid = "14bcfedbbb13fe751820f3c5b498b5a5"
var topic = "290"

// if (!j1 || !j2 || !j3 || !uid || !topic) {
//     alert('初始化控制时必须传入j1，j2，j3，uid，topic')
// }

