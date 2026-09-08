import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task, Subject, Exam, StudySession } from '../types';
import {
  getTasks,
  saveTasks,
  getSubjects,
  saveSubjects,
  getExams,
  saveExams,
  getStudySessions,
  saveStudySessions,
} from '../utils/storage';

interface AppContextType {
  tasks: Task[];
  subjects: Subject[];
  exams: Exam[];
  studySessions: StudySession[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addSubject: (subject: Subject) => void;
  updateSubject: (id: string, updates: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  addExam: (exam: Exam) => void;
  updateExam: (id: string, updates: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  addStudySession: (session: StudySession) => void;
  updateStudySession: (id: string, updates: Partial<StudySession>) => void;
  deleteStudySession: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    setTasks(getTasks());
    setSubjects(getSubjects());
    setExams(getExams());
    setStudySessions(getStudySessions());
  }, []);

  const addTask = (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const newTasks = tasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((t) => t.id !== id);
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const addSubject = (subject: Subject) => {
    const newSubjects = [...subjects, subject];
    setSubjects(newSubjects);
    saveSubjects(newSubjects);
  };

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    const newSubjects = subjects.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setSubjects(newSubjects);
    saveSubjects(newSubjects);
  };

  const deleteSubject = (id: string) => {
    const newSubjects = subjects.filter((s) => s.id !== id);
    setSubjects(newSubjects);
    saveSubjects(newSubjects);
  };

  const addExam = (exam: Exam) => {
    const newExams = [...exams, exam];
    setExams(newExams);
    saveExams(newExams);
  };

  const updateExam = (id: string, updates: Partial<Exam>) => {
    const newExams = exams.map((e) => (e.id === id ? { ...e, ...updates } : e));
    setExams(newExams);
    saveExams(newExams);
  };

  const deleteExam = (id: string) => {
    const newExams = exams.filter((e) => e.id !== id);
    setExams(newExams);
    saveExams(newExams);
  };

  const addStudySession = (session: StudySession) => {
    const newSessions = [...studySessions, session];
    setStudySessions(newSessions);
    saveStudySessions(newSessions);
  };

  const updateStudySession = (id: string, updates: Partial<StudySession>) => {
    const newSessions = studySessions.map((s) => (s.id === id ? { ...s, ...updates } : s));
    setStudySessions(newSessions);
    saveStudySessions(newSessions);
  };

  const deleteStudySession = (id: string) => {
    const newSessions = studySessions.filter((s) => s.id !== id);
    setStudySessions(newSessions);
    saveStudySessions(newSessions);
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        subjects,
        exams,
        studySessions,
        addTask,
        updateTask,
        deleteTask,
        addSubject,
        updateSubject,
        deleteSubject,
        addExam,
        updateExam,
        deleteExam,
        addStudySession,
        updateStudySession,
        deleteStudySession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};