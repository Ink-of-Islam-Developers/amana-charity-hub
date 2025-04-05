
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import FamiliesContent from "@/components/admin/families/FamiliesContent";

const FamiliesPage = () => {
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
      <FamiliesContent />
    </AdminLayout>
  );
};

export default FamiliesPage;
