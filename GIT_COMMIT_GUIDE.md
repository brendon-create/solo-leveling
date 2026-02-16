# 🚀 Git 提交指南

## 準備提交到 GitHub

你已經創建了 GitHub 倉庫：`https://github.com/brendon-create/solo-leveling`

現在讓我們將完整的專案推送上去！

## 📋 提交前檢查清單

### ✅ 文件完整性
- [x] 所有源代碼文件
- [x] 所有組件 (12 個組件)
- [x] Google Sheets 服務
- [x] 配置文件 (Tailwind, PostCSS, Vite)
- [x] 完整文檔 (9 個 Markdown 文件)
- [x] package.json 和依賴

### ✅ 建構測試
- [x] `npm run build` 成功
- [x] 無 linter 錯誤
- [x] 開發伺服器運行正常

### ✅ 文檔
- [x] README.md 更新
- [x] CHANGELOG.md 記錄
- [x] 部署指南完整

---

## 🔧 Git 操作步驟

### 步驟 1：初始化 Git 倉庫

```bash
cd /Users/brendonchen/Desktop/Solo-Leveling
git init
```

### 步驟 2：添加所有文件

```bash
git add .
```

### 步驟 3：創建詳細的提交信息

```bash
git commit -m "feat: 實現 RPG 風格自我提升追蹤系統 v2.0.0

🎮 核心功能
- 實現五大屬性系統 (STR/INT/MP/CRT/GOLD)
- 添加雷達圖視覺化展示
- 實現 HP 能量條系統
- 添加智能飲水追蹤（未達標置頂警告）
- 實現階梯式獎勵系統 (OK/Great/Best)

💗 特殊系統
- 添加共鳴系統與愛心動畫特效
- 實現酒精審計功能（非遊戲化設計）
- 感恩筆記記錄

☁️ Google Sheets 整合
- 支持用戶自訂 Google Sheet URL
- 自動初始化 Sheet 結構
- 即時數據同步（準備就緒）
- 完整的設置指南

🎨 UI/UX
- 深色 RPG 風格完整實現
- 紫色系主題配色
- 愛心飄浮動畫
- 完全響應式設計
- 自訂捲軸樣式

🔧 技術實現
- React 19 + Vite 7
- Tailwind CSS v4
- Recharts 雷達圖
- date-fns 日期處理
- localStorage + Google Sheets 雙重持久化
- 每日凌晨 4:00 自動重置邏輯

📚 文檔
- 完整的 Google Sheets 設置指南
- 詳細的專案結構說明
- 快速開始指南
- 部署就緒報告

---

組件數量：12 個
文檔文件：9 個
狀態：✅ 生產就緒"
```

### 步驟 4：連接遠端倉庫

```bash
git remote add origin https://github.com/brendon-create/solo-leveling.git
```

如果之前已經設置過 remote，先移除：
```bash
git remote remove origin
git remote add origin https://github.com/brendon-create/solo-leveling.git
```

### 步驟 5：設置主分支並推送

```bash
git branch -M main
git push -u origin main
```

---

## 🔍 驗證推送成功

推送完成後，訪問：
```
https://github.com/brendon-create/solo-leveling
```

你應該看到：
- ✅ 所有文件已上傳
- ✅ README.md 正確顯示
- ✅ 文件結構完整
- ✅ 提交訊息清晰

---

## ❌ 常見問題

### 問題 1：推送被拒絕

**錯誤訊息**：
```
! [rejected] main -> main (fetch first)
```

**原因**：遠端倉庫有本地沒有的提交

**解決方法**：
```bash
# 如果遠端是空的或可以覆蓋
git push -f origin main

# 或者先拉取再推送
git pull origin main --allow-unrelated-histories
git push origin main
```

### 問題 2：認證失敗

**錯誤訊息**：
```
remote: Invalid username or password
```

**解決方法**：
1. 使用 GitHub Personal Access Token（推薦）
2. 或使用 SSH 金鑰

**生成 Personal Access Token**：
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. 選擇 `repo` 權限
4. 複製 token（只顯示一次）
5. 在推送時使用 token 作為密碼

**或改用 SSH**：
```bash
git remote set-url origin git@github.com:brendon-create/solo-leveling.git
git push -u origin main
```

### 問題 3：文件太大

**錯誤訊息**：
```
remote: error: File XXX is XXX MB; this exceeds GitHub's file size limit
```

**解決方法**：
```bash
# 確保不要提交 node_modules 和 dist
git rm -r --cached node_modules dist
git commit -m "Remove large files"
git push
```

---

## 📝 .gitignore 檢查

確保 `.gitignore` 包含：
```
node_modules/
dist/
dist-ssr/
*.local
.DS_Store
.env
.env.local
```

---

## 🎯 推送後的下一步

### 1. 立即行動
- [ ] 訪問倉庫頁面確認推送成功
- [ ] 檢查 README.md 顯示是否正常
- [ ] 查看文件結構是否完整

### 2. 設置 GitHub Pages（可選）
如果想直接在 GitHub 上預覽：
1. 倉庫 → Settings → Pages
2. Source: Deploy from a branch
3. Branch: main → /dist (或重新建構到 docs 資料夾)
4. Save

### 3. 部署到 Render
按照 `DEPLOY.md` 或 `DEPLOYMENT_READY.md` 的指示：
1. 在 Render 連接倉庫
2. 使用 `render.yaml` 自動配置
3. 等待部署完成
4. 獲取部署 URL

### 4. 設置 Google Sheets
1. 訪問已部署的應用
2. 創建 Google Sheet
3. 配置權限
4. 開始使用！

---

## 🎉 完成！

推送成功後，你的代碼將：
- ✅ 安全儲存在 GitHub
- ✅ 可以隨時回滾到任何版本
- ✅ 準備好部署到 Render
- ✅ 可以與他人分享

**開始你的 Git 之旅吧！** 🚀

---

*提示：如果這是你第一次使用 Git，建議先熟悉基本命令：*
- `git status` - 查看狀態
- `git log` - 查看歷史
- `git diff` - 查看差異

更多 Git 操作請參考 `GIT_GUIDE.md`
