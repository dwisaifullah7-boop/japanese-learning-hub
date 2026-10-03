export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      <p className="text-gray-600">Pengaturan aplikasi.</p>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Audio</h2>
          <p className="text-gray-600">Pengaturan audio akan tersedia di Phase 14.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Appearance</h2>
          <p className="text-gray-600">Pengaturan tema akan tersedia di Phase 14.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Learning</h2>
          <p className="text-gray-600">Pengaturan pembelajaran akan tersedia di Phase 14.</p>
        </div>
      </div>
    </div>
  )
}
