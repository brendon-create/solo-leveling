export default function DayGrid({ days, onToggleDay }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
      <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-10 gap-2 md:gap-3">
        {days.map((completed, index) => (
          <button
            key={index}
            onClick={() => onToggleDay(index)}
            className={`
              aspect-square rounded-lg font-bold text-xs md:text-sm
              transition-all duration-200 transform hover:scale-110
              ${
                completed
                  ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-md hover:shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600 border-2 border-gray-200'
              }
            `}
            title={`第 ${index + 1} 天`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-100 border-2 border-gray-200 rounded"></div>
          <span>未完成</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded"></div>
          <span>已完成</span>
        </div>
      </div>
    </div>
  )
}
