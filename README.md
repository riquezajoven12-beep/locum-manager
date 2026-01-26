# Locum Manager

A web app to track locum shifts, earnings, invoices and payment receipts.

## Features

- 📊 Dashboard with total earnings, hours, and tax declarations
- 📋 Search and filter entries by clinic, month, shift type
- ➕ Add new locum entries with auto-calculations
- 📄 Generate and print invoices
- 🧾 Generate and print payment receipts
- 💾 Data persists in browser localStorage

## Deploy to Vercel

### Option 1: Deploy via GitHub

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
npm install
npm run build
npx vercel
```

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Tech Stack

- React 18
- Vite
- Lucide React Icons
- LocalStorage for data persistence
