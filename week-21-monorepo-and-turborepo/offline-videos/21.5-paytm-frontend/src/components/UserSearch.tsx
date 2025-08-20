import React, { useEffect, useRef, useState } from "react";
import api from "../api/axios";
import type { User } from "../types";

interface Props {
  onSelect: (user: User) => void;
}

const UserSearch: React.FC<Props> = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [open, setOpen] = useState(false); //
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Search whenever query changes
  useEffect(() => {
    const id = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        setSearched(false);
        return;
      }
      setLoading(true);
      try {
        const { data } = await api.get("/api/v1/user/bulk", {
          params: { q: query },
        });
        setResults(data.users ?? data);
      } catch (err) {
        console.error(err);
        setResults([]);
      }
      setLoading(false);
      setSearched(true);
      setOpen(true);
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  // Fetch all users when input is focused
  const handleFocus = async () => {
    setOpen(true);
    if (!query.trim()) {
      try {
        const { data } = await api.get("/api/v1/user/bulk");
        setResults(data.users ?? data);
        setSearched(true);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="card relative" ref={wrapperRef}>
      <label className="label">Find users</label>
      <input
        className="input mt-2"
        placeholder="Search by name or email"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
      />

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
          {loading && (
            <div className="p-3 text-sm text-slate-500">Searching…</div>
          )}

          {!loading && searched && results.length === 0 && (
            <div className="p-3 text-sm text-red-500">No users found</div>
          )}

          <ul className="divide-y divide-slate-100">
            {results.map((u) => (
              <li
                key={u.id}
                className="flex items-center justify-between p-3 hover:bg-slate-50 cursor-pointer"
              >
                <div>
                  <div className="font-medium">
                    {u.firstName} {u.lastName}
                  </div>
                  <div className="text-xs text-slate-500">{u.email}</div>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    onSelect(u);
                    setOpen(false);
                  }}
                >
                  Send
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
