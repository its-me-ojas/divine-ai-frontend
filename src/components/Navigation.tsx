
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="w-full border-b transition-theme">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-lg font-semibold hover:text-primary transition-theme">
          Divine AI Sadhana
        </Link>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild className="transition-theme">
            <Link to="/">Home</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
