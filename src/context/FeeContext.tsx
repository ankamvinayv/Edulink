// FeeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Student {
  id: string;
  name: string;
  classType: string;
}

interface FeeData {
  id: string;
  studentId: string;
  classType: string;
  feeType: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
}

const generateMockData = () => {
  const students: Student[] = Array.from({ length: 30 }, (_, i) => ({
    id: `student-${i + 1}`,
    name: `Student ${i + 1}`,
    classType: i % 2 === 0 ? '10A' : '10B',
  }));

  const fees: FeeData[] = students.map(student => ({
    id: `fee-${student.id}`,
    studentId: student.id,
    classType: student.classType,
    feeType: 'Tuition',
    amount: 100 + Math.floor(Math.random() * 100),
    dueDate: '2024-12-31',
    status: Math.random() > 0.5 ? 'paid' : 'pending',
  }));

  return { students, fees };
};

interface FeeContextProps {
  students: Student[];
  fees: FeeData[];
  updateFee: (fee: FeeData) => void;
}

const FeeContext = createContext<FeeContextProps | null>(null);

export const FeeProvider = ({ children }: { children: ReactNode }) => {
  const { students, fees: initialFees } = generateMockData();
  const [fees, setFees] = useState<FeeData[]>(initialFees);

  const updateFee = (updatedFee: FeeData) => {
    setFees(prev =>
      prev.some(f => f.studentId === updatedFee.studentId)
        ? prev.map(f => (f.studentId === updatedFee.studentId ? updatedFee : f))
        : [...prev, updatedFee]
    );
  };

  return (
    <FeeContext.Provider value={{ students, fees, updateFee }}>
      {children}
    </FeeContext.Provider>
  );
};

export const useFeeContext = () => {
  const context = useContext(FeeContext);
  if (!context) throw new Error('useFeeContext must be used within a FeeProvider');
  return context;
};
