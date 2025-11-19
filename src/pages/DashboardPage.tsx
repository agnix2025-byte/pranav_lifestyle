// src/pages/DashboardPage.tsx
import React, { useState, useEffect } from "react";
import LogWeightModal from "../components/LogWeightModal";
import { motion } from "framer-motion";
import api from "../api";

const DashboardCard = ({
  title,
  children,
  buttonText,
  onButtonClick,
}: {
  title: string;
  children: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
}) => (
  <motion.div
    className="bg-white rounded-xl shadow-lg p-6"
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 },
    }}
    transition={{ duration: 0.5, ease: "easeOut" }}
  >
    <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="text-gray-600 space-y-2">{children}</div>
    {buttonText && (
      <button
        className="mt-4 px-4 py-2 bg-brand-green text-white rounded-lg text-sm font-medium 
                   hover:bg-brand-green-dark transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    )}
  </motion.div>
);

type MyPlanResponse = {
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

const DashboardPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profile, setProfile] = useState<MyPlanResponse | null>(null);
  const [loadingPlan, setLoadingPlan] = useState(true);
  const [error, setError] = useState("");

  const [weights, setWeights] = useState<WeightLog[]>([]);
  const [loadingWeights, setLoadingWeights] = useState(true);

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const fetchPlan = async () => {
    try {
      setLoadingPlan(true);
      const res = await api.get<MyPlanResponse>("/client/me/plan");
      setProfile(res.data);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to load your plan information"
      );
    } finally {
      setLoadingPlan(false);
    }
  };

  const fetchWeights = async () => {
    try {
      setLoadingWeights(true);
      const res = await api.get<WeightLog[]>("/client/me/weight-log");
      setWeights(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWeights(false);
    }
  };

  useEffect(() => {
    fetchPlan();
    fetchWeights();
  }, []);

  const latestWeight = weights[0];
  const startWeight = weights[weights.length - 1]; // oldest in last 10, approx

  const weightChange =
    latestWeight && startWeight
      ? latestWeight.weight - startWeight.weight
      : null;

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="container">
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {profile ? `Welcome back, ${profile.name}!` : "Welcome back!"}
        </motion.h1>
        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Meal Plan */}
          <DashboardCard title="Today's Meal Plan">
            {loadingPlan ? (
              <p>Loading meal plan...</p>
            ) : profile && profile.mealPlan ? (
              <pre className="whitespace-pre-wrap text-sm">
                {profile.mealPlan}
              </pre>
            ) : (
              <p>No meal plan assigned yet. Please contact your coach.</p>
            )}
          </DashboardCard>

          {/* Progress */}
          <DashboardCard
            title="My Progress"
            buttonText="Log Today's Weight"
            onButtonClick={() => setIsModalOpen(true)}
          >
            {loadingWeights ? (
              <p>Loading weight history...</p>
            ) : weights.length === 0 ? (
              <p>No weight logs yet. Start by logging today&apos;s weight.</p>
            ) : (
              <>
                {startWeight && (
                  <p>
                    <strong>First Logged Weight:</strong>{" "}
                    {startWeight.weight.toFixed(1)} kg (
                    {formatDate(startWeight.date)})
                  </p>
                )}
                {latestWeight && (
                  <p>
                    <strong>Latest Weight:</strong>{" "}
                    {latestWeight.weight.toFixed(1)} kg (
                    {formatDate(latestWeight.date)})
                  </p>
                )}
                {weightChange !== null && (
                  <p
                    className={
                      weightChange < 0
                        ? "font-semibold text-brand-green-dark"
                        : weightChange > 0
                          ? "font-semibold text-red-500"
                          : "font-semibold text-gray-600"
                    }
                  >
                    {weightChange < 0
                      ? `Great! You have lost ${Math.abs(
                        weightChange
                      ).toFixed(1)} kg`
                      : weightChange > 0
                        ? `You gained ${weightChange.toFixed(
                          1
                        )} kg. Stay consistent!`
                        : "Your weight is stable. Keep going!"}
                  </p>
                )}
              </>
            )}
          </DashboardCard>

          {/* Next Session (still mock) */}
          <DashboardCard title="Next Session">
            <p>
              <strong>Topic:</strong> Wellness Talk - Week 2
            </p>
            <p>
              <strong>Date:</strong> Monday, Nov 3rd @ 7:00 PM
            </p>
            <a
              href="#"
              className="mt-2 inline-block text-brand-green-dark font-semibold hover:underline"
            >
              Join Zoom Meeting
            </a>
          </DashboardCard>
        </motion.div>
      </div>

      <LogWeightModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLogged={fetchWeights}   // 👈 call the same function that loads weight logs
      />
    </div>
  );
};

export default DashboardPage;
