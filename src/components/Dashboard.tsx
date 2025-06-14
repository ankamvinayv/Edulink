import React from 'react';
import { Users, BookOpen, Calendar, TrendingUp, Bell, Award, Clock, DollarSign } from 'lucide-react';

interface DashboardProps {
  userType: 'admin' | 'student';
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
  const adminStats = [
    { label: 'Total Students', value: '600', icon: Users, color: 'blue' },
    { label: 'Active Courses', value: '15', icon: BookOpen, color: 'green' },
    { label: 'Today\'s Attendance', value: '92%', icon: Calendar, color: 'purple' },
    { label: 'Pending Fees', value: '$12,450', icon: DollarSign, color: 'red' },
  ];

  const studentStats = [
    { label: 'Attendance Rate', value: '94%', icon: Calendar, color: 'green' },
    { label: 'Assignments Due', value: '3', icon: BookOpen, color: 'orange' },
    { label: 'Current Percentage', value: '80%', icon: Award, color: 'blue' },
    { label: 'Hours Studied', value: '14h', icon: Clock, color: 'purple' },
  ];

  const stats = userType === 'admin' ? adminStats : studentStats;

  const recentActivities = userType === 'admin' ? [
    { title: 'New student enrollment', time: '2 hours ago', type: 'info' },
    { title: 'Grade 10 Math assignment submitted', time: '4 hours ago', type: 'success' },
    { title: 'Fee payment received from John Doe', time: '6 hours ago', type: 'success' },
    { title: 'Teacher leave request pending', time: '1 day ago', type: 'warning' },
  ] : [
    { title: 'Math assignment graded', time: '1 hour ago', type: 'success' },
    { title: 'New announcement posted', time: '3 hours ago', type: 'info' },
    { title: 'Physics quiz scheduled', time: '5 hours ago', type: 'warning' },
    { title: 'Library book due reminder', time: '1 day ago', type: 'info' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold gradient-text mb-4">
          Welcome to {userType === 'admin' ? 'Admin' : 'Student'} Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          {userType === 'admin' 
            ? 'Manage your school efficiently with our comprehensive tools'
            : 'Track your academic progress and stay organized'
          }
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card-3d p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="card-3d p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            {userType === 'admin' ? (
              <>
                <button className="w-full btn-3d text-left">
                  Add New Student
                </button>
                <button className="w-full btn-secondary-3d text-left">
                  Create Assignment
                </button>
                <button className="w-full btn-3d text-left">
                  Update Attendance
                </button>
              </>
            ) : (
              <>
                <button className="w-full btn-3d text-left">
                  Submit Assignment
                </button>
                <button className="w-full btn-secondary-3d text-left">
                  View Schedule
                </button>
                <button className="w-full btn-3d text-left">
                  Contact Teacher
                </button>
              </>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card-3d p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-3 h-3 rounded-full bg-${
                  activity.type === 'success' ? 'green' : 
                  activity.type === 'warning' ? 'yellow' : 'blue'
                }-500`}></div>
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{activity.title}</p>
                  <p className="text-gray-500 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder
      <div className="card-3d p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          {userType === 'admin' ? 'School Performance Overview' : 'Academic Progress'}
        </h3>
        <div className="h-64 bg-gradient-to-r from-blue-100 to-green-100 rounded-xl flex items-center justify-center">
          <p className="text-gray-600 text-lg">Interactive Chart Coming Soon</p>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
