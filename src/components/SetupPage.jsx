import { useState } from 'react'

export default function SetupPage({ onSetupComplete }) {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const playerName = localStorage.getItem('solo-leveling-player-name') || 'Player'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url.includes('docs.google.com/spreadsheets')) {
      alert('請輸入有效的 Google Sheets URL')
      return
    }

    setIsLoading(true)
    try {
      await onSetupComplete(url)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gray-800 border-2 border-purple-500 rounded-xl p-8 shadow-2xl">
          {/* 標題 */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-4">
              ⚔️ Solo Leveling
            </h1>
            <p className="text-xl text-purple-300 mb-2">{playerName} Edition</p>
            <p className="text-gray-400 text-sm">成為更強大的自己</p>
          </div>

          {/* 說明 */}
          <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-bold text-purple-300 mb-3">📋 設置步驟</h2>
            <ol className="text-gray-300 space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-purple-400 font-bold mr-2">1.</span>
                <span>開啟 <a href="https://sheets.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Google Sheets</a> 並創建一個新的空白試算表</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 font-bold mr-2">2.</span>
                <span>點擊右上角「共用」按鈕，將權限設置為「知道連結的任何人都可以編輯」</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 font-bold mr-2">3.</span>
                <span>複製試算表的 URL 並貼到下方</span>
              </li>
            </ol>
          </div>

          {/* 輸入表單 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="sheet-url" className="block text-sm font-medium text-purple-300 mb-2">
                Google Sheets URL
              </label>
              <input
                id="sheet-url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                className="w-full px-4 py-3 bg-gray-900 border-2 border-purple-500/50 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '設置中...' : '🚀 開始冒險'}
            </button>
          </form>

          {/* 注意事項 */}
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-300 text-xs">
              ⚠️ <strong>重要：</strong>請確保 Google Sheet 設置為「可編輯」權限，否則應用無法儲存數據。
            </p>
          </div>
        </div>

        {/* 底部說明 */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>你的數據將安全儲存在你自己的 Google Sheet 中</p>
          <p className="mt-1">沒有第三方伺服器，完全掌控你的數據</p>
        </div>
      </div>
    </div>
  )
}
