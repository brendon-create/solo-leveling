import { Component } from 'react'

/**
 * Error Boundary - 錯誤邊界组件
 * 用於捕獲 React 子组件的錯誤，防止整個應用程式崩潰成白畫面
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('🚨 Error Boundary 捕獲到錯誤:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = () => {
    // 清除所有 Solo RPG 相關的 localStorage
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('solo-rpg-')) {
          localStorage.removeItem(key)
        }
      })
      console.log('🗑️ 已清除所有 localStorage 資料')
    } catch (e) {
      console.error('清除 localStorage 失敗:', e)
    }
    
    // 重置狀態並重新載入頁面
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-gray-800 border-2 border-red-500 rounded-xl p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">😵</div>
              <h1 className="text-2xl font-bold text-red-400 mb-2">
                系統出現問題
              </h1>
              <p className="text-gray-400 text-sm">
                應用程式發生錯誤，請嘗試以下操作
              </p>
            </div>

            {/* 錯誤詳情（僅在開發環境顯示） */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg overflow-auto max-h-32">
                <p className="text-red-300 text-xs font-mono">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold rounded-lg transition-all duration-200 shadow-lg"
              >
                🗑️ 清除資料並重新開始
              </button>
              
              <button
                onClick={this.handleReload}
                className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-all duration-200"
              >
                🔄 重新載入頁面
              </button>
            </div>

            <p className="mt-4 text-center text-gray-500 text-xs">
              如果問題持續發生，請聯繫開發者
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
