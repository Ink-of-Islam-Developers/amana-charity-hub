
import { ReactNode, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  Home, Users, Calendar, Package, BarChart3, Settings, LogOut, Menu, X, ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("amana-admin");
    navigate("/admin/login");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      {/* Mobile sidebar toggle */}
      <div className="md:hidden bg-amana-dark text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Amana Admin</h1>
        <Button 
          variant="ghost" 
          className="text-white" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} 
        fixed inset-y-0 left-0 transform md:relative md:translate-x-0 
        transition duration-200 ease-in-out z-30 w-64 
        bg-amana-dark text-white md:flex flex-col`}>
        
        <div className="p-4 border-b border-white/10 hidden md:block">
          <h1 className="text-xl font-bold">Amana Admin</h1>
        </div>
        
        <div className="flex-grow p-4 overflow-y-auto">
          <nav className="space-y-2">
            <Link
              to="/admin/dashboard"
              className={`flex items-center px-4 py-2 text-white hover:bg-amana-primary rounded-md ${
                isActive("/admin/dashboard") ? "bg-amana-primary" : ""
              }`}
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link
              to="/admin/families"
              className={`flex items-center px-4 py-2 text-white hover:bg-amana-primary rounded-md ${
                isActive("/admin/families") ? "bg-amana-primary" : ""
              }`}
            >
              <Users className="mr-3 h-5 w-5" />
              Needy Families
            </Link>
            <Link
              to="/admin/events"
              className={`flex items-center px-4 py-2 text-white hover:bg-amana-primary rounded-md ${
                isActive("/admin/events") ? "bg-amana-primary" : ""
              }`}
            >
              <Calendar className="mr-3 h-5 w-5" />
              Events
            </Link>
            <Link
              to="/admin/donations"
              className={`flex items-center px-4 py-2 text-white hover:bg-amana-primary rounded-md ${
                isActive("/admin/donations") ? "bg-amana-primary" : ""
              }`}
            >
              <Package className="mr-3 h-5 w-5" />
              Donations
            </Link>
            <Link
              to="/admin/reports"
              className={`flex items-center px-4 py-2 text-white hover:bg-amana-primary rounded-md ${
                isActive("/admin/reports") ? "bg-amana-primary" : ""
              }`}
            >
              <BarChart3 className="mr-3 h-5 w-5" />
              Reports
            </Link>
            <Link
              to="/admin/settings"
              className={`flex items-center px-4 py-2 text-white hover:bg-amana-primary rounded-md ${
                isActive("/admin/settings") ? "bg-amana-primary" : ""
              }`}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </nav>
        </div>
        
        <div className="p-4 border-t border-white/10 space-y-2">
          <Button
            variant="outline"
            className="flex w-full items-center px-4 py-2 text-white hover:bg-amana-accent rounded-md"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-3 h-5 w-5" />
            Back to Website
          </Button>
          
          <Button 
            variant="ghost" 
            className="flex w-full items-center px-4 py-2 text-white hover:bg-red-600 rounded-md"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
