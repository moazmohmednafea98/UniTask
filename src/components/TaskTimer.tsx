import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2 } from 'lucide-react';

interface TaskTimerProps {
  taskId: string;
  initialElapsedTime?: number;
  onTimeUpdate: (seconds: number) => void;
  onFinish?: () => void;
}

export const TaskTimer: React.FC<TaskTimerProps> = ({
  taskId,
  initialElapsedTime = 0,
  onTimeUpdate,
  onFinish,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(initialElapsedTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => {
          const newTime = prev + 1;
          onTimeUpdate(newTime);
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, onTimeUpdate]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setElapsedSeconds(0);
    setIsRunning(false);
    onTimeUpdate(0);
  };
  const handleFinish = () => {
    setIsRunning(false);
    onFinish?.();
  };

  return (
    <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-3 border border-blue-200 dark:border-blue-700">
      <div className="flex-1">
        <div className="text-lg font-mono font-bold text-blue-900 dark:text-blue-100">
          {formatTime(elapsedSeconds)}
        </div>
        <p className="text-xs text-blue-700 dark:text-blue-300">Study Time</p>
      </div>
      <div className="flex gap-2">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="p-2 hover:bg-blue-200 dark:hover:bg-blue-700 rounded-lg transition-colors text-blue-700 dark:text-blue-300"
            title="Start"
          >
            <Play className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="p-2 hover:bg-blue-200 dark:hover:bg-blue-700 rounded-lg transition-colors text-blue-700 dark:text-blue-300"
            title="Pause"
          >
            <Pause className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={handleReset}
          className="p-2 hover:bg-blue-200 dark:hover:bg-blue-700 rounded-lg transition-colors text-blue-700 dark:text-blue-300"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
        <button
          onClick={handleFinish}
          className="p-2 hover:bg-green-200 dark:hover:bg-green-700 rounded-lg transition-colors text-green-700 dark:text-green-300"
          title="Finish"
        >
          <CheckCircle2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
