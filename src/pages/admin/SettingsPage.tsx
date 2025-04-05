
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import SettingsContent from "@/components/admin/settings/SettingsContent";

const SettingsPage = () => {
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
      <SettingsContent />
    </AdminLayout>
  );
};

export default SettingsPage;
