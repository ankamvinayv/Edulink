import React, { useEffect, useState, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit3, Save } from 'lucide-react';

interface FeePaymentsProps {
  userType: 'admin' | 'student';
}

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
const generateClasses = (): string[] => {
  const classes: string[] = [];
  for (let i = 1; i <= 10; i++) {
    classes.push(`${i}A`);
    classes.push(`${i}B`);
  }
  return classes;
};

const classTypes = generateClasses();

// Ensure one student per class + additional random students
const mockStudents: Student[] = [
  ...classTypes.map((classType, i) => ({
    id: `student-${i + 1}`,
    name: `Student ${i + 1}`,
    classType,
  })),
  ...Array.from({ length: 20 }, (_, i) => {
    const id = i + classTypes.length + 1;
    const classType = classTypes[Math.floor(Math.random() * classTypes.length)];
    return {
      id: `student-${id}`,
      name: `Student ${id}`,
      classType,
    };
  }),
];

const mockFees: FeeData[] = mockStudents.map(student => ({
  id: `fee-${student.id}`,
  studentId: student.id,
  classType: student.classType,
  feeType: 'Tuition',
  amount: 100 + Math.floor(Math.random() * 200),
  dueDate: '2024-12-31',
  status: ['paid', 'pending', 'overdue'][Math.floor(Math.random() * 3)] as FeeData['status'],
}));

// Generate 30 mock students


// Generate class list


const FeePayments: React.FC<FeePaymentsProps> = ({ userType }) => {
  const classes = ['All', ...generateClasses()];

  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [students, setStudents] = useState<Student[]>([]);
  const [studentFees, setStudentFees] = useState<FeeData[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [feeEdits, setFeeEdits] = useState<Partial<FeeData>>({});

  // Filter students/fees when class changes
  useEffect(() => {
    if (selectedClass === 'All') {
      setStudents(mockStudents);
      setStudentFees(mockFees);
    } else {
      setStudents(mockStudents.filter(s => s.classType === selectedClass));
      setStudentFees(mockFees.filter(f => f.classType === selectedClass));
    }

    setEditingId(null);
    setFeeEdits({});
  }, [selectedClass]);

  const handleClassChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value);
  };

  const handleEditClick = (studentId: string) => {
    setEditingId(studentId);
    const fee = studentFees.find(f => f.studentId === studentId);
    setFeeEdits(fee ? { ...fee } : { studentId, classType: selectedClass, feeType: '', amount: 0, dueDate: '', status: 'pending' });
  };

  const handleInputChange = (field: keyof FeeData, value: string | number) => {
    setFeeEdits(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveClick = (studentId: string) => {
    if (!feeEdits.studentId) {
      alert('Invalid fee data.');
      return;
    }

    setStudentFees(prevFees => {
      const exists = prevFees.find(f => f.studentId === studentId);
      if (exists) {
        return prevFees.map(f =>
          f.studentId === studentId ? { ...f, ...feeEdits, classType: f.classType, id: f.id } : f
        );
      } else {
        return [...prevFees, { ...(feeEdits as FeeData), classType: selectedClass, id: `fee-${studentId}` }];
      }
    });

    setEditingId(null);
    setFeeEdits({});
  };

  const StatusBadge = ({ status }: { status: FeeData['status'] }) => {
    const colors = {
      paid: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      overdue: 'bg-red-100 text-red-800',
    };
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>{status}</span>;
  };

  // STUDENT VIEW
  if (userType === 'student') {
    const student = mockStudents[0]; // simulate single student
    const fee = mockFees.find(f => f.studentId === student.id);

    return (
      <div className="space-y-8 max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Fee Payments - Student View</h1>
        <Card>
          <CardHeader>
            <CardTitle>{student.name} - Class {student.classType}</CardTitle>
          </CardHeader>
          <CardContent>
            {!fee ? (
              <p>No fee data available.</p>
            ) : (
              <Table>
                <TableBody>
                  <TableRow><TableCell>Fee Type</TableCell><TableCell>{fee.feeType}</TableCell></TableRow>
                  <TableRow><TableCell>Amount</TableCell><TableCell>${fee.amount.toFixed(2)}</TableCell></TableRow>
                  <TableRow><TableCell>Due Date</TableCell><TableCell>{fee.dueDate}</TableCell></TableRow>
                  <TableRow><TableCell>Status</TableCell><TableCell><StatusBadge status={fee.status} /></TableCell></TableRow>
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // ADMIN VIEW
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Fee Payments - Admin View</h1>
        <select value={selectedClass} onChange={handleClassChange} className="border rounded px-3 py-2 max-w-xs">
          {classes.map(cls => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Students and Fees - {selectedClass === 'All' ? 'All Classes' : `Class ${selectedClass}`}</CardTitle>
        </CardHeader>
        <CardContent>
          {students.length === 0 ? (
            <p>No students found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Fee Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map(student => {
                    const isEditing = editingId === student.id;
                    const fee = studentFees.find(f => f.studentId === student.id);

                    return (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.classType}</TableCell>
                        <TableCell>
                          {isEditing ? (
                            <input
                              type="text"
                              value={feeEdits.feeType ?? fee?.feeType ?? ''}
                              onChange={e => handleInputChange('feeType', e.target.value)}
                              className="border rounded px-2 py-1 w-full"
                            />
                          ) : (fee?.feeType ?? '')}
                        </TableCell>
                        <TableCell>
                          {isEditing ? (
                            <input
                              type="number"
                              value={feeEdits.amount ?? fee?.amount ?? ''}
                              onChange={e => handleInputChange('amount', Number(e.target.value))}
                              className="border rounded px-2 py-1 w-full"
                            />
                          ) : fee ? `$${fee.amount.toFixed(2)}` : ''}
                        </TableCell>
                        <TableCell>
                          {isEditing ? (
                            <input
                              type="date"
                              value={feeEdits.dueDate ?? fee?.dueDate ?? ''}
                              onChange={e => handleInputChange('dueDate', e.target.value)}
                              className="border rounded px-2 py-1 w-full"
                            />
                          ) : (fee?.dueDate ?? '')}
                        </TableCell>
                        <TableCell>
                          {isEditing ? (
                            <select
                              value={feeEdits.status ?? fee?.status ?? 'pending'}
                              onChange={e => handleInputChange('status', e.target.value as FeeData['status'])}
                              className="border rounded px-2 py-1 w-full"
                            >
                              <option value="paid">Paid</option>
                              <option value="pending">Pending</option>
                              <option value="overdue">Overdue</option>
                            </select>
                          ) : fee ? (
                            <StatusBadge status={fee.status} />
                          ) : ''}
                        </TableCell>
                        <TableCell>
                          {isEditing ? (
                            <Button size="sm" onClick={() => handleSaveClick(student.id)}>
                              <Save className="w-4 h-4 mr-1" /> Save
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => handleEditClick(student.id)}>
                              <Edit3 className="w-4 h-4 mr-1" /> Edit
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FeePayments;
