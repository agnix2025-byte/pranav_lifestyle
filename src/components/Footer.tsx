// src/components/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    // UPDATED: Changed to a light "White and Green" theme
    <footer className="bg-white text-gray-700 py-12 text-center border-t border-gray-200">
      <div className="container">
        
        {/* UPDATED: Changed text color to green */}
        <h3 className="text-xl font-bold text-brand-green-dark uppercase tracking-wider mb-2">
          Anandhi Ganesh Kumar
        </h3>
        
        {/* UPDATED: Changed text color and added animations */}
        <div className="text-lg space-x-4 mb-8">
          <a 
            href="tel:7010732223" 
            className="text-gray-600 hover:text-brand-green-dark transition-all duration-300 hover:scale-110 inline-block"
          >
            70107 32223
          </a>
          <span className="text-gray-400">/</span>
          <a 
            href="tel:7010750005" 
            className="text-gray-600 hover:text-brand-green-dark transition-all duration-300 hover:scale-110 inline-block"
          >
            70107 50005
          </a>
        </div>

        {/* UPDATED: Changed border and text colors */}
        <div className="border-t border-gray-200 pt-8 mt-8 text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Pranav Lifestyle. All rights reserved.
          </p>
          <p className="mt-1">
            Website designed by <a href="#" className="font-medium text-brand-green-dark hover:underline">AgniXTech</a>.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

