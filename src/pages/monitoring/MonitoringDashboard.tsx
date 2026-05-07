import Card from "../../components/Card";
import DashboardLayout from "../../layouts/DashBoardLayout";

export default function MonitoringDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-4">
        Monitoring Overview
      </h1>

      <Card>
        <p>Programme Attendance: 80%</p>
        <p className="text-sm text-gray-500">
          Read-only access
        </p>
      </Card>
    </DashboardLayout>
  );
}