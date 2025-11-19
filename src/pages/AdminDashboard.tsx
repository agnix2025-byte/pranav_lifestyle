// src/pages/AdminDashboard.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api";

type Client = {
  id: string;
  name: string;
  email: string;
  plan: string;
  startDate: string;
  dueDate: string;
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const getStatus = (dueDateStr: string) => {
  const today = new Date();
  const due = new Date(dueDateStr);

  // Normalize times (ignore hours) for "Due Today"
  const t = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).getTime();
  const d = new Date(due.getFullYear(), due.getMonth(), due.getDate()).getTime();

  if (d < t) return "Payment Due";
  if (d === t) return "Due Today";
  return "Active";
};

const getStatusClass = (status: string) => {
  if (status === "Payment Due") return "text-red-600 font-semibold";
  if (status === "Due Today") return "text-orange-500 font-semibold";
  return "text-green-600 font-semibold";
};

const AdminDashboard: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get<Client[]>("/admin/users");
      setClients(res.data);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to load clients from server"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

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
            className="px-5 py-2 bg-brand-green text-white font-semibold rounded-lg shadow hover:bg-brand-green-dark transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            + Add New Client
          </Link>
        </motion.div>

        {/* Error / loading states */}
        {error && (
          <div className="mb-4 text-red-600 bg-red-50 border border-red-200 px-4 py-2 rounded">
            {error}
          </div>
        )}

        {/* Client List Table animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading clients...
            </div>
          ) : clients.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No clients found. Click &quot;Add New Client&quot; to create one.
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">
                    Name
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">
                    Plan
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">
                    Start Date
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">
                    Payment Due
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clients.map((client) => {
                  const status = getStatus(client.dueDate);
                  return (
                    <tr
                      key={client.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-medium text-gray-900">
                          {client.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {client.email}
                        </div>
                      </td>
                      <td className="p-4 text-gray-700">{client.plan}</td>
                      <td className="p-4 text-gray-700">
                        {formatDate(client.startDate)}
                      </td>
                      <td className="p-4 text-gray-700">
                        {formatDate(client.dueDate)}
                      </td>
                      <td className="p-4">
                        <span className={getStatusClass(status)}>
                          {status}
                        </span>
                      </td>
                      <td className="p-4">
                        <Link
                          to={`/admin/edit-client/${client.id}`}
                          className="text-brand-green-dark hover:underline font-medium"
                        >
                          View / Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
