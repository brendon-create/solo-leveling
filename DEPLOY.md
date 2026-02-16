# 部署指南

## 部署到 Render

### 準備工作

1. 確保你的代碼已推送到 GitHub 倉庫
2. 註冊或登入 [Render](https://render.com)

### 部署步驟

#### 方法一：使用 Render Dashboard（推薦新手）

1. 在 Render Dashboard 中，點擊 **"New +"** 按鈕
2. 選擇 **"Static Site"**
3. 連接你的 GitHub 帳號並選擇專案倉庫
4. 填寫以下配置：
   - **Name**: `100-days-challenge`（或你喜歡的名稱）
   - **Branch**: `main`（或你的主分支名稱）
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. 點擊 **"Create Static Site"**
6. 等待部署完成（通常需要 2-5 分鐘）
7. 部署完成後，Render 會提供一個 URL，例如：`https://100-days-challenge.onrender.com`

#### 方法二：使用 Blueprint（推薦進階使用者）

專案中已包含 `render.yaml` 配置文件，可以使用 Render 的 Blueprint 功能快速部署：

1. 在 Render Dashboard 中，點擊 **"New +"**
2. 選擇 **"Blueprint"**
3. 連接你的 GitHub 倉庫
4. Render 會自動檢測 `render.yaml` 並套用配置
5. 點擊 **"Apply"** 開始部署

### 自動部署

部署成功後，每次你推送新代碼到 GitHub，Render 會自動：
1. 拉取最新代碼
2. 執行建構命令
3. 部署新版本

### 自訂域名（可選）

1. 在 Render Dashboard 中進入你的 Static Site
2. 點擊 **"Settings"** 標籤
3. 在 **"Custom Domain"** 區域添加你的域名
4. 按照指示在你的 DNS 供應商處添加 CNAME 記錄
5. 等待 DNS 傳播（通常 5-60 分鐘）

### 環境變數（目前不需要）

如果未來需要添加環境變數：
1. 在 Render Dashboard 中進入你的 Static Site
2. 點擊 **"Environment"** 標籤
3. 添加所需的環境變數

### 疑難排解

#### 建構失敗

1. 檢查 Build Logs 查看錯誤信息
2. 確保 `package.json` 中的依賴都正確
3. 確認 Node 版本兼容（可在 `render.yaml` 中指定）

#### 頁面無法載入

1. 確認 **Publish Directory** 設置為 `dist`
2. 檢查 Build Logs 確認建構成功
3. 確認 `render.yaml` 中的路由配置正確

#### 樣式沒有載入

1. 確保 Tailwind CSS 正確配置
2. 檢查 `postcss.config.js` 配置
3. 重新建構並部署

### 其他部署平台

專案也可以部署到其他平台：

#### Vercel
```bash
npm install -g vercel
vercel
```

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### GitHub Pages
需要添加 `gh-pages` 套件並配置 `vite.config.js` 中的 `base` 路徑。

---

需要更多協助？查看 [Render 官方文檔](https://docs.render.com/deploy-vite) 或 [GitHub Issues](https://github.com/yourusername/100-days-challenge/issues)
