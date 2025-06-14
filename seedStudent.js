// seedStudents.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-xJVjJ9ld1_TcaAwgvX3DCwGazZ2qbUU",
  authDomain: "schl-web.firebaseapp.com",
  projectId: "schl-web",
  storageBucket: "schl-web.firebasestorage.app",
  messagingSenderId: "129868180970",
  appId: "1:129868180970:web:977f4da3145208fc58d693"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedStudents() {
  const classes = [];
  for (let grade = 1; grade <= 10; grade++) {
    classes.push(`${grade}-A`, `${grade}-B`);
  }

  for (const className of classes) {
    for (let rollNo = 1; rollNo <= 30; rollNo++) {
      const studentName = `Student ${className} ${rollNo}`;
      const student = {
        name: studentName,
        rollNo: rollNo,
        class: className,
        attendanceStatus: "present" // default initial status
      };

      try {
        await addDoc(collection(db, "students"), student);
        console.log(`Added: ${studentName}`);
      } catch (error) {
        console.error(`Error adding ${studentName}:`, error);
      }
    }
  }
  console.log("Seeding complete!");
}

seedStudents();
