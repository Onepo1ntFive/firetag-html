(function () {

    if (document.querySelector('.js-collapse-title')) {
        let collapseTitles = document.querySelectorAll('.js-collapse-title');
        let collapseContent = null;

        Array.prototype.forEach.call(collapseTitles, (collapseTitle) => {
            collapseTitle.addEventListener('click', (event) => {
                let et = event.target;
                collapseContent = et.nextElementSibling;

                et.classList.toggle('active')
                slideToggle(collapseContent);
            })
        });
    }

})();