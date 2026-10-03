export default function AccountPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Account</h1>
      <p className="text-gray-600">Kelola akun Anda.</p>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-gray-600">Fitur profile akan tersedia di Phase 1.</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Login</h2>
          <p className="text-gray-600">
            <a href="/login" className="text-blue-600 hover:underline">Login di sini</a>
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Register</h2>
          <p className="text-gray-600">
            <a href="/register" className="text-blue-600 hover:underline">Register di sini</a>
          </p>
        </div>
      </div>
    </div>
  )
}
