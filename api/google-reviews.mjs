// Native Node.js Vercel Function. No key or Google content is sent to logs.
import { loadGoogleReviews } from '../lib/google-reviews.mjs';

export async function GET() {
    const result = await loadGoogleReviews();
    return Response.json(result.body, {
        status: result.status,
        headers: {
            'Cache-Control': 'no-store',
            'CDN-Cache-Control': 'no-store',
            'Vercel-CDN-Cache-Control': 'no-store',
            'X-Content-Type-Options': 'nosniff',
            ...(result.status === 503 ? { 'Retry-After': '60' } : {})
        }
    });
}
