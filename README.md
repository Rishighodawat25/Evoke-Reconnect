# EVOKE Reconnect

> A luxury, cinematic re-engagement platform for EVOKE South Goa.  
> Personalized landing pages for old leads. No brochures. Just conversation.

---

## What this is

EVOKE Reconnect generates a unique, private URL for each lead from a previous enquiry.

When they visit their link, they see:
- Their name, referenced naturally
- The villa count when they first inquired (11) vs. today (4)
- A lifestyle comparison: city life vs. villa in Goa
- An honest question: *Is Goa still part of your plan?*
- A tailored response flow based on YES / MAYBE / NOT ANYMORE

Everything is tracked. Nothing is pushed.

---

## Project Structure

```
evoke-reconnect/
├── src/
│   ├── pages/
│   │   ├── LeadPage.jsx          # Personalized lead experience
│   │   ├── AdminDashboard.jsx    # Metrics + lead table
│   │   ├── AdminImport.jsx       # CSV upload + slug generation
│   │   └── NotFound.jsx          # 404
│   ├── components/
│   │   ├── HeroSection.jsx       # Cinematic opener with counters
│   │   ├── SplitSection.jsx      # City vs. villa comparison
│   │   ├── DecisionSection.jsx   # YES / MAYBE / NO buttons
│   │   ├── ResponseYes.jsx       # WhatsApp CTA
│   │   ├── ResponseMaybe.jsx     # Objection selector + thanks
│   │   └── ResponseNo.jsx        # Graceful exit
│   ├── utils/
│   │   ├── slugUtils.js          # Slug generation + lead storage
│   │   ├── analytics.js          # Event tracking
│   │   └── whatsappUtils.js      # Message generator + CSV export
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── google-apps-script.js         # Paste into Google Apps Script
├── sample-leads.csv              # Example CSV format
├── vercel.json                   # SPA routing + security headers
├── .env.example                  # Environment variables template
└── README.md
```

---

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env
# Edit .env with your values

# 3. Start dev server
npm run dev

# 4. Open browser
open http://localhost:3000/admin
```

---

## Workflow

### Step 1 – Import Leads

1. Go to `/admin` → enter your PIN (default: `1234`, **change this**)
2. Click **Import CSV**
3. Upload your `leads.csv` (see `sample-leads.csv` for format)
4. Review the preview → click Import
5. Each lead gets a unique, non-guessable 6-character slug

### Step 2 – Export WhatsApp Messages

1. From `/admin`, click **Export WhatsApp CSV**
2. Open the CSV in Excel / Google Sheets
3. Copy each personalized message + URL
4. Paste manually into WhatsApp (do NOT send automatically)

### Step 3 – Monitor Responses

The admin dashboard shows:
- Who has visited
- Time spent on their page
- Their response (Interested / Maybe / Not Anymore)
- Objection selected (if Maybe)
- Whether they clicked WhatsApp

---

## Deployment (Vercel)

### One-click deploy

```bash
npm install -g vercel
vercel --prod
```

### Manual

1. Push code to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Add environment variables (see below)
4. Deploy

### Environment Variables (Vercel Dashboard)

| Variable | Description | Example |
|---|---|---|
| `VITE_BASE_URL` | Your live domain | `https://evoke.yourdomain.com` |
| `VITE_RISHI_WHATSAPP` | Rishi's WhatsApp (no +, no spaces) | `919876543210` |
| `VITE_ADMIN_PIN` | Admin dashboard PIN | `9427` |
| `VITE_SHEETS_ENDPOINT` | Google Apps Script URL (optional) | `https://script.google.com/...` |

---

## Google Sheets Integration (Optional)

To push analytics events (response, objection, WhatsApp click) to a Google Sheet:

1. Create a new Google Sheet
2. Go to **Extensions → Apps Script**
3. Paste the contents of `google-apps-script.js`
4. Click **Deploy → New Deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web App URL
6. Add it as `VITE_SHEETS_ENDPOINT` in Vercel

Two sheets are auto-created:
- **Analytics** – every event logged with timestamp
- **Responses** – one row per lead, updated as they respond

---

## Admin Dashboard

**URL:** `/admin`  
**PIN:** Set via `VITE_ADMIN_PIN` (default: `1234`)

Features:
- Total leads, visits, response breakdown
- Most common objection
- Filter by response type
- Sort by date, name, or time on page
- Direct link to each lead's page
- Export WhatsApp CSV
- Clear all data (danger zone)

---

## Data Storage

All lead data is stored in **localStorage** in the browser running the admin session.

This means:
- No backend required
- Data is private to the admin device
- If you need to access admin from multiple devices → use Google Sheets integration and export/re-import
- For production at scale, replace localStorage with a real database (Supabase, PlanetScale, etc.)

---

## URL Structure

| URL | Description |
|---|---|
| `/7fd29a` | Lead's personalized page |
| `/admin` | Admin dashboard (PIN protected) |
| `/admin/import` | CSV import page |
| `/not-found` | 404 |

Slugs are 6 characters: lowercase letters + numbers, excluding confusable chars (0, O, I, l).  
With 30 characters available, 6-char slugs give ~729 million combinations.

---

## Security Notes

- Lead names never appear in URLs
- Admin is PIN-protected (change the default!)
- All pages have `noindex, nofollow` meta tags
- `robots.txt` blocks all crawlers
- Security headers set via `vercel.json`
- Consider adding Vercel Password Protection for the `/admin` route

---

## Sample CSV

```csv
name,email,phone,city
Amit Shah,amit@example.com,9876543210,Mumbai
Rahul Mehta,rahul@example.com,9876543211,Pune
```

Required: `name`, `email`  
Optional: `phone`, `city`

---

## Tech Stack

- **React 18** + **Vite 5**
- **TailwindCSS 3**
- **Framer Motion 11**
- **React Router 6**
- **PapaParse 5** (CSV parsing)
- **Vercel** (deployment + SPA routing)

---

## Customization

### Change villa counts
Edit `HeroSection.jsx` – look for `AnimatedCounter from={0} to={11}` and `from={11} to={4}`.

### Change WhatsApp message
Edit `src/utils/whatsappUtils.js` → `generateWhatsAppMessage()`.

### Add video backgrounds
Replace the CSS gradient backgrounds in `HeroSection.jsx` and `SplitSection.jsx` with:
```jsx
<video
  autoPlay muted loop playsInline
  className="absolute inset-0 w-full h-full object-cover opacity-40"
  src="/goa-drone.mp4"
/>
```
Upload videos to `/public/`.

---

*Built for EVOKE South Goa. Minimal. Intentional. Unhurried.*
