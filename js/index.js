
var buttonCode = 0;
var phoneText = '';
var ruserId;
var baseUrl = 'https://ce.proudkids.cn';
//var baseUrl = 'http://192.168.1.80:9999'
var token = '';
var amount = 1;
var wxConfig;
var cid = 123095;
var refreshToken;
var channelName = 'ximaReg';
var grade;
var smsCode;
/*创建新元素toast*/
function tipBlack(toastText) {
    var newDiv = document.createElement("div"); //创建元素
    newDiv.setAttribute("id", "toast"); //为创建的新元素添加属性
    var bodyTags = document.getElementsByTagName("body"); //获得body元素
    thisbody = bodyTags[0]; //获得body元素
    thisbody.appendChild(newDiv); //将新元素加入到body元素中
    var textNode = document.createTextNode(toastText); //创建文本节点
    newDiv.appendChild(textNode); //将创建的文本节点添加到新元素里面算
    setTimeout(toastDispear, 2000);

    function toastDispear() {
        //$(newDiv).fadeOut();
        newDiv.parentNode.removeChild(newDiv);
    }
}
$(function () {
    urlParams = getRequest();
    cid = urlParams.cid;
})
//获取url参数
function getRequest() {
    var url = location.search;
    var theRequest = {};
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

//关闭网页
function closePage() {
    window.opener = null;
    window.open('', '_self');
    window.close();
    WeixinJSBridge.call('closeWindow');
}

$('#phone').change(function () {
    phoneText = $.trim($('#phone').val());
    if (phoneText.length == 11 && (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phoneText))) { } else {
        tipBlack('请填写正确手机号码！')
    }
})
$('#get-message').click(function () {
    checkPhoneOnce();
})

$('#consult').click(function () {
    $('.fixed-box').removeClass('hidden')
})
$('.img1').click(function () {
    $('.fixed-box').addClass('hidden')
})
$('#goTop').click(function () {
    console.log(22)
    $('body,html').animate({ scrollTop: 0 }, 500);
})

$('#backindex').click(function () {
    backIndex()
})
function checkPhoneOnce() {
    phoneText = $.trim($('#phone').val());
    console.log(phoneText)
    if (phoneText.length == 11 && (/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(phoneText))) {
        getCode();
    } else {
        tipBlack('请填写正确手机号码！')
    }
}

//获取验证码
function getCode() {
    console.log(phoneText)
    if (buttonCode == 1) {
        tipBlack('发送频繁，请稍后')
        return false
    } else {
        console.log('进入')
        buttonCode = 1;
        changeText();
        $.ajax({
            //url: 'https://wechat.proudkids.cn/packGroupController.do?sendSMS&phone=' + phoneText,
            url: baseUrl + '/admin//smsCode/' + phoneText,
            type: 'get',
            async: false,
            cache: false,
            dataType: 'json',
            success: function (data) {
                console.log(data);
                //changeText();
            },
            error: function () {
                //tipBlack('获取失败')
            }
        })
    }
};

function changeText() {
    if (phoneText) {
        var rightTime = 60;
        $('#get-message').html('60秒');
        countdown = setInterval(function () {
            if (rightTime > 0) {
                buttonCode = 1;
                rightTime--;
                $('#get-message').html(rightTime + '秒');
            } else {
                clearInterval(countdown);
                buttonCode = 0;
                $('#get-message').html('点击获取');
            }
        }, 1000);
    } else {
        tipBlack('请输入手机号码！')
    }

};

//完成注册
$('#complete-button').click(function () {
    name = $('#name').val()
    phoneText = $.trim($('#phone').val());
    smsCode = $('#message').val();
    console.log(grade)
    if (name && phoneText && grade && smsCode) {
        complete()
    } else {
        tipBlack('请输入信息！');
        console.log(name, phoneText, grade, smsCode, cid)
    }
})

function complete() {
    $.ajax({
        url: baseUrl + '/ruser/v1/ruser/xmla/install',
        type: 'post',
        async: false,
        cache: false,
        contentType: "application/json",
        data: JSON.stringify({
            'channelId': cid,
            'ruserName': name,
            'smsCode': smsCode,
            'grade': grade,
            'phone': phoneText,
        }),
        success: function (data) {
            console.log(data);
            //接口回掉成功新用户
            if (data.code == 0) {
                window.location.href = 'success.html';
            }
            if(data.code == 500){
                tipBlack(data.msg);
            }
        },
        error: function (data) {
            console.log(data)
        }
    });
}
// $(document).ready(function() {
//     //   视频播放
//     $('.images-box2').click((e) => {
//         console.log(e)
//         $('video').css("z-index", 300)
//         $('video').trigger('play')
//     })
//     $(window).scroll(() => {
//         if ($(window).scrollTop() > 500) {
//             $('video').css("z-index", -1)
//             $('video').trigger('pused')
//         }
//     })
//     $('.playBtn').click(() => {
//         $('video').trigger('play')
//         $('.playBtn').hide()
//     })
// });
function backIndex() {
    window.location.href = 'index.html';
}