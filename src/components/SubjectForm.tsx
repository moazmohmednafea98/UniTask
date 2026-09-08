import React, { useState } from 'react';
import { Subject } from '../types';
import { useApp } from '../context/AppContext';
import { Modal } from './Modal';
import { Button } from './Button';
import { generateId } from '../utils/helpers';
import { colors } from '../utils/constants';

interface SubjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  subject?: Subject;
}

export const SubjectForm: React.FC<SubjectFormProps> = ({ isOpen, onClose, subject }) => {
  const { addSubject, updateSubject } = useApp();
  const [formData, setFormData] = useState<Partial<Subject>>({
    name: subject?.name || '',
    professor: subject?.professor || '',
    color: subject?.color || colors[0].value,
    icon: subject?.icon || '📚',
    lectureSchedule: subject?.lectureSchedule || [],
  });

  const [lectureInput, setLectureInput] = useState('');

  const handleAddLecture = () => {
    if (lectureInput.trim()) {
      setFormData({
        ...formData,
        lectureSchedule: [...(formData.lectureSchedule || []), lectureInput],
      });
      setLectureInput('');
    }
  };

  const handleRemoveLecture = (index: number) => {
    setFormData({
      ...formData,
      lectureSchedule: formData.lectureSchedule?.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject) {
      updateSubject(subject.id, formData);
    } else {
      const newSubject: Subject = {
        id: generateId(),
        name: formData.name || '',
        professor: formData.professor || '',
        color: formData.color || colors[0].value,
        icon: formData.icon || '📚',
        lectureSchedule: formData.lectureSchedule || [],
        createdAt: new Date().toISOString(),
      };
      addSubject(newSubject);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={subject ? 'Edit Subject' : 'Add Subject'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Subject Name *</label>
          <input
            type="text"
            required
            value={formData.name || ''}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
            placeholder="e.g., Advanced Mathematics"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Professor Name</label>
          <input
            type="text"
            value={formData.professor || ''}
            onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
            placeholder="e.g., Dr. Smith"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Color</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: color.value })}
                  className={`w-8 h-8 rounded-full ${color.value} ${
                    formData.color === color.value ? 'ring-2 ring-offset-2 dark:ring-offset-gray-800 ring-gray-400' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Icon</label>
            <input
              type="text"
              value={formData.icon || ''}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              maxLength={2}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600 text-center text-lg"
              placeholder="📚"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Lecture Schedule</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={lectureInput}
              onChange={(e) => setLectureInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddLecture()}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="e.g., Monday 10:00"
            />
            <Button type="button" onClick={handleAddLecture} size="sm">
              Add
            </Button>
          </div>
          <div className="space-y-1">
            {formData.lectureSchedule?.map((lecture, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded">
                <span className="text-sm">{lecture}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveLecture(index)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {subject ? 'Update Subject' : 'Add Subject'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};