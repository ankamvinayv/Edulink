// FileName: MultipleFiles/ContentRouter.tsx
import React from 'react';
import Dashboard from './Dashboard';
import Attendance from './Attendance';
import Assignments from './Assignments';
import Grades from './Grades';
import DigitalDiary from './DigitalDiary';
import FeePayments from './FeePayments';
import GovtSchemes from './GovtSchemes';
import EPage from './Epage';
import StaffManagement from './StaffManagement';
// Import any additional components as needed

interface ContentRouterProps {
  activeTab: string; // The currently active tab
  userType: 'admin' | 'student'; // User type to customize content
}

const ContentRouter: React.FC<ContentRouterProps> = ({ activeTab, userType }) => {
  // Function to render a placeholder for unavailable content
  const renderPlaceholder = (title: string, description: string, icon: React.ReactNode) => (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mb-6">
        {icon}
      </div>
      <h2 className="text-3xl font-bold gradient-text mb-4">{title}</h2>
      <p className="text-gray-600 text-lg max-w-md mx-auto">
        {description}
      </p>
      <button className="btn-3d mt-6">
        Coming Soon
      </button>
    </div>
  );

  // Switch statement to render the appropriate component based on activeTab
  switch (activeTab) {
    case 'dashboard':
      return <Dashboard userType={userType} />;
    
    case 'attendance':
      return <Attendance userType={userType} />;
    
    case 'assignments':
      return <Assignments userType={userType} />;
    
    case 'grades':
      return <Grades userType={userType} />;
    
    case 'diary':
      return <DigitalDiary userType={userType} />;
    
    case 'payments':
      return <FeePayments userType={userType} />;
    
    case 'schemes':
      return <GovtSchemes userType={userType} />;
    
    case 'epage':
      return <EPage userType={userType} />;

    case 'staff':
      if (userType === 'admin') {
        return <StaffManagement  />; // Render StaffManagement for admin users
      }
      return renderPlaceholder(
        'Staff Management',
        'This feature is available only for admin users.',
         <span className="text-4xl">🔒</span>
      );
    
    // Placeholder for any future tabs or features
    
    default:
      return <Dashboard userType={userType} />; // Default to Dashboard if no match
  }
};

export default ContentRouter;
