import { Task, Subject, Exam, StudySession } from '../types';

const STORAGE_KEYS = {
  TASKS: 'unitask_tasks',
  SUBJECTS: 'unitask_subjects',
  EXAMS: 'unitask_exams',
  STUDY_SESSIONS: 'unitask_study_sessions',
};

// Tasks
export const getTasks = (): Task[] => {
  const data = localStorage.getItem(STORAGE_KEYS.TASKS);
  return data ? JSON.parse(data) : [];
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
};

export const addTask = (task: Task): void => {
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
};

export const updateTask = (id: string, updates: Partial<Task>): void => {
  const tasks = getTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updates };
    saveTasks(tasks);
  }
};

export const deleteTask = (id: string): void => {
  const tasks = getTasks();
  saveTasks(tasks.filter((t) => t.id !== id));
};

// Subjects
export const getSubjects = (): Subject[] => {
  const data = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
  return data ? JSON.parse(data) : [];
};

export const saveSubjects = (subjects: Subject[]): void => {
  localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
};

export const addSubject = (subject: Subject): void => {
  const subjects = getSubjects();
  subjects.push(subject);
  saveSubjects(subjects);
};

export const updateSubject = (id: string, updates: Partial<Subject>): void => {
  const subjects = getSubjects();
  const index = subjects.findIndex((s) => s.id === id);
  if (index !== -1) {
    subjects[index] = { ...subjects[index], ...updates };
    saveSubjects(subjects);
  }
};

export const deleteSubject = (id: string): void => {
  const subjects = getSubjects();
  saveSubjects(subjects.filter((s) => s.id !== id));
};

// Exams
export const getExams = (): Exam[] => {
  const data = localStorage.getItem(STORAGE_KEYS.EXAMS);
  return data ? JSON.parse(data) : [];
};

export const saveExams = (exams: Exam[]): void => {
  localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(exams));
};

export const addExam = (exam: Exam): void => {
  const exams = getExams();
  exams.push(exam);
  saveExams(exams);
};

export const updateExam = (id: string, updates: Partial<Exam>): void => {
  const exams = getExams();
  const index = exams.findIndex((e) => e.id === id);
  if (index !== -1) {
    exams[index] = { ...exams[index], ...updates };
    saveExams(exams);
  }
};

export const deleteExam = (id: string): void => {
  const exams = getExams();
  saveExams(exams.filter((e) => e.id !== id));
};

// Study Sessions
export const getStudySessions = (): StudySession[] => {
  const data = localStorage.getItem(STORAGE_KEYS.STUDY_SESSIONS);
  return data ? JSON.parse(data) : [];
};

export const saveStudySessions = (sessions: StudySession[]): void => {
  localStorage.setItem(STORAGE_KEYS.STUDY_SESSIONS, JSON.stringify(sessions));
};

export const addStudySession = (session: StudySession): void => {
  const sessions = getStudySessions();
  sessions.push(session);
  saveStudySessions(sessions);
};

export const updateStudySession = (id: string, updates: Partial<StudySession>): void => {
  const sessions = getStudySessions();
  const index = sessions.findIndex((s) => s.id === id);
  if (index !== -1) {
    sessions[index] = { ...sessions[index], ...updates };
    saveStudySessions(sessions);
  }
};

export const deleteStudySession = (id: string): void => {
  const sessions = getStudySessions();
  saveStudySessions(sessions.filter((s) => s.id !== id));
};