$(document).ready(function () {

    $("a[href*='#']").on("click", function (e) {
        e.preventDefault()

        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 777);

        return false
    })

})
