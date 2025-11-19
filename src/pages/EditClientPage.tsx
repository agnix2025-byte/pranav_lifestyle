// src/pages/EditClientPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../api";

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

const EditCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <h3 className="text-xl font-semibold text-gray-800 p-6 border-b border-gray-200">
      {title}
    </h3>
    <div className="p-6 space-y-4">{children}</div>
  </div>
);

const FormField = ({
  label,
  id,
  ...props
}: {
  label: string;
  id: string;
  [key: string]: any;
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <input
      id={id}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green transition-colors"
      {...props}
    />
  </div>
);

type ClientData = {
  id: string;
  name: string;
  email: string;
  plan: string;
  startDate: string;
  dueDate: string;
  mealPlan: string;
};

type WeightLog = {
  id: string;
  date: string;
  weight: number;
};



const EditClientPage: React.FC = () => {
  const { clientId } = useParams<{ clientId: string }>();

  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [mealPlan, setMealPlan] = useState("");
  const [loadingClient, setLoadingClient] = useState(true);
  const [error, setError] = useState("");

  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [isBillingLoading, setIsBillingLoading] = useState(false);
  const [isPlanLoading, setIsPlanLoading] = useState(false);

  // inside component:
  const [weights, setWeights] = useState<WeightLog[]>([]);
  const [loadingWeights, setLoadingWeights] = useState(true);
  useEffect(() => {
    const fetchClient = async () => {
      if (!clientId) return;
      try {
        setLoadingClient(true);
        const res = await api.get<ClientData>(`/admin/users/${clientId}`);
        setClientData(res.data);
        setMealPlan(res.data.mealPlan || "");
      } catch (err: any) {
        console.error(err);
        setError(
          err.response?.data?.message || "Failed to load client information"
        );
      } finally {
        setLoadingClient(false);
      }
    };

    fetchClient();
  }, [clientId]);


  useEffect(() => {
    const fetchClient = async () => {
      if (!clientId) return;
      try {
        setLoadingClient(true);
        const res = await api.get<ClientData>(`/admin/users/${clientId}`);
        setClientData(res.data);
        setMealPlan(res.data.mealPlan || "");

        // fetch weight logs
        setLoadingWeights(true);
        const logsRes = await api.get<WeightLog[]>(
          `/admin/users/${clientId}/weight-log`
        );
        setWeights(logsRes.data);
      } catch (err: any) {
        console.error(err);
        setError(
          err.response?.data?.message || "Failed to load client information"
        );
      } finally {
        setLoadingClient(false);
        setLoadingWeights(false);
      }
    };

    fetchClient();
  }, [clientId]);


  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientData || !clientId) return;

    try {
      setIsDetailsLoading(true);
      setError("");

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;

      const res = await api.put(`/admin/users/${clientId}`, {
        name,
        email,
        plan: clientData.plan,
        dueDate: clientData.dueDate,
      });

      setClientData((prev) =>
        prev ? { ...prev, name: res.data.user.name, email: res.data.user.email } : prev
      );
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to update client details"
      );
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const handleUpdateBilling = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientData || !clientId) return;

    try {
      setIsBillingLoading(true);
      setError("");

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const due = formData.get("due") as string; // yyyy-mm-dd

      const res = await api.put(`/admin/users/${clientId}`, {
        name: clientData.name,
        email: clientData.email,
        plan: clientData.plan,
        dueDate: due,
      });

      setClientData((prev) =>
        prev ? { ...prev, dueDate: res.data.user.dueDate } : prev
      );
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to update billing info"
      );
    } finally {
      setIsBillingLoading(false);
    }
  };

  const handleUpdatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;

    try {
      setIsPlanLoading(true);
      setError("");

      await api.put(`/admin/users/${clientId}/meal-plan`, {
        mealPlan,
      });
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to update meal plan"
      );
    } finally {
      setIsPlanLoading(false);
    }
  };

  if (loadingClient) {
    return (
      <div className="bg-gray-50 min-h-screen p-8 flex items-center justify-center">
        <div>Loading client...</div>
      </div>
    );
  }

  if (!clientData) {
    return (
      <div className="bg-gray-50 min-h-screen p-8 flex items-center justify-center">
        <div className="text-red-600">{error || "Client not found"}</div>
      </div>
    );
  }

  const dueDateValue = clientData.dueDate
    ? clientData.dueDate.slice(0, 10)
    : "";

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container">
        <div className="mb-8">
          <Link
            to="/admin"
            className="text-brand-green-dark hover:underline mb-2 block transition-colors"
          >
            &larr; Back to All Clients
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Edit Client: {clientData.name}
          </h1>
          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <motion.div
            className="lg:col-span-1 space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <EditCard title="Client Details">
              <form onSubmit={handleSaveDetails} className="space-y-4">
                <FormField
                  label="Full Name"
                  id="name"
                  name="name"
                  defaultValue={clientData.name}
                />
                <FormField
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={clientData.email}
                />
                <button
                  type="submit"
                  className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center
                            ${isDetailsLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-brand-green text-white hover:bg-brand-green-dark hover:-translate-y-0.5 active:scale-95"
                    }`}
                  disabled={isDetailsLoading}
                >
                  {isDetailsLoading ? (
                    <>
                      <Spinner /> Saving...
                    </>
                  ) : (
                    "Save Details"
                  )}
                </button>
              </form>
            </EditCard>

            <EditCard title="Billing">
              <form onSubmit={handleUpdateBilling} className="space-y-4">
                <FormField
                  label="Payment Due Date"
                  id="due"
                  name="due"
                  type="date"
                  defaultValue={dueDateValue}
                />
                <button
                  type="submit"
                  className={`w-full py-2 px-4 font-semibold rounded-lg shadow-md transition-all duration-300 flex items-center justify-center
                            ${isBillingLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-brand-green text-white hover:bg-brand-green-dark hover:-translate-y-0.5 active:scale-95"
                    }`}
                  disabled={isBillingLoading}
                >
                  {isBillingLoading ? (
                    <>
                      <Spinner /> Updating...
                    </>
                  ) : (
                    "Update Billing"
                  )}
                </button>
              </form>
            </EditCard>
          </motion.div>

          {/* Right Column */}
          <motion.div
            className="lg:col-span-2 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <EditCard title="Meal Plan Editor">
              <form onSubmit={handleUpdatePlan} className="space-y-4">
                <textarea
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-green font-mono text-sm"
                  value={mealPlan}
                  onChange={(e) => setMealPlan(e.target.value)}
                />
                <button
                  type="submit"
                  className={`w-full py-3 px-6 text-white font-semibold rounded-lg shadow-md text-lg transition-all duration-300 flex items-center justify-center
                            ${isPlanLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-brand-green hover:bg-brand-green-dark hover:-translate-y-0.5 active:scale-95"
                    }`}
                  disabled={isPlanLoading}
                >
                  {isPlanLoading ? (
                    <>
                      <Spinner /> Updating Plan...
                    </>
                  ) : (
                    "Update Meal Plan"
                  )}
                </button>
              </form>
            </EditCard>

            {/* You can later map real progress data here */}
            <EditCard title="Client Progress">
              {loadingWeights ? (
                <p>Loading weight history...</p>
              ) : weights.length === 0 ? (
                <p className="text-gray-500">
                  No weight logs yet. Ask the client to log from their dashboard.
                </p>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {weights.map((log) => (
                    <li key={log.id} className="py-2 flex justify-between">
                      <span>
                        {new Date(log.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        :
                      </span>
                      <span className="font-medium">{log.weight.toFixed(1)} kg</span>
                    </li>
                  ))}
                </ul>
              )}
            </EditCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default EditClientPage;

