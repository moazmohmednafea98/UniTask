import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { SubjectCard } from '../components/SubjectCard';
import { SubjectForm } from '../components/SubjectForm';
import { Plus } from 'lucide-react';

export const SubjectsPage: React.FC = () => {
  const { subjects, deleteSubject } = useApp();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const editSubject = subjects.find((s) => s.id === selectedSubjectId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Subjects</h1>
        <Button
          onClick={() => {
            setSelectedSubjectId(null);
            setIsFormOpen(true);
          }}
          variant="primary"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Subject
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.length > 0 ? (
          subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subjectId={subject.id}
              onEdit={(id) => {
                setSelectedSubjectId(id);
                setIsFormOpen(true);
              }}
              onDelete={deleteSubject}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No subjects yet. Add one to organize your courses! 📖</p>
          </div>
        )}
      </div>

      <SubjectForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedSubjectId(null);
        }}
        subject={editSubject}
      />
    </div>
  );
};
