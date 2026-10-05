'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/shared/PageHeader'
import { AudioButton } from '@/components/shared/AudioButton'
import { useAudio } from '@/components/providers/AudioProvider'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { Button } from '@/components/ui/button'
import { Search, Globe, X, BookMarked, FileText, Sparkles, GraduationCap, Languages, ExternalLink, ArrowRight } from 'lucide-react'

interface LocalResultItem {
  id: string
  type: 'vocabulary' | 'kanji' | 'particle' | 'grammar' | 'hiragana' | 'katakana'
  title: string
  japanese: string
  romaji: string
  meaning: string
  details?: string
  example?: string
  audioText: string
  href: string
}

interface WebResultItem {
  id: string
  title: string
  snippet: string
  source: string
  url: string
}

const CATEGORIES = [
  { id: 'all', label: 'Semua', icon: Search },
  { id: 'vocabulary', label: 'Kosakata', icon: BookMarked },
  { id: 'kanji', label: 'Kanji', icon: FileText },
  { id: 'particle', label: 'Partikel', icon: Sparkles },
  { id: 'grammar', label: 'Grammar', icon: GraduationCap },
  { id: 'kana', label: 'Kana', icon: Languages },
  { id: 'web', label: 'Pencarian Web 🌐', icon: Globe },
]

const QUICK_SEARCHES = ['たべます', '私', 'は', '日', 'あ', 'minna']

const TYPE_CONFIG: Record<string, { label: string; badge: string }> = {
  vocabulary: { label: 'Vocabulary', badge: 'bg-blue-100 text-blue-800 border-blue-200' },
  kanji: { label: 'Kanji', badge: 'bg-red-100 text-red-800 border-red-200' },
  particle: { label: 'Particle', badge: 'bg-amber-100 text-amber-800 border-amber-200' },
  grammar: { label: 'Grammar', badge: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  hiragana: { label: 'Hiragana', badge: 'bg-purple-100 text-purple-800 border-purple-200' },
  katakana: { label: 'Katakana', badge: 'bg-pink-100 text-pink-800 border-pink-200' },
}

export function SearchClient() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [localResults, setLocalResults] = useState<LocalResultItem[]>([])
  const [webResults, setWebResults] = useState<WebResultItem[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const { playAudio } = useAudio()

  const performSearch = useCallback(async (q: string, cat: string) => {
    if (!q.trim()) {
      setLocalResults([])
      setWebResults([])
      setSearched(false)
      return
    }

    setLoading(true)
    setSearched(true)

    try {
      if (cat === 'web') {
        const res = await fetch(`/api/search/web?q=${encodeURIComponent(q)}`)
        const data = await res.json()
        setWebResults(data.results || [])
        setLocalResults([])
      } else {
        const [localRes, webRes] = await Promise.all([
          fetch(`/api/search?q=${encodeURIComponent(q)}&category=${cat}`),
          fetch(`/api/search/web?q=${encodeURIComponent(q)}`),
        ])

        const localData = await localRes.json()
        const webData = await webRes.json()

        setLocalResults(localData.results || [])
        setWebResults(webData.results || [])
      }
    } catch (err) {
      console.error('Search request error:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Search trigger on category change if query exists
  useEffect(() => {
    if (query.trim()) {
      performSearch(query, activeCategory)
    }
  }, [activeCategory])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query, activeCategory)
  }

  const handleQuickClick = (term: string) => {
    setQuery(term)
    performSearch(term, activeCategory)
  }

  const clearSearch = () => {
    setQuery('')
    setLocalResults([])
    setWebResults([])
    setSearched(false)
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Search Engine"
        description="Cari Kanji, Kana, Kosakata, Partikel, & Grammar di database lokal atau web eksternal."
        icon={<Search className="w-8 h-8" />}
      />

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto">
        <div className="relative flex items-center">
          <Search className="w-6 h-6 text-gray-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Ketik kanji, kana, romaji, atau arti bahasa Indonesia... (misal: 私, a, makan, は)"
            className="w-full pl-13 pr-24 py-4 text-base sm:text-lg border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-blue-600 transition-colors bg-white"
            autoFocus
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-16 p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <Button
            type="submit"
            size="default"
            className="absolute right-2.5 rounded-xl px-4 py-2 font-medium"
          >
            Cari
          </Button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-gray-500">
          <span className="font-semibold text-gray-700">Pencarian Populer:</span>
          {QUICK_SEARCHES.map(term => (
            <button
              key={term}
              type="button"
              onClick={() => handleQuickClick(term)}
              className="px-2.5 py-1 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors font-japanese"
            >
              {term}
            </button>
          ))}
        </div>
      </form>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center border-b border-gray-200 pb-4">
        {CATEGORIES.map(cat => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          )}
        )}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      )}

      {/* Search Results Display */}
      {!loading && searched && (
        <div className="space-y-6">
          {activeCategory !== 'web' && (
            <>
              {/* Local Results Count Header */}
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>
                  Ditemukan <strong className="text-gray-900">{localResults.length} hasil</strong> di database lokal
                </span>
              </div>

              {/* Local Results Grid */}
              {localResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localResults.map(item => {
                    const cfg = TYPE_CONFIG[item.type] || { label: item.type, badge: 'bg-gray-100' }
                    return (
                      <div
                        key={`${item.type}-${item.id}`}
                        className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${cfg.badge}`}>
                              {cfg.label}
                            </span>
                            <AudioButton
                              audioUrl={`search-${item.id}`}
                              onClick={() => playAudio(`search-${item.id}`, item.audioText)}
                              size="sm"
                            />
                          </div>

                          <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-bold text-gray-900 font-japanese">
                              {item.title}
                            </h3>
                            {item.romaji && (
                              <span className="text-xs font-semibold text-blue-600 font-mono">
                                {item.romaji}
                              </span>
                            )}
                          </div>

                          <p className="text-sm font-semibold text-gray-800">{item.meaning}</p>

                          {item.details && (
                            <p className="text-xs text-gray-500 font-mono">{item.details}</p>
                          )}

                          {item.example && (
                            <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg italic">
                              "{item.example}"
                            </p>
                          )}
                        </div>

                        <div className="pt-2 border-t border-gray-100 flex justify-end">
                          <Link
                            href={item.href}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            Buka Materi <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200 text-center space-y-2">
                  <p className="font-semibold text-amber-900">Materi tidak ditemukan di database lokal.</p>
                  <p className="text-xs text-amber-700">
                    Coba ubah kata kunci atau gunakan tab <strong>Pencarian Web 🌐</strong> di atas untuk melihat rujukan eksternal.
                  </p>
                </div>
              )}
            </>
          )}

          {/* Web Search Section / Tab */}
          {(activeCategory === 'web' || (activeCategory === 'all' && webResults.length > 0)) && (
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                Rujukan Pencarian Web ({webResults.length})
              </h3>

              <div className="space-y-3">
                {webResults.map(web => (
                  <a
                    key={web.id}
                    href={web.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:border-blue-400 hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-base font-bold text-blue-700 group-hover:underline flex items-center gap-1.5">
                        {web.title}
                        <ExternalLink className="w-4 h-4 text-blue-500 opacity-70" />
                      </h4>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono shrink-0">
                        {web.source}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{web.snippet}</p>
                    <span className="text-xs text-blue-500 font-mono block mt-2 opacity-80">
                      {web.url}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Initial Empty State */}
      {!searched && (
        <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-4 max-w-xl mx-auto shadow-sm">
          <div className="inline-flex p-4 rounded-full bg-blue-50 text-blue-600 mb-1">
            <Search className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Pencarian Materi Terpadu</h3>
          <p className="text-sm text-gray-600">
            Ketik kata dalam Kanji, Hiragana, Katakana, Romaji, atau Bahasa Indonesia untuk mencari materi secara instan.
          </p>
        </div>
      )}
    </div>
  )
}
