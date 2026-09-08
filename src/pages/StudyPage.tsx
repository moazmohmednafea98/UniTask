import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { StudySessionCard } from '../components/StudySessionCard';
import { StudySessionForm } from '../components/StudySessionForm';
import { Plus, Calendar } from 'lucide-react';
import { formatMinutesToHours } from '../utils/dateUtils';
import { format } from 'date-fns';

export const StudyPage: React.FC = () => {
  const { studySessions, deleteStudySession } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);

  const editSession = studySessions.find((s) => s.id === selectedSessionId);

  const today = new Date().toISOString().split('T')[0];
  const todaySessions = studySessions.filter((s) => s.date === today);
  const filteredSessions = studySessions.filter((s) => s.date === dateFilter);

  const todayTotalMinutes = todaySessions.reduce((sum, s) => sum + s.duration, 0);
  const weekTotalMinutes = studySessions
    .filter((s) => {
      const date = new Date(s.date);
      const today = new Date();
      const diff = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diff >= -6 && diff <= 0;
    })
    .reduce((sum, s) => sum + s.duration, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Study Planner</h1>
        <Button
          onClick={() => {
            setSelectedSessionId(null);
            setIsFormOpen(true);
          }}
          variant="primary"
        >
          <Plus className="w-4 h-4 mr-2" /> New Session
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-6 border border-blue-200 dark:border-blue-700">
          <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">Today's Study Time</p>
          <p className="text-4xl font-bold text-blue-900 dark:text-blue-100 mt-2">{formatMinutesToHours(todayTotalMinutes)}</p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{todaySessions.length} session(s)</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-6 border border-purple-200 dark:border-purple-700">
          <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">This Week's Study Time</p>
          <p className="text-4xl font-bold text-purple-900 dark:text-purple-100 mt-2">{formatMinutesToHours(weekTotalMinutes)}</p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">Last 7 days</p>
        </div>
      </div>

      {/* Date Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5" />
          <label className="block text-sm font-medium">View Sessions for:</label>
        </div>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="w-full md:w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
        />
      </div>

      {/* Sessions */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Sessions for {format(new Date(dateFilter), 'MMMM dd, yyyy')}</h2>
        {filteredSessions.length > 0 ? (
          filteredSessions.map((session) => (
            <StudySessionCard
              key={session.id}
              sessionId={session.id}
              onDelete={deleteStudySession}
              onEdit={(id) => {
                setSelectedSessionId(id);
                setIsFormOpen(true);
              }}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No study sessions for this date. Create one to boost your productivity! 🙋‍♂️</p>
          </div>
        )}
      </div>

      <StudySessionForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedSessionId(null);
        }}
        session={editSession}
      />
    </div>
  );
};