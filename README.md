# IFROF - Direct Factory Platform

منصة IFROF تربط المشترين مباشرة بالمصانع الصينية الموثقة. نقضي على الوسطاء ونضمن لك أفضل الأسعار.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Edge Functions)
- **APIs**: Firecrawl, Perplexity AI

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun
- Supabase account

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file with:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

### Supabase Secrets

Set these secrets in your Supabase project:

- `FIRECRAWL_API_KEY` - Firecrawl API key
- `PERPLEXITY_API_KEY` - Perplexity API key

## Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` folder.

### Deploy to Railway/Vercel/Netlify

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables

### Edge Functions

Deploy edge functions to Supabase:

```bash
supabase functions deploy api
supabase functions deploy factory-search
supabase functions deploy ai-chat
```

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Page components
│   ├── contexts/       # React contexts
│   ├── integrations/   # Supabase client
│   └── data/           # Mock data
├── supabase/
│   ├── functions/      # Edge functions
│   └── config.toml     # Supabase config
└── public/             # Static assets
```

## Features

- 🔍 Factory Search - Find verified Chinese manufacturers
- 📦 Import Orders - Track your orders
- 💬 Messaging - Direct communication with factories
- 🔐 Authentication - Secure user accounts
- 🌐 Multi-language - Arabic, English, Chinese

## License

© 2026 IFROF. All rights reserved.
