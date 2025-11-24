import React, { useEffect, useState } from "react";
import { Eye, EyeOff, MonitorCog } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const login = useAuthStore((e) => e.login);
  const user = useAuthStore((e) => e.user);
  const navigate = useNavigate();
  const loginHanlder = async (e) => {
    try {
      e.preventDefault();
      await login(username, password);
    } catch (error) {
      console.log(error);

      setError(
        error.response.data.message || "Invalid username/email or password"
      );
    }
  };
  useEffect(() => {
    console.log("User changed in login:", user);
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo + Brand */}
        
        <div className="text-center mb-8 flex justify-center items-center gap-4">
          <div
            className={`w-10 h-10 bg-linear-to-r from-[#BF092F] to-[#8C00FF] rounded-xl flex items-center justify-center transition-all 
              `}
          >
            <MonitorCog className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-black">PlanHive</h1>
        </div>
        {error && (
          <p className="text-center pb-3" style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* Login Form */}
        <form className="space-y-5" onSubmit={loginHanlder}>
          {/* Username / Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username or Email
            </label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your username or email"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#BF092F] to-[#8C00FF]  text-white py-3 rounded-xl font-semibold shadow-md transition cursor-pointer"
          >
            Login
          </button>
        </form>

        {/* Extra Options */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              className="text-[#BF092F] font-medium cursor-pointer hover:underline"
              to="/register"
            >
              Sign Up
            </Link>
          </p>
          <p className="text-xs text-center pt-3">
          Kindly wait for a short while. The backend service is currently
          starting up and will be ready in approximately 1–2 minutes.
        </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
