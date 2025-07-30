import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;

    if (!username.trim()) {
      setUsernameError("Username cannot be empty");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const signup = async () => {
    if (!validate()) return;

    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, { username, password });
      alert("You have signed up");
      navigate("/signin");
    } catch (e: any) {
      alert(e.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-200 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create your account
        </h2>

        <div className="space-y-4">
          <div>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            {usernameError && (
              <p className="text-red-500 text-sm mt-1">{usernameError}</p>
            )}
          </div>
          <div>
            <Input
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                if (e.target.value.length > 0 && e.target.value.length < 6) {
                  setPasswordError("Password must be at least 6 characters");
                } else {
                  setPasswordError("");
                }
              }}
              placeholder="Password"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={signup}
            variant="primary"
            text="Sign up"
            fullWidth={true}
            loading={false}
          />
        </div>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already signed up?{" "}
          <Link
            to="/signin"
            className="text-indigo-600 hover:text-indigo-800 font-medium transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
