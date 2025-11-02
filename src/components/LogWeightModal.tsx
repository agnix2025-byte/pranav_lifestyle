// src/components/LogWeightModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define the props our modal will accept
interface LogWeightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Animation for the backdrop
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Animation for the modal itself (pop-up)
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25 } },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

const LogWeightModal = ({ isOpen, onClose }: LogWeightModalProps) => {
  const [weight, setWeight] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd send this 'weight' to the database.
    console.log(`Submitting weight: ${weight}`);
    alert(`Weight logged: ${weight}kg`);
    setWeight('');
    onClose(); // Close the modal
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. The Backdrop (click to close) */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose} // Click outside to close
          />
            
          {/* 2. The Modal Card */}
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl p-8 z-50 w-full max-w-md"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Log Today's Weight
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-2">
                    Today's Weight (kg):
                  </label>
                  <input
                    type="number"
                    id="weight"
                    step="0.1"
                    // UPDATED: focus ring to green
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                    placeholder="e.g., 77.5"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    // UPDATED: Added transition effects
                    className="px-5 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    // UPDATED: Changed to green and added transition effects
                    className="px-5 py-2 bg-brand-green text-white font-semibold rounded-lg shadow-md hover:bg-brand-green-dark transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                  >
                    Save Weight
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LogWeightModal;

