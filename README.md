# Locum Manager v3.0 — Production Ready

A comprehensive web app for Malaysian locum doctors to track 230+ shifts, earnings, invoices, and payments with Google Sheets integration.

## Key Features

- **Google Sheets Import** — Upload CSV exports directly from your Master Chart, or paste tab-separated data
- **Dashboard** — Total earnings, hours, shifts, tax declarations with breakdowns
- **Entries** — Full CRUD with search, multi-filter, pagination (25/page)
- **Analytics** — Monthly earnings chart, top clinics ranked, shift distribution, payment split
- **Invoices & Receipts** — Professional printable documents with doctor name/MMC
- **Data Management** — Export JSON/CSV, import from JSON/CSV/paste, reset to defaults
- **230 Entries Pre-loaded** — Your full 2025 Master Chart data (May–Dec)

## Google Sheets Workflow

### Option 1: CSV Import
1. Open your Google Sheet
2. **File → Download → Comma-separated values (.csv)**
3. In the app, click the **📊 Import** button
4. Upload the CSV file
5. Choose **Replace All** or **Append**

### Option 2: Paste Data
1. Select rows in Google Sheets
2. **Ctrl+C** to copy
3. Click **Import → Paste Data** tab
4. **Ctrl+V** to paste
5. Click **Parse** then **Import**

## Project Structure

```
├── index.html
├── src/
│   ├── main.jsx
│   └── App.jsx         # Full app (single file, 230 entries embedded)
├── package.json
├── vite.config.js
└── .gitignore
```

## Setup

```bash
npm install
npm run dev          # Dev server at localhost:5173
npm run build        # Production build
npx vercel --prod    # Deploy to Vercel
```

## Column Mapping (Google Sheets → App)

| Sheet Column | App Field |
|---|---|
| WEEK | week |
| DATE | date |
| CLINIC NAME | clinic |
| CLINIC LOCATION | location |
| COMPANY NAME | company |
| SHIFT | shift |
| START TIME | start |
| END TIME | end |
| DURATION | hours |
| RATE / HOUR | rate |
| AMOUNT PAYABLE | payable |
| PAYMENT DATE | paymentDate |
| CASH | cash |
| TRANSFER REFERENCE | reference (auto-extracted) |
| TRANSFER | transfer |
| INVOICE NO | invoiceNo |
| PAYMENT NO | paymentNo |
| DECLARE | declare (Y/D = true) |

## Tech Stack

React 18 • Vite 5 • Lucide Icons • Outfit + JetBrains Mono • localStorage
