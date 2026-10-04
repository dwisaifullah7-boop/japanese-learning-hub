# Changelog

Semua perubahan penting pada proyek ini akan dicatat di file ini.

## [Phase 8] - 2026-10-04
### Added
- API `GET /api/review/fetch` — Mengumpulkan materi status REVIEW (Weak Material) & LEARNING untuk semua 6 tipe materi (vocabulary, hiragana, katakana, kanji, particle, grammar)
- Halaman **Review Hub** (`/practice/review`) — Ringkasan stat card materi review & tombol "Mulai Sesi Review"
- Halaman **Review Session** (`/practice/review-session`) & `ReviewSessionClient` wrapper untuk mengulang materi review secara interaktif dengan `PracticeEngine`
- Dukungan per-soal `materialType` pada `PracticeEngine` agar tracking mastery tetap akurat pada sesi review campuran
- Kartu **Review Session** pada halaman `/practice` (Practice Hub)
- Update navigasi tombol review pada halaman `/mastery` ke `/practice/review`

## [Phase 7] - 2026-10-04
### Added
- Model `Mastery` di database (correctCount, attemptCount, level: NEW/LEARNING/REVIEW/MASTERED)
- `src/lib/mastery.ts` — utility: `calculateLevel()`, `updateMastery()`, `getMasterySummary()`, `getWeakMaterials()`
- API `GET /api/mastery` — summary jumlah per level untuk user login
- API `GET /api/mastery/weak` — daftar materi lemah (accuracy < 60%)
- Halaman `/mastery` — progress bar, 4 level cards, preview weak materials, CTA jika belum ada data
- Halaman `/review` — daftar lengkap materi lemah dengan accuracy bars, badges, & tombol latih
- Link **Review** di Navbar (desktop & mobile)
### Changed
- `POST /api/practice/attempt` — sekarang otomatis memanggil `updateMastery()` setelah setiap attempt

## [Phase 5 Fix] - 2026-10-04
### Fixed
- Flashcard mode: menambahkan self-grading **"Sudah Hafal"** / **"Belum Hafal"** agar attempt ke DB akurat (tidak selalu `isCorrect: true`)

## [Phase 6] - 2026-10-04
### Added
- Mode latihan baru: **Audio Quiz** (auto play suara audio & tebak arti/kata)
- Kuis Spesifik Kategori (Specialized Practice): Vocabulary Quiz, Hiragana Quiz, Katakana Quiz, Kanji Quiz, Particle Quiz, Grammar Quiz
- Practice Hub UI diperbarui dengan section Kuis Spesifik
- API attempt recording & DB persistence terhubung di semua jenis kuis

## [Phase 5] - 2026-10-04
### Added
- Practice Engine (Flashcard, Multiple Choice, Type Answer)
- Model PracticeAttempt di database
- API endpoint `POST /api/practice/attempt`
- Route dinamis `/practice/[mode]` untuk 6 tipe materi

### Fixed
- Hydration mismatch pada PracticeEngine
- Halaman `/account` di-refaktor dari dummy text menjadi profil user nyata + Logout

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
