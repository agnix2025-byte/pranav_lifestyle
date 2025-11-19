// src/pages/AddClientPage.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api";

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

type Client = {
  id: string;
  name: string;
  email: string;
  plan: string;
  startDate: string;
  dueDate: string;
};

const AddClientPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState("3 Day Trial");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [clients, setClients] = useState<Client[]>([]);
  const [listLoading, setListLoading] = useState(true);

  // 👉 Fetch clients on mount
  const fetchClients = async () => {
    try {
      setListLoading(true);
      const res = await api.get<Client[]>("/admin/users");
      setClients(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/admin/users", {
        name,
        email,
        password,
        plan,
        role: "user",
      });

      setSuccess(`Client account created for ${res.data.user.email}`);

      // reset fields
      setName("");
      setEmail("");
      setPassword("");
      setPlan("3 Day Trial");

      // refresh list
      fetchClients();
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to create client account";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
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
    return due < today ? "Payment Due" : "Active";
  };

  return (
    <div className="container py-16 min-h-[70vh] space-y-12">
      {/* Form */}
      <motion.form
        className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-xl shadow-2xl"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Add New Client
        </h2>

        {error && (
          <p className="mb-4 text-red-600 text-sm text-center">{error}</p>
        )}
        {success && (
          <p className="mb-4 text-green-600 text-sm text-center">{success}</p>
        )}

        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Client&apos;s Full Name:
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
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Client&apos;s Email:
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Create Temporary Password:
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label
              htmlFor="plan"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Initial Plan:
            </label>
            <select
              id="plan"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
            >
              <option value="3 Day Trial">3 Day Trial</option>
              <option value="21 Day Challenge">21 Day Challenge</option>
              <option value="Monthly Sustain">Monthly Sustain</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-6 text-white font-semibold rounded-lg shadow-md text-lg 
                        transition-all duration-300 flex items-center justify-center
                        ${
                          isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-brand-green hover:bg-brand-green-dark hover:-translate-y-0.5 active:scale-95"
                        }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner />
                Creating Account...
              </>
            ) : (
              "Create Client Account"
            )}
          </button>
        </div>
      </motion.form>

      {/* Clients table */}
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Clients & Plans</h3>

        {listLoading ? (
          <div className="py-8 text-center">Loading clients...</div>
        ) : clients.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No clients created yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Name</th>
                  <th className="text-left py-2 px-3">Email</th>
                  <th className="text-left py-2 px-3">Plan</th>
                  <th className="text-left py-2 px-3">Start Date</th>
                  <th className="text-left py-2 px-3">Due Date</th>
                  <th className="text-left py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id} className="border-b last:border-0">
                    <td className="py-2 px-3">{c.name}</td>
                    <td className="py-2 px-3">{c.email}</td>
                    <td className="py-2 px-3">{c.plan}</td>
                    <td className="py-2 px-3">{formatDate(c.startDate)}</td>
                    <td className="py-2 px-3">{formatDate(c.dueDate)}</td>
                    <td className="py-2 px-3">
                      <span
                        className={
                          getStatus(c.dueDate) === "Payment Due"
                            ? "text-red-600 font-semibold"
                            : "text-green-600 font-semibold"
                        }
                      >
                        {getStatus(c.dueDate)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddClientPage;
