import {
  Bell,
  ChevronDown,
  Filter,
  LogOut,
  Menu,
  MenuIcon,
  MenuSquare,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import logo from "../../assets/image/avatar.gif";
const Header = ({
  onToggleSidebar,
  onMobileToggler,
  onChangeAddNewTaskModel,
  onPageChange,
}) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4 z-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Desktop Collapsive */}
          <button
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800
        transition-colors cursor-pointer hidden md:block"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </button>
          {/* Mobile Toggler Menu */}
          <button
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800
        transition-colors cursor-pointer block md:hidden"
            onClick={onMobileToggler}
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <div className="hidden md:block">
            <h1 className="text-2xl font-black text-slate-800 dark:text-white">
              Dashboard
            </h1>
            <p className="text-slate-600 dark:text-white">
              Welcome Back, Endou
            </p>
          </div>
        </div>
        {/* <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent transition-all"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 p-1.5 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <Filter />
            </button>
          </div>
        </div> */}
        <div className="flex items-center space-x-3">
          <button
            className="hidden lg:flex items-center space-x-2 py-2 px-4 bg-linear-to-r from-[#BF092F] to-[#8C00FF] text-white rounded-xl hover:shadow-lg translate-all cursor-pointer"
            onClick={onChangeAddNewTaskModel}
          >
            <Plus className="h-4 w-4" />
            <p className="text-sm font-medium">Add New Task</p>
          </button>
          {/* Toggle Theme */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer ml-4"
          >
            {darkMode ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </button>
          {/* Notification */}
          <button className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <Bell className="h-6 w-6 " />
            <span className="absolute top-0 right-0 items-center justify-center px-2 py-1 text-xs leading-none text-red-100 bg-red-600 rounded-full">
              3
            </span>
          </button>
          {/* Setting */}
          <button
            className="hidden md:block p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            onClick={() => {
              onPageChange("settings");
            }}
          >
            <Settings className="w-6 h-6" />
          </button>
          {/* User Profile */}
          <div className="relative" ref={menuRef}>
            {/* Profile Section */}
            <div
              onClick={() => setOpen(!open)}
              className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700 cursor-pointer select-none"
            >
              <img
                src={logo}
                alt="User Profile"
                className="w-8 h-8 rounded-full ring-2 ring-[#BF092F]/20 p-1"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Endou Mamoru
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Administrator
                </p>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            {open && (
              <div className="absolute right-0 mt-3 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden z-5000 animate-fadeIn">
                <button
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  onClick={() => {
                    onPageChange("settings");
                  }}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
