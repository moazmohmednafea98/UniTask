import React from 'react';
import { useApp } from '../context/AppContext';
import { formatDate, getDaysUntil } from '../utils/dateUtils';
import { Trash2, CheckCircle, Clock } from 'lucide-react';

interface ExamCardProps {
  examId: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const ExamCard: React.FC<ExamCardProps> = ({ examId, onDelete, onEdit }) => {
  const { exams, updateExam } = useApp();
  const exam = exams.find((e) => e.id === examId);

  if (!exam) return null;

  const daysUntil = getDaysUntil(exam.date);
  const isUrgent = daysUntil <= 7 && daysUntil >= 0;
  const isPassed = daysUntil < 0;

  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all ${
        exam.completed
          ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700'
          : isPassed
          ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
          : isUrgent
          ? 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-700'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{exam.subject}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            📍 {exam.location || 'Location TBA'}
          </p>
          {exam.notes && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
              {exam.notes}
            </p>
          )}
          <div className="flex items-center gap-4 mt-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              📅 {formatDate(exam.date)} at {exam.time}
            </span>
            {exam.completed && (
              <span className="text-xs font-semibold px-2 py-1 bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-200 rounded">
                ✓ Completed
              </span>
            )}
            {isUrgent && !exam.completed && !isPassed && (
              <span className="text-xs font-semibold px-2 py-1 bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-200 rounded">
                ⚠ {daysUntil} days
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2 ml-3">
          <button
            onClick={() => updateExam(exam.id, { completed: !exam.completed })}
            className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400"
            title={exam.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <CheckCircle className={`w-5 h-5 ${exam.completed ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onEdit(exam.id)}
            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(exam.id)}
            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};