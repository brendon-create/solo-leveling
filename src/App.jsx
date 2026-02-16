import { useState, useEffect } from 'react'
import SetupPage from './components/SetupPage'
import Dashboard from './components/Dashboard'
import { initializeSheet, syncToSheet } from './services/googleSheets'

function App() {
  const [sheetUrl, setSheetUrl] = useState(() => {
    return localStorage.getItem('solo-leveling-sheet-url') || ''
  })
  const [isSetup, setIsSetup] = useState(() => {
    return !!localStorage.getItem('solo-leveling-sheet-url')
  })

  const handleSetupComplete = async (url) => {
    try {
      // 初始化 Google Sheet（創建必要的欄位）
      await initializeSheet(url)
      
      localStorage.setItem('solo-leveling-sheet-url', url)
      setSheetUrl(url)
      setIsSetup(true)
    } catch (error) {
      console.error('設置失敗:', error)
      alert('Google Sheet 設置失敗，請檢查 URL 是否正確並確保 Sheet 已設置為「知道連結的任何人都可以編輯」')
    }
  }

  const handleReset = () => {
    if (window.confirm('確定要重置 Google Sheet 連結嗎？這不會刪除您的數據，但需要重新設置。')) {
      localStorage.removeItem('solo-leveling-sheet-url')
      setSheetUrl('')
      setIsSetup(false)
    }
  }

  if (!isSetup) {
    return <SetupPage onSetupComplete={handleSetupComplete} />
  }

  return <Dashboard sheetUrl={sheetUrl} onReset={handleReset} />
}

export default App
