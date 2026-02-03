// api/claude.js — Vercel Serverless Function
// Proxies requests to Anthropic so the API key stays server-side.
//
// Setup:
//   1. Push this repo to GitHub, then import it at https://vercel.com
//   2. In your Vercel project → Settings → Environment Variables, add:
//        Name:  ANTHROPIC_API_KEY
//        Value: (your key from https://console.anthropic.com)
//   3. Done — no other config needed.

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'ANTHROPIC_API_KEY environment variable is not set.' });
    }

    try {
        const upstream = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify(req.body)
        });

        const data = await upstream.json();
        res.status(upstream.status).json(data);
    } catch (err) {
        res.status(502).json({ error: 'Failed to reach Anthropic API', detail: err.message });
    }
}
