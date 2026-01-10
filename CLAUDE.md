# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SaaS landing page template built with Next.js 15 (App Router), featuring:
- **Documentation framework**: Fumadocs for MDX-based blog content
- **Authentication**: Better Auth with Google OAuth
- **Database**: PostgreSQL via Neon with Drizzle ORM
- **Email**: React Email + Resend for newsletters
- **UI**: shadcn/ui components with Tailwind CSS
- **Tooling**: Biome for formatting/linting, TypeScript strict mode

## Common Commands

### Development
```bash
pnpm dev                  # Start dev server with Turbo (http://localhost:3000)
pnpm build               # Build for production
pnpm preview             # Build and start production server
pnpm start               # Start production server
```

### Code Quality
```bash
pnpm lint                # Run custom lint script + Biome lint
pnpm format              # Format with Biome
pnpm check:write         # Format, lint, and fix issues (safe fixes)
pnpm check:unsafe        # Format, lint, fix + unsafe fixes (imports sorting, etc.)
```

### Database (Drizzle)
```bash
pnpm db:generate         # Generate migrations from schema
pnpm db:push             # Push schema changes to database
pnpm db:studio           # Open Drizzle Studio
```

### Email Development
```bash
pnpm email:dev           # Email dev server on port 3001
pnpm email:build         # Build email templates
pnpm email:export        # Export email templates
```

## Architecture

### Directory Structure

```
src/
├── app/                      # Next.js App Router
│   ├── (home)/              # Main site route group
│   │   ├── (blog)/          # Blog routes (MDX content)
│   │   ├── about/
│   │   ├── contact/
│   │   ├── pricing/
│   │   └── _components/     # Home-specific components
│   ├── (auth)/              # Auth route group
│   ├── api/                 # API routes
│   │   ├── auth/            # Better Auth endpoints
│   │   ├── comments/        # Comment system
│   │   └── search/
│   └── og/                  # OG image generation
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── sections/            # Landing page sections
│   ├── auth/                # Auth-related components
│   └── blog/                # Blog components
├── server/
│   ├── auth/                # Better Auth configuration
│   ├── db/                  # Database setup + schemas
│   │   └── schema/          # Drizzle schemas (auth, comments)
│   └── comments/            # Comment system config
├── lib/
│   ├── auth-client.ts       # Client-side auth utilities
│   ├── safe-action.ts       # next-safe-action client setup
│   ├── source.ts            # Fumadocs blog post utilities
│   ├── resend.ts            # Email utilities
│   └── validators/          # Zod schemas
└── env.js                   # Environment variable validation (@t3-oss/env-nextjs)

content/                     # MDX blog posts
emails/                      # React Email templates
```

### Key Patterns

#### Environment Variables
- Validated via `src/env.js` using `@t3-oss/env-nextjs`
- Type-safe access via `import { env } from '@/env'`
- Schema defines server/client vars with Zod validation
- Reference `.env.example` for required variables

#### Database (Drizzle + Neon)
- PostgreSQL via Neon serverless driver
- Schema in `src/server/db/schema/` (auth, comments)
- All tables prefixed with `blog_` (see `drizzle.config.ts`)
- Snake case naming via `casing: 'snake_case'`
- Access DB: `import { db } from '@/server/db'`

#### Authentication (Better Auth)
- Configuration: `src/server/auth/index.ts`
- Uses Drizzle adapter with plural table names
- Google OAuth provider configured
- Server-side session: `import { getSession } from '@/server/auth'`
- Client-side: `import { authClient } from '@/lib/auth-client'`

#### Server Actions
- Uses `next-safe-action` for type-safe actions
- Base client: `src/lib/safe-action.ts` with custom error handling
- Action pattern: Define in `actions/*.ts` files near route handlers
- Examples: `app/(home)/contact/actions/contact.ts`, `newsletter/actions/newsletter.ts`

#### MDX Blog System (Fumadocs)
- Content in `content/*.mdx` with frontmatter (date, author, tags, image)
- Config: `source.config.ts` defines blog collection schema
- Utilities: `src/lib/source.ts` exports `getPosts()`, `getPost()`, `getTags()`, etc.
- Supports math (KaTeX), code highlighting (Shiki), TypeScript twoslash
- Build-time processing via `fumadocs-mdx` (runs in `postinstall`)

#### Styling
- Tailwind CSS with custom config
- `cn()` utility from `src/lib/utils.ts` for class merging
- shadcn/ui components use `class-variance-authority` (cva)
- Biome configured to sort Tailwind classes for `cn`, `cva`, `clsx`

#### Path Aliases
- `@/*` → `src/*`
- `@/public/*` → `public/*`

## Important Notes

### Biome Configuration
- Single quotes for JS/JSX
- 2-space indentation
- Semicolons always
- Auto-sorts Tailwind classes in `cn()`, `cva()`, `clsx()`
- Unused imports treated as errors

### MDX Content
- Blog posts auto-generate from `content/*.mdx`
- Frontmatter validated at build time (see `source.config.ts`)
- Table of contents extracted for navigation
- Run `pnpm postinstall` after adding/modifying MDX files

### Database Setup
- Local dev: Use `./start-database.sh` to start PostgreSQL in Docker
- Schema changes: Modify `src/server/db/schema/*`, then `pnpm db:push`
- All tables must have `blog_` prefix (drizzle.config.ts filter)

### Email Templates
- React Email components in `emails/`
- Preview at http://localhost:3001 with `pnpm email:dev`
- Sent via Resend (see `src/lib/resend.ts`)

### Type Safety
- Strict TypeScript mode enabled
- `noUncheckedIndexedAccess: true` (always check array access)
- Environment variables type-safe via `src/env.js`
