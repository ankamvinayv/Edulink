// import React, { useState, useEffect } from 'react';
// //import { useAppContext } from '../context/AppContext';
// import { BookOpen, Plus, Calendar, CheckCircle, X } from 'lucide-react';
// import { fetchAssignments, addAssignment, updateAssignment, deleteAssignment } from '../firebase';
// import { useAppContext } from '../context/AppContext';

// interface Assignment {
//   id: string;
//   title: string;
//   subject: string;
//   class: string;
//   dueDate: string;
//   status: string;
//   submissions: number;
//   totalStudents: number;
//   description: string;
// }

// interface AssignmentsProps {
//   userType: 'admin' | 'student';
// }

// const Assignments: React.FC<AssignmentsProps> = ({ userType }) => {
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [selectedClass, setSelectedClass] = useState('10-A');
//   const [assignments, setAssignments] = useState<Assignment[]>([]);
//   const [newAssignment, setNewAssignment] = useState<Omit<Assignment, 'id' | 'status' | 'submissions' | 'totalStudents'>>({
//     title: '',
//     subject: '',
//     class: '10-A',
//     dueDate: '',
//     description: ''
//   });

//   // Load assignments once on mount
//   useEffect(() => {
//     const loadAssignments = async () => {
//       try {
//         const data = await fetchAssignments();
//         setAssignments(data);
//       } catch (error) {
//         console.error('Failed to fetch assignments:', error);
//       }
//     };
//     loadAssignments();
//   }, []);

//   // Create new assignment
//   const handleCreateAssignment = async () => {
//     if (!newAssignment.title.trim() || !newAssignment.subject || !newAssignment.dueDate || !newAssignment.description.trim()) return;

//     const assignmentToAdd = {
//       ...newAssignment,
//       status: 'active',
//       submissions: 0,
//       totalStudents: 30,
//     };

//     try {
//       const added = await addAssignment(assignmentToAdd);
//       setAssignments(prev => [added, ...prev]);
//       setNewAssignment({ title: '', subject: '', class: '10-A', dueDate: '', description: '' });
//       setShowCreateForm(false);
//     } catch (error) {
//       console.error('Failed to add assignment:', error);
//     }
//   };

//   // Update existing assignment
//   const handleUpdateAssignment = async (id: string) => {
//     const updatedData = {
//       title: newAssignment.title,
//       subject: newAssignment.subject,
//       class: newAssignment.class,
//       dueDate: newAssignment.dueDate,
//       description: newAssignment.description,
//     };

//     try {
//       await updateAssignment(id, updatedData);
//       setAssignments(prev => prev.map(a => (a.id === id ? { ...a, ...updatedData } : a)));
//       setNewAssignment({ title: '', subject: '', class: '10-A', dueDate: '', description: '' });
//       setShowCreateForm(false);
//     } catch (error) {
//       console.error('Failed to update assignment:', error);
//     }
//   };

//   // Delete assignment
//   const handleDeleteAssignment = async (id: string) => {
//     try {
//       await deleteAssignment(id);
//       setAssignments(prev => prev.filter(a => a.id !== id));
//     } catch (error) {
//       console.error('Failed to delete assignment:', error);
//     }
//   };

//   // Filter assignments by selected class
//   const filteredAssignments = assignments.filter(a => a.class === selectedClass);

//   // Status color utility
//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'submitted': return 'bg-green-100 text-green-800';
//       case 'pending': return 'bg-yellow-100 text-yellow-800';
//       case 'active': return 'bg-blue-100 text-blue-800';
//       case 'overdue': return 'bg-red-100 text-red-800';
//       default: return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <main className="max-w-6xl mx-auto px-6 pt-16 pb-20 bg-white min-h-screen">
//       {/* Header */}
//       <header className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 mb-12">
//         <h1 className="text-4xl font-extrabold text-gray-900 flex items-center space-x-3">
//           <BookOpen className="w-8 h-8" />
//           <span>{userType === 'admin' ? 'Assignment Management' : 'My Assignments'}</span>
//         </h1>
//         {userType === 'admin' && (
//           <button
//             onClick={() => setShowCreateForm(true)}
//             className="inline-flex items-center bg-black text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-900 transition-colors"
//           >
//             <Plus className="w-5 h-5 mr-2" />
//             Create Assignment
//           </button>
//         )}
//       </header>

//       {/* Class Filter */}
//       {userType === 'admin' && (
//         <section className="mb-8 card-3d p-6 rounded-xl shadow-sm">
//           <label htmlFor="class-select" className="block text-sm font-medium text-gray-700 mb-2">
//             Select Class
//           </label>
//           <select
//             id="class-select"
//             value={selectedClass}
//             onChange={e => setSelectedClass(e.target.value)}
//             className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           >
//             <option value="10-A">Class 10-A</option>
//             <option value="10-B">Class 10-B</option>
//             <option value="9-A">Class 9-A</option>
//             <option value="9-B">Class 9-B</option>
//           </select>
//         </section>
//       )}

//       {/* Create/Edit Form */}
//       {showCreateForm && (
//         <section className="card-3d p-6 rounded-xl shadow-sm mb-10 max-w-3xl mx-auto">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-900">{newAssignment.title ? 'Edit Assignment' : 'Create New Assignment'}</h2>
//             <button
//               onClick={() => {
//                 setShowCreateForm(false);
//                 setNewAssignment({ title: '', subject: '', class: '10-A', dueDate: '', description: '' });
//               }}
//               className="p-2 rounded-md hover:bg-gray-100 transition"
//               aria-label="Close form"
//             >
//               <X className="w-6 h-6 text-gray-500"/>
//             </button>
//           </div>

//           <form onSubmit={(e) => {
//             e.preventDefault();
//             if (newAssignment.title && newAssignment.subject && newAssignment.dueDate && newAssignment.description) {
//               // Detect if edit mode or create mode based on presence of ID
//               const existingId = assignments.find(a => a.title === newAssignment.title)?.id;
//               if (existingId) {
//                 handleUpdateAssignment(existingId);
//               } else {
//                 handleCreateAssignment();
//               }
//             }
//           }} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//               <input
//                 id="title"
//                 type="text"
//                 value={newAssignment.title}
//                 onChange={e => setNewAssignment(prev => ({ ...prev, title: e.target.value }))}
//                 className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 placeholder="Assignment title"
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
//               <select
//                 id="subject"
//                 value={newAssignment.subject}
//                 onChange={e => setNewAssignment(prev => ({ ...prev, subject: e.target.value }))}
//                 className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 required
//               >
//                 <option value="" disabled>Select subject</option>
//                 <option>Mathematics</option>
//                 <option>English</option>
//                 <option>Physics</option>
//                 <option>Chemistry</option>
//                 <option>Biology</option>
//               </select>
//             </div>

//             <div>
//               <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-2">Class</label>
//               <select
//                 id="class"
//                 value={newAssignment.class}
//                 onChange={e => setNewAssignment(prev => ({ ...prev, class: e.target.value }))}
//                 className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 required
//               >
//                 <option>10-A</option>
//                 <option>10-B</option>
//                 <option>9-A</option>
//                 <option>9-B</option>
//               </select>
//             </div>

//             <div>
//               <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
//               <input
//                 id="dueDate"
//                 type="date"
//                 value={newAssignment.dueDate}
//                 onChange={e => setNewAssignment(prev => ({ ...prev, dueDate: e.target.value }))}
//                 className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 required
//               />
//             </div>

//             <div className="sm:col-span-2">
//               <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//               <textarea
//                 id="description"
//                 rows={4}
//                 value={newAssignment.description}
//                 onChange={e => setNewAssignment(prev => ({ ...prev, description: e.target.value }))}
//                 className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
//                 placeholder="Assignment instructions and details"
//                 required
//               />
//             </div>

//             <div className="sm:col-span-2 flex justify-end space-x-4">
//               <button
//                 type="submit"
//                 className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
//               >
//                 {newAssignment.title && assignments.find(a => a.title === newAssignment.title) ? 'Update Assignment' : 'Create Assignment'}
//               </button>
//               <button
//                 type="button"
//                 onClick={() => {
//                   setShowCreateForm(false);
//                   setNewAssignment({ title: '', subject: '', class: '10-A', dueDate: '', description: '' });
//                 }}
//                 className="bg-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </section>
//       )}

//       {/* Assignments List */}
//       <section>
//         <h2 className="text-xl font-semibold text-gray-900 mb-6">Assignments for Class {selectedClass}</h2>
//         {filteredAssignments.length === 0 ? (
//           <p className="text-gray-600 text-center py-10">No assignments found.</p>
//         ) : (
//           <ul className="space-y-6">
//             {filteredAssignments.map(a => (
//               <li key={a.id} className="card-3d p-6 rounded-xl shadow-sm bg-white">
//                 <article className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
//                   <div className="flex-1">
//                     <div className="flex flex-wrap items-center justify-start gap-3 mb-2">
//                       <h3 className="text-2xl font-bold text-gray-900">{a.title}</h3>
//                       <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(a.status)}`}>
//                         {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
//                       </span>
//                     </div>
//                     <p className="text-gray-700 mb-2">{a.description}</p>
//                     <div className="flex flex-wrap items-center text-sm text-gray-600 gap-6">
//                       <span className="flex items-center gap-1">
//                         <BookOpen className="w-5 h-5" />
//                         {a.subject} - {a.class}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <Calendar className="w-5 h-5" />
//                         Due: {a.dueDate}
//                       </span>
//                       <span className="flex items-center gap-1">
//                         <CheckCircle className="w-5 h-5" />
//                         {a.submissions} / {a.totalStudents} submitted
//                       </span>
//                     </div>
//                   </div>
//                   <nav className="flex flex-col sm:flex-row gap-3">
//                     <button
//                       onClick={() => {
//                         setNewAssignment({
//                           title: a.title,
//                           subject: a.subject,
//                           class: a.class,
//                           dueDate: a.dueDate,
//                           description: a.description
//                         });
//                         setShowCreateForm(true);
//                       }}
//                       className="btn-3d px-6 py-2 font-semibold"
//                       aria-label={`Edit assignment ${a.title}`}
//                     >
//                       Edit Assignment
//                     </button>
//                     <button
//                       onClick={() => handleDeleteAssignment(a.id)}
//                       className="btn-secondary-3d px-6 py-2 text-red-600 hover:text-red-800 font-semibold"
//                       aria-label={`Delete assignment ${a.title}`}
//                     >
//                       Delete Assignment
//                     </button>
//                   </nav>
//                 </article>
//               </li>
//             ))}
//           </ul>
//         )}
//       </section>
//     </main>
//   );
// };

// export default Assignments;
import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Calendar, CheckCircle, X } from 'lucide-react';
import { fetchAssignments, addAssignment, updateAssignment, deleteAssignment } from '../firebase'; // Adjust import path

interface Assignment {
  id: string;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  status: string;
  submissions: number;
  totalStudents: number;
  description: string;
}

interface AssignmentsProps {
  userType: 'admin' | 'student';
}

const Assignments: React.FC<AssignmentsProps> = ({ userType }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState('10-A');
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [newAssignment, setNewAssignment] = useState<Omit<Assignment, 'id' | 'status' | 'submissions' | 'totalStudents'>>({
    title: '',
    subject: '',
    class: '10-A',
    dueDate: '',
    description: ''
  });

  // Load assignments once on mount
  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const data = await fetchAssignments();
        setAssignments(data);
      } catch (error) {
        console.error('Failed to fetch assignments:', error);
      }
    };
    loadAssignments();
  }, []);

  // Create new assignment
  const handleCreateAssignment = async () => {
    if (!newAssignment.title.trim() || !newAssignment.subject || !newAssignment.dueDate || !newAssignment.description.trim()) return;

    const assignmentToAdd = {
      ...newAssignment,
      status: 'active',
      submissions: 0,
      totalStudents: 30,
    };

    try {
      const added = await addAssignment(assignmentToAdd);
      setAssignments(prev => [added, ...prev]);
      setNewAssignment({ title: '', subject: '', class: '10-A', dueDate: '', description: '' });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to add assignment:', error);
    }
  };

  // Update existing assignment
  const handleUpdateAssignment = async (id: string) => {
    const updatedData = {
      title: newAssignment.title,
      subject: newAssignment.subject,
      class: newAssignment.class,
      dueDate: newAssignment.dueDate,
      description: newAssignment.description,
    };

    try {
      await updateAssignment(id, updatedData);
      setAssignments(prev => prev.map(a => (a.id === id ? { ...a, ...updatedData } : a)));
      setNewAssignment({ title: '', subject: '', class: '10-A', dueDate: '', description: '' });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to update assignment:', error);
    }
  };

  // Delete assignment
  const handleDeleteAssignment = async (id: string) => {
    try {
      await deleteAssignment(id);
      setAssignments(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error('Failed to delete assignment:', error);
    }
  };

  // Filter assignments by selected class
  const filteredAssignments = assignments.filter(a => a.class === selectedClass);

  // Status color utility
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (userType === 'student') {
    return (
      <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text flex items-center">
            <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
            My Assignments
          </h2>
        </div>

        {/* Assignment Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="card-3d p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-yellow-600 mb-2">
              {filteredAssignments.filter(a => a.status === 'pending').length=2}
            </div>
            <div className="text-sm sm:text-base text-gray-600">Pending</div>
          </div>
          <div className="card-3d p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
              {filteredAssignments.filter(a => a.status === 'submitted').length=1}
            </div>
            <div className="text-sm sm:text-base text-gray-600">Submitted</div>
          </div>
          <div className="card-3d p-4 sm:p-6 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">A+</div>
            <div className="text-sm sm:text-base text-gray-600">Average Grade</div>
          </div>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Assignments for {selectedClass}</h3>
          {filteredAssignments.length === 0 ? (
            <p className="text-gray-600 text-center py-10">No assignments found.</p>
          ) : (
            filteredAssignments.map((assignment) => (
              <div key={assignment.id} className="card-3d p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center space-x-3 mb-2">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{assignment.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(assignment.status)}`}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mb-2">{assignment.description}</p>
                    <div className="flex flex-wrap items-center space-x-4 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center">
                        <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {assignment.subject}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Due: {assignment.dueDate}
                      </span>
                      <span className="flex items-center">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {assignment.submissions}/{assignment.totalStudents} submitted
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Admin view
  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold gradient-text flex items-center">
          <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 mr-3" />
          Assignment Management
        </h2>
        <button
          onClick={() => setShowCreateForm(true)}
          className="btn-3d flex items-center w-full sm:w-auto"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Assignment
        </button>
      </div>

      {/* Class Filter */}
      <div className="card-3d p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Select Class:</label>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full sm:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="10-A">Class 10-A</option>
            <option value="10-B">Class 10-B</option>
            <option value="9-A">Class 9-A</option>
            <option value="9-B">Class 9-B</option>
          </select>
        </div>
      </div>

      {/* Create Assignment Form */}
      {showCreateForm && (
        <div className="card-3d p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Create New Assignment</h3>
            <button
              onClick={() => setShowCreateForm(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={newAssignment.title}
                onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Assignment title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select 
                value={newAssignment.subject}
                onChange={(e) => setNewAssignment({...newAssignment, subject: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
              <select 
                value={newAssignment.class}
                onChange={(e) => setNewAssignment({...newAssignment, class: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="10-A">10-A</option>
                <option value="10-B">10-B</option>
                <option value="9-A">9-A</option>
                <option value="9-B">9-B</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="date"
                value={newAssignment.dueDate}
                onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={3}
              value={newAssignment.description}
              onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Assignment description and instructions"
            />
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <button onClick={handleCreateAssignment} className="btn-3d">
              Create Assignment
            </button>
            <button
              onClick={() => setShowCreateForm(false)}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Assignments List */}
      <div className="space-y-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Assignments for {selectedClass}</h3>
        {filteredAssignments.length === 0 ? (
          <p className="text-gray-600 text-center py-10">No assignments found.</p>
        ) : (
          filteredAssignments.map((assignment) => (
            <div key={assignment.id} className="card-3d p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row items-start justify-between mb-4 gap-4">
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center space-x-3 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{assignment.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(assignment.status)}`}>
                      {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-2">{assignment.description}</p>
                  <div className="flex flex-wrap items-center space-x-4 text-xs sm:text-sm text-gray-500">
                    <span className="flex items-center">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {assignment.subject} - {assignment.class}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      Due: {assignment.dueDate}
                    </span>
                    <span className="flex items-center">
                      <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {assignment.submissions}/{assignment.totalStudents} submitted
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Assignments;

