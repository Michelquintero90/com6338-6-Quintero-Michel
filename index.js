document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const menuItems = hamburgerMenu.querySelectorAll('a');

    function toggleHamburgerMenu() {
        const isOpen = hamburgerMenu.classList.toggle('show-menu');
        hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());
        
        if (isOpen) {
            menuItems[0].focus();
        } else {
            hamburgerBtn.focus();
        }
    }

    hamburgerBtn.addEventListener('click', toggleHamburgerMenu);

    document.addEventListener('click', function(event) {
        const isClickInsideMenu = hamburgerMenu.contains(event.target);
        const isClickOnButton = event.target === hamburgerBtn;
        
        if (!isClickInsideMenu && !isClickOnButton) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && hamburgerMenu.classList.contains('show-menu')) {
            event.preventDefault();
            closeMenu();
            hamburgerBtn.focus();
        } else if (event.key === 'Escape' && isMenuItemFocused()) {
            event.preventDefault();
            closeMenu();
            hamburgerBtn.focus();
        }
    });

    function isMenuItemFocused() {
        for (let i = 0; i < menuItems.length; i++) {
            if (document.activeElement === menuItems[i]) {
                return true;
            }
        }
        return false;
    }

    function closeMenu() {
        hamburgerMenu.classList.remove('show-menu');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    }

    function checkScreenWidth() {
        if (window.innerWidth < 800) {
            hamburgerBtn.style.display = 'block';
            hamburgerMenu.classList.add('show-menu');
        } else {
            hamburgerBtn.style.display = 'none';
            hamburgerMenu.classList.remove('show-menu');
        }
        const isOpen = hamburgerMenu.classList.contains('show-menu');
        hamburgerBtn.setAttribute('aria-expanded', isOpen.toString());
    }

    checkScreenWidth();

    window.addEventListener('resize', checkScreenWidth);
});
