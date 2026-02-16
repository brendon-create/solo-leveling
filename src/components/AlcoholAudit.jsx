export default function AlcoholAudit({ data = {}, onUpdate }) {
  const { reason = '', feeling = '' } = data

  return (
    <div className="bg-gray-800 border-2 border-gray-600 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-400 mb-2">🍺 酒精紀錄</h2>
      <p className="text-sm text-gray-500 mb-4">理性審計 - 僅作記錄，不給予獎勵</p>

      {/* 今日飲酒理由 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          今日飲酒理由
        </label>
        <textarea
          value={reason}
          onChange={(e) => onUpdate({ reason: e.target.value })}
          placeholder="為什麼選擇喝酒..."
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors resize-none"
          rows={3}
        />
      </div>

      {/* 當下心境/身體感受 */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          當下心境/身體感受
        </label>
        <textarea
          value={feeling}
          onChange={(e) => onUpdate({ feeling: e.target.value })}
          placeholder="喝酒前的心情和身體狀態..."
          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gray-600 transition-colors resize-none"
          rows={3}
        />
      </div>

      <p className="mt-4 text-xs text-gray-600 italic">
        此紀錄將同步至 Google Sheet，用於長期自我覺察分析
      </p>
    </div>
  )
}
