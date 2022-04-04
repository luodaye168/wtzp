$.ajaxPrefilter(function (options) {
    options.url = 'http://192.168.0.106:3007' + options.url
    console.log(options.url)

    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    

    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败,token无效') {
            // if (res.responseJSON.status !== 0) {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})