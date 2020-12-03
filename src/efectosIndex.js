
window.onscroll = function () { cambioNav() }
function cambioNav() {
    let elementoNav = document.getElementById('navFix');
    if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
        elementoNav.className = 'headernav2 navbar navbar-expand-lg navbar-light d-flex justify-content-between p-0 shadow-lg ';
    }
    else {
        elementoNav.className = 'navbar navbar-expand-lg navbar-light d-flex justify-content-between p-0 fixed-top';
    }
}

$(document).ready(function () {
    $('.up').hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.up').fadeIn('1000');
        }
        else {
            $('.up').fadeOut('1000');
        }
    });
    $('.up').click(function () {
        $('body,html').animate({
            scrollTop: 0
        });
    });
});
