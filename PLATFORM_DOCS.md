# IFROF Platform - Complete Documentation

## 📋 Overview

**IFROF** is a B2B Factory Import Platform connecting buyers directly with verified Chinese manufacturers. The platform eliminates middlemen and ensures competitive factory-direct pricing.

- **Official Tagline**: "منصة IFROF تربط المشترين مباشرة بالمصانع الصينية الموثقة. نقضي على الوسطاء ونضمن لك أفضل الأسعار."
- **Target Market**: Importers, wholesalers, and Amazon/Noon sellers primarily in Saudi Arabia and UAE
- **Languages**: Arabic (RTL), English (LTR), Chinese (LTR)

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query (React Query)
- **Routing**: React Router DOM v6
- **Forms**: React Hook Form + Zod validation

### Backend (Lovable Cloud / Supabase)
- **Database**: PostgreSQL
- **Authentication**: Supabase Auth (Email/Password)
- **Edge Functions**: Deno runtime
- **File Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

### External APIs
- **Firecrawl**: Website data extraction for factory discovery
- **Perplexity AI**: AI-powered factory verification

### Analytics
- **Google Analytics 4**: Measurement ID `G-YY0180GGD4`

---

## 📁 Project Structure

```
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── chat/              # AI chatbot components
│   │   ├── dashboard/         # Dashboard layout
│   │   ├── forms/             # Quote & verification forms
│   │   ├── home/              # Homepage sections
│   │   ├── layout/            # Navbar, Footer, MainLayout
│   │   ├── marketplace/       # B2B filters
│   │   └── ui/                # shadcn/ui components
│   ├── contexts/
│   │   └── LanguageContext.tsx
│   ├── data/
│   │   ├── blogContent.ts
│   │   └── mockData.ts
│   ├── hooks/
│   │   ├── useAuth.tsx
│   │   ├── useFactories.tsx
│   │   ├── useMessages.tsx
│   │   ├── useNotifications.tsx
│   │   └── useUserRole.tsx
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   ├── pages/
│   │   ├── dashboard/         # Dashboard tabs
│   │   └── [page].tsx         # All pages
│   └── types/
│       └── index.ts
├── supabase/
│   ├── functions/
│   │   ├── ai-chat/
│   │   ├── api/
│   │   └── factory-search/
│   └── config.toml
└── Configuration files
```

---

## 🗃️ Database Schema

### Core Tables

#### `profiles`
User profile data linked to auth.users
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Reference to auth.users |
| email | text | User email |
| full_name | text | Full name |
| company_name | text | Company name |
| user_type | enum | 'buyer', 'factory', 'admin' |
| subscription_plan | text | 'free', 'basic', 'premium' |
| subscription_status | text | 'active', 'inactive', 'trial' |
| daily_search_count | int | Daily API usage tracking |

#### `factories`
Manufacturer data
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Arabic name |
| name_en | text | English name |
| name_zh | text | Chinese name |
| category | text | Industry category |
| country | text | Factory country |
| location | text | Full address |
| certifications | text[] | ISO, CE, FDA, etc. |
| manufacturing_types | text[] | OEM, ODM, Private Label |
| verification_status | text | verified, pending, rejected |
| verification_score | int | 0-100 score |
| min_order_value | numeric | Minimum order in USD |
| production_capacity | text | Monthly capacity |
| owner_user_id | uuid | Factory owner's user ID |

#### `products`
Factory products
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| factory_id | uuid | Reference to factories |
| name | text | Product name |
| category | text | Product category |
| min_price | numeric | Starting price |
| max_price | numeric | Maximum price |
| min_order_quantity | int | MOQ |
| specifications | jsonb | Product specs |

#### `import_orders`
User orders
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Buyer's user ID |
| factory_id | uuid | Factory reference |
| product_name | text | Product being ordered |
| quantity | int | Order quantity |
| status | text | draft, inquiry, confirmed, shipped, delivered |
| estimated_price | numeric | Quote estimate |
| final_price | numeric | Confirmed price |

#### `service_requests`
Platform service requests (quotes, verification)
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid | Requester |
| type | text | quote, verification, inspection |
| status | text | pending, in_progress, completed |
| details | jsonb | Request details |
| cost | numeric | Service cost |

#### `conversations` & `messages`
Internal messaging system

#### `factory_searches` & `factory_results`
Advanced search history and results

#### `user_roles`
RBAC (Role-Based Access Control)
| Column | Type | Description |
|--------|------|-------------|
| user_id | uuid | User reference |
| role | enum | admin, moderator, user |

### Views

#### `factories_public`
Public factory view excluding sensitive contact information (email, phone)

---

## 🔐 Security

### Row Level Security (RLS)
All tables have RLS enabled with appropriate policies:
- Users can only access their own data
- Factory owners can manage their factory/products
- Admins have full access via `has_role()` function
- Public factory data is masked via `factories_public` view

### Authentication
- Email/Password authentication via Supabase Auth
- Auto-confirm email enabled for faster testing
- Session persistence with auto token refresh

### Rate Limiting
Daily limits tracked in `profiles` table:
- `daily_search_count` - Factory searches
- `daily_message_count` - Messages sent
- `daily_contact_access_count` - Contact info access

---

## 📄 Pages & Routes

### Public Pages
| Route | Description |
|-------|-------------|
| `/` | Homepage with all sections |
| `/marketplace` | B2B Factory marketplace with filters |
| `/factory/:id` | Factory detail page |
| `/product/:id` | Product detail page |
| `/direct-factory` | Advanced search (image/URL) |
| `/services` | Platform services |
| `/services/quote` | Request quote page |
| `/pricing` | Subscription plans |
| `/blog` | Blog listing |
| `/blog/:slug` | Blog post detail |
| `/about` | About us |
| `/contact` | Contact page |

### Auth Pages
| Route | Description |
|-------|-------------|
| `/auth` | Login/Signup |
| `/forgot-password` | Password reset request |
| `/reset-password` | Password reset form |

### Protected Pages (Requires Auth)
| Route | Description |
|-------|-------------|
| `/dashboard` | User dashboard |
| `/dashboard/orders` | My orders |
| `/dashboard/documents` | Order documents |
| `/dashboard/subscription` | Subscription management |
| `/dashboard/settings` | Profile settings |
| `/messages` | Messaging center |
| `/admin` | Admin panel (admin role only) |

### Legal Pages
| Route | Description |
|-------|-------------|
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/refund` | Refund policy |

---

## 💳 Subscription Plans

| Plan | Price | Features |
|------|-------|----------|
| **Starter** | $4.99/mo | 1 factory search, 1 contact access |
| **Professional** | $49.99/mo | 15 searches, 15 contacts, priority support |
| **Unlimited** | $449.99/mo | Unlimited access, dedicated manager |

Payment: Stripe integration (test mode)

---

## 🔄 User Flow

### Buyer Journey
1. Browse categories on marketplace
2. Filter by country, MOQ, certifications, manufacturing type
3. View factory details and products
4. Click "Request Quote" button
5. Fill quote request form
6. Receive quote via platform messaging
7. Confirm order and track progress

### Factory Owner Journey
1. Register as factory
2. Complete factory profile
3. Add products with specifications
4. Receive and respond to quotes
5. Manage orders via dashboard

---

## 🌐 Internationalization (i18n)

### Supported Languages
- **Arabic (ar)** - RTL, Cairo font
- **English (en)** - LTR, Inter font  
- **Chinese (zh)** - LTR, Inter font

### Implementation
- `LanguageContext` manages current language
- Language persists in localStorage
- Full page reload on language change for RTL/LTR switch
- All text content uses translation objects in components

---

## 🎨 Design System

### Colors (HSL)
```css
--background: 222.2 84% 4.9%;
--foreground: 210 40% 98%;
--primary: 24 95% 53%;        /* Orange accent */
--secondary: 217 33% 17%;     /* Navy blue */
--muted: 217.2 32.6% 17.5%;
--accent: 217.2 32.6% 17.5%;
```

### Typography
- **Arabic**: Cairo font family
- **English/Chinese**: Inter font family

### Components
All using shadcn/ui with custom variants

---

## 📡 Edge Functions

### `/api`
General API endpoint (JWT not required)

### `/factory-search`
Advanced factory discovery (JWT required)
- Uses Firecrawl for web scraping
- Uses Perplexity AI for verification
- Returns scored factory results

### `/ai-chat`
Customer support chatbot (JWT not required)
- FAQ responses
- Human support handoff

---

## 📊 Analytics

### Google Analytics 4
- **Measurement ID**: `G-YY0180GGD4`
- **Stream URL**: https://ifrof.com
- Tracks page views, events, user behavior

---

## 🚀 Deployment

### Environment Variables
```env
VITE_SUPABASE_URL=https://pinbppuktcqdbplmmusz.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJ...
VITE_SUPABASE_PROJECT_ID=pinbppuktcqdbplmmusz
```

### Supabase Secrets
- `FIRECRAWL_API_KEY` - Factory discovery
- `PERPLEXITY_API_KEY` - AI verification
- `SUPABASE_SERVICE_ROLE_KEY` - Admin operations

### Build Commands
```bash
npm install
npm run build    # Output: dist/
npm run dev      # Development server
```

---

## 📋 Checklist for Production

- [x] Mobile responsive design
- [x] Request Quote form saves to database
- [x] No sensitive data exposed (anon keys only)
- [x] SEO: Title, Description, Favicon
- [x] Privacy policy page
- [x] Terms of service page
- [x] Refund policy page
- [x] Google Analytics 4 integration
- [x] RLS policies on all tables
- [x] Error handling and loading states
- [x] Multi-language support (AR/EN/ZH)

---

## 📞 Support

All communication happens within the platform via:
- Internal messaging system
- AI chatbot support
- Service request forms

*Note: External contact methods (WhatsApp, phone) are excluded per platform policy to keep all interactions on-platform.*

---

© 2026 IFROF. All rights reserved.
