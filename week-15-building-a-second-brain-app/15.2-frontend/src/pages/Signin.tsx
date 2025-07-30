import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
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
      navigate("/dashboard");
    } catch (e: any) {
      if (e.response?.status === 401) {
        setAuthError("Invalid username or password");
      } else {
        alert(e.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="bg-white px-10 py-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Sign in to your account
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
              type="password"
              placeholder="Password"
            />
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
