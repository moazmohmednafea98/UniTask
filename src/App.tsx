import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { StudyPage } from './pages/StudyPage';
import { SubjectsPage } from './pages/SubjectsPage';
import { ExamsPage } from './pages/ExamsPage';
import { CalendarPage } from './pages/CalendarPage';
import {
  getTasks,
  saveTasks,
  getSubjects,
  saveSubjects,
  getExams,
  saveExams,
  getStudySessions,
  saveStudySessions,
} from './utils/storage';
import { sampleTasks, sampleSubjects, sampleExams, sampleStudySessions } from './data/sampleData';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Initialize sample data if empty
  useEffect(() => {
    if (getTasks().length === 0) {
      saveTasks(sampleTasks);
    }
    if (getSubjects().length === 0) {
      saveSubjects(sampleSubjects);
    }
    if (getExams().length === 0) {
      saveExams(sampleExams);
    }
    if (getStudySessions().length === 0) {
      saveStudySessions(sampleStudySessions);
    }
  }, []);

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'tasks':
        return <TasksPage />;
      case 'study':
        return <StudyPage />;
      case 'subjects':
        return <SubjectsPage />;
      case 'exams':
        return <ExamsPage />;
      case 'calendar':
        return <CalendarPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto lg:ml-64">
        <div className="p-6 pb-20">{renderPage()}</div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;