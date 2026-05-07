import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



import TrainerDashboard from "../pages/trainer/TrainerDashboard";
import CreateSession from "../pages/trainer/CreateSession";
import InviteLink from "../pages/trainer/InviteLink";

import InstitutionDashboard from "../pages/institution/InstitutionDashboard";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import MonitoringDashboard from "../pages/monitoring/MonitoringDashboard";

// Role → Route helper
import { getDashboardRoute } from "../utils/roleRoutes";
import StudentDashboard from "../pages/student/StudentsDashboard";
import type { JSX } from "react";
import CreateBatch from "../pages/trainer/CreateBatch";
import CreateInstitutionBatch from "../pages/trainer/CreateBatch";
import ClerkLogin from "../pages/auth/ClerkLogin";
import Register from "../pages/auth/Register";

import { useUser } from "@clerk/react";
import JoinBatch from "../pages/student/JoinBatch";

const ProtectedRoute = ({
  children,
  allowedRole,
}: {
  children: JSX.Element;
  allowedRole?: string;
}) => {
  const { user } = useAuth(); // your backend user
  const { isSignedIn, isLoaded } = useUser(); // Clerk user

  // ⏳ Wait until Clerk loads
  if (!isLoaded) return <div>Loading...</div>;

  // ❌ Not signed in (Clerk)
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Signed in but NOT registered in DB
  if (!user) {
    return <Navigate to="/register" replace />;
  }

  // ❌ Role restriction
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={getDashboardRoute(user.role)} replace />;
  }

  return children;
};

// 🔁 Root Redirect (after login)
const RootRedirect = () => {
  const { user } = useAuth();
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <div>Loading...</div>;

  if (!isSignedIn) return <Navigate to="/login" replace />;

  if (!user) return <Navigate to="/register" replace />;

  return <Navigate to={getDashboardRoute(user.role)} replace />;
};

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root */}
        <Route path="/" element={<RootRedirect />} />

        {/* Auth */}

        <Route path="/login" element={<ClerkLogin />} />

        <Route path="/register" element={<Register />} />


        {/* 🧑‍🎓 Student */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/batches/:id/join"
          element={
            <ProtectedRoute allowedRole="student">
              <JoinBatch />
            </ProtectedRoute>
          }
        />

       

        {/* 👨‍🏫 Trainer (Nested Routes) */}
        <Route
          path="/trainer"
          element={
            <ProtectedRoute allowedRole="trainer">
              <TrainerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trainer/create"
          element={
            <ProtectedRoute allowedRole="trainer">
              <CreateSession />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trainer/create-batch"
          element={
            <ProtectedRoute allowedRole="trainer">
              <CreateBatch />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trainer/invite"
          element={
            <ProtectedRoute allowedRole="trainer">
              <InviteLink />
            </ProtectedRoute>
          }
        />

        {/* 🏫 Institution */}
        <Route
          path="/institution"
          element={
            <ProtectedRoute allowedRole="institution">
              <InstitutionDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/institution/create-batch"
          element={
            <ProtectedRoute allowedRole="institution">
              <CreateInstitutionBatch />
            </ProtectedRoute>
          }
        />

        {/* 📊 Programme Manager */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute allowedRole="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* 👁️ Monitoring Officer */}
        <Route
          path="/monitoring"
          element={
            <ProtectedRoute allowedRole="monitoring">
              <MonitoringDashboard />
            </ProtectedRoute>
          }
        />

        {/* ❌ Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}