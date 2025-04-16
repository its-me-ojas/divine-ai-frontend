
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-divine-gold/20 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-divine-saffron flex items-center justify-center">
            <span className="text-white text-lg font-mukti">ॐ</span>
          </div>
        </div>
        <h1 className="text-xl font-mukti font-bold text-divine-blue dark:text-white">Divine AI</h1>
      </Link>
      
      <Link to="/profile" className="w-9 h-9 rounded-full bg-divine-cream dark:bg-divine-blue flex items-center justify-center shadow-sm border border-divine-lightGold/30 dark:border-divine-gold/20">
        <User size={18} className="text-divine-blue dark:text-white" />
      </Link>
    </header>
  );
};

export default Header;
