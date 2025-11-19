import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Logo + Brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-indigo-600">PlanHive</h1>
          <p className="text-gray-500 text-sm mt-1">Your smart task manager</p>
        </div>

        {/* Login Form */}
        <form className="space-y-5">

          {/* Username / Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Username or Email</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your username or email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold shadow-md transition"
          >
            Login
          </button>

        </form>

        {/* Extra Options */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
