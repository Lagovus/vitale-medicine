document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Navbar Scroll Effect
    const nav = document.getElementById('main-nav');
    const updateNav = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });

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

    // Reveal Animations on Scroll with a no-JS/unsupported fallback
    const reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && !prefersReducedMotion) {
        document.documentElement.classList.add('reveal-enabled');

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
            reveal.addEventListener('focusin', () => {
                reveal.classList.add('reveal-immediate', 'active');
                revealObserver.unobserve(reveal);
            }, { once: true });
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]:not(.skip-link)').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const selector = this.getAttribute('href');
            const target = selector === '#'
                ? document.getElementById('home')
                : document.querySelector(selector);
            if (target) {
                const headerOffset = nav.getBoundingClientRect().height + 16;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                if (!target.hasAttribute('tabindex')) {
                    target.setAttribute('tabindex', '-1');
                }
                target.focus({ preventScroll: true });

                window.scrollTo({
                    top: offsetPosition,
                    behavior: prefersReducedMotion || event.detail === 0 ? 'auto' : 'smooth'
                });
            }
        });
    });

    // Avoid duplicating the final WhatsApp action while its CTA is visible.
    const whatsappFloat = document.querySelector('.whatsapp-float');
    const contactSection = document.getElementById('contato');
    if ('IntersectionObserver' in window && whatsappFloat && contactSection) {
        const contactObserver = new IntersectionObserver(([entry]) => {
            whatsappFloat.classList.toggle('is-suppressed', entry.isIntersecting);
        }, { threshold: 0.15 });

        contactObserver.observe(contactSection);
    }
});
