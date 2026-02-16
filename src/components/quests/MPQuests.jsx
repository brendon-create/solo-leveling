export default function MPQuests({ data = {}, onUpdate }) {
  const { scripture, prayer, journal } = data

  const toggle = (field) => {
    onUpdate({ [field]: !data[field] })
  }

  return (
    <div className="bg-gray-800 border-2 border-purple-500/50 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-purple-300 mb-4">✨ MP (魔力/靈性)</h2>

      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={scripture || false}
            onChange={() => toggle('scripture')}
            className="w-6 h-6 rounded border-2 border-purple-500 bg-gray-700 checked:bg-purple-500 cursor-pointer"
          />
          <span className={`text-lg ${scripture ? 'text-green-300 line-through' : 'text-gray-300'} group-hover:text-white transition-colors`}>
            📖 讀經
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={prayer || false}
            onChange={() => toggle('prayer')}
            className="w-6 h-6 rounded border-2 border-purple-500 bg-gray-700 checked:bg-purple-500 cursor-pointer"
          />
          <span className={`text-lg ${prayer ? 'text-green-300 line-through' : 'text-gray-300'} group-hover:text-white transition-colors`}>
            🙏 禱告
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={journal || false}
            onChange={() => toggle('journal')}
            className="w-6 h-6 rounded border-2 border-purple-500 bg-gray-700 checked:bg-purple-500 cursor-pointer"
          />
          <span className={`text-lg ${journal ? 'text-green-300 line-through' : 'text-gray-300'} group-hover:text-white transition-colors`}>
            ✍️ 靈性日記
          </span>
        </label>
      </div>
    </div>
  )
}
