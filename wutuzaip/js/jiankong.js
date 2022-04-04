var html = '';
var ajaxObj = new XMLHttpRequest();
// ajaxObj.open('get', 'https://images.bemfa.com/cloud/v1/get/?uid=97c0cde0a19754648537d77cd1762fcf&topic=test&num=10');
ajaxObj.open('get', 'https://images.bemfa.com/cloud/v1/get/?uid='+ uid +'&topic='+ topic +'&num=10');

ajaxObj.send();
ajaxObj.onreadystatechange = function () {
    if (ajaxObj.readyState == 4 && ajaxObj.status == 200) {
        console.log('数据返回成功');
        var api = JSON.parse(ajaxObj.responseText);
        for (var i = 0; i < api.data.length; i++)
            {
                html +=  '<div class="photo"><div class="photo_top"><a href="' +
                    api.data[i].url + '""><img class="photo_img" alt="加载失败" src="' + api.data[i].url +
                    ' "></a></div>' + '<div class="photo_text"><p class="time">' +
                    api.data[i].time + '</p></div></div>';
                console.log(api.data[i].time, api.data[i].url);
            }
        document.getElementById('all_photo').innerHTML = html ;
    }
}