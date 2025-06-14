import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-xJVjJ9ld1_TcaAwgvX3DCwGazZ2qbUU",
  authDomain: "schl-web.firebaseapp.com",
  projectId: "schl-web",
  storageBucket: "schl-web.firebasestorage.app",
  messagingSenderId: "129868180970",
  appId: "1:129868180970:web:977f4da3145208fc58d693"
};

// Initialize Firebase app (if not already initialized)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore, Auth, and Storage using the app instance
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Export Firebase instances
export { db, auth, storage, app };

