import React, { useState } from 'react';
import { StudySession } from '../types';
import { useApp } from '../context/AppContext';
import { Modal } from './Modal';
import { Button } from './Button';
import { generateId } from '../utils/helpers';

interface StudySessionFormProps {
  isOpen: boolean;
  onClose: () => void;
  session?: StudySession;
}

export const StudySessionForm: React.FC<StudySessionFormProps> = ({ isOpen, onClose, session }) => {
  const { subjects, addStudySession, updateStudySession } = useApp();
  const [formData, setFormData] = useState<Partial<StudySession>>({
    subject: session?.subject || '',
    date: session?.date || new Date().toISOString().split('T')[0],
    startTime: session?.startTime || '09:00',
    duration: session?.duration || 60,
    completed: session?.completed || false,
    notes: session?.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (session) {
      updateStudySession(session.id, formData);
    } else {
      const newSession: StudySession = {
        id: generateId(),
        subject: formData.subject || '',
        date: formData.date || '',
        startTime: formData.startTime || '',
        duration: formData.duration || 60,
        completed: formData.completed || false,
        notes: formData.notes || '',
        createdAt: new Date().toISOString(),
      };
      addStudySession(newSession);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={session ? 'Edit Study Session' : 'Create Study Session'}>
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
            <label className="block text-sm font-medium mb-1">Start Time *</label>
            <input
              type="time"
              required
              value={formData.startTime || ''}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Duration (minutes) *</label>
          <input
            type="number"
            required
            min="15"
            step="15"
            value={formData.duration || 60}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <textarea
            value={formData.notes || ''}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600 resize-none"
            placeholder="Add study session notes..."
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
            {session ? 'Update Session' : 'Create Session'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};