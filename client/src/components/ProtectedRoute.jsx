import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-10 text-center text-slate">Loading…</div>;
  }

  if (!user) {
    // Send them to login and remember where they were headed
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
