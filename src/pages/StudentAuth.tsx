import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { registerUser , signIn } from "@/firebase"; // Import the functions

const StudentAuth = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and registration
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ email: "", password: "", confirmPassword: "", role: "" });
  const [error, setError] = useState("");

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRegisterData({ ...registerData, role: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(loginData.email, loginData.password);
      navigate("/dashboard?userType=student");
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await registerUser (registerData.email, registerData.password, registerData.role); // Pass the role
      navigate("/dashboard?userType=student");
    } catch (error) {
      setError("Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Student Portal</h1>
      {error && <p className="text-center text-red-600 mb-4 select-none" role="alert">{error}</p>}
      
      {isRegistering ? (
        <form onSubmit={handleRegister}>
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleRegisterChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition mb-4"
          />
          <input
            type="password"
            name="password"
            value={registerData.password}
            onChange={handleRegisterChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition mb-4"
          />
          <input
            type="password"
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleRegisterChange}
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition mb-4"
          />
          <select
            name="role"
            onChange={handleRoleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition mb-4"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <Button type="submit" className="w-full py-3">Register</Button>
          <p className="text-center mt-4">
            Already have an account? 
            <button 
              type="button" 
              onClick={() => setIsRegistering(false)} 
              className="text-indigo-600 hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleLoginChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition mb-4"
          />
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition mb-4"
          />
          <Button type="submit" className="w-full py-3">Sign In</Button>
          <p className="text-center mt-4">
            Don't have an account? 
            <button 
              type="button" 
              onClick={() => setIsRegistering(true)} 
              className="text-indigo-600 hover:underline"
            >
              Register
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default StudentAuth;
