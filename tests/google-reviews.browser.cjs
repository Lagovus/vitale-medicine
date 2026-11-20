// Local-only integration harness. Never connects to the billable Google endpoint.
const assert = require('node:assert/strict');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

(async () => {
    const root = path.resolve(__dirname, '..');
    const { createLoader, PLACE_ID } = await import(pathToFileURL(path.join(root, 'lib/google-reviews.mjs')));
    let mode = 'success', calls = 0;
    const sample = () => ({
        id: PLACE_ID, displayName: { text: 'VITALE MEDICINE TEST' }, internationalPhoneNumber: '+595985858524',
        rating: 4.6, userRatingCount: mode === 'zero' ? 0 : 17,
        reviews: mode === 'zero' ? [] : Array.from({ length: 5 }, (_, i) => ({
            rating: i === 0 ? 1 : 5,
            originalText: { text: 'TEST ONLY: texto original <script>alert(1)</script> & "citação".\n' + 'Texto de teste. '.repeat(12), languageCode: 'pt' },
            publishTime: '2026-11-01T12:00:00Z',
            authorAttribution: { displayName: `TEST AUTHOR ${i} ${'NomeLongo'.repeat(4)}`, uri: `https://www.google.com/maps/contrib/${i}` },
            googleMapsUri: `https://www.google.com/maps/reviews/${i}`
        })),
        attributions: [{ provider: 'TEST PROVIDER', providerUri: 'https://example.com/provider' }]
    });
    const config = {
        GOOGLE_REVIEWS_ENABLED: 'true', GOOGLE_PLACES_API_KEY: 'local-test-not-a-key', GOOGLE_PLACE_ID: PLACE_ID,
        GOOGLE_REVIEWS_TERMS_URL: 'https://www.vitalemedicine.com.py/test-terms',
        GOOGLE_REVIEWS_PRIVACY_URL: 'https://www.vitalemedicine.com.py/test-privacy'
    };
    const load = createLoader({ env: config, log: () => {}, fetchImpl: async () => {
        calls++;
        return new Response(JSON.stringify(sample()));
    }});
    const server = http.createServer(async (req, res) => {
        if (req.url === '/api/google-reviews') {
            res.setHeader('Content-Type', 'application/json'); res.setHeader('Cache-Control', 'no-store');
            if (mode === 'error') { res.writeHead(503).end('{"status":"unavailable"}'); return; }
            if (mode === 'missing') { res.end('{"status":"unavailable"}'); return; }
            const response = await load(); res.writeHead(response.status).end(JSON.stringify(response.body)); return;
        }
        const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
        const file = path.resolve(root, '.' + name);
        if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
        try {
            const data = await fs.readFile(file);
            const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png', '.jpeg': 'image/jpeg' };
            res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream'); res.end(data);
        } catch { res.writeHead(404).end(); }
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    const base = `http://127.0.0.1:${server.address().port}`;
    const browser = await chromium.launch({
        ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}), headless: true
    });
    const output = process.env.QA_OUTPUT;
    if (output) await fs.mkdir(output, { recursive: true });
    let cases = 0;
    try {
        for (const file of ['index.html', 'pt.html']) for (const width of [320, 375, 430, 768, 1101, 1440]) {
            for (const state of ['success', 'missing', 'error', 'zero']) {
                mode = state;
                const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
                const errors = []; page.on('pageerror', error => errors.push(error.message));
                await page.clock.install();
                await page.goto(`${base}/${file}`, { waitUntil: 'domcontentloaded' });
                await page.locator('#reviews').scrollIntoViewIfNeeded();
                await page.waitForFunction(() => !document.querySelector('#reviews').hasAttribute('aria-busy'));
                if (state === 'success') {
                    await page.locator('.review-card').first().waitFor();
                    assert.equal(await page.locator('.review-card').count(), 5);
                    assert.equal(await page.locator('.gmn-score-number').innerText(), '4,6');
                    assert.match(await page.locator('.gmn-text').innerText(), /17/);
                    assert.match(await page.locator('.review-text').first().innerText(), /<script>alert\(1\)<\/script>/);
                    assert.equal(await page.locator('#reviews script').count(), 0);
                    assert.equal(await page.locator('.review-source').count(), 5);
                    assert.equal(await page.locator('.reviews-attribution a').getAttribute('href'), 'https://example.com/provider');
                    assert.equal(await page.locator('.reviews-details').isVisible(), true);
                    // Refresh after success must clear stale scores/cards on error.
                    if (width === 320) {
                        mode = 'error'; await page.clock.fastForward(30 * 60 * 1000 + 1);
                        await page.waitForFunction(() => document.querySelector('.gmn-score-number').hidden);
                        assert.equal(await page.locator('.review-card').count(), 0);
                        mode = 'success';
                    }
                } else {
                    await page.waitForFunction(() => document.querySelector('.gmn-score-number').hidden);
                    assert.equal(await page.locator('.review-card').count(), 0);
                    if (state === 'zero') await page.waitForFunction(() => document.querySelector('.gmn-text').textContent.startsWith('0 '));
                }
                assert.deepEqual(errors, []);
                const overflow = await page.locator('#reviews').evaluate(section => [...section.querySelectorAll('*')].filter(node => {
                    const r = node.getBoundingClientRect(); return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1);
                }).map(node => node.className));
                assert.deepEqual(overflow, [], `${file} ${width} ${state}`);
                await page.locator('[data-all-reviews]').focus();
                assert.notEqual(await page.locator('[data-all-reviews]').evaluate(a => getComputedStyle(a).outlineStyle), 'none');
                if (output && [320, 1440].includes(width) && ['success', 'missing'].includes(state)) {
                    await page.locator('#reviews').screenshot({ path: path.join(output, `${file}-${width}-${state}.png`) });
                }
                await page.close(); cases++;
            }
        }
        for (const file of ['index.html', 'pt.html']) {
            const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 320, height: 900 } });
            await page.goto(`${base}/${file}`);
            assert.equal(await page.locator('.review-card').count(), 0);
            assert.equal(await page.locator('.gmn-score-number').isVisible(), false);
            assert.equal(await page.locator('[data-all-reviews]').getAttribute('href').then(h => h.includes(PLACE_ID)), true);
            await page.close(); cases++;
        }
        console.log(JSON.stringify({ browserCasesPassed: cases, mockedUpstreamCalls: calls, realGoogleApiCalls: 0 }));
    } finally { await browser.close(); server.close(); }
})().catch(error => { console.error(error); process.exit(1); });
