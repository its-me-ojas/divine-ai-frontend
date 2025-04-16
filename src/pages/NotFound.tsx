
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
    <div className="min-h-screen flex items-center justify-center bg-divine-cream/50 dark:bg-divine-blue/95 text-divine-blue dark:text-white p-4">
      <div className="text-center divine-card max-w-md w-full">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-divine-gold/20 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-divine-saffron flex items-center justify-center">
            <span className="text-white text-3xl font-mukti">?</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-mukti font-bold mb-2">404</h1>
        <p className="text-xl font-serif mb-6">This path leads to nowhere</p>
        <p className="text-divine-blue/70 dark:text-white/70 mb-6">The spiritual wisdom you seek cannot be found on this path. Let us guide you back to the right journey.</p>
        
        <Link to="/">
          <Button className="divine-button w-full">
            Return to the Path
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
