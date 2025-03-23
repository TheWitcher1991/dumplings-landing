$(document).ready(function () {

    $("a[href*='#']").on("click", function (e) {
        e.preventDefault()

        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 777);

        return false
    })

    $(document).on('click', '.mobile-action', function () {

        if ($(this).hasClass('mdi-menu')) {
            $(this).removeClass('mdi-menu')
            $(this).addClass('mdi-close')
        } else {
            $(this).removeClass('mdi-close')
            $(this).addClass('mdi-menu')
        }

        $('.mobile-menu').fadeToggle(200)
    })

    $(document).on('click', '.mobile-menu a', e => {
        e.preventDefault()

        const bth = $('.mobile-action')

        if (bth.hasClass('mdi-menu')) {
            console.log('menu')
            bth.removeClass('mdi-menu')
            bth.addClass('mdi-close')
        } else {
            console.log('menu')
            bth.removeClass('mdi-close')
            bth.addClass('mdi-menu')
        }

        $('.mobile-menu').fadeOut(0)
    })

})
