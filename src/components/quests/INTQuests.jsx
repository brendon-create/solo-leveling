export default function INTQuests({ data = {}, onUpdate }) {
  const { reading, italian, course } = data

  const toggle = (field) => {
    onUpdate({ [field]: !data[field] })
  }

  return (
    <div className="bg-gray-800 border-2 border-blue-500/50 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-blue-300 mb-4">🧠 INT (智力)</h2>

      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={reading || false}
            onChange={() => toggle('reading')}
            className="w-6 h-6 rounded border-2 border-blue-500 bg-gray-700 checked:bg-blue-500 cursor-pointer"
          />
          <span className={`text-lg ${reading ? 'text-green-300 line-through' : 'text-gray-300'} group-hover:text-white transition-colors`}>
            📚 閱讀 15 分鐘
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={italian || false}
            onChange={() => toggle('italian')}
            className="w-6 h-6 rounded border-2 border-blue-500 bg-gray-700 checked:bg-blue-500 cursor-pointer"
          />
          <span className={`text-lg ${italian ? 'text-green-300 line-through' : 'text-gray-300'} group-hover:text-white transition-colors`}>
            🇮🇹 義大利文 5 分鐘
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={course || false}
            onChange={() => toggle('course')}
            className="w-6 h-6 rounded border-2 border-blue-500 bg-gray-700 checked:bg-blue-500 cursor-pointer"
          />
          <span className={`text-lg ${course ? 'text-green-300 line-through' : 'text-gray-300'} group-hover:text-white transition-colors`}>
            🎓 線上課程 15 分鐘
          </span>
        </label>
      </div>
    </div>
  )
}
