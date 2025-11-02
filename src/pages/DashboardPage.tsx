// src/pages/DashboardPage.tsx
import React, { useState } from 'react'; // 1. Import useState
import LogWeightModal from '../components/LogWeightModal'; // 2. Import the modal
import { motion } from 'framer-motion'; // 3. Import motion

// A simple reusable card component for the dashboard
const DashboardCard = ({ 
  title, 
  children,
  buttonText,
  onButtonClick
}: { 
  title: string, 
  children: React.ReactNode,
  buttonText?: string, // Make button text optional
  onButtonClick?: () => void // Make button click optional
}) => (
  // UPDATED: Added motion.div for animation
  <motion.div 
    className="bg-white rounded-xl shadow-lg p-6"
    variants={{ // Animation for each card
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="text-gray-600 space-y-2">
      {children}
    </div>
    
    {/* 3. Conditionally render the button if text is provided */}
    {buttonText && (
      <button 
        // UPDATED: Changed to green and added animations
        className="mt-4 px-4 py-2 bg-brand-green text-white rounded-lg text-sm font-medium 
                   hover:bg-brand-green-dark transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    )}
  </motion.div>
);

const DashboardPage = () => {
  // 4. Create state to control the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 5. Animation variants for the grid
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Each card will appear 0.1s after the last
      },
    },
  };

  return (
    // Page container
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container">
        
        {/* Welcome Header - UPDATED: Added animation */}
        <motion.h1 
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Welcome back, Client!
        </motion.h1>
        
        {/* Dashboard Grid - UPDATED: Added animation container */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Card 1: Meal Plan */}
          <DashboardCard title="Today's Meal Plan (Mock Data)">
            <p><strong>Breakfast:</strong> Oatmeal with berries.</p>
            <p><strong>Lunch:</strong> Quinoa salad with chicken.</p>
            <p><strong>Dinner:</strong> Baked salmon with vegetables.</p>
          </DashboardCard>

          {/* Card 2: My Progress */}
          <DashboardCard 
            title="My Progress"
            buttonText="Log Today's Weight" // 5. Pass button props
            onButtonClick={() => setIsModalOpen(true)} // 6. Open modal on click
          >
            <p><strong>Starting Weight:</strong> 80kg</p>
            <p><strong>Current Weight:</strong> 78kg</p>
            {/* UPDATED: Changed text to green */}
            <p className="font-semibold text-brand-green-dark">You've lost 2kg! Keep it up!</p>
          </DashboardCard>

          {/* Card 3: Next Session */}
          <DashboardCard title="Next Session">
            <p><strong>Topic:</strong> Wellness Talk - Week 2</p>
            <p><strong>Date:</strong> Monday, Nov 3rd @ 7:00 PM</p>
            <a href="#" className="mt-2 inline-block text-brand-green-dark font-semibold hover:underline"> {/* UPDATED: Changed to green */}
              Join Zoom Meeting
            </a>
          </DashboardCard>

        </motion.div>
      </div>

      {/* 7. Render the modal component */}
      {/* It's hidden by default and only shows when isModalOpen is true */}
      <LogWeightModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default DashboardPage;

