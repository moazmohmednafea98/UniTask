# UniTask 📚

A modern, responsive web application designed specifically for university students to organize their tasks, assignments, lectures, exams, and study sessions in one place.

## 🌟 Features

### 1. **Dashboard**
- Overview of today's tasks and upcoming deadlines
- Display of next upcoming exam with countdown
- Daily study progress statistics
- Completed vs. pending tasks overview
- Quick "Add Task" button for rapid task creation
- Visual alerts for overdue and urgent tasks

### 2. **Tasks Management**
- Create, edit, delete, and complete tasks
- Task properties:
  - Task name and description
  - Subject association
  - Priority levels (Low / Medium / High)
  - Deadline tracking
  - Estimated study time
  - Status (Pending / In Progress / Completed)
- Advanced filtering by subject, priority, and status
- Sorting options by deadline or priority
- Visual indicators for overdue and urgent tasks

### 3. **Study Planner**
- Create and manage study sessions
- Track date, start time, and duration
- Mark study sessions as completed
- Display total study hours for today and the week
- Visual weekly study schedule
- Study progress statistics with breakdown by subject

### 4. **Subjects Management**
- Add and organize university subjects
- Subject details:
  - Subject name and professor information
  - Lecture schedule (multiple days/times supported)
  - Custom color and emoji icons for easy identification
- Subject cards showing task completion and upcoming exams

### 5. **Exams Tracking**
- Add exams with comprehensive details
- Exam properties:
  - Subject, date, time, and location
  - Custom notes and exam details
  - Completion status tracking
- Countdown display for upcoming exams
- Automatic highlighting of approaching exams
- Sort by date to prioritize preparation

### 6. **Calendar View**
- Monthly calendar display
- Visual representation of tasks, lectures, study sessions, and exams
- Event indicators on calendar dates
- Quick event summary preview
- Month navigation controls

### 7. **Notifications & Alerts**
- Alerts for upcoming deadlines
- Warnings for overdue tasks
- Highlighted urgent tasks due within 3 days
- Visual status indicators throughout the app

### 8. **Progress & Statistics**
- Completed tasks counter
- Study hours tracking (daily and weekly)
- Subject-specific progress
- Task completion percentage
- Visual progress indicators and charts

## 🎨 UI/UX Highlights

- **Modern Design**: Clean, minimal interface focused on usability
- **Dark Mode**: Full light and dark theme support with persistent preference
- **Responsive Layout**: Fully optimized for desktop, tablet, and mobile devices
- **Visual Hierarchy**: Cards, icons, progress bars, and typography for clear information architecture
- **Intuitive Navigation**: Collapsible sidebar navigation (mobile-friendly)
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: React Context API for global state
- **Storage**: Browser LocalStorage for data persistence
- **Date Handling**: date-fns for date manipulation
- **Icons**: Lucide React for modern icon set
- **Build Tool**: Vite for fast development and optimized builds

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── Sidebar.tsx
│   ├── TaskCard.tsx
│   ├── TaskForm.tsx
│   ├── SubjectCard.tsx
│   ├── SubjectForm.tsx
│   ├── ExamCard.tsx
│   ├── ExamForm.tsx
│   ├── StudySessionCard.tsx
│   ├── StudySessionForm.tsx
│   └── Calendar.tsx
├── context/             # React Context providers
│   ├── AppContext.tsx
│   └── ThemeContext.tsx
├── pages/               # Page components
│   ├── DashboardPage.tsx
│   ├── TasksPage.tsx
│   ├── StudyPage.tsx
│   ├── SubjectsPage.tsx
│   ├── ExamsPage.tsx
│   └── CalendarPage.tsx
├── utils/               # Utility functions
│   ├── storage.ts       # LocalStorage operations
│   ├── dateUtils.ts     # Date formatting and calculations
│   ├── constants.ts     # UI constants and colors
│   └── helpers.ts       # Helper functions
├── types/               # TypeScript type definitions
│   └── index.ts
├── data/                # Sample data
│   └── sampleData.ts
├── App.tsx              # Main App component
├── main.tsx             # React entry point
└── index.css            # Global styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/moazmohmednafea98/UniTask.git
cd UniTask
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

## 💾 Data Persistence

UniTask uses browser LocalStorage to save all your data:
- Tasks
- Subjects
- Exams
- Study Sessions
- Theme preference (light/dark mode)

**Note**: Data is stored locally on your device and won't sync across browsers or devices.

## 📱 Features Demo

### Sample Data
The app comes with realistic sample data to demonstrate all features:
- 5 sample subjects with professor names and lecture schedules
- 8 sample tasks with various priorities and deadlines
- 5 sample exams scheduled over the next month
- 6 sample study sessions

## 🎯 Usage Tips

1. **Start with Subjects**: Add your university subjects first to organize your courses
2. **Add Tasks**: Create tasks linked to each subject with clear deadlines
3. **Schedule Study**: Plan study sessions to manage your workload
4. **Track Exams**: Add all exam dates to stay prepared
5. **Monitor Progress**: Check the Dashboard regularly for overview and alerts
6. **Use Calendar**: View the monthly calendar for a visual schedule overview
7. **Toggle Theme**: Use the sidebar button to switch between light and dark modes

## 📊 Statistics & Analytics

- **Dashboard**: Real-time overview of tasks, exams, and study progress
- **Task Metrics**: Completion rate percentage and overdue task count
- **Study Analytics**: Daily and weekly study hour totals
- **Subject Progress**: Per-subject task completion and exam tracking

## 🔐 Privacy

UniTask stores all data locally in your browser. No data is sent to any server. Your academic information stays private and on your device.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

Created for university students by students, with a focus on practical productivity and ease of use.

---

**UniTask** - Your personal university task management companion! 🎓