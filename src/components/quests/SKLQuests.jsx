import { useState } from 'react'

export default function SKLQuests({ data = {}, onUpdate }) {
  const { enabled = true, taskName = '🧹 整理空間 15分鐘', completed = false } = data
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [editingTaskName, setEditingTaskName] = useState(taskName)
  const [editingEnabled, setEditingEnabled] = useState(enabled)

  const toggle = () => {
    if (enabled) {
      onUpdate({ completed: !completed })
    }
  }

  const openSettings = () => {
    setEditingTaskName(taskName)
    setEditingEnabled(enabled)
    setShowSettingsModal(true)
  }

  const saveSettings = () => {
    onUpdate({
      taskName: editingTaskName,
      enabled: editingEnabled,
      completed: editingEnabled ? completed : false // 關閉時清除完成狀態
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
              <div className="text-3xl opacity-50">🔥</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-400">SKL (個人秘技) - 已關閉</h3>
                <p className="text-xs text-gray-500 mt-1">點擊右側按鈕可重新啟用您的專屬秘技</p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingEnabled(true)
                setEditingTaskName(taskName)
                setShowSettingsModal(true)
              }}
              className="px-4 py-2 bg-orange-600/50 hover:bg-orange-600 text-orange-200 rounded-lg text-sm transition-all duration-200"
            >
              重新啟用
            </button>
          </div>
        </div>
      ) : (
        // 啟用狀態：完整功能卡片
        <div className="bg-gray-800 border-2 border-orange-500/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-bold text-orange-300">🔥 SKL (個人秘技)</h2>
            <button
              onClick={openSettings}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              ⚙️ <span>自訂秘技</span>
            </button>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={completed}
                onChange={toggle}
                className="w-6 h-6 rounded border-2 border-orange-500 bg-gray-700 checked:bg-orange-500 cursor-pointer"
              />
              <span className={`text-lg ${completed ? 'text-green-300 line-through' : 'text-gray-300'} group-hover:text-white transition-colors`}>
                {taskName}
              </span>
            </label>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              今日完成: {completed ? '1' : '0'} / 1 項
            </p>
          </div>
        </div>
      )}

      {/* 設定彈窗：永遠渲染，不受enabled狀態影響 */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border-2 border-orange-500 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-orange-300 mb-4">自訂個人秘技</h3>

            <div className="space-y-4">
              {/* 啟用開關 */}
              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingEnabled}
                    onChange={(e) => setEditingEnabled(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-orange-500 bg-gray-700 checked:bg-orange-500 cursor-pointer"
                  />
                  <div>
                    <span className="text-orange-300 font-medium">啟用 SKL 秘技</span>
                    <p className="text-xs text-gray-400 mt-1">
                      關閉後，此項目將不會顯示在主頁面，雷達圖也會從六角形變回五角形
                    </p>
                  </div>
                </label>
              </div>

              {/* 任務名稱 */}
              {editingEnabled && (
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">秘技任務名稱</label>
                  <input
                    type="text"
                    value={editingTaskName}
                    onChange={(e) => setEditingTaskName(e.target.value)}
                    onFocus={(e) => e.target.select()}
                    placeholder="例如：整理空間 15分鐘"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-orange-500"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    💡 這是你的專屬秘技！可以是任何你想養成的習慣
                  </p>
                </div>
              )}

              {/* 說明 */}
              <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
                <p className="text-blue-300 text-xs">
                  <strong>💡 秘技建議：</strong><br />
                  • 整理家中某個空間<br />
                  • 冥想或伸展運動<br />
                  • 學習新技能<br />
                  • 任何你想養成的習慣
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={saveSettings}
                className="flex-1 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
              >
                儲存
              </button>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
