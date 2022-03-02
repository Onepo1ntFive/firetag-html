(function () {

    const showSidebarBtns = document.querySelectorAll('.js-sidebar-show');
    const hideSidebarBtns = document.querySelectorAll('.js-sidebar-hide');
    const body = document.querySelector('body');
    let clickedEl = null;

    Array.prototype.forEach.call(showSidebarBtns, function (el, i) {
        el.addEventListener('click', (event) => {
            event.preventDefault();
            clickedEl = el;
            showSidebar();
        });
    });
    Array.prototype.forEach.call(hideSidebarBtns, function (el, i) {
        el.addEventListener('click', (event) => {
            event.preventDefault();
            hideSidebar();
        });
    });

    const sidebar = document.querySelector('.js-sidebar');
    const sidebarBg = document.querySelector('.js-sidebar-bg');

    function showSidebar() {
        sidebar.classList.add('active');
        sidebarBg.classList.add('active');
        clickedEl.classList.add('active');
        body.classList.add('ov-h')
    }
    function hideSidebar() {
        sidebar.classList.remove('active');
        sidebarBg.classList.remove('active');
        clickedEl.classList.remove('active');
        body.classList.remove('ov-h')
    }

    // menu
    const menuItems = document.querySelectorAll('.js-menu-item ins');
    let menuSubMenu = null;
    Array.prototype.forEach.call(menuItems, function (el, i) {
        el.addEventListener('click', (event) => {
            menuSubMenu = event.target.parentNode.parentNode.querySelector('.js-menu-next')
            slideToggle(menuSubMenu);
        });
    });

})();