import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { PageHeader } from '@/components/shared/PageHeader'
import { MaterialCard } from '@/components/shared/MaterialCard'
import { BookOpen, Languages, FileText, BookMarked, Sparkles, GraduationCap } from 'lucide-react'

export default async function LearnPage() {
  // Fetch data dari database
  const courses = await prisma.course.findMany({
    include: {
      lessons: {
        orderBy: { order: 'asc' },
        include: {
          hiragana: true,
          vocabulary: true,
        },
      },
    },
  })

  const categories = [
    { title: 'Hiragana', icon: <Languages className="w-6 h-6" />, description: 'Karakter dasar', href: '/learn/hiragana' },
    { title: 'Katakana', icon: <Languages className="w-6 h-6" />, description: 'Karakter kata asing', href: '/learn/katakana' },
    { title: 'Kanji', icon: <FileText className="w-6 h-6" />, description: 'Karakter logografis', href: '/learn/kanji' },
    { title: 'Vocabulary', icon: <BookMarked className="w-6 h-6" />, description: 'Kosakata', href: '/learn/vocabulary' },
    { title: 'Particle', icon: <Sparkles className="w-6 h-6" />, description: 'Partikel grammar', href: '/learn/particle' },
    { title: 'Grammar', icon: <GraduationCap className="w-6 h-6" />, description: 'Pola kalimat', href: '/learn/grammar' },
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        title="Learn"
        description="Pilih materi yang ingin dipelajari."
        icon={<BookOpen className="w-8 h-8" />}
      />

      {/* Courses Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Courses</h2>
        {courses.length === 0 ? (
          <p className="text-gray-600">Belum ada course yang tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="space-y-2">
                  {course.lessons.map((lesson) => (
                    <Link 
                      key={lesson.id} 
                      href={`/learn/lesson/${lesson.id}`}
                      className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{lesson.title}</span>
                      <span className="text-sm text-gray-500 ml-2">({lesson.hiragana.length} Hiragana, {lesson.vocabulary.length} Vocab)</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link key={category.title} href={category.href}>
              <MaterialCard
                title={category.title}
                description={category.description}
                icon={category.icon}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
