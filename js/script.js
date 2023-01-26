$(function(){
    /*header fixed*/
    var header=$('header.mnHeader');
    var header_height=$('.mnHeader').height();

    function hdrFixed(){
        var scroll_top=$(window).scrollTop();
        
        if(scroll_top>header_height){
            header.addClass('fixed');
        }else{
            header.removeClass('fixed');
        }
    }

    $(window).scroll(hdrFixed);
    

    /*gnb*/
    var list=$('nav.gnb>ul, .subGnbWrap');
    var menuIcon=$('header.mnHeader .hdr_inner02 .mobile i:last-child');
    var mnMenu=$('header.mnHeader .subGnbWrap .subGnb_inner01 li.subGnb_title a');
    var menuWrap=$('header.mnHeader .subGnbWrap');

    function desktopGnb(){
        list.hover(function(){
            menuWrap.addClass('show');
        },function(){
            menuWrap.removeClass('show');
        });
    }

    function mobileGnb(){
        menuIcon.click(function(){
            menuWrap.slideToggle();
        });

        mnMenu.click(function(){
            $(this).next().slideDown().parent().siblings().find('ul:visible').slideUp();
        });
    }

    /*slide*/
    var num=0;
    var slideView=$('.mnSlide .slideView');
    var slideGr=$('.mnSlide .slideView .slideGr');
    var slideIdx=$('.mnSlide .slide_idx li');
    var box=$('.mnSlide .texts .box');

    slideIdx.click(function(){
        var idx=$(this).index();

        slideGr.css('margin-left', (idx * -100) + '%');
        slideIdx.removeClass('on');
        $(this).addClass('on');
        box.removeClass('start');
        box.eq(idx).addClass('start');

        clearInterval(auto);
    });

    function slideLeft(){
        num--;
        if(num<=0){
            num=0;
        }

        slideGr.css('margin-left', (num * -100) + '%');
        slideIdx.removeClass('on');
        slideIdx.eq(num).addClass('on');
        box.removeClass('start');
        box.eq(num).addClass('start');

        clearInterval(auto);
    };

    function slideRight(){
        num++;
        if(num>=2){
            num=2;
        }

        slideGr.css('margin-left', (num * -100) + '%');
        slideIdx.removeClass('on');
        slideIdx.eq(num).addClass('on');
        box.removeClass('start');
        box.eq(num).addClass('start');


        clearInterval(auto);
    };

    var auto = setInterval(function(){
        num++;
        num=num%3;
        slideGr.css('margin-left', (num * -100) + '%');
        slideIdx.removeClass('on');
        slideIdx.eq(num).addClass('on');
        box.removeClass('start');
        box.eq(num).addClass('start');
    },4000);

    /*tab메뉴*/
    var tabList=$('.cnt02_list ul.idx li');
    var cntWrap=$('.cnt02_cnt .cnt02_cntWrap');

    tabList.click(function(){
        var tabIdx=$(this).index();

        cntWrap.removeClass('show');
        cntWrap.eq(tabIdx).addClass('show');
        tabList.removeClass('on');
        tabList.eq(tabIdx).addClass('on');
    });

    /**/
    var up=$('.cnt05 .btn');
    up.click(function(){
        var top = $('.headerWrap').offset().top;

        $('html, body').animate({scrollTop : top}, 600);
    });


    /*디바이스별로 적용*/
    var wd = $('html').width();

    function wdr(){
        if(wd>=1026){
            desktopGnb();

            $('.mnSlide .btns .left').click(function(){
                slideLeft();
            });
            $('.mnSlide .btns .right').click(function(){
                slideRight();
            });

            auto;
        }else if(420<=wd && wd<=1025){
            mobileGnb();

            slideView.on('swipeleft', function(){
                slideRight();
            });
            slideView.on('swiperight', function(){
                slideLeft();
            });
        }else{
            mobileGnb();
            slideView.on('swipeleft', function(){
                slideRight();
            });
            slideView.on('swiperight', function(){
                slideLeft();
            });
        }
    }

    wdr();
});