// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Trash2, Edit } from "lucide-react";
// import { fetchBooks, addBook, updateBook, deleteBook, fetchResources, addResource, updateResource, deleteResource } from '@/firebase';
// import { Link } from "react-router-dom";

// interface EPageProps {
//   userType: "admin" | "student";
// }

// const RESOURCE_TYPES = [
//   { value: "video", label: "Video" },
//   { value: "pdf", label: "PDF" },
//   { value: "doc", label: "Document" },
//   { value: "image", label: "Image" },
//   { value: "audio", label: "Audio" },
// ];

// const RESOURCE_CATEGORIES = [
//   { value: "tutorial", label: "Tutorial" },
//   { value: "reference", label: "Reference" },
//   { value: "assignment", label: "Assignment" },
//   { value: "project", label: "Project" },
//   { value: "other", label: "Other" },
// ];

// const EPage: React.FC<EPageProps> = ({ userType }) => {
//   const [books, setBooks] = useState<any[]>([]);
//   const [resources, setResources] = useState<any[]>([]);
//   const [loadingBooks, setLoadingBooks] = useState(true);
//   const [loadingResources, setLoadingResources] = useState(true);
//   const [activeTab, setActiveTab] = useState<"books" | "resources">("books");

//   const [newBook, setNewBook] = useState({ title: "", author: "", status: "available", student: "" });
//   const [editingBookId, setEditingBookId] = useState<string | null>(null);
//   const [editedBook, setEditedBook] = useState<typeof newBook>(newBook);

//   const [newResource, setNewResource] = useState({
//     title: "",
//     type: "",
//     size: "",
//     downloads: 0,
//     category: "",
//     url: "",
//   });
//   const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
//   const [editedResource, setEditedResource] = useState<typeof newResource>(newResource);

//   const loadBooks = useCallback(async () => {
//     setLoadingBooks(true);
//     try {
//       const data = await fetchBooks();
//       setBooks(data);
//     } catch (error) {
//       console.error("Fetching books failed", error);
//     } finally {
//       setLoadingBooks(false);
//     }
//   }, []);

//   const loadResources = useCallback(async () => {
//     setLoadingResources(true);
//     try {
//       const data = await fetchResources();
//       setResources(data);
//     } catch (error) {
//       console.error("Fetching resources failed", error);
//     } finally {
//       setLoadingResources(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadBooks();
//     loadResources();
//   }, [loadBooks, loadResources]);

//   const handleAddBook = async () => {
//     if (!newBook.title || !newBook.author) return;
//     const book = await addBook(newBook);
//     setNewBook({ title: "", author: "", status: "available", student: "" });
//     loadBooks();
//   };

//   const handleSaveBook = async () => {
//     if (editingBookId) {
//       await updateBook(editingBookId, editedBook);
//       setEditingBookId(null);
//       setEditedBook({ title: "", author: "", status: "available", student: "" });
//       loadBooks();
//     }
//   };

//   const handleDeleteBook = async (id: string) => {
//     await deleteBook(id);
//     loadBooks();
//   };

//   const handleAddResource = async () => {
//     if (!newResource.title || !newResource.type || !newResource.size || !newResource.category) return;
//     const resource = await addResource(newResource);
//     setNewResource({ title: "", type: "", size: "", downloads: 0, category: "", url: "" });
//     loadResources();
//   };

//   const handleSaveResource = async () => {
//     if (editingResourceId) {
//       await updateResource(editingResourceId, editedResource);
//       setEditingResourceId(null);
//       setEditedResource({ title: "", type: "", size: "", downloads: 0, category: "", url: "" });
//       loadResources();
//     }
//   };

//   const handleDeleteResource = async (id: string) => {
//     await deleteResource(id);
//     loadResources();
//   };

//   // Helper for active / inactive tab button styling
//   const tabButtonClass = (isActive: boolean) =>
//     `px-4 py-2 rounded-md font-semibold focus:outline-none transition ${
//       isActive
//         ? "bg-indigo-600 text-white shadow-lg"
//         : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//     }`;

//   return (
//     <div className="container mx-auto p-4 space-y-10">
//       <h1 className="text-3xl font-bold">Library Management</h1>

//       {userType === "admin" && (
//         <>
//           <div className="flex space-x-4 mb-6">
//             <button
//               onClick={() => setActiveTab("books")}
//               className={tabButtonClass(activeTab === "books")}
//               aria-pressed={activeTab === "books"}
//             >
//               Books
//             </button>
//             <button
//               onClick={() => setActiveTab("resources")}
//               className={tabButtonClass(activeTab === "resources")}
//               aria-pressed={activeTab === "resources"}
//             >
//               Resources
//             </button>
//           </div>

//           {activeTab === "books" && (
//             <>
//               <section>
//                 <h2 className="text-2xl font-semibold mb-4">Add Book</h2>
//                 <Input 
//                   placeholder="Title" 
//                   value={newBook.title} 
//                   onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
//                   className="mb-2"
//                 />
//                 <Input 
//                   placeholder="Author" 
//                   value={newBook.author} 
//                   onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
//                   className="mb-2"
//                 />
//                 <Button onClick={handleAddBook}>Add Book</Button>
//               </section>

//               <section>
//                 <h2 className="text-2xl font-semibold mb-4">Books</h2>
//                 {loadingBooks ? (
//                   <p>Loading books...</p>
//                 ) : (
//                   books.map(book => (
//                     <Card key={book.id} className="mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
//                       <CardHeader>
//                         <CardTitle>{book.title}</CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         <p>Author: {book.author}</p>
//                         <p>Status: {book.status}</p>
//                         <div className="mt-2 flex space-x-2">
//                           <Button onClick={() => { setEditingBookId(book.id); setEditedBook(book); }} className="mr-2" aria-label="Edit Book">
//                             <Edit className="w-4 h-4" />
//                           </Button>
//                           <Button onClick={() => handleDeleteBook(book.id)} variant="destructive" aria-label="Delete Book"><Trash2 /></Button>
//                         </div>
//                         <Link to={`/path-to-book/${book.id}`} className="text-blue-500 underline">View Details</Link>
//                       </CardContent>
//                     </Card>
//                   ))
//                 )}
//               </section>
//             </>
//           )}

//           {activeTab === "resources" && (
//             <>
//               <section>
//                 <h2 className="text-2xl font-semibold mb-4">Add Resource</h2>
//                 <Input 
//                   placeholder="Title" 
//                   value={newResource.title} 
//                   onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
//                   className="mb-2"
//                 />
//                 {/* Select for Type */}
//                 <label htmlFor="resource-type" className="block text-sm font-medium text-gray-700 mb-1">Type</label>
//                 <select
//                   id="resource-type"
//                   value={newResource.type}
//                   onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
//                   className="mb-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//                 >
//                   <option value="" disabled>Select Type</option>
//                   {RESOURCE_TYPES.map(type => (
//                     <option key={type.value} value={type.value}>{type.label}</option>
//                   ))}
//                 </select>

//                 <Input 
//                   placeholder="Size" 
//                   value={newResource.size} 
//                   onChange={(e) => setNewResource({ ...newResource, size: e.target.value })}
//                   className="mb-2"
//                 />

//                 {/* Select for Category */}
//                 <label htmlFor="resource-category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                 <select
//                   id="resource-category"
//                   value={newResource.category}
//                   onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
//                   className="mb-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//                 >
//                   <option value="" disabled>Select Category</option>
//                   {RESOURCE_CATEGORIES.map(category => (
//                     <option key={category.value} value={category.value}>{category.label}</option>
//                   ))}
//                 </select>

//                 <Button onClick={handleAddResource}>Add Resource</Button>
//               </section>

//               <section>
//                 <h2 className="text-2xl font-semibold mb-4">Resources</h2>
//                 {loadingResources ? (
//                   <p>Loading resources...</p>
//                 ) : (
//                   resources.map(resource => (
//                     <Card key={resource.id} className="mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
//                       <CardHeader>
//                         <CardTitle>{resource.title}</CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         <p>Type: {resource.type}</p>
//                         <p>Size: {resource.size}</p>
//                         <p>Downloads: {resource.downloads}</p>
//                         <p>Category: {resource.category}</p>
//                         <div className="mt-2 flex space-x-2">
//                           <Button onClick={() => { setEditingResourceId(resource.id); setEditedResource(resource); }} className="mr-2" aria-label="Edit Resource">
//                             <Edit className="w-4 h-4" />
//                           </Button>
//                           <Button onClick={() => handleDeleteResource(resource.id)} variant="destructive" aria-label="Delete Resource"><Trash2 /></Button>
//                         </div>
//                         <Link to={`/path-to-resource/${resource.id}`} className="text-blue-500 underline">View Resource</Link>
//                       </CardContent>
//                     </Card>
//                   ))
//                 )}
//               </section>
//             </>
//           )}
//         </>
//       )}

//       {userType === 'student' && (
//         <>
//           <div className="flex space-x-4 mb-6">
//             <button
//               onClick={() => setActiveTab("books")}
//               className={tabButtonClass(activeTab === "books")}
//               aria-pressed={activeTab === "books"}
//             >
//               Books
//             </button>
//             <button
//               onClick={() => setActiveTab("resources")}
//               className={tabButtonClass(activeTab === "resources")}
//               aria-pressed={activeTab === "resources"}
//             >
//               Resources
//             </button>
//           </div>

//           {activeTab === "books" && (
//             <section>
//               <h2 className="text-2xl font-semibold mb-4">Books</h2>
//               {loadingBooks ? (
//                 <p>Loading books...</p>
//               ) : (
//                 books.map(book => (
//                   <Card key={book.id} className="mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
//                     <CardHeader>
//                       <CardTitle>{book.title}</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p>Author: {book.author}</p>
//                       <p>Status: {book.status}</p>
//                       <Link to={`/path-to-book/${book.id}`} className="text-blue-500 underline">View Details</Link>
//                     </CardContent>
//                   </Card>
//                 ))
//               )}
//             </section>
//           )}

//           {activeTab === "resources" && (
//             <section>
//               <h2 className="text-2xl font-semibold mb-4">Resources</h2>
//               {loadingResources ? (
//                 <p>Loading resources...</p>
//               ) : (
//                 resources.map(resource => (
//                   <Card key={resource.id} className="mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300">
//                     <CardHeader>
//                       <CardTitle>{resource.title}</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p>Type: {resource.type}</p>
//                       <p>Size: {resource.size}</p>
//                       <p>Downloads: {resource.downloads}</p>
//                       <p>Category: {resource.category}</p>
//                       <Link to={`/path-to-resource/${resource.id}`} className="text-blue-500 underline">View Resource</Link>
//                     </CardContent>
//                   </Card>
//                 ))
//               )}
//             </section>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default EPage;

// import React, { useState, useEffect, useCallback } from "react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Trash2, Edit } from "lucide-react";
// import {
//   fetchBooks,
//   addBook,
//   updateBook,
//   deleteBook,
//   fetchResources,
//   addResource,
//   updateResource,
//   deleteResource,
// } from "@/firebase";
// import { Link } from "react-router-dom";

// interface EPageProps {
//   userType: "admin" | "student";
// }

// const RESOURCE_TYPES = [
//   { value: "video", label: "Video" },
//   { value: "pdf", label: "PDF" },
//   { value: "doc", label: "Document" },
//   { value: "image", label: "Image" },
//   { value: "audio", label: "Audio" },
// ];

// const RESOURCE_CATEGORIES = [
//   { value: "tutorial", label: "Tutorial" },
//   { value: "reference", label: "Reference" },
//   { value: "assignment", label: "Assignment" },
//   { value: "project", label: "Project" },
//   { value: "other", label: "Other" },
// ];

// const EPage: React.FC<EPageProps> = ({ userType }) => {
//   const [books, setBooks] = useState<any[]>([]);
//   const [resources, setResources] = useState<any[]>([]);
//   const [loadingBooks, setLoadingBooks] = useState(true);
//   const [loadingResources, setLoadingResources] = useState(true);
//   const [activeTab, setActiveTab] = useState<"books" | "resources">("books");

//   const [newBook, setNewBook] = useState({
//     title: "",
//     author: "",
//     status: "available",
//     student: "",
//   });
//   const [editingBookId, setEditingBookId] = useState<string | null>(null);
//   const [editedBook, setEditedBook] = useState<typeof newBook>(newBook);

//   const [newResource, setNewResource] = useState({
//     title: "",
//     type: "",
//     size: "",
//     downloads: 0,
//     category: "",
//     url: "",
//   });
//   const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
//   const [editedResource, setEditedResource] = useState<typeof newResource>(newResource);

//   const loadBooks = useCallback(async () => {
//     setLoadingBooks(true);
//     try {
//       const data = await fetchBooks();
//       setBooks(data);
//     } catch (error) {
//       console.error("Fetching books failed", error);
//     } finally {
//       setLoadingBooks(false);
//     }
//   }, []);

//   const loadResources = useCallback(async () => {
//     setLoadingResources(true);
//     try {
//       const data = await fetchResources();
//       setResources(data);
//     } catch (error) {
//       console.error("Fetching resources failed", error);
//     } finally {
//       setLoadingResources(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadBooks();
//     loadResources();
//   }, [loadBooks, loadResources]);

//   const handleAddBook = async () => {
//     if (!newBook.title || !newBook.author) return;
//     await addBook(newBook);
//     setNewBook({ title: "", author: "", status: "available", student: "" });
//     loadBooks();
//   };

//   const handleSaveBook = async () => {
//     if (editingBookId) {
//       await updateBook(editingBookId, editedBook);
//       setEditingBookId(null);
//       setEditedBook({ title: "", author: "", status: "available", student: "" });
//       loadBooks();
//     }
//   };

//   const handleDeleteBook = async (id: string) => {
//     await deleteBook(id);
//     loadBooks();
//   };

//   const handleAddResource = async () => {
//     if (
//       !newResource.title ||
//       !newResource.type ||
//       !newResource.size ||
//       !newResource.category ||
//       !newResource.url
//     )
//       return;
//     await addResource(newResource);
//     setNewResource({
//       title: "",
//       type: "",
//       size: "",
//       downloads: 0,
//       category: "",
//       url: "",
//     });
//     loadResources();
//   };

//   const handleSaveResource = async () => {
//     if (editingResourceId) {
//       await updateResource(editingResourceId, editedResource);
//       setEditingResourceId(null);
//       setEditedResource({
//         title: "",
//         type: "",
//         size: "",
//         downloads: 0,
//         category: "",
//         url: "",
//       });
//       loadResources();
//     }
//   };

//   const handleDeleteResource = async (id: string) => {
//     await deleteResource(id);
//     loadResources();
//   };

//   // Tab button active/inactive styling
//   function tabButtonClass(isActive: boolean): string {
//     return [
//       "px-4 py-2 rounded-md font-semibold focus:outline-none transition",
//       isActive
//         ? "bg-indigo-600 text-white shadow-lg"
//         : "bg-gray-200 text-gray-700 hover:bg-gray-300",
//     ].join(" ");
//   }

//   // Danger button style for delete buttons
//   const dangerButtonClass =
//     "bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded inline-flex items-center justify-center";

//   return (
//     <div className="container mx-auto p-4 space-y-10">
//       <h1 className="text-3xl font-bold">Library Management</h1>

//       {userType === "admin" && (
//         <>
//           <div className="flex space-x-4 mb-6">
//             <button
//               onClick={() => setActiveTab("books")}
//               className={tabButtonClass(activeTab === "books")}
//               aria-pressed={activeTab === "books"}
//               type="button"
//             >
//               Books
//             </button>
//             <button
//               onClick={() => setActiveTab("resources")}
//               className={tabButtonClass(activeTab === "resources")}
//               aria-pressed={activeTab === "resources"}
//               type="button"
//             >
//               Resources
//             </button>
//           </div>

//           {activeTab === "books" && (
//             <>
//               <section>
//                 <h2 className="text-2xl font-semibold mb-4">Add Book</h2>
//                 <Input
//                   placeholder="Title"
//                   value={newBook.title}
//                   onChange={(e) =>
//                     setNewBook({ ...newBook, title: e.target.value })
//                   }
//                   className="mb-2"
//                 />
//                 <Input
//                   placeholder="Author"
//                   value={newBook.author}
//                   onChange={(e) =>
//                     setNewBook({ ...newBook, author: e.target.value })
//                   }
//                   className="mb-2"
//                 />
//                 <Button onClick={handleAddBook} type="button">
//                   Add Book
//                 </Button>
//               </section>

//               <section>
//                 <h2 className="text-2xl font-semibold mb-4">Books</h2>
//                 {loadingBooks ? (
//                   <p>Loading books...</p>
//                 ) : (
//                   books.map((book) => (
//                     <Card
//                       key={book.id}
//                       className="mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
//                     >
//                       <CardHeader>
//                         <CardTitle>{book.title}</CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         <p>Author: {book.author}</p>
//                         <p>Status: {book.status}</p>
//                         <div className="mt-2 flex space-x-2">
//                           <Button
//                             onClick={() => {
//                               setEditingBookId(book.id);
//                               setEditedBook(book);
//                             }}
//                             className="mr-2"
//                             aria-label="Edit Book"
//                             type="button"
//                           >
//                             <Edit className="w-4 h-4" />
//                           </Button>
//                           <button
//                             onClick={() => handleDeleteBook(book.id)}
//                             className={dangerButtonClass}
//                             aria-label="Delete Book"
//                             type="button"
//                           >
//                             <Trash2 />
//                           </button>
//                         </div>
//                         {/* This route may 404 if not set up in your router */}
//                         <Link
//                           to={`/path-to-book/${book.id}`}
//                           className="text-blue-500 underline"
//                         >
//                           View Details
//                         </Link>
//                       </CardContent>
//                     </Card>
//                   ))
//                 )}
//               </section>
//             </>
//           )}

//           {activeTab === "resources" && (
//             <>
//               <section>
//                 <h2 className="text-2xl font-semibold mb-4">Add Resource</h2>
//                 <Input
//                   placeholder="Title"
//                   value={newResource.title}
//                   onChange={(e) =>
//                     setNewResource({ ...newResource, title: e.target.value })
//                   }
//                   className="mb-2"
//                 />
//                 <label
//                   htmlFor="resource-type"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Type
//                 </label>
//                 <select
//                   id="resource-type"
//                   value={newResource.type}
//                   onChange={(e) =>
//                     setNewResource({ ...newResource, type: e.target.value })
//                   }
//                   className="mb-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//                 >
//                   <option value="" disabled>
//                     Select Type
//                   </option>
//                   {RESOURCE_TYPES.map((type) => (
//                     <option key={type.value} value={type.value}>
//                       {type.label}
//                     </option>
//                   ))}
//                 </select>

//                 <Input
//                   placeholder="Size"
//                   value={newResource.size}
//                   onChange={(e) =>
//                     setNewResource({ ...newResource, size: e.target.value })
//                   }
//                   className="mb-2"
//                 />

//                 <label
//                   htmlFor="resource-category"
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Category
//                 </label>
//                 <select
//                   id="resource-category"
//                   value={newResource.category}
//                   onChange={(e) =>
//                     setNewResource({ ...newResource, category: e.target.value })
//                   }
//                   className="mb-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//                 >
//                   <option value="" disabled>
//                     Select Category
//                   </option>
//                   {RESOURCE_CATEGORIES.map((category) => (
//                     <option key={category.value} value={category.value}>
//                       {category.label}
//                     </option>
//                   ))}
//                 </select>

//                 <Input
//                   placeholder="Resource URL (e.g. /files/sample.pdf)"
//                   value={newResource.url}
//                   onChange={(e) =>
//                     setNewResource({ ...newResource, url: e.target.value })
//                   }
//                   className="mb-2"
//                 />

//                 <Button onClick={handleAddResource} type="button">
//                   Add Resource
//                 </Button>
//               </section>

//               <section>
//                 <h2 className="text-2xl font-semibold mb-4">Resources</h2>
//                 {loadingResources ? (
//                   <p>Loading resources...</p>
//                 ) : (
//                   resources.map((resource) => (
//                     <Card
//                       key={resource.id}
//                       className="mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
//                     >
//                       <CardHeader>
//                         <CardTitle>{resource.title}</CardTitle>
//                       </CardHeader>
//                       <CardContent>
//                         <p>Type: {resource.type}</p>
//                         <p>Size: {resource.size}</p>
//                         <p>Downloads: {resource.downloads}</p>
//                         <p>Category: {resource.category}</p>
//                         <div className="mt-2 flex space-x-2">
//                           <Button
//                             onClick={() => {
//                               setEditingResourceId(resource.id);
//                               setEditedResource(resource);
//                             }}
//                             className="mr-2"
//                             aria-label="Edit Resource"
//                             type="button"
//                           >
//                             <Edit className="w-4 h-4" />
//                           </Button>
//                           <button
//                             onClick={() => handleDeleteResource(resource.id)}
//                             className={dangerButtonClass}
//                             aria-label="Delete Resource"
//                             type="button"
//                           >
//                             <Trash2 />
//                           </button>
//                         </div>
//                         {resource.url ? (
//                           <a
//                             href={resource.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-500 underline"
//                           >
//                             View Resource
//                           </a>
//                         ) : (
//                           <span className="text-gray-500 italic">No resource URL</span>
//                         )}
//                       </CardContent>
//                     </Card>
//                   ))
//                 )}
//               </section>
//             </>
//           )}
//         </>
//       )}

//       {userType === "student" && (
//         <>
//           <div className="flex space-x-4 mb-6">
//             <button
//               onClick={() => setActiveTab("books")}
//               className={tabButtonClass(activeTab === "books")}
//               aria-pressed={activeTab === "books"}
//               type="button"
//             >
//               Books
//             </button>
//             <button
//               onClick={() => setActiveTab("resources")}
//               className={tabButtonClass(activeTab === "resources")}
//               aria-pressed={activeTab === "resources"}
//               type="button"
//             >
//               Resources
//             </button>
//           </div>

//           {activeTab === "books" && (
//             <section>
//               <h2 className="text-2xl font-semibold mb-4">Books</h2>
//               {loadingBooks ? (
//                 <p>Loading books...</p>
//               ) : (
//                 books.map((book) => (
//                   <Card
//                     key={book.id}
//                     className="mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
//                   >
//                     <CardHeader>
//                       <CardTitle>{book.title}</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p>Author: {book.author}</p>
//                       <p>Status: {book.status}</p>
//                       <Link
//                         to={`/path-to-book/${book.id}`}
//                         className="text-blue-500 underline"
//                       >
//                         View Details
//                       </Link>
//                     </CardContent>
//                   </Card>
//                 ))
//               )}
//             </section>
//           )}

//           {activeTab === "resources" && (
//             <section>
//               <h2 className="text-2xl font-semibold mb-4">Resources</h2>
//               {loadingResources ? (
//                 <p>Loading resources...</p>
//               ) : (
//                 resources.map((resource) => (
//                   <Card
//                     key={resource.id}
//                     className="mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
//                   >
//                     <CardHeader>
//                       <CardTitle>{resource.title}</CardTitle>
//                     </CardHeader>
//                     <CardContent>
//                       <p>Type: {resource.type}</p>
//                       <p>Size: {resource.size}</p>
//                       <p>Downloads: {resource.downloads}</p>
//                       <p>Category: {resource.category}</p>
//                       {resource.url ? (
//                         <a
//                           href={resource.url}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-500 underline"
//                         >
//                           View Resource
//                         </a>
//                       ) : (
//                         <span className="text-gray-500 italic">No resource URL</span>
//                       )}
//                     </CardContent>
//                   </Card>
//                 ))
//               )}
//             </section>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default EPage;

import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit } from "lucide-react";
import {
  fetchBooks,
  addBook,
  updateBook,
  deleteBook,
  fetchResources,
  addResource,
  updateResource,
  deleteResource,
} from "@/firebase";
import { Link } from "react-router-dom";

interface EPageProps {
  userType: "admin" | "student";
}

const RESOURCE_TYPES = [
  { value: "video", label: "Video" },
  { value: "pdf", label: "PDF" },
  { value: "doc", label: "Document" },
  { value: "image", label: "Image" },
  { value: "audio", label: "Audio" },
];

const RESOURCE_CATEGORIES = [
  { value: "tutorial", label: "Tutorial" },
  { value: "reference", label: "Reference" },
  { value: "assignment", label: "Assignment" },
  { value: "project", label: "Project" },
  { value: "other", label: "Other" },
];

const EPage: React.FC<EPageProps> = ({ userType }) => {
  const [books, setBooks] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingResources, setLoadingResources] = useState(true);
  const [activeTab, setActiveTab] = useState<"books" | "resources">("books");

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    status: "available",
    student: "",
    url: "",
  });
  const [editingBookId, setEditingBookId] = useState<string | null>(null);
  const [editedBook, setEditedBook] = useState<typeof newBook>(newBook);

  const [newResource, setNewResource] = useState({
    title: "",
    type: "",
    size: "",
    downloads: 0,
    category: "",
    url: "",
  });
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
  const [editedResource, setEditedResource] = useState<typeof newResource>(newResource);

  const loadBooks = useCallback(async () => {
    setLoadingBooks(true);
    try {
      const data = await fetchBooks();
      setBooks(data);
    } catch (error) {
      console.error("Fetching books failed", error);
    } finally {
      setLoadingBooks(false);
    }
  }, []);

  const loadResources = useCallback(async () => {
    setLoadingResources(true);
    try {
      const data = await fetchResources();
      setResources(data);
    } catch (error) {
      console.error("Fetching resources failed", error);
    } finally {
      setLoadingResources(false);
    }
  }, []);

  useEffect(() => {
    loadBooks();
    loadResources();
  }, [loadBooks, loadResources]);

  const handleAddBook = async () => {
    if (!newBook.title || !newBook.author) return;
    await addBook(newBook);
    setNewBook({ title: "", author: "", status: "available", student: "", url: "" });
    loadBooks();
  };

  const handleSaveBook = async () => {
    if (editingBookId) {
      await updateBook(editingBookId, editedBook);
      setEditingBookId(null);
      setEditedBook({ title: "", author: "", status: "available", student: "", url: "" });
      loadBooks();
    }
  };

  const handleDeleteBook = async (id: string) => {
    await deleteBook(id);
    loadBooks();
  };

  const handleAddResource = async () => {
    if (
      !newResource.title ||
      !newResource.type ||
      !newResource.size ||
      !newResource.category ||
      !newResource.url
    )
      return;
    await addResource(newResource);
    setNewResource({
      title: "",
      type: "",
      size: "",
      downloads: 0,
      category: "",
      url: "",
    });
    loadResources();
  };

  const handleSaveResource = async () => {
    if (editingResourceId) {
      await updateResource(editingResourceId, editedResource);
      setEditingResourceId(null);
      setEditedResource({
        title: "",
        type: "",
        size: "",
        downloads: 0,
        category: "",
        url: "",
      });
      loadResources();
    }
  };

  const handleDeleteResource = async (id: string) => {
    await deleteResource(id);
    loadResources();
  };

  // Tab button active/inactive styling
  const tabButtonClass = (isActive: boolean): string => {
    return [
      "px-4 py-2 rounded-md font-semibold focus:outline-none transition",
      isActive
        ? "bg-indigo-600 text-white shadow-lg"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300",
    ].join(" ");
  };

  // Danger button style for delete buttons
  const dangerButtonClass =
    "bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded inline-flex items-center justify-center";

  return (
    <div className="container mx-auto p-4 space-y-10">
      <h1 className="text-3xl font-bold">Library Management</h1>

      {userType === "admin" && (
        <>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("books")}
              className={tabButtonClass(activeTab === "books")}
              aria-pressed={activeTab === "books"}
              type="button"
            >
              Books
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={tabButtonClass(activeTab === "resources")}
              aria-pressed={activeTab === "resources"}
              type="button"
            >
              Resources
            </button>
          </div>

          {activeTab === "books" && (
            <>
              <section>
                <h2 className="text-2xl font-semibold mb-4">Add Book</h2>
                <Input
                  placeholder="Title"
                  value={newBook.title}
                  onChange={(e) =>
                    setNewBook({ ...newBook, title: e.target.value })
                  }
                  className="mb-2"
                />
                <Input
                  placeholder="Author"
                  value={newBook.author}
                  onChange={(e) =>
                    setNewBook({ ...newBook, author: e.target.value })
                  }
                  className="mb-2"
                />
                <Input
                  placeholder="Resource URL (e.g. /files/book1.pdf)"
                  value={newBook.url}
                  onChange={(e) => setNewBook({ ...newBook, url: e.target.value })}
                  className="mb-2"
                />
                <Button onClick={handleAddBook} type="button">
                  Add Book
                </Button>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Books</h2>
                {loadingBooks ? (
                  <p>Loading books...</p>
                ) : (
                  books.map((book) => (
                    <Card
                      key={book.id}
                      className="mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <CardHeader>
                        <CardTitle>{book.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Author: {book.author}</p>
                        <p>Status: {book.status}</p>
                        <div className="mt-2 flex space-x-2">
                          <Button
                            onClick={() => {
                              setEditingBookId(book.id);
                              setEditedBook(book);
                            }}
                            className="mr-2"
                            aria-label="Edit Book"
                            type="button"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <button
                            onClick={() => handleDeleteBook(book.id)}
                            className={dangerButtonClass}
                            aria-label="Delete Book"
                            type="button"
                          >
                            <Trash2 />
                          </button>
                        </div>
                        {book.url ? (
                          <a
                            href={book.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            View Book
                          </a>
                        ) : (
                          <span className="text-gray-500 italic">No book URL</span>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </section>
            </>
          )}

          {activeTab === "resources" && (
            <>
              <section>
                <h2 className="text-2xl font-semibold mb-4">Add Resource</h2>
                <Input
                  placeholder="Title"
                  value={newResource.title}
                  onChange={(e) =>
                    setNewResource({ ...newResource, title: e.target.value })
                  }
                  className="mb-2"
                />
                <label
                  htmlFor="resource-type"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Type
                </label>
                <select
                  id="resource-type"
                  value={newResource.type}
                  onChange={(e) =>
                    setNewResource({ ...newResource, type: e.target.value })
                  }
                  className="mb-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  {RESOURCE_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>

                <Input
                  placeholder="Size"
                  value={newResource.size}
                  onChange={(e) =>
                    setNewResource({ ...newResource, size: e.target.value })
                  }
                  className="mb-2"
                />

                <label
                  htmlFor="resource-category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="resource-category"
                  value={newResource.category}
                  onChange={(e) =>
                    setNewResource({ ...newResource, category: e.target.value })
                  }
                  className="mb-2 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {RESOURCE_CATEGORIES.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>

                <Input
                  placeholder="Resource URL (e.g. /files/sample.pdf)"
                  value={newResource.url}
                  onChange={(e) =>
                    setNewResource({ ...newResource, url: e.target.value })
                  }
                  className="mb-2"
                />

                <Button onClick={handleAddResource} type="button">
                  Add Resource
                </Button>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Resources</h2>
                {loadingResources ? (
                  <p>Loading resources...</p>
                ) : (
                  resources.map((resource) => (
                    <Card
                      key={resource.id}
                      className="mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <CardHeader>
                        <CardTitle>{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Type: {resource.type}</p>
                        <p>Size: {resource.size}</p>
                        <p>Downloads: {resource.downloads}</p>
                        <p>Category: {resource.category}</p>
                        <div className="mt-2 flex space-x-2">
                          <Button
                            onClick={() => {
                              setEditingResourceId(resource.id);
                              setEditedResource(resource);
                            }}
                            className="mr-2"
                            aria-label="Edit Resource"
                            type="button"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <button
                            onClick={() => handleDeleteResource(resource.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded inline-flex items-center justify-center"
                            aria-label="Delete Resource"
                            type="button"
                          >
                            <Trash2 />
                          </button>
                        </div>
                        {resource.url ? (
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            View Resource
                          </a>
                        ) : (
                          <span className="text-gray-500 italic">No resource URL</span>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </section>
            </>
          )}
        </>
      )}

      {userType === "student" && (
        <>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setActiveTab("books")}
              className={tabButtonClass(activeTab === "books")}
              aria-pressed={activeTab === "books"}
              type="button"
            >
              Books
            </button>
            <button
              onClick={() => setActiveTab("resources")}
              className={tabButtonClass(activeTab === "resources")}
              aria-pressed={activeTab === "resources"}
              type="button"
            >
              Resources
            </button>
          </div>

          {activeTab === "books" && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Books</h2>
              {loadingBooks ? (
                <p>Loading books...</p>
              ) : (
                books.map((book) => (
                  <Card
                    key={book.id}
                    className="mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardHeader>
                      <CardTitle>{book.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Author: {book.author}</p>
                      <p>Status: {book.status}</p>
                      {book.url ? (
                        <a
                          href={book.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Book
                        </a>
                      ) : (
                        <span className="text-gray-500 italic">No book URL</span>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </section>
          )}

          {activeTab === "resources" && (
            <section>
              <h2 className="text-2xl font-semibold mb-4">Resources</h2>
              {loadingResources ? (
                <p>Loading resources...</p>
              ) : (
                resources.map((resource) => (
                  <Card
                    key={resource.id}
                    className="mb-3 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardHeader>
                      <CardTitle>{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Type: {resource.type}</p>
                      <p>Size: {resource.size}</p>
                      <p>Downloads: {resource.downloads}</p>
                      <p>Category: {resource.category}</p>
                      {resource.url ? (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          View Resource
                        </a>
                      ) : (
                        <span className="text-gray-500 italic">No resource URL</span>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </section>
          )}
        </>
      )}
    </div>
  );


};

export default EPage;

