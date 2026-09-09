import { Task, Subject, Exam, StudySession } from '../types';

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
  elapsedTime?: number; // actual study time in seconds
  timerState?: 'idle' | 'running' | 'paused';
}

export interface Subject {
  id: string;
  name: string;
  professor: string;
  lectureSchedule: string[];
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
  duration: number;
  completed: boolean;
  notes: string;
  createdAt: string;
}

export interface StudentProfile {
  name: string;
  major: string;
  selectedCourses: string[];
  onboardingCompleted: boolean;
}

export interface CoursesByMajor {
  [major: string]: string[];
}