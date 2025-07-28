import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const signin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="bg-white px-10 py-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Sign in to your account
        </h2>
        <div className="space-y-4">
          <Input ref={usernameRef} placeholder="Username" />
          <Input ref={passwordRef} placeholder="Password" />
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
