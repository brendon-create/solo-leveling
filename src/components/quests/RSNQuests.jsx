import { useState } from 'react'

export default function RSNQuests({ data = {}, onUpdate }) {
  const { celebrated, gratitude = '' } = data
  const [showHearts, setShowHearts] = useState(false)

  const handleCelebrate = () => {
    onUpdate({ celebrated: true })
    setShowHearts(true)
    setTimeout(() => setShowHearts(false), 2000)
  }

  return (
    <div className="bg-gray-800 border-2 border-pink-500/50 rounded-xl p-6 relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold text-pink-300">💗 RSN (共鳴/感恩)</h2>
        <span className="text-xs text-gray-500">紀錄任何你想慶賀與感恩的人際關係與事件</span>
      </div>

      {/* 愛心動畫 */}
      {showHearts && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute text-4xl animate-float-up"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      )}

      {/* 慶祝按鈕 */}
      <div className="mb-6">
        <button
          onClick={handleCelebrate}
          disabled={celebrated}
          className={`px-4 py-2 rounded-lg font-medium text-base transition-all duration-200 ${celebrated
              ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/50'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300 hover:scale-105'
            }`}
        >
          {celebrated ? '✨ 已慶祝今日 ✨' : '❤️ 點擊慶祝'}
        </button>
      </div>

      {/* 感恩筆記 */}
      <div>
        <h3 className="text-lg font-semibold text-pink-300 mb-3">📝 感恩筆記</h3>
        <textarea
          value={gratitude}
          onChange={(e) => onUpdate({ gratitude: e.target.value })}
          placeholder="今天有什麼值得感恩的事...&#10;記錄連結心意的時刻..."
          className="w-full px-4 py-3 bg-gray-900 border-2 border-pink-500/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-pink-400 transition-colors resize-none"
          rows={4}
        />
      </div>
    </div>
  )
}
