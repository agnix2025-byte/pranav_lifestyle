// src/pages/LoginPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const LoginPage = () => {
  
  const navigate = useNavigate(); // 2. Get the navigate function

  // 3. Update handleSubmit to navigate
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd check username/password here
    // For our mock, we just navigate to the dashboard.
    navigate('/dashboard'); 
  };

  return (
    <div className="container py-16 md:py-24 min-h-[70vh] flex items-center justify-center">
      
      {/* Form Card (unchanged) */}
      <form 
        className="max-w-md w-full mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Client Portal Login
        </h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address:
            </label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
              defaultValue="admin@email.com" // Added a default for demo
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password:
            </label>
            <input 
              type="password" 
              id="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required 
              defaultValue="password" // Added a default for demo
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 text-lg"
          >
            Login
          </button>
          <div className="text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;