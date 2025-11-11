// src/pages/AdminDashboard.tsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// We'll use mock data for now. Later, this will come from Firestore.
const mockClientData = [
  { id: 'client-1', name: 'Ganesh K.', email: 'ganesh@email.com', plan: '21 Day Challenge', due: '2025-11-20' },
  { id: 'client-2', name: 'Priya S.', email: 'priya@email.com', plan: '3 Day Trial', due: '2025-11-05' },
  { id: 'client-3', name: 'Arjun M.', email: 'arjun@email.com', plan: 'Monthly Sustain', due: '2025-11-15' },
];

const AdminDashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container">
        
        {/* Header animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Client Management
          </h1>
          <Link 
            to="/admin/add-client" 
            // UPDATED: Theme and animations
            className="px-5 py-2 bg-brand-green text-white font-semibold rounded-lg shadow hover:bg-brand-green-dark transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            + Add New Client
          </Link>
        </motion.div>

        {/* Client List Table animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Plan</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Payment Due</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockClientData.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-gray-900">{client.name}</div>
                    <div className="text-sm text-gray-500">{client.email}</div>
                  </td>
                  <td className="p-4 text-gray-700">{client.plan}</td>
                  <td className="p-4 text-red-600 font-medium">{client.due}</td>
                  <td className="p-4">
                    {/* --- THIS IS THE UPDATED LINK --- */}
                    <Link 
                      to={`/admin/edit-client/${client.id}`} 
                      // UPDATED: Theme
                      className="text-brand-green-dark hover:underline font-medium"
                    >
                      View / Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

      </div>
    </div>
  );
};

export default AdminDashboard;

