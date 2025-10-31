# 🐞 Issue Tracker

A full-featured **Issue Tracker** built with **Next.js 15**, **Prisma ORM**, and **NextAuth**, designed to help teams manage, assign, and track software issues efficiently.  
This app combines robust authentication, modern UI, and a scalable backend to deliver a seamless project management experience.

---

## 🚀 Tech Stack

| Category | Technologies |
|-----------|---------------|
| **Frontend** | React 19, Next.js 15 (App Router), Tailwind CSS, DaisyUI |
| **Backend** | Next.js API Routes, Prisma ORM |
| **Database** | PostgreSQL |
| **Authentication** | NextAuth.js (GitHub, Google Providers) |
| **Deployment** | Vercel |
| **Language** | TypeScript |

---

## ✨ Features

✅ **User Authentication** – Secure login with GitHub & Google using NextAuth  
✅ **Issue Management** – Create, assign, edit, and close issues  
✅ **Role-based Permissions** – Control access and actions for different users  
✅ **Modern UI** – Responsive interface powered by Tailwind CSS & DaisyUI  
✅ **Database Integration** – Fully synced with PostgreSQL via Prisma ORM  
✅ **Real-time Updates (Optional)** – Extendable with WebSocket or Pusher  
✅ **Deployed on Vercel** – Fast, serverless, and production-ready

---

## 🧩 Project Structure

├── app/
│ ├── api/ # Next.js API routes
│ ├── auth/ # NextAuth configuration
│ ├── issues/ # Issue pages & components
│ └── layout.tsx # Root layout
├── prisma/
│ └── schema.prisma # Prisma data models
├── public/ # Static assets
├── styles/ # Global styles (Tailwind)
├── package.json
└── README.md


---

## ⚙️ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/issue-tracker.git
cd issue-tracker
npm install
```
Create a .env.local file in the root directory:

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret_key"
GITHUB_ID="your_github_client_id"
GITHUB_SECRET="your_github_client_secret"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

```bash
npx prisma migrate dev
npx prisma generate
npm run dev
```

⭐ Future Enhancements

📊 Dashboard & Analytics

📨 Email notifications (Resend integration)

🧩 Comment system on issues

🔔 Real-time updates with WebSocket

🧠 AI-powered issue categorization (experimental)
