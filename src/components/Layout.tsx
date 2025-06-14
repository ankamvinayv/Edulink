import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  Calendar,
  BookOpen,
  BarChart3,
  FileText,
  GraduationCap,
  CreditCard,
  Landmark,
  Play,
  User,
  LogOut,
  X,
} from 'lucide-react';
import { auth } from '@/firebaseconfig';

interface LayoutProps {
  children: React.ReactNode;
  userType: 'admin' | 'student';
}

const Layout: React.FC<LayoutProps> = ({ children, userType }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowProfileDropdown(false);
      }
    }

    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown]);

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'attendance', label: 'Attendance', icon: Calendar },
    { id: 'assignments', label: 'Assignments', icon: BookOpen },
    { id: 'grades', label: 'Grades', icon: BarChart3 },
    { id: 'diary', label: 'Digital Diary', icon: FileText },
    { id: 'payments', label: 'Fee Payments', icon: CreditCard },
    { id: 'schemes', label: 'Govt Schemes', icon: Landmark },
    { id: 'epage', label: 'E-Page', icon: Play },
    { id: 'staff', label: 'Staff Management', icon: Lock, hidden: true }, // Hidden for students
  ];

  const studentNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'assignments', label: 'Assignments', icon: BookOpen },
    { id: 'diary', label: 'Announcements', icon: FileText },
    { id: 'payments', label: 'Fee Status', icon: CreditCard },
    { id: 'schemes', label: 'Govt Schemes', icon: Landmark },
    { id: 'epage', label: 'E-Page', icon: Play },
  ];

  const navItems = userType === 'admin' ? adminNavItems : studentNavItems;

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 relative">
      {/* Header */}
      <header className="floating-card mx-4 mt-4 mb-6 relative z-20">
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
          <div className="flex items-center space-x-4 relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center text-gray-700 hover:text-blue-500 focus:outline-none"
              aria-expanded={showProfileDropdown}
              aria-haspopup="true"
              type="button"
            >
              <User className="w-5 h-5 mr-1" />
              <span>Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-700 hover:text-red-500"
            >
              <LogOut className="w-5 h-5 mr-1" />
              <span>Logout</span>
            </button>

            {/* Dropdown container */}
            {showProfileDropdown && user && (
              <div
                ref={dropdownRef}
                className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 p-5 text-gray-800 z-50"
                role="dialog"
                aria-modal="true"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">User Details</h3>
                  <button
                    onClick={() => setShowProfileDropdown(false)}
                    aria-label="Close profile dropdown"
                    className="text-gray-500 hover:text-gray-700"
                    type="button"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  <p><strong>Email:</strong> {user.email || 'Not set'}</p>
                  <p><strong>User Type:</strong> {userType.charAt(0).toUpperCase() + userType.slice(1)}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex gap-6 mx-4 pb-6">
        {/* Sidebar */}
        <aside className="w-64 floating-card h-fit">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {userType === 'admin' ? 'Admin Menu' : 'Student Menu'}
            </h2>
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      activeTab === item.id
                        ? userType === 'admin'
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-green-500 text-white shadow-lg'
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
            {React.cloneElement(children as React.ReactElement, { activeTab, userType })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

