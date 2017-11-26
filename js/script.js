// close noti-layer
$('#close-noti').on('click', function(){
  // $('#noti-layer').css('display', 'none');
  $('#noti-layer').delay(350).fadeOut('slow');
})

//SMOOTH PAGE SCROLL
$(function () {
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});


//OWL CAROSEL TESTIMONIAL
if ($('.owl-carousel').length) {
    $(".testimonials").owlCarousel({
        // loop: true,
        // nav: true,
        dots: true,
        dotsEach: true,
        responsive: {
            0: {
                items: 1
            },
            700: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
}

var data;
$(document).ready(function () {
    // count number when scroll to
    $('.counter').counterUp({
        delay: 40,
        time: 1000
    });

    // tooltip for input
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });

    var isOpenPhoneCard = false;
    $('#btn-phone-card').on('click', function (e) {
        if (isOpenPhoneCard) {
           $('#phone-card-container').addClass('div-hidden');
           $('#btn-phone-card').removeClass('cs-btn-active');
        } else {
            $('#phone-card-container').removeClass('div-hidden');
            $('#btn-phone-card').addClass('cs-btn-active');
        }

        isOpenPhoneCard = !isOpenPhoneCard;
    });


    $('#form-donate').on('submit', function (e) {
        e.preventDefault();  //prevent form from submitting

        data = $("#form-donate :input").serialize();

        function handleResponseErr(bodyData) {
            bodyData = bodyData.responseJSON;

            alert(bodyData.message);
        }

        function handleResponseSuccess(bodyData) {
            // console.log(bodyData);
            alert(bodyData.message);

            HeartsBackground.initialize();

            // clear all input
            $(':input', '#form-donate')
                .not(':button, :submit, :reset, :hidden')
                .val('')
                .removeAttr('checked')
                .removeAttr('selected');
        }

        $.ajax({
            url: '/payment',
            type: 'post',
            data: data,
            dataType: 'json',
            success: handleResponseSuccess,
            error: handleResponseErr
        });

        console.log(data);

        return false;
    });

});

new WOW().init();

$.fn.alignElementsSameHeight = function () {
    $('.same-height-row').each(function () {

        var maxHeight = 0;
        var children = $(this).find('.same-height');
        children.height('auto');
        if ($(window).width() > 768) {
            children.each(function () {
                if ($(this).innerHeight() > maxHeight) {
                    maxHeight = $(this).innerHeight();
                }
            });
            children.innerHeight(maxHeight);
        }

        maxHeight = 0;
        children = $(this).find('.same-height-always');
        children.height('auto');
        children.each(function () {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).innerHeight();
            }
        });
        children.innerHeight(maxHeight);

    });
}

/*Preloader*/
//<![CDATA[
$(window).load(function () { // makes sure the whole site is loaded
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({'overflow': 'visible'});

    windowWidth = $(window).width();
    $(this).alignElementsSameHeight();
});

$(window).resize(function () {
    newWindowWidth = $(window).width();

    if (windowWidth !== newWindowWidth) {
        setTimeout(function () {
            $(this).alignElementsSameHeight();
        }, 205);
        windowWidth = newWindowWidth;
    }
});
//]]>


// shrink
$(window).scroll(function () {
    if ($(document).scrollTop() > 50) {
        $('nav').addClass('shrink');
    } else {
        $('nav').removeClass('shrink');
    }
});

function scrollToAnchor(id){
    $(document).scrollTop( $(id).offset().top );
}
