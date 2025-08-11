/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
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

  const signin = async () => {
    if (!validate()) return;

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      toast.success("You have signed in sucessfully!", {
        duration: 3000,
        style: {
          background: "#f0fdf4",
          color: "#166534",
          border: "1px solid #bbf7d0",
        },
      });
      navigate("/dashboard");
    } catch (e: any) {
      if (e.response?.status === 401) {
        setAuthError("Invalid username or password");
      } else {
        toast.error(e.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 to-indigo-200 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Log in to your account
        </h2>

        {authError && (
          <p className="text-red-500 text-sm text-center mb-4">{authError}</p>
        )}

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
            <div className="relative">
              <Input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (e.target.value.length > 0 && e.target.value.length < 6) {
                    setPasswordError("Password must be at least 6 characters");
                  } else {
                    setPasswordError("");
                  }
                }}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="h-10 pr-10"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/4 flex items-center  text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
        </div>

        <div className="pt-6">
          <Button
            onClick={signin}
            variant="primary"
            text="Sign in"
            fullWidth={true}
            loading={false}
          />
        </div>

        <div className="text-center mt-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
