import { useEffect, useState } from "react";
import Card from "../../components/Card";
import DashboardLayout from "../../layouts/DashBoardLayout";
import API from "../../api/axios";
import { getUser } from "../../utils/roleRoutes";


interface ISummary{
  total_institutions:number;
  attendance_percentage:number;
  total_students:number;
  total_batches:number
}

export default function ManagerDashboard() {
  const [summary, setSummary] = useState<ISummary>({
    total_institutions: 0,
    attendance_percentage: 0,
    total_students: 0,
    total_batches: 0
  });
  const [loading, setLoading] = useState(false);

  const user=getUser()

  const fetchProgrammeSummary = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        `/programme/${user?.id}/summary`
      );

      setSummary(response.data?.data);
    } catch (error) {
      console.log("Programme Summary Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgrammeSummary();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">
        Programme Summary
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Total Institutions
              </p>

              <h2 className="text-2xl font-bold">
                {summary?.total_institutions || 0}
              </h2>
            </div>
          </Card>

          <Card>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Attendance
              </p>

              <h2 className="text-2xl font-bold">
                {summary?.attendance_percentage || 0}%
              </h2>
            </div>
          </Card>

          <Card>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Total Students
              </p>

              <h2 className="text-2xl font-bold">
                {summary?.total_students || 0}
              </h2>
            </div>
          </Card>

          <Card>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Total Batches
              </p>

              <h2 className="text-2xl font-bold">
                {summary?.total_batches || 0}
              </h2>
            </div>
          </Card>
        </div>
      )}
    </DashboardLayout>
  );
}