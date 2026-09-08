import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { ExamCard } from '../components/ExamCard';
import { ExamForm } from '../components/ExamForm';
import { Plus } from 'lucide-react';

export const ExamsPage: React.FC = () => {
  const { exams, deleteExam } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [filterCompleted, setFilterCompleted] = useState(false);

  const editExam = exams.find((e) => e.id === selectedExamId);

  const filtered = filterCompleted ? exams.filter((e) => !e.completed) : exams;
  const sorted = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Exams</h1>
        <Button
          onClick={() => {
            setSelectedExamId(null);
            setIsFormOpen(true);
          }}
          variant="primary"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Exam
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filterCompleted}
            onChange={(e) => setFilterCompleted(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 focus:ring-primary-600"
          />
          <span className="text-sm font-medium">Show only upcoming exams</span>
        </label>
      </div>

      <div className="space-y-3">
        {sorted.length > 0 ? (
          sorted.map((exam) => (
            <ExamCard
              key={exam.id}
              examId={exam.id}
              onDelete={deleteExam}
              onEdit={(id) => {
                setSelectedExamId(id);
                setIsFormOpen(true);
              }}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No exams scheduled. Add one to stay on track! 📝</p>
          </div>
        )}
      </div>

      <ExamForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedExamId(null);
        }}
        exam={editExam}
      />
    </div>
  );
};