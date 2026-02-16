# 專案結構說明

```
Solo-Leveling/
├── public/                      # 靜態資源
├── src/
│   ├── components/             # React 組件
│   │   ├── SetupPage.jsx      # Google Sheets 設置頁面
│   │   ├── Dashboard.jsx      # 主儀表板
│   │   ├── StatsRadar.jsx     # 五維雷達圖
│   │   ├── HPBar.jsx          # HP 能量條
│   │   ├── AlcoholAudit.jsx   # 酒精審計記錄
│   │   └── quests/            # 任務組件
│   │       ├── HPQuests.jsx   # 生命/作息任務
│   │       ├── STRQuests.jsx  # 體力/運動任務
│   │       ├── INTQuests.jsx  # 智力/學習任務
│   │       ├── MPQuests.jsx   # 魔力/靈性任務
│   │       ├── CRTQuests.jsx  # 創造力任務
│   │       ├── GOLDQuests.jsx # 財力/事業任務
│   │       └── RSNQuests.jsx  # 共鳴/感恩任務
│   ├── services/              # 服務層
│   │   └── googleSheets.js    # Google Sheets API 整合
│   ├── App.jsx                # 主應用入口
│   ├── main.jsx               # React 渲染入口
│   └── index.css              # 全局樣式（深色 RPG 風格）
├── node_modules/              # 依賴套件
├── dist/                      # 建構輸出
├── .gitignore                # Git 忽略配置
├── index.html                # HTML 模板
├── package.json              # 專案配置
├── postcss.config.js         # PostCSS 配置
├── tailwind.config.js        # Tailwind CSS 配置
├── vite.config.js            # Vite 建構配置
├── render.yaml               # Render 部署配置
├── README.md                 # 專案說明
├── QUICKSTART.md             # 快速開始指南
├── GOOGLE_SHEETS_SETUP.md    # Google Sheets 設置教學
├── DEPLOY.md                 # 部署指南
├── CHANGELOG.md              # 更新日誌
└── PROJECT_STRUCTURE.md      # 本文件
```

## 📁 核心組件說明

### App.jsx
應用主入口，負責：
- 檢查 Google Sheet 設置狀態
- 路由到設置頁面或儀表板
- 管理全局狀態

### SetupPage.jsx
Google Sheets 設置頁面：
- 引導用戶創建和配置 Google Sheet
- 驗證 Sheet URL 格式
- 初始化 Sheet 結構

### Dashboard.jsx
主要遊戲儀表板：
- 統籌所有任務組件
- 計算五大屬性數值
- 管理雷達圖和 HP 條數據
- 處理每日凌晨 4:00 自動重置
- 同步數據到 Google Sheets

### StatsRadar.jsx
五維雷達圖組件：
- 使用 Recharts 繪製雷達圖
- 即時顯示 STR/INT/MP/CRT/GOLD 數值
- 深色 RPG 風格視覺化

### HPBar.jsx
HP 能量條組件：
- 根據作息和飲食計算 HP 值
- 動態顏色（綠/黃/紅）
- 百分比視覺化顯示

### 任務組件 (Quests)

#### HPQuests.jsx
生命值任務（最高優先級）：
- **飲水追蹤** - +200/300/500cc 按鈕，未達 2400cc 時置頂警告
- **起床時間** - 05:00 (Best) / 05:30 (Great) / 06:00 (OK)
- **就寢時間** - 21:00 (Best) / 21:30 (Great) / 22:00 (OK)
- **飲食營養** - 一餐/兩餐/兩餐+禁食三級制

#### STRQuests.jsx
體力任務：
- 慢跑勾選
- 重訓勾選
- HIIT 勾選
- 階梯獎勵：1 項=OK, 2 項=Great, 3 項=Best

#### INTQuests.jsx
智力任務：
- 📚 閱讀 15 分鐘
- 🇮🇹 義大利文 5 分鐘
- 🎓 線上課程 15 分鐘

#### MPQuests.jsx
魔力/靈性任務：
- 📖 讀經
- 🙏 禱告
- ✍️ 靈性日記

#### CRTQuests.jsx
創造力任務：
- 🎹 練琴 10 分鐘
- 🖌️ 畫畫 10 分鐘

#### GOLDQuests.jsx
財力任務：
- 💵 收入數字輸入框
- 📈 三項事業關鍵行動勾選

#### RSNQuests.jsx
共鳴/感恩任務：
- ❤️ 慶祝按鈕（帶愛心動畫特效）
- 📝 感恩筆記文字框

### AlcoholAudit.jsx
酒精審計組件（非遊戲化）：
- 純灰色界面，無特效
- 記錄飲酒理由
- 記錄身體和心理狀態
- 僅用於自我覺察

## 🔧 服務層

### googleSheets.js
Google Sheets API 整合服務：
- `extractSheetId()` - 從 URL 提取 Sheet ID
- `initializeSheet()` - 初始化 Sheet 結構
- `syncToSheet()` - 同步數據到 Sheet
- `fetchFromSheet()` - 讀取 Sheet 數據

## 🎨 樣式系統

### Tailwind CSS 配置
- **主題色**：紫色系 (purple-400 ~ purple-900)
- **強調色**：粉紅色 (pink-400 ~ pink-600)
- **屬性顏色**：
  - STR: 紅色
  - INT: 藍色
  - MP: 紫色
  - CRT: 粉紅色
  - GOLD: 黃色

### 自訂動畫
- `animate-float-up` - 愛心飄浮動畫
- 自訂捲軸樣式（紫色主題）

## 📊 數據流

```
用戶操作
  ↓
任務組件 (onUpdate)
  ↓
Dashboard (updateQuest)
  ↓
localStorage (本地備份)
  ↓
googleSheets.syncToSheet (雲端同步)
  ↓
Google Sheet
```

## 🔄 每日重置邏輯

位於 `Dashboard.jsx` 的 `useState` 初始化：
```javascript
// 檢查是否需要重置（凌晨 4 點）
const lastDate = data.lastUpdate
const now = new Date()
const resetTime = new Date()
resetTime.setHours(4, 0, 0, 0)

if (lastDate && new Date(lastDate) < resetTime && now >= resetTime) {
  return getInitialQuestData() // 重置
}
```

## 💾 數據持久化

### localStorage 結構
```javascript
{
  'solo-leveling-sheet-url': 'Google Sheet URL',
  'solo-leveling-quests': {
    str: { jogging, weightTraining, hiit },
    hp: { water, wakeTime, sleepTime, meals },
    int: { reading, italian, course },
    mp: { scripture, prayer, journal },
    crt: { piano, drawing },
    gold: { income, action1, action2, action3 },
    rsn: { celebrated, gratitude },
    alcohol: { reason, feeling },
    lastUpdate: 'ISO timestamp'
  },
  'solo-leveling-total-days': '累計天數'
}
```

## 🚀 性能優化

- ✅ 使用 Vite 快速建構
- ✅ Recharts 按需載入
- ✅ localStorage 減少網路請求
- ✅ 組件化設計便於代碼分割
- ✅ Tailwind CSS 生產環境自動優化

## 🧪 開發工作流

```bash
# 開發模式（熱重載）
npm run dev

# 程式碼檢查
npm run lint

# 建構生產版本
npm run build

# 預覽生產版本
npm run preview
```

## 📦 依賴套件

### 核心依賴
- `react` ^19.2.0
- `react-dom` ^19.2.0
- `recharts` - 雷達圖視覺化
- `date-fns` - 日期處理

### 開發依賴
- `vite` ^7.3.1
- `tailwindcss` ^4.1.18
- `@tailwindcss/postcss` - Tailwind v4 PostCSS 插件
- `autoprefixer` - CSS 自動添加瀏覽器前綴

## 🎯 未來擴展

考慮添加的功能：
- [ ] VO2 Max 和體脂追蹤輸入
- [ ] 自訂事業行動名稱
- [ ] 歷史數據視覺化頁面
- [ ] 成就徽章系統
- [ ] 每週/每月總結報告
- [ ] 多語言支持
- [ ] PWA 離線支持
- [ ] 通知提醒功能

---

**需要更詳細的說明？** 查看各個文件的內聯註釋或參考其他文檔！
