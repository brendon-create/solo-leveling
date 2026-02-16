# Google Sheet 欄位對照表

## ⚠️ 重要說明

你的 Google Sheet 使用了**舊版 header**，缺少了很多新增的欄位，這導致數據對應錯誤！

## 📊 完整欄位列表（按順序）

以下是 Apps Script 發送的數據欄位，與 Google Sheet header 必須**完全一致**：

| 欄位編號 | Google Sheet Header | App 數據來源 | 說明 |
|---------|-------------------|------------|------|
| 1 | 日期 | `todayDateString` | YYYY-MM-DD 格式 |
| 2 | 最後更新時間 | `new Date()` | 時間戳記 |
| 3 | STR_慢跑 | `data.str.jogging` | TRUE/FALSE |
| 4 | STR_重訓 | `data.str.weightTraining` | TRUE/FALSE |
| 5 | STR_HIIT | `data.str.hiit` | TRUE/FALSE |
| 6 | STR_VO2Max當前值 | `data.str.goals.vo2Max.current` | 數字 |
| 7 | STR_體脂當前值 | `data.str.goals.bodyFat.current` | 數字 |
| 8 | STR_5K跑步當前值(分) | `data.str.goals.run5k.current` | 數字 |
| 9 | HP_飲水(cc) | `data.hp.water` | 數字 |
| 10 | HP_起床時間 | `data.hp.wakeTime` | best/great/ok/late |
| 11 | HP_就寢時間 | `data.hp.sleepTime` | best/great/ok/late |
| 12 | HP_早餐自炊 | `data.hp.meals.breakfast` | TRUE/FALSE |
| 13 | HP_午餐自炊 | `data.hp.meals.lunch` | TRUE/FALSE |
| 14 | HP_晚餐自炊 | `data.hp.meals.dinner` | TRUE/FALSE |
| 15 | HP_早餐禁食 | `data.hp.fasting.breakfastFast` | TRUE/FALSE |
| 16 | HP_晚餐禁食 | `data.hp.fasting.dinnerFast` | TRUE/FALSE |
| 17 | HP_全日禁食 | `data.hp.fasting.fullDayFast` | TRUE/FALSE |
| 18 | INT_閱讀 | `data.int.reading` | TRUE/FALSE |
| 19 | INT_義大利文 | `data.int.italian` | TRUE/FALSE |
| 20 | INT_課程 | `data.int.course` | TRUE/FALSE |
| 21 | MP_讀經 | `data.mp.scripture` | TRUE/FALSE |
| 22 | MP_禱告 | `data.mp.prayer` | TRUE/FALSE |
| 23 | MP_日記 | `data.mp.journal` | TRUE/FALSE |
| 24 | CRT_練琴 | `data.crt.piano` | TRUE/FALSE |
| 25 | CRT_畫畫 | `data.crt.drawing` | TRUE/FALSE |
| 26 | GOLD_收入 | `data.gold.income` | 數字或空字串 |
| 27 | GOLD_行動1完成 | `data.gold.action1Done` | TRUE/FALSE |
| 28 | GOLD_行動1內容 | `data.gold.action1Text` | 文字 |
| 29 | GOLD_行動2完成 | `data.gold.action2Done` | TRUE/FALSE |
| 30 | GOLD_行動2內容 | `data.gold.action2Text` | 文字 |
| 31 | GOLD_行動3完成 | `data.gold.action3Done` | TRUE/FALSE |
| 32 | GOLD_行動3內容 | `data.gold.action3Text` | 文字 |
| 33 | RSN_慶祝 | `data.rsn.celebrated` | TRUE/FALSE |
| 34 | RSN_感恩筆記 | `data.rsn.gratitude` | 文字 |
| 35 | 酒精_理由 | `data.alcohol.reason` | 文字 |
| 36 | 酒精_感受 | `data.alcohol.feeling` | 文字 |

**總共：36 個欄位**

---

## 🔴 你的舊版 Header 問題

你目前的 Google Sheet header：

```
日期 | STR_慢跑 | STR_重訓 | STR_HIIT | HP_飲水(cc) | HP_起床時間 | HP_就寢時間 | HP_飲食 | INT_閱讀 | INT_義大利文 | INT_課程 | MP_讀經 | MP_禱告 | MP_日記 | CRT_練琴 | CRT_畫畫 | GOLD_收入 | GOLD_行動1 | GOLD_行動2 | GOLD_行動3 | RSN_感恩筆記 | 酒精_理由 | 酒精_感受
```

**缺少的欄位：**
1. ❌ 最後更新時間（導致所有數據往後挪一格！）
2. ❌ STR_VO2Max當前值
3. ❌ STR_體脂當前值
4. ❌ STR_5K跑步當前值(分)
5. ❌ HP_早餐自炊、HP_午餐自炊、HP_晚餐自炊（取代了單一的"HP_飲食"）
6. ❌ HP_早餐禁食、HP_晚餐禁食、HP_全日禁食
7. ❌ GOLD_行動1完成、GOLD_行動1內容（取代了單一的"GOLD_行動1"）
8. ❌ GOLD_行動2完成、GOLD_行動2內容（取代了單一的"GOLD_行動2"）
9. ❌ GOLD_行動3完成、GOLD_行動3內容（取代了單一的"GOLD_行動3"）
10. ❌ RSN_慶祝（多了這個欄位）

---

## 🛠️ 修正方法

### 選項1：刪除舊資料，重新初始化（推薦）

1. 打開你的 Google Sheet
2. **刪除第一列（header）和所有資料行**
3. 打開 Apps Script（擴充功能 → Apps Script）
4. 確認代碼是最新版本（與 `google-apps-script.js` 相同）
5. **不需要重新部署**，只要存檔即可
6. 回到 App，進行任何操作
7. Apps Script 會自動創建新的 header（36個欄位）

### 選項2：手動修改 Header（不推薦，容易出錯）

在 Google Sheet 的第一列手動輸入以下 header（從 A1 開始）：

```
日期 | 最後更新時間 | STR_慢跑 | STR_重訓 | STR_HIIT | STR_VO2Max當前值 | STR_體脂當前值 | STR_5K跑步當前值(分) | HP_飲水(cc) | HP_起床時間 | HP_就寢時間 | HP_早餐自炊 | HP_午餐自炊 | HP_晚餐自炊 | HP_早餐禁食 | HP_晚餐禁食 | HP_全日禁食 | INT_閱讀 | INT_義大利文 | INT_課程 | MP_讀經 | MP_禱告 | MP_日記 | CRT_練琴 | CRT_畫畫 | GOLD_收入 | GOLD_行動1完成 | GOLD_行動1內容 | GOLD_行動2完成 | GOLD_行動2內容 | GOLD_行動3完成 | GOLD_行動3內容 | RSN_慶祝 | RSN_感恩筆記 | 酒精_理由 | 酒精_感受
```

然後**刪除所有舊資料行**（因為欄位數量不匹配）

---

## ✅ 驗證方法

修正後，測試以下操作：

1. 在 App 中勾選「INT_閱讀」（只勾這一個）
2. 等待5秒讓數據同步到 Google Sheet
3. 檢查 Google Sheet：
   - **第18欄（INT_閱讀）** 應該是 `TRUE`
   - **第19欄（INT_義大利文）** 應該是 `FALSE`
   - **第20欄（INT_課程）** 應該是 `FALSE`

4. 在 App 中填寫「GOLD_行動1內容」（例如："完成產品設計"）
5. 檢查 Google Sheet：
   - **第28欄（GOLD_行動1內容）** 應該顯示你輸入的文字

---

## 📝 常見問題

**Q: 為什麼會有"最後更新時間"這個欄位？**  
A: 這是為了追蹤每次數據更新的時間戳記，方便日後分析和除錯。

**Q: 我可以改變欄位順序嗎？**  
A: 不建議。Apps Script 是按照固定順序發送數據的，改變順序會導致對應錯誤。

**Q: 如何確認我的 Apps Script 是最新版本？**  
A: 檢查 `initializeSheet` 函數中的 `headers` 陣列是否有 36 個欄位。
