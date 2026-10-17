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

## Hostinger deploy (static, current)
The live site is a static export on Hostinger shared hosting. Deploy with:

```bash
npm run deploy
```

This builds with `STATIC_EXPORT=1` (which skips the `app/api` route handlers,
since they can't be exported), backs up the live `public_html` to
`~/public_html-backup-<timestamp>.tar.gz` on the server (last 5 kept), and
uploads `out/` over SSH. The API routes are served on Hostinger by
`public/.htaccess` and `public/api/appointment-request.php`.

Requires key-based SSH access via a `teleemon` host alias in `~/.ssh/config`:

```
Host teleemon
    HostName 82.180.138.213
    Port 65002
    User u135048259
    IdentityFile ~/.ssh/id_ed25519
```

Override with `DEPLOY_HOST` / `DEPLOY_PATH` env vars if needed.

## Hostinger deploy (Node.js alternative)
1. Use Hostinger **Node.js** hosting (or VPS) for Next.js.
2. Set the same env vars as `.env.example` in the panel.
3. Build command: `npm run build`
4. Start command: `npm run start` (or Hostinger’s Node start)

Legacy static HTML and the PHP mailer are preserved under `_legacy/` for reference.
