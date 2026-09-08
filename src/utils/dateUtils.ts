import { format, parse, isToday, isTomorrow, isThisWeek } from 'date-fns';

export const formatDate = (date: string): string => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatTime = (time: string): string => {
  return format(parse(time, 'HH:mm', new Date()), 'hh:mm a');
};

export const formatDateTime = (date: string, time: string): string => {
  const dateObj = new Date(date);
  const timeObj = parse(time, 'HH:mm', new Date());
  return format(new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), timeObj.getHours(), timeObj.getMinutes()), 'MMM dd, yyyy hh:mm a');
};

export const getDateLabel = (date: string): string => {
  const dateObj = new Date(date);
  if (isToday(dateObj)) return 'Today';
  if (isTomorrow(dateObj)) return 'Tomorrow';
  if (isThisWeek(dateObj)) return format(dateObj, 'EEEE');
  return formatDate(date);
};

export const getDaysUntil = (date: string): number => {
  const today = new Date();
  const targetDate = new Date(date);
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const formatMinutesToHours = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};