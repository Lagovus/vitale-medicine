(() => {
    const video = document.querySelector(".virn-hero__video");
    const source = video ? video.querySelector("source[data-src]") : null;

    if (!video || !source) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let inView = false;
    let pageLoaded = document.readyState === "complete";

    const syncVideo = () => {
        if (reducedMotion.matches) {
            video.pause();
            if (source.hasAttribute("src")) {
                source.removeAttribute("src");
                video.load();
            }
            return;
        }

        if (!pageLoaded || !inView) {
            video.pause();
            return;
        }

        if (!source.hasAttribute("src")) {
            source.src = source.dataset.src;
            video.load();
        }

        video.muted = true;
        const playback = video.play();
        if (playback) playback.catch(() => {});
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                inView = entries[0].isIntersecting;
                syncVideo();
            },
            { rootMargin: "200px 0px", threshold: 0 }
        );
        observer.observe(video);
    } else {
        inView = true;
    }

    if (!pageLoaded) {
        window.addEventListener("load", () => {
            pageLoaded = true;
            syncVideo();
        }, { once: true });
    }

    if (reducedMotion.addEventListener) reducedMotion.addEventListener("change", syncVideo);
    else reducedMotion.addListener(syncVideo);

    syncVideo();
})();

(() => {
    const toggle = document.querySelector("[data-menu-toggle]");
    const navigation = document.querySelector("[data-mobile-nav]");

    if (!toggle || !navigation) return;

    const closeMenu = ({ restoreFocus = false } = {}) => {
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", document.documentElement.lang.startsWith("pt") ? "Abrir navegação" : "Abrir navegación");
        navigation.hidden = true;
        document.body.classList.remove("menu-open");
        if (restoreFocus) toggle.focus();
    };

    const openMenu = () => {
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", document.documentElement.lang.startsWith("pt") ? "Fechar navegação" : "Cerrar navegación");
        navigation.hidden = false;
        document.body.classList.add("menu-open");
    };

    toggle.addEventListener("click", () => {
        const isOpen = toggle.getAttribute("aria-expanded") === "true";
        if (isOpen) closeMenu();
        else openMenu();
    });

    navigation.addEventListener("click", (event) => {
        if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
            closeMenu({ restoreFocus: true });
        }
    });

    const desktopQuery = window.matchMedia("(min-width: 1101px)");
    const handleViewportChange = (event) => {
        if (event.matches) closeMenu();
    };

    desktopQuery.addEventListener("change", handleViewportChange);
})();

(() => {
    const floatingWhatsApp = document.querySelector(".floating-whatsapp");

    if (!floatingWhatsApp) return;

    const facultyZone = document.querySelector(".program-faculty");
    const overlapZones = document.querySelectorAll(
        ".registration-help, .program-faq, .final-cta, .site-footer, .program-faculty, .virn-institution__affiliations"
    );
    const visibleZones = new Set();
    const occlusionTargets = document.querySelectorAll("main img, main video, main .button, main summary");
    const contentRanges = [];
    const textWalker = document.createTreeWalker(document.querySelector("main"), NodeFilter.SHOW_TEXT);

    while (textWalker.nextNode()) {
        const node = textWalker.currentNode;
        if (!node.textContent.trim() || node.parentElement.closest("[hidden], [aria-hidden='true']")) continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        contentRanges.push(range);
    }

    if (!overlapZones.length) return;

    const overlapsMobileContent = () => {
        if (window.innerWidth > 430) return false;

        const style = window.getComputedStyle(floatingWhatsApp);
        const right = document.documentElement.clientWidth - parseFloat(style.right);
        const bottom = window.innerHeight - parseFloat(style.bottom);
        const left = right - floatingWhatsApp.offsetWidth;
        const top = bottom - floatingWhatsApp.offsetHeight;

        const intersects = (rect) => rect.width > 0 && rect.height > 0 &&
            rect.left < right && rect.right > left && rect.top < bottom && rect.bottom > top;

        if ([...occlusionTargets].some((target) => intersects(target.getBoundingClientRect()))) {
            return true;
        }

        return contentRanges.some((range) => [...range.getClientRects()].some(intersects));
    };

    const updateFloatingWhatsApp = () => {
        const contextualZoneVisible = [...visibleZones].some(
            (zone) => zone !== facultyZone || window.innerWidth <= 430
        );
        const shouldHide = (contextualZoneVisible || overlapsMobileContent()) &&
            document.activeElement !== floatingWhatsApp;

        floatingWhatsApp.classList.toggle("is-contextual-cta-visible", shouldHide);
        floatingWhatsApp.setAttribute("aria-hidden", String(shouldHide));

        if (shouldHide) floatingWhatsApp.setAttribute("tabindex", "-1");
        else floatingWhatsApp.removeAttribute("tabindex");
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) visibleZones.add(entry.target);
                    else visibleZones.delete(entry.target);
                });
                updateFloatingWhatsApp();
            },
            { threshold: 0, rootMargin: "-8% 0px 0px 0px" }
        );

        overlapZones.forEach((zone) => observer.observe(zone));
        window.addEventListener("resize", updateFloatingWhatsApp);
    } else {
        let frameRequested = false;

        const checkOverlapZones = () => {
            const viewportInset = window.innerHeight * 0.08;

            visibleZones.clear();
            overlapZones.forEach((zone) => {
                const rect = zone.getBoundingClientRect();
                if (rect.bottom > viewportInset && rect.top < window.innerHeight) {
                    visibleZones.add(zone);
                }
            });
            updateFloatingWhatsApp();
            frameRequested = false;
        };

        const requestZoneCheck = () => {
            if (frameRequested) return;
            frameRequested = true;
            window.requestAnimationFrame(checkOverlapZones);
        };

        window.addEventListener("scroll", requestZoneCheck, { passive: true });
        window.addEventListener("resize", requestZoneCheck);
        requestZoneCheck();
    }

    let occlusionFrameRequested = false;
    const requestOcclusionUpdate = () => {
        if (occlusionFrameRequested) return;
        occlusionFrameRequested = true;
        window.requestAnimationFrame(() => {
            updateFloatingWhatsApp();
            occlusionFrameRequested = false;
        });
    };

    window.addEventListener("scroll", requestOcclusionUpdate, { passive: true });
    requestOcclusionUpdate();

    floatingWhatsApp.addEventListener("blur", updateFloatingWhatsApp);
})();
