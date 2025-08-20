import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: "0.95rem",
            fontWeight: 500,
            borderRadius: "0.75rem",
            padding: "12px 18px",
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
          },
          success: {
            style: {
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              color: "white",
              border: "1px solid #16a34a",
            },
            iconTheme: {
              primary: "white",
              secondary: "#22c55e",
            },
            duration: 5000,
          },
          error: {
            style: {
              background: "linear-gradient(135deg, #ef4444, #dc2626)",
              color: "white",
              border: "1px solid #dc2626",
            },
            iconTheme: {
              primary: "white",
              secondary: "#ef4444",
            },
            duration: 5000,
          },
        }}
      />

      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
