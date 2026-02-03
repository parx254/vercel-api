# Vercel Deployment Package

This folder contains everything needed for the AI proxy.

## What's inside:
- `api/claude.js` - The serverless function
- `vercel.json` - Configuration
- `package.json` - Project metadata

## Deploy:
1. Drag this ENTIRE folder to https://vercel.com/new
2. After deploy: Settings → Environment Variables
3. Add: ANTHROPIC_API_KEY = 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
4. Redeploy from Deployments tab

Your endpoint: https://YOUR-PROJECT.vercel.app/api/claude
