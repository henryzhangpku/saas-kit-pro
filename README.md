# 🚀 SaaS Boilerplate

**The fastest way to launch your SaaS.** Authentication, billing, AI integration, and a beautiful dashboard — all pre-built.

## ✨ Features

- **🔐 Authentication** — Email/password + Google + GitHub OAuth via NextAuth.js
- **💳 Billing** — Stripe subscriptions with free/pro/enterprise tiers + customer portal
- **🤖 AI Integration** — OpenAI API ready with usage tracking and API key auth
- **🎨 Modern UI** — Tailwind CSS v4, dark mode, responsive design
- **📊 Dashboard** — Usage stats, API key management, billing management
- **🔌 REST API** — Rate-limited, authenticated API endpoints

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 | React framework |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Prisma | Database ORM |
| NextAuth.js v5 | Authentication |
| Stripe | Payments |
| OpenAI | AI integration |

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone <repo>
cd saas-boilerplate
npm install

# 2. Set up environment
cp .env.example .env.local
# Fill in your env vars

# 3. Set up database
npx prisma generate
npx prisma db push

# 4. Run
npm run dev
```

## 🔧 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | ✅ | PostgreSQL connection string |
| `AUTH_SECRET` | ✅ | NextAuth secret (`openssl rand -base64 32`) |
| `STRIPE_SECRET_KEY` | ✅ | Stripe secret key |
| `STRIPE_PUBLISHABLE_KEY` | ✅ | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | ✅ | Stripe webhook signing secret |
| `OPENAI_API_KEY` | ✅ | OpenAI API key |
| `AUTH_GITHUB_ID` | ❌ | GitHub OAuth client ID |
| `AUTH_GITHUB_SECRET` | ❌ | GitHub OAuth client secret |
| `AUTH_GOOGLE_ID` | ❌ | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | ❌ | Google OAuth client secret |
| `RESEND_API_KEY` | ❌ | Resend API key for emails |

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/          # Login & register pages
│   ├── api/             # API routes
│   │   ├── ai/          # AI generation endpoint
│   │   ├── stripe/      # Checkout, webhook, portal
│   │   └── user/        # Registration, keys, profile
│   └── dashboard/       # Dashboard pages
├── components/
│   ├── ui/              # Core UI components
│   ├── landing/         # Landing page components
│   └── dashboard/       # Dashboard components
├── lib/
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client
│   ├── stripe.ts        # Stripe helpers
│   └── utils.ts         # Utility functions
└── types/               # TypeScript declarations
```

## 💰 Pricing

This boilerplate is available under a commercial license.

- **Single Application License** — $149
- **Unlimited License** — $299
- **Enterprise License** — Contact for pricing

Each license includes lifetime updates and priority support.

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker build -t saas-boilerplate .
docker run -p 3000:3000 saas-boilerplate
```

## 📄 License

Commercial license. See LICENSE file for details.
