import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for your data structures
interface Grade {
  id?: string;
  studentId: string;
  studentName: string;
  subject: string;
  examType: string;
  marks: number;
  grade: string;
  date: string;
  class: string;
}

interface AttendanceRecord {
  studentId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

interface Assignment {
  id?: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  status: 'active' | 'submitted' | 'pending';
  description: string;
}

interface DiaryEntry {
  id?: string;
  title: string;
  content: string;
  date: string;
  author: string;
  type: 'general' | 'event' | 'notice' | 'meeting';
  pinned: boolean;
}

// Define the context type
interface AppContextType {
  grades: Grade[];
  attendance: AttendanceRecord[];
  assignments: Assignment[];
  diaryEntries: DiaryEntry[];
  updateGrades: (newGrades: Grade[]) => void;
  updateAttendance: (newAttendance: AttendanceRecord[]) => void;
  updateAssignments: (newAssignments: Assignment[]) => void;
  updateDiaryEntries: (newEntries: DiaryEntry[]) => void;
}

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create the provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  const updateGrades = (newGrades: Grade[]) => setGrades(newGrades);
  const updateAttendance = (newAttendance: AttendanceRecord[]) => setAttendance(newAttendance);
  const updateAssignments = (newAssignments: Assignment[]) => setAssignments(newAssignments);
  const updateDiaryEntries = (newEntries: DiaryEntry[]) => setDiaryEntries(newEntries);

  return (
    <AppContext.Provider value={{ grades, attendance, assignments, diaryEntries, updateGrades, updateAttendance, updateAssignments, updateDiaryEntries }}>
      {children}
    </AppContext.Provider>
  );
};

// Create a custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
