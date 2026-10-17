export function Footer() {
  return (
    <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-gray-200 dark:border-slate-800 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              About
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Japanese Learning Hub membantu Anda belajar bahasa Jepang secara terstruktur dari pemula hingga mahir (JLPT N5).
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/learn" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 block py-1 transition-colors">
                  Learn
                </a>
              </li>
              <li>
                <a href="/practice" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 block py-1 transition-colors">
                  Practice
                </a>
              </li>
              <li>
                <a href="/progress" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 block py-1 transition-colors">
                  Progress
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/settings" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 block py-1 transition-colors">
                  Settings
                </a>
              </li>
              <li>
                <a href="/account" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 block py-1 transition-colors">
                  Account
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            © 2026 Japanese Learning Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
