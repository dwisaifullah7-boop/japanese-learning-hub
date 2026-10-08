# Changelog

Semua perubahan penting pada proyek ini akan dicatat di file ini.

## [v9.0-verbs-and-time-expansion] - Bab 4 Time System, Verbs & Interactive Masu Conjugator - 2026-10-08
### Added
- **Lesson Bab 4** Minna no Nihongo — Sistem Waktu (今 ～時 ～分), Hari (何曜日), Rentang Waktu (～から ～まで), dan Pengenalan Kata Kerja Dasar
- **Halaman Konjugasi Kata Kerja Interaktif** (`/learn/verbs`) — Tabel & kartu interaktif konjugasi 4 bentuk Masu formal (Kini Positif, Negatif, Lampau, & Lampau Negatif) dengan tombol audio pelafalan individual serta filter pencarian instan
- **Portal Belajar Khusus** di Learn Hub (`/learn`) — Akses cepat ke Tabel Konjugasi Kata Kerja dan Perbandingan Partikel
- **Kosakata Bab 4** (+16 kata: 起きます, 寝ます, 働きます, 休みます, 勉強します, 終わります, 今, 何時, 何分, 半, 午前, 午後, 朝, 昼, 晩, 毎日)
- **Pola Tata Bahasa Bab 4** (+4 pola: 今 [Waktu] です, [Kata Kerja] ます/ません/ました/ませんでした, [Waktu] に [KK], [Waktu 1] から [Waktu 2] まで)
- **Kanji Bab 4** (+8 karakter JLPT N5 Waktu & Dasar: 時, 分, 半, 今, 毎, 何, 午, 前)
- **Paket Ujian Bab 4** pada Exam Hub (`/exam` & `/api/exam/questions?preset=bab4`)
- Database total: 46 Hiragana, 46 Katakana, 34 Kanji, 61 Kosakata, 8 Partikel, 17 Pola Tata Bahasa, 4 Lessons

## [v8.0-curriculum-expansion] - Bab 3 Curriculum Expansion & Modular Exam Presets - 2026-10-08
### Added
- **Lesson Bab 3** Minna no Nihongo — Materi Lokasi & Fasilitas (ここ・そこ・あそこ・どこ, こちら・そちら・あちら・どちら)
- **Kosakata Bab 3** (+15 kata: 教室, 食堂, 事務所, 会議室, 受付, 部屋, 階段, dll.)
- **Pola Tata Bahasa Bab 3** (+4 pola: ここ/そこ/あそこ は [Tempat] です, [Subjek] は [Tempat] です, どこ/どちら ですか, [Negara] の [Benda] です)
- **Kanji Bab 3** (+8 karakter JLPT N5: 東, 西, 南, 北, 口, 目, 手, 足)
- **Preset Ujian Bab Mandiri** (`/api/exam/questions` & `/exam`) — 6 paket ujian: Comprehensive, Bab 1, Bab 2, Bab 3, Tata Bahasa & Partikel, serta Kanji & Kosakata
- Database total: 46 Hiragana, 46 Katakana, 26 Kanji, 45 Kosakata, 8 Partikel, 13 Pola Tata Bahasa, 3 Lessons

## [v7.0-interactive-experience] - Interactive Mastery & Complete Experience - 2026-10-08
### Added
- Halaman **Home** (`/home`) — Terintegrasi dengan metrik pembelajaran dinamis (Total XP riil, Level, Streak harian, progress target harian, & quick portals)
- Komponen **KatakanaGridClient** (`KatakanaGridClient.tsx`) & integrasi ke `/learn/katakana` dengan modal detail karakter, audio pelafalan, serta **StrokePracticeCanvas** untuk latihan menulis Katakana
- Komponen **KanjiGridClient** (`KanjiGridClient.tsx`) & integrasi ke `/learn/kanji` dengan modal detail karakter, cara baca 音読み (Onyomi) & 訓読み (Kunyomi), audio pelafalan, serta **StrokePracticeCanvas** untuk latihan menulis Kanji N5
- Pembaruan dokumentasi roadmap pada `README.md` dan `CHANGELOG.md`

## [v6.0-content-expansion] - Content Expansion Bab 2 & Complete Katakana - 2026-10-08
### Added
- **Lesson Bab 2** Minna no Nihongo (Demonstratif これ・それ・あれ, angka, benda, dan harga)
- Aksara **Katakana Lengkap** (46 karakter standar Gojūon)
- **Kosakata Bab 2** (+15 kata: これ, それ, あれ, この, その, あの, じしょ, ざっし, しんぶん, dll.)
- **Pola Tata Bahasa Bab 2** (+4 pola: これ/それ/あれ は ～です, この/その/あの ～, ～ですか、～ですか, ～は いくらですか)
- **Kanji Bab 2** (+8 karakter JLPT N5: 山, 川, 田, 中, 上, 下, 金, 火)
- Halaman **Lesson Detail** (`/learn/lesson/[lessonId]`) — Menampilkan seluruh materi per bab secara terstruktur dengan audio button
- Halaman **Learn Hub** (`/learn`) — Rebuild dengan counter materi dinamis dan badge rincian materi per lesson

## [v5.0-smart-learning] - Smart Learning & Recommendation Engine - 2026-10-08
### Added
- Rebuild seluruh halaman belajar: Hiragana (dengan `HiraganaGridClient`), Partikel, Katakana, Kanji, Grammar, dan Kosakata
- API **Smart Recommendation Engine** (`/api/recommend`) — Menganalisis kelemahan mastery, akurasi per kategori, dan materi yang belum disentuh
- Komponen **RecommendationWidget** pada Dashboard untuk rekomendasi belajar harian otomatis
- Script ekspansi database idempoten (`prisma/seed-expand.ts`)

## [v4.0-advanced] - Advanced Learning Expansion - 2026-10-07
### Added
- Halaman **Perbandingan Partikel** (`/learn/particle/compare`) — Panduan interaktif perbandingan partikel membingungkan (`は vs が`, `に vs で`, `に vs へ`, `は vs も`) dengan audio pelafalan & contoh kalimat
- Komponen **StrokePracticeCanvas** (`src/components/shared/StrokePracticeCanvas.tsx`) — Kanvas menggambar interaktif (HTML5 Canvas) untuk latihan menulis karakter Hiragana, Katakana, & Kanji dengan dukungan sentuhan/mouse, fitur undo stroke, panduan bayangan karakter (guide overlay), & tombol hapus

## [v3.0-production] - Phase 15-18 Complete - 2026-10-07
### Added & Verified
- **Phase 15 (Testing)**: Audit fungsionalitas penuh untuk 11 modul utama (`Login`, `Learn`, `Audio`, `Practice`, `Mastery`, `Review`, `Exam`, `Search`, `Progress`, `Settings`, `Dashboard`).
- **Phase 16 (Bug Fix)**: Perbaikan peringatan middleware Next.js 16 (`export const proxy = auth(...)`), penanganan tipe data opsional, & fallback guard pada data kosong.
- **Phase 17 (Optimization)**: Pengoptimalan performa kompilasi `Turbopack`, eksekusi paralel Prisma query pada API search & exam, serta minifikasi aset statis.
- **Phase 18 (Final Release Check)**: Verifikasi checklist akhir 100% lulus tanpa kendala. Sistem siap produksi (*Production Ready*).

## [v2.0-final] - Phase 11-14 Complete - 2026-10-07
### Added
- `src/lib/progress.ts` — Modul kalkulasi XP, Level, Streak, Akurasi, & Achievements interaktif
- API `GET /api/user/stats` — Endpoint statistik pembelajaran & gamifikasi lengkap
- Halaman **Progress & Statistics** (`/progress`) — Rebuild penuh dengan Banner Hero Level/XP, Streak harian, Distribusi Mastery, & Kartu Pencapaian (Achievements)
- Halaman **Dashboard Utama** (`/dashboard`) — Rebuild penuh dengan banner personalisasi user, widget Target Latihan Harian, Rekomendasi Langkah Berikutnya, & Feed Aktivitas Terakhir
- Komponen `SettingsClient` & Halaman **Settings** (`/settings`) — Pengaturan Kecepatan Suara TTS ja-JP (Normal/Slow), Auto-play Audio, Sound Effects, Tema Tampilan (Default/Sakura), Reduced Motion, & Target Harian
- Perbaikan Hydration Mismatch di `Navbar.tsx` dengan `isMounted` guard & pulse loading skeleton

## [Phase 10] - 2026-10-05
### Added
- API `GET /api/search` — Endpoint pencarian lokal multi-tabel terpadu untuk 6 tipe materi (vocabulary, kanji, particle, grammar, hiragana, katakana)
- API `GET /api/search/web` — Endpoint rujukan pencarian eksternal pembelajaran bahasa Jepang (Google Search, Jisho.org, Wiktionary)
- Komponen `SearchClient` (`src/components/search/SearchClient.tsx`) — Antarmuka pencarian interaktif dengan filter tab kategori, quick suggestion chips, audio button, & rujukan web
- Halaman **Search Engine** (`/search`) — Rebuild penuh halaman pencarian terpadu dengan integrasi `SearchClient`

## [Phase 9] - 2026-10-04
### Added
- Model `ExamResult` di database (score, totalQuestions, percentage, passed, durationSeconds, user relation)
- API `GET /api/exam/questions` — Pembuat soal ujian acak berdasar preset (`comprehensive`, `grammar-particle`, `kanji-vocab`)
- API `POST /api/exam/submit` — Pengolah nilai ujian, persentase, status lulus (>=70%), simpan `ExamResult`, & auto-update `Mastery`
- API `GET /api/exam/history` — Mengambil riwayat ujian milik user
- Komponen `ExamEngine` — Controller ujian interaktif dengan timer countdown MM:SS, palette nomor 1..N, audio support, & dialog konfirmasi submit
- Komponen `ExamResultView` — Tampilan hasil ujian interaktif dengan badge kelulusan, skor, & pembahasan kunci jawaban tiap nomor
- Halaman **Exam Hub** (`/exam`) — Pilihan preset ujian, petunjuk pengerjaan, & tabel riwayat hasil ujian lengkap
- Halaman **Sesi Ujian** (`/exam/session`) — Halaman pengerjaan ujian aktif dengan Suspense fallback

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
