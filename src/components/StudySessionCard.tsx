import React from 'react';
import { useApp } from '../context/AppContext';
import { formatMinutesToHours, formatTime } from '../utils/dateUtils';
import { Trash2, CheckCircle } from 'lucide-react';

interface StudySessionCardProps {
  sessionId: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export const StudySessionCard: React.FC<StudySessionCardProps> = ({ sessionId, onDelete, onEdit }) => {
  const { studySessions, updateStudySession } = useApp();
  const session = studySessions.find((s) => s.id === sessionId);

  if (!session) return null;

  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all ${
        session.completed
          ? 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700'
          : 'bg-white dark:bg-gray-800 border-blue-200 dark:border-blue-700'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold">{session.subject}</h3>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span>📅 {new Date(session.date).toLocaleDateString()}</span>
            <span>🕐 {formatTime(session.startTime)}</span>
            <span>⏱️ {formatMinutesToHours(session.duration)}</span>
          </div>
          {session.notes && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
              {session.notes}
            </p>
          )}
        </div>
        <div className="flex gap-2 ml-3">
          <button
            onClick={() => updateStudySession(session.id, { completed: !session.completed })}
            className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400"
            title={session.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <CheckCircle className={`w-5 h-5 ${session.completed ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={() => onEdit(session.id)}
            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(session.id)}
            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};