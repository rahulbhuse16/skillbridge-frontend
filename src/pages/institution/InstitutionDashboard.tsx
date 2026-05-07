import { useEffect, useState } from "react";
import Card from "../../components/Card";
import DashboardLayout from "../../layouts/DashBoardLayout";
import API from "../../api/axios";
import { getUser } from "../../utils/roleRoutes";

interface Batch{
  batch_id:string;
  batch_name:string;
  attendance_percentage:number;
}

export default function InstitutionDashboard() {
  const [loading, setLoading] = useState(false);
  const [batches, setBatches] = useState<Batch[]>([]);

  const user=getUser()

  const fetchInstitutionSummary = async () => {
    try {
      setLoading(true);

      // replace with actual institution id
      const institutionId = user.id;

      const response = await API.get(
        `/institutions/${institutionId}/summary`
      );

      setBatches(response.data?.batches || []);
    } catch (error) {
      console.log("Institution Summary Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstitutionSummary();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">
        Institution Overview
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : batches.length === 0 ? (
        <p>No batches found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {batches.map((item) => (
            <Card key={item.batch_id}>
              <div className="space-y-2">
                <p className="text-lg font-semibold">
                  {item.batch_name}
                </p>

                <p className="text-sm text-gray-500">
                  Attendance:{" "}
                  {item.attendance_percentage}%
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}