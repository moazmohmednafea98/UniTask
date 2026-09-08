import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { TaskCard } from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import { Plus, Filter } from 'lucide-react';

type TaskFilter = 'all' | 'pending' | 'in-progress' | 'completed';
type TaskSort = 'deadline' | 'priority';

export const TasksPage: React.FC = () => {
  const { tasks, deleteTask, updateTask } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const [sort, setSort] = useState<TaskSort>('deadline');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const subjects = Array.from(new Set(tasks.map((t) => t.subject)));
  const priorities = ['low', 'medium', 'high'];

  let filtered = tasks.filter((t) => {
    if (filter !== 'all' && t.status !== filter) return false;
    if (subjectFilter !== 'all' && t.subject !== subjectFilter) return false;
    if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
    return true;
  });

  if (sort === 'deadline') {
    filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
  } else if (sort === 'priority') {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    filtered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  const editTask = tasks.find((t) => t.id === selectedTask);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button
          onClick={() => {
            setSelectedTask(null);
            setIsFormOpen(true);
          }}
          variant="primary"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Task
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5" />
          <span className="font-semibold">Filters</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as TaskFilter)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="all">All Tasks</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="all">All Priorities</option>
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as TaskSort)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              <option value="deadline">Deadline</option>
              <option value="priority">Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={(t) => {
                setSelectedTask(t.id);
                setIsFormOpen(true);
              }}
              onDelete={deleteTask}
              onStatusChange={updateTask}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks found. Create one to get started! 🙋</p>
          </div>
        )}
      </div>

      <TaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedTask(null);
        }}
        onSubmit={() => {
          setSelectedTask(null);
        }}
        task={editTask}
      />
    </div>
  );
};
