import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed Bab 23, 24 & 25 Minna no Nihongo (GRAND FINALE N5 / Minna no Nihongo 1)...')

  // 1. Dapatkan Course
  let course = await prisma.course.findFirst()
  if (!course) {
    course = await prisma.course.create({
      data: { title: 'Minna no Nihongo 1', description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.' },
    })
  }

  // 2. Buat Lesson Bab 23
  let lesson23 = await prisma.lesson.findFirst({ where: { title: 'Bab 23' } })
  if (!lesson23) {
    lesson23 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 23',
        description: 'Waktu & Kondisi (～とき), Pengandaian Pasti / Operasi Mesin & Petunjuk Jalan (～と、～), serta Menyeberang Jalan / Gerak di Tempat (を 渡る / 歩く).',
        order: 23,
      },
    })
    console.log('✅ Lesson Bab 23 dibuat:', lesson23.id)
  }

  // 3. Buat Lesson Bab 24
  let lesson24 = await prisma.lesson.findFirst({ where: { title: 'Bab 24' } })
  if (!lesson24) {
    lesson24 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 24',
        description: 'Pemberian & Penerimaan Tindakan Kebaikan (Giving & Receiving Favors: ～てくれます, ～てあげます, ～てもらいます).',
        order: 24,
      },
    })
    console.log('✅ Lesson Bab 24 dibuat:', lesson24.id)
  }

  // 4. Buat Lesson Bab 25 (Bab Terakhir Minna no Nihongo I)
  let lesson25 = await prisma.lesson.findFirst({ where: { title: 'Bab 25' } })
  if (!lesson25) {
    lesson25 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 25',
        description: 'Pengandaian Syarat Lampau (～たら), Syarat Pasti Setelah Terjadi (～たら), serta Pengandaian Pertentangan Walaupun (～ても / ～でも).',
        order: 25,
      },
    })
    console.log('✅ Lesson Bab 25 dibuat:', lesson25.id)
  }

  // 5. Vocabulary Bab 23 (Time, Conditions, Crossroads, Machine Operations)
  const vocab23 = [
    { word: 'ききます', kanji: '聞きます', kana: 'ききます', romaji: 'kikimasu', meaning: 'Bertanya (kepada guru/polisi)', wordType: 'Verb' },
    { word: 'まわします', kanji: '回します', kana: 'まわします', romaji: 'mawashimasu', meaning: 'Memutar (tombol/kenop)', wordType: 'Verb' },
    { word: 'ひきます', kanji: '引きます', kana: 'ひきます', romaji: 'hikimasu', meaning: 'Menarik (pintu/tuas)', wordType: 'Verb' },
    { word: 'かえます', kanji: '変えます', kana: 'かえます', romaji: 'kaemasu', meaning: 'Mengubah / Menyetel', wordType: 'Verb' },
    { word: 'さわります', kanji: '触ります', kana: 'さわります', romaji: 'sawarimasu', meaning: 'Menyentuh / Memegang (alat/pintu)', wordType: 'Verb' },
    { word: 'でます', kanji: '出ます', kana: 'でます', romaji: 'demasu', meaning: 'Keluar (uang kembalian/air)', wordType: 'Verb' },
    { word: 'うごきます', kanji: '動きます', kana: 'うごきます', romaji: 'ugokimasu', meaning: 'Bergerak / Berjalan (mesin)', wordType: 'Verb' },
    { word: 'あるきます', kanji: '歩きます', kana: 'あるきます', romaji: 'arukimasu', meaning: 'Berjalan kaki (di jalan)', wordType: 'Verb' },
    { word: 'わたります', kanji: '渡ります', kana: 'わたります', romaji: 'watarimasu', meaning: 'Menyeberang (jalan/jembatan)', wordType: 'Verb' },
    { word: 'きをつけます', kanji: '気をつけます', kana: 'きをつけます', romaji: 'ki o tsukemasu', meaning: 'Berhati-hati / Waspada', wordType: 'Verb' },
    { word: 'ひっこしします', kanji: '引っ越しします', kana: 'ひっこしします', romaji: 'hikkoshishimasu', meaning: 'Pindah rumah', wordType: 'Verb' },
    { word: 'おと', kanji: '音', kana: 'おと', romaji: 'oto', meaning: 'Suara / Bunyi mesin', wordType: 'Noun' },
    { word: 'きかい', kanji: '機械', kana: 'きかい', romaji: 'kikai', meaning: 'Mesin / Peralatan teknis', wordType: 'Noun' },
    { word: 'つまみ', kana: 'つまみ', romaji: 'tsumami', meaning: 'Kenop putar / Tombol putar', wordType: 'Noun' },
    { word: 'こしょう', kanji: '故障', kana: 'こしょう', romaji: 'koshou', meaning: 'Kerusakan (mesin mogok)', wordType: 'Noun' },
    { word: 'みち', kanji: '道', kana: 'みち', romaji: 'michi', meaning: 'Jalan', wordType: 'Noun' },
    { word: 'こうさてん', kanji: '交差点', kana: 'こうさてん', romaji: 'kousaten', meaning: 'Perempatan jalan', wordType: 'Noun' },
    { word: 'しんごう', kanji: '信号', kana: 'しんごう', romaji: 'shingou', meaning: 'Lampu lalu lintas', wordType: 'Noun' },
    { word: 'かど', kanji: '角', kana: 'かど', romaji: 'kado', meaning: 'Sudut / Tikungan jalan', wordType: 'Noun' },
    { word: 'はし', kanji: '橋', kana: 'はし', romaji: 'hashi', meaning: 'Jembatan', wordType: 'Noun' },
    { word: 'ちゅうしゃじょう', kanji: '駐車場', kana: 'ちゅうしゃじょう', romaji: 'chuushajou', meaning: 'Tempat parkir', wordType: 'Noun' },
    { word: '～め', kanji: '～目', kana: '～め', romaji: '~me', meaning: 'Urutan ke- (ke-1, ke-2)', wordType: 'Suffix' },
  ]

  // 6. Vocabulary Bab 24 (Kindness, Favors, Family Members)
  const vocab24 = [
    { word: 'くれます', kana: 'くれます', romaji: 'kuremasu', meaning: 'Memberi kepada saya (pembicara/keluarga saya)', wordType: 'Verb' },
    { word: 'なおします', kanji: '直します', kana: 'なおします', romaji: 'naoshimasu', meaning: 'Membetulkan / Mereparasi', wordType: 'Verb' },
    { word: 'つれていきます', kanji: '連れて行きます', kana: 'つれていきます', romaji: 'tsurete ikimasu', meaning: 'Mengajak pergi (orang)', wordType: 'Verb' },
    { word: 'つれてきます', kanji: '連れて来ます', kana: 'つれてきます', romaji: 'tsurete kimasu', meaning: 'Mengajak datang ke mari (orang)', wordType: 'Verb' },
    { word: 'おくります', kanji: '送ります', kana: 'おくります', romaji: 'okurimasu', meaning: 'Mengantar (orang sampai rumah)', wordType: 'Verb' },
    { word: 'しょうかいします', kanji: '紹介します', kana: 'しょうかいします', romaji: 'shoukaishimasu', meaning: 'Memperkenalkan', wordType: 'Verb' },
    { word: 'あんないします', kanji: '案内します', kana: 'あんないします', romaji: 'annaishimasu', meaning: 'Memandu / Menunjukkan jalan', wordType: 'Verb' },
    { word: 'せつめいします', kanji: '説明します', kana: 'せつめいします', romaji: 'setsumeishimasu', meaning: 'Menjelaskan / Menerangkan', wordType: 'Verb' },
    { word: 'おじいさん', kana: 'おじいさん', romaji: 'ojiisan', meaning: 'Kakek / Pria lanjut usia', wordType: 'Noun' },
    { word: 'おばあさん', kana: 'おばあさん', romaji: 'obaasan', meaning: 'Nenek / Wanita lanjut usia', wordType: 'Noun' },
    { word: 'じゅんび', kanji: '準備', kana: 'じゅんび', romaji: 'junbi', meaning: 'Persiapan', wordType: 'Noun' },
    { word: 'いみ', kanji: '意味', kana: 'いみ', romaji: 'imi', meaning: 'Arti / Makna', wordType: 'Noun' },
    { word: 'おかし', kanji: 'お菓子', kana: 'おかし', romaji: 'okashi', meaning: 'Kue / Camilan', wordType: 'Noun' },
    { word: 'ぜんぶ', kanji: '全部', kana: 'ぜんぶ', romaji: 'zenbu', meaning: 'Semuanya / Seluruhnya', wordType: 'Noun' },
    { word: 'じぶんで', kanji: '自分で', kana: 'じぶんで', romaji: 'jibun de', meaning: 'Sendiri / Oleh diri sendiri', wordType: 'Adverb' },
    { word: 'ほかに', kana: 'ほかに', romaji: 'hokani', meaning: 'Selain itu', wordType: 'Adverb' },
  ]

  // 7. Vocabulary Bab 25 (Conditionals, Life stages, Travel)
  const vocab25 = [
    { word: 'かんがえます', kanji: '考えます', kana: 'かんがえます', romaji: 'kangaemasu', meaning: 'Memikirkan / Merenungkan', wordType: 'Verb' },
    { word: 'つきます', kanji: '着きます', kana: 'つきます', romaji: 'tsukimasu', meaning: 'Tiba / Sampai (di stasiun)', wordType: 'Verb' },
    { word: 'りゅうがくします', kanji: '留学します', kana: 'りゅうがくします', romaji: 'ryuugakushimasu', meaning: 'Studi ke luar negeri', wordType: 'Verb' },
    { word: 'としをとります', kanji: '年を取ります', kana: 'としをとります', romaji: 'toshi o torimasu', meaning: 'Menjadi tua / Bertambah usia', wordType: 'Verb' },
    { word: 'いなか', kanji: '田舎', kana: 'いなか', romaji: 'inaka', meaning: 'Desa / Kampung halaman', wordType: 'Noun' },
    { word: 'たいしかん', kanji: '大使館', kana: 'たいしかん', romaji: 'taishikan', meaning: 'Kedutaan Besar', wordType: 'Noun' },
    { word: 'グループ', kana: 'グループ', romaji: 'guruupu', meaning: 'Kelompok / Grup', wordType: 'Noun' },
    { word: 'チャンス', kana: 'チャンス', romaji: 'chansu', meaning: 'Kesempatan / Peluang', wordType: 'Noun' },
    { word: 'おく', kanji: '億', kana: 'おく', romaji: 'oku', meaning: 'Ratusan juta (100.000.000)', wordType: 'Noun' },
    { word: 'もし', kana: 'もし', romaji: 'moshi', meaning: 'Jikalau / Seandainya', wordType: 'Adverb' },
    { word: 'いくら', kana: 'いくら', romaji: 'ikura', meaning: 'Betapapun / Walaupun bagaimanapun (diikuti temo)', wordType: 'Adverb' },
    { word: 'てんきん', kanji: '転勤', kana: 'てんきん', romaji: 'tenkin', meaning: 'Pindah tugas kantor ke cabang lain', wordType: 'Noun' },
    { word: 'こと', kanji: '事', kana: 'こと', romaji: 'koto', meaning: 'Hal / Perkara', wordType: 'Noun' },
    { word: 'いっぱいのみましょう', kana: 'いっぱいのみましょう', romaji: 'ippai nomimashou', meaning: 'Ayo minum segelas!', wordType: 'Expression' },
    { word: 'いろいろおせわになりました', kana: 'いろいろおせわになりました', romaji: 'iroiro osewa ni narimashita', meaning: 'Terima kasih atas segala bantuan & bimbingannya', wordType: 'Expression' },
    { word: 'がんばります', kanji: '頑張ります', kana: 'がんばります', romaji: 'ganbarimasu', meaning: 'Berjuang / Berusaha sebaik-baiknya', wordType: 'Verb' },
    { word: 'どうぞおげんきで', kana: 'どうぞおげんきで', romaji: 'douzo ogenki de', meaning: 'Semoga selalu sehat sejahtera (perpisahan)', wordType: 'Expression' },
  ]

  const existVocab = await prisma.vocabulary.findMany({ select: { word: true } })
  const existVocabSet = new Set(existVocab.map((v) => v.word))

  const newVocab23 = vocab23.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson23.id }))
  if (newVocab23.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab23 })
    console.log(`✅ Vocab Bab 23 ditambahkan: ${newVocab23.length}`)
  }

  const newVocab24 = vocab24.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson24.id }))
  if (newVocab24.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab24 })
    console.log(`✅ Vocab Bab 24 ditambahkan: ${newVocab24.length}`)
  }

  const newVocab25 = vocab25.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson25.id }))
  if (newVocab25.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab25 })
    console.log(`✅ Vocab Bab 25 ditambahkan: ${newVocab25.length}`)
  }

  // 8. Grammar Bab 23 (Toki, To Pengandaian Pasti, Jalur Gerak o)
  const grammar23 = [
    {
      pattern: '[Kalimat Futsūkei / KB の] とき、[Kalimat]',
      meaning: 'Ketika / Saat [Kondisi / Aksi]',
      usage: 'KK Kamus とき (sebelum/saat aksi), KK Ta とき (setelah aksi tuntas), I-adj い とき, Na-adj な とき, KB の とき.',
      example: '新聞を 読む とき、眼鏡を かけます。国へ 帰った とき、鞄を 買いました。暇な とき、音楽を 聞きます。',
      translation: 'Ketika membaca koran, memakai kacamata. Ketika sudah pulang ke negara asal, membeli tas. Saat waktu senggang, mendengarkan musik.',
      note: 'Perhatikan perbedaan tenses kamus (belum selesai) vs lampau ta (sudah selesai).',
      lessonId: lesson23.id,
    },
    {
      pattern: 'KK Bentuk Kamus + と、[Hasil Otomatis]',
      meaning: 'Kalau / Jika [Melakukan Aksi], maka otomatis pasti [Hasil]',
      usage: 'Menyatakan hubungan sebab-akibat alamiah, pengoperasian mesin (pencet tombol ➔ keluar barang), atau petunjuk arah jalan.',
      example: 'この ボタンを 押すと、お釣りが 出ます。あの 角を 右へ 曲がると、銀行が あります。',
      translation: 'Jika menekan tombol ini, uang kembalian akan keluar. Jika belok ke kanan di sudut itu, ada bank.',
      note: 'Kalimat hasil tidak boleh berupa perintah, ajakan, atau izin (karena sifatnya otomatis).',
      lessonId: lesson23.id,
    },
    {
      pattern: '[Tempat / Jalur] を 渡ります / 歩きます / 散歩します',
      meaning: 'Menyeberangi / Berjalan melintasi [Jalur/Tempat]',
      usage: 'Partikel を di sini berfungsi bukan sebagai objek penderita, melainkan sebagai penanda ruang lintasan yang dilewati gerakan.',
      example: '橋を 渡ります。公園を 散歩します。',
      translation: 'Menyeberangi jembatan. Jalan-jalan melintasi taman.',
      note: 'Pembeda: 公園で 遊びます (tempat aksi biasa) vs 公園を 歩きます (tempat lintasan gerak).',
      lessonId: lesson23.id,
    },
  ]

  // 9. Grammar Bab 24 (Giving & Receiving Favors: Te kuremasu, Te agemasu, Te moraimasu)
  const grammar24 = [
    {
      pattern: '[Orang Lain] が (わたしに) KK て + くれます',
      meaning: '[Orang Lain] berbaik hati melakukan [Tindakan] untuk saya / pihak saya',
      usage: 'PENTING: Kata kerja khusus saat orang lain memberi bantuan atau kebaikan kepada pembicara (atau keluarga pembicara). Subjek selalu ditandai が.',
      example: '山田さんが 傘を 貸して くれました。母が セーターを 送って くれました。',
      translation: 'Sdr. Yamada berbaik hati meminjamkan payung kepada saya. Ibu mengirimkan baju hangat untuk saya.',
      note: 'Salah jika menggunakan あげます untuk kebaikan yang diterima oleh diri sendiri.',
      lessonId: lesson24.id,
    },
    {
      pattern: 'わたしは [Pemberi] に KK て + もらいます',
      meaning: 'Saya menerima kebaikan [Tindakan] dari [Pemberi] (Mendapat bantuan)',
      usage: 'Pembicara sebagai subjek (わたしは) yang meminta atau menerima bantuan pertolongan dari pihak lain (ditandai に).',
      example: 'わたしは 鈴木さんに 日本語を 教えて もらいました。',
      translation: 'Saya diajari bahasa Jepang oleh Sdr. Suzuki (saya menerima bantuan pengajaran).',
      note: 'Mengandung rasa syukur dan terima kasih dari penerima bantuan.',
      lessonId: lesson24.id,
    },
    {
      pattern: 'わたしは [Penerima] に KK て + あげます',
      meaning: 'Saya melakukan [Tindakan kebaikan] untuk [Penerima]',
      usage: 'Pembicara memberikan bantuan kepada pihak ketiga setara atau lebih muda.',
      example: 'わたしは 木村さんの 荷物を 持って あげました。',
      translation: 'Saya membawakan barang bawaan milik Sdr. Kimura.',
      note: 'Hindari mengatakan langsung di depan atasan karena terkesan menggurui/merasa berjasa.',
      lessonId: lesson24.id,
    },
  ]

  // 10. Grammar Bab 25 (Conditionals Tara & Temo)
  const grammar25 = [
    {
      pattern: '[KK/Sifat/KB Bentuk-Ta] + ら、[Kalimat Utama]',
      meaning: 'Kalau / Jika [Syarat Terpenuhi], maka [Aksi/Rencana]',
      usage: 'KK: た ➔ たら (いったら, たべたら). I-adj: かった ➔ かったら (安かったら). Na-adj & KB: だった ➔ だったら (雨だったら). Bersifat kondisional fleksibel.',
      example: 'お金が あったら、旅行します。安かったら、買います。雨が 降ったら、出かけません。',
      translation: 'Kalau ada uang, saya akan jalan-jalan. Kalau murah, saya beli. Kalau hujan turun, saya tidak bepergian.',
      note: 'Bisa juga berarti "setelah pasti terjadi": 10時になったら、出かけましょう (Setelah jam 10, ayo berangkat).',
      lessonId: lesson25.id,
    },
    {
      pattern: 'もし [Syarat] ～たら',
      meaning: 'Seandainya / Jikalau [Pengandaian Berandai-andai]',
      usage: 'Kata keterangan もし diletakkan di depan kalimat untuk mempertegas bahwa klausanya adalah sebuah pengandaian hipotesis.',
      example: 'もし １億円が あったら、世界旅行を したいです。',
      translation: 'Seandainya punya uang 100 juta yen, saya ingin keliling dunia.',
      note: 'Memperkuat nuansa imajinatif atau kemungkinan kecil.',
      lessonId: lesson25.id,
    },
    {
      pattern: 'KK ても / I-adj くても / Na-adj & KB でも、[Kalimat Kontras]',
      meaning: 'Walaupun / Meskipun [Kondisi], tetap [Hal Sebaliknya]',
      usage: 'Menyatakan pengandaian pertentangan (kebalikan dari Tara). Tindakan utama tetap terjadi meski ada hambatan.',
      example: '雨が 降っても、サッカーを します。高くても、この パソコンを 買いたいです。',
      translation: 'Walaupun hujan turun, tetap bermain sepak bola. Walaupun mahal, saya ingin membeli komputer ini.',
      note: 'Bisa diperkuat dengan kata keterangan いくら (betapapun): いくら 安くても (betapapun murahnya).',
      lessonId: lesson25.id,
    },
  ]

  const existGrammar = await prisma.grammar.findMany({ select: { pattern: true } })
  const existGrammarSet = new Set(existGrammar.map((g) => g.pattern))

  const newGrammar23 = grammar23.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar23.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar23 })
    console.log(`✅ Grammar Bab 23 ditambahkan: ${newGrammar23.length}`)
  }

  const newGrammar24 = grammar24.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar24.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar24 })
    console.log(`✅ Grammar Bab 24 ditambahkan: ${newGrammar24.length}`)
  }

  const newGrammar25 = grammar25.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar25.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar25 })
    console.log(`✅ Grammar Bab 25 ditambahkan: ${newGrammar25.length}`)
  }

  // 11. Kanji Bab 23, 24 & 25
  const kanji23To25 = [
    // Bab 23 (6 Kanji)
    { character: '回', hiragana: 'まわ・す / かい', romaji: 'mawa-su / kai', meaning: 'Memutar, Frekuensi kali', onyomi: 'カイ, エ (kai, e)', kunyomi: 'まわ・す, まわ・る (mawa-su, mawa-ru)', jlptLevel: 'N4', lessonId: lesson23.id },
    { character: '引', hiragana: 'ひ・く / いん', romaji: 'hi-ku / in', meaning: 'Menarik, Mengurangi', onyomi: 'イン (in)', kunyomi: 'ひ・く, ひ・ける (hi-ku, hi-keru)', jlptLevel: 'N4', lessonId: lesson23.id },
    { character: '変', hiragana: 'か・える / へん', romaji: 'ka-eru / hen', meaning: 'Mengubah, Aneh', onyomi: 'ヘン (hen)', kunyomi: 'か・える, か・わる (ka-eru, ka-waru)', jlptLevel: 'N3', lessonId: lesson23.id },
    { character: '動', hiragana: 'うご・く / どう', romaji: 'ugo-ku / dou', meaning: 'Bergerak', onyomi: 'ドウ (dou)', kunyomi: 'うご・く, うご・かす (ugo-ku, ugo-kasu)', jlptLevel: 'N4', lessonId: lesson23.id },
    { character: '渡', hiragana: 'わた・る / と', romaji: 'wata-ru / to', meaning: 'Menyeberang, Menyerahkan', onyomi: 'ト (to)', kunyomi: 'わた・る, わた・す (wata-ru, wata-su)', jlptLevel: 'N3', lessonId: lesson23.id },
    { character: '橋', hiragana: 'はし / きょう', romaji: 'hashi / kyou', meaning: 'Jembatan', onyomi: 'キョウ (kyou)', kunyomi: 'はし (hashi)', jlptLevel: 'N3', lessonId: lesson23.id },

    // Bab 24 (6 Kanji)
    { character: '連', hiragana: 'つ・れる / れん', romaji: 'tsu-reru / ren', meaning: 'Mengajak, Hubungan, Rangkaian', onyomi: 'レン (ren)', kunyomi: 'つ・れる, つら・なる (tsu-reru, tsura-naru)', jlptLevel: 'N3', lessonId: lesson24.id },
    { character: '案', hiragana: 'あん', romaji: 'an', meaning: 'Rencana, Gagasan, Memandu', onyomi: 'アン (an)', kunyomi: '-', jlptLevel: 'N3', lessonId: lesson24.id },
    { character: '内', hiragana: 'うち / ない', romaji: 'uchi / nai', meaning: 'Dalam, Kalangan sendiri', onyomi: 'ナイ, ダイ (nai, dai)', kunyomi: 'うち (uchi)', jlptLevel: 'N4', lessonId: lesson24.id },
    { character: '説', hiragana: 'と・く / せつ', romaji: 'to-ku / setsu', meaning: 'Menjelaskan, Teori, Pendapat', onyomi: 'セツ, ゼイ (setsu, zei)', kunyomi: 'と・く (to-ku)', jlptLevel: 'N3', lessonId: lesson24.id },
    { character: '明', hiragana: 'あか・るい / めい', romaji: 'aka-rui / mei', meaning: 'Terang, Jelas, Mengetahui', onyomi: 'メイ, ミョウ (mei, myou)', kunyomi: 'あか・るい, あき・らか (aka-rui, aki-raka)', jlptLevel: 'N4', lessonId: lesson24.id },
    { character: '菓', hiragana: 'か', romaji: 'ka', meaning: 'Kue, Camilan, Buah', onyomi: 'カ (ka)', kunyomi: '-', jlptLevel: 'N2', lessonId: lesson24.id },

    // Bab 25 (6 Kanji)
    { character: '考', hiragana: 'かんが・える / こう', romaji: 'kanga-eru / kou', meaning: 'Memikirkan, Pertimbangan', onyomi: 'コウ (kou)', kunyomi: 'かんが・える (kanga-eru)', jlptLevel: 'N4', lessonId: lesson25.id },
    { character: '留', hiragana: 'と・める / りゅう', romaji: 'to-meru / ryuu', meaning: 'Tinggal, Menginap, Menahan', onyomi: 'リュウ, ル (ryuu, ru)', kunyomi: 'と・める, と・まる (to-meru, to-maru)', jlptLevel: 'N3', lessonId: lesson25.id },
    { character: '億', hiragana: 'おく', romaji: 'oku', meaning: 'Ratusan juta (100.000.000)', onyomi: 'オク (oku)', kunyomi: '-', jlptLevel: 'N2', lessonId: lesson25.id },
    { character: '野', hiragana: 'の / や', romaji: 'no / ya', meaning: 'Ladang, Lapangan', onyomi: 'ヤ (ya)', kunyomi: 'の (no)', jlptLevel: 'N4', lessonId: lesson25.id },
    { character: '勤', hiragana: 'つと・める / きん', romaji: 'tsuto-meru / kin', meaning: 'Bekerja, Mengabdi', onyomi: 'キン, ゴン (kin, gon)', kunyomi: 'つと・める, つと・まる (tsuto-meru, tsuto-maru)', jlptLevel: 'N3', lessonId: lesson25.id },
    { character: '張', hiragana: 'は・る / ちょう', romaji: 'ha-ru / chou', meaning: 'Meregangkan, Menegangkan, Bertahan', onyomi: 'チョウ (chou)', kunyomi: 'は・る (ha-ru)', jlptLevel: 'N3', lessonId: lesson25.id },
  ]

  const existKanji = await prisma.kanji.findMany({ select: { character: true } })
  const existKanjiSet = new Set(existKanji.map((k) => k.character))

  const newKanji = kanji23To25.filter((k) => !existKanjiSet.has(k.character))
  if (newKanji.length > 0) {
    await prisma.kanji.createMany({ data: newKanji })
    console.log(`✅ Kanji Bab 23, 24 & 25 ditambahkan: ${newKanji.length} karakter`)
  }

  console.log('\n🎉 ALL 25 CHAPTERS OF MINNA NO NIHONGO I SEEDED SUCCESSFULLY!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Bab 23-25:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
