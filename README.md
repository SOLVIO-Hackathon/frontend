<div align="center">

# 🗑️ ZeroBin — Frontend

### Bangladesh's First AI-Driven Waste Management Platform

The web client for ZeroBin — a role-based, bilingual (EN/BN) interface for citizens, waste collectors, kabadiwalas, and municipal admins to report waste, trade e-waste, and monitor city-wide cleanup in real time.

[![Next.js](https://img.shields.io/badge/Next.js-App_Router-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-OpenStreetMap-199900?style=flat&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

[Live Demo](https://frontend-solvio.vercel.app/) · [Backend Repo](../../) · [Report Bug](../../issues)

</div>

---

## 📖 Overview

This is the client application for **ZeroBin**, built with [Next.js](https://nextjs.org) (App Router) and bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It consumes the [ZeroBin FastAPI backend](../../) to deliver four distinct, role-based experiences from a single codebase:

- **Citizen** — report waste with photo + GPS, browse and complete quests, sell e-waste, submit complaints, chat with the AI assistant
- **Collector** — accept assigned cleanup quests, submit before/after verification photos
- **Kabadiwala** — browse available e-waste listings and place pickup bids
- **Admin** — monitor the city-wide waste hotspot map, review flagged AI verifications, track bin fill levels, and view collection analytics

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🌐 **Bilingual UI** | Full English / Bangla (বাংলা) toggle across the app |
| 🗺️ **Interactive Maps** | Leaflet + OpenStreetMap for waste hotspots, quest locations, and e-waste pickup points |
| 📸 **Photo-based Reporting** | Drag-and-drop upload for waste reports and e-waste listings, with live location preview |
| 🛡️ **Fraud Feedback** | Real-time UI for AI-detected fraudulent/AI-generated image submissions, with confidence scores and source matches |
| 🏆 **Gamification** | Points, badges, and leaderboards for verified citizen reports |
| 💬 **EcoAssistant Widget** | Embedded chat widget backed by the backend's agentic Bangla-speaking assistant |
| 📊 **Admin Analytics** | Live dashboards for report status, flagged reviews, and bin fill-level monitoring with predictive fill-time results |
| 🔐 **Role-based Auth** | JWT-backed auth with distinct dashboards and permissions per role |

---

## 🖼️ Screens

<details open>
<summary><strong>Citizen</strong></summary>

| Report Waste | E-waste Listing | My Listings |
|---|---|---|
| <img src="https://github.com/user-attachments/assets/1199ff67-289d-41d3-ad65-648f69e1d1cd" width="280"/> | <img src="https://github.com/user-attachments/assets/31bd39a0-8dcc-4341-8435-38382e17a4cd" width="280"/> | <img src="https://github.com/user-attachments/assets/69583e54-1544-4920-af6e-c99d96daeb05" width="280"/> |

| Submit Complaint | EcoAssistant |
|---|---|
| <img src="https://github.com/user-attachments/assets/816c8b40-c803-4f80-9b06-1a70d32da817" width="330"/> | <img src="https://github.com/user-attachments/assets/e415119b-9be3-4539-9694-db0dd82ec635" width="220"/> |

</details>

<details>
<summary><strong>Kabadiwala & Collector</strong></summary>

| Available Listings | Offer Pickup Service | Collector Dashboard |
|---|---|---|
| <img src="https://github.com/user-attachments/assets/6aefdc26-6a09-4d8d-916c-972ea6d46aaf" width="280"/> | <img src="https://github.com/user-attachments/assets/85168d40-d186-423b-9064-e37690076ea3" width="230"/> | <img src="https://github.com/user-attachments/assets/29c8e1eb-1918-479f-b412-29fdb3b35791" width="280"/> |

</details>

<details>
<summary><strong>Admin</strong></summary>

| Hotspot Dashboard | Flagged Reviews |
|---|---|
| <img src="https://github.com/user-attachments/assets/f6b684fa-91de-47c7-bf09-a0e5fa49154e" width="400"/> | <img src="https://github.com/user-attachments/assets/7e68db86-6dfa-42ea-8a46-e7f7c3cc0ff1" width="400"/> |

| Bin Level Monitoring | Fill Prediction Result |
|---|---|
| <img src="https://github.com/user-attachments/assets/99154911-226c-4f7b-ae70-c3d54ddd94f9" width="400"/> | <img src="https://github.com/user-attachments/assets/70f79662-5cc8-4e3e-9367-489f46d33f82" width="330"/> |

</details>

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Fonts** | [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with [Geist](https://vercel.com/font) |
| **Maps** | Leaflet + OpenStreetMap |
| **Notifications** | `react-hot-toast` |
| **Hosting** | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- The [ZeroBin backend](../../) running locally or accessible remotely

### 1. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure environment
Create a `.env.local` file in the project root:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app. Start editing `app/page.tsx` — the page auto-updates as you edit.

---

## 🔧 Local Backend Tunneling (ngrok)

When developing against a locally-run backend that needs to be reachable over HTTPS (e.g. during a hackathon demo or mobile testing), tunnel it with [ngrok](https://ngrok.com/):

1. **Install ngrok** (macOS via Homebrew):
   ```bash
   brew install ngrok
   ```
2. **Start the backend** locally so it's listening on `http://localhost:8000`.
3. **Expose it:**
   ```bash
   ngrok http 8000
   ```
4. **Copy the HTTPS forwarding URL** it prints (e.g. `https://abc123.ngrok-free.app`).
5. **Set it in `.env.local`:**
   ```bash
   NEXT_PUBLIC_API_BASE_URL=https://abc123.ngrok-free.app
   ```
6. **Restart the dev server** so the new environment variable is picked up.

All auth and API requests will now target the ngrok URL automatically.

**Switching back to local:** set `NEXT_PUBLIC_API_BASE_URL=http://localhost:8000` (or remove the variable) and restart.

**Verifying it worked:** open the browser Network tab during login/register — requests should hit the ngrok domain. If requests fail, make sure the ngrok origin is allowed in the backend's CORS configuration.

---

## 🔐 Authentication Error Handling

API errors are surfaced consistently throughout the app:

- `apiRequest` extracts the backend's `detail` / `message` field from failed responses.
- `AuthContext` displays these messages to the user via `react-hot-toast` (e.g. *"Incorrect email or password"*), so failures are never silent.

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) — features and API reference
- [Learn Next.js](https://nextjs.org/learn) — interactive tutorial
- [Next.js GitHub Repository](https://github.com/vercel/next.js) — feedback and contributions welcome

---

## ☁️ Deployment

The easiest way to deploy this app is via the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), from the creators of Next.js.

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 🔗 Related

- [ZeroBin Backend (FastAPI)](../../) — API, database models, AI verification pipeline, and ML services powering this frontend

## 👥 Team — DU_Caffeine

| Name | Role |
|---|---|
| **Abrar** (DU) | Team Lead & ML Engineer |
| **Jamal** (DU) | Tech Lead & Backend |
| **Ashik** (DU) | Frontend Developer |
| **Laila** (BRAC) | Strategic Analyst |

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
