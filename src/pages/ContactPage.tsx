// src/pages/ContactPage.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion'; // 1. Import motion

// 2. A simple spinner component
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

const ContactPage = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');

  // 3. Add loading state
  const [isLoading, setIsLoading] = useState(false);

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = { name, number, email, service };

    try {
      // 1. Call backend API to store in DB + send email
      const res = await fetch('http://localhost:10010/api/contact/detail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to submit form');
      }

      // 2. Open WhatsApp with pre-filled message
      const clientPhoneNumber = '917010732223';

      let message = `*New Customer Inquiry from Website*:\n\n`;
      message += `*Name:* ${name}\n`;
      message += `*Number:* ${number}\n`;
      message += `*Email:* ${email}\n`;
      message += `*Service Interested In:* ${service || 'Not specified'}`;

      const whatsappURL = `https://wa.me/${clientPhoneNumber}?text=${encodeURIComponent(
        message
      )}`;

      window.open(whatsappURL, '_blank');

      // 3. Reset form fields
      setName('');
      setNumber('');
      setEmail('');
      setService('');

      // Optional: toast/snackbar
      // toast.success('Details sent successfully!');
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-16 md:py-24 min-h-[70vh]">

      {/* 8. Animate the form card */}
      <motion.form
        className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Click submit to send us your details directly on WhatsApp!
        </p>

        <div className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-700 mb-2">
              Number:
            </label>
            <input
              type="tel"
              id="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
              Service Interested In:
            </label>
            <select
              id="service"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">-- Please select a service --</option>
              <option value="Weight Loss / Gain">Weight Loss / Gain</option>
              <option value="Immune & Sports Nutrition">Immune & Sports Nutrition</option>
              <option value="Kids Nutrition">Kids Nutrition</option>
              <option value="Bone Health">Bone Health</option>
              <option value="Heart Health">Heart Health</option>
              <option value="Skin Nutrition">Skin Nutrition</option>
              <option value="Digestive Health">Digestive Health</option>
              <option value="Brain Health">Brain Health</option>
              <option value="Women Health">Women Health</option>
              <option value="Men Health">Men Health</option>
            </select>
          </div>

          <button
            type="submit"
            // 9. Update button styles based on loading state
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
                Sending...
              </>
            ) : (
              'Send on WhatsApp'
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default ContactPage;

