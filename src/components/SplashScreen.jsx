import { useState, useEffect } from 'react';

/**
 * 進場畫面 Splash Screen
 * 顯示 Logo 浮現動畫，載入完成後淡出
 */
export default function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  useEffect(() => {
    // 動畫持續 2.5 秒後開始淡出
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);
    
    // 淡出完成後通知父元件
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 3000);
    
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center transition-opacity duration-1000 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Logo 圖片 - 浮現 + 放大動畫 */}
      <div className="relative">
        {/* 光暈效果 */}
        <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-3xl scale-150 animate-pulse"></div>
        
        {/* Logo 本體 */}
        <img 
          src="/logo.png" 
          alt="Solo RPG"
          className={`w-32 h-32 md:w-40 md:h-40 relative z-10 animate-bounce-in ${
            isFadingOut ? 'scale-110' : 'scale-100'
          }`}
          style={{
            animation: isFadingOut 
              ? 'bounceOut 1s ease-out forwards' 
              : 'bounceIn 1s ease-out, pulse 2s ease-in-out infinite'
          }}
        />
        
        {/* 標題文字 - 淡入效果 */}
        <h1 className={`text-center mt-6 text-2xl md:text-3xl font-bold text-purple-300 ${
          isFadingOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        } transition-all duration-700`}
        style={{ transitionDelay: isFadingOut ? '0ms' : '500ms' }}
        >
          ⚔️ Solo RPG
        </h1>
        
        {/* 副標題 */}
        <p className={`text-center text-sm text-gray-400 mt-2 ${
          isFadingOut ? 'opacity-0' : 'opacity-100'
        } transition-opacity duration-700`}
        style={{ transitionDelay: isFadingOut ? '0ms' : '800ms' }}
        >
          100 天自我升級挑戰
        </p>
      </div>
      
      {/* CSS 動畫定義 */}
      <style>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes bounceOut {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
