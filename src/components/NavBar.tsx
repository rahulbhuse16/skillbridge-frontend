import { useClerk } from "@clerk/react";
import { useAuth } from "../context/AuthContext";
import { Bell, Search, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useClerk();



  const handleLogout = async() => {
    await signOut()
    setUser(null);
    localStorage.clear();
    navigate("/login");
    
  };

  return (
    <div className="h-14 bg-white  flex items-center justify-between px-6 shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg text-indigo-600">
          SkillBridge
        </h1>

        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-1.5 rounded-lg">
          <Search size={16} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell size={18} className="text-gray-600" />
        </button>

        {/* User */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg transition"
          onClick={() => setOpen(!open)}
        >
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
            {user?.name?.charAt(0) || "U"}
          </div>

          {/* Info */}
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-800">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role}
            </p>
          </div>

          <ChevronDown size={16} className="text-gray-500" />
        </div>

        {/* Dropdown */}
        {open && (
          <div className="absolute right-0 top-12 w-40 bg-white rounded-xl shadow-lg p-2">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-lg"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}