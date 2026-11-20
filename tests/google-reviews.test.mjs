import test from 'node:test';
import assert from 'node:assert/strict';
import { createLoader, normalizePlace, PLACE_ID } from '../lib/google-reviews.mjs';
import { GET } from '../api/google-reviews.mjs';

// Synthetic test data only. Never served by the deployed endpoint.
const env = {
    GOOGLE_REVIEWS_ENABLED: 'true', GOOGLE_PLACES_API_KEY: 'test-only-never-a-real-key', GOOGLE_PLACE_ID: PLACE_ID,
    GOOGLE_REVIEWS_TERMS_URL: 'https://www.vitalemedicine.com.py/test-terms',
    GOOGLE_REVIEWS_PRIVACY_URL: 'https://www.vitalemedicine.com.py/test-privacy'
};
export const fixture = () => ({
    id: PLACE_ID, displayName: { text: 'VITALE MEDICINE TEST' },
    internationalPhoneNumber: '+595 985 858524', websiteUri: 'https://www.vitalemedicine.com.py',
    rating: 4.6, userRatingCount: 17,
    reviews: Array.from({ length: 7 }, (_, i) => ({
        rating: i === 0 ? 1 : 5, originalText: { text: 'TEST ONLY <script> & "original"\nsegunda linha', languageCode: 'pt' },
        publishTime: '2026-11-01T12:00:00Z',
        authorAttribution: { displayName: `TEST AUTHOR ${i}`, uri: `https://www.google.com/maps/contrib/${i}`, photoUri: 'https://lh3.googleusercontent.com/test' },
        googleMapsUri: `https://www.google.com/maps/reviews/${i}`
    })),
    attributions: [{ provider: 'TEST PROVIDER', providerUri: 'https://www.google.com/' }],
    googleMapsLinks: { reviewsUri: 'https://www.google.com/maps/reviews', writeAReviewUri: 'https://www.google.com/maps/write' }
});
const ok = () => new Response(JSON.stringify(fixture()));

test('disabled or incomplete configuration never calls Google', async () => {
    for (const key of Object.keys(env)) {
        const config = { ...env }; delete config[key];
        const load = createLoader({ env: config, fetchImpl: () => assert.fail('must not call Google') });
        assert.deepEqual(await load(), { status: 200, body: { status: 'unavailable' } });
    }
});
test('rejects a different clinic, even with a matching ID', () => {
    for (const change of [{ id: 'wrong' }, { displayName: { text: 'OTHER CLINIC' } }, { internationalPhoneNumber: '123', websiteUri: 'https://example.com' }]) {
        assert.throws(() => normalizePlace({ ...fixture(), ...change }), /identity/);
    }
});
test('preserves original review bytes and Google order, including negative ratings; caps at five', () => {
    const input = fixture(), result = normalizePlace(input);
    assert.equal(result.userRatingCount, 17); assert.equal(result.rating, 4.6);
    assert.equal(result.reviews.length, 5); assert.equal(result.reviews[0].rating, 1);
    assert.equal(result.reviews[0].text, input.reviews[0].originalText.text);
    assert.equal(result.reviews[0].author.name, 'TEST AUTHOR 0');
    assert.equal(result.attributions.length, 1);
});
test('omits incomplete attribution and unsafe URLs, never fabricates an author or translation', () => {
    const input = fixture();
    input.reviews[0].authorAttribution.uri = 'javascript:alert(1)';
    input.reviews[1].googleMapsUri = 'https://google.com.evil.example/';
    input.reviews[2].originalText = undefined; input.reviews[2].text = { text: 'translated text' };
    input.reviews[3].authorAttribution.displayName = '';
    input.reviews[4].authorAttribution.photoUri = 'https://evil.example/image';
    const result = normalizePlace(input);
    assert.equal(result.reviews.length, 1); assert.equal(result.reviews[0].author.photoUrl, null);
});
test('zero reviews is distinct from unavailable and never creates a rating', () => {
    const result = normalizePlace({ ...fixture(), rating: undefined, userRatingCount: 0, reviews: [] });
    assert.equal(result.rating, null); assert.equal(result.userRatingCount, 0); assert.deepEqual(result.reviews, []);
});
test('rejects invalid aggregate numbers', () => {
    for (const change of [{ rating: 6 }, { rating: '5' }, { userRatingCount: -1 }, { userRatingCount: 2.5 }, { userRatingCount: undefined }]) {
        assert.throws(() => normalizePlace({ ...fixture(), ...change }), /invalid_rating/);
    }
});
test('only fixed endpoint and field mask are used; key stays in upstream header', async () => {
    const load = createLoader({ env, fetchImpl: async (url, options) => {
        assert.equal(url, `https://places.googleapis.com/v1/places/${PLACE_ID}?languageCode=es`);
        assert.equal(options.headers['X-Goog-Api-Key'], env.GOOGLE_PLACES_API_KEY);
        assert.match(options.headers['X-Goog-FieldMask'], /rating,userRatingCount,reviews/);
        assert.equal(options.cache, 'no-store'); assert.equal(options.redirect, 'error');
        return ok();
    }});
    const response = await load();
    assert.equal(response.status, 200); assert.equal(response.body.status, 'ok');
    assert.ok(!JSON.stringify(response).includes(env.GOOGLE_PLACES_API_KEY));
});
test('coalesces concurrent requests, but never retains resolved Google data', async () => {
    let calls = 0, release;
    const gate = new Promise(r => { release = r; });
    const load = createLoader({ env, fetchImpl: async () => { calls++; await gate; return ok(); } });
    const first = load(), second = load(); release();
    await Promise.all([first, second]); assert.equal(calls, 1);
    await load(); assert.equal(calls, 2);
});
test('failures do not leak API error bodies; circuit breaker expires without serving stale data', async () => {
    let clock = 100, calls = 0;
    const logs = [];
    const load = createLoader({ env, now: () => clock, log: (...args) => logs.push(args), fetchImpl: async () => {
        calls++; return calls === 1 ? new Response('sensitive upstream content', { status: 429 }) : ok();
    }});
    assert.deepEqual(await load(), { status: 503, body: { status: 'unavailable' } });
    await load(); assert.equal(calls, 1);
    assert.ok(!JSON.stringify(logs).includes('sensitive'));
    clock += 60_001; assert.equal((await load()).body.status, 'ok'); assert.equal(calls, 2);
});
test('timeout, invalid JSON and identity mismatch use the safe fallback', async () => {
    for (const fetchImpl of [async () => { throw new DOMException('test timeout', 'TimeoutError'); }, async () => new Response('{'), async () => new Response(JSON.stringify({ ...fixture(), id: 'wrong' }))]) {
        assert.deepEqual(await createLoader({ env, fetchImpl, log: () => {} })(), { status: 503, body: { status: 'unavailable' } });
    }
});
test('Vercel GET returns no-store on every cache layer and a credential-free fallback without configuration', async () => {
    const response = await GET();
    for (const header of ['Cache-Control', 'CDN-Cache-Control', 'Vercel-CDN-Cache-Control']) assert.equal(response.headers.get(header), 'no-store');
    assert.deepEqual(await response.json(), { status: 'unavailable' });
});
