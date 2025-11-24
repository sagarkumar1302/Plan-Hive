import React, { useState } from "react";
import { Eye, EyeOff, UserPlus, MonitorCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
// <-- your axios instance
import api from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();

  // Form States
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Avatar Upload Preview
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  // Submit Register Form
  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      return alert("All fieldsd are required!2");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      const fd = new FormData();
      fd.append("firstName", formData.firstName);
      fd.append("lastName", formData.lastName);
      fd.append("username", formData.username);
      fd.append("email", formData.email);
      fd.append("password", formData.password);

      if (avatarFile) {
        fd.append("avatar", avatarFile);
      }

      const res = await api.post("/user/register", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Registration Successful!");

      navigate("/login");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {/* Card */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="text-center mb-8 flex justify-center items-center gap-4">
          <div className="w-10 h-10 bg-linear-to-r from-[#BF092F] to-[#8C00FF] rounded-xl flex items-center justify-center">
            <MonitorCog className="h-6 w-6 text-white" />
          </div>

          <h1 className="text-3xl font-extrabold text-black">PlanHive</h1>
        </div>

        <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
          Create your account
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleRegister}>
          {/* First Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your first name"
            />
          </div>
          {/* Last Name */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your last name"
            />
          </div>

          {/* Username */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Choose a username"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter your email"
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
                name="password"
                value={formData.password}
                onChange={handleChange}
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
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
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

          {/* Avatar Upload */}
          {/* Avatar Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Avatar (optional)
            </label>

            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                setAvatarFile(file);

                // Create preview URL
                const previewUrl = URL.createObjectURL(file);
                setAvatarPreview(previewUrl);

                // Reset input value to allow re-upload of same file
                e.target.value = "";
              }}
              className="mt-1 cursor-pointer bg-amber-50 ml-2 px-2"
            />

            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="avatar preview"
                className="w-20 h-20 mt-2 rounded-xl object-cover border"
              />
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#BF092F] to-[#8C00FF] text-white py-3 rounded-xl font-semibold shadow-md transition cursor-pointer flex items-center justify-center gap-2"
          >
            <UserPlus className="w-5 h-5" /> Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#BF092F] font-medium cursor-pointer hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
