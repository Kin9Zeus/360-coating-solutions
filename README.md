# 360 Coating Solutions & 360 Painting and Wall Design — Website

A single-page luxury marketing site for the two Gomez-family companies, built as
one continuous **360° journey**: sections are marked in degrees (0° hero →
360° contact) and a dial in the corner fills as visitors travel the page.
The "Steel & Silk" design system expresses both brands — carbon + structural
type for Andrés's B2B coating business, warm sand + editorial serif for
Tatiana's residential design studio.

## Stack

- **React 19 + Vite** — builds to plain static files
- **Tailwind CSS v4** — design tokens in `src/index.css` (`@theme` block)
- **GSAP + ScrollTrigger** — entrance choreography, pinned Steel↔Silk gateway,
  parallax; fully disabled under `prefers-reduced-motion`
- **Self-hosted fonts** (Fraunces & Archivo variable) — no external requests,
  loads identically on every device/OS
- **Express + Resend** (`server/`) — the one dynamic piece: serves the built
  site and answers the contact form by email. See "Contact form" below.

## Run locally

The frontend and the contact-form backend are two separate processes in dev
(Vite's dev server does the frontend; Express only handles `/api/contact`).
Run both, in two terminals:

```bash
npm install
cp .env.example .env   # then fill in a real RESEND_API_KEY to test sending

npm run dev            # terminal 1 — http://localhost:5173
npm run server          # terminal 2 — the contact-form API on :3001
```

Vite proxies `/api/*` to the Express server (see `vite.config.js`), so the
form behaves in dev exactly as it will in production. Without a `.env`, the
form still works end-to-end — it just fails to *send* with a clear
"Email service is not configured yet" message, since there's no key.

```bash
npm run build      # production output in dist/
```

## Things you will want to edit

| What | Where |
|------|-------|
| Phone, email, service area, Facebook link | `src/content/site.js` → `CONTACT` (marked TODO) |
| Who receives contact-form submissions | env vars in Railway (see "Contact form" below) — never in the source code |
| Testimonials | `src/content/site.js` → `TESTIMONIALS` |
| Service lists | `src/content/site.js` → `COATING_SERVICES` / `PAINTING_SERVICES` |
| Photos | `src/assets/img/` (registry + alt text in `src/content/images.js`) |
| Brand colors & fonts | `src/index.css` `@theme` block |

## Deploying (Railway)

This project deploys as a single Node service on Railway, which runs
`server/index.js` — that one process serves the built site *and* answers
the contact form, so there's nothing to keep in sync between two hosts.

1. **Push this repo to GitHub** (private repo is fine) if you haven't yet.
2. **Railway → New Project → Deploy from GitHub repo.** If `site/` isn't the
   repo root, set **Settings → Root Directory** to `site`.
3. Railway auto-detects Node and runs `npm install`, then `npm run build`
   (produces `dist/`), then `npm start` (`node server/index.js`) — no extra
   config needed beyond the Root Directory above.
4. **Settings → Variables**, add:
   - `RESEND_API_KEY` — from Resend dashboard → API Keys (paste it directly
     here, never in a file that gets committed)
   - `RESEND_FROM` = `360 Coating Solutions <notifications@360coatingsolutions.com>`
   - `CONTACT_EMAIL_ADMIN` = `admin@360coatingsolutions.com` — every
     submission is delivered here today (see "Contact form" below for why
     that's still safe to split later if needed)
   (Railway sets `PORT` itself — leave that one alone.)
5. **Settings → Networking → Custom Domain**, add `360coatingsolutions.com`
   (and `www`). Railway shows a CNAME target.
6. In **Squarespace's domain DNS settings** (Squarespace only needs to hold
   the domain's DNS here, not host anything), add that CNAME record pointing
   `www` at Railway's target, and follow Railway's instructions for the root
   domain (usually an ALIAS/ANAME record, or a redirect from root → `www`
   depending on what your DNS provider supports).

## Contact form (Resend)

The form always posts to `/api/contact` on the same origin — no CORS setup,
no third-party form service, no client-exposed API key. `server/index.js`
validates the submission, then sends it by email via Resend. Both audiences
("I am a… Homeowner / Builder") currently land in one shared inbox,
`CONTACT_EMAIL_ADMIN` — but every email is tagged by type in its **subject
line** ("Homeowner inquiry — Jane Smith" vs. "Builder inquiry — …") and in
an `X-360-Inquiry-Type` header, so nothing is lost by sharing one address.
Set up a filter/label in that inbox matching the subject prefix if you want
the two types visually separated at a glance. If you ever want two separate
inboxes again, set `CONTACT_EMAIL_HOMEOWNER` / `CONTACT_EMAIL_BUILDER` in
Railway — each independently overrides the shared default, no code change.

### Verifying 360coatingsolutions.com in Resend (step by step)

Resend needs proof you own the sending domain before it will deliver mail
from it. This means adding a few DNS records — exact values are generated
per-account, but the steps are always the same shape:

**In Resend:**

1. Dashboard → **Domains** → **Add Domain** → enter `360coatingsolutions.com`.
2. Resend generates 2–3 records and shows them in a table — each row has a
   **Type** (`TXT` or `MX`), a **Host/Name**, and a **Value**. Keep this tab
   open; you'll copy from it in the next step.

**In Squarespace** (Domains → `360coatingsolutions.com` → DNS Settings →
"Custom Records" — this only works if the domain isn't set to Squarespace's
own email/G Suite preset, which it shouldn't be here):

3. For each row Resend showed you, click **Add Record** in Squarespace and
   fill in the matching fields:
   - **Type**: pick the same type Resend listed (`TXT` or `MX`).
   - **Host**: paste exactly what Resend shows (often something like
     `resend._domainkey` or `send` — *not* the full domain; Squarespace
     appends `360coatingsolutions.com` automatically). Use `@` only if
     Resend's host column is blank or literally says `@`.
   - **Data/Value**: paste Resend's value exactly, including any quotes.
   - **Priority**: only appears for `MX` records — use the number Resend
     gives (commonly `10`).
4. Save each record. Squarespace DNS changes are usually live in minutes,
   occasionally up to a few hours.
5. Back in the Resend tab, click **Verify Domain**. If it doesn't pass
   immediately, wait 15–20 minutes and retry before troubleshooting further
   — this is almost always just DNS propagation time, not a wrong value.
6. Once verified, `RESEND_FROM` (e.g.
   `360 Coating Solutions <notifications@360coatingsolutions.com>`) can
   send real mail. Until then, the form still works end-to-end but shows
   its honest error message ("Something went wrong… call us at
   (307) 251-7072") instead of pretending to succeed.

**Built-in protections**, all in `server/index.js`:

- **Honeypot field** — a real field named `website`, invisible to human
  visitors (see `Contact.jsx`), that only bots fill in. A filled honeypot
  is silently accepted and discarded — the bot never learns it was caught.
- **Rate limiting** — 5 submissions per IP per 10 minutes.
- **Header-injection guard** — every value that reaches an email header
  (name, reply-to) has newlines stripped first.
- **A missing `RESEND_API_KEY` never crashes the server** — only the
  contact form fails (with a clear message); the rest of the site keeps
  serving normally. This matters because the same process serves both.

## Hero scroll-film

The hero plays `src/assets/main_hero_section_video.mp4` (empty room →
sunlit luxury living room) under scroll control: scrolling down plays the
transformation, scrolling up rewinds it. It uses the **frame-sequence
canvas technique** — 72 pre-extracted WebP frames drawn to a `<canvas>`,
mapped 1:1 to scroll — because scrubbing a real `<video>`'s `currentTime`
is unreliable on iOS/Android. Frames live in `src/assets/frames/`
(~2.8 MB total, loaded progressively with nearest-loaded fallback).

To regenerate frames after replacing the video:

```bash
ffmpeg -i src/assets/main_hero_section_video.mp4 \
  -vf "select='not(mod(n\,2))',scale=1440:-2" -vsync vfr \
  -c:v libwebp -quality 68 src/assets/frames/frame-%03d.webp -y
```

## Painting gallery reels

The "Walls that feel like home" gallery is a bento of Tatiana's five design
renderings as autoplaying, muted, looping video (`src/assets/videos/*-web.mp4`).
They're `playsInline` + `muted` (required for iOS/Android autoplay) and an
IntersectionObserver plays only the reels currently on screen, so we never
decode all five at once. Each has a WebP poster (the finished room) as the
pre-play frame and autoplay-blocked fallback.

The source `.mp4` files were re-encoded from the originals (~49 MB → ~5.5 MB)
to web-safe H.264. To regenerate after replacing a video, re-run
`scratchpad/encode_videos.ps1`-style ffmpeg (landscape → 1280×720, portrait →
720×1280):

```bash
ffmpeg -i input.mp4 -vf scale=1280:720 -c:v libx264 -crf 26 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an output-web.mp4
```

The playback pattern itself (autoplay muted loop, pause off-screen, poster
fallback) lives in the shared `src/components/VideoReel.jsx`, used by both
this gallery and the Specialty Trades reels below.

## Specialty Trades reels

The "Where paint ends, craft begins" section plays AI-generated (Veo 3.1)
video, encoded the same way as the painting gallery above and driven by the
same `VideoReel` component — without the "Rendering" badge, since these
depict the trades themselves rather than design visualizations.

The section runs in three movements: Venetian plaster as the hero, carpentry
and millwork as a two-up, then **exterior facade design** as a closing
diptych — two homes playing their before/after side by side, because the
proof of exterior work is the transformation itself.

## QA notes

- **Motion policy**: the signature moments — preloader dial, hero entrance,
  the pinned Steel↔Silk gateway with its gold beam sweep, and section scroll
  reveals — play for **every** visitor, including those whose OS requests
  reduced motion. Only genuinely uncomfortable *continuous* motion is quieted
  under reduced motion: the never-ending hero dial spin and the scroll-linked
  parallax (portrait/gallery drift, hero dial drift). This is a deliberate
  owner decision favoring brand feel; the strictest-accessibility alternative
  would gate the signature moments too. `?forcemotion` on the URL additionally
  enables the parallax/spin for QA on a reduced-motion machine.
- Preloader and hero have time-cap failsafes so content is never held hostage
  by a throttled tab or low-power device.
- Verified: no horizontal scroll at 375 px, zero-CLS images (all have
  width/height), keyboard-accessible lightbox and menu (Escape closes,
  focus managed), WCAG-AA contrast on text.
