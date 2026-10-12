import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed Bab 11 & Bab 12 Minna no Nihongo (Counters & Perbandingan)...')

  // 1. Dapatkan Course
  let course = await prisma.course.findFirst()
  if (!course) {
    course = await prisma.course.create({
      data: { title: 'Minna no Nihongo 1', description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.' },
    })
  }

  // 2. Buat Lesson Bab 11
  let lesson11 = await prisma.lesson.findFirst({ where: { title: 'Bab 11' } })
  if (!lesson11) {
    lesson11 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 11',
        description: 'Kata Bantu Bilangan (Counter ひとつ, ～人, ～台, ～枚), Durasi Waktu (～時間, どのくらい), dan Frekuensi (～回).',
        order: 11,
      },
    })
    console.log('✅ Lesson Bab 11 dibuat:', lesson11.id)
  }

  // 3. Buat Lesson Bab 12
  let lesson12 = await prisma.lesson.findFirst({ where: { title: 'Bab 12' } })
  if (!lesson12) {
    lesson12 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 12',
        description: 'Bentuk Lampau Kata Sifat & Benda (でした, かった), Musim & Cuaca, serta Kalimat Perbandingan (より, どちら, 一番).',
        order: 12,
      },
    })
    console.log('✅ Lesson Bab 12 dibuat:', lesson12.id)
  }

  // 4. Vocabulary Bab 11 (Counters, Quantities & Durations)
  const vocab11 = [
    { word: 'ひとつ', kanji: '１つ', kana: 'ひとつ', romaji: 'hitotsu', meaning: 'Satu buah (benda umum)', wordType: 'Noun' },
    { word: 'ふたつ', kanji: '２つ', kana: 'ふたつ', romaji: 'futatsu', meaning: 'Dua buah (benda umum)', wordType: 'Noun' },
    { word: 'みっつ', kanji: '３つ', kana: 'みっつ', romaji: 'mittsu', meaning: 'Tiga buah (benda umum)', wordType: 'Noun' },
    { word: 'よっつ', kanji: '４つ', kana: 'よっつ', romaji: 'yottsu', meaning: 'Empat buah (benda umum)', wordType: 'Noun' },
    { word: 'いつつ', kanji: '５つ', kana: 'いつつ', romaji: 'itsutsu', meaning: 'Lima buah (benda umum)', wordType: 'Noun' },
    { word: 'むっつ', kanji: '６つ', kana: 'むっつ', romaji: 'muttsu', meaning: 'Enam buah (benda umum)', wordType: 'Noun' },
    { word: 'ななつ', kanji: '７つ', kana: 'ななつ', romaji: 'nanatsu', meaning: 'Tujuh buah (benda umum)', wordType: 'Noun' },
    { word: 'やっつ', kanji: '８つ', kana: 'やっつ', romaji: 'yattsu', meaning: 'Delapan buah (benda umum)', wordType: 'Noun' },
    { word: 'ここのつ', kanji: '９つ', kana: 'ここのつ', romaji: 'kokonotsu', meaning: 'Sembilan buah (benda umum)', wordType: 'Noun' },
    { word: 'とお', kanji: '１０', kana: 'とお', romaji: 'too', meaning: 'Sepuluh buah (benda umum)', wordType: 'Noun' },
    { word: 'いくつ', kana: 'いくつ', romaji: 'ikutsu', meaning: 'Berapa buah / Berapa usia', wordType: 'Noun' },
    { word: 'ひとり', kanji: '１人', kana: 'ひとり', romaji: 'hitori', meaning: 'Satu orang (sendirian)', wordType: 'Noun' },
    { word: 'ふたり', kanji: '２人', kana: 'ふたり', romaji: 'futari', meaning: 'Dua orang', wordType: 'Noun' },
    { word: 'にん', kanji: '～人', kana: '～にん', romaji: '~nin', meaning: 'Counter orang (~ orang)', wordType: 'Suffix' },
    { word: 'だい', kanji: '～台', kana: '～だい', romaji: '~dai', meaning: 'Counter kendaraan & mesin (~ unit)', wordType: 'Suffix' },
    { word: 'まい', kanji: '～枚', kana: '～まい', romaji: '~mai', meaning: 'Counter lembar / benda tipis pipih', wordType: 'Suffix' },
    { word: 'かい', kanji: '～回', kana: '～かい', romaji: '~kai', meaning: 'Counter frekuensi (~ kali)', wordType: 'Suffix' },
    { word: 'どのくらい', kana: 'どのくらい', romaji: 'donokurai', meaning: 'Berapa lama / Seberapa banyak', wordType: 'Adverb' },
    { word: 'きょうだい', kanji: '兄弟', kana: 'きょうだい', romaji: 'kyoudai', meaning: 'Saudara kandung', wordType: 'Noun' },
    { word: 'りょうしん', kanji: '両親', kana: 'りょうしん', romaji: 'ryoushin', meaning: 'Kedua orang tua', wordType: 'Noun' },
    { word: 'りんご', kana: 'りんご', romaji: 'ringo', meaning: 'Apel', wordType: 'Noun' },
    { word: 'みかん', kana: 'みかん', romaji: 'mikan', meaning: 'Jeruk mandarin', wordType: 'Noun' },
  ]

  // 5. Vocabulary Bab 12 (Opposites, Seasons, Weather, Comparisons)
  const vocab12 = [
    { word: 'かんたん', kanji: '簡単', kana: 'かんたん', romaji: 'kantan', meaning: 'Mudah / Gampang', wordType: 'na-adjective' },
    { word: 'ちかい', kanji: '近い', kana: 'ちかい', romaji: 'chikai', meaning: 'Dekat', wordType: 'i-adjective' },
    { word: 'とおい', kanji: '遠い', kana: 'とおい', romaji: 'tooi', meaning: 'Jauh', wordType: 'i-adjective' },
    { word: 'はやい', kanji: '早い', kana: 'はやい', romaji: 'hayai', meaning: 'Cepat / Pagi (waktu)', wordType: 'i-adjective' },
    { word: 'おそい', kanji: '遅い', kana: 'おそい', romaji: 'osoi', meaning: 'Lambat / Terlambat', wordType: 'i-adjective' },
    { word: 'おおい', kanji: '多い', kana: 'おおい', romaji: 'ooi', meaning: 'Banyak (orang/hal)', wordType: 'i-adjective' },
    { word: 'すくない', kanji: '少ない', kana: 'すくない', romaji: 'sukunai', meaning: 'Sedikit (orang/hal)', wordType: 'i-adjective' },
    { word: 'あたたかい', kanji: '暖かい', kana: 'あたたかい', romaji: 'atatakai', meaning: 'Hangat (cuaca)', wordType: 'i-adjective' },
    { word: 'すずしい', kanji: '涼しい', kana: 'すずしい', romaji: 'suzushii', meaning: 'Sejuk', wordType: 'i-adjective' },
    { word: 'あまい', kanji: '甘い', kana: 'あまい', romaji: 'amai', meaning: 'Manis', wordType: 'i-adjective' },
    { word: 'からい', kanji: '辛い', kana: 'からい', romaji: 'karai', meaning: 'Pedas', wordType: 'i-adjective' },
    { word: 'おもい', kanji: '重い', kana: 'おもい', romaji: 'omoi', meaning: 'Berat', wordType: 'i-adjective' },
    { word: 'かるい', kanji: '軽い', kana: 'かるい', romaji: 'karui', meaning: 'Ringan', wordType: 'i-adjective' },
    { word: 'きせつ', kanji: '季節', kana: 'きせつ', romaji: 'kisetsu', meaning: 'Musim', wordType: 'Noun' },
    { word: 'はる', kanji: '春', kana: 'はる', romaji: 'haru', meaning: 'Musim semi', wordType: 'Noun' },
    { word: 'なつ', kanji: '夏', kana: 'なつ', romaji: 'natsu', meaning: 'Musim panas', wordType: 'Noun' },
    { word: 'あき', kanji: '秋', kana: 'あき', romaji: 'aki', meaning: 'Musim gugur', wordType: 'Noun' },
    { word: 'ふゆ', kanji: '冬', kana: 'ふゆ', romaji: 'fuyu', meaning: 'Musim dingin', wordType: 'Noun' },
    { word: 'てんき', kanji: '天気', kana: 'てんき', romaji: 'tenki', meaning: 'Cuaca', wordType: 'Noun' },
    { word: 'あめ', kanji: '雨', kana: 'あめ', romaji: 'ame', meaning: 'Hujan', wordType: 'Noun' },
    { word: 'ゆき', kanji: '雪', kana: 'ゆき', romaji: 'yuki', meaning: 'Salju', wordType: 'Noun' },
    { word: 'くもり', kanji: '曇り', kana: 'くもり', romaji: 'kumori', meaning: 'Mendung / Berawan', wordType: 'Noun' },
    { word: 'ホテル', kana: 'ホテル', romaji: 'hoteru', meaning: 'Hotel', wordType: 'Noun' },
    { word: 'くうこう', kanji: '空港', kana: 'くうこう', romaji: 'kuukou', meaning: 'Bandara', wordType: 'Noun' },
    { word: 'うみ', kanji: '海', kana: 'うみ', romaji: 'umi', meaning: 'Laut', wordType: 'Noun' },
    { word: 'せかい', kanji: '世界', kana: 'せかい', romaji: 'sekai', meaning: 'Dunia', wordType: 'Noun' },
    { word: 'パーティー', kana: 'パーティー', romaji: 'paatii', meaning: 'Pesta', wordType: 'Noun' },
    { word: 'まつり', kanji: '祭り', kana: 'まつり', romaji: 'matsuri', meaning: 'Festival / Perayaan', wordType: 'Noun' },
    { word: 'どちら', kana: 'どちら', romaji: 'dochira', meaning: 'Yang mana (dari 2 pilihan)', wordType: 'Pronoun' },
    { word: 'どちらも', kana: 'どちらも', romaji: 'dochiramo', meaning: 'Keduanya / Dua-duanya', wordType: 'Pronoun' },
    { word: 'ずっと', kana: 'ずっと', romaji: 'zutto', meaning: 'Jauh lebih... / Terus-menerus', wordType: 'Adverb' },
  ]

  const existVocab = await prisma.vocabulary.findMany({ select: { word: true } })
  const existVocabSet = new Set(existVocab.map((v) => v.word))

  const newVocab11 = vocab11.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson11.id }))
  if (newVocab11.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab11 })
    console.log(`✅ Vocab Bab 11 ditambahkan: ${newVocab11.length}`)
  }

  const newVocab12 = vocab12.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson12.id }))
  if (newVocab12.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab12 })
    console.log(`✅ Vocab Bab 12 ditambahkan: ${newVocab12.length}`)
  }

  // 6. Grammar Bab 11 (4 Pola: Posisi Counter, Frekuensi Periode, Durasi Transportasi, Batasan dake)
  const grammar11 = [
    {
      pattern: 'Kata Benda を [Angka/Counter] + Kata Kerja',
      meaning: 'Menyatakan kuantitas benda yang dikenai tindakan',
      usage: 'Di bahasa Jepang, kata bilangan / counter diletakkan setelah partikel penanda objek atau subjek, tepat sebelum kata kerja.',
      example: 'りんごを ３つ 買いました。りゅうがくせいが ２人 います。',
      translation: 'Saya membeli 3 buah apel. Ada 2 siswa asing.',
      note: 'Pola umum: [Objek] を [Jumlah] [Kata Kerja]. Jangan letakkan partikel を setelah jumlah.',
      lessonId: lesson11.id,
    },
    {
      pattern: '[Jangka Waktu] に [Frekuensi] 回 + Kata Kerja',
      meaning: 'Menyatakan frekuensi tindakan dalam satuan jangka waktu tertentu (~ kali dalam ~)',
      usage: 'Menggunakan partikel に setelah satuan periode (1 hari, 1 minggu, 1 bulan, 1 tahun).',
      example: '１か月に ２回 えいがを 見ます。１週間に １回 テニスを します。',
      translation: 'Saya menonton film 2 kali dalam 1 bulan. Bermain tenis 1 kali seminggu.',
      note: 'Partikel に berfungsi sebagai penanda basis satuan rentang waktu.',
      lessonId: lesson11.id,
    },
    {
      pattern: '[Tempat A] から [Tempat B] まで [Transportasi] で [Durasi] かかります',
      meaning: 'Memakan waktu [durasi] dari tempat A ke tempat B menggunakan [transportasi]',
      usage: 'Kata kerja かかります berarti "memakan waktu atau biaya". Untuk bertanya gunakan どのくらい かかりますか。',
      example: 'うちから えきまで あるいて １５分 かかります。',
      translation: 'Dari rumah ke stasiun memakan waktu 15 menit jalan kaki.',
      note: 'Perhatikan partikel で penanda alat/cara transportasi.',
      lessonId: lesson11.id,
    },
    {
      pattern: '[Jumlah / Benda] だけ',
      meaning: 'Hanya / Cuma [sejumlah / hal tertentu]',
      usage: 'Diletakkan setelah angka atau kata benda untuk membatasi ruang lingkup (tidak lebih dari itu).',
      example: 'やすみは にちようび だけです。１つ だけ あります。',
      translation: 'Libur hanya hari Minggu saja. Cuma ada satu buah.',
      note: 'Menggantikan atau bisa digabung dengan partikel penanda topik.',
      lessonId: lesson11.id,
    },
  ]

  // 7. Grammar Bab 12 (5 Pola: Past Tense Noun/Na-Adj, Past Tense I-Adj, Yori Hou Ga, Dochira, Ichiban)
  const grammar12 = [
    {
      pattern: 'Kata Benda / Na-Adj でした / ではありませんでした (Lampau)',
      meaning: 'Bentuk lampau positif & negatif untuk kata benda dan kata sifat-na',
      usage: 'Kata benda dan kata sifat-na mengikuti pola konjugasi kopula yang sama untuk masa lampau.',
      example: 'きのおは あめでした。きのうの テストは かんたんではありませんでした。',
      translation: 'Kemarin hujan. Ujian kemarin tidak mudah.',
      note: 'Bandingkan: 現在 (です / じゃありません) vs 過去 (でした / じゃありませんでした).',
      lessonId: lesson12.id,
    },
    {
      pattern: 'I-Adj かった / くなかったです (Lampau)',
      meaning: 'Bentuk lampau positif (-katta) & negatif (-kunakatta desu) untuk kata sifat-i',
      usage: 'Akhiran い dilepas, lalu diganti かったです (positif lampau) atau くなかったです (negatif lampau). Khusus いい menjadi よかったです.',
      example: 'きのうは さむかったです。おまつりは たのしくなかったです。',
      translation: 'Kemarin dingin. Festival kemarin tidak menyenangkan.',
      note: 'Pengecualian penting: いい (bagus) -> よかった (lampau), よくなかった (negatif lampau).',
      lessonId: lesson12.id,
    },
    {
      pattern: 'Kata Benda 1 は Kata Benda 2 より [Kata Sifat] です',
      meaning: 'Benda 1 lebih [sifat] daripada Benda 2',
      usage: 'Benda 1 adalah topik utama yang memiliki derajat sifat lebih tinggi daripada pembandingnya (Benda 2).',
      example: 'くるまは じてんしゃより はやいです。',
      translation: 'Mobil lebih cepat daripada sepeda.',
      note: 'Partikel より berarti "daripada / dibandingkan".',
      lessonId: lesson12.id,
    },
    {
      pattern: 'Kata Benda 1 と Kata Benda 2 と どちらが [Kata Sifat] ですか',
      meaning: 'Antara Benda 1 dan Benda 2, yang mana yang lebih [sifat]?',
      usage: 'Digunakan untuk menanyakan pilihan antara 2 hal. Jawabannya memakai pola [Pilihan] の ほうが [Sifat] です.',
      example: 'りんごと みかんと どちらが すきですか。…りんごの ほうが すきです。',
      translation: 'Antara apel dan jeruk, mana yang lebih kamu suka? ...Lebih suka apel.',
      note: 'Jika keduanya sama, jawab: どちらも すきです (Dua-duanya suka).',
      lessonId: lesson12.id,
    },
    {
      pattern: '[Kategori] の 中で 何/どこ/だれ/いつ が いちばん [Kata Sifat] ですか',
      meaning: 'Di dalam [kategori/kelompok], apa/mana/siapa/kapan yang paling [sifat]?',
      usage: 'Digunakan untuk superlative (derajat tertinggi) di antara 3 pilihan atau lebih.',
      example: '１年の なかで いつが いちばん さむいですか。…２がつが いちばん さむいです。',
      translation: 'Dalam setahun kapan yang paling dingin? ...Bulan Februari yang paling dingin.',
      note: 'いっしょに (bersama) vs いちばん (paling/nomor satu).',
      lessonId: lesson12.id,
    },
  ]

  const existGrammar = await prisma.grammar.findMany({ select: { pattern: true } })
  const existGrammarSet = new Set(existGrammar.map((g) => g.pattern))

  const newGrammar11 = grammar11.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar11.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar11 })
    console.log(`✅ Grammar Bab 11 ditambahkan: ${newGrammar11.length}`)
  }

  const newGrammar12 = grammar12.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar12.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar12 })
    console.log(`✅ Grammar Bab 12 ditambahkan: ${newGrammar12.length}`)
  }

  // 8. Kanji Bab 11 & 12
  const kanji11And12 = [
    // Bab 11 (6 Kanji)
    { character: '台', hiragana: 'だい / たい', romaji: 'dai / tai', meaning: 'Alat, Mesin, Meja, Panggung', onyomi: 'ダイ, タイ (dai, tai)', kunyomi: 'うてな (utena)', jlptLevel: 'N4', lessonId: lesson11.id },
    { character: '枚', hiragana: 'まい', romaji: 'mai', meaning: 'Lembar, Helaian tipis', onyomi: 'マイ (mai)', kunyomi: '-', jlptLevel: 'N4', lessonId: lesson11.id },
    { character: '兄', hiragana: 'あに / けい', romaji: 'ani / kei', meaning: 'Kakak laki-laki', onyomi: 'ケイ, キョウ (kei, kyou)', kunyomi: 'あに (ani)', jlptLevel: 'N5', lessonId: lesson11.id },
    { character: '弟', hiragana: 'おとうと / てい', romaji: 'otouto / tei', meaning: 'Adik laki-laki', onyomi: 'テイ, ダイ (tei, dai)', kunyomi: 'おとうと (otouto)', jlptLevel: 'N5', lessonId: lesson11.id },
    { character: '姉', hiragana: 'あね / し', romaji: 'ane / shi', meaning: 'Kakak perempuan', onyomi: 'シ (shi)', kunyomi: 'あね (ane)', jlptLevel: 'N5', lessonId: lesson11.id },
    { character: '妹', hiragana: 'いもうと / まい', romaji: 'imouto / mai', meaning: 'Adik perempuan', onyomi: 'マイ (mai)', kunyomi: 'いもうと (imouto)', jlptLevel: 'N5', lessonId: lesson11.id },

    // Bab 12 (8 Kanji)
    { character: '春', hiragana: 'はる / しゅん', romaji: 'haru / shun', meaning: 'Musim semi', onyomi: 'シュン (shun)', kunyomi: 'はる (haru)', jlptLevel: 'N5', lessonId: lesson12.id },
    { character: '夏', hiragana: 'なつ / か', romaji: 'natsu / ka', meaning: 'Musim panas', onyomi: 'カ, ゲ (ka, ge)', kunyomi: 'なつ (natsu)', jlptLevel: 'N5', lessonId: lesson12.id },
    { character: '秋', hiragana: 'あき / しゅう', romaji: 'aki / shuu', meaning: 'Musim gugur', onyomi: 'シュウ (shuu)', kunyomi: 'あき (aki)', jlptLevel: 'N5', lessonId: lesson12.id },
    { character: '冬', hiragana: 'ふゆ / とう', romaji: 'fuyu / tou', meaning: 'Musim dingin', onyomi: 'トウ (tou)', kunyomi: 'ふゆ (fuyu)', jlptLevel: 'N5', lessonId: lesson12.id },
    { character: '雨', hiragana: 'あめ / う', romaji: 'ame / u', meaning: 'Hujan', onyomi: 'ウ (u)', kunyomi: 'あめ, あま (ame, ama)', jlptLevel: 'N5', lessonId: lesson12.id },
    { character: '雪', hiragana: 'ゆき / せつ', romaji: 'yuki / setsu', meaning: 'Salju', onyomi: 'セツ (setsu)', kunyomi: 'ゆき (yuki)', jlptLevel: 'N4', lessonId: lesson12.id },
    { character: '海', hiragana: 'うみ / かい', romaji: 'umi / kai', meaning: 'Laut, Samudra', onyomi: 'カイ (kai)', kunyomi: 'うみ (umi)', jlptLevel: 'N5', lessonId: lesson12.id },
    { character: '界', hiragana: 'かい', romaji: 'kai', meaning: 'Dunia, Batas', onyomi: 'カイ (kai)', kunyomi: '-', jlptLevel: 'N4', lessonId: lesson12.id },
  ]

  const existKanji = await prisma.kanji.findMany({ select: { character: true } })
  const existKanjiSet = new Set(existKanji.map((k) => k.character))

  const newKanji = kanji11And12.filter((k) => !existKanjiSet.has(k.character))
  if (newKanji.length > 0) {
    await prisma.kanji.createMany({ data: newKanji })
    console.log(`✅ Kanji Bab 11 & 12 ditambahkan: ${newKanji.length} karakter`)
  }

  console.log('\n🎉 Seed Bab 11 & Bab 12 selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Bab 11 & 12:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
