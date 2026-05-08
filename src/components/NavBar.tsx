import { useClerk } from "@clerk/react";
import { useAuth } from "../context/AuthContext";
import {
  Bell,
  Search,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { getUser } from "../utils/roleRoutes";

export default function Navbar() {
  const { user, setUser } = useAuth();

  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [batchid, setBatchid] = useState("")

  const navigate = useNavigate();
  const { signOut } = useClerk();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  const localStorageUser = getUser()
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const res1 = await API.get(`/${localStorageUser.id}/student-batch`)

      const data = res1.data.data

      const batchId = data?.batch_id

      setBatchid(batchId)

      if (!batchId) return;

      const response = await API.get(
        `${batchId}/notifications`
      );

      setNotifications(response.data.data || []);
    } catch (error) {
      console.log("Notification fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async () => {
    setNotificationOpen(!notificationOpen);

    if (!notificationOpen) {
      fetchNotifications();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    handleNotificationClick()

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const joinBatch = async () => {
    try {
      await API.post(
        `/batches/join`,
        {
          role: "student",
          student_id: user.id,
          id: batchid
        }
      );



      setNotificationOpen(false)
    } catch (error: any) {

    }
  };

  return (
    <div className="h-14 bg-white flex items-center justify-between px-6 shadow-sm">
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
      <div
        className="flex items-center gap-4 relative"
        ref={dropdownRef}
      >
        {/* Notifications */}
        {
          localStorageUser.role === "student" &&

          (<div className="relative">
            <button
              onClick={handleNotificationClick}
              className="p-2 rounded-lg hover:bg-gray-100 transition relative"
            >
              <Bell size={18} className="text-gray-600" />

              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notification Popup */}
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-semibold text-gray-800">
                    Notifications
                  </h2>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {loading ? (
                    <div className="p-4 text-sm text-gray-500">
                      Loading...
                    </div>
                  ) : notifications.length === 0 ? (
                    <div className="p-4 text-sm text-gray-500">
                      No notifications found
                    </div>
                  ) : (
                    notifications.map((item, index) => (
                      <div
                        key={index}
                        className="group bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 mb-3"
                      >
                        {/* Top Section */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>

                              <p className="text-sm sm:text-base font-semibold text-gray-800 break-words">
                                {item.title || "Notification"}
                              </p>
                            </div>

                            {item.message && (
                              <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed break-words">
                                {item.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          {/* Date */}
                          <p className="text-[11px] sm:text-xs text-gray-400">
                            {new Date(item.createdAt).toLocaleString()}
                          </p>

                          {/* Button */}
                          <button
                            onClick={joinBatch}
                            className="
        w-full sm:w-auto
        flex items-center justify-center gap-2
        bg-gradient-to-r from-indigo-600 to-violet-600
        hover:from-indigo-700 hover:to-violet-700
        text-white text-sm font-medium
        px-5 py-2.5
        rounded-xl
        shadow-sm hover:shadow-lg
        active:scale-95
        transition-all duration-200
      "
                          >
                            Accept Invite
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>)}

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

        {/* User Dropdown */}
        {open && (
          <div className="absolute right-0 top-12 w-40 bg-white rounded-xl shadow-lg p-2 z-50">
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