# GitPulse 🚀

> Your GitHub activity, visualized. With AI-powered profile insights.

GitPulse is a full-stack GitHub analytics dashboard that gives developers a beautiful, data-rich view of their GitHub profile — topped off with an AI-powered roast of their coding habits.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)

---

## ✨ Features

- **GitHub OAuth Login** — Secure sign-in with your GitHub account via NextAuth.js
- **Profile Overview** — Avatar, bio, location, and a direct link to your GitHub
- **Stats Cards** — Total repositories, followers, stars, and forks at a glance
- **Activity Chart** — Area chart showing your GitHub event activity over the last 14 days
- **Top Languages** — Donut chart visualizing your most-used languages by repo count
- **Profile Score** — A calculated score out of 100 based on your stars, forks, and activity
- **Top Repositories** — Your best repos with sortable views by Stars, Forks, and Last Updated
- **🔥 AI Roast** — Get brutally honest, witty feedback on your GitHub profile powered by Llama 3.3 via Groq

---

## 🛠 Tech Stack

| Layer      | Technology                 |
| ---------- | -------------------------- |
| Framework  | Next.js 14 (App Router)    |
| Language   | TypeScript                 |
| Styling    | Tailwind CSS               |
| Auth       | NextAuth.js + GitHub OAuth |
| Charts     | Recharts                   |
| AI         | Llama 3.3 70b via Groq API |
| Data       | GitHub REST API            |
| Deployment | Vercel                     |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A GitHub account
- A Groq API key (free at [console.groq.com](https://console.groq.com))

### 1. Clone the repository

```bash
git clone https://github.com/ratnesh2507/gitpulse.git
cd gitpulse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root:

```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
GROQ_API_KEY=your_groq_api_key
```

### 4. Set up GitHub OAuth

1. Go to **GitHub → Settings → Developer Settings → OAuth Apps**
2. Click **New OAuth App**
3. Set **Authorization callback URL** to `http://localhost:3000/api/auth/callback/github`
4. Copy the **Client ID** and **Client Secret** into `.env.local`

### 5. Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

### 6. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) and sign in with GitHub.

---

## 📁 Project Structure

```
gitpulse/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth route handler
│   │   └── roast/                # AI roast API endpoint
│   ├── dashboard/                # Dashboard page (server component)
│   ├── components/
│   │   ├── auth/                 # SignInButton
│   │   └── dashboard/            # All dashboard components
│   ├── layout.tsx
│   └── page.tsx                  # Landing page
├── lib/
│   ├── auth.ts                   # NextAuth config
│   ├── github.ts                 # GitHub API helpers
│   └── utils.ts                  # Utility functions
├── providers/
│   └── Providers.tsx             # Session + Query providers
├── types/
│   ├── github.ts                 # GitHub type definitions
│   └── next-auth.d.ts            # NextAuth type extensions
└── public/
    └── icon.png
```

---

## 🌐 Deploying to Vercel

1. Push your code to GitHub (make sure `.env.local` is in `.gitignore`)
2. Import the repo at [vercel.com](https://vercel.com)
3. Add all environment variables in Vercel's project settings
4. Update `NEXTAUTH_URL` to your Vercel deployment URL
5. Update your GitHub OAuth app's callback URL to match

---

## 🔑 Environment Variables

| Variable               | Description                                   |
| ---------------------- | --------------------------------------------- |
| `GITHUB_CLIENT_ID`     | GitHub OAuth App Client ID                    |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App Client Secret                |
| `NEXTAUTH_SECRET`      | Random secret for NextAuth session encryption |
| `NEXTAUTH_URL`         | Your app's base URL                           |
| `GROQ_API_KEY`         | Groq API key for AI roast feature             |

---

## 📄 License

MIT License — feel free to use, modify, and share.

---

Built by [ratnesh2507](https://github.com/ratnesh2507)
