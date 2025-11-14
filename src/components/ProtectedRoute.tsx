// src/components/ProtectedRoute.tsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api";

type Props = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};


type MeResponse = {
  user: {
    userId: string;
    role: "admin" | "user";
  };
};

const ProtectedRoute = ({ children, requireAdmin }: Props) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<MeResponse["user"] | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const res = await api.get<MeResponse>("/auth/me");
        if (!mounted) return;
        setUser(res.data.user);
      } catch {
        if (!mounted) return;
        setUser(null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="p-6">Checking auth...</div>;

  // not logged in
  if (!user) return <Navigate to="/login" replace />;

  // route requires admin but user isn't admin
  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
