import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';

export const Calendar: React.FC<{ month?: Date }> = ({ month = new Date() }) => {
  const { tasks, exams, studySessions } = useApp();

  const daysInMonth = useMemo(() => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    return eachDayOfInterval({ start, end });
  }, [month]);

  const getEventsForDay = (day: Date) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const dayTasks = tasks.filter((t) => t.deadline === dateStr && t.status !== 'completed');
    const dayExams = exams.filter((e) => e.date === dateStr && !e.completed);
    const daySessions = studySessions.filter((s) => s.date === dateStr && !s.completed);
    return [...dayTasks, ...dayExams, ...daySessions];
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">{format(month, 'MMMM yyyy')}</h3>
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center font-semibold text-sm text-gray-600 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
        {daysInMonth.map((day) => {
          const events = getEventsForDay(day);
          const isCurrentDay = isToday(day);
          const isCurrentMonth = isSameMonth(day, month);

          return (
            <div
              key={day.toString()}
              className={`min-h-24 p-2 rounded border transition-colors ${
                isCurrentDay
                  ? 'bg-primary-100 dark:bg-primary-900 border-primary-300 dark:border-primary-700'
                  : isCurrentMonth
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-100 dark:border-gray-600'
              }`}
            >
              <p className={`text-sm font-semibold mb-1 ${
                isCurrentDay ? 'text-primary-700 dark:text-primary-300' : ''
              }`}>
                {format(day, 'd')}
              </p>
              <div className="space-y-1 text-xs">
                {events.slice(0, 2).map((event, idx) => (
                  <div
                    key={idx}
                    className="truncate px-1 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  >
                    {'name' in event ? '✓' : '📝'} {event.name || event.subject || 'Event'}
                  </div>
                ))}
                {events.length > 2 && (
                  <div className="text-gray-500 dark:text-gray-400 px-1">+{events.length - 2} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};