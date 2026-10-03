export default function ProgressPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Progress</h1>
      <p className="text-gray-600">Lihat perkembangan belajar Anda.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <p className="text-gray-600">Belum ada data.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Weak Material</h2>
          <p className="text-gray-600">Belum ada data.</p>
        </div>
      </div>
    </div>
  )
}
