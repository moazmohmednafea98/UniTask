export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  name: string;
  subject: string;
  description: string;
  priority: Priority;
  deadline: string;
  estimatedTime: number; // in minutes
  status: TaskStatus;
  createdAt: string;
}

export interface Subject {
  id: string;
  name: string;
  professor: string;
  lectureSchedule: string[]; // e.g., ['Monday 10:00', 'Wednesday 14:00']
  color: string;
  icon: string;
  createdAt: string;
}

export interface Exam {
  id: string;
  subject: string;
  date: string;
  time: string;
  location: string;
  notes: string;
  completed: boolean;
  createdAt: string;
}

export interface StudySession {
  id: string;
  subject: string;
  date: string;
  startTime: string;
  duration: number; // in minutes
  completed: boolean;
  notes: string;
  createdAt: string;
}