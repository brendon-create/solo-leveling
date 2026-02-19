// Google Sheets 整合服務
// 使用 Google Sheets Web App 作為後端 API

/**
 * 從 Google Sheets URL 提取 Sheet ID
 */
export const extractSheetId = (url) => {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  return match ? match[1] : null
}

/**
 * 檢查是否已過凌晨4點
 */
export const isAfter4AM = () => {
  const now = new Date()
  const hours = now.getHours()
  return hours >= 4
}

/**
 * 自動生成今日記錄（如果沒有今日記錄且已過凌晨4點）
 * 由前端的 fetchFromSheet 自動調用
 */
export const autoCreateDailyRecord = async () => {
  try {
    const webAppUrl = localStorage.getItem('solo-rpg-webapp-url')
    
    if (!webAppUrl) {
      console.warn('⚠️ 尚未設置 Apps Script Web App URL')
      return { success: false, action: 'no_url', message: 'No Web App URL configured' }
    }

    // 檢查是否已過凌晨4點
    if (!isAfter4AM()) {
      console.log('⏰ 尚未到凌晨4點，不執行自動生成')
      return { success: false, action: 'before_4am', message: 'Before 4 AM, skipping auto-creation' }
    }

    console.log('🔄 正在檢查並自動生成今日記錄...')

    // 呼叫 GAS 的 autoCreateDailyRecord 函數
    // 使用 exec 端點（與 doGet/doPost 相同）
    const scriptUrl = webAppUrl.replace(/\/exec$/, '').replace(/\/dev$/, '')
    const autoCreateUrl = `${scriptUrl}?action=autoCreateDailyRecord`
    
    const response = await fetch(autoCreateUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const text = await response.text()
    const result = JSON.parse(text)

    if (result.success) {
      console.log('✅ 自動生成結果:', result.action, result.message)
    } else {
      console.log('⚠️ 自動生成失敗:', result.message)
    }

    return result
  } catch (error) {
    console.error('❌ 自動生成今日記錄失敗:', error)
    return { success: false, error: error.toString() }
  }
}

/**
 * 初始化 Google Sheet（創建表頭）
 */
export const initializeSheet = async (sheetUrl) => {
  const sheetId = extractSheetId(sheetUrl)
  if (!sheetId) {
    throw new Error('無效的 Google Sheet URL')
  }

  // 檢查 Sheet 是否已經有數據
  // 如果是空的，創建表頭
  const headers = [
    'Date',
    'STR_Exercise_1', 'STR_Exercise_2', 'STR_Exercise_3',
    'STR_VO2Max', 'STR_BodyFat',
    'HP_Water', 'HP_WakeTime', 'HP_SleepTime', 'HP_Meals',
    'INT_Reading', 'INT_Italian', 'INT_Course',
    'MP_Scripture', 'MP_Prayer', 'MP_Journal',
    'CRT_Piano', 'CRT_Drawing',
    'GOLD_Income', 'GOLD_Action1', 'GOLD_Action2', 'GOLD_Action3',
    'RSN_Celebration', 'RSN_Gratitude',
    'ALCOHOL_Reason', 'ALCOHOL_Feeling',
    'Total_Days'
  ]

  // 注意：這需要配合 Google Apps Script 部署的 Web App
  // 用戶需要在說明中看到如何設置
  return { sheetId, headers }
}

/**
 * 同步數據到 Google Sheet
 */
export const syncToSheet = async (sheetUrl, data) => {
  const sheetId = extractSheetId(sheetUrl)
  if (!sheetId) {
    throw new Error('無效的 Google Sheet URL')
  }

  try {
    // 從 localStorage 讀取用戶設定的 Web App URL
    const webAppUrl = localStorage.getItem('solo-rpg-webapp-url')
    
    if (webAppUrl) {
      // 使用 Apps Script Web App
      console.log('正在同步數據到 Google Sheet...', data)
      
      const response = await fetch(webAppUrl, {
        method: 'POST',
        mode: 'no-cors', // 避免 CORS 問題
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      
      console.log('✅ 數據已發送到 Apps Script')
      return true
    } else {
      // 沒有設置 Web App URL，只在控制台提示
      console.warn('⚠️ 尚未設置 Apps Script Web App URL，數據僅保存在本地')
      console.log('數據內容:', data)
      return false
    }
  } catch (error) {
    console.error('❌ 同步失敗:', error)
    return false
  }
}

/**
 * 從 Google Sheet 讀取數據
 * 如果沒有今日數據且已過凌晨4點，會自動生成今日記錄
 */
export const fetchFromSheet = async () => {
  try {
    // 從 localStorage 讀取用戶設定的 Web App URL
    const webAppUrl = localStorage.getItem('solo-rpg-webapp-url')
    
    if (!webAppUrl) {
      console.warn('⚠️ 尚未設置 Apps Script Web App URL')
      return null
    }

    console.log('🔄 正在從 Google Sheet 讀取數據...')
    
    // 使用 GET 請求讀取數據
    const response = await fetch(webAppUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const text = await response.text()
    console.log('📥 收到回應長度:', text.length, '字元')
    
    const result = JSON.parse(text)
    
    if (result.success) {
      console.log('✅ 成功從雲端讀取數據', result.hasData ? '(有今日數據)' : '(無今日數據)')
      
      // 🔧 檢查是否需要自動生成今日記錄
      // 條件：沒有今日數據 + 已過凌晨4點 + 雲端有昨日數據可以繼承
      if (!result.hasData && isAfter4AM() && result.questData) {
        console.log('⏰ 沒有今日數據且已過凌晨4點，嘗試自動生成...')
        
        // 呼叫 autoCreateDailyRecord
        const autoResult = await autoCreateDailyRecord()
        
        if (autoResult.success && (autoResult.action === 'created' || autoResult.action === 'already_exists')) {
          console.log('✅ 自動生成完成，重新讀取數據...')
          
          // 重新讀取數據
          const reResponse = await fetch(webAppUrl, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          })
          
          if (reResponse.ok) {
            const reText = await reResponse.text()
            const reResult = JSON.parse(reText)
            
            if (reResult.success && reResult.hasData) {
              console.log('✅ 重新讀取成功，獲得今日數據')
              return {
                questData: reResult.questData,
                totalDays: reResult.totalDays,
                lastUpdate: reResult.lastUpdate,
                historyData: reResult.historyData || null,
                scriptVersion: reResult.scriptVersion || null,
                hasData: true
              }
            }
          }
        }
      }
      
      // 即使 hasData: false，也返回 totalDays 和 scriptVersion（如果有的话）
      if (result.hasData) {
        // 有今日數據，返回完整數據
        if (result.historyData) {
          console.log('📚 包含歷史數據:', result.historyData.length, '天')
        }
        return {
          questData: result.questData,
          totalDays: result.totalDays,
          lastUpdate: result.lastUpdate,
          historyData: result.historyData || null,
          scriptVersion: result.scriptVersion || null,
          hasData: true
        }
      } else {
        // 沒有今日數據，但仍返回 totalDays 和 historyData（如果有的话）
        console.log('ℹ️ 雲端尚無今日數據，但有歷史記錄:', result.totalDays, '天')
        return {
          questData: null,
          totalDays: result.totalDays || 1,
          lastUpdate: null,
          historyData: result.historyData || null,
          scriptVersion: result.scriptVersion || null,
          hasData: false
        }
      }
    } else {
      console.log('ℹ️ 雲端讀取失敗')
      return null
    }
  } catch (error) {
    console.error('❌ 從雲端讀取數據失敗:', error)
    return null
  }
}
