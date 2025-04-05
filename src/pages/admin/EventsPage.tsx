
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import EventsContent from "@/components/admin/events/EventsContent";

const EventsPage = () => {
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
      <EventsContent />
    </AdminLayout>
  );
};

export default EventsPage;
