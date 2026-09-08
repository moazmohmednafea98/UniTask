import { v4 as uuidv4 } from 'crypto';

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};