export default function ProgressBar({ percentage }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden shadow-inner">
      <div
        className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-3"
        style={{ width: `${percentage}%` }}
      >
        {percentage > 10 && (
          <span className="text-white text-xs font-bold drop-shadow-md">
            {percentage.toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  )
}
