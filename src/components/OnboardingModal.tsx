import React, { useState } from 'react';
import { StudentProfile } from '../types';
import { Button } from './Button';
import { getMajors, getCoursesByMajor } from '../data/majorsAndCourses';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: StudentProfile) => void;
}

type Step = 'name' | 'major' | 'courses';

export const OnboardingModal: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<Set<string>>(new Set());

  const majors = getMajors();
  const availableCourses = major ? getCoursesByMajor(major) : [];

  const handleToggleCourse = (course: string) => {
    const newSelected = new Set(selectedCourses);
    if (newSelected.has(course)) {
      newSelected.delete(course);
    } else {
      newSelected.add(course);
    }
    setSelectedCourses(newSelected);
  };

  const handleNameNext = () => {
    if (name.trim()) {
      setStep('major');
    }
  };

  const handleMajorNext = () => {
    if (major) {
      setStep('courses');
    }
  };

  const handleComplete = () => {
    if (selectedCourses.size > 0) {
      const profile: StudentProfile = {
        name: name.trim(),
        major,
        selectedCourses: Array.from(selectedCourses),
        onboardingCompleted: true,
      };
      onComplete(profile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 px-8 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Welcome to UniTask! 🎓</h1>
          <p className="text-primary-100">Let's set up your academic profile</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Step 1: Name */}
          {step === 'name' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  What's your name?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleNameNext()}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  autoFocus
                />
              </div>
              <Button
                onClick={handleNameNext}
                disabled={!name.trim()}
                variant="primary"
                className="w-full"
              >
                Continue <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Major */}
          {step === 'major' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Select your major/department
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {majors.map((maj) => (
                    <button
                      key={maj}
                      onClick={() => setMajor(maj)}
                      className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                        major === maj
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-200'
                          : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-primary-300 dark:hover:border-primary-700'
                      }`}
                    >
                      {major === maj && <CheckCircle2 className="w-4 h-4 inline mr-2" />}
                      {maj}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => setStep('name')}
                  variant="secondary"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleMajorNext}
                  disabled={!major}
                  variant="primary"
                  className="flex-1"
                >
                  Continue <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Courses */}
          {step === 'courses' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Select your courses for {major}
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Choose at least one course
                </p>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {availableCourses.map((course) => (
                    <label
                      key={course}
                      className="flex items-center p-3 rounded-lg border-2 border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-700 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCourses.has(course)}
                        onChange={() => handleToggleCourse(course)}
                        className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 focus:ring-primary-600 cursor-pointer"
                      />
                      <span className="ml-3 font-medium text-gray-700 dark:text-gray-300">
                        {course}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    setStep('major');
                    setSelectedCourses(new Set());
                  }}
                  variant="secondary"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={selectedCourses.size === 0}
                  variant="primary"
                  className="flex-1"
                >
                  Complete Setup <CheckCircle2 className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
