import {
  ChevronDown,
  Cross,
  Home,
  MonitorCog,
  Settings,
  ShoppingBag,
  Users,
  X,
  Zap,
} from "lucide-react";
import React, { useState } from "react";
import logo from "../../assets/image/avatar.gif";
const menu = [
  {
    id: "dashboard",
    icon: Home,
    label: "Dashboard",
    // active: "dashboard",
  },
  {
    id: "users",
    icon: Users,
    label: "Users",
    count: "2.4k",
    submenu: [
      { id: "all-users", label: "All Users" },
      { id: "roles", label: "Roles & Permissions" },
      { id: "activity", label: "User Activity" },
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingBag,
    label: "E-commerce",
    submenu: [
      { id: "products", label: "Products" },
      { id: "orders", label: "Orders" },
    ],
  },
  {
    id: "settings",
    icon: Settings,
    label: "Settings",
  },
];

const Sidebar = ({
  collapsed,
  onToggle,
  currentPage,
  onPageChange,
  mobileToggler,
  onMobileToggler,
}) => {
  const [expendedItems, setExpendedItems] = useState(new Set(["analytics"]));
  const toggleExpended = (itemId) => {
    const newExpanded = new Set(expendedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpendedItems(newExpanded);
  };
  return (
    <div
      className={`${
        collapsed ? "w-30" : "w-60 lg:w-72"
      }  transition-all duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col  z-50
      ${
        !mobileToggler
          ? "absolute left-0 right-0 w-full h-screen bg-slate-800/80"
          : " hidden md:flex"
      }`}
    >
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50 flex md:block items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={` h-10 bg-linear-to-r from-[#BF092F] to-[#8C00FF] rounded-xl flex items-center justify-center transition-all ${
              collapsed ? "w-full" : "w-10"
            }`}
          >
            <MonitorCog className="h-6 w-6 text-white" />
          </div>
          {/* Conditional Rendering */}
          {!collapsed && (
            <div className="transition-all">
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                PlanHive
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Admin Panel
              </p>
            </div>
          )}
        </div>
        <div className="block md:hidden">
          <X
            onClick={() => {
              onMobileToggler(!mobileToggler);
            }}
          />
        </div>
      </div>
      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menu.map((item) => (
          <div key={item.id}>
            <button
              className={`w-full flex items-center  p-3 rounded-xl transition-all duration-200 ${
                currentPage === item.id || item.active
                  ? "bg-linear-to-r from-[#BF092F] to-[#8C00FF] text-white shadow-lg shadow-blue-500/10"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
              } ${collapsed ? "justify-center" : "justify-between"}`}
              onClick={() => {
                if (item.submenu) {
                  toggleExpended(item.id);
                } else {
                  onPageChange(item.id);
                  if (!mobileToggler) {
                    onMobileToggler(!mobileToggler);
                  }
                }
              }}
            >
              <div className="flex items-center space-x-3 transition-all">
                <item.icon className="w-5 h-5" />
                {/* Conditional Rendering */}
                <>
                  {!collapsed && (
                    <>
                      <span className="font-medium ml-2">{item.label}</span>
                      {item.count && (
                        <p className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-300 rounded-full dark:text-slate-800">
                          {item.count}
                        </p>
                      )}
                    </>
                  )}
                </>
              </div>
              {!collapsed && item.submenu && (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            {/* Sub Menu */}
            {/* Sub Menu */}
            {!collapsed && item.submenu && expendedItems.has(item.id) && (
              <div className="ml-8 mt-2 space-y-1">
                {item.submenu?.map((menu) => (
                  <button
                    key={menu.id}
                    className={`w-full text-left py-2 px-4 text-base rounded-lg transition-all
          ${
            currentPage === menu.id
              ? "bg-linear-to-r from-[#BF092F] to-[#8C00FF] text-white"
              : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
          }`}
                    onClick={() => {
                      onPageChange(menu.id);
                      if (!mobileToggler) {
                        onMobileToggler(!mobileToggler);
                      }
                    }}
                  >
                    {menu.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      {/* User Profile Section */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <img
              src={logo}
              alt="Avatar Logo"
              className="w-10 h-10 p-1 rounded-full ring-2 ring-[#BF092F]/10"
            />
            <div className="flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate dark:text-white">
                  Endou Mamoru
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  @endou
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
