# 🚀 快速開始指南

歡迎使用 100 天自我升級挑戰追蹤器！這是一個快速開始指南，幫助你在 5 分鐘內啟動專案。

## 📋 前置需求

確保你的電腦已安裝：

- **Node.js** (v18 或更高版本)
  - 檢查版本：`node --version`
  - 下載：[nodejs.org](https://nodejs.org/)
  
- **npm** (通常隨 Node.js 一起安裝)
  - 檢查版本：`npm --version`

- **Git** (用於版本控制)
  - 檢查版本：`git --version`
  - 下載：[git-scm.com](https://git-scm.com/)

## ⚡ 三步驟啟動

### 1️⃣ 安裝依賴

在專案根目錄執行：

```bash
npm install
```

⏱️ 大約需要 30 秒

### 2️⃣ 啟動開發伺服器

```bash
npm run dev
```

🎉 開發伺服器啟動成功！

### 3️⃣ 打開瀏覽器

開發伺服器會顯示本地 URL，通常是：

```
http://localhost:5173
```

在瀏覽器中打開這個 URL，你就可以看到應用程式了！

## 🎮 如何使用

1. **點擊日期方塊**：標記該天為完成狀態（變成綠色）
2. **再次點擊**：取消標記
3. **查看統計**：頂部卡片顯示即時統計
4. **重置進度**：底部按鈕可以清空所有記錄

## 📦 其他命令

### 建構生產版本

```bash
npm run build
```

輸出到 `dist/` 目錄

### 預覽生產版本

```bash
npm run preview
```

在 `http://localhost:4173` 查看

### 程式碼檢查

```bash
npm run lint
```

## 📱 測試響應式設計

### 桌面視圖
- 正常打開瀏覽器即可

### 手機視圖
1. 按 F12 打開開發者工具
2. 點擊裝置工具列圖示（或按 Ctrl+Shift+M）
3. 選擇不同的裝置尺寸測試

## 🐛 遇到問題？

### 端口已被佔用

如果 5173 端口被佔用，Vite 會自動使用下一個可用端口（如 5174）

### 樣式沒有載入

1. 確認 Tailwind CSS 已正確安裝
2. 重新啟動開發伺服器
3. 清除瀏覽器快取（Ctrl+Shift+R）

### 依賴安裝失敗

```bash
# 清除快取並重新安裝
rm -rf node_modules package-lock.json
npm install
```

### 建構失敗

檢查 Node.js 版本是否符合要求：
```bash
node --version  # 應該是 v18 或更高
```

## 📚 下一步

- 📖 閱讀 [README.md](README.md) 了解更多功能
- 🚀 查看 [DEPLOY.md](DEPLOY.md) 學習如何部署
- 💻 查看 [GIT_GUIDE.md](GIT_GUIDE.md) 學習如何使用 Git
- 🏗️ 查看 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) 了解專案結構

## 🎯 開始你的 100 天挑戰！

現在你已經準備好了，開始追蹤你的進度吧！

記住：**堅持 100 天，成就更好的自己！** 💪

---

需要幫助？提交 Issue 或查看文檔！
