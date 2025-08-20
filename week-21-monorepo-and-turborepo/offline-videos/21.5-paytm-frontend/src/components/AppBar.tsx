import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const AppBar: React.FC = () => {
  const { user, signout } = useAuth();
  const loc = useLocation();
  const isActive = (path: string) =>
    loc.pathname === path ? "text-brand-700" : "text-slate-600";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-brand-600 text-white grid place-items-center font-bold">
            ₹
          </div>
          <span className="text-xl font-bold text-slate-800">Wallet</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            className={`hover:text-brand-700 ${isActive("/dashboard")}`}
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className={`hover:text-brand-700 ${isActive("/transactions")}`}
            to="/transactions"
          >
            Transactions
          </Link>
          {user ? (
            <button
              className="btn btn-outline cursor-pointer"
              onClick={signout}
            >
              Sign out
            </button>
          ) : (
            <div className="flex gap-2">
              <Link className="btn btn-outline" to="/signin">
                Sign in
              </Link>
              <Link className="btn btn-primary" to="/signup">
                Create account
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default AppBar;
