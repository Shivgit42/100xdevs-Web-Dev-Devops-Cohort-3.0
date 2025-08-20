import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import BalanceCard from "../components/BalanceCard";
import UserSearch from "../components/UserSearch";
import TransferDialog from "../components/TransferDialog";
import { useAuth } from "../hooks/useAuth";
import api from "../api/axios";
import type { User } from "../types";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [balance, setBalance] = useState("0");
  const [toUser, setToUser] = useState<User | null>(null);

  const loadBalance = async () => {
    const { data } = await api.get("/api/v1/account/balance");
    setBalance(String(data.balance ?? "0"));
  };

  useEffect(() => {
    loadBalance();
  }, []);

  return (
    <>
      <AppBar />
      <main className="mx-auto max-w-6xl p-4 md:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            Hi {user?.firstName}! 👋
          </h2>
          <p className="text-slate-500">Send & receive money instantly.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <BalanceCard amount={balance} />
          </div>
          <div className="md:col-span-2">
            <UserSearch onSelect={(u) => setToUser(u)} />
          </div>
        </div>

        {toUser && (
          <TransferDialog
            toUserId={toUser.id}
            toUserName={`${toUser.firstName} ${toUser.lastName}`}
            onClose={() => setToUser(null)}
            onSuccess={loadBalance}
          />
        )}
      </main>
    </>
  );
};

export default Dashboard;
