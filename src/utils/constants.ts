export const colors = [
  { name: 'Red', value: 'bg-red-500', bg: 'bg-red-50', text: 'text-red-700', dark: 'dark:bg-red-900' },
  { name: 'Blue', value: 'bg-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', dark: 'dark:bg-blue-900' },
  { name: 'Green', value: 'bg-green-500', bg: 'bg-green-50', text: 'text-green-700', dark: 'dark:bg-green-900' },
  { name: 'Purple', value: 'bg-purple-500', bg: 'bg-purple-50', text: 'text-purple-700', dark: 'dark:bg-purple-900' },
  { name: 'Orange', value: 'bg-orange-500', bg: 'bg-orange-50', text: 'text-orange-700', dark: 'dark:bg-orange-900' },
  { name: 'Pink', value: 'bg-pink-500', bg: 'bg-pink-50', text: 'text-pink-700', dark: 'dark:bg-pink-900' },
  { name: 'Indigo', value: 'bg-indigo-500', bg: 'bg-indigo-50', text: 'text-indigo-700', dark: 'dark:bg-indigo-900' },
  { name: 'Cyan', value: 'bg-cyan-500', bg: 'bg-cyan-50', text: 'text-cyan-700', dark: 'dark:bg-cyan-900' },
];

export const icons = [
  'Book', 'Code', 'Beaker', 'Calculator', 'Globe', 'Music', 'Palette', 'Brain',
];

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'text-red-600 dark:text-red-400';
    case 'medium':
      return 'text-yellow-600 dark:text-yellow-400';
    case 'low':
      return 'text-green-600 dark:text-green-400';
    default:
      return 'text-gray-600 dark:text-gray-400';
  }
};

export const getStatusBadgeColor = (status: string): string => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'pending':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};