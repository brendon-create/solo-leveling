import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

export default function StatsRadar({ todayProgress, cumulativeProgress, rsnHistory, currentDay }) {
  // 計算上週結束天數（7的倍數）
  const lastWeekEnd = Math.floor((currentDay - 1) / 7) * 7
  const thisWeekStart = lastWeekEnd + 1

  // 分離上週累積和本週新增
  const lastWeekCumulative = cumulativeProgress?.lastWeek || null
  const thisWeekCumulative = cumulativeProgress?.thisWeek || null

  // 計算右側雷達圖的動態scale
  const getMaxCumulative = () => {
    if (!thisWeekCumulative && !lastWeekCumulative) return 20

    const values = (thisWeekCumulative || lastWeekCumulative || []).map(d => d.value)
    const maxValue = Math.max(...values, 0)

    // 動態調整scale：至少20%，否則使用最大值的1.5倍（向上取整到10的倍數）
    const dynamicMax = Math.max(20, Math.ceil(maxValue * 1.5 / 10) * 10)
    return Math.min(dynamicMax, 100) // 最多100%
  }

  const cumulativeScale = getMaxCumulative()

  return (
    <div className="bg-gray-800 border-2 border-purple-500/50 rounded-xl p-6">
      <h2 className="text-xl font-bold text-purple-300 mb-4 text-center">⚡ 屬性雷達圖 (Day {currentDay}/100)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 左側：今日任務進度 (0-100%) */}
        <div>
          <h3 className="text-lg font-bold text-pink-300 mb-3 text-center">今日任務完成度</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={todayProgress}>
              {/* 5圈網格，每圈20% */}
              <PolarGrid
                stroke="#ec4899"
                strokeOpacity={0.3}
                polarRadius={[20, 40, 60, 80, 100]}
              />
              <PolarAngleAxis
                dataKey="stat"
                tick={{ fill: '#f9a8d4', fontSize: 13, fontWeight: 'bold' }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                ticks={[20, 40, 60, 80, 100]}
              />

              {/* 今天任務進度（粉紅色） */}
              <Radar
                name="今天"
                dataKey="value"
                stroke="#ec4899"
                fill="#ec4899"
                fillOpacity={0.6}
                strokeWidth={2.5}
              />
            </RadarChart>
          </ResponsiveContainer>

          {/* 今日數值 */}
          <div className={`grid ${todayProgress.length === 6 ? 'grid-cols-6' : 'grid-cols-5'} gap-1 mt-2`}>
            {todayProgress.map((item) => (
              <div key={item.stat} className="text-center">
                <div className="text-xs text-gray-400">{item.stat}</div>
                <div className="text-base font-bold text-pink-300">{item.value}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* 右側：累積成長進度 (動態scale) */}
        <div>
          <h3 className="text-lg font-bold text-purple-300 mb-3 text-center">
            累積成長進度 (0-{cumulativeScale}%)
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={thisWeekCumulative || lastWeekCumulative || todayProgress.map(d => ({ ...d, value: 0 }))}>
              {/* 5圈網格，根據動態scale */}
              <PolarGrid
                stroke="#a855f7"
                strokeOpacity={0.3}
                polarRadius={[20, 40, 60, 80, 100]}
              />
              <PolarAngleAxis
                dataKey="stat"
                tick={{ fill: '#c084fc', fontSize: 13, fontWeight: 'bold' }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, cumulativeScale]}
                tick={{ fill: '#9ca3af', fontSize: 11 }}
                ticks={Array.from({ length: 6 }, (_, i) => Math.round(cumulativeScale * i / 5))}
              />

              {/* 上週累積（紫色基底） */}
              {lastWeekCumulative && (
                <Radar
                  name="上週"
                  dataKey="value"
                  stroke="#a855f7"
                  fill="#a855f7"
                  fillOpacity={0.4}
                  strokeWidth={2}
                />
              )}

              {/* 本週累積（藍色疊加） */}
              {thisWeekCumulative && (
                <Radar
                  name="本週"
                  dataKey="value"
                  stroke="#60a5fa"
                  fill="#60a5fa"
                  fillOpacity={0.35}
                  strokeWidth={2}
                />
              )}
            </RadarChart>
          </ResponsiveContainer>

          {/* 累積數值（顯示小數） */}
          <div className={`grid ${todayProgress.length === 6 ? 'grid-cols-6' : 'grid-cols-5'} gap-1 mt-2`}>
            {todayProgress.map((item, index) => {
              const cumulative = thisWeekCumulative?.[index]?.value || lastWeekCumulative?.[index]?.value || 0
              return (
                <div key={item.stat} className="text-center">
                  <div className="text-xs text-gray-400">{item.stat}</div>
                  <div className="text-base font-bold text-purple-300">
                    {cumulative < 10 ? cumulative.toFixed(2) : cumulative.toFixed(1)}%
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 圖例 */}
      <div className="flex justify-center gap-6 mt-4 text-xs flex-wrap">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
          <span className="text-gray-400">今日任務 (0-100%)</span>
        </div>
        {lastWeekEnd > 0 && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-gray-400">Day 1-{lastWeekEnd} 累積</span>
          </div>
        )}
        {thisWeekStart <= currentDay && (
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-gray-400">Day {thisWeekStart}-{currentDay} 累積</span>
          </div>
        )}
      </div>

      {/* RSN 歷史記錄（移到下方） */}
      <div className="mt-6 border-t border-gray-700 pt-4">
        <h3 className="text-sm font-bold text-pink-300 mb-3 text-center">💗 共鳴記錄</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {rsnHistory && rsnHistory.length > 0 ? (
            rsnHistory.slice(0, 15).map((record, index) => (
              <div key={index} className="flex items-center gap-1 text-xs bg-gray-900/50 rounded px-2 py-1">
                <span className="text-pink-400">❤️</span>
                <span className="text-gray-400">{record.date}</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500">尚無共鳴記錄</p>
          )}
        </div>
      </div>
    </div>
  )
}
