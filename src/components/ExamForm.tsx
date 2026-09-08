import React, { useState } from 'react';
import { Exam } from '../types';
import { useApp } from '../context/AppContext';
import { Modal } from './Modal';
import { Button } from './Button';
import { generateId } from '../utils/helpers';

interface ExamFormProps {
  isOpen: boolean;
  onClose: () => void;
  exam?: Exam;
}

export const ExamForm: React.FC<ExamFormProps> = ({ isOpen, onClose, exam }) => {
  const { subjects, addExam, updateExam } = useApp();
  const [formData, setFormData] = useState<Partial<Exam>>({
    subject: exam?.subject || '',
    date: exam?.date || new Date().toISOString().split('T')[0],
    time: exam?.time || '09:00',
    location: exam?.location || '',
    notes: exam?.notes || '',
    completed: exam?.completed || false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (exam) {
      updateExam(exam.id, formData);
    } else {
      const newExam: Exam = {
        id: generateId(),
        subject: formData.subject || '',
        date: formData.date || '',
        time: formData.time || '',
        location: formData.location || '',
        notes: formData.notes || '',
        completed: formData.completed || false,
        createdAt: new Date().toISOString(),
      };
      addExam(newExam);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={exam ? 'Edit Exam' : 'Add Exam'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Subject *</label>
          <select
            required
            value={formData.subject || ''}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date *</label>
            <input
              type="date"
              required
              value={formData.date || ''}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Time *</label>
            <input
              type="time"
              required
              value={formData.time || ''}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
            placeholder="e.g., Room 101, Building A"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={formData.notes || ''}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none"
            placeholder="Add exam notes..."
            rows={3}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="completed"
            checked={formData.completed || false}
            onChange={(e) => setFormData({ ...formData, completed: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 focus:ring-primary-600"
          />
          <label htmlFor="completed" className="text-sm font-medium">
            Mark as completed
          </label>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {exam ? 'Update Exam' : 'Add Exam'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};