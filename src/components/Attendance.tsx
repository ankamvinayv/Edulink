// 
import React, { useState, useEffect } from "react";
import { Calendar, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import { fetchStudentsByClass, saveAttendanceRecord } from "@/firebase"; // Adjust the path as needed
import { useAppContext } from '../context/AppContext';

type AttendanceStatus = "present" | "absent" | "late";

interface Student {
  id: string;
  name: string;
  rollNo: string;
  class: string;
  attendanceStatus: AttendanceStatus | null;
}

interface AttendanceProps {
  userType: "admin" | "student";
}

const Attendance: React.FC<AttendanceProps> = ({ userType }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedClass, setSelectedClass] = useState("10-A");
  const [students, setStudents] = useState<Student[]>([]);
  const [attendanceMap, setAttendanceMap] = useState<
    Record<string, AttendanceStatus | null>
  >({});

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const data = await fetchStudentsByClass(selectedClass);
        console.log("Fetched students:", data);

        const sorted = data
          .map((s) => ({
            ...s,
            attendanceStatus: s.attendanceStatus ?? null,
          }))
          .sort((a, b) => Number(a.rollNo) - Number(b.rollNo));

        setStudents(sorted);

        const initialMap: Record<string, AttendanceStatus | null> = {};
        sorted.forEach((s) => (initialMap[s.id] = s.attendanceStatus));
        setAttendanceMap(initialMap);
      } catch (error) {
        console.error("Failed to load students:", error);
      }
    };
    loadStudents();
  }, [selectedClass]);

  const updateAttendance = (studentId: string, status: AttendanceStatus) => {
    setAttendanceMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const saveAttendance = async () => {
    try {
      await Promise.all(
        students.map((student) => {
          const status = attendanceMap[student.id] ?? "absent"; // Default to 'absent'
          return saveAttendanceRecord(student.id, {
            date: selectedDate,
            class: selectedClass,
            status,
          });
        })
      );
      alert("Attendance saved successfully!");
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Failed to save attendance.");
    }
  };

  const presentCount = Object.values(attendanceMap).filter(
    (s) => s === "present"
  ).length;
  const absentCount = Object.values(attendanceMap).filter(
    (s) => s === "absent" || s === null
  ).length;
  const lateCount = Object.values(attendanceMap).filter(
    (s) => s === "late"
  ).length;

  if (userType === "student") {
    return (
      <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
        <header className="flex items-center gap-4">
          <Calendar className="w-8 h-8 text-gray-700" />
          <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
        </header>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="card-3d rounded-lg p-4 shadow-sm">
            <p className="text-3xl font-bold text-green-600">{presentCount}</p>
            <p className="text-gray-600 text-sm">Days Present</p>
          </div>
          <div className="card-3d rounded-lg p-4 shadow-sm">
            <p className="text-3xl font-bold text-red-600">{absentCount}</p>
            <p className="text-gray-600 text-sm">Days Absent</p>
          </div>
          <div className="card-3d rounded-lg p-4 shadow-sm">
            <p className="text-3xl font-bold text-yellow-600">{lateCount}</p>
            <p className="text-gray-600 text-sm">Days Late</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-4">
          <Users className="w-10 h-10 text-gray-700" />
          Attendance Management
        </h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <label
              htmlFor="date"
              className="block text-lg font-semibold text-gray-700 mb-1"
            >
              Date
            </label>
            <input
              id="date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label
              htmlFor="class"
              className="block text-lg font-semibold text-gray-700 mb-1"
            >
              Class
            </label>
            <select
              id="class"
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              {[...Array(10)].flatMap((_, i) =>
                ["A", "B"].map((section) => (
                  <option key={`${i + 1}-${section}`} value={`${i + 1}-${section}`}>
                    Class {i + 1}-{section}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </header>

      {/* Attendance Analysis Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-7xl mx-auto mb-8">
        <div className="card-3d rounded-lg bg-white p-4 shadow-sm flex flex-col items-center justify-center">
          <p className="text-3xl font-extrabold text-green-600">{presentCount}</p>
          <p className="text-gray-600 text-sm mt-1">Present</p>
        </div>
        <div className="card-3d rounded-lg bg-white p-4 shadow-sm flex flex-col items-center justify-center">
          <p className="text-3xl font-extrabold text-red-600">{absentCount}</p>
          <p className="text-gray-600 text-sm mt-1">Absent</p>
        </div>
        <div className="card-3d rounded-lg bg-white p-4 shadow-sm flex flex-col items-center justify-center">
          <p className="text-3xl font-extrabold text-gray-900">{students.length}</p>
          <p className="text-gray-600 text-sm mt-1">Total Students</p>
        </div>
      </section>

      <section className="space-y-4">
        {students.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">Loading students...</p>
        ) : (
          students.map((student) => {
            const status = attendanceMap[student.id];
            return (
              <article
                key={student.id}
                className="flex justify-between items-center rounded-lg border border-gray-200 p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{student.name}</h2>
                  <p className="text-gray-600 text-base">Roll No: {student.rollNo}</p>
                </div>
                <div className="flex space-x-2">
                  {(["present", "absent"] as AttendanceStatus[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateAttendance(student.id, option)}
                      className={`px-4 py-1 rounded-md font-semibold transition ${
                        status === option
                          ? option === "present"
                            ? "bg-green-200 text-green-900"
                            : "bg-red-200 text-red-900"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      aria-pressed={status === option}
                      aria-label={`Mark ${student.name} as ${option}`}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </button>
                  ))}
                </div>
              </article>
            );
          })
        )}
      </section>

      <div className="flex justify-end">
        <button
          onClick={saveAttendance}
          className="btn-3d px-8 py-3 font-bold rounded-lg"
        >
          Save Attendance
        </button>
      </div>
    </main>
  );
};

export default Attendance;
