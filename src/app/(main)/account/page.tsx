import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { Breadcrumb } from '@/components/shared/Breadcrumb'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, Mail, Calendar, ShieldCheck, UserCheck } from 'lucide-react'
import LogoutButton from './LogoutButton'

export default async function AccountPage() {
  const session = await auth()

  let userDb = null
  if (session?.user?.email) {
    userDb = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })
  }

  const user = userDb || {
    id: session?.user?.id || 'N/A',
    name: session?.user?.name || 'Pengguna',
    email: session?.user?.email || 'N/A',
    createdAt: new Date(),
  }

  const getInitial = (name?: string | null) => {
    if (!name) return 'U'
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="space-y-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/home' },
          { label: 'Account' },
        ]}
      />

      <PageHeader
        title="Akun Saya"
        description="Kelola informasi profil dan sesi akun Anda."
        icon={<User className="w-8 h-8" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
              {getInitial(user.name)}
            </div>
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-t border-gray-100 pt-4 space-y-3">
              <div className="flex items-center gap-3 text-gray-700">
                <UserCheck className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Nama Lengkap</p>
                  <p className="font-medium">{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Alamat Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Terdaftar Sejak</p>
                  <p className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Status Akun</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                    Aktif & Terverifikasi
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Card */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <CardTitle>Aksi Akun</CardTitle>
            <CardDescription>Keluar dari sesi pembelajaran saat ini.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
              💡 <strong>Tips:</strong> Progress pembelajaran dan riwayat latihan Anda tersimpan secara otomatis di akun ini.
            </div>
            <LogoutButton />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
