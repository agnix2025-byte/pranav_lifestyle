// src/pages/AddClientPage.tsx
import React, { useState } from 'react'; // 1. Import useState
import { motion } from 'framer-motion'; // 2. Import motion

// 3. A simple spinner component
const Spinner = () => (
  <svg 
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      className="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      strokeWidth="4"
    ></circle>
    <path 
      className="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const AddClientPage = () => {
  // 4. Add loading state
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // 5. Set loading to true

    // 6. Simulate a network request (e.g., creating a user in Firebase)
    setTimeout(() => {
      setIsLoading(false); // 7. Set loading to false
      alert('New client created! (Mock)');
      // In a real app, you'd reset the form fields here
    }, 1500); // 1.5 second delay
  };

  return (
    <div className="container py-16 min-h-[70vh]">
      
      {/* 8. Animate the form card */}
      <motion.form 
        className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Add New Client
        </h2>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Client's Full Name:
            </label>
            <input 
              type="text" 
              id="name" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              required 
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Client's Email:
            </label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              required 
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Create Temporary Password:
            </label>
            <input 
              type="password" 
              id="password" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              required 
            />
          </div>
          
          <div>
            <label htmlFor="plan" className="block text-sm font-medium text-gray-700 mb-2">
              Initial Plan:
            </label>
            <select 
              id="plan" 
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
            >
              <option value="3 Day Trial">3 Day Trial</option>
              <option value="21 Day Challenge">21 Day Challenge</option>
              <option value="Monthly Sustain">Monthly Sustain</option>
            </select>
          </div>

          <button 
            type="submit" 
            // 9. Update button styles and content based on loading state
            className={`w-full py-3 px-6 text-white font-semibold rounded-lg shadow-md text-lg 
                        transition-all duration-300 flex items-center justify-center
                        ${isLoading 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-brand-green hover:bg-brand-green-dark hover:-translate-y-0.5 active:scale-95'}`}
            disabled={isLoading} // 10. Disable button when loading
          >
            {isLoading ? (
              <>
                <Spinner />
                Creating Account...
              </>
            ) : (
              'Create Client Account'
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default AddClientPage;

