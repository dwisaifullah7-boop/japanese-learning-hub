export default function SearchPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Search</h1>
      <p className="text-gray-600">Cari materi dalam database lokal.</p>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <input
          type="text"
          placeholder="Cari Kanji, Hiragana, Katakana, Vocabulary..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-sm text-gray-500 mt-2">Fitur search akan tersedia di Phase 10.</p>
      </div>
    </div>
  )
}
