File Structure for FlashLearn

📦 FlashLearn
├──� app/
│ ├── 📂 (home)/
│ │ ├── components/
│ │ │ ├── CallToAction.tsx
│ │ │ ├── FAQ.tsx
│ │ │ ├── Features.tsx
│ │ │ ├── Footer.tsx
│ │ │ ├── Hero.tsx
│ │ │ ├── HowItWorks.tsx
│ │ │ ├── Navbar.tsx
│ │ │ └── Pricing.tsx
│ │ └── page.tsx
│ ├── 📂 dashboard/
│ │ ├── 📂 collection/
│ │ │ ├── components/
│ │ │ │ ├── CollectionCard.tsx
│ │ │ │ ├── CreateCollectionDialog.tsx
│ │ │ │ ├── CreateQuizDialog.tsx
│ │ │ │ └── SkeletonCollectionPage.tsx
│ │ │ ├── [id]/
│ │ │ │ ├── components/
│ │ │ │ │ ├── CollectionHeader.tsx
│ │ │ │ │ ├── CreateQuizModal.tsx
│ │ │ │ │ └── QuizCard.tsx
│ │ │ │ ├── collection-content.tsx
│ │ │ │ ├── edit-quiz-modal.tsx
│ │ │ │ ├── loading.tsx
│ │ │ │ ├── page.tsx
│ │ │ │ ├── quiz-history.tsx
│ │ │ │ └── quiz-section.tsx
│ │ │ ├── loading.tsx
│ │ │ └── page.tsx
│ │ ├── components/
│ │ │ ├── DashboardStats.tsx
│ │ │ ├── RecentActivity.tsx
│ │ │ ├── SkeletonStats.tsx
│ │ │ ├── SkeletonCollections.tsx
│ │ │ ├── SkeletonActivity.tsx
│ │ │ └── StatsCard.tsx
│ │ ├── loading.tsx
│ │ └── page.tsx
│ ├── 📂 actions/
│ │ ├── collection.ts
│ │ ├── dashboard.ts
│ │ ├── quiz.ts
│ │ └── stats.ts
│ ├── globals.css
│ ├── layout.tsx
│ └── manifest.json
│
├── 📂 components/
│ ├── 📂 ui/
│ │ ├── accordion.tsx
│ │ ├── button.tsx
│ │ ├── card.tsx
│ │ ├── collapsible.tsx
│ │ ├── dialog.tsx
│ │ ├── input.tsx
│ │ ├── scroll-area.tsx
│ │ ├── sheet.tsx
│ │ └── sidebar.tsx
│ ├── app-sidebar.tsx
│ ├── markdown.tsx
│ └── nav-user.tsx
│
├── 📂 lib/
│ ├── auth.ts
│ ├── schemas.ts
│ └── utils.ts
│
├── 📂 docs/
│ ├── design_guidelines.md
│ └── file_structure.md
│
├── 📂 prisma/
│ ├── migrations/
│ └── schema.prisma
│
├── .env
├── .eslintrc.json
├── .gitignore
├── components.json
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json

Key Patterns:

1. **App Router Structure**
   - Uses Next.js 13+ App Router
   - Pages defined by page.tsx files
   - Layouts managed by layout.tsx

2. **Route Groups**
   - (home) for marketing pages
   - dashboard for authenticated routes
   - Parentheses prevent folder from affecting URL structure

3. **Component Organization**
   - Page-specific components in local components/ folders
   - Shared UI components in components/ui/
   - Reusable components at components/ root
   - Loading states with skeleton components

4. **Server/Client Components**
   - Server Components by default
   - Client Components marked with 'use client'
   - Server Actions in app/actions/
   - Suspense boundaries for loading states

5. **State Management**
   - Server state with Server Components
   - Client state with React hooks
   - Form state with react-hook-form

6. **Styling**
   - Tailwind CSS for utilities
   - CSS Modules for component styles
   - Global styles in globals.css

7. **Configuration**
   - Next.js config in next.config.mjs
   - TypeScript config in tsconfig.json
   - Tailwind config in tailwind.config.ts
   - Components config in components.json

8. **Documentation**
   - Design system in design_guidelines.md
   - File structure in file_structure.md

9. **Database**
   - Prisma schema in schema.prisma
   - Migrations in prisma/migrations/

10. **Authentication**
    - Auth configuration in lib/auth.ts
    - Protected routes in dashboard/

This structure follows Next.js best practices and maintains clear separation of concerns while keeping related files close together.