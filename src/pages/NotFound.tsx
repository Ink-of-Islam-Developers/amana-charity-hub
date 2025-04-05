
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-amana-primary mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't seem to exist. It might have been moved or deleted.
        </p>
        <Link to="/">
          <Button className="bg-amana-primary hover:bg-amana-dark">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
