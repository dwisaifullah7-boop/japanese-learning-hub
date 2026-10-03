export default function ExamPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Exam</h1>
      <p className="text-gray-600">Uji kemampuan Anda dengan exam.</p>
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
        <p className="text-gray-600 mb-4">Belum ada exam yang tersedia.</p>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Mulai Exam
        </button>
      </div>
    </div>
  )
}
