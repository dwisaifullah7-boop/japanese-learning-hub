# Changelog

Semua perubahan penting pada proyek ini akan dicatat di file ini.

## [Unreleased]

## [Phase 5 - WIP] - 2026-10-04
### Added
- Practice Engine (Flashcard, Multiple Choice, Type Answer)
- Model PracticeAttempt di database
- Route dinamis /practice/[mode]

### Fixed
- Hydration mismatch pada PracticeEngine (Math.random di useMemo)
- Data duplikat di seed script (tambah deleteMany)

## [Phase 4] - 2026-10-04
### Added
- AudioProvider dengan Web Speech API (TTS ja-JP)
- AudioButton interaktif dengan spinner
- StrokeOrderAnimation dengan grid bantu
- Integrasi audio ke semua material cards

### Fixed
- Partikel は dibaca "ha" oleh TTS → solusi: gunakan contoh kalimat untuk audio

## [Phase 3] - 2026-10-04
### Added
- Breadcrumb component
- Material cards khusus (Hiragana, Vocabulary, Particle, Grammar)
- Font utility .font-japanese
- Halaman detail lesson dirombak total

## [Phase 2] - 2026-10-04
### Added
- Schema materi lengkap (Course, Lesson, Hiragana, Katakana, Kanji, Vocabulary, Particle, Grammar)
- Seed script dengan deleteMany untuk mencegah duplikasi
- Halaman /learn dynamic dari database
- Placeholder pages untuk sub-route learn

## [Phase 1] - 2026-10-04
### Added
- NextAuth.js dengan CredentialsProvider
- Register & Login UI dengan validasi
- Navbar dinamis (user/logout vs login/register)
- Middleware protected routes
- Password hashing dengan bcryptjs

## [Phase 0] - 2026-10-04
### Added
- Inisialisasi Next.js + TypeScript + Tailwind + shadcn/ui
- Prisma ORM + SQLite
- Layout responsif (Navbar, Footer, Main, Auth)
- Routing lengkap untuk semua menu
- Component dasar (PageHeader, MaterialCard, AudioButton, dll)
- Error handling (loading, error, not-found, global-error)
