import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { signIn } from "@/firebase"; // Import the signIn function
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "@/firebaseconfig"; // Import auth from your firebase config

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "admin@example.com", // Default email
    password: "password123", // Default password
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign in the user
      await signIn(formData.email, formData.password);

      // Get the current user
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, "users", user.uid)); // Fetch user role from Firestore

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const role = userData.role; // Get the role from Firestore
          console.log("User role:", role); // Debugging log

          if (role === "admin") {
            navigate("/dashboard?userType=admin"); // Redirect to admin dashboard with query parameter
          } else if (role === "student") {
            navigate("/dashboard?userType=student"); // Redirect to student dashboard with query parameter
          } else {
            setError("Unknown user role");
          }
        } else {
          setError("User not found");
        }
      }
    } catch (error) {
      console.error("Login error:", error); // Debugging log
      setError("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Admin Login
      </h1>
      {error && (
        <p className="text-center text-red-600 mb-4 select-none" role="alert">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className="px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          autoComplete="username"
          aria-label="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="Password"
          required
          className="px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          autoComplete="current-password"
          aria-label="Password"
        />
        <Button type="submit" className="w-full py-3">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;

