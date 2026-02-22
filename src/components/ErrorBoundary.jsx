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
      // 簡化的內聯樣式，確保在各種環境下都能顯示
      return (
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: '#111827', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '1rem',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{ 
            maxWidth: '28rem', 
            width: '100%', 
            backgroundColor: '#1f2937', 
            border: '2px solid #ef4444', 
            borderRadius: '0.75rem', 
            padding: '1.5rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>😵</div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#f87171', marginBottom: '0.5rem' }}>
                系統出現問題
              </h1>
              <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                應用程式發生錯誤，請嘗試以下操作
              </p>
            </div>

            {/* 錯誤詳情（始終顯示，方便診斷） */}
            {this.state.error && (
              <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: 'rgba(127, 29, 29, 0.3)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.5rem', overflow: 'auto', maxHeight: '8rem' }}>
                <p style={{ color: '#fca5a5', fontSize: '0.75rem', fontFamily: 'monospace' }}>
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '0.5rem', fontFamily: 'monospace' }}>
                    {this.state.errorInfo.componentStack}
                  </p>
                )}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <button
                onClick={this.handleReset}
                style={{ width: '100%', padding: '0.75rem 1.5rem', background: 'linear-gradient(to right, #dc2626, #db2777)', color: 'white', fontWeight: 'bold', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
              >
                🗑️ 清除資料並重新開始
              </button>
              
              <button
                onClick={this.handleReload}
                style={{ width: '100%', padding: '0.75rem 1.5rem', backgroundColor: '#374151', color: 'white', fontWeight: 'bold', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}
              >
                🔄 重新載入頁面
              </button>
            </div>

            <p style={{ marginTop: '1rem', textAlign: 'center', color: '#6b7280', fontSize: '0.75rem' }}>
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
