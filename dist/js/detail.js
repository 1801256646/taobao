var formAjax = document.querySelector('form');
var sel = document.querySelectorAll('select');
var pro = sel[0];
var city = sel[1];
var county = sel[2]
var area = sel[3];
if (!getCookie('id')) {
    var index22 = layer.load(0, { shade: [0.6, '#fff'], shadeClose: true })
    layer.msg('非法访问');
    window.location.href = '../pages/index.html'
    layer.close(index22)
}
ajax({
    url: "../php/region.php",
    fun: function (res) {
        var str = '<option value="">请选择省</option>';
        var row = JSON.parse(res);
        for (var i = 0; i < row.length; i++) {
            str += `<option value="${row[i].province_id}">${row[i].name}</option>`
        }
        pro.innerHTML += str
    }
})
pro.onchange = function () {
    var proValue = pro.value;
    ajax({
        url: "../php/city.php",
        ele: { province_id: proValue },
        fun: function (res) {
            var str = '<option value="">请选择市</option>';
            var row = JSON.parse(res);
            for (var i = 0; i < row.length; i++) {
                str += `<option value="${row[i].city_id}">${row[i].name}</option>`
            }
            city.innerHTML = str;
        }
    })
}
city.onchange = function () {
    var cityValue = city.value;
    ajax({
        url: "../php/county.php",
        ele: { city_id: cityValue },
        fun: function (res) {
            var str = '<option value="">请选择县</option>';
            var row = JSON.parse(res);
            for (var i = 0; i < row.length; i++) {
                str += `<option value="${row[i].area_id}">${row[i].name}</option>`
            }
            county.innerHTML = str;
        }
    })
}
county.onchange = function () {
    var countyValue = county.value;
    ajax({
        url: "../php/area.php",
        ele: { area_id: countyValue },
        fun: function (res) {
            var str = '<option value="">请选择街道</option>';
            var row = JSON.parse(res);
            for (var i = 0; i < row.length; i++) {
                str += `<option value="${row[i].town_id}">${row[i].name}</option>`
            }
            area.innerHTML = str;
        }
    })
}
$('.tab>ul').find('li').click(function () {
    $(this).addClass('red').siblings().removeClass('red');
    $('.tab>ol>li').eq($(this).index()).addClass('xian').siblings().removeClass('xian');
})
var smallBox = document.querySelector('.gass-big');
var bigBox = document.querySelector('.bigbox');
var huang = document.querySelector('.huang');
var hot = document.querySelector('.hot')
smallBox.addEventListener('mouseover', function () {
    bigBox.style.display = 'block';
    huang.style.display = 'block'

})
smallBox.addEventListener('mouseout', function () {
    bigBox.style.display = 'none';
    huang.style.display = 'none'
})
smallBox.addEventListener('mousemove', function (e) {
    var smallX = e.pageX - hot.offsetLeft - 50;
    var smallY = e.pageY - hot.offsetTop - 50;
    if (smallX <= 0) {
        smallX = 0;
    }
    else if (smallX >= 300) {
        smallX = 300;
    }
    if (smallY <= 0) {
        smallY = 0;
    }
    else if (smallY >= 300) {
        smallY = 300;
    }
    huang.style.left = smallX + 'px';
    huang.style.top = smallY + 'px';
    var bigImg = document.querySelector('#bigimg');
    var bigX = bigImg.offsetWidth - bigBox.offsetWidth;
    var bigY = bigImg.offsetHeight - bigBox.offsetHeight;
    bigImg.style.left = -smallX * bigX / 300 + 'px';
    bigImg.style.top = -smallY * bigY / 300 + 'px';
});
async function yibu() {
    var res = await $.ajax({
        url: '../php/get.php',
        data: { id: getCookie('id') },
        dataType: 'json',
        success: function (res) {
            $('.gass-big').find('img').attr('src', res[0].img);
            $('.gass-small').find('img').attr('src', res[0].img);
            $('.bigbox').find('img').attr('src', res[0].img);
            $('.title').find('h2').text(res[0].title);
            $('.price').find('p').eq(0).html(`<span>价格:</span>&nbsp;&nbsp;&nbsp;￥${res[0].msg}`);
            $('#jia').click(() => {
                if ($('#btn').val() - 0 >= res[0].inven) {
                    return
                }
                var num = $('#btn').val() - 0;
                num++;
                $('#btn').val(num)
            })
            $('#jian').click(() => {
                if ($('#btn').val() - 0 <= 1) {
                    return
                }
                var num = $('#btn').val() - 0;
                num--;
                $('#btn').val(num)
            });
        }
    })
    var arr = [];
    if (getCookie('username')) {
        $('#login').text(`欢迎尊贵的${getCookie('username')}`);
        $('#login').click((e) => { return false })
    } else {
        $('#login').text(`登录`);
        $('#login').click(() => { window.location.href = '../pages/login.html' })
    }
    $('#jiaru').click(() => {
        if (!getCookie('username')) {
            layer.msg('请先登录');
            var index = layer.load(0, { shade: [1, '#ccc'], shadeClose: true })
            setTimeout(() => {
                window.location.href = '../pages/login.html';
                layer.close(index);
            }, 1500)
            return
        }
        if (localStorage.getItem(getCookie('username'))) {
            layer.msg('加入成功', { icon: 1 })
            var str = localStorage.getItem(getCookie('username'));
            str = JSON.parse(str);
            for (var i = 0; i < str.length; i += 2) {
                if (str[i] == res[0].id) {
                    var val = $('#btn').val() - 0;
                    str[i + 1] -= 0;
                    str[i + 1] += val;
                }
            }
            var flag = str.some((item, index, str) => {
                if (index % 2 == 0) {
                    return str[index] == res[0].id;
                }
            })
            if (!flag) {
                str.push(res[0].id);
                str.push($('#btn').val());
            }

            str = JSON.stringify(str);
            localStorage.setItem(getCookie('username'), str);
        } else {
            arr.push(res[0].id);
            arr.push($('#btn').val());
            arr = JSON.stringify(arr);
            localStorage.setItem(getCookie('username'), arr);
        }
    })
    $('#like').click(() => {
        if (!getCookie('username')) {
            layer.msg('请先登录');
            var index = layer.load(0, { shade: [1, '#ccc'], shadeClose: true })
            setTimeout(() => {
                window.location.href = '../pages/login.html';
                layer.close(index);
            }, 1500)
        }
        window.location.href = '../pages/shopping.html'
    })
}
yibu();
