$(function () {

    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var layer = layui.layer

    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        if ($('#form_reg [name=password]').val() != $('#form_reg [name=repassword]').val()) {
            return layer.msg("密码不一致")
        }
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg("注册成功，请登录")
            $('#link_login').click()
        })
    })

    $('#form_login').submit(function (e) {
        // console.log("sss"+$(this).serialize())
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),

            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败,账号或密码错误')
                }
                console.log(res)
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})