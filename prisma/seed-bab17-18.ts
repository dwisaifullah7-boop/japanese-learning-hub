import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Memulai seed Bab 17 & Bab 18 Minna no Nihongo (Bentuk Nai & Bentuk Kamus)...')

  // 1. Dapatkan Course
  let course = await prisma.course.findFirst()
  if (!course) {
    course = await prisma.course.create({
      data: { title: 'Minna no Nihongo 1', description: 'Buku pelajaran bahasa Jepang dasar untuk pemula.' },
    })
  }

  // 2. Buat Lesson Bab 17
  let lesson17 = await prisma.lesson.findFirst({ where: { title: 'Bab 17' } })
  if (!lesson17) {
    lesson17 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 17',
        description: 'Kata Kerja Bentuk-Nai (ない形), Permohonan Negatif (～ないでください), Keharusan (～なければなりません), dan Tidak Perlu (～なくてもいいです).',
        order: 17,
      },
    })
    console.log('✅ Lesson Bab 17 dibuat:', lesson17.id)
  }

  // 3. Buat Lesson Bab 18
  let lesson18 = await prisma.lesson.findFirst({ where: { title: 'Bab 18' } })
  if (!lesson18) {
    lesson18 = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'Bab 18',
        description: 'Kata Kerja Bentuk Kamus (辞書形 / Jisho-kei), Kemampuan (～ことが できます), Hobi (しゅみは ～ことです), dan Sebelum (～まえに).',
        order: 18,
      },
    })
    console.log('✅ Lesson Bab 18 dibuat:', lesson18.id)
  }

  // 4. Vocabulary Bab 17 (Nai-form, Health, Obligations, Deadlines)
  const vocab17 = [
    { word: 'おぼえます', kanji: '覚えます', kana: 'おぼえます', romaji: 'oboemasu', meaning: 'Mengingat / Menghafal', wordType: 'Verb' },
    { word: 'わすれます', kanji: '忘れます', kana: 'わすれます', romaji: 'wasuremasu', meaning: 'Lupa', wordType: 'Verb' },
    { word: 'なくします', kanji: '無くします', kana: 'なくします', romaji: 'nakushimasu', meaning: 'Menghilangkan (barang)', wordType: 'Verb' },
    { word: 'はらいます', kanji: '払います', kana: 'はらいます', romaji: 'haraimasu', meaning: 'Membayar', wordType: 'Verb' },
    { word: 'かえします', kanji: '返します', kana: 'かえします', romaji: 'kaeshimasu', meaning: 'Mengembalikan (uang/buku)', wordType: 'Verb' },
    { word: 'でかけます', kanji: '出かけます', kana: 'でかけます', romaji: 'dekakemasu', meaning: 'Pergi keluar / Bepergian', wordType: 'Verb' },
    { word: 'ぬぎます', kanji: '脱ぎます', kana: 'ぬぎます', romaji: 'nugimasu', meaning: 'Melepas (sepatu/pakaian)', wordType: 'Verb' },
    { word: 'もっていきます', kanji: '持って行きます', kana: 'もっていきます', romaji: 'motte ikimasu', meaning: 'Membawa pergi (barang)', wordType: 'Verb' },
    { word: 'もってきます', kanji: '持って来ます', kana: 'もってきます', romaji: 'motte kimasu', meaning: 'Membawa datang ke mari', wordType: 'Verb' },
    { word: 'しんぱいします', kanji: '心配します', kana: 'しんぱいします', romaji: 'shinpaishimasu', meaning: 'Khawatir / Cemas', wordType: 'Verb' },
    { word: 'ざんぎょうします', kanji: '残業します', kana: 'ざんぎょうします', romaji: 'zangyoushimasu', meaning: 'Lembur bekerja', wordType: 'Verb' },
    { word: 'しゅっちょうします', kanji: '出張します', kana: 'しゅっちょうします', romaji: 'shucchoushimasu', meaning: 'Dinas luar kota/kantor', wordType: 'Verb' },
    { word: 'くすり', kanji: '薬', kana: 'くすり', romaji: 'kusuri', meaning: 'Obat', wordType: 'Noun' },
    { word: 'ほけんしょう', kanji: '保険証', kana: 'ほけんしょう', romaji: 'hokenshou', meaning: 'Kartu asuransi kesehatan', wordType: 'Noun' },
    { word: 'ねつ', kanji: '熱', kana: 'ねつ', romaji: 'netsu', meaning: 'Demam / Panas tubuh', wordType: 'Noun' },
    { word: 'びょうき', kanji: '病気', kana: 'びょうき', romaji: 'byouki', meaning: 'Sakit / Penyakit', wordType: 'Noun' },
    { word: 'うわぎ', kanji: '上着', kana: 'うわぎ', romaji: 'uwagi', meaning: 'Jaket / Baju luaran', wordType: 'Noun' },
    { word: 'したぎ', kanji: '下着', kana: 'したぎ', romaji: 'shitagi', meaning: 'Pakaian dalam', wordType: 'Noun' },
    { word: 'たいせつ', kanji: '大切', kana: 'たいせつ', romaji: 'taisetsu', meaning: 'Penting / Berharga', wordType: 'na-adjective' },
    { word: 'だいじょうぶ', kanji: '大丈夫', kana: 'だいじょうぶ', romaji: 'daijoubu', meaning: 'Tidak apa-apa / Aman', wordType: 'na-adjective' },
    { word: 'あぶない', kanji: '危ない', kana: 'あぶない', romaji: 'abunai', meaning: 'Bahaya', wordType: 'i-adjective' },
    { word: 'までに', kana: 'までに', romaji: 'madeni', meaning: 'Paling lambat sebelum / Menjelang', wordType: 'Particle' },
    { word: 'ですから', kana: 'ですから', romaji: 'desukara', meaning: 'Oleh karena itu / Makanya', wordType: 'Conjunction' },
  ]

  // 5. Vocabulary Bab 18 (Dictionary form, Abilities, Hobbies, Actions)
  const vocab18 = [
    { word: 'できます', kana: 'できます', romaji: 'dekimasu', meaning: 'Bisa / Mampu melakukan', wordType: 'Verb' },
    { word: 'あらいます', kanji: '洗います', kana: 'あらいます', romaji: 'araimasu', meaning: 'Mencuci (tangan/baju)', wordType: 'Verb' },
    { word: 'ひきます', kanji: '弾きます', kana: 'ひきます', romaji: 'hikimasu', meaning: 'Memainkan (alat musik petik/piano)', wordType: 'Verb' },
    { word: 'うたいます', kanji: '歌います', kana: 'うたいます', romaji: 'utaimasu', meaning: 'Menyanyi', wordType: 'Verb' },
    { word: 'あつめます', kanji: '集めます', kana: 'あつめます', romaji: 'atsumemasu', meaning: 'Mengumpulkan / Mengoleksi', wordType: 'Verb' },
    { word: 'すてます', kanji: '捨てます', kana: 'すてます', romaji: 'sutemasu', meaning: 'Membuang (sampah)', wordType: 'Verb' },
    { word: 'かえます', kanji: '換えます', kana: 'かえます', romaji: 'kaemasu', meaning: 'Menukar (uang/mata uang)', wordType: 'Verb' },
    { word: 'うんてんします', kanji: '運転します', kana: 'うんてんします', romaji: 'untenshimasu', meaning: 'Mengemudi / Menyetir', wordType: 'Verb' },
    { word: 'よやくします', kanji: '予約します', kana: 'よやくします', romaji: 'yoyakushimasu', meaning: 'Memesan / Reservasi', wordType: 'Verb' },
    { word: 'ピアノ', kana: 'ピアノ', romaji: 'piano', meaning: 'Piano', wordType: 'Noun' },
    { word: 'メートル', kana: 'メートル', romaji: 'meetoru', meaning: 'Meter (jarak)', wordType: 'Noun' },
    { word: 'げんきん', kanji: '現金', kana: 'げんきん', romaji: 'genkin', meaning: 'Uang tunai (cash)', wordType: 'Noun' },
    { word: 'しゅみ', kanji: '趣味', kana: 'しゅみ', romaji: 'shumi', meaning: 'Hobi / Kegemaran', wordType: 'Noun' },
    { word: 'にっき', kanji: '日記', kana: 'にっき', romaji: 'nikki', meaning: 'Buku harian (diary)', wordType: 'Noun' },
    { word: 'おいのり', kanji: 'お祈り', kana: 'おいのり', romaji: 'oinori', meaning: 'Doa / Sembahyang', wordType: 'Noun' },
    { word: 'かちょう', kanji: '課長', kana: 'かちょう', romaji: 'kachou', meaning: 'Kepala seksi / Manajer divisi', wordType: 'Noun' },
    { word: 'ぶちょう', kanji: '部長', kana: 'ぶちょう', romaji: 'buchou', meaning: 'Kepala bagian / Direktur', wordType: 'Noun' },
    { word: 'しゃちょう', kanji: '社長', kana: 'しゃちょう', romaji: 'shachou', meaning: 'Presiden direktur perusahaan', wordType: 'Noun' },
    { word: 'どうぶつ', kanji: '動物', kana: 'どうぶつ', romaji: 'doubutsu', meaning: 'Hewan / Binatang', wordType: 'Noun' },
    { word: 'うま', kanji: '馬', kana: 'うま', romaji: 'uma', meaning: 'Kuda', wordType: 'Noun' },
    { word: 'インターネット', kana: 'インターネット', romaji: 'intaanetto', meaning: 'Internet', wordType: 'Noun' },
    { word: 'とくに', kanji: '特に', kana: 'とくに', romaji: 'tokuni', meaning: 'Khususnya / Terutama', wordType: 'Adverb' },
    { word: 'なかなか', kana: 'なかなか', romaji: 'nakanaka', meaning: 'Sangat jarang / Tidak mudah (diikuti negatif)', wordType: 'Adverb' },
    { word: 'ほんとうですか', kana: 'ほんとうですか', romaji: 'hontou desu ka', meaning: 'Benarkah demikian?', wordType: 'Expression' },
    { word: 'ぜひ', kana: 'ぜひ', romaji: 'zehi', meaning: 'Pasti / Sangat ingin sekali', wordType: 'Adverb' },
  ]

  const existVocab = await prisma.vocabulary.findMany({ select: { word: true } })
  const existVocabSet = new Set(existVocab.map((v) => v.word))

  const newVocab17 = vocab17.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson17.id }))
  if (newVocab17.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab17 })
    console.log(`✅ Vocab Bab 17 ditambahkan: ${newVocab17.length}`)
  }

  const newVocab18 = vocab18.filter((v) => !existVocabSet.has(v.word)).map((v) => ({ ...v, lessonId: lesson18.id }))
  if (newVocab18.length > 0) {
    await prisma.vocabulary.createMany({ data: newVocab18 })
    console.log(`✅ Vocab Bab 18 ditambahkan: ${newVocab18.length}`)
  }

  // 6. Grammar Bab 17 (Bentuk Nai, Permohonan Jangan, Keharusan, Tidak Perlu)
  const grammar17 = [
    {
      pattern: 'Kata Kerja Bentuk-Nai (ない形) Konjugasi',
      meaning: 'Bentuk dasar negatif informal untuk kata kerja',
      usage: 'Grup 1: Baris vokal "i" diubah ke "a" + ない (contoh: kakimasu -> kakanai). Khusus vokal "i" jadi "wa" (kaimasu -> kawanai). Grup 2: Buang ます + ない (tabemasu -> tabenai). Grup 3: します -> しない, 来ます -> こない.',
      example: 'かかない (kakimasu), のまない (nomimasu), たべない (tabemasu), こない (kimasu).',
      translation: 'Tidak menulis, tidak minum, tidak makan, tidak datang.',
      note: 'Perhatikan kata kerja あります bentuk negatifnya adalah ない (bukan aranai).',
      lessonId: lesson17.id,
    },
    {
      pattern: 'Kata Kerja ない + で ください',
      meaning: 'Tolong jangan [Lakukan tindakan]',
      usage: 'Meminta orang lain secara sopan untuk tidak melakukan suatu hal.',
      example: 'ここで しゃしんを とらないで ください。',
      translation: 'Tolong jangan mengambil foto di sini.',
      note: 'Lawan dari ～てください (tolong lakukan).',
      lessonId: lesson17.id,
    },
    {
      pattern: 'Kata Kerja なければ なりません',
      meaning: 'Harus / Wajib [Lakukan tindakan]',
      usage: 'Menyatakan kewajiban atau keharusan mutlak. Rumus: Bentuk-Nai, buang い, lalu ganti なければ なりません.',
      example: 'くすりを のまなければ なりません。パスポートを みせなければ なりません。',
      translation: 'Saya harus minum obat. Harus memperlihatkan paspor.',
      note: 'Bentuk kasual sehari-hari: ～なきゃ / ～なくちゃ.',
      lessonId: lesson17.id,
    },
    {
      pattern: 'Kata Kerja なくても いいです',
      meaning: 'Tidak perlu / Tidak usah / Boleh tidak [Lakukan tindakan]',
      usage: 'Menyatakan bahwa suatu tindakan tidak wajib dilakukan. Rumus: Bentuk-Nai, buang い, lalu ganti なくても いいです.',
      example: 'あしたは こなくても いいです。くつを ぬがなくても いいです。',
      translation: 'Besok tidak usah datang juga tidak apa-apa. Boleh tidak melepas sepatu.',
      note: 'Lawan dari ～なければなりません (harus).',
      lessonId: lesson17.id,
    },
  ]

  // 7. Grammar Bab 18 (Bentuk Kamus, Dekiru, Shumi, Mae ni)
  const grammar18 = [
    {
      pattern: 'Kata Kerja Bentuk Kamus (辞書形 - Jisho-kei)',
      meaning: 'Bentuk kamus / bentuk dasar kata kerja bahasa Jepang',
      usage: 'Grup 1: Baris vokal "i" diubah ke baris vokal "u" (kaku, nomu, toru, iku). Grup 2: Buang ます + る (taberu, miru, neru). Grup 3: します -> する, 来ます -> くる.',
      example: 'かく (kaku), のむ (nomu), たべる (taberu), する (suru), くる (kuru).',
      translation: 'Menulis, minum, makan, melakukan, datang.',
      note: 'Bentuk yang tercantum di kamus bahasa Jepang asli.',
      lessonId: lesson18.id,
    },
    {
      pattern: 'Kata Benda / [KK Bentuk Kamus + こと] が できます',
      meaning: 'Bisa / Mampu melakukan [Hal/Keterampilan]',
      usage: 'Menyatakan kapasitas, potensi, atau izin kemampuan melakukan sesuatu. "こと" menominakan kata kerja.',
      example: 'ミラーさんは にほんごが できます。ピアノを ひくことが できます。',
      translation: 'Sdr. Miller bisa bahasa Jepang. Bisa bermain piano.',
      note: 'Menanyakan kemampuan: カードで はらうことが できますか。',
      lessonId: lesson18.id,
    },
    {
      pattern: 'わたしの 趣味は [KK Bentuk Kamus + こと] です',
      meaning: 'Hobi saya adalah [Melakukan kegiatan]',
      usage: 'Menyatakan hobi dalam bentuk aktivitas perbuatan (bukan sekadar kata benda).',
      example: 'わたしの しゅみは えいがを みることです。ふるい きってを あつめることです。',
      translation: 'Hobi saya adalah menonton film. Mengoleksi prangko kuno.',
      note: 'Jika hobi adalah kata benda tunggal langsung: わたしの しゅみは スポーツです.',
      lessonId: lesson18.id,
    },
    {
      pattern: '[KK Bentuk Kamus / Kata Benda の / Waktu] まえに、[Kalimat]',
      meaning: 'Sebelum [Aksi / Peristiwa], melakukan [Hal]',
      usage: 'Menyatakan urutan waktu: Aksi kedua dilakukan terlebih dahulu sebelum hal utama dimulai.',
      example: 'ねる まえに、ほんを よみます。しょくじの まえに、てを あらいます。',
      translation: 'Sebelum tidur, saya membaca buku. Sebelum makan, mencuci tangan.',
      note: 'KK sebelum まえに selalu bentuk kamus (tidak boleh bentuk lampau).',
      lessonId: lesson18.id,
    },
  ]

  const existGrammar = await prisma.grammar.findMany({ select: { pattern: true } })
  const existGrammarSet = new Set(existGrammar.map((g) => g.pattern))

  const newGrammar17 = grammar17.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar17.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar17 })
    console.log(`✅ Grammar Bab 17 ditambahkan: ${newGrammar17.length}`)
  }

  const newGrammar18 = grammar18.filter((g) => !existGrammarSet.has(g.pattern))
  if (newGrammar18.length > 0) {
    await prisma.grammar.createMany({ data: newGrammar18 })
    console.log(`✅ Grammar Bab 18 ditambahkan: ${newGrammar18.length}`)
  }

  // 8. Kanji Bab 17 & 18
  const kanji17And18 = [
    // Bab 17 (6 Kanji)
    { character: '覚', hiragana: 'おぼ・える / かく', romaji: 'obo-eru / kaku', meaning: 'Mengingat, Sadar, Bangun', onyomi: 'カク (kaku)', kunyomi: 'おぼ・える, さ・ます (obo-eru, sa-masu)', jlptLevel: 'N4', lessonId: lesson17.id },
    { character: '忘', hiragana: 'わす・れる / ぼう', romaji: 'wasu-reru / bou', meaning: 'Lupa', onyomi: 'ボウ (bou)', kunyomi: 'わす・れる (wasu-reru)', jlptLevel: 'N4', lessonId: lesson17.id },
    { character: '払', hiragana: 'はら・う / ふつ', romaji: 'hara-u / futsu', meaning: 'Membayar, Menyapu', onyomi: 'ヒツ, フツ (hitsu, futsu)', kunyomi: 'はら・う (hara-u)', jlptLevel: 'N4', lessonId: lesson17.id },
    { character: '返', hiragana: 'かえ・す / へん', romaji: 'kae-su / hen', meaning: 'Mengembalikan, Membalas', onyomi: 'ヘン (hen)', kunyomi: 'かえ・す, かえ・る (kae-su, kae-ru)', jlptLevel: 'N4', lessonId: lesson17.id },
    { character: '薬', hiragana: 'くすり / やく', romaji: 'kusuri / yaku', meaning: 'Obat, Kimia', onyomi: 'ヤク (yaku)', kunyomi: 'くすり (kusuri)', jlptLevel: 'N4', lessonId: lesson17.id },
    { character: '危', hiragana: 'あぶ・ない / き', romaji: 'abu-nai / ki', meaning: 'Bahaya, Kritis', onyomi: 'キ (ki)', kunyomi: 'あぶ・ない, あや・うい (abu-nai, aya-ui)', jlptLevel: 'N4', lessonId: lesson17.id },

    // Bab 18 (8 Kanji)
    { character: '洗', hiragana: 'あら・う / せん', romaji: 'ara-u / sen', meaning: 'Mencuci', onyomi: 'セン (sen)', kunyomi: 'あら・う (ara-u)', jlptLevel: 'N4', lessonId: lesson18.id },
    { character: '弾', hiragana: 'ひ・く / だん', romaji: 'hi-ku / dan', meaning: 'Memainkan (alat musik), Peluru', onyomi: 'ダン (dan)', kunyomi: 'ひ・く, たま (hi-ku, tama)', jlptLevel: 'N3', lessonId: lesson18.id },
    { character: '集', hiragana: 'あつ・める / しゅう', romaji: 'atsu-meru / shuu', meaning: 'Mengumpulkan, Berkumpul', onyomi: 'シュウ (shuu)', kunyomi: 'あつ・める, あつ・まる (atsu-meru, atsu-maru)', jlptLevel: 'N4', lessonId: lesson18.id },
    { character: '捨', hiragana: 'す・てる / しゃ', romaji: 'su-teru / sha', meaning: 'Membuang', onyomi: 'シャ (sha)', kunyomi: 'す・てる (su-teru)', jlptLevel: 'N3', lessonId: lesson18.id },
    { character: '換', hiragana: 'か・える / かん', romaji: 'ka-eru / kan', meaning: 'Menukar, Mengganti', onyomi: 'カン (kan)', kunyomi: 'か・える, か・わる (ka-eru, ka-waru)', jlptLevel: 'N3', lessonId: lesson18.id },
    { character: '運', hiragana: 'はこ・ぶ / うん', romaji: 'hako-bu / un', meaning: 'Membawa, Mengemudi, Nasib', onyomi: 'ウン (un)', kunyomi: 'はこ・ぶ (hako-bu)', jlptLevel: 'N4', lessonId: lesson18.id },
    { character: '転', hiragana: 'ころ・がる / てん', romaji: 'koro-garu / ten', meaning: 'Berguling, Berputar', onyomi: 'テン (ten)', kunyomi: 'ころ・がる, ころ・ぶ (koro-garu, koro-bu)', jlptLevel: 'N4', lessonId: lesson18.id },
    { character: '借', hiragana: 'か・りる / しゃく', romaji: 'ka-riru / shaku', meaning: 'Meminjam', onyomi: 'シャク (shaku)', kunyomi: 'か・りる (ka-riru)', jlptLevel: 'N4', lessonId: lesson18.id },
  ]

  const existKanji = await prisma.kanji.findMany({ select: { character: true } })
  const existKanjiSet = new Set(existKanji.map((k) => k.character))

  const newKanji = kanji17And18.filter((k) => !existKanjiSet.has(k.character))
  if (newKanji.length > 0) {
    await prisma.kanji.createMany({ data: newKanji })
    console.log(`✅ Kanji Bab 17 & 18 ditambahkan: ${newKanji.length} karakter`)
  }

  console.log('\n🎉 Seed Bab 17 & Bab 18 selesai dengan sukses!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding Bab 17 & 18:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
