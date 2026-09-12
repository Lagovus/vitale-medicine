document.addEventListener('DOMContentLoaded', () => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Reveal editorial groups once, while keeping content visible without JavaScript.
    if (!motionPreference.matches && 'IntersectionObserver' in window) {
        const revealTargets = [
            ...document.querySelectorAll('.reveal:not(.reviews-grid):not(.team-card)'),
            ...document.querySelectorAll('.services-grid, #equipe > .container > .team-grid, .footer-content, .footer-bottom')
        ];
        const reviewGrid = document.querySelector('.reviews-grid');
        const reviewCards = reviewGrid ? [...reviewGrid.querySelectorAll('.review-card')] : [];

        revealTargets.forEach(target => target.classList.add('motion-pending'));
        reviewCards.forEach(card => card.classList.add('motion-pending'));

        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                if (entry.target === reviewGrid) {
                    reviewCards.forEach(card => card.classList.add('motion-visible'));
                } else {
                    entry.target.classList.add('motion-visible');
                }
                revealObserver.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -24px' });

        revealTargets.forEach(target => revealObserver.observe(target));
        if (reviewGrid) revealObserver.observe(reviewGrid);

        document.addEventListener('focusin', event => {
            const pendingTarget = event.target.closest('.motion-pending:not(.motion-visible)');
            if (!pendingTarget) return;
            pendingTarget.classList.add('motion-immediate', 'motion-visible');
            revealObserver.unobserve(pendingTarget);
        });
    }

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
                    behavior: motionPreference.matches || e.detail === 0 ? 'auto' : 'smooth'
                });
                target.setAttribute('tabindex', '-1');
                target.focus({ preventScroll: true });
            }
        });
    });

});
