(() => {
    const section = document.querySelector('#reviews');
    if (!section) return;
    const pt = document.documentElement.lang.startsWith('pt');
    const locale = pt ? 'pt-BR' : 'es-PY';
    const copy = pt ? {
        fallback: 'Consulte as avaliações e a nota atual diretamente no Google Maps.',
        count: n => `${new Intl.NumberFormat(locale).format(n)} ${n === 1 ? 'avaliação no Google' : 'avaliações no Google'}`,
        stars: n => `${n} de 5 estrelas`, source: 'Ver avaliação no Google Maps',
        noText: 'Avaliação sem comentário.',
        selection: 'Até 5 avaliações, ordenadas por relevância pelo Google. Textos no idioma original; exibimos apenas avaliações com atribuição completa.'
    } : {
        fallback: 'Consultá las opiniones y la calificación actual directamente en Google Maps.',
        count: n => `${new Intl.NumberFormat(locale).format(n)} ${n === 1 ? 'evaluación en Google' : 'evaluaciones en Google'}`,
        stars: n => `${n} de 5 estrellas`, source: 'Ver opinión en Google Maps',
        noText: 'Evaluación sin comentario.',
        selection: 'Hasta 5 opiniones, ordenadas por relevancia por Google. Textos en su idioma original; mostramos solo opiniones con atribución completa.'
    };
    const grid = section.querySelector('.reviews-grid');
    const score = section.querySelector('.gmn-score-number');
    const stars = section.querySelector('.gmn-stars');
    const count = section.querySelector('.gmn-text');
    const status = section.querySelector('.reviews-status');
    const details = section.querySelector('.reviews-details');
    const attribution = section.querySelector('.reviews-attribution');
    const interval = 30 * 60 * 1000;
    let visible = false, pending = false, lastAttempt = 0;

    const element = (tag, className, text) => {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    };
    const link = (url, text, className) => {
        const node = element('a', className, text);
        node.href = url;
        node.target = '_blank';
        node.rel = 'noopener noreferrer';
        return node;
    };
    function setStars(node, rating) {
        node.replaceChildren();
        node.setAttribute('aria-label', copy.stars(new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(rating)));
        node.setAttribute('role', 'img');
        for (let i = 1; i <= 5; i++) {
            const icon = element('i', rating >= i ? 'fas fa-star' : rating >= i - 0.5 ? 'fas fa-star-half-alt' : 'far fa-star');
            icon.setAttribute('aria-hidden', 'true');
            node.append(icon);
        }
    }
    function fallback() {
        grid.replaceChildren(); grid.hidden = true;
        score.textContent = ''; score.hidden = true;
        stars.replaceChildren(); stars.hidden = true;
        count.textContent = pt ? 'Ver avaliações no Google' : 'Ver opiniones en Google';
        status.textContent = copy.fallback;
        details.hidden = true;
        attribution.replaceChildren();
    }
    function render(data) {
        if (data.status !== 'ok' || !Number.isSafeInteger(data.userRatingCount) || data.userRatingCount < 0 ||
            (data.userRatingCount > 0 && !(data.rating >= 1 && data.rating <= 5)) || !Array.isArray(data.reviews)) {
            fallback(); return;
        }
        const hasRating = data.userRatingCount > 0;
        score.hidden = !hasRating; stars.hidden = !hasRating;
        score.textContent = hasRating ? new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(data.rating) : '';
        if (hasRating) setStars(stars, data.rating);
        else stars.replaceChildren();
        count.textContent = copy.count(data.userRatingCount);
        // Same-origin endpoint returns only validated Google URLs and plain text.
        section.querySelector('.gmn-score-card').href = data.reviewsUrl;
        section.querySelector('[data-all-reviews]').href = data.reviewsUrl;
        section.querySelector('[data-write-review]').href = data.writeReviewUrl;
        section.querySelector('[data-reviews-terms]').href = data.termsUrl;
        section.querySelector('[data-reviews-privacy]').href = data.privacyUrl;
        const cards = data.reviews.slice(0, 5).map(review => {
            const card = element('article', 'review-card');
            const rating = element('div', 'review-stars'); setStars(rating, review.rating);
            const text = element('p', 'review-text', review.text || copy.noText);
            if (review.languageCode) text.lang = review.languageCode;
            const author = element('div', 'review-author');
            if (review.author.photoUrl) {
                const avatar = element('img', 'author-avatar');
                avatar.src = review.author.photoUrl; avatar.alt = ''; avatar.width = 45; avatar.height = 45;
                avatar.loading = 'lazy'; avatar.referrerPolicy = 'no-referrer';
                avatar.addEventListener('error', () => avatar.remove(), { once: true });
                const avatarLink = link(review.author.url, undefined);
                avatarLink.setAttribute('aria-label', review.author.name);
                avatarLink.append(avatar); author.append(avatarLink);
            }
            const info = element('div', 'author-info');
            const name = element('h3'); name.append(link(review.author.url, review.author.name)); info.append(name);
            if (review.publishTime) {
                const date = element('time', null, new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(new Date(review.publishTime)));
                date.dateTime = review.publishTime; info.append(date);
            }
            author.append(info);
            card.append(rating, text, author, link(review.sourceUrl, copy.source, 'review-source'));
            return card;
        });
        grid.replaceChildren(...cards); grid.hidden = cards.length === 0;
        status.textContent = cards.length ? copy.selection : (pt ? 'Veja todas as avaliações no Google Maps.' : 'Consultá todas las opiniones en Google Maps.');
        details.hidden = false;
        attribution.replaceChildren(...data.attributions.map(a => a.url ? link(a.url, a.name) : element('span', null, a.name)));
    }
    async function refresh() {
        if (!visible || document.hidden || pending || Date.now() - lastAttempt < interval) return;
        pending = true; lastAttempt = Date.now(); section.setAttribute('aria-busy', 'true');
        try {
            const response = await fetch('/api/google-reviews', { cache: 'no-store', signal: AbortSignal.timeout(8000) });
            if (!response.ok) throw new Error('reviews_unavailable');
            render(await response.json());
        } catch { fallback(); }
        finally { pending = false; section.removeAttribute('aria-busy'); }
    }
    if ('IntersectionObserver' in window) {
        new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) refresh(); }).observe(section);
    } else {
        const check = () => { const rect = section.getBoundingClientRect(); visible = rect.top < innerHeight && rect.bottom > 0; if (visible) refresh(); };
        window.addEventListener('scroll', check, { passive: true }); check();
    }
    setInterval(refresh, interval);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh(); });
    window.addEventListener('pagehide', fallback);
    window.addEventListener('pageshow', event => { if (event.persisted) { lastAttempt = 0; refresh(); } });
})();
