export default function CRTQuests({ data = {}, onUpdate }) {
  const { piano, drawing } = data

  const toggle = (field) => {
    onUpdate({ [field]: !data[field] })
  }

  return (
    <div className="bg-gray-800 border-2 border-pink-500/50 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-pink-300 mb-4">🎨 CRT (創造力)</h2>

      <div className="space-y-3">
        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={piano || false}
            onChange={() => toggle('piano')}
            className="w-6 h-6 rounded border-2 border-pink-500 bg-gray-700 checked:bg-pink-500 cursor-pointer"
          />
          <span className={`text-lg ${piano ? 'text-green-300 line-through' : 'text-gray-300'} group-hover:text-white transition-colors`}>
            🎹 練琴 10 分鐘
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={drawing || false}
            onChange={() => toggle('drawing')}
            className="w-6 h-6 rounded border-2 border-pink-500 bg-gray-700 checked:bg-pink-500 cursor-pointer"
          />
          <span className={`text-lg ${drawing ? 'text-green-300 line-through' : 'text-gray-300'} group-hover:text-white transition-colors`}>
            🖌️ 畫畫 10 分鐘
          </span>
        </label>
      </div>
    </div>
  )
}
