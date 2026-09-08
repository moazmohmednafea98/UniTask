import React from 'react';
import { Task } from '../types';
import { formatDate, formatMinutesToHours, getDaysUntil } from '../utils/dateUtils';
import { getStatusBadgeColor, getPriorityColor } from '../utils/constants';
import { Trash2, Edit2, CheckCircle, Circle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const daysUntil = getDaysUntil(task.deadline);
  const isOverdue = daysUntil < 0;
  const isUrgent = daysUntil <= 3 && daysUntil >= 0;

  return (
    <div className={`p-4 rounded-lg border-2 transition-all ${
      task.status === 'completed'
        ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        : isOverdue
        ? 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700'
        : isUrgent
        ? 'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-700'
        : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <button
            onClick={() =>
              onStatusChange(
                task.id,
                task.status === 'completed' ? 'pending' : 'completed'
              )
            }
            className="mt-1 text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
          >
            {task.status === 'completed' ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
          <div className="flex-1">
            <h3
              className={`font-semibold ${
                task.status === 'completed' ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{task.subject}</p>
            {task.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span
                className={`text-xs font-medium px-2 py-1 rounded ${
                  getPriorityColor(task.priority)
                }`}
              >
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
              <span className={`text-xs font-medium px-2 py-1 rounded ${getStatusBadgeColor(task.status)}`}>
                {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
              </span>
              {task.estimatedTime > 0 && (
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  ⏱ {formatMinutesToHours(task.estimatedTime)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 ml-3">
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(task)}
              className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {formatDate(task.deadline)}
            </p>
            {isOverdue && <p className="text-xs text-red-600 dark:text-red-400 font-semibold">Overdue</p>}
            {isUrgent && !isOverdue && (
              <p className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold">
                In {daysUntil} days
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};