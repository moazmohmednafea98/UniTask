import React from 'react';
import { useApp } from '../context/AppContext';
import { formatDate, getDaysUntil, formatMinutesToHours } from '../utils/dateUtils';
import { TaskCard } from '../components/TaskCard';
import { Button } from '../components/Button';
import { Plus, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { TaskForm } from '../components/TaskForm';

export const DashboardPage: React.FC = () => {
  const { tasks, exams, studySessions, subjects, updateTask, deleteTask } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Calculate statistics
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter((t) => t.deadline === today && t.status !== 'completed');
  const upcomingDeadlines = tasks
    .filter((t) => {
      const daysUntil = getDaysUntil(t.deadline);
      return daysUntil >= 0 && daysUntil <= 7 && t.status !== 'completed';
    })
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5);

  const nextExam = exams
    .filter((e) => !e.completed)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const todayStudyMinutes = studySessions
    .filter((s) => s.date === today && s.completed)
    .reduce((sum, s) => sum + s.duration, 0);

  const thisWeekStudyMinutes = studySessions
    .filter((s) => {
      const date = new Date(s.date);
      const todayDate = new Date();
      const diff = Math.floor((date.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24));
      return diff >= -6 && diff <= 0 && s.completed;
    })
    .reduce((sum, s) => sum + s.duration, 0);

  const overdueTasks = tasks.filter((t) => getDaysUntil(t.deadline) < 0 && t.status !== 'completed');
  const urgentTasks = tasks.filter(
    (t) => {
      const days = getDaysUntil(t.deadline);
      return days >= 0 && days <= 3 && t.status !== 'completed';
    }
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's your study overview.</p>
        </div>
        <Button
          onClick={() => setIsFormOpen(true)}
          variant="primary"
        >
          <Plus className="w-4 h-4 mr-2" /> Quick Add Task
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Total Tasks</p>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100 mt-2">{totalTasks}</p>
            </div>
            <CheckCircle2 className="w-10 h-10 text-blue-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-6 border border-green-200 dark:border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 dark:text-green-300 font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-900 dark:text-green-100 mt-2">{completedTasks}</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">{completionPercentage}% done</p>
            </div>
            <TrendingUp className="w-10 h-10 text-green-400" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">Study Today</p>
              <p className="text-3xl font-bold text-purple-900 dark:text-purple-100 mt-2">{formatMinutesToHours(todayStudyMinutes)}</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">This week: {formatMinutesToHours(thisWeekStudyMinutes)}</p>
            </div>
          </div>
        </div>

        <div className={`rounded-lg p-6 border ${
          overdueTasks.length > 0
            ? 'bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 border-red-200 dark:border-red-700'
            : 'bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                overdueTasks.length > 0
                  ? 'text-red-700 dark:text-red-300'
                  : 'text-gray-700 dark:text-gray-300'
              }`}>Overdue Tasks</p>
              <p className={`text-3xl font-bold mt-2 ${
                overdueTasks.length > 0
                  ? 'text-red-900 dark:text-red-100'
                  : 'text-gray-900 dark:text-gray-100'
              }`}>{overdueTasks.length}</p>
            </div>
            {overdueTasks.length > 0 && <AlertCircle className="w-10 h-10 text-red-400" />}
          </div>
        </div>
      </div>

      {/* Warnings */}
      {overdueTasks.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-800 dark:text-red-200">You have {overdueTasks.length} overdue task(s)!</p>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">Complete them as soon as possible to stay on track.</p>
            </div>
          </div>
        </div>
      )}

      {urgentTasks.length > 0 && overdueTasks.length === 0 && (
        <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-yellow-800 dark:text-yellow-200">You have {urgentTasks.length} urgent task(s) due soon!</p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">Focus on these to meet your deadlines.</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Tasks */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
          {todayTasks.length > 0 ? (
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => {}}
                  onDelete={deleteTask}
                  onStatusChange={updateTask}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-6">No tasks due today! 🎉</p>
          )}
        </div>

        {/* Next Exam */}
        {nextExam && (
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900 dark:to-indigo-800 rounded-lg p-6 border border-indigo-200 dark:border-indigo-700">
            <h2 className="text-xl font-semibold mb-4 text-indigo-900 dark:text-indigo-100">Next Exam</h2>
            <div className="space-y-3">
              <div>
                <p className="text-lg font-semibold text-indigo-900 dark:text-indigo-100">{nextExam.subject}</p>
                <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
                  📅 {formatDate(nextExam.date)} at {nextExam.time}
                </p>
                {nextExam.location && (
                  <p className="text-sm text-indigo-700 dark:text-indigo-300">
                    📍 {nextExam.location}
                  </p>
                )}
              </div>
              <div className="pt-3 border-t border-indigo-200 dark:border-indigo-600">
                <p className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
                  Days until exam: <span className="text-2xl font-bold">{getDaysUntil(nextExam.date)}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Deadlines */}
      {upcomingDeadlines.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines (Next 7 Days)</h2>
          <div className="space-y-3">
            {upcomingDeadlines.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => {}}
                onDelete={deleteTask}
                onStatusChange={updateTask}
              />
            ))}
          </div>
        </div>
      )}

      {/* Subjects Overview */}
      {subjects.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Your Subjects ({subjects.length})</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {subjects.map((subject) => {
              const subjectTasks = tasks.filter((t) => t.subject === subject.name);
              const completedCount = subjectTasks.filter((t) => t.status === 'completed').length;
              return (
                <div key={subject.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
                  <div className={`${subject.color} w-10 h-10 rounded-lg flex items-center justify-center text-xl text-white mx-auto mb-2`}>
                    {subject.icon}
                  </div>
                  <p className="font-semibold text-sm">{subject.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {completedCount}/{subjectTasks.length} tasks
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={() => {}}
      />
    </div>
  );
};