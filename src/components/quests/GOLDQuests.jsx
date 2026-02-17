import { useState } from 'react'

export default function GOLDQuests({ data = {}, onUpdate }) {
  const {
    income = '',
    incomeTarget = 3000,
    action1Done = false,
    action1Text = '',
    action2Done = false,
    action2Text = '',
    action3Done = false,
    action3Text = ''
  } = data

  const [showIncomeTargetModal, setShowIncomeTargetModal] = useState(false)
  const [editingIncomeTarget, setEditingIncomeTarget] = useState(incomeTarget)

  const toggleAction = (actionNum) => {
    onUpdate({ [`action${actionNum}Done`]: !data[`action${actionNum}Done`] })
  }

  const setActionText = (actionNum, text) => {
    onUpdate({ [`action${actionNum}Text`]: text })
  }

  const setIncome = (value) => {
    // 允許空字串，避免顯示0
    onUpdate({ income: value === '' ? '' : parseFloat(value) || '' })
  }

  const saveIncomeTarget = () => {
    const target = parseFloat(editingIncomeTarget) || 3000
    onUpdate({ incomeTarget: target })
    setShowIncomeTargetModal(false)
  }

  return (
    <div className="bg-gray-800 border-2 border-yellow-500/50 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-yellow-300 mb-4">💰 GOLD (鈔能力)</h2>

      {/* 今日收入 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-semibold text-yellow-300">💵 今日收入（目標：{incomeTarget}元）</h3>
          <button
            onClick={() => {
              setEditingIncomeTarget(incomeTarget)
              setShowIncomeTargetModal(true)
            }}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            ⚙️ <span>設定目標</span>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-gray-300">$</span>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            onFocus={(e) => e.target.select()}
            placeholder="輸入今日收入"
            className="flex-1 px-4 py-3 bg-gray-900 border-2 border-yellow-500/50 rounded-lg text-gray-200 text-xl font-bold focus:outline-none focus:border-yellow-400 transition-colors"
          />
        </div>
      </div>

      {/* 事業關鍵行動 */}
      <div>
        <h3 className="text-lg font-semibold text-yellow-300 mb-3">📈 事業關鍵行動（每項 16.67%）</h3>
        <div className="space-y-4">
          {/* 行動 1 */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <input
                type="checkbox"
                checked={action1Done}
                onChange={() => toggleAction(1)}
                className="w-6 h-6 mt-1 rounded border-2 border-yellow-500 bg-gray-700 checked:bg-yellow-500 cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={action1Text}
                onChange={(e) => setActionText(1, e.target.value)}
                placeholder="行動 1：例如：完成產品設計草圖"
                className={`flex-1 px-3 py-2 bg-gray-900 border-2 border-yellow-500/30 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition-all ${action1Done ? 'line-through text-green-300' : ''
                  }`}
              />
            </div>
          </div>

          {/* 行動 2 */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <input
                type="checkbox"
                checked={action2Done}
                onChange={() => toggleAction(2)}
                className="w-6 h-6 mt-1 rounded border-2 border-yellow-500 bg-gray-700 checked:bg-yellow-500 cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={action2Text}
                onChange={(e) => setActionText(2, e.target.value)}
                placeholder="行動 2：例如：聯繫3位潛在客戶"
                className={`flex-1 px-3 py-2 bg-gray-900 border-2 border-yellow-500/30 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition-all ${action2Done ? 'line-through text-green-300' : ''
                  }`}
              />
            </div>
          </div>

          {/* 行動 3 */}
          <div>
            <div className="flex items-start gap-3 mb-2">
              <input
                type="checkbox"
                checked={action3Done}
                onChange={() => toggleAction(3)}
                className="w-6 h-6 mt-1 rounded border-2 border-yellow-500 bg-gray-700 checked:bg-yellow-500 cursor-pointer flex-shrink-0"
              />
              <input
                type="text"
                value={action3Text}
                onChange={(e) => setActionText(3, e.target.value)}
                placeholder="行動 3：例如：撰寫行銷文案"
                className={`flex-1 px-3 py-2 bg-gray-900 border-2 border-yellow-500/30 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-400 transition-all ${action3Done ? 'line-through text-green-300' : ''
                  }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 收入目標設定彈窗 */}
      {showIncomeTargetModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border-2 border-yellow-500 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-yellow-300 mb-4">設定每日收入目標</h3>

            <div className="mb-4">
              <label className="text-sm text-gray-400 mb-2 block">目標收入（元）</label>
              <input
                type="number"
                step="100"
                value={editingIncomeTarget}
                onChange={(e) => setEditingIncomeTarget(e.target.value)}
                onFocus={(e) => e.target.select()}
                onFocus={(e) => e.target.select()}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 text-xl focus:outline-none focus:border-yellow-500"
              />
              <p className="text-xs text-gray-500 mt-2">
                💡 設定您的每日收入目標，計分邏輯會自動調整<br />
                目標收入 = 50%，超過目標每1000元加5%（最高75%）
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={saveIncomeTarget}
                className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
              >
                儲存
              </button>
              <button
                onClick={() => setShowIncomeTargetModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
