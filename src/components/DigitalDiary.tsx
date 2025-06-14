// // import React, { useState } from 'react';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// // import { FileText, Plus, Calendar, Bell, Users, Pin, X, Edit3 } from 'lucide-react';

// // interface DigitalDiaryProps {
// //   userType: 'admin' | 'student';
// // }

// // const DigitalDiary: React.FC<DigitalDiaryProps> = ({ userType }) => {
// //   const [showAddForm, setShowAddForm] = useState(false);
// //   const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
// //   const [announcements, setAnnouncements] = useState([
// //     {
// //       id: 1,
// //       title: 'Science Fair Registration Open',
// //       content: 'Annual Science Fair registration is now open for all grades. Submit your project proposals by March 15th.',
// //       date: '2024-01-25',
// //       author: 'Mrs. Johnson',
// //       type: 'event',
// //       pinned: true
// //     },
// //     {
// //       id: 2,
// //       title: 'Winter Break Schedule',
// //       content: 'School will be closed from December 23rd to January 8th. Regular classes resume on January 9th.',
// //       date: '2024-01-20',
// //       author: 'Principal Smith',
// //       type: 'notice',
// //       pinned: false
// //     },
// //     {
// //       id: 3,
// //       title: 'New Library Books Available',
// //       content: 'Over 200 new books have been added to our library collection. Visit during lunch hours to check them out.',
// //       date: '2024-01-18',
// //       author: 'Ms. Davis',
// //       type: 'general',
// //       pinned: false
// //     },
// //     {
// //       id: 4,
// //       title: 'Parent-Teacher Conference',
// //       content: 'Scheduled for February 5th-7th. Please book your slots through the parent portal.',
// //       date: '2024-01-15',
// //       author: 'Admin Office',
// //       type: 'meeting',
// //       pinned: true
// //     }
// //   ]);

// //   const [newAnnouncement, setNewAnnouncement] = useState({
// //     title: '',
// //     content: '',
// //     type: 'general',
// //     pinned: false,
// //     author: 'Admin'
// //   });

// //   const handleAddAnnouncement = () => {
// //     if (!newAnnouncement.title || !newAnnouncement.content) return;

// //     const announcement = {
// //       id: announcements.length + 1,
// //       title: newAnnouncement.title,
// //       content: newAnnouncement.content,
// //       date: new Date().toISOString().split('T')[0],
// //       author: newAnnouncement.author,
// //       type: newAnnouncement.type,
// //       pinned: newAnnouncement.pinned
// //     };

// //     setAnnouncements([announcement, ...announcements]);
// //     setNewAnnouncement({ title: '', content: '', type: 'general', pinned: false, author: 'Admin' });
// //     setShowAddForm(false);
// //   };

// //   const handleEditAnnouncement = (announcement: any) => {
// //     setEditingAnnouncement({ ...announcement });
// //   };

// //   const handleUpdateAnnouncement = () => {
// //     if (!editingAnnouncement.title || !editingAnnouncement.content) return;

// //     const updatedAnnouncements = announcements.map(a => 
// //       a.id === editingAnnouncement.id 
// //         ? { ...editingAnnouncement, date: new Date().toISOString().split('T')[0] }
// //         : a
// //     );

// //     setAnnouncements(updatedAnnouncements);
// //     setEditingAnnouncement(null);
// //   };

// //   const handleDeleteAnnouncement = (id: number) => {
// //     setAnnouncements(announcements.filter(a => a.id !== id));
// //   };

// //   const AdminView = () => (
// //     <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
// //       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //         <div>
// //           <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Digital Diary</h1>
// //           <p className="text-sm sm:text-base text-gray-600">Create and manage school announcements and notices</p>
// //         </div>
// //         <Button onClick={() => setShowAddForm(true)} className="btn-3d w-full sm:w-auto">
// //           <Plus className="w-4 h-4 mr-2" />
// //           New Announcement
// //         </Button>
// //       </div>

// //       {/* Add Announcement Form */}
// //       {showAddForm && (
// //         <Card className="card-3d">
// //           <CardHeader className="pb-4">
// //             <div className="flex justify-between items-center">
// //               <CardTitle className="text-lg sm:text-xl gradient-text">Create New Announcement</CardTitle>
// //               <Button variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
// //                 <X className="w-4 h-4" />
// //               </Button>
// //             </div>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
// //                 <input
// //                   type="text"
// //                   value={newAnnouncement.title}
// //                   onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   placeholder="Enter announcement title"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
// //                 <textarea
// //                   value={newAnnouncement.content}
// //                   onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
// //                   rows={4}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   placeholder="Enter announcement content"
// //                 />
// //               </div>
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
// //                   <select
// //                     value={newAnnouncement.type}
// //                     onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value})}
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   >
// //                     <option value="general">General</option>
// //                     <option value="event">Event</option>
// //                     <option value="notice">Notice</option>
// //                     <option value="meeting">Meeting</option>
// //                   </select>
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
// //                   <input
// //                     type="text"
// //                     value={newAnnouncement.author}
// //                     onChange={(e) => setNewAnnouncement({...newAnnouncement, author: e.target.value})}
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                     placeholder="Author name"
// //                   />
// //                 </div>
// //               </div>
// //               <div className="flex items-center">
// //                 <input
// //                   type="checkbox"
// //                   id="pinned"
// //                   checked={newAnnouncement.pinned}
// //                   onChange={(e) => setNewAnnouncement({...newAnnouncement, pinned: e.target.checked})}
// //                   className="mr-2"
// //                 />
// //                 <label htmlFor="pinned" className="text-sm font-medium text-gray-700">Pin this announcement</label>
// //               </div>
// //             </div>
// //             <div className="flex gap-2 mt-6">
// //               <Button onClick={handleAddAnnouncement} className="btn-3d">
// //                 Create Announcement
// //               </Button>
// //               <Button variant="outline" onClick={() => setShowAddForm(false)}>
// //                 Cancel
// //               </Button>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       )}

// //       {/* Edit Announcement Dialog */}
// //       <Dialog open={!!editingAnnouncement} onOpenChange={() => setEditingAnnouncement(null)}>
// //         <DialogContent className="max-w-lg">
// //           <DialogHeader>
// //             <DialogTitle>Edit Announcement</DialogTitle>
// //           </DialogHeader>
// //           {editingAnnouncement && (
// //             <div className="space-y-4">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
// //                 <input
// //                   type="text"
// //                   value={editingAnnouncement.title}
// //                   onChange={(e) => setEditingAnnouncement({...editingAnnouncement, title: e.target.value})}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
// //                 <textarea
// //                   value={editingAnnouncement.content}
// //                   onChange={(e) => setEditingAnnouncement({...editingAnnouncement, content: e.target.value})}
// //                   rows={4}
// //                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                 />
// //               </div>
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
// //                   <select
// //                     value={editingAnnouncement.type}
// //                     onChange={(e) => setEditingAnnouncement({...editingAnnouncement, type: e.target.value})}
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   >
// //                     <option value="general">General</option>
// //                     <option value="event">Event</option>
// //                     <option value="notice">Notice</option>
// //                     <option value="meeting">Meeting</option>
// //                   </select>
// //                 </div>
// //                 <div>
// //                   <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
// //                   <input
// //                     type="text"
// //                     value={editingAnnouncement.author}
// //                     onChange={(e) => setEditingAnnouncement({...editingAnnouncement, author: e.target.value})}
// //                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
// //                   />
// //                 </div>
// //               </div>
// //               <div className="flex items-center">
// //                 <input
// //                   type="checkbox"
// //                   id="editPinned"
// //                   checked={editingAnnouncement.pinned}
// //                   onChange={(e) => setEditingAnnouncement({...editingAnnouncement, pinned: e.target.checked})}
// //                   className="mr-2"
// //                 />
// //                 <label htmlFor="editPinned" className="text-sm font-medium text-gray-700">Pin this announcement</label>
// //               </div>
// //               <div className="flex gap-2 mt-6">
// //                 <Button onClick={handleUpdateAnnouncement} className="btn-3d">
// //                   Update Announcement
// //                 </Button>
// //                 <Button variant="outline" onClick={() => setEditingAnnouncement(null)}>
// //                   Cancel
// //                 </Button>
// //               </div>
// //             </div>
// //           )}
// //         </DialogContent>
// //       </Dialog>

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
// //         <Card className="card-3d">
// //           <CardContent className="p-3 sm:p-6">
// //             <div className="flex items-center space-x-2 sm:space-x-4">
// //               <div className="p-2 sm:p-3 bg-blue-100 rounded-xl">
// //                 <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
// //               </div>
// //               <div>
// //                 <p className="text-xs sm:text-sm text-gray-600">Total Posts</p>
// //                 <p className="text-lg sm:text-2xl font-bold">{announcements.length}</p>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <Card className="card-3d">
// //           <CardContent className="p-3 sm:p-6">
// //             <div className="flex items-center space-x-2 sm:space-x-4">
// //               <div className="p-2 sm:p-3 bg-green-100 rounded-xl">
// //                 <Bell className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
// //               </div>
// //               <div>
// //                 <p className="text-xs sm:text-sm text-gray-600">Active Notices</p>
// //                 <p className="text-lg sm:text-2xl font-bold">{announcements.filter(a => a.type === 'notice').length}</p>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <Card className="card-3d">
// //           <CardContent className="p-3 sm:p-6">
// //             <div className="flex items-center space-x-2 sm:space-x-4">
// //               <div className="p-2 sm:p-3 bg-purple-100 rounded-xl">
// //                 <Users className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
// //               </div>
// //               <div>
// //                 <p className="text-xs sm:text-sm text-gray-600">Views This Week</p>
// //                 <p className="text-lg sm:text-2xl font-bold">1,245</p>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <Card className="card-3d">
// //           <CardContent className="p-3 sm:p-6">
// //             <div className="flex items-center space-x-2 sm:space-x-4">
// //               <div className="p-2 sm:p-3 bg-orange-100 rounded-xl">
// //                 <Pin className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
// //               </div>
// //               <div>
// //                 <p className="text-xs sm:text-sm text-gray-600">Pinned Posts</p>
// //                 <p className="text-lg sm:text-2xl font-bold">{announcements.filter(a => a.pinned).length}</p>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       {/* Announcements List */}
// //       <div className="space-y-4">
// //         {announcements.map((announcement) => (
// //           <Card key={announcement.id} className="floating-card">
// //             <CardContent className="p-4 sm:p-6">
// //               <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
// //                 <div className="flex-1 w-full">
// //                   <div className="flex flex-wrap items-center gap-2 mb-2">
// //                     {announcement.pinned && <Pin className="w-4 h-4 text-orange-500" />}
// //                     <h3 className="text-lg sm:text-xl font-semibold">{announcement.title}</h3>
// //                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
// //                       announcement.type === 'event' ? 'bg-blue-100 text-blue-800' :
// //                       announcement.type === 'notice' ? 'bg-red-100 text-red-800' :
// //                       announcement.type === 'meeting' ? 'bg-purple-100 text-purple-800' :
// //                       'bg-gray-100 text-gray-800'
// //                     }`}>
// //                       {announcement.type}
// //                     </span>
// //                   </div>
// //                   <p className="text-sm sm:text-base text-gray-600 mb-4">{announcement.content}</p>
// //                   <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-4">
// //                     <span className="flex items-center gap-1">
// //                       <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
// //                       {announcement.date}
// //                     </span>
// //                     <span>By {announcement.author}</span>
// //                   </div>
// //                 </div>
// //                 <div className="flex gap-2 w-full lg:w-auto">
// //                   <Button 
// //                     variant="outline" 
// //                     size="sm" 
// //                     className="flex-1 lg:flex-none"
// //                     onClick={() => handleEditAnnouncement(announcement)}
// //                   >
// //                     <Edit3 className="w-3 h-3 mr-1" />
// //                     Edit
// //                   </Button>
// //                   <Button 
// //                     variant="outline" 
// //                     size="sm" 
// //                     className="flex-1 lg:flex-none text-red-600 hover:text-red-700"
// //                     onClick={() => handleDeleteAnnouncement(announcement.id)}
// //                   >
// //                     <X className="w-3 h-3 mr-1" />
// //                     Delete
// //                   </Button>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         ))}
// //       </div>
// //     </div>
// //   );

// //   const StudentView = () => (
// //     <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
// //       <div>
// //         <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Announcements</h1>
// //         <p className="text-sm sm:text-base text-gray-600">Stay updated with the latest school announcements and news</p>
// //       </div>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
// //         <Card className="card-3d">
// //           <CardContent className="p-4 sm:p-6">
// //             <div className="flex items-center space-x-4">
// //               <div className="p-3 bg-blue-100 rounded-xl">
// //                 <Bell className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
// //               </div>
// //               <div>
// //                 <p className="text-xs sm:text-sm text-gray-600">New Notices</p>
// //                 <p className="text-xl sm:text-2xl font-bold">5</p>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <Card className="card-3d">
// //           <CardContent className="p-4 sm:p-6">
// //             <div className="flex items-center space-x-4">
// //               <div className="p-3 bg-green-100 rounded-xl">
// //                 <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
// //               </div>
// //               <div>
// //                 <p className="text-xs sm:text-sm text-gray-600">Upcoming Events</p>
// //                 <p className="text-xl sm:text-2xl font-bold">3</p>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <Card className="card-3d">
// //           <CardContent className="p-4 sm:p-6">
// //             <div className="flex items-center space-x-4">
// //               <div className="p-3 bg-purple-100 rounded-xl">
// //                 <Pin className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
// //               </div>
// //               <div>
// //                 <p className="text-xs sm:text-sm text-gray-600">Important</p>
// //                 <p className="text-xl sm:text-2xl font-bold">2</p>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       </div>

// //       <div className="space-y-4">
// //         {announcements.map((announcement) => (
// //           <Card key={announcement.id} className="floating-card">
// //             <CardContent className="p-4 sm:p-6">
// //               <div className="flex items-start gap-2 mb-2">
// //                 {announcement.pinned && <Pin className="w-4 h-4 text-orange-500 mt-1" />}
// //                 <div className="flex-1">
// //                   <div className="flex flex-wrap items-center gap-2 mb-2">
// //                     <h3 className="text-lg sm:text-xl font-semibold">{announcement.title}</h3>
// //                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
// //                       announcement.type === 'event' ? 'bg-blue-100 text-blue-800' :
// //                       announcement.type === 'notice' ? 'bg-red-100 text-red-800' :
// //                       announcement.type === 'meeting' ? 'bg-purple-100 text-purple-800' :
// //                       'bg-gray-100 text-gray-800'
// //                     }`}>
// //                       {announcement.type}
// //                     </span>
// //                   </div>
// //                   <p className="text-sm sm:text-base text-gray-600 mb-4">{announcement.content}</p>
// //                   <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-4">
// //                     <span className="flex items-center gap-1">
// //                       <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
// //                       {announcement.date}
// //                     </span>
// //                     <span>By {announcement.author}</span>
// //                   </div>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         ))}
// //       </div>
// //     </div>
// //   );

// //   return userType === 'admin' ? <AdminView /> : <StudentView />;
// // };

// // export default DigitalDiary;
// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { FileText, Plus, Calendar, Bell, Users, Pin, X, Edit3 } from 'lucide-react';
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
// import { useAppContext } from '../context/AppContext';

// const firebaseConfig = {
//   apiKey: "AIzaSyD-xJVjJ9ld1_TcaAwgvX3DCwGazZ2qbUU",
//   authDomain: "schl-web.firebaseapp.com",
//   projectId: "schl-web",
//   storageBucket: "schl-web.firebasestorage.app",
//   messagingSenderId: "129868180970",
//   appId: "1:129868180970:web:977f4da3145208fc58d693"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// interface DigitalDiaryProps {
//   userType: 'admin' | 'student';
// }

// const DigitalDiary: React.FC<DigitalDiaryProps> = ({ userType }) => {
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
//   const [announcements, setAnnouncements] = useState<any[]>([]);
//   const [newAnnouncement, setNewAnnouncement] = useState({
//     title: '',
//     content: '',
//     type: 'general',
//     pinned: false,
//     author: 'Admin'
//   });

//   // Fetch announcements from Firestore
//   const fetchAnnouncements = async () => {
//     const querySnapshot = await getDocs(collection(db, "announcements"));
//     const fetchedAnnouncements = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     setAnnouncements(fetchedAnnouncements);
//   };

//   useEffect(() => {
//     fetchAnnouncements();
//   }, []);

//   const handleAddAnnouncement = async () => {
//     if (!newAnnouncement.title || !newAnnouncement.content) return;

//     try {
//       const docRef = await addDoc(collection(db, "announcements"), {
//         title: newAnnouncement.title,
//         content: newAnnouncement.content,
//         date: new Date().toISOString().split('T')[0],
//         author: newAnnouncement.author,
//         type: newAnnouncement.type,
//         pinned: newAnnouncement.pinned
//       });
//       setAnnouncements(prev => [{ id: docRef.id, ...newAnnouncement }, ...prev]);
//       setNewAnnouncement({ title: '', content: '', type: 'general', pinned: false, author: 'Admin' });
//       setShowAddForm(false);
//     } catch (e) {
//       console.error("Error adding document: ", e);
//     }
//   };

//   const handleEditAnnouncement = (announcement: any) => {
//     setEditingAnnouncement({ ...announcement });
//   };

//   const handleUpdateAnnouncement = async () => {
//     if (!editingAnnouncement.title || !editingAnnouncement.content) return;

//     try {
//       const announcementRef = doc(db, "announcements", editingAnnouncement.id);
//       await updateDoc(announcementRef, {
//         title: editingAnnouncement.title,
//         content: editingAnnouncement.content,
//         type: editingAnnouncement.type,
//         author: editingAnnouncement.author,
//         pinned: editingAnnouncement.pinned,
//         date: new Date().toISOString().split('T')[0]
//       });
//       setAnnouncements(prev => prev.map(a => a.id === editingAnnouncement.id ? { ...editingAnnouncement } : a));
//       setEditingAnnouncement(null);
//     } catch (e) {
//       console.error("Error updating document: ", e);
//     }
//   };

//   const handleDeleteAnnouncement = async (id: string) => {
//     try {
//       await deleteDoc(doc(db, "announcements", id));
//       setAnnouncements(prev => prev.filter(a => a.id !== id));
//     } catch (e) {
//       console.error("Error deleting document: ", e);
//     }
//   };

//   const AdminView = () => (
//     <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Digital Diary</h1>
//           <p className="text-sm sm:text-base text-gray-600">Create and manage school announcements and notices</p>
//         </div>
//         <Button onClick={() => setShowAddForm(true)} className="btn-3d w-full sm:w-auto">
//           <Plus className="w-4 h-4 mr-2" />
//           New Announcement
//         </Button>
//       </div>

//       {/* Add Announcement Form */}
//       {showAddForm && (
//         <Card className="card-3d">
//           <CardHeader className="pb-4">
//             <div className="flex justify-between items-center">
//               <CardTitle className="text-lg sm:text-xl gradient-text">Create New Announcement</CardTitle>
//               <Button variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
//                 <X className="w-4 h-4" />
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//                 <input
//                   type="text"
//                   value={newAnnouncement.title}
//                   onChange={(e) => setNewAnnouncement({...newAnnouncement, title: e.target.value})}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter announcement title"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
//                 <textarea
//                   value={newAnnouncement.content}
//                   onChange={(e) => setNewAnnouncement({...newAnnouncement, content: e.target.value})}
//                   rows={4}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter announcement content"
//                 />
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//                   <select
//                     value={newAnnouncement.type}
//                     onChange={(e) => setNewAnnouncement({...newAnnouncement, type: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="general">General</option>
//                     <option value="event">Event</option>
//                     <option value="notice">Notice</option>
//                     <option value="meeting">Meeting</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
//                   <input
//                     type="text"
//                     value={newAnnouncement.author}
//                     onChange={(e) => setNewAnnouncement({...newAnnouncement, author: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Author name"
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="pinned"
//                   checked={newAnnouncement.pinned}
//                   onChange={(e) => setNewAnnouncement({...newAnnouncement, pinned: e.target.checked})}
//                   className="mr-2"
//                 />
//                 <label htmlFor="pinned" className="text-sm font-medium text-gray-700">Pin this announcement</label>
//               </div>
//             </div>
//             <div className="flex gap-2 mt-6">
//               <Button onClick={handleAddAnnouncement} className="btn-3d">
//                 Create Announcement
//               </Button>
//               <Button variant="outline" onClick={() => setShowAddForm(false)}>
//                 Cancel
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Edit Announcement Dialog */}
//       <Dialog open={!!editingAnnouncement} onOpenChange={() => setEditingAnnouncement(null)}>
//         <DialogContent className="max-w-lg">
//           <DialogHeader>
//             <DialogTitle>Edit Announcement</DialogTitle>
//           </DialogHeader>
//           {editingAnnouncement && (
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
//                 <input
//                   type="text"
//                   value={editingAnnouncement.title}
//                   onChange={(e) => setEditingAnnouncement({...editingAnnouncement, title: e.target.value})}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
//                 <textarea
//                   value={editingAnnouncement.content}
//                   onChange={(e) => setEditingAnnouncement({...editingAnnouncement, content: e.target.value})}
//                   rows={4}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
//                   <select
//                     value={editingAnnouncement.type}
//                     onChange={(e) => setEditingAnnouncement({...editingAnnouncement, type: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   >
//                     <option value="general">General</option>
//                     <option value="event">Event</option>
//                     <option value="notice">Notice</option>
//                     <option value="meeting">Meeting</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
//                   <input
//                     type="text"
//                     value={editingAnnouncement.author}
//                     onChange={(e) => setEditingAnnouncement({...editingAnnouncement, author: e.target.value})}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   />
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   id="editPinned"
//                   checked={editingAnnouncement.pinned}
//                   onChange={(e) => setEditingAnnouncement({...editingAnnouncement, pinned: e.target.checked})}
//                   className="mr-2"
//                 />
//                 <label htmlFor="editPinned" className="text-sm font-medium text-gray-700">Pin this announcement</label>
//               </div>
//               <div className="flex gap-2 mt-6">
//                 <Button onClick={handleUpdateAnnouncement} className="btn-3d">
//                   Update Announcement
//                 </Button>
//                 <Button variant="outline" onClick={() => setEditingAnnouncement(null)}>
//                   Cancel
//                 </Button>
//               </div>
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
//         <Card className="card-3d">
//           <CardContent className="p-3 sm:p-6">
//             <div className="flex items-center space-x-2 sm:space-x-4">
//               <div className="p-2 sm:p-3 bg-blue-100 rounded-xl">
//                 <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">Total Posts</p>
//                 <p className="text-lg sm:text-2xl font-bold">{announcements.length}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="card-3d">
//           <CardContent className="p-3 sm:p-6">
//             <div className="flex items-center space-x-2 sm:space-x-4">
//               <div className="p-2 sm:p-3 bg-green-100 rounded-xl">
//                 <Bell className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">Active Notices</p>
//                 <p className="text-lg sm:text-2xl font-bold">{announcements.filter(a => a.type === 'notice').length}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="card-3d">
//           <CardContent className="p-3 sm:p-6">
//             <div className="flex items-center space-x-2 sm:space-x-4">
//               <div className="p-2 sm:p-3 bg-purple-100 rounded-xl">
//                 <Users className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">Views This Week</p>
//                 <p className="text-lg sm:text-2xl font-bold">1,245</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="card-3d">
//           <CardContent className="p-3 sm:p-6">
//             <div className="flex items-center space-x-2 sm:space-x-4">
//               <div className="p-2 sm:p-3 bg-orange-100 rounded-xl">
//                 <Pin className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">Pinned Posts</p>
//                 <p className="text-lg sm:text-2xl font-bold">{announcements.filter(a => a.pinned).length}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Announcements List */}
//       <div className="space-y-4">
//         {announcements.map((announcement) => (
//           <Card key={announcement.id} className="floating-card">
//             <CardContent className="p-4 sm:p-6">
//               <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
//                 <div className="flex-1 w-full">
//                   <div className="flex flex-wrap items-center gap-2 mb-2">
//                     {announcement.pinned && <Pin className="w-4 h-4 text-orange-500" />}
//                     <h3 className="text-lg sm:text-xl font-semibold">{announcement.title}</h3>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       announcement.type === 'event' ? 'bg-blue-100 text-blue-800' :
//                       announcement.type === 'notice' ? 'bg-red-100 text-red-800' :
//                       announcement.type === 'meeting' ? 'bg-purple-100 text-purple-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {announcement.type}
//                     </span>
//                   </div>
//                   <p className="text-sm sm:text-base text-gray-600 mb-4">{announcement.content}</p>
//                   <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-4">
//                     <span className="flex items-center gap-1">
//                       <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
//                       {announcement.date}
//                     </span>
//                     <span>By {announcement.author}</span>
//                   </div>
//                 </div>
//                 <div className="flex gap-2 w-full lg:w-auto">
//                   <Button 
//                     variant="outline" 
//                     size="sm" 
//                     className="flex-1 lg:flex-none"
//                     onClick={() => handleEditAnnouncement(announcement)}
//                   >
//                     <Edit3 className="w-3 h-3 mr-1" />
//                     Edit
//                   </Button>
//                   <Button 
//                     variant="outline" 
//                     size="sm" 
//                     className="flex-1 lg:flex-none text-red-600 hover:text-red-700"
//                     onClick={() => handleDeleteAnnouncement(announcement.id)}
//                   >
//                     <X className="w-3 h-3 mr-1" />
//                     Delete
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );

//  const StudentView = () => (
//     <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
//       <div>
//         <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Announcements</h1>
//         <p className="text-sm sm:text-base text-gray-600">Stay updated with the latest school announcements and news</p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//         <Card className="card-3d">
//           <CardContent className="p-4 sm:p-6">
//             <div className="flex items-center space-x-4">
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <Bell className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">New Notices</p>
//                 <p className="text-xl sm:text-2xl font-bold">5</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="card-3d">
//           <CardContent className="p-4 sm:p-6">
//             <div className="flex items-center space-x-4">
//               <div className="p-3 bg-green-100 rounded-xl">
//                 <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">Upcoming Events</p>
//                 <p className="text-xl sm:text-2xl font-bold">3</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="card-3d">
//           <CardContent className="p-4 sm:p-6">
//             <div className="flex items-center space-x-4">
//               <div className="p-3 bg-purple-100 rounded-xl">
//                 <Pin className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">Important</p>
//                 <p className="text-xl sm:text-2xl font-bold">2</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="space-y-4">
//         {announcements.map((announcement) => (
//           <Card key={announcement.id} className="floating-card">
//             <CardContent className="p-4 sm:p-6">
//               <div className="flex items-start gap-2 mb-2">
//                 {announcement.pinned && <Pin className="w-4 h-4 text-orange-500 mt-1" />}
//                 <div className="flex-1">
//                   <div className="flex flex-wrap items-center gap-2 mb-2">
//                     <h3 className="text-lg sm:text-xl font-semibold">{announcement.title}</h3>
//                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                       announcement.type === 'event' ? 'bg-blue-100 text-blue-800' :
//                       announcement.type === 'notice' ? 'bg-red-100 text-red-800' :
//                       announcement.type === 'meeting' ? 'bg-purple-100 text-purple-800' :
//                       'bg-gray-100 text-gray-800'
//                     }`}>
//                       {announcement.type}
//                     </span>
//                   </div>
//                   <p className="text-sm sm:text-base text-gray-600 mb-4">{announcement.content}</p>
//                   <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-4">
//                     <span className="flex items-center gap-1">
//                       <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
//                       {announcement.date}
//                     </span>
//                     <span>By {announcement.author}</span>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );

//   return userType === 'admin' ? <AdminView /> : <StudentView />;
// };

// export default DigitalDiary;
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileText, Plus, Calendar, Bell, Users, Pin, X, Edit3 } from 'lucide-react';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from '../firebaseConfig'; // Import Firestore instance from firebaseConfig

interface DigitalDiaryProps {
  userType: 'admin' | 'student';
}

const DigitalDiary: React.FC<DigitalDiaryProps> = ({ userType }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    type: 'general',
    pinned: false,
    author: 'Admin'
  });

  // Fetch announcements from Firestore
  const fetchAnnouncements = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "announcements"));
      const fetchedAnnouncements = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAnnouncements(fetchedAnnouncements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleAddAnnouncement = async () => {
    if (!newAnnouncement.title || !newAnnouncement.content) return;

    try {
      const docRef = await addDoc(collection(db, "announcements"), {
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        date: new Date().toISOString().split('T')[0],
        author: newAnnouncement.author,
        type: newAnnouncement.type,
        pinned: newAnnouncement.pinned
      });
      setAnnouncements(prev => [{ id: docRef.id, ...newAnnouncement }, ...prev]);
      setNewAnnouncement({ title: '', content: '', type: 'general', pinned: false, author: 'Admin' });
      setShowAddForm(false);
    } catch (e) {
      console.error("Error adding announcement: ", e);
    }
  };

  const handleEditAnnouncement = (announcement: any) => {
    setEditingAnnouncement({ ...announcement });
  };

  const handleUpdateAnnouncement = async () => {
    if (!editingAnnouncement.title || !editingAnnouncement.content) return;

    try {
      const announcementRef = doc(db, "announcements", editingAnnouncement.id);
      await updateDoc(announcementRef, {
        title: editingAnnouncement.title,
        content: editingAnnouncement.content,
        type: editingAnnouncement.type,
        author: editingAnnouncement.author,
        pinned: editingAnnouncement.pinned,
        date: new Date().toISOString().split('T')[0]
      });
      setAnnouncements(prev => prev.map(a => a.id === editingAnnouncement.id ? { ...editingAnnouncement } : a));
      setEditingAnnouncement(null);
    } catch (e) {
      console.error("Error updating announcement: ", e);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await deleteDoc(doc(db, "announcements", id));
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    } catch (e) {
      console.error("Error deleting announcement: ", e);
    }
  };

  // Admin view component
  const AdminView = () => (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Digital Diary</h1>
          <p className="text-sm sm:text-base text-gray-600">Create and manage school announcements and notices</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="btn-3d w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {/* Add Announcement Form */}
      {showAddForm && (
        <Card className="card-3d">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg sm:text-xl gradient-text">Create New Announcement</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter announcement title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter announcement content"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={newAnnouncement.type}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="general">General</option>
                    <option value="event">Event</option>
                    <option value="notice">Notice</option>
                    <option value="meeting">Meeting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={newAnnouncement.author}
                    onChange={(e) => setNewAnnouncement({ ...newAnnouncement, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Author name"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pinned"
                  checked={newAnnouncement.pinned}
                  onChange={(e) => setNewAnnouncement({ ...newAnnouncement, pinned: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="pinned" className="text-sm font-medium text-gray-700">Pin this announcement</label>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={handleAddAnnouncement} className="btn-3d">
                Create Announcement
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Announcement Dialog */}
      <Dialog open={!!editingAnnouncement} onOpenChange={() => setEditingAnnouncement(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Announcement</DialogTitle>
          </DialogHeader>
          {editingAnnouncement && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={editingAnnouncement.title}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={editingAnnouncement.content}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, content: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select
                    value={editingAnnouncement.type}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="general">General</option>
                    <option value="event">Event</option>
                    <option value="notice">Notice</option>
                    <option value="meeting">Meeting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={editingAnnouncement.author}
                    onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="editPinned"
                  checked={editingAnnouncement.pinned}
                  onChange={(e) => setEditingAnnouncement({ ...editingAnnouncement, pinned: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="editPinned" className="text-sm font-medium text-gray-700">Pin this announcement</label>
              </div>
              <div className="flex gap-2 mt-6">
                <Button onClick={handleUpdateAnnouncement} className="btn-3d">
                  Update Announcement
                </Button>
                <Button variant="outline" onClick={() => setEditingAnnouncement(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="card-3d">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-blue-100 rounded-xl">
                <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Total Posts</p>
                <p className="text-lg sm:text-2xl font-bold">{announcements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-green-100 rounded-xl">
                <Bell className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600"> Other Notices</p>
                <p className="text-lg sm:text-2xl font-bold">{announcements.filter(a => a.type === 'notice').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-purple-100 rounded-xl">
                <Users className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Views This Week</p>
                <p className="text-lg sm:text-2xl font-bold">550</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="p-2 sm:p-3 bg-orange-100 rounded-xl">
                <Pin className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Pinned Posts</p>
                <p className="text-lg sm:text-2xl font-bold">{announcements.filter(a => a.pinned).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="floating-card">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {announcement.pinned && <Pin className="w-4 h-4 text-orange-500" />}
                    <h3 className="text-lg sm:text-xl font-semibold">{announcement.title}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        announcement.type === 'event'
                          ? 'bg-blue-100 text-blue-800'
                          : announcement.type === 'notice'
                          ? 'bg-red-100 text-red-800'
                          : announcement.type === 'meeting'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {announcement.type}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">{announcement.content}</p>
                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {announcement.date}
                    </span>
                    <span>By {announcement.author}</span>
                  </div>
                </div>
                <div className="flex gap-2 w-full lg:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 lg:flex-none"
                    onClick={() => handleEditAnnouncement(announcement)}
                  >
                    <Edit3 className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 lg:flex-none text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteAnnouncement(announcement.id)}
                  >
                    <X className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Student view component
  const StudentView = () => (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Announcements</h1>
        <p className="text-sm sm:text-base text-gray-600">Stay updated with the latest school announcements and news</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="card-3d">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Bell className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">New Notices</p>
                <p className="text-xl sm:text-2xl font-bold">{announcements.filter(a => a.type === 'notice').length=3}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Calendar className="w-4 h-4 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Upcoming Events</p>
                <p className="text-xl sm:text-2xl font-bold">{announcements.filter(a => a.type === 'event').length=5}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Pin className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Important</p>
                <p className="text-xl sm:text-2xl font-bold">{announcements.filter(a => a.pinned).length=9}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="floating-card">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start gap-2 mb-2">
                {announcement.pinned && <Pin className="w-4 h-4 text-orange-500 mt-1" />}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold">{announcement.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      announcement.type === 'event' ? 'bg-blue-100 text-blue-800' :
                      announcement.type === 'notice' ? 'bg-red-100 text-red-800' :
                      announcement.type === 'meeting' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {announcement.type}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">{announcement.content}</p>
                  <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      {announcement.date}
                    </span>
                    <span>By {announcement.author}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return userType === 'admin' ? <AdminView /> : <StudentView />;
};

export default DigitalDiary;

