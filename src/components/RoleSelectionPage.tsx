// import React from 'react';
// import { GraduationCap } from 'lucide-react';

// interface RoleSelectionPageProps {
//   onSelectRole: (type: 'admin' | 'student') => void;
// }

// const RoleSelectionPage: React.FC<RoleSelectionPageProps> = ({ onSelectRole }) => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
//       <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md text-center">
//         <div className="mb-6">
//           <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
//             <GraduationCap className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-2xl font-bold mt-4">Welcome to Edulink</h1>
//           <p className="text-gray-600">Select your portal to continue</p>
//         </div>
//         <div className="space-y-4">
//           <button
//             onClick={() => onSelectRole('admin')}
//             className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold shadow hover:bg-blue-600 transition"
//           >
//             Admin Portal
//           </button>
//           <button
//             onClick={() => onSelectRole('student')}
//             className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold shadow hover:bg-green-600 transition"
//           >
//             Student Portal
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RoleSelectionPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  const handleSelectRole = (type: 'admin' | 'student') => {
    if (type === 'admin') {
      navigate('/admin-login');
    } else if (type === 'student') {
      navigate('/student-auth');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold mt-4">Welcome to Edulink</h1>
          <p className="text-gray-600">Select your portal to continue</p>
        </div>
        <div className="space-y-4">
          <button
            onClick={() => handleSelectRole('admin')}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold shadow hover:bg-blue-600 transition"
          >
            Admin Portal
          </button>
          <button
            onClick={() => handleSelectRole('student')}
            className="w-full bg-green-500 text-white py-3 rounded-xl font-semibold shadow hover:bg-green-600 transition"
          >
            Student Portal
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
