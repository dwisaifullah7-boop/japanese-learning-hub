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
| 5 | ✅ Selesai | Practice Core (Flashcard, MC, Type) |
| 6 | ✅ Selesai | Specialized Practice & Audio Quiz |
| 7 | ✅ Selesai | Mastery & Weak Material Tracking |
| 8 | ✅ Selesai | Review System & Review Hub |
| 9 | ✅ Selesai | Exam Engine & Evaluasi Ujian |
| 10 | ✅ Selesai | Multi-table & Web Search Engine |
| 11-12 | ✅ Selesai | Progress, Gamifikasi (XP/Level/Streak), & Dashboard |
| 13-14 | ✅ Selesai | Visual Polish, Settings, & Aksesibilitas |
| 15-18 | ✅ Selesai | Testing Audit, Bug Fix, Optimasi, & Production Release |
| v4.0 | ✅ Selesai | Advanced: Perbandingan Partikel & Stroke Canvas |
| v5.0 | ✅ Selesai | Smart Learning & Recommendation Engine |
| v6.0 | ✅ Selesai | Content Expansion Bab 2 & Katakana Lengkap |
| v7.0 | ✅ Selesai | Interactive Experience: Home dynamic stats & Kanji/Katakana Canvas |
| v8.0 | ✅ Selesai | Bab 3 Curriculum Expansion & Modular Exam Presets |
| v9.0 | ✅ Selesai | Bab 4 Time System, Verbs & Interactive Masu Conjugator |

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
