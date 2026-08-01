# Wedding Website

A single-page wedding website with expandable event details, Google Maps embeds, and Google Form RSVP. Built for free hosting on [GitHub Pages](https://pages.github.com/).

**Live URL (after deploy):** `https://<your-username>.github.io/weddingz/`

---

## Sections

- Hero with couple names, date, and tagline
- Countdown to wedding day
- Our Story
- Events accordion (Tilak, Haldi, Sangeet, Wedding)
- Map with venue embed
- Gallery (placeholder slots)
- RSVP via Google Form

---

## Test locally

This is a static site — no build step needed. Use the included Python virtual environment to preview it:

### 1. Activate the virtual environment

**Windows (PowerShell):**
```powershell
.\venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```cmd
venv\Scripts\activate.bat
```

**Mac / Linux:**
```bash
source venv/bin/activate
```

### 2. Start the local server

```bash
python serve.py
```

Your browser will open at **http://localhost:8000/** automatically.

Press `Ctrl+C` in the terminal to stop the server.

> **Note:** No extra packages are required — `serve.py` uses Python's built-in `http.server`.

---

## Deploy to GitHub Pages

### 1. Create the repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: **`weddingz`** (must match for project site URL)
3. Set visibility to Public (required for free GitHub Pages on personal accounts)
4. Do **not** initialize with README (you already have one)
5. Click **Create repository**

### 2. Push your code

Open a terminal in this folder and run:

```bash
git init
git add .
git commit -m "Initial wedding website"
git branch -M main
git remote add origin https://github.com/<your-username>/weddingz.git
git push -u origin main
```

Replace `<your-username>` with your GitHub username.

### 3. Enable GitHub Pages

1. Open your repo on GitHub
2. Go to **Settings → Pages**
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **`main`** / **`/ (root)`**
4. Click **Save**
5. Wait 1–2 minutes. Your site will be live at:

   `https://<your-username>.github.io/weddingz/`

### 4. Update the site later

After editing files locally:

```bash
git add .
git commit -m "Update wedding details"
git push
```

Changes appear on the live site within a minute or two.

---

## Customize content

### Couple names, date, RSVP link

Edit [`data/events.js`](data/events.js) — update the `WEDDING_CONFIG` object:

```js
const WEDDING_CONFIG = {
  coupleNames: 'Priya & Shivam',
  weddingDate: '2026-12-15',           // YYYY-MM-DD for countdown
  weddingDateDisplay: 'December 15, 2026',
  tagline: 'Two hearts, one beautiful journey',
  hashtag: '#PriyaAndShivam2026',
  primaryMapEmbed: '...',              // Google Maps embed URL
  rsvpFormUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform',
};
```

### Event details

Edit the `EVENTS` array in the same file — one object per event:

| Field | Description |
|-------|-------------|
| `id` | Unique slug (tilak, haldi, etc.) |
| `name` | Display name |
| `date` | Event date |
| `time` | Event time |
| `venue` | Venue name |
| `address` | Full address |
| `dressCode` | Dress code hint |
| `notes` | Extra info |
| `mapEmbed` | Google Maps embed iframe `src` URL |

### Our Story text

Edit the paragraphs in [`index.html`](index.html) inside the `#story` section.

### Photos

- **Hero:** Add `images/hero.jpg` (recommended: 1920×1080, compressed)
- **Gallery:** Replace placeholder divs in `index.html` with `<img>` tags, or add images to `images/gallery/` and update the gallery section

Compress photos at [squoosh.app](https://squoosh.app) or [tinypng.com](https://tinypng.com) before uploading.

---

## Google Form setup (RSVP)

1. Go to [forms.google.com](https://forms.google.com) and create a new form
2. Suggested fields:
   - Full name
   - Phone number
   - Will you attend? (Yes / No)
   - Number of guests
   - Which events will you attend? (Checkboxes: Tilak, Haldi, Sangeet, Wedding)
   - Dietary restrictions
   - Message for the couple
3. Click **Send → Link** and copy the form URL
4. Paste it into `WEDDING_CONFIG.rsvpFormUrl` in [`data/events.js`](data/events.js)
5. Optional: **Responses → Link to Sheets** to track RSVPs in a spreadsheet

**Important settings:**
- Turn **off** "Limit to 1 response" unless you need it
- Turn **off** "Require sign-in" so guests don't need a Google account

---

## Google Maps embed

For each venue:

1. Open [Google Maps](https://maps.google.com) and search for the venue
2. Click **Share → Embed a map**
3. Copy the iframe `src` URL (starts with `https://www.google.com/maps/embed?...`)
4. Paste into `mapEmbed` for that event in [`data/events.js`](data/events.js)
5. Set `primaryMapEmbed` to your main wedding venue map

---

## File structure

```
weddingz/
├── index.html          # Page layout and static sections
├── css/styles.css      # All styling
├── js/main.js          # Countdown, accordion, nav, dynamic events
├── data/events.js      # Event data and site config (edit this most)
├── images/             # Photos (add hero.jpg, gallery images)
├── .nojekyll           # Ensures GitHub Pages serves files correctly
└── README.md           # This file
```

---

## Custom domain (optional)

1. Buy a domain (e.g. Namecheap, GoDaddy)
2. In repo **Settings → Pages → Custom domain**, enter your domain
3. Add DNS records as GitHub instructs (usually a CNAME or A records)
4. Hosting remains free; you only pay for the domain

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Site shows 404 | Confirm repo is named `weddingz`, branch is `main`, Pages is enabled |
| CSS/JS not loading | Ensure you use relative paths (`./css/styles.css`) — already set up |
| Map not showing | Replace placeholder embed URLs with real ones from Google Maps |
| RSVP form blank | Replace `YOUR_FORM_ID` with your actual Google Form URL |
| Hero image missing | Add `images/hero.jpg` or remove the url from `.hero-bg` in CSS |

---

Made with love.
