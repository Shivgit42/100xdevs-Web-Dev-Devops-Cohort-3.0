import { useState } from "react";

function App() {
  const [balance] = useState(5000);
  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-blue-600">PayApp</h1>
        <div className="flex items-center gap-4">
          <button className="relative">
            🔔
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-200 font-semibold">
            U
          </div>
        </div>
      </nav>

      {/* Balance Card */}
      <div className="p-6">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-lg">Your Balance</p>
            <h2 className="text-4xl font-bold">₹{balance}</h2>
          </div>
          <div className="flex gap-3">
            <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow">
              Add Money
            </button>
            <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow">
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Users */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Send Money</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center bg-white rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full font-semibold">
                  {user.name[0]}
                </div>
                <span className="font-medium">{user.name}</span>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                Send
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-gray-500">No transactions yet.</p>
        </div>
      </div>
    </div>
  );
}

export default App;
