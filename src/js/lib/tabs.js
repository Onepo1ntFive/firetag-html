(function () {

    const tabTitleAll = document.querySelectorAll('.js-tabacc-title');
    const tabContentAll = document.querySelectorAll('.js-tabacc-content');
    let windowWidth = window.innerWidth;

    Array.prototype.forEach.call(tabTitleAll, function (tabTitleClick, i) {
        tabTitleClick.addEventListener('click', () => {

            let tabId = tabTitleClick.dataset.tabid;
            let tabTitleCurAll = document.querySelectorAll('[data-tabid=' + tabId + ']');
            let tabContentCur = document.querySelector('[data-tabcontent=' + tabId + ']');

            Array.prototype.forEach.call(tabTitleAll, function (tabTitleActive, i) {
                tabTitleActive.classList.remove('active');
                tabTitleActive.classList.remove('show');
            });
            Array.prototype.forEach.call(tabContentAll, function (tabContentActive, i) {
                tabContentActive.classList.remove('active');
                tabContentActive.classList.remove('show');
            });

            Array.prototype.forEach.call(tabTitleCurAll, function (tabTitleCur, i) {
                tabTitleCur.classList.add('active');
                tabTitleCur.classList.add('show');
            });

            tabContentCur.classList.add('active');
            tabContentCur.classList.add('show');

            windowWidth = window.innerWidth;
            Array.prototype.forEach.call(tabContentAll, function (tabContentShow, i) {
                tabContentShow.style.display = 'none';
            });
            tabContentCur.style.display = 'block';
            // if (windowWidth >= 1200) {
            // } 
            // else if (windowWidth < 1200) {
            //     Array.prototype.forEach.call(tabContentAll, function (tabContentSlide, i) {
            //         slideUp(tabContentSlide, 500);
            //     });
            //     setTimeout(function () {
            //         slideDown(tabContentCur, 500);
            //     }, 500);
            //     let topPos = document.querySelector('.tabs-acc__items').offsetTop;
            //     scrollIt(topPos, 1000, 'easeOutQuad');
            // }
        });
    });

})();