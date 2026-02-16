export default function StatsCard({ title, value, total, color, bgColor }) {
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-200`}>
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className={`${color} text-3xl md:text-4xl font-bold`}>
        {value}
        {total && <span className="text-xl text-gray-400 ml-1">/ {total}</span>}
      </p>
    </div>
  )
}
