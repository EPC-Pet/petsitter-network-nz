# PetSitter Network NZ - AI Coding Agent Instructions

## Project Overview
This is a React + TypeScript landing page for PetSitter Network NZ, a membership-based platform connecting pet sitters for emergency backup support in Auckland. Built with Vite, React Router, TanStack Query, and shadcn/ui component library.

## Architecture & Structure

### Component Organization
- **Page Components** (`src/pages/`): Top-level route components. `Index.tsx` is the main landing page that wraps `AppLayout` with `AppProvider`.
- **Layout Components** (`src/components/`): Business logic components like `AppLayout.tsx` (main page structure), `MemberCard.tsx`, `EmergencyAlert.tsx`, `PricingCard.tsx`, `FeatureSection.tsx`.
- **UI Components** (`src/components/ui/`): shadcn/ui primitives built on Radix UI. DO NOT modify these directly - regenerate using `npx shadcn@latest add [component]`.
- **Context** (`src/contexts/`): React Context providers. `AppContext.tsx` manages global sidebar state.

### State Management Pattern
- **Global State**: React Context (`AppContext`) for UI state like sidebar toggling
- **Server State**: TanStack Query configured in `App.tsx` with `QueryClient` for data fetching (currently unused but scaffolded)
- **Local State**: React `useState` for component-specific state

### Routing
Single-page app using React Router v6 (`react-router-dom`). Routes defined in `App.tsx`:
- `/` → Index page (main landing page)
- `*` → 404 NotFound page

## Development Workflow

### Running the App
```bash
npm run dev          # Start dev server on http://[::]:8080
npm run build        # Production build
npm run build:dev    # Development mode build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Adding UI Components
Use shadcn/ui CLI - DO NOT manually create in `src/components/ui/`:
```bash
npx shadcn@latest add [component-name]
```
Configuration in `components.json` controls import aliases and styling.

## Key Conventions & Patterns

### Styling
- **Tailwind CSS**: Utility-first with custom theme in `tailwind.config.ts`
- **CSS Variables**: Theme colors use HSL CSS variables (see `tailwind.config.ts` extended colors)
- **Class Merging**: Use `cn()` utility from `@/lib/utils.ts` to merge Tailwind classes with `clsx` + `tailwind-merge`
- **Component Variants**: shadcn components use `class-variance-authority` (CVA) for variant styling (see `button.tsx`)

### TypeScript Patterns
- **Relaxed Type Checking**: `tsconfig.json` has `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false` - pragmatic over strict
- **Interface Props**: Components use TypeScript interfaces for props (see `MemberCardProps` in `MemberCard.tsx`)
- **Path Aliases**: `@/` maps to `./src/` (configured in both `vite.config.ts` and `tsconfig.json`)

### Component Patterns
- Functional components with TypeScript
- Props destructuring in function signature
- Inline tailwind classes (no CSS modules)
- Example from `MemberCard.tsx`:
```tsx
interface MemberCardProps {
  name: string;
  available: boolean;
  // ...
}

export default function MemberCard({ name, available }: MemberCardProps) {
  return <div className="bg-white rounded-xl shadow-lg">...</div>
}
```

### Data Flow
- **Backend Integration**: Supabase backend connected with TanStack Query for data fetching
- **API Hooks**: Custom hooks in `src/hooks/useApi.ts` handle all data operations
- **Automatic Fallback**: App uses mock data if Supabase not configured, ensuring it works in both development and production
- **Image Hosting**: Images use CloudFront CDN URLs (d64gsuwffb70l.cloudfront.net)
- **Type Safety**: Database types defined in `src/lib/database.types.ts` with relaxed TypeScript checking

## Theme System
Custom theme provider in `src/components/theme-provider.tsx` wraps the app:
- Supports `light`, `dark`, `system` themes
- Persists to localStorage
- Uses `next-themes` API but implemented for React (not Next.js)
- Currently defaults to `light` theme in `App.tsx`

## Important Files
- `src/components/AppLayout.tsx` - Main landing page content and layout
- `src/contexts/AppContext.tsx` - Global state management
- `components.json` - shadcn/ui configuration
- `tailwind.config.ts` - Extended Tailwind theme with custom colors
- `vite.config.ts` - Dev server on port 8080, SWC for fast refresh

## Dependencies to Know
- **UI Framework**: React 18 with SWC plugin for fast refresh
- **UI Library**: shadcn/ui (Radix UI + Tailwind CSS)
- **Routing**: react-router-dom v6
- **Forms**: react-hook-form + zod (installed but unused)
- **Icons**: lucide-react
- **Notifications**: sonner for toasts
- **Charts**: recharts (installed but unused)

## Backend & API Integration
- **Supabase**: Configured in `src/lib/supabase.ts` - add credentials to `.env` to enable
- **TanStack Query**: Fully integrated with custom hooks in `src/hooks/useApi.ts`
- **Database Schema**: Complete PostgreSQL schema in `supabase-schema.sql` with 3 tables
- **API Hooks**: `useMembers()`, `useEmergencyAlerts()`, `usePricingPlans()`, and mutations for updates
- **Fallback Mode**: App automatically uses mock data when backend isn't configured

## What's Scaffolded But Unused
- React Hook Form + Zod validation
- Recharts charting library
- Toast notifications (UI components exist, not used)
- Supabase Auth (client ready, auth not implemented yet)

## Critical Notes
- **Backend Connected**: Supabase integration complete - works with or without configuration
- **Automatic Fallback**: Uses mock data when Supabase credentials not provided in `.env`
- Interactive features (buttons, forms) are placeholders - implement using mutation hooks from `src/hooks/useApi.ts`
- To enable live data: Add Supabase credentials to `.env` and run `supabase-schema.sql` in your Supabase project
- See `BACKEND_INTEGRATION.md` for complete setup instructions
