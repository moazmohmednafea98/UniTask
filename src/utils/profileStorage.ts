import { StudentProfile } from '../types';

const STUDENT_PROFILE_KEY = 'unitask_student_profile';

export const getStudentProfile = (): StudentProfile | null => {
  const data = localStorage.getItem(STUDENT_PROFILE_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveStudentProfile = (profile: StudentProfile): void => {
  localStorage.setItem(STUDENT_PROFILE_KEY, JSON.stringify(profile));
};

export const resetStudentProfile = (): void => {
  localStorage.removeItem(STUDENT_PROFILE_KEY);
};

export const isOnboardingCompleted = (): boolean => {
  const profile = getStudentProfile();
  return profile?.onboardingCompleted ?? false;
};
