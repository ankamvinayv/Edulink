import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { fetchStudentsByClass, fetchGradesByClass, addGrade, updateGrade } from '@/firebase'; // Adjust import path
import { BarChart3 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

interface Student {
  id: string;
  name: string;
  class: string;
  rollNo: string;
}

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

interface GradesProps {
  userType: 'admin' | 'student';
}

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
const examTypes = ['Mid-term', 'Final', 'Quiz', 'Assignment'];

const Grades: React.FC<GradesProps> = ({ userType }) => {
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedExam, setSelectedExam] = useState(examTypes[0]);
  const [students, setStudents] = useState<Student[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [editableGrades, setEditableGrades] = useState<Record<string, Grade>>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const studentsData = await fetchStudentsByClass(selectedClass);
        setStudents(studentsData);

        const gradesData = await fetchGradesByClass(selectedClass);
        setGrades(gradesData);

        const initialEditable: Record<string, Grade> = {};
        studentsData.forEach((student) => {
          const existing = gradesData.find(
            (g) =>
              g.studentId === student.id &&
              g.subject === selectedSubject &&
              g.examType === selectedExam
          );
          initialEditable[student.id] = existing
            ? { ...existing }
            : {
                studentId: student.id,
                studentName: student.name,
                subject: selectedSubject,
                examType: selectedExam,
                marks: 0,
                grade: '',
                date: '',
                class: selectedClass,
              };
        });
        setEditableGrades(initialEditable);
      } catch (e) {
        console.error('Error loading grades/students:', e);
      }
    };
    loadData();
  }, [selectedClass, selectedSubject, selectedExam]);

  const calculateGrade = (marks: number) => {
    if (marks >= 95) return 'A+';
    if (marks >= 85) return 'A';
    if (marks >= 75) return 'B+';
    if (marks >= 65) return 'B';
    if (marks >= 55) return 'C+';
    if (marks >= 45) return 'C';
    return 'F';
  };

  const handleMarkChange = (studentId: string, marks: number) => {
    setEditableGrades((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        marks,
        grade: calculateGrade(marks),
        date: new Date().toISOString().split('T')[0],
      },
    }));
  };

  const saveAllGrades = async () => {
    try {
      await Promise.all(
        Object.values(editableGrades).map(async (grade) => {
          if (grade.id) {
            await updateGrade(grade.id, grade);
          } else {
            await addGrade(grade);
          }
        })
      );
      alert('Grades saved successfully!');
    } catch (error) {
      console.error('Error saving grades:', error);
      alert('Failed to save grades.');
    }
  };

  // Calculate analysis data
  const totalStudents = students.length;
  const totalMarks = Object.values(editableGrades).reduce((acc, grade) => acc + grade.marks, 0);
  const averageMarks = totalStudents ? Math.round(totalMarks / totalStudents) : 0;

  const gradeCounts = {
    'A+': 0,
    A: 0,
    'B+': 0,
    B: 0,
    'C+': 0,
    C: 0,
    F: 0,
  };

  Object.values(editableGrades).forEach((grade) => {
    gradeCounts[grade.grade] = (gradeCounts[grade.grade] || 0) + 1;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto bg-white rounded-xl shadow-lg space-y-8">
      <header className="flex items-center gap-4">
        <BarChart3 className="w-8 h-8 text-gray-700" />
        <h1 className="text-4xl font-extrabold gradient-text">Grade Management</h1>
      </header>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="rounded-md border border-gray-300 p-3"
          aria-label="Select Class"
        >
          {[...Array(10)].flatMap((_, i) =>
            ['A', 'B'].map((section) => (
              <option key={`${i + 1}-${section}`} value={`${i + 1}-${section}`}>
                Class {i + 1}-{section}
              </option>
            ))
          )}
        </select>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="rounded-md border border-gray-300 p-3"
          aria-label="Select Subject"
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <select
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          className="rounded-md border border-gray-300 p-3"
          aria-label="Select Exam Type"
        >
          {examTypes.map((exam) => (
            <option key={exam} value={exam}>
              {exam}
            </option>
          ))}
        </select>
      </div>

      {/* Analysis Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="card-3d">
          <CardContent className="text-center">
            <p className="text-2xl font-bold">{totalStudents}</p>
            <p className="text-gray-600">Total Students</p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="text-center">
            <p className="text-2xl font-bold">{averageMarks}</p>
            <p className="text-gray-600">Average Marks</p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="text-center">
            <p className="text-2xl font-bold">{gradeCounts['A+']}</p>
            <p className="text-gray-600">A+ Grades</p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="text-center">
            <p className="text-2xl font-bold">{gradeCounts.A}</p>
            <p className="text-gray-600">A Grades</p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="text-center">
            <p className="text-2xl font-bold">{gradeCounts['B+']}</p>
            <p className="text-gray-600">B+ Grades</p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="text-center">
            <p className="text-2xl font-bold">{gradeCounts.B}</p>
            <p className="text-gray-600">B Grades</p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="text-center">
            <p className="text-2xl font-bold">{gradeCounts['C+']}</p>
            <p className="text-gray-600">C+ Grades</p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="text-center">
            <p className="text-2xl font-bold">{gradeCounts.C}</p>
            <p className="text-gray-600">C Grades</p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="text-center">
            <p className="text-2xl font-bold">{gradeCounts.F}</p>
            <p className="text-gray-600">F Grades</p>
          </CardContent>
        </Card>
      </div>

      {/* Grades Table */}
      <Card className="rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="gradient-text">
            Grades for {selectedClass} - {selectedSubject} - {selectedExam}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-gray-500">
                      No students found.
                    </TableCell>
                  </TableRow>
                ) : (
                  students.map((student) => {
                    const grade = editableGrades[student.id];
                    return (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={grade?.marks ?? 0}
                            onChange={(e) =>
                              handleMarkChange(student.id, Number(e.target.value))
                            }
                            className="border p-1 w-20 rounded"
                            aria-label={`Marks for ${student.name}`}
                          />
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full font-semibold ${
                              grade?.grade === "A+" || grade?.grade === "A"
                                ? "bg-green-100 text-green-800"
                                : grade?.grade === "B+" || grade?.grade === "B"
                                ? "bg-yellow-100 text-yellow-800"
                                : grade?.grade === "C+" || grade?.grade === "C"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {grade?.grade || ""}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Save Grades Button */}
      <div className="flex justify-end">
        <Button className="btn-3d px-8 py-4" onClick={saveAllGrades}>
          Save Grades
        </Button>
      </div>
    </div>
  );
};

export default Grades;
