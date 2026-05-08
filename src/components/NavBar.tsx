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
  const[batchid,setBatchid]=useState("")

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
          id : batchid
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
                        className="p-4 border-b hover:bg-gray-50 transition"
                      >
                        <p className="text-sm font-medium text-gray-800">
                          {item.title || "Notification"}
                        </p>

                        <button
                          onClick={joinBatch}
                          className="justify-center  items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition shadow-sm"
                        >
                          Accept Invite
                        </button>

                        <p className="text-[10px] text-gray-400 mt-2">
                          {new Date(
                            item.createdAt
                          ).toLocaleString()}
                        </p>
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