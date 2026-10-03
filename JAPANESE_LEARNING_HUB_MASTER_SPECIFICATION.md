# JAPANESE LEARNING HUB
## Master Specification, Rules, Workflow, and Development Roadmap

> **Purpose:** Dokumen ini adalah pedoman utama untuk membangun Japanese Learning Hub secara bertahap.
>
> **Prinsip utama:** Jangan mengerjakan semua fitur sekaligus. Selesaikan satu tahap, test, lalu lanjut ke tahap berikutnya.
>
> **Alur belajar inti:**
>
> `Belajar → Latihan → Review → Mastery → Exam → Evaluasi → Progress`

---

# 1. GAMBARAN UMUM

**Japanese Learning Hub** adalah website pembelajaran bahasa Jepang yang membantu pengguna:

- mempelajari materi secara bertahap;
- mendengarkan pelafalan;
- berlatih dengan berbagai jenis soal;
- mengulang materi yang belum dikuasai;
- memahami penggunaan partikel dan grammar;
- mengikuti exam;
- melihat mastery dan progress;
- mencari materi di database lokal;
- menggunakan pencarian web untuk informasi tambahan;
- menjaga motivasi melalui XP, level, streak, dan achievement.

Website tidak boleh hanya menjadi kumpulan materi. Setiap fitur harus terhubung dengan sistem pembelajaran.

---

# 2. TUJUAN PROYEK

## 2.1 Tujuan utama

1. Membantu pemula belajar bahasa Jepang secara terstruktur.
2. Menyediakan materi dalam satu tempat.
3. Membantu pengguna memahami Hiragana, Katakana, Kanji, Vocabulary, Particle, dan Grammar.
4. Menyediakan audio/voice untuk materi yang relevan.
5. Memberikan latihan dengan beberapa bentuk soal.
6. Mendeteksi materi yang belum dikuasai.
7. Memberikan review berdasarkan kelemahan pengguna.
8. Mengukur hasil melalui Mastery dan Exam.
9. Menampilkan perkembangan pengguna.
10. Membuat pengalaman belajar interaktif tetapi tetap fokus pada pembelajaran.

---

# 3. TARGET PENGGUNA

Target utama:

- Pemula bahasa Jepang.
- Pelajar yang sedang mempelajari Minna no Nihongo.
- Pengguna yang ingin belajar mandiri.
- Pengguna yang ingin berlatih Kanji, Vocabulary, Particle, Grammar, Hiragana, dan Katakana.

Target awal konten:

```text
Minna no Nihongo 1
└── Bab 1–5
```

Pengembangan materi berikutnya dapat diperluas secara bertahap.

---

# 4. PRINSIP PENGEMBANGAN

Semua development harus mengikuti aturan berikut:

1. Fitur utama dibuat terlebih dahulu.
2. Fitur baru tidak boleh merusak fitur lama.
3. Setiap fitur harus mempunyai tujuan pembelajaran.
4. Jangan menambahkan fitur hanya karena terlihat menarik.
5. Data harus terstruktur dan mudah diperbarui.
6. UI harus konsisten.
7. Website harus responsive.
8. Audio dan animasi tidak boleh mengganggu proses belajar.
9. Progress hanya berubah berdasarkan aktivitas pengguna.
10. Semua fitur yang menyimpan progress harus terhubung dengan akun pengguna.
11. Setiap tahap harus diuji sebelum tahap berikutnya.
12. Jangan menganggap fitur selesai hanya karena halaman sudah tampil.

---

# 5. ARSITEKTUR FITUR UTAMA

```text
JAPANESE LEARNING HUB
│
├── HOME
│
├── LEARN
│   ├── Hiragana
│   ├── Katakana
│   ├── Kanji
│   ├── Vocabulary
│   ├── Particle
│   ├── Grammar
│   └── Lessons
│
├── PRACTICE
│   ├── Flashcard
│   ├── Multiple Choice
│   ├── Type Answer
│   ├── Audio Quiz
│   ├── Hiragana Quiz
│   ├── Katakana Quiz
│   ├── Kanji Quiz
│   ├── Vocabulary Quiz
│   ├── Particle Quiz
│   ├── Grammar Quiz
│   └── Review
│
├── MASTERY
│   ├── New
│   ├── Learning
│   ├── Review
│   └── Mastered
│
├── EXAM
│
├── SEARCH
│   ├── Local Database
│   └── Web / Google
│
├── PROGRESS
│   ├── Statistics
│   ├── Weak Material
│   ├── XP
│   ├── Level
│   ├── Streak
│   └── Achievement
│
├── DAILY GOAL
│
├── DASHBOARD
│
├── SETTINGS
│   ├── Audio
│   ├── Animation
│   ├── Theme
│   └── Learning
│
└── ACCOUNT
    ├── Register
    ├── Login
    ├── Profile
    └── Logout
```

---

# 6. MODEL MATERI PEMBELAJARAN

## 6.1 Hiragana

Setiap karakter dapat memiliki:

```text
character
romaji
audio
stroke_order
example
```

Contoh:

```text
あ
a
[Audio]
[Stroke Animation]
```

## 6.2 Katakana

Struktur sama dengan Hiragana:

```text
character
romaji
audio
stroke_order
example
```

## 6.3 Kanji

```text
Kanji
├── character
├── hiragana
├── romaji
├── meaning
├── onyomi
├── kunyomi
├── jlpt_level
├── lesson
├── examples
├── example_sentences
├── audio
├── stroke_order
├── mnemonic
└── related_vocabulary
```

## 6.4 Vocabulary

```text
Vocabulary
├── word
├── kanji
├── kana
├── romaji
├── meaning
├── word_type
├── lesson
├── audio
├── example
└── related_kanji
```

## 6.5 Particle

Particle harus menjadi materi khusus.

```text
Particle
├── particle
├── reading
├── meaning
├── function
├── pattern
├── example
├── translation
├── audio
├── common_mistake
└── lesson
```

Contoh:

```text
は
```

Fungsi:

```text
Penanda topik.
```

Contoh:

```text
わたしは がくせいです。
Watashi wa gakusei desu.
Saya adalah siswa.
```

Contoh particle yang perlu didukung pada materi awal:

```text
は
が
を
に
へ
で
と
も
の
から
まで
```

Catatan: fungsi particle harus dijelaskan berdasarkan contoh dan konteks, bukan hanya diterjemahkan menjadi satu kata.

## 6.6 Grammar

```text
Grammar
├── pattern
├── meaning
├── usage
├── example
├── translation
├── audio
├── note
└── lesson
```

---

# 7. STRUKTUR LESSON / BAB

Konten harus dapat dikelompokkan berdasarkan course dan bab.

```text
Minna no Nihongo 1
│
├── Bab 1
│   ├── Vocabulary
│   ├── Kanji
│   ├── Particle
│   └── Grammar
│
├── Bab 2
│   ├── Vocabulary
│   ├── Kanji
│   ├── Particle
│   └── Grammar
│
├── Bab 3
├── Bab 4
└── Bab 5
```

Setiap lesson harus dapat diarahkan ke:

```text
Lesson
 ↓
Learn
 ↓
Practice
 ↓
Review
 ↓
Mastery
```

---

# 8. SISTEM AUDIO / VOICE

Audio adalah bagian dari pembelajaran, bukan sekadar dekorasi.

## 8.1 Audio pada materi

Materi yang relevan dapat memiliki:

```text
🔊 Play Audio
```

Contoh:

```text
わたし

[ 🔊 Play ]

Watashi
Saya
```

## 8.2 Audio kalimat

```text
わたしは がくせいです。

[ 🔊 Play ]

Saya adalah siswa.
```

## 8.3 Audio Practice

Mode:

```text
Audio Practice
├── Listen & Choose
├── Listen & Type
└── Listen & Meaning
```

Contoh:

```text
🔊 [Play]

Apa kata yang kamu dengar?

A. せんせい
B. がくせい
C. いしゃ
D. かいしゃいん
```

## 8.4 Pengaturan audio

Settings:

```text
Voice ON/OFF
Sound Effect ON/OFF
Volume
Auto Play Audio ON/OFF
```

---

# 9. STROKE ORDER

Hiragana, Katakana, dan Kanji dapat memiliki animasi urutan goresan.

Contoh:

```text
日

[Stroke 1]
[Stroke 2]
[Stroke 3]
...
```

Versi awal:

- tampilkan animasi;
- tombol replay;
- tombol reset jika ada latihan.

Versi lanjutan dapat menambahkan handwriting recognition.

---

# 10. SISTEM PARTICLE KHUSUS

> Jangan mencampur **Japanese Particle (助詞)** dengan **Visual Particle Effect**. Keduanya adalah fitur berbeda.

## 10.1 Particle Reference

```text
Particle Reference
├── Semua
├── Dasar
├── Waktu
├── Tempat
└── Lainnya
```

Setiap particle menampilkan:

```text
Particle
Fungsi
Pola
Contoh
Terjemahan
Audio
Kesalahan umum
Practice
```

## 10.2 Particle Comparison

Sediakan perbandingan particle yang sering membingungkan.

Contoh:

```text
は vs が
に vs で
に vs へ
は vs も
```

Contoh:

```text
学校に行きます。
Pergi ke sekolah.

学校で勉強します。
Belajar di sekolah.
```

## 10.3 Particle Error Guide

Jika pengguna sering salah:

```text
Weak Particle

に
で

[Review Difference]
```

Review harus memberikan contoh penggunaan.

---

# 11. PRACTICE

## 11.1 Jenis latihan

```text
Practice
├── Flashcard
├── Multiple Choice
├── Type Answer
├── Audio Quiz
├── Hiragana Quiz
├── Katakana Quiz
├── Kanji Quiz
├── Vocabulary Quiz
├── Particle Quiz
├── Grammar Quiz
└── Review
```

## 11.2 Aturan setiap soal

Setiap soal harus memiliki:

```text
Question
Options / Input
Correct Answer
Validation
Feedback
XP
Progress Update
Mastery Update
```

## 11.3 Contoh Particle Quiz

```text
わたし ___ がくせいです。

A. を
B. は
C. で
D. に
```

Benar:

```text
✓ Correct
+XP

は digunakan untuk menandai topik.
```

Salah:

```text
✗ Incorrect

Jawaban: は

Materi dimasukkan ke Weak Material.
```

---

# 12. FLASHCARD

Flashcard digunakan untuk pengenalan dan pengulangan.

```text
Front
 ↓
User thinks
 ↓
Reveal Answer
 ↓
User evaluates
 ↓
Update learning state
```

Data dapat menampilkan:

```text
Kanji / Word / Kana
Audio
Meaning
Example
```

---

# 13. MASTERY SYSTEM

Status dasar:

```text
NEW
 ↓
LEARNING
 ↓
REVIEW
 ↓
MASTERED
```

Mastery tidak boleh ditentukan hanya dari satu jawaban benar.

Sistem harus mempertimbangkan riwayat latihan.

Contoh konsep:

```text
Materi
 ↓
Practice
 ↓
Correct / Incorrect
 ↓
Evaluation
 ↓
Update Mastery
```

Materi yang sering salah diprioritaskan untuk review.

---

# 14. WEAK MATERIAL

```text
Practice
 ↓
Incorrect
 ↓
Record Material
 ↓
Weak Material
 ↓
Review
 ↓
Practice Again
 ↓
Mastery
```

Weak Material dapat dikelompokkan:

```text
Weak Kanji
Weak Vocabulary
Weak Particle
Weak Grammar
Weak Hiragana
Weak Katakana
```

---

# 15. SISTEM REVIEW

Review harus mengambil materi dari:

1. Weak Material.
2. Materi yang belum dikuasai.
3. Materi yang sudah lama tidak dilatih.
4. Materi yang dipilih pengguna.

Contoh:

```text
Review Today

10 Vocabulary
5 Kanji
3 Particle
2 Grammar
```

Review harus mengarahkan kembali ke Mastery.

---

# 16. EXAM

Alur:

```text
Persiapan
 ↓
Exam
 ↓
Jawaban
 ↓
Penilaian
 ↓
Score
 ↓
Result
 ↓
Progress
```

Exam dapat mencampur:

```text
Vocabulary
Kanji
Particle
Grammar
Reading
Audio
```

Aturan kelulusan harus ditentukan sebelum implementasi.

---

# 17. SEARCH

Search harus mendukung:

```text
Kanji
Hiragana
Katakana
Romaji
Bahasa Indonesia
Grammar
Particle
Topik
```

Contoh:

```text
山
やま
yama
gunung
```

Alur:

```text
Input
 ↓
Normalize
 ↓
Local Database
 ↓
Local Result
 ↓
Optional Web Search
```

Hasil lokal harus menjadi bagian utama karena terintegrasi dengan sistem belajar.

Hasil web digunakan untuk informasi tambahan.

---

# 18. PROGRESS

Progress berasal dari aktivitas pengguna.

```text
Learn
 ↓
Practice
 ↓
Answer
 ↓
Record
 ↓
Update Progress
 ↓
Update Mastery
 ↓
Update Statistics
```

Data progress dapat mencakup:

```text
Materi dipelajari
Materi dikuasai
Jumlah latihan
Benar
Salah
Exam score
Weak Material
XP
Streak
Achievement
```

---

# 19. DAILY GOAL

Contoh:

```text
Today's Goal

████████░░ 80%

4 / 5 selesai

☑ 10 Vocabulary
☑ 5 Kanji
☑ 3 Particle
□ 1 Practice
□ 1 Review
```

Daily Goal tidak boleh menggantikan progress akademik. Ini hanya target aktivitas.

---

# 20. DASHBOARD

Dashboard menjadi pusat informasi.

```text
Dashboard
├── Learning Progress
├── Kanji Mastery
├── Vocabulary
├── Grammar
├── Particle
├── Weak Material
├── XP
├── Level
├── Streak
├── Achievement
└── Daily Goal
```

Dashboard harus menunjukkan informasi penting tanpa memaksa pengguna membuka banyak halaman.

---

# 21. GAMIFICATION

## 21.1 XP

Contoh aktivitas:

```text
Menyelesaikan materi → XP
Menyelesaikan latihan → XP
Menyelesaikan review → XP
Lulus exam → XP
```

Nilai XP harus ditentukan dalam konfigurasi sistem.

## 21.2 Level

```text
XP
 ↓
Level
```

Level hanya menunjukkan perkembangan gamifikasi dan tidak boleh disamakan dengan kemampuan bahasa secara akademik.

## 21.3 Streak

```text
Belajar hari ini
 ↓
Streak +1
 ↓
Belajar besok
 ↓
Streak +1
```

Aturan streak harus eksplisit dan konsisten.

## 21.4 Achievement

Contoh:

```text
First Lesson
First Practice
First Kanji Mastered
First Exam
7 Day Streak
Vocabulary Milestone
```

Achievement tidak boleh mengubah nilai akademik utama.

---

# 22. VISUAL PARTICLE EFFECT & ANIMATION

Ini berbeda dari Japanese Particle.

Efek visual dapat digunakan untuk:

```text
Correct Answer
Wrong Answer
XP Gain
Level Up
Achievement
Mastery
Streak
Exam Result
```

Contoh:

```text
✓ Correct!
+10 XP
[small particle effect]
```

Aturan:

- tidak berlebihan;
- tidak menutupi soal;
- tidak menghambat interaksi;
- cepat;
- responsive;
- dapat dimatikan;
- mendukung reduced motion.

Efek tidak boleh menjadi fokus utama halaman belajar.

---

# 23. SETTINGS

```text
Settings
│
├── Audio
│   ├── Voice
│   ├── Sound Effect
│   ├── Volume
│   └── Auto Play
│
├── Appearance
│   ├── Theme
│   ├── Animation
│   └── Reduced Motion
│
└── Learning
    ├── Daily Goal
    ├── Practice Preference
    └── Review Preference
```

---

# 24. ACCOUNT & DATA USER

Karena progress bersifat personal, sistem membutuhkan user account.

```text
Account
├── Register
├── Login
├── Logout
├── Session
└── Profile
```

Data user harus terhubung dengan:

```text
Progress
Mastery
Weak Material
XP
Level
Streak
Achievement
Daily Goal
Settings
```

---

# 25. STRUKTUR DATA MINIMUM

Contoh entitas:

```text
users
lessons
hiragana
katakana
kanji
vocabulary
particles
grammar
examples
audio
practice_questions
practice_attempts
mastery
weak_material
exam
exam_questions
exam_attempts
progress
xp
streak
achievements
user_achievements
settings
```

Relasi harus ditentukan sebelum database final dibuat.

---

# 26. SECURITY & ERROR HANDLING

Fitur minimum:

```text
Authentication
Authorization
Session Handling
Input Validation
Error Handling
Data Validation
Safe Password Storage
```

Jangan menyimpan password pengguna dalam bentuk plaintext.

Error pengguna harus ditampilkan dengan pesan yang mudah dipahami.

Error teknis tidak boleh membocorkan informasi sensitif.

---

# 27. ACCESSIBILITY

Website harus mempertimbangkan:

- keyboard navigation;
- kontras yang cukup;
- ukuran teks yang nyaman;
- label tombol yang jelas;
- alternatif teks untuk elemen penting;
- audio tidak boleh menjadi satu-satunya cara memahami materi;
- reduced motion;
- responsive mobile.

---

# 28. UI/UX RULES

Sebelum development final:

```text
Wireframe
 ↓
Layout
 ↓
Navigation
 ↓
Component
 ↓
Color
 ↓
Typography
 ↓
Responsive
 ↓
Animation
```

Prinsip:

```text
Simple
+
Clean
+
Readable
+
Interactive
+
Consistent
```

Visual boleh keren, tetapi tidak boleh mengalahkan keterbacaan materi.

---

# 29. ROADMAP DEVELOPMENT BERTAHAP

## PHASE 0 — Project Foundation

Tujuan: membuat fondasi.

Kerjakan:

- struktur project;
- routing/navigation;
- layout dasar;
- component dasar;
- database/storage;
- error handling dasar;
- responsive foundation.

**Output:**

```text
Website dapat dibuka
Navigation berjalan
Layout dasar selesai
```

**Test sebelum lanjut:**

- semua menu dapat dibuka;
- tidak ada broken route;
- desktop dan mobile tidak rusak.

---

# PHASE 1 — Account

Kerjakan:

- Register;
- Login;
- Logout;
- Session;
- Profile;
- user settings dasar.

**Output:**

```text
User dapat login
 ↓
User memiliki data sendiri
```

**Test:**

- register;
- login;
- logout;
- session;
- akses halaman yang membutuhkan login.

---

# PHASE 2 — Content & Database

Kerjakan:

- struktur database;
- Lesson;
- Hiragana;
- Katakana;
- Vocabulary;
- Kanji;
- Particle;
- Grammar.

Mulai dari:

```text
Minna no Nihongo 1
└── Bab 1
```

Setelah stabil:

```text
Bab 2
Bab 3
Bab 4
Bab 5
```

**Jangan langsung memasukkan semua konten sebelum struktur data diuji.**

---

# PHASE 3 — Learn

Kerjakan:

- daftar lesson;
- detail materi;
- Hiragana;
- Katakana;
- Kanji;
- Vocabulary;
- Particle;
- Grammar;
- contoh kalimat;
- audio button.

**Output:**

```text
User dapat membuka dan mempelajari materi.
```

---

# PHASE 4 — Audio & Stroke Order

Kerjakan:

- audio materi;
- audio kalimat;
- play/pause;
- volume;
- auto play;
- stroke order;
- replay animation.

**Test:**

- audio tidak gagal;
- tombol tetap usable di mobile;
- stroke animation dapat diulang.

---

# PHASE 5 — Practice Core

Kerjakan terlebih dahulu:

```text
Flashcard
Multiple Choice
Type Answer
```

Setiap soal harus mempunyai:

```text
Question
Answer
Validation
Feedback
Attempt Record
```

---

# PHASE 6 — Specialized Practice

Setelah Practice Core stabil:

```text
Hiragana Quiz
Katakana Quiz
Kanji Quiz
Vocabulary Quiz
Particle Quiz
Grammar Quiz
Audio Quiz
```

Jangan membuat semua jenis quiz sekaligus.

Urutan:

```text
Vocabulary
 ↓
Kanji
 ↓
Particle
 ↓
Grammar
 ↓
Audio
```

---

# PHASE 7 — Mastery & Weak Material

Kerjakan:

```text
Attempt
 ↓
Evaluation
 ↓
Mastery
 ↓
Weak Material
 ↓
Review
```

Pastikan materi yang sering salah benar-benar muncul kembali.

---

# PHASE 8 — Review System

Kerjakan:

- Review Today;
- Weak Review;
- Particle Review;
- Vocabulary Review;
- Kanji Review;
- Grammar Review;
- Review berdasarkan riwayat.

---

# PHASE 9 — Exam

Kerjakan:

- exam configuration;
- question selection;
- timer jika diperlukan;
- scoring;
- result;
- exam history;
- progress update.

---

# PHASE 10 — Search

Kerjakan:

```text
Local Search
 ↓
Filter
 ↓
Result
 ↓
Open Material
```

Setelah local search stabil, tambahkan:

```text
Web / Google Search
```

---

# PHASE 11 — Progress & Dashboard

Kerjakan:

- progress;
- statistics;
- mastery summary;
- weak material;
- daily goal;
- dashboard.

Dashboard baru dibuat setelah data progress sudah benar.

---

# PHASE 12 — Gamification

Kerjakan:

```text
XP
 ↓
Level
 ↓
Streak
 ↓
Achievement
```

Gamification harus mengambil data dari aktivitas nyata pengguna.

---

# PHASE 13 — Visual Polish

Kerjakan:

- page transition;
- hover;
- correct animation;
- wrong animation;
- XP particle effect;
- achievement effect;
- mastery effect;
- reduced motion;
- sound effects.

**Jangan mengerjakan visual polish sebelum fitur utama stabil.**

---

# PHASE 14 — Settings & Accessibility

Kerjakan:

- audio settings;
- animation settings;
- theme;
- reduced motion;
- keyboard navigation;
- accessibility;
- mobile optimization.

---

# PHASE 15 — Testing

## Functional Testing

Test:

```text
Login
Learn
Audio
Practice
Mastery
Review
Exam
Search
Progress
XP
Streak
Achievement
Settings
```

## Responsive Testing

```text
Desktop
Tablet
Mobile
```

## Learning Flow Testing

```text
Login
 ↓
Learn
 ↓
Practice
 ↓
Review
 ↓
Mastery
 ↓
Exam
 ↓
Progress
```

---

# PHASE 16 — Bug Fix

Prioritas:

```text
Critical
 ↓
High
 ↓
Medium
 ↓
Low
```

Critical adalah bug yang membuat fitur utama tidak dapat digunakan.

---

# PHASE 17 — Optimization

Periksa:

- loading;
- database query;
- audio loading;
- image/asset size;
- JavaScript;
- CSS;
- caching jika diperlukan;
- mobile performance.

---

# PHASE 18 — Final Check

Checklist:

```text
[ ] Login
[ ] Register
[ ] Logout
[ ] Learn
[ ] Hiragana
[ ] Katakana
[ ] Kanji
[ ] Vocabulary
[ ] Particle
[ ] Grammar
[ ] Audio
[ ] Stroke Order
[ ] Flashcard
[ ] Quiz
[ ] Type Answer
[ ] Audio Quiz
[ ] Mastery
[ ] Weak Material
[ ] Review
[ ] Exam
[ ] Search
[ ] Progress
[ ] Dashboard
[ ] XP
[ ] Level
[ ] Streak
[ ] Achievement
[ ] Settings
[ ] Responsive
[ ] Accessibility
[ ] Error Handling
[ ] Security
```

---

# 30. RULE: SETIAP PHASE HARUS SELESAI SEBELUM LANJUT

Untuk setiap phase:

```text
PLAN
 ↓
BUILD
 ↓
TEST
 ↓
FIX
 ↓
ACCEPT
 ↓
NEXT PHASE
```

Tidak boleh:

```text
Build 10 fitur
 ↓
Tidak pernah test
 ↓
Semua rusak
```

---

# 31. ACCEPTANCE CRITERIA

Sebuah fitur dianggap selesai jika:

1. UI sudah dibuat.
2. Data sudah terhubung.
3. Logic berjalan.
4. Error handling tersedia.
5. Responsive.
6. Terhubung dengan fitur terkait.
7. Progress tercatat jika diperlukan.
8. Sudah diuji.
9. Tidak merusak fitur lama.

---

# 32. CONTOH ACCEPTANCE CRITERIA PARTICLE

Particle dianggap selesai jika:

```text
[ ] Particle dapat ditampilkan
[ ] Fungsi dijelaskan
[ ] Pattern tersedia
[ ] Contoh kalimat tersedia
[ ] Terjemahan tersedia
[ ] Audio tersedia jika diperlukan
[ ] Common mistake tersedia
[ ] Particle dapat dilatih
[ ] Jawaban dapat divalidasi
[ ] Jawaban salah masuk Weak Material
[ ] Particle dapat muncul dalam Review
[ ] Particle dapat memengaruhi Mastery
```

---

# 33. CONTOH ACCEPTANCE CRITERIA AUDIO

```text
[ ] Audio dapat diputar
[ ] Audio dapat dihentikan
[ ] Volume bekerja
[ ] Audio tidak menghalangi UI
[ ] Audio dapat digunakan dalam Practice
[ ] Audio dapat digunakan dalam Exam
[ ] Error audio ditangani
[ ] Pengguna dapat mematikan audio
```

---

# 34. CONTOH ACCEPTANCE CRITERIA VISUAL PARTICLE

```text
[ ] Muncul pada event yang benar
[ ] Tidak muncul berlebihan
[ ] Tidak menutupi pertanyaan
[ ] Tidak memperlambat halaman
[ ] Responsive
[ ] Dapat dimatikan
[ ] Reduced Motion tersedia
```

---

# 35. SEARCH RESULT RULE

Hasil search dibagi:

```text
LOCAL RESULT
+
WEB RESULT
```

Local result:

- berasal dari database website;
- dapat dibuka;
- dapat dipelajari;
- dapat masuk Practice.

Web result:

- informasi tambahan;
- tidak otomatis dianggap sebagai materi resmi website.

---

# 36. SISTEM KONTEN

Konten harus:

- konsisten;
- terstruktur;
- sesuai lesson;
- mudah diperbarui;
- tidak duplikatif;
- mempunyai format yang seragam.

Setiap materi yang dimasukkan harus memiliki sumber/rujukan konten yang dapat dipertanggungjawabkan oleh pengelola proyek.

---

# 37. ATURAN PERUBAHAN FITUR

Jika fitur lama diubah:

```text
Catat perubahan
 ↓
Alasan perubahan
 ↓
Cek dependency
 ↓
Update dokumentasi
 ↓
Development
 ↓
Testing
 ↓
Regression Test
```

Jangan mengubah database atau logic inti tanpa mengecek fitur yang bergantung padanya.

---

# 38. ATURAN FITUR BARU

Setiap fitur baru harus menjawab:

```text
Apa tujuannya?
Siapa yang menggunakannya?
Data apa yang dibutuhkan?
Terhubung ke fitur apa?
Bagaimana cara test-nya?
Apa dampaknya terhadap fitur lama?
```

Jika tidak memiliki tujuan yang jelas, fitur tidak perlu ditambahkan.

---

# 39. ROADMAP VERSI

## Version 1 — Core Learning

```text
Account
Learn
Hiragana
Katakana
Kanji
Vocabulary
Particle
Grammar
Flashcard
Quiz
```

## Version 2 — Mastery

```text
Mastery
Weak Material
Review
Progress
```

## Version 3 — Exam & Search

```text
Exam
Local Search
Web Search
```

## Version 4 — Gamification

```text
XP
Level
Streak
Achievement
Daily Goal
Dashboard
```

## Version 5 — Advanced Learning

```text
Audio Quiz
Stroke Practice
Particle Comparison
Smart Review
Recommendation
```

## Version 6 — Expansion

```text
Minna no Nihongo 1 Bab 1–5
↓
Materi N5
↓
N4
↓
N3
↓
N2
↓
N1
```

---

# 40. ARSITEKTUR ALUR FINAL

```text
                         JAPANESE LEARNING HUB
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
        LEARN                  PRACTICE                 SEARCH
          │                       │                       │
   ┌──────┼──────┐         ┌──────┼──────┐          ┌────┴────┐
   │      │      │         │      │      │          │         │
Hiragana Katakana Kanji  Flash   Quiz   Audio     Local      Web
   │      │      │         │      │      │
   └──────┴──────┴─────────┴──────┴──────┘
                    │
                Evaluation
                    │
             ┌──────┴──────┐
             │             │
          Mastery      Weak Material
             │             │
             └──────┬──────┘
                    │
                  Review
                    │
                  Exam
                    │
                  Result
                    │
                Progress
                    │
          ┌─────────┼─────────┐
          │         │         │
         XP       Streak   Achievement
                    │
                Dashboard
```

---

# 41. ALUR PEMBELAJARAN IDEAL

```text
Login
 ↓
Dashboard
 ↓
Daily Goal
 ↓
Lesson
 ↓
Learn
 ↓
Audio / Example
 ↓
Practice
 ↓
Evaluation
 ↓
Mastery
 ↓
Weak Material jika diperlukan
 ↓
Review
 ↓
Exam
 ↓
Result
 ↓
Progress
 ↓
Dashboard
```

Search dapat masuk ke Learn kapan saja:

```text
Search
 ↓
Local Result
 ↓
Learn
 ↓
Practice
```

---

# 42. PRIORITAS IMPLEMENTASI PALING AMAN

Jika developer bekerja satu per satu, gunakan urutan ini:

```text
01 Foundation
02 Account
03 Database & Content
04 Learn
05 Audio
06 Stroke Order
07 Practice Core
08 Specialized Practice
09 Mastery
10 Weak Material
11 Review
12 Exam
13 Search
14 Progress
15 Dashboard
16 XP
17 Level
18 Streak
19 Achievement
20 Daily Goal
21 Visual Animation
22 Settings
23 Accessibility
24 Security Review
25 Performance
26 Final Testing
27 Deploy
```

---

# 43. CHECKPOINT DEVELOPMENT

## Checkpoint A

```text
Account + Learn
```

Harus sudah bisa:

```text
Login
 ↓
Pilih Lesson
 ↓
Baca Materi
```

## Checkpoint B

```text
Learn + Practice
```

Harus sudah bisa:

```text
Learn
 ↓
Practice
 ↓
Answer
 ↓
Feedback
```

## Checkpoint C

```text
Practice + Mastery
```

Harus sudah bisa:

```text
Answer
 ↓
Evaluation
 ↓
Mastery
```

## Checkpoint D

```text
Mastery + Review
```

Harus sudah bisa:

```text
Wrong
 ↓
Weak
 ↓
Review
 ↓
Practice Again
```

## Checkpoint E

```text
Exam + Progress
```

Harus sudah bisa:

```text
Exam
 ↓
Result
 ↓
Progress
```

## Checkpoint F

```text
Gamification + Dashboard
```

Harus sudah bisa:

```text
Activity
 ↓
XP / Streak / Achievement
 ↓
Dashboard
```

---

# 44. PRINCIPLE AKHIR

Japanese Learning Hub harus selalu mengikuti:

```text
BELAJAR
   ↓
LATIHAN
   ↓
EVALUASI
   ↓
REVIEW
   ↓
PENGUASAAN
   ↓
UJIAN
   ↓
PROGRESS
```

Fitur tambahan seperti:

```text
XP
Level
Streak
Achievement
Animation
Particle Effect
```

harus mendukung pengalaman belajar dan tidak boleh menggantikan fungsi pembelajaran.

---

# 45. FINAL DEFINITION OF DONE

Japanese Learning Hub dianggap siap untuk release jika:

```text
[ ] Core Learning berjalan
[ ] User Account berjalan
[ ] Data tersimpan dengan benar
[ ] Learn berjalan
[ ] Practice berjalan
[ ] Audio berjalan
[ ] Mastery berjalan
[ ] Weak Material berjalan
[ ] Review berjalan
[ ] Exam berjalan
[ ] Search berjalan
[ ] Progress berjalan
[ ] Dashboard berjalan
[ ] Gamification berjalan
[ ] Settings berjalan
[ ] Responsive
[ ] Accessible
[ ] Secure
[ ] Error Handling
[ ] Performance diperiksa
[ ] Regression Test lulus
[ ] Final Content diperiksa
```

---

# 46. RINGKASAN PROYEK

Japanese Learning Hub bukan sekadar website materi bahasa Jepang.

Sistem akhirnya harus menjadi:

```text
CONTENT
   +
LEARNING
   +
PRACTICE
   +
AUDIO
   +
REVIEW
   +
MASTERY
   +
EXAM
   +
PROGRESS
   +
GAMIFICATION
   +
SEARCH
```

Tujuan akhirnya adalah membantu pengguna mengetahui:

- apa yang harus dipelajari;
- apa yang sudah dipelajari;
- apa yang belum dikuasai;
- apa yang sering salah;
- apa yang harus di-review;
- bagaimana perkembangan belajar mereka.

**Aturan terpenting:**

> Jangan membangun semua fitur sekaligus.
>
> Bangun → Test → Perbaiki → Integrasikan → Baru lanjut.

