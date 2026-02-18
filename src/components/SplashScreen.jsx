import { useState, useEffect } from 'react';

/**
 * 進場畫面 Splash Screen
 * 顯示 Logo 浮現動畫，停留 2 秒後放大淡出
 */
export default function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState('bounce'); // 'bounce' | 'wait' | 'fadeOut'
  
  useEffect(() => {
    // 階段 1: 彈跳進場動畫 (0-1s)
    const waitTimer = setTimeout(() => {
      setAnimationPhase('wait');
    }, 1000);
    
    // 階段 2: 停留顯示 (1-2s) - 使用者可以看到 Logo
    const fadeStartTimer = setTimeout(() => {
      setAnimationPhase('fadeOut');
    }, 2000);
    
    // 階段 3: 放大淡出完成 (2.5s)
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 2500);
    
    return () => {
      clearTimeout(waitTimer);
      clearTimeout(fadeStartTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center transition-all duration-1000 ${
        animationPhase === 'fadeOut' ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      {/* Logo 圖片 */}
      <div className="relative">
        {/* 光暈效果 */}
        <div className="absolute inset-0 rounded-full bg-purple-500/30 blur-3xl scale-150 animate-pulse"></div>
        
        {/* Logo 本體 */}
        <img 
          src="/logo.png" 
          alt="Solo RPG"
          className={`w-32 h-32 md:w-40 md:h-40 relative z-10 ${
            animationPhase === 'bounce' ? 'animate-bounce-in' : ''
          } ${animationPhase === 'fadeOut' ? 'scale-125' : 'scale-100'}`}
          style={{
            transition: 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out',
            transform: animationPhase === 'fadeOut' ? 'scale(1.3)' : 'scale(1)',
            opacity: animationPhase === 'fadeOut' ? 0 : 1
          }}
        />
        
        {/* 標題文字 */}
        <h1 
          className="text-center mt-6 text-2xl md:text-3xl font-bold text-purple-300"
          style={{
            transition: 'opacity 0.8s ease-in-out',
            opacity: animationPhase === 'fadeOut' ? 0 : 1
          }}
        >
          ⚔️ Solo RPG
        </h1>
        
        {/* 副標題 */}
        <p 
          className="text-center text-sm text-gray-400 mt-2"
          style={{
            transition: 'opacity 0.8s ease-in-out',
            opacity: animationPhase === 'fadeOut' ? 0 : 1
          }}
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
            transform: scale(1.15);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
