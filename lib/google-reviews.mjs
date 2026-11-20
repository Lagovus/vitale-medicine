export const PLACE_ID = 'ChIJj5rLVjKF9pQR7s2XankEjf4';
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=Vitale%20Medicine&query_place_id=${PLACE_ID}`;
const FIELD_MASK = 'id,displayName,formattedAddress,internationalPhoneNumber,websiteUri,rating,userRatingCount,reviews,attributions,googleMapsLinks';

function googleUrl(value, image = false) {
    try {
        const url = new URL(value);
        const hosts = image ? ['googleusercontent.com', 'ggpht.com'] : ['google.com', 'maps.google.com'];
        return url.protocol === 'https:' && hosts.some(h => url.hostname === h || url.hostname.endsWith(`.${h}`)) ? url.href : null;
    } catch { return null; }
}

function providerUrl(value) {
    try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; }
    catch { return null; }
}

export function normalizePlace(place) {
    let website = '';
    try { website = new URL(place.websiteUri).hostname.replace(/^www\./, ''); } catch { /* Checked below. */ }
    const phone = String(place.internationalPhoneNumber || '').replace(/\D/g, '');
    if (place.id !== PLACE_ID || !/^VITALE\s+MEDICINE\b/i.test(place.displayName?.text || '') ||
        (phone !== '595985858524' && website !== 'vitalemedicine.com.py')) {
        throw new Error('place_identity_mismatch');
    }
    const count = place.userRatingCount;
    if (!Number.isSafeInteger(count) || count < 0 ||
        (count > 0 && !(typeof place.rating === 'number' && place.rating >= 1 && place.rating <= 5))) {
        throw new Error('invalid_rating');
    }
    const reviews = (Array.isArray(place.reviews) ? place.reviews : []).slice(0, 5).flatMap(review => {
        const author = review.authorAttribution;
        const sourceUrl = googleUrl(review.googleMapsUri);
        const authorUrl = googleUrl(author?.uri);
        // Never synthesize authors, badges, comments or translations. If attribution
        // is incomplete, omit the card; the total still comes directly from Google.
        if (!author?.displayName || !authorUrl || !sourceUrl ||
            !Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5 ||
            (review.text?.text && !review.originalText?.text)) return [];
        return [{
            rating: review.rating,
            text: review.originalText?.text || null,
            languageCode: review.originalText?.languageCode || null,
            publishTime: Number.isFinite(Date.parse(review.publishTime)) ? review.publishTime : null,
            sourceUrl,
            author: { name: author.displayName, url: authorUrl, photoUrl: googleUrl(author.photoUri, true) }
        }];
    });
    return {
        status: 'ok',
        rating: count > 0 ? place.rating : null,
        userRatingCount: count,
        reviews,
        mapsUrl: MAPS_URL,
        reviewsUrl: googleUrl(place.googleMapsLinks?.reviewsUri) || MAPS_URL,
        writeReviewUrl: googleUrl(place.googleMapsLinks?.writeAReviewUri) || MAPS_URL,
        attributions: (place.attributions || []).map(a => ({ name: a.provider, url: providerUrl(a.providerUri) })).filter(a => a.name),
        fetchedAt: new Date().toISOString()
    };
}

// Only concurrent requests share a pending promise. No resolved Google content
// is cached (memory, disk, CDN, browser storage or database). A failure timestamp
// is a local circuit breaker, not a shared rate limit or a billing safeguard.
export function createLoader({ env = process.env, fetchImpl = fetch, now = Date.now, log = console.warn } = {}) {
    let pending;
    let retryAt = 0;
    return async function load() {
        const policyUrl = value => {
            try { const url = new URL(value); return url.protocol === 'https:' && url.hostname.replace(/^www\./, '') === 'vitalemedicine.com.py' && url.pathname !== '/' ? url.href : null; }
            catch { return null; }
        };
        const termsUrl = policyUrl(env.GOOGLE_REVIEWS_TERMS_URL);
        const privacyUrl = policyUrl(env.GOOGLE_REVIEWS_PRIVACY_URL);
        if (env.GOOGLE_REVIEWS_ENABLED !== 'true' || !env.GOOGLE_PLACES_API_KEY || env.GOOGLE_PLACE_ID !== PLACE_ID || !termsUrl || !privacyUrl) {
            return { status: 200, body: { status: 'unavailable' } };
        }
        if (now() < retryAt) return { status: 503, body: { status: 'unavailable' } };
        if (pending) return pending;
        pending = (async () => {
            try {
                const response = await fetchImpl(`https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=es`, {
                    headers: { 'X-Goog-Api-Key': env.GOOGLE_PLACES_API_KEY, 'X-Goog-FieldMask': FIELD_MASK },
                    signal: AbortSignal.timeout(6000), cache: 'no-store', redirect: 'error'
                });
                if (!response.ok) throw new Error(`upstream_${response.status}`);
                return { status: 200, body: { ...normalizePlace(await response.json()), termsUrl, privacyUrl } };
            } catch (error) {
                retryAt = now() + 60_000;
                // Only known error codes: upstream payloads can contain sensitive data.
                const code = /^(upstream_\d{3}|place_identity_mismatch|invalid_rating)$/.test(error.message) ? error.message : 'upstream_unavailable';
                log('[google-reviews]', code);
                return { status: 503, body: { status: 'unavailable' } };
            }
        })();
        try { return await pending; }
        finally { pending = undefined; }
    };
}

export const loadGoogleReviews = createLoader();
