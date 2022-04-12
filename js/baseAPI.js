$.ajaxPrefilter(function (options) {
    options.url = 'https://wtzp-1785246-1310835343.ap-shanghai.run.tcloudbase.com' + options.url //'http://192.168.43.174:3007'
    console.log(options.url)

    //如果请求url带有 /my/ 则给请求头加上token
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }



    options.complete = function (res) {
        // console.log(res.statusText) //ok error

        if (res.statusText == "error" || res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败,token无效') {
            // alert("请求超时，请重新登录")
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})