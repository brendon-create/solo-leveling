import { useState } from 'react'

export default function AlcoholAudit({ data = {}, onUpdate }) {
  const { enabled = true, reason = '', feeling = '' } = data
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [editingEnabled, setEditingEnabled] = useState(enabled)

  const openSettings = () => {
    setEditingEnabled(enabled)
    setShowSettingsModal(true)
  }

  const saveSettings = () => {
    onUpdate({
      enabled: editingEnabled,
      reason: editingEnabled ? reason : '',
      feeling: editingEnabled ? feeling : ''
    })
    setShowSettingsModal(false)
  }

  return (
    <>
      {/* 主卡片：根據enabled狀態顯示不同內容 */}
      {!enabled ? (
        // 關閉狀態：簡化提示卡片
        <div className="bg-gray-800/50 border-2 border-gray-600/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl opacity-50">🍺</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-400">酒精紀錄 - 已關閉</h3>
                <p className="text-xs text-gray-500 mt-1">點擊右側按鈕可重新啟用酒精記錄功能</p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingEnabled(true)
                setShowSettingsModal(true)
              }}
              className="px-4 py-2 bg-gray-600/50 hover:bg-gray-600 text-gray-200 rounded-lg text-sm transition-all duration-200"
            >
              啟用
            </button>
          </div>
        </div>
      ) : (
        // 啟用狀態：完整卡片
        <div className="bg-gray-800 border-2 border-gray-600 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-400">🍺 酒精紀錄</h2>
            <button
              onClick={openSettings}
              className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg text-xs transition-all duration-200"
            >
              ⚙️ 設定
            </button>
          </div>
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
      )}

      {/* 設定彈窗 */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border-2 border-gray-500 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-300 mb-4">🍺 酒精紀錄設定</h3>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300 font-medium">啟用酒精紀錄</span>
                <button
                  onClick={() => setEditingEnabled(!editingEnabled)}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${
                    editingEnabled ? 'bg-green-600' : 'bg-gray-600'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
                      editingEnabled ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                {editingEnabled
                  ? '✅ 啟用後將顯示酒精記錄區塊'
                  : '❌ 關閉後將隱藏酒精記錄區塊'}
              </p>
            </div>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 mb-4">
              <p className="text-blue-300 text-xs">
                💡 <strong>說明：</strong>酒精紀錄功能用於記錄飲酒理由與當下感受，幫助長期自我覺察。
                如果您不需要此功能，可以選擇關閉。
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={saveSettings}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
              >
                儲存
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
