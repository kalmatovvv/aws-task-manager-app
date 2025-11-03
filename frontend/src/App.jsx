import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { taskService } from './utils/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to fetch tasks'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newTask = await taskService.create(taskData);
      setTasks((prev) => [newTask, ...prev]);
      setShowForm(false);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to create task'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTask = await taskService.update(id, taskData);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
      setEditingTask(null);
      setShowForm(false);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to update task'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await taskService.delete(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to delete task'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id, newStatus) => {
    setIsLoading(true);
    setError(null);
    try {
      const task = tasks.find((t) => t.id === id);
      const updatedTask = await taskService.update(id, {
        ...task,
        status: newStatus,
      });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || 'Failed to update task status'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  const handleFormSubmit = (formData) => {
    if (editingTask) {
      handleUpdateTask(editingTask.id, formData);
    } else {
      handleCreateTask(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </header>

        <ErrorMessage message={error} onDismiss={() => setError(null)} />

        <div className="mb-6">
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md"
            >
              + Add New Task
            </button>
          )}

          {showForm && (
            <div className="mb-6">
              <TaskForm
                task={editingTask}
                onSubmit={handleFormSubmit}
                onCancel={handleCancelForm}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>

        {isLoading && !tasks.length ? (
          <LoadingSpinner />
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleEditClick}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleStatus}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default App;

