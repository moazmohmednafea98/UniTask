import React from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Edit2, Plus } from 'lucide-react';
import { Button } from './Button';

interface SubjectCardProps {
  subjectId: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subjectId, onEdit, onDelete }) => {
  const { subjects, tasks, exams } = useApp();
  const subject = subjects.find((s) => s.id === subjectId);

  if (!subject) return null;

  const subjectTasks = tasks.filter((t) => t.subject === subject.name);
  const subjectExams = exams.filter((e) => e.subject === subject.name);
  const completedTasks = subjectTasks.filter((t) => t.status === 'completed').length;
  const upcomingExams = subjectExams.filter((e) => !e.completed).length;

  return (
    <div className="p-6 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <div className={`${subject.color} w-12 h-12 rounded-lg flex items-center justify-center text-xl text-white`}>
            {subject.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{subject.name}</h3>
            {subject.professor && (
              <p className="text-sm text-gray-600 dark:text-gray-400">👨‍🏫 {subject.professor}</p>
            )}
            {subject.lectureSchedule.length > 0 && (
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-500 dark:text-gray-500 font-semibold">LECTURES</p>
                {subject.lectureSchedule.map((lecture, idx) => (
                  <p key={idx} className="text-sm text-gray-600 dark:text-gray-400">
                    📍 {lecture}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 ml-3">
          <button
            onClick={() => onEdit(subject.id)}
            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(subject.id)}
            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t dark:border-gray-700">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary-600">{completedTasks}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Tasks Completed</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-red-600">{upcomingExams}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Upcoming Exams</p>
        </div>
      </div>
    </div>
  );
};