// src/components/AdminNav.tsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const AdminNav = () => {
  // 1. Add state for the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  // Rise/press styles for desktop links - UPDATED TO GREEN
  const getLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-95 ${
      isActive
        ? 'bg-green-100 text-brand-green-dark' // CHANGED
        : 'text-gray-600 hover:bg-gray-100'
    }`;
  
  // Styles for mobile links
  const mobileLinkStyles = "block w-full text-center py-4 text-lg border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 active:scale-95";

  return (
    // 2. Wrap in a sticky div
    <div className="w-full sticky top-0 z-50 flex justify-center">
      <nav 
        // 3. Apply all the floating/glass styles
        className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/30
                   w-11/12 max-w-6xl 
                   mt-4 
                   transition-all duration-300"
      >
        <div className="container flex justify-between items-center h-20 px-6">
          
          {/* Logo and Title */}
          <div>
            <Link to="/admin" className="text-2xl font-bold text-brand-green-dark uppercase" onClick={closeMenu}> {/* CHANGED */}
              Pranav Lifestyle
            </Link>
            <span className="ml-2 px-3 py-1 bg-green-100 text-brand-green-dark text-xs font-bold rounded-full hidden md:inline"> {/* CHANGED */}
              ADMIN PORTAL
            </span>
          </div>

          {/* 4. Add Hamburger Button */}
          <button 
            className="md:hidden text-3xl text-brand-green-dark" // CHANGED
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
          
          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/admin" end className={getLinkClass}>
              All Clients
            </NavLink>
            <NavLink to="/admin/add-client" className={getLinkClass}>
              Add New Client
            </NavLink>
            
            <Link 
              to="/" 
              className="ml-4 px-5 py-2 border border-gray-400 text-gray-600 text-sm font-semibold rounded-lg shadow-sm 
                         hover:bg-gray-100 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              Logout
            </Link>
          </div>
        </div>

        {/* --- 5. Mobile Menu (Dropdown) --- */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}
                      ${isOpen ? 'rounded-b-2xl shadow-lg' : ''}`} // Match new rounded corner
        >
          {/* We wrap in another div to get the glass effect on the dropdown */}
          <div className="bg-white/90 backdrop-blur-lg rounded-b-2xl">
            <NavLink to="/admin" end className={mobileLinkStyles} onClick={closeMenu}>
              All Clients
            </NavLink>
            <NavLink to="/admin/add-client" className={mobileLinkStyles} onClick={closeMenu}>
              Add New Client
            </NavLink>
            <div className="p-4">
              <Link 
                to="/" 
                className="block w-full text-center py-3 border border-gray-400 text-gray-600 font-semibold rounded-lg shadow-sm transition-transform active:scale-95" 
                onClick={closeMenu}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNav;

