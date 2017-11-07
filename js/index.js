$(window).on('load',function () {
    function showImg() {
        var $rolllist = $('.banner>div>a');
        var newhref = $rolllist.eq(index).attr('href');
        $('.banner-img').attr('href',newhref).find('img').eq(index).stop(true,true).fadeIn().siblings().fadeOut();
        $rolllist.removeClass('active').eq(index).addClass('active');
    }
    function waterfall() {
        var $oBoxs = $('.note-box>.box');
        // var oBoxW = oBoxs[0].width();
        var w = $oBoxs.eq(0).outerWidth();
        // var cols = Math.floor($(window).width()/w);
        // $('.note-box').width(w*cols);
        var hArr = [];
        $oBoxs.each(function (index,value) {
            // console.log(index,value);
            var h = $oBoxs.eq(index).outerHeight();
            if(index<3){
                hArr[index]=h;
            }else {
                var minH = Math.min.apply(null,hArr);
                var minHIndex = $.inArray(minH,hArr);
                $(value).css({
                    'position':'absolute',
                    'top':minH+'px',
                    'left':minHIndex*w+'px'
                });
                hArr[minHIndex] += $oBoxs.eq(index).outerHeight();
            }
        });
        console.log(hArr);
        var maxH = Math.max.apply(null,hArr);
        $('.occup').css('height', maxH-704 +'px');
    }
    function checkScrollSlide() {
        var $lastBox = $('.note-box>.box').last();
        var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2);
        var scrollTop = $(window).scrollTop();
        var documentH = $(window).height();
        return (lastBoxDis<documentH+scrollTop)?true:false;
    }
    // banner图轮播
    var $imgrolls = $('.banner>div>a');
    var len = $imgrolls.length;
    var index = 0;
    var adTimer = null;
    $imgrolls.click(function () {
        index = $imgrolls.index(this);
        showImg(index);
    }).eq(0).click();
// 滑入停止动画，滑出开始动画
    $('.banner').hover(function () {
        if(adTimer){
            clearInterval(adTimer);
        }
    },function () {
        adTimer = setInterval(function () {
            showImg(index);
            index++;
            if(index==len){
                index = 0;
            }
        },3000);
    });

    $('.menu-wrap>li').hover(function () {
        // $(this).next().css('display','block');
        $(this).addClass('hover').find('.submenu-wrap').show();
    },function () {
        // $(this).next().css('display','none');
        $(this).removeClass('hover').find('.submenu-wrap').hide();
    });

    $('.searchArea>input').focus(function () {
        // $(this).css('border-bottom','1px solid rgba(240,20,20,.4)');
        $(this).next().css('display','none');
        $(this).next().next().css({'background-color':'rgba(240,20,20,.4)','border-radius':'12px'});
        $(this).next().next().find('a>i').css('color','#f01414');
    });
    $('.searchArea>input').blur(function () {
        $(this).next().css('display','block');
        $(this).next().next().css({'background-color':'transparent','border-radius':'0'});
        $(this).next().next().find('a>i').css('color','#93999F');
    });

    $('.course>ul.avatar-bottom>li>a').hover(function () {
        $(this).find('div').css('display','block');
    },function () {
        $(this).find('div').css('display','none');
    });

    //瀑布流
    waterfall();
    $(window).on('scroll',function () {
       if(checkScrollSlide()){

       }
    });
});


