$.ajaxPrefilter(function (options) {
    console.log(options.url)
    options.url = 'http://192.168.0.109:3007' + options.url
    console.log(options.url)

})