import { useState } from 'react'

export default function HPQuests({ data = {}, onUpdate }) {
  const {
    water = 0,
    waterRecords = [],
    waterTarget = 2400,
    wakeTime,
    sleepTime,
    wakeTimeGoals = { best: '05:00', great: '05:30', ok: '06:00', late: '06:00+' },
    sleepTimeGoals = { best: '21:00', great: '21:30', ok: '22:00', late: '22:00+' },
    meals,
    fasting
  } = data

  const [showWaterTargetModal, setShowWaterTargetModal] = useState(false)
  const [showWakeTimeModal, setShowWakeTimeModal] = useState(false)
  const [showSleepTimeModal, setShowSleepTimeModal] = useState(false)
  const [editingWaterTarget, setEditingWaterTarget] = useState(waterTarget)
  const [editingWakeTimeGoals, setEditingWakeTimeGoals] = useState(wakeTimeGoals)
  const [editingSleepTimeGoals, setEditingSleepTimeGoals] = useState(sleepTimeGoals)

  const addWater = (amount) => {
    const newRecord = {
      time: new Date().toISOString(),
      amount: amount
    }
    const newRecords = [...waterRecords, newRecord]
    onUpdate({
      water: water + amount,
      waterRecords: newRecords
    })
  }

  const resetWater = () => {
    onUpdate({ water: 0, waterRecords: [] })
  }

  const saveWaterTarget = () => {
    onUpdate({ waterTarget: parseInt(editingWaterTarget) || 2400 })
    setShowWaterTargetModal(false)
  }

  const saveWakeTimeGoals = () => {
    onUpdate({ wakeTimeGoals: editingWakeTimeGoals })
    setShowWakeTimeModal(false)
  }

  const saveSleepTimeGoals = () => {
    onUpdate({ sleepTimeGoals: editingSleepTimeGoals })
    setShowSleepTimeModal(false)
  }

  const setLevel = (field, level) => {
    onUpdate({ [field]: level })
  }

  const getLevelStyle = (field, level) => {
    const isSelected = data[field] === level
    const baseStyle = 'px-4 py-2 rounded-lg font-medium transition-all duration-200 '

    if (isSelected) {
      if (level === 'best') return baseStyle + 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg ring-2 ring-green-400'
      if (level === 'great') return baseStyle + 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg ring-2 ring-blue-400'
      if (level === 'ok') return baseStyle + 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg ring-2 ring-yellow-400'
      if (level === 'late') return baseStyle + 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg ring-2 ring-red-400 shadow-red-500/50'
    }

    return baseStyle + 'bg-gray-700 text-gray-300 hover:bg-gray-600'
  }

  const toggleMeal = (meal) => {
    const meals = data.meals || {}
    const fasting = data.fasting || {}

    if (fasting.fullDayFast) return

    let updates = { meals: { ...meals } }

    if (meal === 'breakfast' && !meals.breakfast) {
      updates.fasting = { ...fasting, breakfastFast: false }
    }

    if (meal === 'dinner' && !meals.dinner) {
      updates.fasting = { ...fasting, dinnerFast: false }
    }

    updates.meals[meal] = !meals[meal]
    onUpdate(updates)
  }

  const toggleFasting = (type) => {
    const fasting = data.fasting || {}
    const meals = data.meals || {}

    let updates = { fasting: { ...fasting } }

    if (type === 'fullDayFast' && !fasting.fullDayFast) {
      updates = {
        fasting: {
          fullDayFast: true,
          breakfastFast: false,
          dinnerFast: false
        },
        meals: {
          breakfast: false,
          lunch: false,
          dinner: false
        }
      }
    }
    else if (type === 'fullDayFast' && fasting.fullDayFast) {
      updates.fasting.fullDayFast = false
    }
    else if (type === 'breakfastFast' && !fasting.breakfastFast) {
      updates.fasting.breakfastFast = true
      updates.meals = { ...meals, breakfast: false }
    }
    else if (type === 'breakfastFast' && fasting.breakfastFast) {
      updates.fasting.breakfastFast = false
    }
    else if (type === 'dinnerFast' && !fasting.dinnerFast) {
      updates.fasting.dinnerFast = true
      updates.meals = { ...meals, dinner: false }
    }
    else if (type === 'dinnerFast' && fasting.dinnerFast) {
      updates.fasting.dinnerFast = false
    }

    onUpdate(updates)
  }

  const getDietScore = () => {
    const meals = data.meals || {}
    const fasting = data.fasting || {}

    if (fasting.fullDayFast) {
      return { score: 3, level: 'best' }
    }

    let score = 0
    if (meals.breakfast || fasting.breakfastFast) score++
    if (meals.lunch) score++
    if (meals.dinner || fasting.dinnerFast) score++

    if (score === 0) return null
    if (score === 1) return { score, level: 'ok' }
    if (score === 2) return { score, level: 'great' }
    if (score === 3) return { score, level: 'best' }
  }

  return (
    <div className="bg-gray-800 border-2 border-blue-500/30 rounded-xl p-6 transition-all duration-300">
      <h2 className="text-2xl font-bold text-red-300 mb-4 flex items-center">
        ❤️ HP (生命)
      </h2>

      {/* 飲水紀錄 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-semibold text-blue-300">💧 飲水紀錄</h3>
          <button
            onClick={() => {
              setEditingWaterTarget(waterTarget)
              setShowWaterTargetModal(true)
            }}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            ⚙️ <span>設定目標</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-3 mb-3">
          <button onClick={() => addWater(200)} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            +200cc
          </button>
          <button onClick={() => addWater(300)} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            +300cc
          </button>
          <button onClick={() => addWater(500)} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            +500cc
          </button>
          <button onClick={resetWater} className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg font-medium transition-colors">
            重置
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold text-blue-300">{water} / {waterTarget} cc</div>
          <div className="flex-1 h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500"
              style={{ width: `${Math.min((water / waterTarget) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 就寢時間（前一晚） */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-semibold text-indigo-300">🌙 就寢時間（前一晚）</h3>
          <button
            onClick={() => {
              setEditingSleepTimeGoals(sleepTimeGoals)
              setShowSleepTimeModal(true)
            }}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            ⚙️ <span>修改目標時間</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setLevel('sleepTime', 'best')} className={getLevelStyle('sleepTime', 'best')}>
            {sleepTimeGoals.best} (Best)
          </button>
          <button onClick={() => setLevel('sleepTime', 'great')} className={getLevelStyle('sleepTime', 'great')}>
            {sleepTimeGoals.great} (Great)
          </button>
          <button onClick={() => setLevel('sleepTime', 'ok')} className={getLevelStyle('sleepTime', 'ok')}>
            {sleepTimeGoals.ok} (OK)
          </button>
          <button onClick={() => setLevel('sleepTime', 'late')} className={getLevelStyle('sleepTime', 'late')}>
            晚於 {sleepTimeGoals.ok}
          </button>
        </div>
      </div>

      {/* 起床時間（今早） */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-lg font-semibold text-yellow-300">🌅 起床時間（今早）</h3>
          <button
            onClick={() => {
              setEditingWakeTimeGoals(wakeTimeGoals)
              setShowWakeTimeModal(true)
            }}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            ⚙️ <span>修改目標時間</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setLevel('wakeTime', 'best')} className={getLevelStyle('wakeTime', 'best')}>
            {wakeTimeGoals.best} (Best)
          </button>
          <button onClick={() => setLevel('wakeTime', 'great')} className={getLevelStyle('wakeTime', 'great')}>
            {wakeTimeGoals.great} (Great)
          </button>
          <button onClick={() => setLevel('wakeTime', 'ok')} className={getLevelStyle('wakeTime', 'ok')}>
            {wakeTimeGoals.ok} (OK)
          </button>
          <button onClick={() => setLevel('wakeTime', 'late')} className={getLevelStyle('wakeTime', 'late')}>
            晚於 {wakeTimeGoals.ok}
          </button>
        </div>
      </div>

      {/* 飲食營養 */}
      <div>
        <h3 className="text-lg font-semibold text-green-300 mb-3">🍽️ 飲食營養</h3>

        {/* 飲食營養選項 */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {/* 早餐自炊 */}
            <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${data.fasting?.fullDayFast || data.fasting?.breakfastFast
                ? 'bg-gray-800 opacity-30 cursor-not-allowed'
                : data.meals?.breakfast
                  ? 'bg-teal-600/30 border-2 border-teal-500 cursor-pointer'
                  : 'bg-gray-700 hover:bg-gray-600 cursor-pointer'
              }`}>
              <input
                type="checkbox"
                checked={data.meals?.breakfast || false}
                onChange={() => toggleMeal('breakfast')}
                disabled={data.fasting?.fullDayFast || data.fasting?.breakfastFast}
                className={`w-4 h-4 rounded border-2 border-teal-500 ${data.fasting?.fullDayFast || data.fasting?.breakfastFast ? 'cursor-not-allowed' : 'cursor-pointer'
                  } bg-gray-700 checked:bg-teal-500`}
              />
              <span className={data.meals?.breakfast ? 'text-teal-300 font-bold' : 'text-gray-300'}>早餐自炊</span>
            </label>

            {/* 早餐禁食 */}
            <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${data.fasting?.fullDayFast || data.meals?.breakfast
                ? 'bg-gray-800 opacity-30 cursor-not-allowed'
                : data.fasting?.breakfastFast
                  ? 'bg-cyan-600/30 border-2 border-cyan-500 cursor-pointer'
                  : 'bg-gray-700 hover:bg-gray-600 cursor-pointer'
              }`}>
              <input
                type="checkbox"
                checked={data.fasting?.breakfastFast || false}
                onChange={() => toggleFasting('breakfastFast')}
                disabled={data.fasting?.fullDayFast || data.meals?.breakfast}
                className={`w-4 h-4 rounded border-2 border-cyan-500 ${data.fasting?.fullDayFast || data.meals?.breakfast ? 'cursor-not-allowed' : 'cursor-pointer'
                  } bg-gray-700 checked:bg-cyan-500`}
              />
              <span className={data.fasting?.breakfastFast ? 'text-cyan-300 font-bold' : 'text-gray-300'}>早餐禁食</span>
            </label>

            {/* 午餐自炊 */}
            <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${data.fasting?.fullDayFast
                ? 'bg-gray-800 opacity-30 cursor-not-allowed'
                : data.meals?.lunch
                  ? 'bg-amber-600/30 border-2 border-amber-500 cursor-pointer'
                  : 'bg-gray-700 hover:bg-gray-600 cursor-pointer'
              }`}>
              <input
                type="checkbox"
                checked={data.meals?.lunch || false}
                onChange={() => toggleMeal('lunch')}
                disabled={data.fasting?.fullDayFast}
                className={`w-4 h-4 rounded border-2 border-amber-500 ${data.fasting?.fullDayFast ? 'cursor-not-allowed' : 'cursor-pointer'
                  } bg-gray-700 checked:bg-amber-500`}
              />
              <span className={data.meals?.lunch ? 'text-amber-300 font-bold' : 'text-gray-300'}>午餐自炊</span>
            </label>

            {/* 晚餐自炊 */}
            <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${data.fasting?.fullDayFast || data.fasting?.dinnerFast
                ? 'bg-gray-800 opacity-30 cursor-not-allowed'
                : data.meals?.dinner
                  ? 'bg-violet-600/30 border-2 border-violet-500 cursor-pointer'
                  : 'bg-gray-700 hover:bg-gray-600 cursor-pointer'
              }`}>
              <input
                type="checkbox"
                checked={data.meals?.dinner || false}
                onChange={() => toggleMeal('dinner')}
                disabled={data.fasting?.fullDayFast || data.fasting?.dinnerFast}
                className={`w-4 h-4 rounded border-2 border-violet-500 ${data.fasting?.fullDayFast || data.fasting?.dinnerFast ? 'cursor-not-allowed' : 'cursor-pointer'
                  } bg-gray-700 checked:bg-violet-500`}
              />
              <span className={data.meals?.dinner ? 'text-violet-300 font-bold' : 'text-gray-300'}>晚餐自炊</span>
            </label>

            {/* 晚餐禁食 */}
            <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${data.fasting?.fullDayFast || data.meals?.dinner
                ? 'bg-gray-800 opacity-30 cursor-not-allowed'
                : data.fasting?.dinnerFast
                  ? 'bg-purple-600/30 border-2 border-purple-500 cursor-pointer'
                  : 'bg-gray-700 hover:bg-gray-600 cursor-pointer'
              }`}>
              <input
                type="checkbox"
                checked={data.fasting?.dinnerFast || false}
                onChange={() => toggleFasting('dinnerFast')}
                disabled={data.fasting?.fullDayFast || data.meals?.dinner}
                className={`w-4 h-4 rounded border-2 border-purple-500 ${data.fasting?.fullDayFast || data.meals?.dinner ? 'cursor-not-allowed' : 'cursor-pointer'
                  } bg-gray-700 checked:bg-purple-500`}
              />
              <span className={data.fasting?.dinnerFast ? 'text-purple-300 font-bold' : 'text-gray-300'}>晚餐禁食</span>
            </label>

            {/* 全日禁食 */}
            <label className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${data.fasting?.fullDayFast
                ? 'bg-fuchsia-600/30 border-2 border-fuchsia-500'
                : 'bg-gray-700 hover:bg-gray-600'
              }`}>
              <input
                type="checkbox"
                checked={data.fasting?.fullDayFast || false}
                onChange={() => toggleFasting('fullDayFast')}
                className="w-4 h-4 rounded border-2 border-fuchsia-500 bg-gray-700 checked:bg-fuchsia-500 cursor-pointer"
              />
              <span className={data.fasting?.fullDayFast ? 'text-fuchsia-300 font-bold' : 'text-gray-300'}>全日禁食</span>
            </label>
          </div>
        </div>

        {/* 飲食得分 */}
        {getDietScore() && (
          <div className="mt-3 p-3 bg-gray-900 rounded-lg">
            <p className="text-sm text-gray-400">飲食得分：</p>
            <p className="text-base mt-1">
              <span className={`font-bold ${getDietScore().level === 'best' ? 'text-green-400' :
                  getDietScore().level === 'great' ? 'text-blue-400' :
                    'text-yellow-400'
                }`}>
                {getDietScore().level === 'best' ? '⭐ Best' :
                  getDietScore().level === 'great' ? '✨ Great' :
                    '✓ OK'} ({getDietScore().score}/3 餐)
              </span>
            </p>
          </div>
        )}
      </div>

      {/* 飲水目標設定彈窗 */}
      {showWaterTargetModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border-2 border-blue-500 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-blue-300 mb-4">設定每日飲水目標</h3>

            <div className="mb-4">
              <label className="text-sm text-gray-400 mb-2 block">目標飲水量（cc）</label>
              <input
                type="number"
                step="100"
                value={editingWaterTarget}
                onChange={(e) => setEditingWaterTarget(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 text-xl focus:outline-none focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-2">建議：成人每日需要 2000-2400 cc</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={saveWaterTarget}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                儲存
              </button>
              <button
                onClick={() => setShowWaterTargetModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 起床時間目標設定彈窗 */}
      {showWakeTimeModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border-2 border-yellow-500 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-yellow-300 mb-4">設定起床時間目標</h3>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Best（最佳）</label>
                <input
                  type="time"
                  value={editingWakeTimeGoals.best}
                  onChange={(e) => setEditingWakeTimeGoals({ ...editingWakeTimeGoals, best: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Great（很好）</label>
                <input
                  type="time"
                  value={editingWakeTimeGoals.great}
                  onChange={(e) => setEditingWakeTimeGoals({ ...editingWakeTimeGoals, great: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">OK（及格）</label>
                <input
                  type="time"
                  value={editingWakeTimeGoals.ok}
                  onChange={(e) => setEditingWakeTimeGoals({ ...editingWakeTimeGoals, ok: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={saveWakeTimeGoals}
                className="flex-1 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
              >
                儲存
              </button>
              <button
                onClick={() => setShowWakeTimeModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 就寢時間目標設定彈窗 */}
      {showSleepTimeModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border-2 border-indigo-500 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-indigo-300 mb-4">設定就寢時間目標</h3>

            <div className="space-y-3 mb-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Best（最佳）</label>
                <input
                  type="time"
                  value={editingSleepTimeGoals.best}
                  onChange={(e) => setEditingSleepTimeGoals({ ...editingSleepTimeGoals, best: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Great（很好）</label>
                <input
                  type="time"
                  value={editingSleepTimeGoals.great}
                  onChange={(e) => setEditingSleepTimeGoals({ ...editingSleepTimeGoals, great: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">OK（及格）</label>
                <input
                  type="time"
                  value={editingSleepTimeGoals.ok}
                  onChange={(e) => setEditingSleepTimeGoals({ ...editingSleepTimeGoals, ok: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={saveSleepTimeGoals}
                className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                儲存
              </button>
              <button
                onClick={() => setShowSleepTimeModal(false)}
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
