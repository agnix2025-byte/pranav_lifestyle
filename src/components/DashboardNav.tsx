// src/components/DashboardNav.tsx
import { Link } from 'react-router-dom';

const DashboardNav = () => {
  return (
    // 1. Wrap in a sticky div to center the floating card
    <div className="w-full sticky top-0 z-50 flex justify-center">
      <nav 
        // 2. Apply all the floating/glass styles
        className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/30
                   w-11/12 max-w-6xl 
                   mt-4 
                   transition-all duration-300"
      >
        <div className="container flex justify-between items-center h-20 px-6">
          
          {/* Logo - UPDATED TO GREEN */}
          <Link to="/dashboard" className="text-2xl font-bold text-brand-green-dark uppercase">
            Pranav Lifestyle
          </Link>
          
          {/* Logout Button */}
          <Link 
            to="/" // Links back to the homepage
            // Added rise/press animations
            className="px-5 py-2 border border-gray-400 text-gray-600 font-semibold rounded-lg shadow-sm 
                       hover:bg-gray-100 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            Logout
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNav;

