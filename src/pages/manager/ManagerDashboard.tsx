import Card from "../../components/Card";
import DashboardLayout from "../../layouts/DashBoardLayout";

export default function ManagerDashboard() {
  return (
    <DashboardLayout>
      <h1 className="text-xl font-bold mb-4">Programme Summary</h1>

      <div className="grid grid-cols-3 gap-4">
        <Card>Total Institutions: 12</Card>
        <Card>Attendance: 78%</Card>
        <Card>Total Students: 500</Card>
      </div>
    </DashboardLayout>
  );
}