# SEO + AI-Search Playbook — Niramay Hospital / Dr. Prasad Sor

**Goal:** rank top of Google for cancer searches in Akola, appear in Google AI
Overviews, and get recommended by ChatGPT / Perplexity / Gemini for relevant topics.

**Honest expectation:** nobody can *guarantee* the #1 spot or a guaranteed AI
recommendation — Google and ChatGPT don't sell that, and anyone who promises it is
lying. But the code side is now done well, and for a doctor in Akola the competition is
weak. With the off-page steps below (especially Google Business Profile + reviews), you
should realistically reach the top of local results within **4–12 weeks**, and start
appearing in AI answers as the new pages get crawled and cited.

There are two halves: **(1) what's already built in the code** ✅ and **(2) what only
you can do** (off the website) — that second half is where most of the ranking actually
comes from.

---

## ✅ Part 1 — Already done in the code

- Domain wired to `https://niramay-hospital.co.in` (canonical, OG, sitemap, schema).
- Rich structured data (`@graph`): Hospital, Dr. Prasad Sor, Dr. Shraddha Sor, FAQ,
  WebSite, MedicalWebPage — this is what feeds Google rich results and AI answers.
- `robots.txt` — allows Google **and** AI crawlers (GPTBot, PerplexityBot, etc.).
- `sitemap.xml` — lists all 9 pages.
- `llms.txt` — a plain-language brief AI engines read to cite you accurately.
- **8 new content pages** (bilingual Marathi + English) targeting real searches:
  - `cancer-treatment-akola.html` (local hub)
  - `breast-cancer-treatment-akola.html`
  - `oral-mouth-cancer-treatment-akola.html`
  - `head-neck-cancer-treatment-akola.html`
  - `cervical-cancer-treatment-akola.html`
  - `gastrointestinal-cancer-treatment-akola.html`
  - `cancer-symptoms-warning-signs.html`
  - `what-is-surgical-oncology.html`
- Internal links from the homepage to every page (Google needs these to find them).

### One code TODO before launch
- **Exact map coordinates.** I used approximate Akola coords (`20.7050, 77.0090`).
  Open Google Maps → find Niramay Hospital → right-click the exact spot → click the
  lat/long to copy → replace the numbers in `index.html` (the `geo.position`, `ICBM`
  meta tags and the `"geo"` block in the JSON-LD).

---

## 🔴 Part 2 — What only you can do (biggest impact, do these first)

### 1. Google Business Profile (GBP) — THE #1 lever for local search
This is the map "pack" that shows up for "oncologist in Akola". It matters more than the
website for local searches. You said you're not sure who manages it — find out:

1. Search **"Niramay Hospital Akola"** on Google. If a business panel shows on the right:
   - Look for **"Own this business?"** or **"Claim this business"** → click and verify
     (Google sends a postcard/phone/email code).
   - If it says "managed by someone else", click **"Request access"** — Google emails the
     current manager; if no response in 7 days you can claim it.
2. If nothing exists, create one at **business.google.com** (free).
3. Once you control it, optimize:
   - **Primary category:** "Oncologist" (also add "Surgical oncologist", "Cancer
     treatment center", "Hospital").
   - Complete **every** field: address, phone `+91 724 2411386`, hours (Mon–Sat 9–6),
     website `https://niramay-hospital.co.in`, services (list each cancer type).
   - Upload **20+ real photos** (exterior, OT, reception, doctors) — you already have
     these in `assets/`. Profiles with photos get far more clicks.
   - Add the doctors, write a description (use the text from `llms.txt`).
   - Post updates monthly (a "Google Post") — even short ones signal activity.
   - **Make sure NAP (Name, Address, Phone) is byte-for-byte identical to the website.**

### 2. Google reviews — the second biggest local lever
Star count + number of reviews directly affects ranking AND whether people click.
- Get your GBP "review link" (Profile → Ask for reviews → copy link).
- Ask **every satisfied patient** to leave a Google review. The single most effective
  tactic: a small printed card / WhatsApp message with the direct link + a QR code at the
  reception desk.
- Reply to every review (even one word) — Google rewards engagement.
- Aim for a steady trickle (e.g. 4–8/month) rather than 50 at once (looks unnatural).

### 3. Submit the site to Google & Bing (do this the day DNS goes live)
- **Google Search Console** (search.google.com/search-console):
  1. Add property `niramay-hospital.co.in` (Domain property → add the DNS TXT record it
     gives you, in the same Vercel/registrar DNS panel).
  2. Submit `https://niramay-hospital.co.in/sitemap.xml`.
  3. Use **URL Inspection → Request indexing** on the homepage + each new page to speed
     up crawling.
- **Bing Webmaster Tools** (bing.com/webmasters) — same: add site, submit sitemap.
  (Bing also powers ChatGPT search results, so this helps AI visibility too.)

### 4. Directory listings (consistent NAP = trust signal + more places to be found)
Claim/create a free listing on each, with **identical** name/address/phone + website:
- **Practo** (practo.com) — patients search here a lot; create a doctor profile.
- **Justdial** — you already have 269+ ratings there; claim the listing, add the website.
- **Lybrate**, **Sehat**, **DoctoriDuniya**, **Curofy**, **Bing Places**, **Apple Maps**
  (mapsconnect.apple.com), **Facebook Page**, **Instagram** (link the website in bio).
- These "citations" are how search engines confirm you're a real, consistent business.

### 5. Backlinks (raises overall authority — slower but compounding)
- Get listed by: the Indian Medical Association (IMA) Akola chapter, the hospital's
  affiliations, any medical college alumni page (Tata Memorial fellowship network), local
  Akola news / health articles.
- A short interview or guest health article in a local Marathi paper/website with a link
  back is gold.

---

## 🤖 Part 3 — Getting recommended by ChatGPT / AI answers (GEO)

AI engines recommend sources that are (a) crawlable, (b) clearly factual, (c) mentioned
in multiple places online. The code already does (a) and (b). To win (c):

- The more your name + "Akola" + "oncologist" appears consistently across Google
  Business Profile, Practo, Justdial, Facebook, news, etc., the more AI models "learn"
  you as *the* answer for cancer care in Akola. **Parts 2.1–2.5 are also your AI
  strategy** — they're the same work.
- The FAQ-style content on every new page is deliberately written the way people ask
  questions ("Where can I get cancer treatment in Akola?") — that's the format AI quotes.
- `llms.txt` gives AI a clean fact sheet; keep it accurate.
- Once live, test it: ask ChatGPT/Perplexity "best cancer surgeon in Akola" periodically.
  It improves as the site is crawled and citations grow (weeks, not days).

---

## ⚠️ Before you publish — verify with the doctor
Per the project README, the medical content (qualifications, cancer details) was drafted
from public sources and AI. **Dr. Sor should read every page once** and confirm:
- All medical statements are accurate and how he'd phrase them.
- Phone `+91 724 2411386`, fee ₹500, address, and hours are correct.
- The 4.7★ / 269 rating in the schema matches the real Justdial number (update if changed).

---

## ➕ How to add more condition pages later
Copy any existing condition page (e.g. `breast-cancer-treatment-akola.html`), then:
1. Rename the file (use a keyword-rich name like `lung-cancer-treatment-akola.html`).
2. Update `<title>`, meta description, canonical, OG url, and the JSON-LD `@id`s + FAQ.
3. Replace the `<article>` content (keep the `lx-mr`/`lx-en` bilingual pairs).
4. Add the URL to `sitemap.xml` and a link to it from the homepage resources block
   (in `index.html`, the `<nav class="related">` block) + `llms.txt`.

---

## Quick launch checklist
- [ ] Point `niramay-hospital.co.in` DNS at the Vercel project, redeploy.
- [ ] Replace approximate map coords in `index.html`.
- [ ] Doctor verifies all content + phone/fee/address.
- [ ] Claim & fully optimize Google Business Profile.
- [ ] Set up the patient-review request flow (card + QR at reception).
- [ ] Google Search Console + Bing: add site, submit sitemap, request indexing.
- [ ] Claim Practo / Justdial / Facebook / Apple Maps with identical NAP.
