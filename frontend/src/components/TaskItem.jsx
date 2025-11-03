function TaskItem({ task, onEdit, onDelete, onToggleStatus, isLoading }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ');
  };

  const getNextStatus = (currentStatus) => {
    if (currentStatus === 'pending') return 'in_progress';
    if (currentStatus === 'in_progress') return 'completed';
    return 'pending';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex-1 mr-2">
          {task.title}
        </h3>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
            task.status
          )}`}
        >
          {formatStatus(task.status)}
        </span>
      </div>

      {task.description && (
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onToggleStatus(task.id, getNextStatus(task.status))}
          disabled={isLoading}
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {task.status === 'completed' ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <button
          onClick={() => onEdit(task)}
          disabled={isLoading}
          className="px-3 py-1.5 text-sm bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          disabled={isLoading}
          className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;

