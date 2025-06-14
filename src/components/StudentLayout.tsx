    import React, { useState } from 'react';
    import { Home, Users, BookOpen, Calendar, GraduationCap, CreditCard, FileText, BarChart3 } from 'lucide-react';

    interface StudentLayoutProps {
      children: React.ReactNode;
    }

    const StudentLayout: React.FC<StudentLayoutProps> = ({ children }) => {
      const [activeTab, setActiveTab] = useState('dashboard');

      const studentNavItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        //{ id: 'attendance', label: 'My Attendance', icon: Calendar },
        { id: 'assignments', label: 'Assignments', icon: BookOpen },
        //{ id: 'grades', label: 'My Grades', icon: BarChart3 },
        { id: 'diary', label: 'Announcements', icon: FileText },
        { id: 'elearning', label: 'Courses', icon: GraduationCap },
        { id: 'payments', label: 'Fee Status', icon: CreditCard },
      ];

      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          {/* Header */}
          <header className="floating-card mx-4 mt-4 mb-6">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text">Edulink</h1>
                  <p className="text-sm text-gray-600">School Management System</p>
                </div>
              </div>
            </div>
          </header>

          <div className="flex gap-6 mx-4 pb-6">
            {/* Sidebar */}
            <aside className="w-64 floating-card h-fit">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Student Menu</h2>
                <nav className="space-y-2">
                  {studentNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          activeTab === item.id
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              <div className="floating-card p-8 min-h-[600px]">
                {React.cloneElement(children as React.ReactElement, { activeTab, userType: 'student' })}
              </div>
            </main>
          </div>
        </div>
      );
    };

    export default StudentLayout;
    