document.addEventListener('DOMContentLoaded', () => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Navbar Scroll Effect
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Accessible Mobile Navigation
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const isPortuguese = document.documentElement.lang.startsWith('pt');

    const closeMobileMenu = () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', isPortuguese ? 'Abrir menu' : 'Abrir menú');
        menuToggle.querySelector('i').className = 'fas fa-bars';
        mobileMenu.hidden = true;
    };

    menuToggle.addEventListener('click', () => {
        const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
        menuToggle.setAttribute('aria-expanded', String(willOpen));
        menuToggle.setAttribute('aria-label', willOpen
            ? (isPortuguese ? 'Fechar menu' : 'Cerrar menú')
            : (isPortuguese ? 'Abrir menu' : 'Abrir menú'));
        menuToggle.querySelector('i').className = willOpen ? 'fas fa-xmark' : 'fas fa-bars';
        mobileMenu.hidden = !willOpen;
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && !mobileMenu.hidden) {
            closeMobileMenu();
            menuToggle.focus();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 1100 && !mobileMenu.hidden) {
            closeMobileMenu();
        }
    });

    // The primary contact remains available while its floating duplicate recedes.
    const floatingContact = document.querySelector('.whatsapp-float');
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => {
            floatingContact.classList.toggle('contact-visible', entries[0].isIntersecting);
        }).observe(document.getElementById('contato'));
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const selector = this.getAttribute('href');
            const target = selector === '#'
                ? document.getElementById('home')
                : document.querySelector(selector);
            if (target) {
                const headerOffset = nav.getBoundingClientRect().height + 16;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: motionPreference.matches ? 'auto' : 'smooth'
                });
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

});
