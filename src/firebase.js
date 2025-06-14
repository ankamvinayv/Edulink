import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  getDoc,
  setDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { db, auth, storage, } from "./firebaseconfig";

// Authentication Functions
export const registerUser  = async (email, password, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user role and other details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role, // Assign the role (either "admin" or "student")
    });

    return userCredential; // Return user credential for further use if needed
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential; // Return user credential for further use if needed
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signOutUser  = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    await updateProfile(auth.currentUser , profileData);
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

export const onAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Announcements Functions
export const fetchAnnouncements = async (orderByField = null, orderDirection = 'desc', limitNumber = null) => {
  try {
    let q = collection(db, "announcements");

    if (orderByField) {
      q = query(q, orderBy(orderByField, orderDirection));
    }

    if (limitNumber) {
      q = query(q, limit(limitNumber));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching announcements:", error);
    throw error;
  }
};

export const addAnnouncement = async (announcement) => {
  try {
    const docRef = await addDoc(collection(db, "announcements"), announcement);
    return { id: docRef.id, ...announcement };
  } catch (error) {
    console.error("Error adding announcement:", error);
    throw error;
  }
};

export const updateAnnouncement = async (id, updatedData) => {
  try {
    const announcementRef = doc(db, "announcements", id);
    await updateDoc(announcementRef, updatedData);
  } catch (error) {
    console.error("Error updating announcement:", error);
    throw error;
  }
};

export const deleteAnnouncement = async (id) => {
  try {
    await deleteDoc(doc(db, "announcements", id));
  } catch (error) {
    console.error("Error deleting announcement:", error);
    throw error;
  }
};

// Assignments Functions
export const fetchAssignments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "assignments"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching assignments:", error);
    throw error;
  }
};

export const addAssignment = async (assignment) => {
  try {
    const docRef = await addDoc(collection(db, "assignments"), assignment);
    return { id: docRef.id, ...assignment };
  } catch (error) {
    console.error("Error adding assignment:", error);
    throw error;
  }
};

export const updateAssignment = async (id, updatedData) => {
  try {
    const assignmentRef = doc(db, "assignments", id);
    await updateDoc(assignmentRef, updatedData);
  } catch (error) {
    console.error("Error updating assignment:", error);
    throw error;
  }
};

export const deleteAssignment = async (id) => {
  try {
    await deleteDoc(doc(db, "assignments", id));
  } catch (error) {
    console.error("Error deleting assignment:", error);
    throw error;
  }
};

// Students Functions
export const fetchStudentsByClass = async (className) => {
  try {
    const q = query(collection(db, "students"), where("class", "==", className));
    const querySnapshot = await getDocs(q);
    const students = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const uniqueStudentsMap = new Map();
    for (const student of students) {
      if (!uniqueStudentsMap.has(student.rollNo)) {
        uniqueStudentsMap.set(student.rollNo, student);
      }
    }

    return Array.from(uniqueStudentsMap.values()).sort((a, b) => Number(a.rollNo) - Number(b.rollNo));
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// Attendance Functions
export const saveAttendanceRecord = async (studentId, attendanceData) => {
  const attendanceDocId = `${studentId}_${attendanceData.date}`;
  const attendanceRef = doc(db, "attendance", attendanceDocId);

  try {
    const docSnapshot = await getDoc(attendanceRef);
    if (docSnapshot.exists()) {
      await updateDoc(attendanceRef, attendanceData);
    } else {
      await setDoc(attendanceRef, {
        studentId,
        ...attendanceData,
      });
    }
  } catch (error) {
    console.error("Error saving attendance record:", error);
    throw error;
  }
};

// Grades Functions
export const fetchGradesByClass = async (className) => {
  try {
    const q = query(collection(db, "grades"), where("class", "==", className));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching grades:", error);
    throw error;
  }
};

export const addGrade = async (grade) => {
  try {
    const docRef = await addDoc(collection(db, "grades"), grade);
    return { id: docRef.id, ...grade };
  } catch (error) {
    console.error("Error adding grade:", error);
    throw error;
  }
};

export const updateGrade = async (id, updatedData) => {
  try {
    const gradeRef = doc(db, "grades", id);
    await updateDoc(gradeRef, updatedData);
  } catch (error) {
    console.error("Error updating grade:", error);
    throw error;
  }
};

export const deleteGrade = async (id) => {
  try {
    await deleteDoc(doc(db, "grades", id));
  } catch (error) {
    console.error("Error deleting grade:", error);
    throw error;
  }
};

// Storage Functions
export const uploadFile = async (file, storagePath) => {
  try {
    const storageRef = ref(storage, storagePath);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const deleteFile = async (storagePath) => {
  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

// Government Schemes Functions
export const addGovScheme = async (scheme) => {
  try {
    const docRef = await addDoc(collection(db, "govschemes"), scheme);
    return { id: docRef.id, ...scheme };
  } catch (error) {
    console.error("Error adding government scheme:", error);
    throw error;
  }
};

export const fetchGovSchemes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "govschemes"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching government schemes:", error);
    throw error;
  }
};

export const updateGovScheme = async (id, updatedData) => {
  try {
    const schemeRef = doc(db, "govschemes", id);
    await updateDoc(schemeRef, updatedData);
  } catch (error) {
    console.error("Error updating government scheme:", error);
    throw error;
  }
};

export const deleteGovScheme = async (id) => {
  try {
    await deleteDoc(doc(db, "govschemes", id));
  } catch (error) {
    console.error("Error deleting government scheme:", error);
    throw error;
  }
};



const booksCollection = collection(db, "books");

export const fetchBooks = async () => {
  const snapshot = await getDocs(booksCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addBook = async (book) => {
  const docRef = await addDoc(booksCollection, book);
  return { id: docRef.id, ...book };
};

export const updateBook = async (id, updatedBook) => {
  const bookDoc = doc(db, "books", id);
  await updateDoc(bookDoc, updatedBook);
};

export const deleteBook = async (id) => {
  const bookDoc = doc(db, "books", id);
  await deleteDoc(bookDoc);
};

// --- Resources CRUD ---

const resourcesCollection = collection(db, "resources");

export const fetchResources = async () => {
  const snapshot = await getDocs(resourcesCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addResource = async (resource) => {
  const docRef = await addDoc(resourcesCollection, resource);
  return { id: docRef.id, ...resource };
};

export const updateResource = async (id, updatedResource) => {
  const resourceDoc = doc(db, "resources", id);
  await updateDoc(resourceDoc, updatedResource);
};

export const deleteResource = async (id) => {
  const resourceDoc = doc(db, "resources", id);
  await deleteDoc(resourceDoc);
};







