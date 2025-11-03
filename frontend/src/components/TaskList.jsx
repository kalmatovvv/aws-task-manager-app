import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete, onToggleStatus, isLoading }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-gray-500 text-lg">No tasks found. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}

export default TaskList;

