# Teleemon Behavioral Health — Next.js

## Develop
```bash
npm install
cp .env.example .env.local   # add Hostinger SMTP password
npm run dev
```

Open http://localhost:3000

## Pages
- `/` Home
- `/our-team`
- `/services`
- `/treatments`
- `/resources`
- `/privacy-policy`
- `/request-appointment` (form → `/api/appointment-request` email)

## Hostinger deploy
1. Use Hostinger **Node.js** hosting (or VPS) for Next.js.
2. Set the same env vars as `.env.example` in the panel.
3. Build command: `npm run build`
4. Start command: `npm run start` (or Hostinger’s Node start)

Legacy static HTML and the PHP mailer are preserved under `_legacy/` for reference.
