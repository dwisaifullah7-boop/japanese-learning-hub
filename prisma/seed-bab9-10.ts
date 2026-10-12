import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed Bab 9 & Bab 10 Minna no Nihongo (Preferensi/Kemampuan & Keberadaan/Posisi)...')

  // 1. Dapatkan Course
  let course = await prisma.course.findFirst()
  if (!course) {
    course = await prisma.course.create({
      data: { title: 'Minna no Nihongo 1', description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.' },
    })
  }

  // 2. Buat Lesson Bab 9
  let lesson9 = await prisma.lesson.findFirst({ where: { title: 'Bab 9' } })
  if (!lesson9) {
    lesson9 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 9',
        description: 'Preferensi & Kemampuan (が 好き・嫌い・上手・下手・わかります・あります), Alasan (から), dan Pertanyaan Mengapa (どうして).',
        order: 9,
      },
    })
    console.log('✅ Lesson Bab 9 dibuat:', lesson9.id)
  }

  // 3. Buat Lesson Bab 10
  let lesson10 = await prisma.lesson.findFirst({ where: { title: 'Bab 10' } })
  if (!lesson10) {
    lesson10 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 10',
        description: 'Keberadaan Makhluk Hidup & Benda (います vs あります), Posisi Ruang (上・下・前・後ろ・右・左・中・隣・間), dan Partikel Ya & Nado (や・など).',
        order: 10,
      },
    })
    console.log('✅ Lesson Bab 10 dibuat:', lesson10.id)
  }

  // 4. Vocabulary Bab 9 (16 Kata: Preferensi, Kemampuan, Seni/Musik, Alasan)
  const vocab9 = [
    { word: 'すき', kanji: '好き', kana: 'すき', romaji: 'suki', meaning: 'Suka / Gemar', wordType: 'na-adjective' },
    { word: 'きらい', kanji: '嫌い', kana: 'きらい', romaji: 'kirai', meaning: 'Benci / Tidak suka', wordType: 'na-adjective' },
    { word: 'じょうず', kanji: '上手', kana: 'じょうず', romaji: 'jouzu', meaning: 'Pandai / Mahir', wordType: 'na-adjective' },
    { word: 'へた', kanji: '下手', kana: 'へた', romaji: 'heta', meaning: 'Payah / Tidak mahir', wordType: 'na-adjective' },
    { word: 'わかります', kana: 'わかります', romaji: 'wakarimasu', meaning: 'Mengerti / Paham', wordType: 'Verb' },
    { word: 'あります', kana: 'あります', romaji: 'arimasu', meaning: 'Ada / Mempunyai (waktu/uang/barang)', wordType: 'Verb' },
    { word: 'りょうり', kanji: '料理', kana: 'りょうり', romaji: 'ryouri', meaning: 'Masakan', wordType: 'Noun' },
    { word: 'のみもの', kanji: '飲み物', kana: 'のみもの', romaji: 'nomimono', meaning: 'Minuman', wordType: 'Noun' },
    { word: 'スポーツ', kana: 'スポーツ', romaji: 'supootsu', meaning: 'Olahraga', wordType: 'Noun' },
    { word: 'やきゅう', kanji: '野球', kana: 'やきゅう', romaji: 'yakyuu', meaning: 'Baseball', wordType: 'Noun' },
    { word: 'おんがく', kanji: '音楽', kana: 'おんがく', romaji: 'ongaku', meaning: 'Musik', wordType: 'Noun' },
    { word: 'うた', kanji: '歌', kana: 'うた', romaji: 'uta', meaning: 'Lagu', wordType: 'Noun' },
    { word: 'じかん', kanji: '時間', kana: 'じかん', romaji: 'jikan', meaning: 'Waktu / Jam (durasi)', wordType: 'Noun' },
    { word: 'おかね', kanji: 'お金', kana: 'おかね', romaji: 'okane', meaning: 'Uang', wordType: 'Noun' },
    { word: 'どうして', kana: 'どうして', romaji: 'doushite', meaning: 'Mengapa / Kenapa', wordType: 'Adverb' },
    { word: 'から', kana: 'から', romaji: 'kara', meaning: 'Karena... (alasan)', wordType: 'Particle' },
  ]

  // 5. Vocabulary Bab 10 (16 Kata: Keberadaan, Makhluk Hidup, Posisi Ruang)
  const vocab10 = [
    { word: 'います', kana: 'います', romaji: 'imasu', meaning: 'Ada (makhluk bernyawa: orang/hewan)', wordType: 'Verb' },
    { word: 'おとこのひと', kanji: '男の人', kana: 'おとこのひと', romaji: 'otokonohito', meaning: 'Laki-laki dewasa', wordType: 'Noun' },
    { word: 'おんなのひと', kanji: '女の人', kana: 'おんなのひと', romaji: 'onnanohito', meaning: 'Perempuan dewasa', wordType: 'Noun' },
    { word: 'おとこのこ', kanji: '男の子', kana: 'おとこのこ', romaji: 'otokonoko', meaning: 'Anak laki-laki', wordType: 'Noun' },
    { word: 'おんなのこ', kanji: '女の子', kana: 'おんなのこ', romaji: 'onnanoko', meaning: 'Anak perempuan', wordType: 'Noun' },
    { word: 'いぬ', kanji: '犬', kana: 'いぬ', romaji: 'inu', meaning: 'Anjing', wordType: 'Noun' },
    { word: 'ねこ', kanji: '猫', kana: 'ねこ', romaji: 'neko', meaning: 'Kucing', wordType: 'Noun' },
    { word: 'き', kanji: '木', kana: 'き', romaji: 'ki', meaning: 'Pohon', wordType: 'Noun' },
    { word: 'うえ', kanji: '上', kana: 'うえ', romaji: 'ue', meaning: 'Atas', wordType: 'Noun' },
    { word: 'した', kanji: '下', kana: 'した', romaji: 'shita', meaning: 'Bawah', wordType: 'Noun' },
    { word: 'まえ', kanji: '前', kana: 'まえ', romaji: 'mae', meaning: 'Depan', wordType: 'Noun' },
    { word: 'うしろ', kanji: '後ろ', kana: 'うしろ', romaji: 'ushiro', meaning: 'Belakang', wordType: 'Noun' },
    { word: 'みぎ', kanji: '右', kana: 'みぎ', romaji: 'migi', meaning: 'Kanan', wordType: 'Noun' },
    { word: 'ひだり', kanji: '左', kana: 'ひだり', romaji: 'hidari', meaning: 'Kiri', wordType: 'Noun' },
    { word: 'となり', kanji: '隣', kana: 'となり', romaji: 'tonari', meaning: 'Sebelah / Tetangga (berdampingan)', wordType: 'Noun' },
    { word: 'あいだ', kanji: '間', kana: 'あいだ', romaji: 'aida', meaning: 'Antara / Di tengah-tengah dua benda', wordType: 'Noun' },
  ]

  const existVocab = await prisma.vocabulary.findMany({ select: { word: true } })
  const existVocabSet = new Set(existVocab.map(v => v.word))

  const newV9 = vocab9.filter(v => !existVocabSet.has(v.word))
  if (newV9.length > 0) {
    await prisma.vocabulary.createMany({ data: newV9.map(v => ({ ...v, lessonId: lesson9.id })) })
    console.log(`✅ Vocab Bab 9 ditambahkan: ${newV9.length} kata`)
  }

  const newV10 = vocab10.filter(v => !existVocabSet.has(v.word))
  if (newV10.length > 0) {
    await prisma.vocabulary.createMany({ data: newV10.map(v => ({ ...v, lessonId: lesson10.id })) })
    console.log(`✅ Vocab Bab 10 ditambahkan: ${newV10.length} kata`)
  }

  // 6. Grammar Bab 9 (4 Pola: Partikel が untuk Sifat/Kemampuan, わかります, あります, Alasan から)
  const grammar9 = [
    {
      pattern: '[Benda] が すきです / きらいです',
      meaning: 'Suka / Tidak suka terhadap [Benda]',
      usage: 'Objek kesukaan atau ketidaksukaan ditandai dengan partikel が, BUKAN partikel を.',
      example: 'わたしは にほんりょうりが すきです。',
      translation: 'Saya suka masakan Jepang.',
      note: 'Tingkat kesukaan tinggi: だいすきです (sangat suka).',
    },
    {
      pattern: '[Hal] が じょうずです / へたです',
      meaning: 'Pandai / Tidak pandai dalam [Hal]',
      usage: 'Menyatakan keahlian atau keterampilan seseorang. Objek keahlian ditandai partikel が.',
      example: 'ミラーさんは にほんごが じょうずです。',
      translation: 'Sdr. Miller pandai berbahasa Jepang.',
      note: 'Untuk diri sendiri, jangan gunakan じょうずです (kurang sopan/sombong). Gunakan へたです atau すこし できます.',
    },
    {
      pattern: '[Hal/Bahasa] が わかります / [Benda] が あります',
      meaning: 'Mengerti [Hal] / Mempunyai [Benda]',
      usage: 'Kata kerja わかります (paham) dan あります (punya/ada) menggunakan partikel が untuk menandai sasarannya.',
      example: 'えいごが わかります。じかんが ありません。',
      translation: 'Saya mengerti bahasa Inggris. Saya tidak punya waktu.',
      note: 'Bandingkan: くるまがあります (punya mobil).',
    },
    {
      pattern: '[Kalimat Alasan] から、[Kalimat Utama]',
      meaning: 'Karena [Alasan], maka [Akibat/Aksi]',
      usage: 'Menyatakan alasan atau sebab di depan kalimat utama. Digunakan juga untuk menjawab pertanyaan どうして (mengapa).',
      example: 'じかんが ありませんから、タクシーで いきます。',
      translation: 'Karena tidak ada waktu, saya pergi naik taksi.',
      note: 'Jawaban singkat untuk どうして: ...からです (karena...).',
    },
  ]

  // 7. Grammar Bab 10 (4 Pola: あります vs います, Lokasi Keberadaan に, Posisi Ruang の, Partikel や/など)
  const grammar10 = [
    {
      pattern: '[Tempat] に [Makhluk Bernyawa] が います / [Benda Mati] が あります',
      meaning: 'Di [Tempat] ada [Subjek]',
      usage: 'います untuk orang & hewan (bergerak mandiri). あります untuk benda mati, tanaman, dan tumbuhan.',
      example: 'へやに ねこが います。つくえの うえに ほんが あります。',
      translation: 'Di kamar ada kucing. Di atas meja ada buku.',
      note: 'Pembeda kunci: Manusia/Kucing = います. Meja/Pohon/Gedung = あります.',
    },
    {
      pattern: '[Subjek] は [Tempat] に います / あります',
      meaning: '[Subjek] berada di [Tempat]',
      usage: 'Kalimat yang memfokuskan topik pada subjek yang dicari keberadaannya.',
      example: 'たなかさんは じむしょに います。',
      translation: 'Sdr. Tanaka ada di kantor.',
      note: 'Menanyakan lokasi: たなかさんは どこに いますか。',
    },
    {
      pattern: '[Benda A] の [Posisi] に [Benda B] が あります/います',
      meaning: 'Di [Posisi] dari [Benda A] ada [Benda B]',
      usage: 'Menggabungkan benda acuan dengan kata posisi ruang (うえ, した, まえ, うしろ, みぎ, ひだり, となり, あいだ).',
      example: 'つくえの したに いぬが います。ほんやと ぎんこうの あいだに えきが あります。',
      translation: 'Di bawah meja ada anjing. Di antara toko buku dan bank ada stasiun.',
      note: 'となり (tepat bersebelahan/satu deret), ちかく (di dekat, belum tentu bersebelahan).',
    },
    {
      pattern: '[Benda 1] や [Benda 2] など',
      meaning: '[Benda 1], [Benda 2], dan lain-lain',
      usage: 'Mendaftar contoh perwakilan dari beberapa benda tanpa menyebutkan seluruhnya secara lengkap.',
      example: 'はこの なかに てがみや しゃしんなどが あります。',
      translation: 'Di dalam kotak ada surat, foto, dan lain-lain.',
      note: 'Partikel と menyebutkan SEMUA benda tanpa sisa, sedangkan や hanya menyebutkan sebagian contoh.',
    },
  ]

  const existGrammar = await prisma.grammar.findMany({ select: { pattern: true } })
  const existGrammarSet = new Set(existGrammar.map(g => g.pattern))

  const newG9 = grammar9.filter(g => !existGrammarSet.has(g.pattern))
  if (newG9.length > 0) {
    await prisma.grammar.createMany({ data: newG9.map(g => ({ ...g, lessonId: lesson9.id })) })
    console.log(`✅ Grammar Bab 9 ditambahkan: ${newG9.length} pola`)
  }

  const newG10 = grammar10.filter(g => !existGrammarSet.has(g.pattern))
  if (newG10.length > 0) {
    await prisma.grammar.createMany({ data: newG10.map(g => ({ ...g, lessonId: lesson10.id })) })
    console.log(`✅ Grammar Bab 10 ditambahkan: ${newG10.length} pola`)
  }

  // 8. Kanji Bab 9 & 10 (16 Kanji JLPT N5)
  const kanji9And10 = [
    // Bab 9 (8 Kanji)
    { character: '好', hiragana: 'すき / こう', romaji: 'suki / kou', meaning: 'Suka, Gemar', onyomi: 'コウ (kou)', kunyomi: 'す・き, この・む (su-ki, kono-mu)', jlptLevel: 'N5', lessonId: lesson9.id },
    { character: '歌', hiragana: 'うた / か', romaji: 'uta / ka', meaning: 'Lagu, Menyanyi', onyomi: 'カ (ka)', kunyomi: 'うた, うた・う (uta, uta-u)', jlptLevel: 'N5', lessonId: lesson9.id },
    { character: '音', hiragana: 'おと / おん', romaji: 'oto / on', meaning: 'Bunyi, Suara, Nada', onyomi: 'オン, イン (on, in)', kunyomi: 'おと, ね (oto, ne)', jlptLevel: 'N5', lessonId: lesson9.id },
    { character: '楽', hiragana: 'たのしい / がく', romaji: 'tanoshii / gaku', meaning: 'Menyenangkan, Musik', onyomi: 'ガク, ラク (gaku, raku)', kunyomi: 'たの・しい, たの・しむ (tano-shii, tano-shimu)', jlptLevel: 'N5', lessonId: lesson9.id },
    { character: '野', hiragana: 'の / や', romaji: 'no / ya', meaning: 'Ladang, Lapangan', onyomi: 'ヤ (ya)', kunyomi: 'の (no)', jlptLevel: 'N4', lessonId: lesson9.id },
    { character: '球', hiragana: 'たま / きゅう', romaji: 'tama / kyuu', meaning: 'Bola, Bulat', onyomi: 'キュウ (kyuu)', kunyomi: 'たま (tama)', jlptLevel: 'N4', lessonId: lesson9.id },
    { character: '料', hiragana: 'りょう', romaji: 'ryou', meaning: 'Bahan, Biaya', onyomi: 'リョウ (ryou)', kunyomi: '-', jlptLevel: 'N4', lessonId: lesson9.id },
    { character: '理', hiragana: 'り', romaji: 'ri', meaning: 'Alasan, Logika, Pengaturan', onyomi: 'リ (ri)', kunyomi: '-', jlptLevel: 'N4', lessonId: lesson9.id },

    // Bab 10 (8 Kanji)
    { character: '犬', hiragana: 'いぬ / けん', romaji: 'inu / ken', meaning: 'Anjing', onyomi: 'ケン (ken)', kunyomi: 'いぬ (inu)', jlptLevel: 'N5', lessonId: lesson10.id },
    { character: '猫', hiragana: 'ねこ / びょう', romaji: 'neko / byou', meaning: 'Kucing', onyomi: 'ビョウ (byou)', kunyomi: 'ねこ (neko)', jlptLevel: 'N3', lessonId: lesson10.id },
    { character: '男', hiragana: 'おとこ / だん', romaji: 'otoko / dan', meaning: 'Pria, Laki-laki', onyomi: 'ダン, ナン (dan, nan)', kunyomi: 'おとこ (otoko)', jlptLevel: 'N5', lessonId: lesson10.id },
    { character: '女', hiragana: 'おんな / じょ', romaji: 'onna / jo', meaning: 'Wanita, Perempuan', onyomi: 'ジョ, ニョ (jo, nyo)', kunyomi: 'おんな, め (onna, me)', jlptLevel: 'N5', lessonId: lesson10.id },
    { character: '子', hiragana: 'こ / し', romaji: 'ko / shi', meaning: 'Anak', onyomi: 'シ, ス (shi, su)', kunyomi: 'こ (ko)', jlptLevel: 'N5', lessonId: lesson10.id },
    { character: '右', hiragana: 'みぎ / う', romaji: 'migi / u', meaning: 'Kanan', onyomi: 'ウ, ユウ (u, yuu)', kunyomi: 'みぎ (migi)', jlptLevel: 'N5', lessonId: lesson10.id },
    { character: '左', hiragana: 'ひだり / さ', romaji: 'hidari / sa', meaning: 'Kiri', onyomi: 'サ (sa)', kunyomi: 'ひだり (hidari)', jlptLevel: 'N5', lessonId: lesson10.id },
    { character: '間', hiragana: 'あいだ / かん', romaji: 'aida / kan', meaning: 'Antara, Ruang, Interval', onyomi: 'カン, ケン (kan, ken)', kunyomi: 'あいだ, ま (aida, ma)', jlptLevel: 'N5', lessonId: lesson10.id },
  ]

  const existKanji = await prisma.kanji.findMany({ select: { character: true } })
  const existKanjiSet = new Set(existKanji.map(k => k.character))
  const newKanji = kanji9And10.filter(k => !existKanjiSet.has(k.character))

  if (newKanji.length > 0) {
    await prisma.kanji.createMany({ data: newKanji })
    console.log(`✅ Kanji Bab 9 & 10 ditambahkan: ${newKanji.length} karakter`)
  }

  console.log('\n🎉 Seed Bab 9 & Bab 10 selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Bab 9 & 10:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
