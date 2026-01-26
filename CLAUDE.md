# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nuxt 4 teashop admin panel - a client-side rendered (SPA) application for managing stores, products, categories, colors, orders, and reviews. Connects to a NestJS backend API.

## Commands

```bash
bun run dev          # Start dev server (port from NUXT_PORT env)
bun run build        # Lint + type-check + build for production
bun run lint         # ESLint check
bun run lint:fix     # ESLint with auto-fix
bun run type:check   # TypeScript type checking (vue-tsc --noEmit)
bun run preview      # Preview production build locally
```

Production deployment uses PM2 via `ecosystem.config.cjs`.

## Architecture

### Directory Structure (inside `app/`)

- **api/** - Axios-based API layer
  - `axiosInstance.ts` - Two axios instances: `axiosClassic` (no auth) and `axiosWithToken` (with JWT + auto-refresh)
  - `api_tokens.ts` - Token storage helpers (cookies)
  - `services/` - Service modules per resource (productService, categoryService, etc.)
- **config/** - `api_url.config.ts` defines all API endpoint builders
- **stores/** - Pinia stores with persistence (`useAuthStore`, `useStoreStore`)
- **composables/** - Reusable composition functions
  - `useForm` - Generic form handler with API submission, errors, and pending state
  - `useQuery` - Generic data fetcher with loading/error state
- **utils/** - `handleAxiosError` - Global error handler using SweetAlert2
- **interfaces/** - TypeScript interfaces for all data models

### Key Patterns

**API Services**: Each service uses `useAxios()` to get configured axios instances. Example: `productService.getByStoreId(storeId, page, limit, search, sortKey, sortOrder)`.

**Form Handling**: Use `useForm(apiFn, initialData, onSuccess)` composable which returns `{ form, errors, notice, pending, success, send }`.

**Data Fetching**: Use `useQuery(apiFn, { immediate: true })` which returns `{ data, error, loading, refetch }`.

**Authentication**: JWT tokens stored in cookies. Auto-refresh on 401 via axios interceptor. Protected routes under `/dashboard` and `/store/*`.

### Layouts

- `default.vue` - Basic layout
- `auth.vue` - Auth pages (login/register)
- `store.vue` - Store management with sidebar navigation (extracts store_id from route params)
- `dashboard.vue` - Dashboard layout

### Route Structure

- `/login`, `/register` - Auth pages
- `/dashboard` - Main dashboard
- `/store` - Store listing
- `/store/[id]/*` - Store-specific pages (products, categories, colors, reviews, settings)

## Code Style

- Single quotes, no semicolons, 2-space indentation
- Vue attributes ordered per ESLint config (DEFINITION, LIST_RENDERING, CONDITIONALS, etc.)
- Self-closing component tags (`<MyComponent />`), non-self-closing HTML (`<div></div>`)
- Imports sorted by prettier plugin (@trivago/prettier-plugin-sort-imports)

## Configuration

- API proxied through `/api` to backend (localhost:3300 in dev)
- SSR disabled (`ssr: false`)
- Tailwind with custom breakpoints (max-width: lg=992px, md=768px, sm=576px)
- Custom colors via CSS variables: `accent`, `accent-light`, `accent-dark`, `text`, `text-light`
