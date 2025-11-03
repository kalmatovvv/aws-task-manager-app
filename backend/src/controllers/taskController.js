import Task, { TASK_STATUSES } from '../models/task.js';

export async function listTasks(req, res, next) {
  try {
    const tasks = await Task.findAll({ order: [['created_at', 'DESC']] });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
}

export async function getTaskById(req, res, next) {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

export async function createTask(req, res, next) {
  try {
    const { title, description, status } = req.body;
    if (status && !TASK_STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const task = await Task.create({ title, description, status });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

export async function updateTask(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    if (status && !TASK_STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.status = status ?? task.status;
    await task.save();
    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
}

export async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    const count = await Task.destroy({ where: { id } });
    if (!count) return res.status(404).json({ message: 'Task not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}


