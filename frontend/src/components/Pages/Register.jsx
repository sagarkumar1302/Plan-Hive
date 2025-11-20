import React, { useState } from "react";
import { Eye, EyeOff, UserPlus, MonitorCog } from "lucide-react";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Card */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        
        {/* Logo + Brand */}
        <div className="text-center mb-8 flex justify-center items-center gap-4">
          <div className="w-10 h-10 bg-linear-to-r from-[#BF092F] to-[#8C00FF] rounded-xl flex items-center justify-center">
            <MonitorCog className="h-6 w-6 text-white" />
          </div>

          <h1 className="text-3xl font-extrabold text-black">PlanHive</h1>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
          Create your account
        </h2>

        {/* Register Form */}
        <form className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Choose a username"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Create a password"
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

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Re-enter password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#BF092F] to-[#8C00FF] text-white py-3 rounded-xl font-semibold shadow-md transition cursor-pointer flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" /> Register
          </button>
        </form>

        {/* Extra Options */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-[#BF092F] font-medium cursor-pointer hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
