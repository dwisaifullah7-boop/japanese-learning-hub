# 🎌 Japanese Learning Hub

Website pembelajaran bahasa Jepang terstruktur dari pemula hingga mahir.

## 🎯 Alur Belajar
Belajar → Latihan → Review → Mastery → Exam → Evaluasi → Progress

## 🚀 Quick Start

```bash
# Clone repository
git clone <repo-url>
cd japanese-learning-hub

# Install dependencies
npm install

# Setup database
npx prisma db push
npm run db:seed

# Jalankan dev server
npm run dev
```

## 📦 Tech Stack
- **Frontend:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Prisma ORM + SQLite (dev) / PostgreSQL (prod)
- **Auth:** NextAuth.js (Auth.js v5) + bcryptjs
- **Audio:** Web Speech API (TTS ja-JP)

## 🗺️ Roadmap

| Phase | Status | Deskripsi |
|-------|--------|-----------|
| 0 | ✅ Selesai | Project Foundation |
| 1 | ✅ Selesai | Account (Register/Login/Logout) |
| 2 | ✅ Selesai | Content & Database (Bab 1) |
| 3 | ✅ Selesai | Learn (Detail materi) |
| 4 | ✅ Selesai | Audio & Stroke Order |
| 5 | 🔄 WIP | Practice Core (Flashcard, MC, Type) |
| 6 | ⏳ Belum | Specialized Practice |
| 7 | ⏳ Belum | Mastery & Weak Material |
| 8 | ⏳ Belum | Review System |
| 9 | ⏳ Belum | Exam |
| 10 | ⏳ Belum | Search |
| 11 | ⏳ Belum | Progress & Dashboard |
| 12 | ⏳ Belum | Gamification (XP, Level, Streak) |
| 13 | ⏳ Belum | Visual Polish |
| 14 | ⏳ Belum | Settings & Accessibility |
| 15-18 | ⏳ Belum | Testing, Bug Fix, Optimization, Final |

## 📖 Dokumentasi
- [Changelog](docs/CHANGELOG.md)

## 🏗️ Struktur Project
```text
japanese-learning-hub/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data (Bab 1)
├── src/
│   ├── app/
│   │   ├── (auth)/        # Login, Register
│   │   ├── (main)/        # Home, Learn, Practice, dll
│   │   └── api/           # API routes (NextAuth, Register)
│   ├── components/
│   │   ├── ui/            # shadcn/ui
│   │   ├── layout/        # Navbar, Footer
│   │   ├── shared/        # PageHeader, MaterialCard, dll
│   │   ├── learn/         # HiraganaCard, VocabularyCard, dll
│   │   ├── practice/      # PracticeEngine
│   │   └── providers/     # AuthProvider, AudioProvider, ToastProvider
│   ├── lib/               # prisma.ts, utils.ts, errors.ts, auth.ts
│   └── middleware.ts      # Protected routes
├── docs/
│   └── CHANGELOG.md
```

## 📄 License
© 2026 Japanese Learning Hub. All rights reserved.
