(function () {

    const swiper = new Swiper('.swiper-work', {
        spaceBetween: 20,
        slidesPerView: 2,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            }
        },
    });

})();