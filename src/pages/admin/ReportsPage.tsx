
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import ReportsContent from "@/components/admin/reports/ReportsContent";

const ReportsPage = () => {
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const adminAuth = localStorage.getItem("amana-admin");
    if (!adminAuth || !JSON.parse(adminAuth).isAdmin) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <AdminLayout>
      <ReportsContent />
    </AdminLayout>
  );
};

export default ReportsPage;
