// Script sederhana untuk test semua route
const routes = [
  '/',
  '/home',
  '/learn',
  '/practice',
  '/mastery',
  '/exam',
  '/search',
  '/progress',
  '/dashboard',
  '/settings',
  '/account',
  '/login',
  '/register',
]

console.log('🧪 Testing all routes...\n')
console.log('Routes to test:')
routes.forEach((route, index) => {
  console.log(`${index + 1}. http://localhost:3000${route}`)
})
console.log('\n✅ Test checklist:')
console.log('□ Semua route dapat dibuka tanpa error')
console.log('□ Tidak ada broken route')
console.log('□ Layout tampil dengan benar (Navbar + Footer)')
console.log('□ Mobile menu berfungsi')
console.log('□ Tidak ada overflow horizontal')
console.log('□ Semua component dasar bekerja')
console.log('□ Loading state muncul')
console.log('□ 404 page muncul untuk route tidak valid')
console.log('□ Error boundary bekerja')
console.log('□ Responsive di mobile/tablet/desktop')
