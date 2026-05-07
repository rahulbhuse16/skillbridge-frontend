import {
  Calendar,
  Users,
  CheckCircle,
  PlusCircle,
  Link as LinkIcon,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashBoardLayout";
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { getUser } from "../../utils/roleRoutes";

interface SessionType {
  _id: string;
  title: string;
  start_time: string;
  end_time: string;
  date: string;
}

export default function TrainerDashboard() {
  const navigate = useNavigate();
  const user = getUser();

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total_sessions: 0,
    total_students: 0,
    attendance_percentage: 0,
  });

  const [recentSessions, setRecentSessions] = useState<
    SessionType[]
  >([]);

  const getDashboardData = async () => {
    try {
      const response = await API.get(
        `/${user.id}/dashboard`
      );

      setStats(response.data.stats);

      setRecentSessions(
        response.data.recent_sessions || []
      );
    } catch (error) {
      console.log("Dashboard API Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Trainer Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Manage your sessions and batches
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Sessions */}
        <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
            <Calendar size={18} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Sessions
            </p>

            <p className="font-semibold text-lg">
              {stats.total_sessions}
            </p>
          </div>
        </div>

        {/* Students */}
        <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-3">
          <div className="p-2 bg-green-100 text-green-600 rounded-lg">
            <Users size={18} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Students
            </p>

            <p className="font-semibold text-lg">
              {stats.total_students}
            </p>
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-white p-4 rounded-xl border shadow-sm flex items-center gap-3">
          <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
            <CheckCircle size={18} />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Attendance
            </p>

            <p className="font-semibold text-lg">
              {stats.attendance_percentage}%
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate("/trainer/create")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition shadow-sm"
        >
          <PlusCircle size={18} />
          Create Session
        </button>

        <button
          onClick={() => navigate("/trainer/invite")}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition shadow-sm"
        >
          <LinkIcon size={18} />
          Generate Invite
        </button>
      </div>

      {/* Recent Sessions */}
      <div className="bg-white rounded-xl border shadow-sm p-4">
        <h2 className="font-semibold text-gray-800 mb-4">
          Recent Sessions
        </h2>

        {loading ? (
          <p className="text-sm text-gray-500">
            Loading...
          </p>
        ) : recentSessions.length === 0 ? (
          <p className="text-sm text-gray-500">
            No sessions found
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentSessions.map((session) => (
              <div
                key={session._id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {session.title}
                  </p>

                  <p className="text-xs text-gray-500">
                    {session.start_time} -{" "}
                    {session.end_time}
                  </p>
                </div>

                <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded">
                  Active
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}