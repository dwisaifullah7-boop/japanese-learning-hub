import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q')?.trim() || ''

    if (!query) {
      return NextResponse.json({ results: [] })
    }

    // Generate smart Japanese web learning references & search links
    const encodedQuery = encodeURIComponent(`${query} artinya bahasa jepang tata bahasa Minna no Nihongo`)
    const encodedJisho = encodeURIComponent(query)

    const webResults = [
      {
        id: 'web-google',
        title: `Pencarian Google: "${query}" (Bahasa Jepang & Tata Bahasa)`,
        snippet: `Cari artikel tata bahasa, contoh kalimat, dan pembahasan mendalam mengenai "${query}" dari sumber pembelajaran bahasa Jepang terpercaya.`,
        source: 'Google Search',
        url: `https://www.google.com/search?q=${encodedQuery}`,
      },
      {
        id: 'web-jisho',
        title: `Kamus Jisho.org: "${query}"`,
        snippet: `Lihat entri kamus resmi Jisho.org untuk kanji, romaji, arti bahasa Inggris, urutan goresan, dan contoh kalimat dari "${query}".`,
        source: 'Jisho.org Japanese Dictionary',
        url: `https://jisho.org/search/${encodedJisho}`,
      },
      {
        id: 'web-wiktionary',
        title: `Wiktionary Jepang: "${query}"`,
        snippet: `Informasi etimologi, asal-usul kanji, dan ragam bentuk kata dari "${query}".`,
        source: 'Wiktionary Bahasa Indonesia',
        url: `https://id.wiktionary.org/wiki/Special:Search?search=${encodedJisho}`,
      },
    ]

    return NextResponse.json({
      query,
      results: webResults,
    })
  } catch (error) {
    console.error('Web Search Error:', error)
    return NextResponse.json({ message: 'Gagal mencari di web.' }, { status: 500 })
  }
}
