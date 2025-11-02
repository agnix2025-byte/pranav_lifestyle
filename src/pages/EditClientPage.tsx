// src/pages/EditClientPage.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// 1. A reusable spinner component
const Spinner = () => (
  <svg 
    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" 
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

// A reusable card for this dashboard
const EditCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <h3 className="text-xl font-semibold text-gray-800 p-6 border-b border-gray-200">
      {title}
    </h3>
    <div className="p-6 space-y-4">
      {children}
    </div>
  </div>
);

// A helper for form fields
const FormField = ({ label, id, ...props }: { label: string, id: string, [key: string]: any }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      id={id}
      // UPDATED: Changed focus ring to green
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition-colors"
      {...props}
    />
  </div>
);

const EditClientPage = () => {
  const { clientId } = useParams();
  
  // Mock data
  const [clientData] = useState({
    name: 'Ganesh K.',
    email: 'ganesh@email.com',
    plan: '21 Day Challenge',
    due: '2025-11-20',
  });
  
  // State for the meal plan
  const [mealPlan, setMealPlan] = useState(
`--- Breakfast ---
Oatmeal with berries and a scoop of protein powder.

--- Lunch ---
Large quinoa salad with grilled chicken breast, mixed vegetables, and a lemon-tahini dressing.

--- Snack ---
Greek yogurt with a handful of almonds.

--- Dinner ---
Baked salmon with a side of roasted sweet potatoes and steamed broccoli.`
  );

  // 2. Add loading states for each button
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isBillingLoading, setIsBillingLoading] = useState(false);
  const [isPlanLoading, setIsPlanLoading] = useState(false);

  // 3. Mock submit handlers with loading simulation
  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDetailsLoading(true);
    setTimeout(() => setIsDetailsLoading(false), 1500);
  };

  const handleUpdateBilling = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBillingLoading(true);
    setTimeout(() => setIsBillingLoading(false), 1500);
  };

  const handleUpdatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlanLoading(true);
    setTimeout(() => setIsPlanLoading(false), 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container">
        {/* Header with back link */}
        <div className="mb-8">
          <Link to="/admin" className="text-brand-green-dark hover:underline mb-2 block transition-colors"> {/* UPDATED: Green link */}
            &larr; Back to All Clients
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Edit Client: {clientData.name}
          </h1>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Client Details & Billing) */}
          <motion.div 
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <EditCard title="Client Details">
              <form onSubmit={handleSaveDetails} className="space-y-4">
                <FormField label="Full Name" id="name" defaultValue={clientData.name} />
                <FormField label="Email Address" id="email" type="email" defaultValue={clientData.email} />
                <button 
                  type="submit"
                  // UPDATED: Theme, loading state, and animations
                  className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center
                            ${isDetailsLoading 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-brand-green text-white hover:bg-brand-green-dark hover:-translate-y-0.5 active:scale-95'}`}
                  disabled={isDetailsLoading}
                >
                  {isDetailsLoading ? <><Spinner /> Saving...</> : 'Save Details'}
                </button>
              </form>
            </EditCard>
            
            <EditCard title="Billing">
              <form onSubmit={handleUpdateBilling} className="space-y-4">
                <FormField label="Payment Due Date" id="due" type="date" defaultValue={clientData.due} />
                <button 
                  type="submit"
                  // UPDATED: Theme, loading state, and animations
                  className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center
                            ${isBillingLoading 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-brand-green text-white hover:bg-brand-green-dark hover:-translate-y-0.5 active:scale-95'}`}
                  disabled={isBillingLoading}
                >
                  {isBillingLoading ? <><Spinner /> Updating...</> : 'Update Billing'}
                </button>
              </form>
            </EditCard>
          </motion.div>

          {/* Right Column (Meal Plan & Progress) */}
          <motion.div 
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <EditCard title="Meal Plan Editor">
              <form onSubmit={handleUpdatePlan} className="space-y-4">
                <textarea
                  // UPDATED: focus ring to green
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green font-mono text-sm"
                  value={mealPlan}
                  onChange={(e) => setMealPlan(e.target.value)}
                />
                <button 
                  type="submit"
                  // UPDATED: Theme, loading state, and animations
                  className={`w-full py-3 px-6 text-white font-semibold rounded-lg shadow-md text-lg transition-all duration-300 flex items-center justify-center
                            ${isPlanLoading 
                              ? 'bg-gray-400 cursor-not-allowed' 
                              : 'bg-brand-green hover:bg-brand-green-dark hover:-translate-y-0.5 active:scale-95'}`}
                  disabled={isPlanLoading}
                >
                  {isPlanLoading ? <><Spinner /> Updating Plan...</> : 'Update Meal Plan'}
                </button>
              </form>
            </EditCard>

            <EditCard title="Client Progress (Mock Data)">
              <ul className="divide-y divide-gray-200">
                <li className="py-2 flex justify-between"><span>Oct 30:</span> <span className="font-medium">78.0 kg</span></li>
                <li className="py-2 flex justify-between"><span>Oct 28:</span> <span className="font-medium">78.5 kg</span></li>
                <li className="py-2 flex justify-between"><span>Oct 26:</span> <span className="font-medium">79.0 kg</span></li>
                <li className="py-2 flex justify-between text-gray-500"><span>Oct 24 (Start):</span> <span className="font-medium">80.0 kg</span></li>
              </ul>
            </EditCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditClientPage;

