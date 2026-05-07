import Card from "../../components/Card";
import DashboardLayout from "../../layouts/DashBoardLayout";

export default function InstitutionDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-4">Institution Overview</h1>

      <Card>
        <p>Batch A</p>
        <p className="text-sm text-gray-500">
          Attendance: 85%
        </p>
      </Card>
    </DashboardLayout>
  );
}