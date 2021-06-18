if (getCookie('username')) {
    $('#login').text(`欢迎尊贵的${getCookie('username')}`);
    $('#login').click((e) => { return false })
} else {

    var index = layer.load(0, { shade: [1, '#ccc'], shadeClose: true }); layer.msg('请先登录');
    setTimeout(() => {
        window.location.href = '../pages/login.html';
    }, 1000)
    $('#login').text(`登录`);
    $('#login').click(() => { window.location.href = '../pages/login.html' })
}
if (getCookie('username')) {
    var arr = localStorage.getItem(getCookie('username'));
    if (!arr) {
        $('.kong').css('display', 'block')
    } else {
        $('.kong').css('display', 'none')
    }
    arr = JSON.parse(arr);
    async function yibu() {
        for (var i = 0; i < arr.length; i += 2) {
            var res = await $.ajax({
                url: '../php/shopping.php',
                data: { id: arr[i] },
                dataType: 'json',
                success: function (res) {
                    var str = $('tbody').html();
                    str += ` <tr ai=${res[0].id}>
                    <td><input type="checkbox" name="" class="danxuan"></td>
                    <td><img src="${res[0].img}" alt=""></td>
                    <td>${res[0].title}</td>
                    <td>￥<span class='dan'>${res[0].msg}</span></td>
                    <td><button class="jian">-</button><input type="text" class="nums" index=${res[0].inven} value="${arr[i + 1]}"><button class="btn">+</button></td>
                    <td >￥<span class="jin">${res[0].msg * arr[i + 1]}</span></td>
                    <td><button class="del">删除</button></td>
                </tr>`;
                    $('tbody').html(str);
                }
            })
        }
        var flag = true;
        $('.quanxuan').click(() => {
            for (var i = 0; i < $('.danxuan').length; i++) {
                if ($('.danxuan').eq(i).prop('checked')) {
                    $('#jie').css('cursor', 'auto');
                    $('#jie').css('background', '#f40')
                    break;
                } else {
                    $('#jie').css('cursor', 'not-allowed');
                    $('#jie').css('background', '#B0B0B0')
                }
            }
            if (flag) {
                $('.danxuan').prop('checked', true);
                $('.quanxuan').prop('checked', true);
                var num = 0;
                var num1 = 0;
                for (var i = 0; i < $('.nums').length; i++) {
                    num += $('.nums').eq(i).val() - 0;
                }
                for (var i = 0; i < $('.jin').length; i++) {
                    num1 += $('.jin').eq(i).text() - 0;
                }
                $('#zongnum').html(num1)
                $('#num').html(num)
                flag = false;
            } else {
                $('.danxuan').prop('checked', false);
                $('.quanxuan').prop('checked', false);
                flag = true;
                $('#num').html(0);
                $('#zongnum').html(0)
            }
        })
        const danxuan = document.querySelectorAll('.danxuan')
        $('.danxuan').click(function () {
            for (var i = 0; i < $('.danxuan').length; i++) {
                if ($('.danxuan').eq(i).prop('checked')) {
                    $('#jie').css('cursor', 'auto');
                    $('#jie').css('background', '#f40')
                    break;
                } else {
                    $('#jie').css('cursor', 'not-allowed');
                    $('#jie').css('background', '#B0B0B0')
                }
            }
            var flag1 = true;
            var num = $('#num').html() - 0
            var num1 = $('#zongnum').html() - 0
            $('#num').text($(this).parent().parent().find('.nums').val() - 0 + num)
            $('#zongnum').html($(this).parent().parent().find('.jin').html() - 0 + num1)
            for (a = 0; a < danxuan.length; a++) {
                if (!danxuan[a].checked) {
                    flag1 = false
                    break;
                }
            }
            if (flag1) {
                $('.quanxuan').prop('checked', true);
                var num = 0;
                for (var i = 0; i < $('.nums').length; i++) {
                    num += $('.nums').eq(i).val() - 0;
                }
                $('#num').html(num)
            }
            else {
                $('.quanxuan').prop('checked', false);
            }
        })
        $('.jian').click(function () {
            var i = $(this).next().val();
            if (i <= 1) {
                return
            }
            i--;
            $(this).next().val(i);
            $(this).parent().parent().find('.jin').html(i * $(this).parent().parent().find('.dan').html());
        })
        $('.btn').click(function () {
            var i = $(this).prev().val() - 0;
            if (i >= $(this).prev().attr('index')) {
                return
            }
            i++;
            $(this).prev().val(i);
            $(this).parent().parent().find('.jin').html(i * $(this).parent().parent().find('.dan').html());
        })
        $('.del').click(function () {
            $(this).parent().parent().remove();
            var id = $(this).parent().parent().attr('ai');
            var arr = localStorage.getItem(getCookie('username'));
            arr = JSON.parse(arr);
            for (var i = 0; i < arr.length; i += 2) {
                if (arr[i] == id) {
                    arr.splice(i, 2);
                }
            }
            if (arr.length) {
                $('.kong').css('display', 'none');
            } else {
                $('.kong').css('display', 'block')
            }
            arr = JSON.stringify(arr);
            localStorage.setItem(getCookie('username'), arr)
        })
        $('.nums').blur(function () {
            if ($(this).val() <= 1) {
                $(this).val(1);
            }
        })
        var arr1 = localStorage.getItem(getCookie('username'));
        arr1 = JSON.parse(arr1);
        if (arr1 == '') {
            $('.kong').css('display', 'block')
        }
    }
    yibu()
}


