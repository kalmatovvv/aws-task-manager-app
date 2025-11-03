import { DataTypes, Model } from 'sequelize';
import { sequelize } from './index.js';

export const TASK_STATUSES = ['pending', 'in_progress', 'completed'];

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Title is required' },
        len: { args: [1, 200], msg: 'Title must be 1-200 characters' },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: DataTypes.ENUM(...TASK_STATUSES),
      allowNull: false,
      defaultValue: 'pending',
      validate: {
        isIn: { args: [TASK_STATUSES], msg: 'Invalid status' },
      },
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
    underscored: true,
    indexes: [{ fields: ['status'] }, { fields: ['created_at'] }],
  }
);

export default Task;


