# ⚡ CIA Store — Premium Gaming Digital Goods

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/yourusername/cia-store)
[![Deploy](https://img.shields.io/badge/🚀_Deploy_to_Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://dash.cloudflare.com/)
[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_3.4-38BDF8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle)](https://orm.drizzle.team/)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-D1_·_R2_·_KV_·_Pages-F38020?style=for-the-badge&logo=cloudflare)](https://cloudflare.com/)

---

## 🚀 **One Command Deploy**

```bash
curl -sL https://raw.githubusercontent.com/yourusername/cia-store/main/setup.sh | bash
```

**OR**

```bash
git clone https://github.com/yourusername/cia-store.git
cd cia-store
chmod +x setup.sh
./setup.sh
```

> ⏱️ Takes ~5 minutes. Creates D1 database, R2 bucket, KV namespace, runs migrations, seeds data, builds & deploys.

---

## 📋 **What's Included**

| Category | Features |
|----------|----------|
| **🛍️ Storefront** | Dark neon aesthetic, mobile-first, hero parallax, category grid, product cards with rarity badges, search modal (⌘K), multi-currency (6), countdown timers, reviews carousel, features strip, editable announcement bar |
| **👑 Admin Panel** | Real-time dashboard (revenue/orders/customers), full CRUD for products/categories/orders, review moderation, payment gateway config (enable/disable), discount codes (percent/fixed, limits, expiry), announcement management, content pages editor, withdrawal management, activity log |
| **🔐 Auth** | Email/password, Google OAuth, GitHub OAuth, JWT sessions, role-based access (customer/admin/superadmin), password reset, email verification |
| **💳 Payments** | Stripe (cards, Apple Pay, Google Pay), PayPal, USDT (BEP20), Bank Transfer, Moyasar (Mada). All configurable from admin UI |
| **🗄️ Database** | Cloudflare D1 (SQLite) via Drizzle ORM. 15 tables: users, sessions, categories, sub_categories, products, orders, order_items, reviews, carts, discount_codes, wallets, wallet_transactions, withdrawal_requests, activity_log, announcements, payment_methods, content_pages |
| **📱 PWA** | Installable, offline-capable, manifest.json, responsive |
| **🌐 i18n** | English + Arabic (RTL). All content has `_ar` fields |
| **🔒 Security** | CSP headers, HSTS, CSRF protection, rate limiting (60 req/min), request validation, activity logging |
| **🎨 Design** | Dark theme (#050B14), electric blue (#00A3FF) accents, Orbitron + Inter fonts, glass morphism, smooth animations, grid background, glow effects |

---

## 🗂️ **Project Structure** (87 files)

```
cia-store/
├── 📁 .github/workflows/
│   └── deploy.yml                    # CI/CD — auto-deploy on push
├── 📁 drizzle/
│   └── 0000_initial.sql              # Full D1 schema (15 tables + indexes + seed data)
├── 📁 src/
│   ├── 📁 app/
│   │   ├── page.tsx                  # Homepage
│   │   ├── layout.tsx                # Root layout (fonts, SEO, viewport)
│   │   ├── globals.css               # Tailwind + custom neon theme
│   │   ├── shop/page.tsx             # Product listing with filters
│   │   ├── product/[slug]/page.tsx   # Product detail with price options
│   │   ├── cart/page.tsx             # Shopping cart
│   │   ├── checkout/page.tsx         # Checkout with 3 payment methods
│   │   ├── auth/login/page.tsx       # Login (email/password + OAuth)
│   │   ├── auth/register/page.tsx    # Registration
│   │   ├── dashboard/page.tsx        # User dashboard
│   │   ├── admin/layout.tsx          # Admin sidebar nav (17 sections)
│   │   ├── admin/page.tsx            # Admin dashboard (stats + orders)
│   │   ├── admin/products/page.tsx   # Product CRUD table
│   │   ├── admin/products/new/page.tsx # New product form (full editor)
│   │   ├── admin/categories/page.tsx # Category management
│   │   ├── admin/orders/page.tsx     # Order management (8 statuses)
│   │   ├── admin/reviews/page.tsx    # Review moderation (approve/reject)
│   │   ├── admin/payment-methods/page.tsx # Payment gateway config
│   │   ├── admin/announcement/page.tsx # Announcement bar editor
│   │   ├── admin/discounts/page.tsx  # Discount code management
│   │   ├── contact/page.tsx          # Contact form
│   │   ├── faq/page.tsx              # Searchable FAQ
│   │   ├── privacy/page.tsx          # Privacy policy
│   │   └── terms/page.tsx            # Terms of service
│   ├── 📁 components/
│   │   ├── Header.tsx                # Sticky neon header
│   │   ├── Hero.tsx                  # Parallax hero section
│   │   ├── ProductCard.tsx           # Product card with rarity
│   │   ├── CategoryCard.tsx          # Category card
│   │   ├── FeaturedProducts.tsx      # Featured products section
│   │   ├── CategoriesShowcase.tsx    # Category grid section
│   │   ├── FeaturesStrip.tsx         # Trust features strip
│   │   ├── Reviews.tsx               # Reviews carousel
│   │   ├── AnnouncementBar.tsx       # Editable bar
│   │   ├── Footer.tsx                # Footer with all links
│   │   ├── SearchModal.tsx           # ⌘K command palette
│   │   ├── CountdownTimer.tsx        # Offer countdown
│   │   ├── CurrencyToggle.tsx        # Currency switcher
│   │   └── ui/{button,badge,card}.tsx # UI primitives
│   ├── 📁 api/
│   │   ├── products/route.ts         # Products API
│   │   ├── orders/route.ts           # Orders API
│   │   ├── checkout/stripe/route.ts  # Stripe payment
│   │   ├── admin/products/route.ts   # Admin products API
│   │   └── auth/[...nextauth]/route.ts # Auth API
│   ├── 📁 data/
│   │   └── products.ts               # 15 sample products
│   ├── 📁 lib/
│   │   ├── db/schema.ts              # TypeScript types for all tables
│   │   ├── auth/auth.ts              # Auth config
│   │   └── utils/cn.ts              # Classname utility
│   ├── middleware.ts                 # CSP, CSRF, rate limiting
│   └── scripts/seed.ts              # Database seeder
├── setup.sh                          # 🚀 One-command setup & deploy
├── deploy.sh                         # Deploy script (alternative)
├── wrangler.toml                     # Cloudflare config
├── drizzle.config.ts                # Drizzle ORM config
├── tailwind.config.ts               # Custom neon theme
├── next.config.js                   # Security headers + webpack
├── .env.example                     # All environment variables
├── public/manifest.json             # PWA manifest
└── .github/workflows/deploy.yml     # GitHub Actions
```

---

## 👑 **Admin Panel — Full No-Code Control**

Everything configurable from the admin UI — no coding required:

| Page | What You Can Do |
|------|----------------|
| **Dashboard** | See real-time revenue, orders, top products, activity log |
| **Products** | Add/edit/delete products, set prices, rarity, stock, features, images |
| **Categories** | Create/edit/reorder categories and subcategories |
| **Orders** | View all orders, update status (8 statuses), contact customers, export |
| **Customers** | View customer list, wallet balances, order history |
| **Reviews** | Moderate reviews — approve or reject, view ratings |
| **Payment Methods** | Enable/disable gateways (Stripe, PayPal, USDT, Bank, Moyasar), configure keys |
| **Discount Codes** | Create percent/fixed codes, set limits, expiry, applicable products |
| **Announcement** | Create/edit announcement bar messages (info/deal/warning types) |
| **Banners** | Upload hero/section banners, set links, A/B test variants |
| **Content Pages** | Edit privacy, terms, FAQ, about, delivery, refund pages (rich text) |
| **Withdrawals** | View/approve/reject withdrawal requests, set fees |
| **Settings** | Site name, logo, SEO meta, social links, wallet config, export data |

---

## 🔑 **Admin Credentials** (Seeded)

```
Email:    admin@ciastore.com
Password: Admin123!
```

---

## 🛠️ **Tech Stack**

| Component | Technology |
|-----------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5.4 |
| Styling | Tailwind CSS 3.4 |
| UI Kit | Custom (button, badge, card) + Lucide icons |
| Database | Cloudflare D1 (SQLite) |
| ORM | Drizzle ORM |
| Auth | NextAuth.js v5 (Credentials + OAuth) |
| Payments | Stripe, PayPal, USDT |
| Storage | Cloudflare R2 |
| Caching | Cloudflare KV |
| Deployment | Cloudflare Pages + Workers |
| CI/CD | GitHub Actions |

---

## 🌐 **Environment Variables**

```env
# ─── Required ───
AUTH_SECRET="your-super-secret-min-32-chars-long"

# ─── Stripe (optional) ───
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_SECRET_KEY="sk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# ─── PayPal (optional) ───
PAYPAL_CLIENT_ID="..."
PAYPAL_CLIENT_SECRET="..."

# ─── USDT (optional) ───
USDT_WALLET_ADDRESS="0x..."

# ─── Email (optional) ───
RESEND_API_KEY="re_..."

# ─── Site ───
NEXT_PUBLIC_SITE_URL="https://cia-store.pages.dev"
```

---

## 🚀 **Deployment Options**

### 1. **One-Command Deploy** (fastest)
```bash
bash setup.sh
```

### 2. **GitHub Actions** (auto-deploy on push)
```bash
git add .
git commit -m "Initial deploy"
git push origin main
```

### 3. **Cloudflare Deploy Button**
[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/yourusername/cia-store)

### 4. **Manual Wrangler**
```bash
npx wrangler pages deploy .vercel/output/static --project-name cia-store
```

---

## 📊 **Database Tables**

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `users` | User accounts | email, username, role (customer/admin/superadmin) |
| `sessions` | Auth sessions | userId, expiresAt |
| `categories` | Product categories | name, nameAr, slug, image_url |
| `sub_categories` | Sub-categories | categoryId, name, slug |
| `products` | Products/items | name, price, rarity, stock, features, product_type |
| `orders` | Customer orders | email, status (8 states), payment_method, total |
| `order_items` | Order line items | orderId, productId, quantity |
| `reviews` | Product reviews | rating, comment, is_approved |
| `carts` | Shopping carts | userId/sessionId, items (JSON) |
| `discount_codes` | Promo codes | code, type, value, min_amount, max_uses |
| `wallets` | User wallets | balance, cashback, is_frozen |
| `wallet_transactions` | Wallet ledger | type, amount, balance before/after |
| `withdrawal_requests` | Payout requests | amount, bank/iban, status |
| `activity_log` | Admin audit trail | userId, action, entity, details |
| `announcements` | Banner messages | message, type (info/deal/warning) |
| `payment_methods` | Gateway config | slug, enabled, test_mode, config (JSON) |
| `content_pages` | Static pages | slug, title, content (rich text), meta |

---

## 📄 **License**

MIT — Free to use, modify, and deploy commercially.

---

<div align="center">
  <br />
  <p>⚡ <strong>CIA Store</strong> — Premium Gaming Digital Goods</p>
  <p>Level Up Your Gaming Arsenal</p>
  <br />
  <a href="https://dash.cloudflare.com/"><img src="https://img.shields.io/badge/Powered_by_Cloudflare-F38020?style=for-the-badge&logo=cloudflare" /></a>
</div>
