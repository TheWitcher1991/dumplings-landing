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

    $(document).on('click', '.shop-button', function () {
        $('.modal').fadeToggle(200)
        $('html').addClass('no-scroll')
    })


    $(document).on('click', '.close-modal', function () {
        $('.modal').fadeToggle(200)
        $('html').removeClass('no-scroll')
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

    $(document).on('click', '.send-request', function (e)  {
        e.preventDefault()

        $('.label-error').fadeOut(50)
        $('input').removeClass('error')
        $('select').removeClass('error')

        let err = 0;

        let inputs = document.querySelectorAll('.modal-form input, .modal-form select')

        inputs.forEach(el => {
            let i = el.getAttribute('name')

            if ($.trim(el.value) === '') {
                $(`#${i}`).addClass('error');
                $(`.e-${i}`).fadeIn(50)
            }

            err += 1;
        })

        if (err !== 0)
            return false

        let bth = ('.send-request')

        bth.html(`
            <svg class="spinner-bth" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
        `)
        bth.attr('disabled', 'true')

        $.ajax({
            url: '/mail.php',
            data: $('.modal-form').serialize(),
            type: 'POST',
            cache: false,
            dataType: 'json',
            success: function (response) {
                bth.html('Оставить заявку')
                bth.attr('disabled', 'false')
            },
            error: function (response) {
                console.log(response)
                alert('Ошибка отправки заявки')
                bth.html('Оставить заявку')
                bth.attr('disabled', 'false')
            },
        })
    })

})
