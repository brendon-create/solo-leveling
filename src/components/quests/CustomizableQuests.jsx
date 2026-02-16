import { useState } from 'react'

export default function CustomizableQuests({
  title,
  icon,
  color,
  data = { tasks: [] },
  onUpdate
}) {
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingTasks, setEditingTasks] = useState(data.tasks || [])

  const toggle = (taskId) => {
    const newTasks = data.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    )
    onUpdate({ tasks: newTasks })
  }

  const handleSaveEdit = () => {
    onUpdate({ tasks: editingTasks })
    setShowEditModal(false)
  }

  const addTask = () => {
    setEditingTasks([...editingTasks, { id: `task_${Date.now()}`, name: '', completed: false }])
  }

  const removeTask = (index) => {
    setEditingTasks(editingTasks.filter((_, i) => i !== index))
  }

  const updateTaskName = (index, name) => {
    const newTasks = [...editingTasks]
    newTasks[index] = { ...newTasks[index], name }
    setEditingTasks(newTasks)
  }

  const completedCount = data.tasks?.filter(t => t.completed).length || 0
  const totalCount = data.tasks?.length || 0

  return (
    <div className={`bg-gray-800 border-2 border-${color}-500/50 rounded-xl p-6`}>
      <div className="flex items-center gap-2 mb-4">
        <h2 className={`text-2xl font-bold text-${color}-300`}>
          {icon} {title}
        </h2>
        <button
          onClick={() => {
            setEditingTasks(data.tasks || [])
            setShowEditModal(true)
          }}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          ⚙️ <span>修改項目內容</span>
        </button>
      </div>

      <div className="space-y-3">
        {data.tasks && data.tasks.length > 0 ? (
          data.tasks.map((task) => (
            <label key={task.id} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={task.completed || false}
                onChange={() => toggle(task.id)}
                className={`w-6 h-6 rounded border-2 border-${color}-500 bg-gray-700 checked:bg-${color}-500 cursor-pointer`}
              />
              <span className={`text-lg ${task.completed ? 'text-green-300 line-through' : 'text-gray-300'} group-hover:text-white transition-colors`}>
                {task.name}
              </span>
            </label>
          ))
        ) : (
          <p className="text-gray-500 text-sm">尚未設定項目，點擊右上角「修改項目內容」進行設定</p>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">
          今日完成: {completedCount} / {totalCount} 項
        </p>
      </div>

      {/* 編輯彈窗 */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border-2 border-purple-500 rounded-xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-purple-300 mb-4">編輯 {title} 項目</h3>

            <div className="space-y-3 mb-4">
              {editingTasks.map((task, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={task.name}
                    onChange={(e) => updateTaskName(index, e.target.value)}
                    placeholder={`項目 ${index + 1}`}
                    className="flex-1 px-3 py-2 bg-gray-900 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={() => removeTask(index)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addTask}
              className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg mb-4 transition-colors"
            >
              ＋ 新增項目
            </button>

            <div className="flex gap-3">
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                儲存
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
