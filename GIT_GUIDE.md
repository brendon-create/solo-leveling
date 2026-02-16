# Git 和 GitHub 指南

## 初始化 Git 倉庫

### 1. 初始化本地倉庫

在專案根目錄執行：

```bash
git init
```

### 2. 添加所有文件

```bash
git add .
```

### 3. 創建第一次提交

```bash
git commit -m "Initial commit: 100 天挑戰追蹤器"
```

## 推送到 GitHub

### 1. 在 GitHub 上創建新倉庫

1. 登入 [GitHub](https://github.com)
2. 點擊右上角的 "+" 按鈕
3. 選擇 "New repository"
4. 填寫倉庫資訊：
   - **Repository name**: `100-days-challenge`（或你喜歡的名稱）
   - **Description**: "一個簡潔美觀的 100 天挑戰追蹤器"
   - **Public** 或 **Private**（根據需求選擇）
   - **不要**勾選 "Initialize this repository with a README"（因為我們已經有了）
5. 點擊 "Create repository"

### 2. 連接遠端倉庫

將 `YOUR_USERNAME` 替換為你的 GitHub 用戶名：

```bash
git remote add origin https://github.com/YOUR_USERNAME/100-days-challenge.git
```

### 3. 推送代碼

```bash
git branch -M main
git push -u origin main
```

## 日常工作流程

### 修改代碼後提交

```bash
# 查看修改的文件
git status

# 添加修改的文件
git add .

# 或添加特定文件
git add src/App.jsx

# 提交修改
git commit -m "描述你的修改"

# 推送到 GitHub
git push
```

### 常用 Git 命令

```bash
# 查看提交歷史
git log

# 查看簡潔的提交歷史
git log --oneline

# 查看當前狀態
git status

# 查看修改內容
git diff

# 撤銷未暫存的修改
git checkout -- <文件名>

# 撤銷已暫存的修改
git reset HEAD <文件名>

# 修改最後一次提交
git commit --amend
```

## 分支管理（進階）

### 創建新分支

```bash
# 創建並切換到新分支
git checkout -b feature/new-feature

# 或使用新語法
git switch -c feature/new-feature
```

### 合併分支

```bash
# 切換回 main 分支
git checkout main

# 合併功能分支
git merge feature/new-feature

# 推送合併後的代碼
git push
```

### 刪除分支

```bash
# 刪除本地分支
git branch -d feature/new-feature

# 刪除遠端分支
git push origin --delete feature/new-feature
```

## 常見問題

### 推送被拒絕

如果遠端有新的提交：

```bash
# 拉取遠端更新
git pull

# 解決衝突（如果有）

# 再次推送
git push
```

### 忘記添加 .gitignore

如果已經提交了不該提交的文件：

```bash
# 從 Git 移除但保留本地文件
git rm --cached <文件名>

# 提交修改
git commit -m "Remove tracked files"
git push
```

### 查看遠端倉庫

```bash
git remote -v
```

## 最佳實踐

1. **經常提交**：小而頻繁的提交比大而稀少的提交更好
2. **清晰的提交信息**：使用描述性的提交信息
3. **使用分支**：為新功能或修復創建單獨的分支
4. **定期推送**：不要讓本地代碼積累太久
5. **檢查狀態**：提交前使用 `git status` 檢查

## 提交信息範例

```bash
# 新功能
git commit -m "Add: 深色模式切換功能"

# 修復錯誤
git commit -m "Fix: 修復重置按鈕無法工作的問題"

# 更新樣式
git commit -m "Update: 改進移動端響應式佈局"

# 重構代碼
git commit -m "Refactor: 簡化 DayGrid 組件邏輯"

# 文檔更新
git commit -m "Docs: 更新 README 部署說明"
```

## 推送到 GitHub 後

1. 倉庫 URL 將是：`https://github.com/YOUR_USERNAME/100-days-challenge`
2. 你可以在這個 URL 查看和分享你的代碼
3. 現在可以按照 `DEPLOY.md` 的指示部署到 Render 了

---

需要更多幫助？查看 [GitHub 官方文檔](https://docs.github.com) 或 [Git 教學](https://git-scm.com/book/zh-tw/v2)
