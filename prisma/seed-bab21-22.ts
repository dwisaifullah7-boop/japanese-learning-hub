import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed Bab 21 & Bab 22 Minna no Nihongo (Opini/Kutipan & Modifikasi Kata Benda)...')

  // 1. Dapatkan Course
  let course = await prisma.course.findFirst()
  if (!course) {
    course = await prisma.course.create({
      data: { title: 'Minna no Nihongo 1', description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.' },
    })
  }

  // 2. Buat Lesson Bab 21
  let lesson21 = await prisma.lesson.findFirst({ where: { title: 'Bab 21' } })
  if (!lesson21) {
    lesson21 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 21',
        description: 'Opini & Pemikiran (～と 思います), Kutipan Langsung & Tidak Langsung (～と 言いました), serta Konfirmasi Persetujuan (～でしょう).',
        order: 21,
      },
    })
    console.log('✅ Lesson Bab 21 dibuat:', lesson21.id)
  }

  // 3. Buat Lesson Bab 22
  let lesson22 = await prisma.lesson.findFirst({ where: { title: 'Bab 22' } })
  if (!lesson22) {
    lesson22 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 22',
        description: 'Modifikasi Kata Benda dengan Anak Kalimat (Noun Modification / 連体修飾), Penggunaan Partikel が dalam Anak Kalimat, serta Janji & Urusan (約束 / 用事).',
        order: 22,
      },
    })
    console.log('✅ Lesson Bab 22 dibuat:', lesson22.id)
  }

  // 4. Vocabulary Bab 21 (Opinions, Politics, Society, Quotes)
  const vocab21 = [
    { word: 'おもいます', kanji: '思います', kana: 'おもいます', romaji: 'omoimasu', meaning: 'Mengira / Berpikir / Berpendapat', wordType: 'Verb' },
    { word: 'いいます', kanji: '言います', kana: 'いいます', romaji: 'iimasu', meaning: 'Berkata / Mengatakan', wordType: 'Verb' },
    { word: 'たります', kanji: '足ります', kana: 'たります', romaji: 'tarimasu', meaning: 'Cukup / Mencukupi', wordType: 'Verb' },
    { word: 'かちます', kanji: '勝ちます', kana: 'かちます', romaji: 'kachimasu', meaning: 'Menang', wordType: 'Verb' },
    { word: 'まけます', kanji: '負けます', kana: 'まけます', romaji: 'makemasu', meaning: 'Kalah', wordType: 'Verb' },
    { word: 'あります', kana: 'あります', romaji: 'arimasu', meaning: 'Diadakan (festival/pameran)', wordType: 'Verb' },
    { word: 'やくにたちます', kanji: '役に立ちます', kana: 'やくにたちます', romaji: 'yaku ni tachimasu', meaning: 'Bermanfaat / Berguna', wordType: 'Verb' },
    { word: 'むだ', kanji: '無駄', kana: 'むだ', romaji: 'muda', meaning: 'Sia-sia / Tidak berguna', wordType: 'na-adjective' },
    { word: 'ふべん', kanji: '不便', kana: 'ふべん', romaji: 'fuben', meaning: 'Tidak praktis / Merepotkan', wordType: 'na-adjective' },
    { word: 'おなじ', kanji: '同じ', kana: 'おなじ', romaji: 'onaji', meaning: 'Sama', wordType: 'na-adjective' },
    { word: 'すごい', kana: 'すごい', romaji: 'sugoi', meaning: 'Hebat / Luar biasa', wordType: 'i-adjective' },
    { word: 'しゅしょう', kanji: '首相', kana: 'しゅしょう', romaji: 'shushou', meaning: 'Perdana Menteri', wordType: 'Noun' },
    { word: 'だいとうりょう', kanji: '大統領', kana: 'だいとうりょう', romaji: 'daitouryou', meaning: 'Presiden', wordType: 'Noun' },
    { word: 'せいじ', kanji: '政治', kana: 'せいじ', romaji: 'seiji', meaning: 'Politik', wordType: 'Noun' },
    { word: 'ニュース', kana: 'ニュース', romaji: 'nyuusu', meaning: 'Berita', wordType: 'Noun' },
    { word: 'スピーチ', kana: 'スピーチ', romaji: 'supiichi', meaning: 'Pidato', wordType: 'Noun' },
    { word: 'しあい', kanji: '試合', kana: 'しあい', romaji: 'shiai', meaning: 'Pertandingan / Laga olahraga', wordType: 'Noun' },
    { word: 'アルバイト', kana: 'アルバイト', romaji: 'arubaito', meaning: 'Kerja paruh waktu (part-time)', wordType: 'Noun' },
    { word: 'いけん', kanji: '意見', kana: 'いけん', romaji: 'iken', meaning: 'Pendapat / Opini', wordType: 'Noun' },
    { word: 'はなし', kanji: '話', kana: 'はなし', romaji: 'hanashi', meaning: 'Cerita / Pembicaraan', wordType: 'Noun' },
    { word: 'ユーモア', kana: 'ユーモア', romaji: 'yuumoa', meaning: 'Humor / Lelucon', wordType: 'Noun' },
    { word: 'デザイン', kana: 'デザイン', romaji: 'dezain', meaning: 'Desain / Rancang pola', wordType: 'Noun' },
    { word: 'こうつう', kanji: '交通', kana: 'こうつう', romaji: 'koutsuu', meaning: 'Lalu lintas / Transportasi', wordType: 'Noun' },
    { word: 'ラッシュ', kana: 'ラッシュ', romaji: 'rasshu', meaning: 'Jam sibuk (rush hour)', wordType: 'Noun' },
    { word: 'さいきん', kanji: '最近', kana: 'さいきん', romaji: 'saikin', meaning: 'Akhir-akhir ini / Baru-baru ini', wordType: 'Noun' },
    { word: 'たぶん', kana: 'たぶん', romaji: 'tabun', meaning: 'Mungkin / Barangkali', wordType: 'Adverb' },
    { word: 'きっと', kana: 'きっと', romaji: 'kitto', meaning: 'Pasti / Yakin', wordType: 'Adverb' },
    { word: 'ほんとうに', kana: '本当に', romaji: 'hontou ni', meaning: 'Sungguh-sungguh / Benar-benar', wordType: 'Adverb' },
    { word: 'そんなに', kana: 'そんなに', romaji: 'sonna ni', meaning: 'Tidak begitu... (diikuti negatif)', wordType: 'Adverb' },
    { word: '～について', kana: '～について', romaji: '~ni tsuite', meaning: 'Mengenai / Tentang ~', wordType: 'Particle' },
  ]

  // 5. Vocabulary Bab 22 (Clothing wear verbs, Noun modifiers, Appointments)
  const vocab22 = [
    { word: 'きます', kanji: '着ます', kana: 'きます', romaji: 'kimasu', meaning: 'Mengenakan (baju bagian atas/kemeja/jas)', wordType: 'Verb' },
    { word: 'はきます', kana: 'はきます', romaji: 'hakimasu', meaning: 'Mengenakan (celana/sepatu/rok)', wordType: 'Verb' },
    { word: 'かぶります', kana: 'かぶります', romaji: 'kaburimasu', meaning: 'Mengenakan (topi/penutup kepala)', wordType: 'Verb' },
    { word: 'かけます', kanji: '掛けます', kana: 'かけます', romaji: 'kakemasu', meaning: 'Mengenakan (kacamata)', wordType: 'Verb' },
    { word: 'うまれます', kanji: '生まれます', kana: 'うまれます', romaji: 'umaremasu', meaning: 'Lahir / Dilahirkan', wordType: 'Verb' },
    { word: 'コート', kana: 'コート', romaji: 'kooto', meaning: 'Mantel / Jas panjang', wordType: 'Noun' },
    { word: 'スーツ', kana: 'スーツ', romaji: 'suutsu', meaning: 'Setelan jas formal', wordType: 'Noun' },
    { word: 'セーター', kana: 'セーター', romaji: 'seetaa', meaning: 'Baju hangat (sweater)', wordType: 'Noun' },
    { word: 'ぼうし', kanji: '帽子', kana: 'ぼうし', romaji: 'boushi', meaning: 'Topi', wordType: 'Noun' },
    { word: 'めがね', kanji: '眼鏡', kana: 'めがね', romaji: 'megane', meaning: 'Kacamata', wordType: 'Noun' },
    { word: 'よく', kana: 'よく', romaji: 'yoku', meaning: 'Sering / Dengan baik', wordType: 'Adverb' },
    { word: 'おめでとうございます', kana: 'おめでとうございます', romaji: 'omedetou gozaimasu', meaning: 'Selamat! (Ucapan selamat)', wordType: 'Expression' },
    { word: 'こちら', kana: 'こちら', romaji: 'kochira', meaning: 'Ini (arah/pihak ini)', wordType: 'Pronoun' },
    { word: 'やちん', kanji: '家賃', kana: 'やちん', romaji: 'yachin', meaning: 'Biaya sewa rumah / kontrakan', wordType: 'Noun' },
    { word: 'うーん', kana: 'うーん', romaji: 'uun', meaning: 'Hmm... (berpikir)', wordType: 'Interjection' },
    { word: 'ダイニングキッチン', kana: 'ダイニングキッチン', romaji: 'dainingu kicchin', meaning: 'Dapur sekaligus ruang makan', wordType: 'Noun' },
    { word: 'わしつ', kanji: '和室', kana: 'わしつ', romaji: 'washitsu', meaning: 'Kamar bergaya tradisional Jepang (tatami)', wordType: 'Noun' },
    { word: 'おしいれ', kanji: '押し入れ', kana: 'おしいれ', romaji: 'oshiire', meaning: 'Lemari dinding geser Jepang (futon)', wordType: 'Noun' },
    { word: 'ふとん', kanji: '布団', kana: 'ふとん', romaji: 'futon', meaning: 'Kasur lipat Jepang (futon)', wordType: 'Noun' },
    { word: 'アパート', kana: 'アパート', romaji: 'apaato', meaning: 'Apartemen', wordType: 'Noun' },
    { word: 'パリ', kana: 'パリ', romaji: 'pari', meaning: 'Paris (ibu kota Prancis)', wordType: 'Noun' },
    { word: 'ばんりのおうちょう', kanji: '万里の長城', kana: 'ばんりのちょうじょう', romaji: 'banri no choujou', meaning: 'Tembok Besar Tiongkok', wordType: 'Noun' },
    { word: 'よてい', kanji: '予定', kana: 'よてい', romaji: 'yotei', meaning: 'Rencana / Agenda kegiatan', wordType: 'Noun' },
    { word: 'やくそく', kanji: '約束', kana: 'やくそく', romaji: 'yakusoku', meaning: 'Janji / Janji temu', wordType: 'Noun' },
    { word: 'ようじ', kanji: '用事', kana: 'ようじ', romaji: 'youji', meaning: 'Urusan yang harus dikerjakan', wordType: 'Noun' },
  ]

  const existVocab = await prisma.vocabulary.findMany({ select: { word: true } })
  const existVocabSet = new Set(existVocab.map((v) => v.word))

  const newVocab21 = vocab21.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson21.id }))
  if (newVocab21.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab21 })
    console.log(`✅ Vocab Bab 21 ditambahkan: ${newVocab21.length}`)
  }

  const newVocab22 = vocab22.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson22.id }))
  if (newVocab22.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab22 })
    console.log(`✅ Vocab Bab 22 ditambahkan: ${newVocab22.length}`)
  }

  // 6. Grammar Bab 21 (Opini, Kutipan, Deshou)
  const grammar21 = [
    {
      pattern: '[Bentuk Biasa / Futsūkei] と 思います',
      meaning: 'Saya mengira / Saya berpendapat bahwa...',
      usage: 'Menyampaikan asumsi, dugaan, atau opini pribadi pembicara. Kalimat sebelum partikel と harus dalam bentuk biasa (Futsūkei).',
      example: '明日は 雨が 降ると 思います。日本は 物価が 高いと 思います。',
      translation: 'Saya rasa besok akan turun hujan. Menurut saya barang-barang di Jepang mahal.',
      note: 'Untuk menyatakan tidak sependapat: ...とは思いません.',
      lessonId: lesson21.id,
    },
    {
      pattern: '[Kalimat Langsung " "] / [Bentuk Biasa] と 言いました',
      meaning: 'Mengatakan bahwa...',
      usage: 'Kutipan langsung menggunakan tanda petik 「...」, kutipan tidak langsung mengubah kalimat ke bentuk biasa diikuti と 言いました.',
      example: '田中さんは 「明日 休みます」と 言いました。田中さんは 明日 休むと 言いました。',
      translation: 'Sdr. Tanaka berkata "Besok saya libur". / Sdr. Tanaka berkata bahwa besok dia libur.',
      note: 'Gunakan saat melaporkan perkataan pihak ketiga.',
      lessonId: lesson21.id,
    },
    {
      pattern: '[Bentuk Biasa] でしょう？',
      meaning: 'Bukankah begitu? / Kan?',
      usage: 'Meminta persetujuan atau konfirmasi dari lawan bicara mengenai suatu hal yang diyakini sama-sama diketahui.',
      example: '明日の パーティーに 行くでしょう？ …ええ、行きます。北海道は 寒かったでしょう？',
      translation: 'Besok kamu pergi ke pesta kan? ...Iya, pergi. Hokkaido kemarin dingin kan?',
      note: 'Diucapkan dengan intonasi naik di akhir kalimat.',
      lessonId: lesson21.id,
    },
    {
      pattern: '[Topik] について どう 思いますか',
      meaning: 'Bagaimana pendapat Anda tentang [Topik]?',
      usage: 'Menanyakan pandangan atau opini orang lain.',
      example: '日本の 政治について どう 思いますか。',
      translation: 'Bagaimana pendapat Anda mengenai perpolitikan Jepang?',
      note: 'Partikel について berarti "tentang / mengenai".',
      lessonId: lesson21.id,
    },
  ]

  // 7. Grammar Bab 22 (Modifikasi Kata Benda)
  const grammar22 = [
    {
      pattern: '[Anak Kalimat Bentuk Biasa] + Kata Benda',
      meaning: 'Kata Benda yang [Dilakukan / Karakteristik]',
      usage: 'Bahasa Jepang meletakkan klausa penjelas di DEPAN kata benda yang dijelaskan. Seluruh kata kerja dalam anak kalimat harus berupa Bentuk Biasa (Futsūkei).',
      example: 'これは ミラーさんが 住んでいる 家です。昨日 買った 本は 面白かったです。',
      translation: 'Ini adalah rumah tempat tinggal Sdr. Miller. Buku yang kemarin saya beli sangat menarik.',
      note: 'Pilar terpenting sintaksis bahasa Jepang tingkat lanjut.',
      lessonId: lesson22.id,
    },
    {
      pattern: 'Subjek Anak Kalimat menggunakan Partikel が',
      meaning: 'Penanda pelaku dalam klausa pemodifikasi',
      usage: 'Di dalam anak kalimat pemodifikasi kata benda, subjek pelaku ditandai partikel が (bukan は).',
      example: 'わたしが 作った 料理を 食べて ください。',
      translation: 'Silakan makan masakan yang saya buat.',
      note: 'Partikel は hanya digunakan untuk topik utama kalimat induk.',
      lessonId: lesson22.id,
    },
    {
      pattern: '[KK Bentuk Kamus] 時間 / 約束 / 用事 が あります',
      meaning: 'Ada waktu / janji / urusan untuk [Melakukan hal]',
      usage: 'Menggunakan modifikasi kata benda bentuk kamus di depan kata benda abstrak waktu, janji, atau urusan.',
      example: '今日は 友達と 会う 約束が あります。本を 読む 時間が ありません。',
      translation: 'Hari ini saya ada janji bertemu teman. Tidak ada waktu untuk membaca buku.',
      note: 'Struktur yang sangat umum dalam komunikasi sosial sehari-hari.',
      lessonId: lesson22.id,
    },
  ]

  const existGrammar = await prisma.grammar.findMany({ select: { pattern: true } })
  const existGrammarSet = new Set(existGrammar.map((g) => g.pattern))

  const newGrammar21 = grammar21.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar21.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar21 })
    console.log(`✅ Grammar Bab 21 ditambahkan: ${newGrammar21.length}`)
  }

  const newGrammar22 = grammar22.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar22.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar22 })
    console.log(`✅ Grammar Bab 22 ditambahkan: ${newGrammar22.length}`)
  }

  // 8. Kanji Bab 21 & 22
  const kanji21And22 = [
    // Bab 21 (6 Kanji)
    { character: '思', hiragana: 'おも・う / し', romaji: 'omo-u / shi', meaning: 'Berpikir, Mengira, Rindu', onyomi: 'シ (shi)', kunyomi: 'おも・う (omo-u)', jlptLevel: 'N4', lessonId: lesson21.id },
    { character: '言', hiragana: 'い・う / げん / ごん', romaji: 'i-u / gen / gon', meaning: 'Berkata, Perkataan', onyomi: 'ゲン, ゴン (gen, gon)', kunyomi: 'い・う, こと (i-u, koto)', jlptLevel: 'N5', lessonId: lesson21.id },
    { character: '勝', hiragana: 'か・つ / しょう', romaji: 'ka-tsu / shou', meaning: 'Menang, Unggul', onyomi: 'ショウ (shou)', kunyomi: 'か・つ, まさ・る (ka-tsu, masa-ru)', jlptLevel: 'N4', lessonId: lesson21.id },
    { character: '負', hiragana: 'ま・ける / ふ', romaji: 'ma-keru / fu', meaning: 'Kalah, Memikul, Minus', onyomi: 'フ (fu)', kunyomi: 'ま・ける, ま・かす, お・う (ma-keru, ma-kasu, o-u)', jlptLevel: 'N4', lessonId: lesson21.id },
    { character: '政', hiragana: 'まつりごと / せい / しょう', romaji: 'seiji / sei', meaning: 'Politik, Pemerintahan', onyomi: 'セイ, ショウ (sei, shou)', kunyomi: 'まつりごと (matsurigoto)', jlptLevel: 'N3', lessonId: lesson21.id },
    { character: '治', hiragana: 'おさ・める / なお・る / じ / ち', romaji: 'osa-meru / ji / chi', meaning: 'Menyembuhkan, Memerintah, Damai', onyomi: 'ジ, チ (ji, chi)', kunyomi: 'おさ・める, なお・る (osa-meru, nao-ru)', jlptLevel: 'N3', lessonId: lesson21.id },

    // Bab 22 (8 Kanji)
    { character: '着', hiragana: 'き・る / つ・く / ちゃく', romaji: 'ki-ru / tsu-ku / chaku', meaning: 'Mengenakan (baju), Tiba / Sampai', onyomi: 'チャク, ジャク (chaku, jaku)', kunyomi: 'き・る, つ・く (ki-ru, tsu-ku)', jlptLevel: 'N5', lessonId: lesson22.id },
    { character: '掛', hiragana: 'か・ける / か・かる', romaji: 'ka-keru / ka-karu', meaning: 'Menggantungkan, Mengenakan (kacamata)', onyomi: 'カイ, ケ (kai, ke)', kunyomi: 'か・ける, か・かる (ka-keru, ka-karu)', jlptLevel: 'N3', lessonId: lesson22.id },
    { character: '帽', hiragana: 'ぼう', romaji: 'bou', meaning: 'Topi', onyomi: 'ボウ (bou)', kunyomi: 'ずきん (zukin)', jlptLevel: 'N3', lessonId: lesson22.id },
    { character: '約', hiragana: 'やく', romaji: 'yaku', meaning: 'Janji, Kira-kira, Memperpendek', onyomi: 'ヤク (yaku)', kunyomi: '-', jlptLevel: 'N4', lessonId: lesson22.id },
    { character: '束', hiragana: 'たば / そく', romaji: 'taba / soku', meaning: 'Mengikat, Ikat, Bundel', onyomi: 'ソク (soku)', kunyomi: 'たば, つか (taba, tsuka)', jlptLevel: 'N3', lessonId: lesson22.id },
    { character: '定', hiragana: 'さだ・める / てい / じょう', romaji: 'sada-meru / tei', meaning: 'Menentukan, Tetap', onyomi: 'テイ, ジョウ (tei, jou)', kunyomi: 'さだ・める, さだ・まる (sada-meru, sada-maru)', jlptLevel: 'N4', lessonId: lesson22.id },
    { character: '賃', hiragana: 'ちん', romaji: 'chin', meaning: 'Sewa, Ongkos, Upah', onyomi: 'チン (chin)', kunyomi: '-', jlptLevel: 'N3', lessonId: lesson22.id },
    { character: '室', hiragana: 'むろ / しつ', romaji: 'shitsu / muro', meaning: 'Ruangan, Kamar', onyomi: 'シツ (shitsu)', kunyomi: 'むろ (muro)', jlptLevel: 'N4', lessonId: lesson22.id },
  ]

  const existKanji = await prisma.kanji.findMany({ select: { character: true } })
  const existKanjiSet = new Set(existKanji.map((k) => k.character))

  const newKanji = kanji21And22.filter((k) => !existKanjiSet.has(k.character))
  if (newKanji.length > 0) {
    await prisma.kanji.createMany({ data: newKanji })
    console.log(`✅ Kanji Bab 21 & 22 ditambahkan: ${newKanji.length} karakter`)
  }

  console.log('\n🎉 Seed Bab 21 & Bab 22 selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Bab 21 & 22:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
