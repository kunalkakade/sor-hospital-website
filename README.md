# Dr. Prasad Sor — Niramay Hospital, Akola

Bilingual (Marathi-first / English) website for **Dr. Prasad Sor**, Consultant Surgical
Oncologist at **Niramay Hospital, Akola** (Advanced Cancer Care Centre).

Static site — plain HTML/CSS/JS, no build step. Mobile-first, fast, deploy anywhere.

## Run locally

```bash
# from this folder
python3 -m http.server 8000
# open http://localhost:8000
```

## Features

- **Marathi default + one-tap English toggle** (top-right ⇄ button). Choice is remembered.
  All copy lives in `js/i18n.js` — edit text there, never in `index.html`.
- Click-to-call, floating WhatsApp, and a sticky mobile action bar (Call / WhatsApp / Book).
- Appointment form → composes a filled WhatsApp message to the clinic (no server needed).
- Sections: Hero, trust badges, About, Our Doctors (Dr. Prasad & Dr. Shraddha Sor),
  Cancers treated, Treatment journey, Online consultation, Testimonials, FAQ, Book + map.
- SEO meta + `Physician` JSON-LD structured data. Accessible (skip link, focus states,
  reduced-motion support).

## Edit these before going live

| What | Where |
|------|-------|
| Phone / WhatsApp number (currently `+91 7242411386`) | search `7242411386` in `index.html`, `js/main.js` |
| Real photos of the doctors (placeholders show initials) | `.portrait`, `.about__photo`, `.doctor__avatar` in `index.html` + `css/styles.css` |
| Any text in either language | `js/i18n.js` (`I18N.mr` and `I18N.en`) |
| Map location / address | `index.html` (the `<iframe>` and `contact.addr` key) |
| Canonical domain | `<link rel="canonical">` + `og:` tags in `index.html` |

> **Note:** Source details (qualifications, doctors, cancer types) were taken from the clinic's
> existing site (softspectra.co/webapp/niramay-hospital) and public listings. Please have
> Dr. Sor verify all medical claims and the phone number before publishing.

### Live Google Reviews widget
The reviews section shows the **Justdial** rating by default. To switch it to **live, auto-updating
Google reviews**, open `js/reviews.js` and paste a Google API key into `GOOGLE_PLACES_API_KEY`
(Place ID is already set). Full step-by-step (enable *Places API (New)*, create + restrict the key)
is in the comment at the top of that file. Results cache in the browser for 12h to keep API calls low.
Without a key, nothing breaks — the Justdial reviews remain.

### Photos
- Doctor portraits + 8 facility photos (exterior, OT, equipment, reception, ward, cabin) were taken
  from the clinic's own existing site and live under `assets/` and `assets/facility/`.
- Photos that showed **identifiable patients** were deliberately excluded for privacy. If the clinic
  has consent, those can be added.

### Optional — email the form instead of WhatsApp
Sign up at [formspree.io](https://formspree.io), then in `js/main.js` `form.addEventListener("submit"...)`
POST `data` to your Formspree endpoint instead of (or alongside) opening WhatsApp.

## Deploy

- **Vercel:** `vercel` (or drag the folder into the dashboard) — auto-detected as static.
- **Netlify / GitHub Pages:** publish this folder as-is.

## Structure

```
index.html        markup + i18n hooks (data-i18n="key")
css/styles.css    all styling (warm clinical theme, Fraunces + Tiro Devanagari Marathi)
js/i18n.js        translation dictionary + language switch
js/main.js        nav, scroll reveal, form → WhatsApp
```

## SEO & AI-search setup

The site is tuned to rank on Google and be cited by AI assistants (ChatGPT, Perplexity,
Google AI Overviews). See **`SEO-GEO-GUIDE.md`** for the full playbook — including the
off-website steps (Google Business Profile, reviews, directory listings) that drive most
of the local ranking.

What's in the repo for SEO:

| File | Purpose |
|------|---------|
| `robots.txt` | Allows Google + AI crawlers; points to the sitemap |
| `sitemap.xml` | Lists all 9 pages (update when adding pages) |
| `llms.txt` | Plain-language fact sheet AI engines read to cite the clinic |
| Rich JSON-LD in `index.html` | Hospital + both doctors + FAQ + WebSite entity graph |

### Content pages (bilingual, target real searches)

Each cancer/topic page is standalone, Marathi-first with an English toggle (both
languages live in the HTML via `.lx-mr` / `.lx-en` classes so search engines read both):

- `cancer-treatment-akola.html` — local hub ("cancer treatment in Akola")
- `breast-cancer-treatment-akola.html`
- `oral-mouth-cancer-treatment-akola.html`
- `head-neck-cancer-treatment-akola.html`
- `cervical-cancer-treatment-akola.html` (Dr. Shraddha Sor)
- `gastrointestinal-cancer-treatment-akola.html`
- `cancer-symptoms-warning-signs.html`
- `what-is-surgical-oncology.html`

To add a new condition page, copy an existing one — full steps are in `SEO-GEO-GUIDE.md`.

> **All URLs/schema use the domain `https://niramay-hospital.co.in`.** One code TODO
> before launch: replace the approximate map coordinates in `index.html` with the exact
> pin from Google Maps (see the guide).
