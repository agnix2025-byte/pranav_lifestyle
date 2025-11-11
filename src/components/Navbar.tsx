// src/components/Navbar.tsx
import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  // --- CHANGED --- Added hover:-translate-y-0.5 and duration-300
  const linkStyles = "py-2 px-3 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:-translate-y-0.5 block";
  
  // --- CHANGED --- Added base transition classes
  const mobileLinkStyles = "block w-full text-center py-4 text-lg border-b border-gray-200 hover:bg-gray-50 transition-all duration-300 active:scale-95";

  return (
    <div className="w-full sticky top-0 z-50 flex justify-center">
      <nav 
        // --- CHANGED --- Made glass effect stronger (bg-white/70, blur-xl, shadow-2xl, rounded-2xl) and added border
        className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-2xl border border-white/30
                   w-11/12 max-w-6xl 
                   mt-4 
                   transition-all duration-300"
      >
        <div className="container flex justify-between items-center h-20 px-6">
          
          {/* UPDATED: Changed to green */}
          <Link to="/" className="text-2xl font-bold text-brand-green-dark uppercase" onClick={closeMenu}>
            Pranav Lifestyle
          </Link>
          
          <button 
            // UPDATED: Changed to green
            className="md:hidden text-3xl text-brand-green-dark" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '✕' : '☰'}
          </button>

          {/* --- Desktop Menu --- */}
          <div className="hidden md:flex items-center space-x-1">
            <HashLink smooth to="/#home" className={linkStyles}>Home</HashLink>
            <HashLink smooth to="/#services" className={linkStyles}>Services</HashLink>
            <HashLink smooth to="/#programs" className={linkStyles}>Programs</HashLink>
            <HashLink smooth to="/#testimonials" className={linkStyles}>Customer Feedback</HashLink>
            <Link 
              to="/login" 
              // UPDATED: Changed to green theme
              className="ml-2 px-5 py-2 border border-brand-green text-brand-green-dark font-semibold rounded-lg shadow-sm 
                         hover:bg-green-50 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              Client Login
            </Link>
            <Link 
              to="/contact" 
              // UPDATED: Changed to green theme
              className="ml-2 px-5 py-2 bg-brand-green text-white font-semibold rounded-lg shadow hover:bg-brand-green-dark
                         transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* --- Mobile Menu (Dropdown) --- */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[500px]' : 'max-h-0'}
                      ${isOpen ? 'rounded-b-2xl shadow-lg' : ''}`} // Match new rounded corner
        >
          {/* We must wrap the links in a div to prevent a padding bug */}
          <div className="bg-white/90 backdrop-blur-lg rounded-b-2xl">
            <HashLink smooth to="/#home" className={mobileLinkStyles} onClick={closeMenu}>Home</HashLink>
            <HashLink smooth to="/#services" className={mobileLinkStyles} onClick={closeMenu}>Services</HashLink>
            <HashLink smooth to="/#programs" className={mobileLinkStyles} onClick={closeMenu}>Programs</HashLink>
            <HashLink smooth to="/#testimonials" className={mobileLinkStyles} onClick={closeMenu}>Customer Feedback</HashLink>
            <div className="p-4 space-y-3">
              <Link 
                to="/login" 
                // UPDATED: Changed to green theme
                className="block w-full text-center py-3 border border-brand-green text-brand-green-dark font-semibold rounded-lg shadow-sm transition-transform active:scale-95" 
                onClick={closeMenu}
              >
                Client Login
              </Link>
              <Link 
                to="/contact" 
                // UPDATED: Changed to green theme
                className="block w-full text-center py-3 bg-brand-green text-white font-semibold rounded-lg shadow transition-transform active:scale-95" 
                onClick={closeMenu}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

