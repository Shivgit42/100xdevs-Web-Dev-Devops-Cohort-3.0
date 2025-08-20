import React from "react";

const BalanceCard: React.FC<{ amount: string | number }> = ({ amount }) => {
  return (
    <div className="card">
      <div className="text-slate-500">Available Balance</div>
      <div className="mt-2 text-4xl font-extrabold tracking-tight">
        ₹{Number(amount).toLocaleString("en-IN")}
      </div>
      <div className="mt-2 text-xs text-slate-500">
        Instant transfers • No fees
      </div>
    </div>
  );
};

export default BalanceCard;
