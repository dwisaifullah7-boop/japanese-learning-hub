import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed Bab 13 & Bab 14 Minna no Nihongo (Desires, Purpose of Motion & Bentuk-Te)...')

  // 1. Dapatkan Course
  let course = await prisma.course.findFirst()
  if (!course) {
    course = await prisma.course.create({
      data: { title: 'Minna no Nihongo 1', description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.' },
    })
  }

  // 2. Buat Lesson Bab 13
  let lesson13 = await prisma.lesson.findFirst({ where: { title: 'Bab 13' } })
  if (!lesson13) {
    lesson13 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 13',
        description: 'Keinginan (ほしい, ～たい), Tujuan Gerak (へ ～に 行きます), dan Indefinite Pronouns (どこか, なにか).',
        order: 13,
      },
    })
    console.log('✅ Lesson Bab 13 dibuat:', lesson13.id)
  }

  // 3. Buat Lesson Bab 14
  let lesson14 = await prisma.lesson.findFirst({ where: { title: 'Bab 14' } })
  if (!lesson14) {
    lesson14 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 14',
        description: 'Pengenalan Kata Kerja Bentuk-Te (て形), Permohonan Sopan (～てください), Aksi Berlangsung (～ています), dan Tawaran (～ましょうか).',
        order: 14,
      },
    })
    console.log('✅ Lesson Bab 14 dibuat:', lesson14.id)
  }

  // 4. Vocabulary Bab 13 (Desires, Purpose, Places, Leisure)
  const vocab13 = [
    { word: 'ほしい', kanji: '欲しい', kana: 'ほしい', romaji: 'hoshii', meaning: 'Ingin / Mau (benda/objek)', wordType: 'i-adjective' },
    { word: 'あそびます', kanji: '遊びます', kana: 'あそびます', romaji: 'asobimasu', meaning: 'Bermain / Bersenang-senang', wordType: 'Verb' },
    { word: 'およぎます', kanji: '泳ぎます', kana: 'およぎます', romaji: 'oyogimasu', meaning: 'Berenang', wordType: 'Verb' },
    { word: 'むかえます', kanji: '迎えます', kana: 'むかえます', romaji: 'mukaemasu', meaning: 'Menjemput / Menyambut', wordType: 'Verb' },
    { word: 'つかれます', kanji: '疲れます', kana: 'つかれます', romaji: 'tsukaremasu', meaning: 'Lelah / Capek', wordType: 'Verb' },
    { word: 'だします', kanji: '出します', kana: 'だします', romaji: 'dashimasu', meaning: 'Mengeluarkan / Mengirim (surat)', wordType: 'Verb' },
    { word: 'はいります', kanji: '入ります', kana: 'はいります', romaji: 'hairimasu', meaning: 'Masuk (ke kamar/kafe)', wordType: 'Verb' },
    { word: 'でます', kanji: '出ます', kana: 'でます', romaji: 'demasu', meaning: 'Keluar (dari kafe/ruangan)', wordType: 'Verb' },
    { word: 'けっこんします', kanji: '結婚します', kana: 'けっこんします', romaji: 'kekkonshimasu', meaning: 'Menikah', wordType: 'Verb' },
    { word: 'かいものします', kanji: '買い物します', kana: 'かいものします', romaji: 'kaimonoshimasu', meaning: 'Berbelanja', wordType: 'Verb' },
    { word: 'しょくじします', kanji: '食事します', kana: 'しょくじします', romaji: 'shokujishimasu', meaning: 'Makan bersama', wordType: 'Verb' },
    { word: 'さんぽします', kanji: '散歩します', kana: 'さんぽします', romaji: 'sanposhimasu', meaning: 'Jalan-jalan santai', wordType: 'Verb' },
    { word: 'たいへん', kanji: '大変', kana: 'たいへん', romaji: 'taihen', meaning: 'Berat / Sulit / Gawat', wordType: 'na-adjective' },
    { word: 'ひろい', kanji: '広い', kana: 'ひろい', romaji: 'hiroi', meaning: 'Luas / Lebar', wordType: 'i-adjective' },
    { word: 'せまい', kanji: '狭い', kana: 'せまい', romaji: 'semai', meaning: 'Sempit', wordType: 'i-adjective' },
    { word: 'プール', kana: 'プール', romaji: 'puuru', meaning: 'Kolam renang', wordType: 'Noun' },
    { word: 'かわ', kanji: '川', kana: 'かわ', romaji: 'kawa', meaning: 'Sungai', wordType: 'Noun' },
    { word: 'びじゅつ', kanji: '美術', kana: 'びじゅつ', romaji: 'bijutsu', meaning: 'Seni rupa', wordType: 'Noun' },
    { word: 'つり', kana: 'つり', romaji: 'tsuri', meaning: 'Memancing', wordType: 'Noun' },
    { word: 'スキー', kana: 'スキー', romaji: 'sukii', meaning: 'Bermain ski', wordType: 'Noun' },
    { word: 'しゅうまつ', kanji: '週末', kana: 'しゅうまつ', romaji: 'shuumatsu', meaning: 'Akhir pekan (weekend)', wordType: 'Noun' },
    { word: 'なにか', kanji: '何か', kana: 'なにか', romaji: 'nanika', meaning: 'Sesuatu', wordType: 'Pronoun' },
    { word: 'どこか', kana: 'どこか', romaji: 'dokoka', meaning: 'Suatu tempat / Ke suatu tempat', wordType: 'Pronoun' },
    { word: 'おなかがすきました', kana: 'おなかがすきました', romaji: 'onaka ga sukimashita', meaning: 'Perut terasa lapar', wordType: 'Expression' },
    { word: 'のどがかわきました', kana: 'のどがかわきました', romaji: 'nodo ga kawakimashita', meaning: 'Tenggorokan terasa haus', wordType: 'Expression' },
  ]

  // 5. Vocabulary Bab 14 (Te-Form verbs, Requests, Assistance)
  const vocab14 = [
    { word: 'つけます', kana: 'つけます', romaji: 'tsukemasu', meaning: 'Menyalakan (lampu/AC)', wordType: 'Verb' },
    { word: 'けします', kanji: '消します', kana: 'けします', romaji: 'keshimasu', meaning: 'Mematikan (lampu/AC)', wordType: 'Verb' },
    { word: 'あけます', kanji: '開けます', kana: 'あけます', romaji: 'akemasu', meaning: 'Membuka (pintu/jendela)', wordType: 'Verb' },
    { word: 'しめます', kanji: '閉めます', kana: 'しめます', romaji: 'shimemasu', meaning: 'Menutup (pintu/jendela)', wordType: 'Verb' },
    { word: 'いそぎます', kanji: '急ぎます', kana: 'いそぎます', romaji: 'isogimasu', meaning: 'Buru-buru / Bergegas', wordType: 'Verb' },
    { word: 'まちます', kanji: '待ちます', kana: 'まちます', romaji: 'machimasu', meaning: 'Menunggu', wordType: 'Verb' },
    { word: 'とめます', kanji: '止めます', kana: 'とめます', romaji: 'tomemasu', meaning: 'Menghentikan / Memarkir', wordType: 'Verb' },
    { word: 'まがります', kanji: '曲がります', kana: 'まがります', romaji: 'magarimasu', meaning: 'Belok (kanan/kiri)', wordType: 'Verb' },
    { word: 'もちます', kanji: '持ちます', kana: 'もちます', romaji: 'mochimasu', meaning: 'Membawa / Memegang', wordType: 'Verb' },
    { word: 'とります', kanji: '取ります', kana: 'とります', romaji: 'torimasu', meaning: 'Mengambilkan (garam/foto)', wordType: 'Verb' },
    { word: 'てつだいます', kanji: '手伝います', kana: 'てつだいます', romaji: 'tetsudaimasu', meaning: 'Membantu / Menolong', wordType: 'Verb' },
    { word: 'よびます', kanji: '呼びます', kana: 'よびます', romaji: 'yobimasu', meaning: 'Memanggil (taksi/teman)', wordType: 'Verb' },
    { word: 'はなします', kanji: '話します', kana: 'はなします', romaji: 'hanashimasu', meaning: 'Berbicara', wordType: 'Verb' },
    { word: 'みせます', kanji: '見せます', kana: 'みせます', romaji: 'misemasu', meaning: 'Memperlihatkan / Menunjukkan', wordType: 'Verb' },
    { word: 'おしえます', kanji: '教えます', kana: 'おしえます', romaji: 'oshiemasu', meaning: 'Memberitahu (alamat/nomor)', wordType: 'Verb' },
    { word: 'はじめます', kanji: '始めます', kana: 'はじめます', romaji: 'hajimemasu', meaning: 'Memulai', wordType: 'Verb' },
    { word: 'ふります', kanji: '降ります', kana: 'ふります', romaji: 'furimasu', meaning: 'Turun (hujan/salju)', wordType: 'Verb' },
    { word: 'コピーします', kana: 'コピーします', romaji: 'kopiishimasu', meaning: 'Memfotokopi', wordType: 'Verb' },
    { word: 'エアコン', kana: 'エアコン', romaji: 'eakon', meaning: 'Air Conditioner / AC', wordType: 'Noun' },
    { word: 'パスポート', kana: 'パスポート', romaji: 'pasupooto', meaning: 'Paspor', wordType: 'Noun' },
    { word: 'なまえ', kanji: '名前', kana: 'なまえ', romaji: 'namae', meaning: 'Nama', wordType: 'Noun' },
    { word: 'じゅうしょ', kanji: '住所', kana: 'じゅうしょ', romaji: 'juusho', meaning: 'Alamat', wordType: 'Noun' },
    { word: 'ちず', kanji: '地図', kana: 'ちず', romaji: 'chizu', meaning: 'Peta', wordType: 'Noun' },
    { word: 'しお', kanji: '塩', kana: 'しお', romaji: 'shio', meaning: 'Garam', wordType: 'Noun' },
    { word: 'さとう', kanji: '砂糖', kana: 'さとう', romaji: 'satou', meaning: 'Gula', wordType: 'Noun' },
    { word: 'ゆっくり', kana: 'ゆっくり', romaji: 'yukkuri', meaning: 'Pelan-pelan / Santai', wordType: 'Adverb' },
    { word: 'すぐに', kana: 'すぐに', romaji: 'suguni', meaning: 'Segera / Langsung', wordType: 'Adverb' },
    { word: 'また', kana: 'また', romaji: 'mata', meaning: 'Lagi / Nanti lagi', wordType: 'Adverb' },
    { word: 'あとで', kana: 'あとで', romaji: 'atode', meaning: 'Nanti / Kemudian', wordType: 'Adverb' },
    { word: 'もうすこし', kana: 'もうすこし', romaji: 'mou sukoshi', meaning: 'Sedikit lagi', wordType: 'Adverb' },
  ]

  const existVocab = await prisma.vocabulary.findMany({ select: { word: true } })
  const existVocabSet = new Set(existVocab.map((v) => v.word))

  const newVocab13 = vocab13.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson13.id }))
  if (newVocab13.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab13 })
    console.log(`✅ Vocab Bab 13 ditambahkan: ${newVocab13.length}`)
  }

  const newVocab14 = vocab14.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson14.id }))
  if (newVocab14.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab14 })
    console.log(`✅ Vocab Bab 14 ditambahkan: ${newVocab14.length}`)
  }

  // 6. Grammar Bab 13
  const grammar13 = [
    {
      pattern: 'Kata Benda が ほしいです',
      meaning: 'Menginginkan [Benda] (Saya ingin...)',
      usage: 'Hanya digunakan untuk menyatakan keinginan pembicara terhadap suatu benda konkret (bukan perbuatan). Objek ditandai partikel が.',
      example: 'わたしは あたらしい くるまが ほしいです。',
      translation: 'Saya ingin mobil baru.',
      note: 'Jangan gunakan untuk menanyakan langsung keinginan orang lain yang berkedudukan lebih tinggi.',
      lessonId: lesson13.id,
    },
    {
      pattern: 'Kata Kerja (Stem -Masu) + たいです / たくないです',
      meaning: 'Ingin / Tidak ingin melakukan [Aksi]',
      usage: 'Hilangkan akhiran ます pada kata kerja, lalu tambahkan たいです. Partikel objek を bisa berubah menjadi が.',
      example: 'にほんへ いきたいです。ジュースを（が）のみたいです。',
      translation: 'Saya ingin pergi ke Jepang. Saya ingin minum jus.',
      note: 'Bentuk lampau: ～たかったです. Negatif lampau: ～たくなかったです.',
      lessonId: lesson13.id,
    },
    {
      pattern: '[Tempat] へ [KK-Stem / Kata Benda] に 行きます / 来ます / 帰ります',
      meaning: 'Pergi / Datang / Pulang ke [Tempat] untuk tujuan [Aktivitas]',
      usage: 'Menyatakan tujuan perpindahan lokasi. Kata kerja sebelum に menggunakan bentuk stem (tanpa ます).',
      example: 'デパートへ かいものに いきます。こうえんへ さんぽに いきます。',
      translation: 'Pergi ke departemen store untuk berbelanja. Pergi ke taman untuk jalan-jalan.',
      note: 'Partikel に di sini berfungsi khusus sebagai penanda target/tujuan aksi.',
      lessonId: lesson13.id,
    },
    {
      pattern: 'どこか (へ) / なにか (を)',
      meaning: 'Ke suatu tempat / Sesuatu (Indefinite Pronouns)',
      usage: 'Menyatakan tempat atau benda yang belum spesifik tanpa perlu partikel へ/を (bisa disingkat).',
      example: 'どこかへ いきましたか。…いいえ、どこも いきませんでした。なにか たべたいです。',
      translation: 'Apakah pergi ke suatu tempat? ...Tidak, tidak pergi ke mana-mana. Saya ingin makan sesuatu.',
      note: 'Perhatikan: どこか (suatu tempat) vs どこも (sama sekali tidak ke mana-mana + negatif).',
      lessonId: lesson13.id,
    },
  ]

  // 7. Grammar Bab 14
  const grammar14 = [
    {
      pattern: 'Kata Kerja Bentuk-Te (て形) Konjugasi',
      meaning: 'Bentuk penghubung / dasar konjugasi permohonan & kondisi',
      usage: 'Grup 1: う・つ・る -> って, む・ぶ・ぬ -> んで, く -> いて, ぐ -> いで, す -> して, 行く -> 行って. Grup 2: ます -> て. Grup 3: します -> して, 来ます -> きて.',
      example: 'かって (kau), のんで (nomu), かいて (kaku), たべて (taberu), きて (kuru).',
      translation: 'Membeli, minum, menulis, makan, datang.',
      note: 'Fondasi terpenting dari bahasa Jepang tingkat dasar yang menjadi pintu masuk ke puluhan pola lanjutan.',
      lessonId: lesson14.id,
    },
    {
      pattern: 'Kata Kerja て + ください',
      meaning: 'Tolong / Silakan [Lakukan tindakan]',
      usage: 'Meminta bantuan atau mempersilakan lawan bicara secara sopan.',
      example: 'ここに なまえを かいて ください。ちょっと まって ください。',
      translation: 'Tolong tulis nama di sini. Tolong tunggu sebentar.',
      note: 'Bentuk negatif permohonan baru dipelajari di Bab 17 (ないでください).',
      lessonId: lesson14.id,
    },
    {
      pattern: 'Kata Kerja て + います',
      meaning: 'Sedang melakukan [Tindakan] (Present Continuous)',
      usage: 'Menyatakan aksi yang sedang berlangsung saat pembicaraan dilakukan.',
      example: 'いま あめが ふっています。たなかさんは にほんごを べんきょうして います。',
      translation: 'Sekarang sedang turun hujan. Sdr. Tanaka sedang belajar bahasa Jepang.',
      note: 'Di bab berikutnya juga akan digunakan untuk menyatakan status/kebiasaan (状態).',
      lessonId: lesson14.id,
    },
    {
      pattern: 'Kata Kerja ます (Stem) + ましょうか',
      meaning: 'Bagaimana kalau saya bantu [Lakukan tindakan]? (Menawarkan bantuan)',
      usage: 'Pembicara berinisiatif menawarkan bantuan kepada lawan bicara yang terlihat kerepotan.',
      example: 'にもつを もちましょうか。…ありがとうございます。',
      translation: 'Mau saya bawakan barangnya? ...Terima kasih banyak.',
      note: 'Bandingkan dengan Bab 6: ～ましょう (Ayo kita lakukan bersama).',
      lessonId: lesson14.id,
    },
  ]

  const existGrammar = await prisma.grammar.findMany({ select: { pattern: true } })
  const existGrammarSet = new Set(existGrammar.map((g) => g.pattern))

  const newGrammar13 = grammar13.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar13.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar13 })
    console.log(`✅ Grammar Bab 13 ditambahkan: ${newGrammar13.length}`)
  }

  const newGrammar14 = grammar14.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar14.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar14 })
    console.log(`✅ Grammar Bab 14 ditambahkan: ${newGrammar14.length}`)
  }

  // 8. Kanji Bab 13 & 14
  const kanji13And14 = [
    // Bab 13 (6 Kanji)
    { character: '遊', hiragana: 'あそ・ぶ / ゆう', romaji: 'aso-bu / yuu', meaning: 'Bermain, Bersenang-senang', onyomi: 'ユウ (yuu)', kunyomi: 'あそ・ぶ (aso-bu)', jlptLevel: 'N4', lessonId: lesson13.id },
    { character: '泳', hiragana: 'およ・ぐ / えい', romaji: 'oyo-gu / ei', meaning: 'Berenang', onyomi: 'エイ (ei)', kunyomi: 'およ・ぐ (oyo-gu)', jlptLevel: 'N4', lessonId: lesson13.id },
    { character: '疲', hiragana: 'つか・れる / ひ', romaji: 'tsuka-reru / hi', meaning: 'Lelah, Capek', onyomi: 'ヒ (hi)', kunyomi: 'つか・れる (tsuka-reru)', jlptLevel: 'N3', lessonId: lesson13.id },
    { character: '広', hiragana: 'ひろ・い / こう', romaji: 'hiro-i / kou', meaning: 'Luas, Lebar', onyomi: 'コウ (kou)', kunyomi: 'ひろ・い (hiro-i)', jlptLevel: 'N5', lessonId: lesson13.id },
    { character: '川', hiragana: 'かわ / せん', romaji: 'kawa / sen', meaning: 'Sungai', onyomi: 'セン (sen)', kunyomi: 'かわ (kawa)', jlptLevel: 'N5', lessonId: lesson13.id },
    { character: '結', hiragana: 'むす・ぶ / けつ', romaji: 'musu-bu / ketsu', meaning: 'Mengikat, Menyimpulkan', onyomi: 'ケツ (ketsu)', kunyomi: 'むす・ぶ (musu-bu)', jlptLevel: 'N4', lessonId: lesson13.id },

    // Bab 14 (8 Kanji)
    { character: '待', hiragana: 'ま・つ / たい', romaji: 'ma-tsu / tai', meaning: 'Menunggu', onyomi: 'タイ (tai)', kunyomi: 'ま・つ (ma-tsu)', jlptLevel: 'N5', lessonId: lesson14.id },
    { character: '急', hiragana: 'いそ・ぐ / きゅう', romaji: 'iso-gu / kyuu', meaning: 'Cepat, Mendesak, Buru-buru', onyomi: 'キュウ (kyuu)', kunyomi: 'いそ・ぐ (iso-gu)', jlptLevel: 'N4', lessonId: lesson14.id },
    { character: '開', hiragana: 'あ・ける / かい', romaji: 'a-keru / kai', meaning: 'Membuka', onyomi: 'カイ (kai)', kunyomi: 'あ・ける, ひら・く (a-keru, hira-ku)', jlptLevel: 'N5', lessonId: lesson14.id },
    { character: '閉', hiragana: 'し・める / へい', romaji: 'shi-meru / hei', meaning: 'Menutup', onyomi: 'ヘイ (hei)', kunyomi: 'し・める, と・じる (shi-meru, to-jiru)', jlptLevel: 'N4', lessonId: lesson14.id },
    { character: '止', hiragana: 'と・まる / し', romaji: 'to-maru / shi', meaning: 'Berhenti, Menahan', onyomi: 'シ (shi)', kunyomi: 'と・まる, と・める (to-maru, to-meru)', jlptLevel: 'N5', lessonId: lesson14.id },
    { character: '持', hiragana: 'も・つ / じ', romaji: 'mo-tsu / ji', meaning: 'Memegang, Membawa', onyomi: 'ジ (ji)', kunyomi: 'も・つ (mo-tsu)', jlptLevel: 'N5', lessonId: lesson14.id },
    { character: '話', hiragana: 'はな・す / わ', romaji: 'hana-su / wa', meaning: 'Berbicara, Cerita', onyomi: 'ワ (wa)', kunyomi: 'はな・す, はなし (hana-su, hanashi)', jlptLevel: 'N5', lessonId: lesson14.id },
    { character: '降', hiragana: 'ふ・る / おりる / こう', romaji: 'fu-ru / oriru / kou', meaning: 'Turun (hujan/turun kendaraan)', onyomi: 'コウ (kou)', kunyomi: 'ふ・る, お・りる (fu-ru, o-riru)', jlptLevel: 'N4', lessonId: lesson14.id },
  ]

  const existKanji = await prisma.kanji.findMany({ select: { character: true } })
  const existKanjiSet = new Set(existKanji.map((k) => k.character))

  const newKanji = kanji13And14.filter((k) => !existKanjiSet.has(k.character))
  if (newKanji.length > 0) {
    await prisma.kanji.createMany({ data: newKanji })
    console.log(`✅ Kanji Bab 13 & 14 ditambahkan: ${newKanji.length} karakter`)
  }

  console.log('\n🎉 Seed Bab 13 & Bab 14 selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Bab 13 & 14:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
