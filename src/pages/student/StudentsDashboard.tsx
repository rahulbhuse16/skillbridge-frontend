import { useEffect, useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/Button";
import DashboardLayout from "../../layouts/DashBoardLayout";
import API from "../../api/axios";
import { getUser } from "../../utils/roleRoutes";

interface SessionType {
  id: string;
  title: string;
  start_time: string;
  end_time: string;
  date: string;
  attended: boolean;
}

export default function StudentDashboard() {
  const user = getUser();

  const [loading, setLoading] = useState(true);

  const [sessions, setSessions] = useState<
    SessionType[]
  >([]);

  const getDashboardData = async () => {
    try {
      const response = await API.get(
        `/student/${user.id}/dashboard`
      );

      setSessions(response.data.data || []);
    } catch (error) {
      console.log("Dashboard API Error", error);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (
    session_id: string
  ) => {
    try {
      await API.post("/attendance/mark", {
        student_id: user.id,
        session_id,
        status: "present",
      });

      getDashboardData();
    } catch (error) {
      console.log("Attendance Error", error);
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
          My Sessions
        </h1>

        <p className="text-sm text-gray-500">
          View your sessions and mark attendance
        </p>
      </div>

      {/* Sessions */}
      {loading ? (
        <p className="text-sm text-gray-500">
          Loading sessions...
        </p>
      ) : sessions.length === 0 ? (
        <div className="bg-white border rounded-xl p-6 text-center text-gray-500">
          No sessions found
        </div>
      ) : (
        <div className="grid gap-4">
          {sessions.map((session) => (
            <Card key={session.id}>
              <div className="flex items-center justify-between">
                {/* Left */}
                <div>
                  <p className="font-semibold text-gray-800">
                    {session.title}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {session.start_time} -{" "}
                    {session.end_time}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {session.date}
                  </p>
                </div>

                {/* Right */}
                <div>
                  {session.attended ? (
                    <span className="px-3 py-2 text-sm rounded-lg bg-green-100 text-green-600">
                      Attended
                    </span>
                  ) : (
                    <Button
                      variant="secondary"
                      onClick={() =>
                        markAttendance(session.id)
                      }
                    >
                      Mark Attendance
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}