
// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { GraduationCap, Users, BookOpen, BarChart3, Award, Shield } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();

//   const features = [
//     {
//       icon: Users,
//       title: "Student Management",
//       description: "Comprehensive student profiles and tracking"
//     },
//     {
//       icon: BookOpen,
//       title: "Course Management",
//       description: "Organize and manage all your courses efficiently"
//     },
//     {
//       icon: BarChart3,
//       title: "Analytics & Reports",
//       description: "Detailed insights into student performance"
//     },
//     {
//       icon: Award,
//       title: "Grade Management",
//       description: "Easy grading and assessment tools"
//     },
//     {
//       icon: Shield,
//       title: "Secure Platform",
//       description: "Enterprise-grade security for your data"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
//       {/* Header */}
//       <header className="relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
//           <div className="text-center">
//             {/* Logo */}
//             <div className="flex justify-center mb-8">
//               <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
//                 <GraduationCap className="w-10 h-10 text-white" />
//               </div>
//             </div>

//             {/* Hero Content */}
//             <h1 className="text-5xl md:text-7xl font-bold mb-6">
//               <span className="gradient-text">EduManage</span>
//               <br />
//               <span className="text-gray-700">Pro</span>
//             </h1>
            
//             <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
//               Transform your educational institution with our comprehensive 
//               <span className="font-semibold text-blue-600"> school management system</span>. 
//               Streamline operations, enhance learning, and boost productivity.
//             </p>

//             {/* CTA Button */}
//             <div className="mb-16">
//               <Button
//                 onClick={() => navigate('/dashboard')}
//                 className="btn-3d text-lg px-12 py-6 text-white font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
//               >
//                 Get Started
//                 <GraduationCap className="ml-3 w-6 h-6" />
//               </Button>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
//               <div className="card-3d p-6 text-center">
//                 <div className="text-3xl font-bold gradient-text mb-2">10,000+</div>
//                 <div className="text-gray-600">Students Managed</div>
//               </div>
//               <div className="card-3d p-6 text-center">
//                 <div className="text-3xl font-bold gradient-text mb-2">500+</div>
//                 <div className="text-gray-600">Schools Trust Us</div>
//               </div>
//               <div className="card-3d p-6 text-center">
//                 <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
//                 <div className="text-gray-600">Uptime Guaranteed</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Features Section */}
//       <section className="py-24 relative">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
//               Everything You Need
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Powerful features designed to simplify school management and enhance the educational experience
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <div
//                   key={index}
//                   className="card-3d p-8 text-center group hover:scale-105 transition-all duration-300"
//                 >
//                   <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
//                     <Icon className="w-8 h-8 text-blue-600" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
//                   <p className="text-gray-600">{feature.description}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-24 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-green-600/5"></div>
//         <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
//           <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
//             Ready to Get Started?
//           </h2>
//           <p className="text-xl text-gray-600 mb-12">
//             Join thousands of schools already using Edulink to transform their operations
//           </p>
//           <Button
//             onClick={() => navigate('/dashboard')}
//             className="btn-3d text-lg px-12 py-6 text-white font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
//           >
//             Launch Dashboard
//             <BarChart3 className="ml-3 w-6 h-6" />
//           </Button>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-12 border-t border-gray-200">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
//               <GraduationCap className="w-4 h-4 text-white" />
//             </div>
//             <span className="text-lg font-bold gradient-text">Edulink</span>
//           </div>
//           <p className="text-gray-600">
//             © 2024 Edulink. Empowering education through technology.
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;
import React from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, BookOpen, BarChart3, Award, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Student Management",
      description: "Comprehensive student profiles and tracking"
    },
    {
      icon: BookOpen,
      title: "ECourse Management",
      description: "Organize and manage all your courses efficiently"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Detailed insights into student performance"
    },
    {
      icon: Award,
      title: "Grade Management",
      description: "Easy grading and assessment tools"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security for your data"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-green-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Hero Content */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Education</span>
              <br />
              <span className="text-gray-700">Link</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                       Transform your educational institution with our comprehensive 
                       <br />
                       
              <span className="font-semibold text-blue-600">school management system</span>. 
              
            </p>

            {/* CTA Button */}
            <div className="mb-16">
              <Button
                onClick={() => navigate('/select-role')}
                className="btn-3d text-lg px-12 py-6 text-white font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                Get Started
                <GraduationCap className="ml-3 w-6 h-6" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="card-3d p-6 text-center">
                <div className="text-3xl font-bold gradient-text mb-2">1000+</div>
                <div className="text-gray-600">Students Managed</div>
              </div>
              <div className="card-3d p-6 text-center">
                <div className="text-3xl font-bold gradient-text mb-2">500+</div>
                <div className="text-gray-600">Schools Trust Us</div>
              </div>
              <div className="card-3d p-6 text-center">
                <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
                <div className="text-gray-600">Uptime Guaranteed</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to simplify school management and enhance the educational experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="card-3d p-8 text-center group hover:scale-105 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-green-600/5"></div>
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of schools already using Edulink to transform their operations
          </p>
          <Button
            onClick={() => navigate('/select-role')}
            className="btn-3d text-lg px-12 py-6 text-white font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            Launch  your Dashboard
            <BarChart3 className="ml-3 w-6 h-6" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">Edulink</span>
          </div>
          <p className="text-gray-600">
            Edulink. Empowering education through technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
