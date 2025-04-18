
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  to: string;
  isActive: boolean;
  index: number;
  variants: {
    initial: any;
    animate: (i: number) => any;
    tap: any;
  };
  icon: React.ReactNode;
  label: string;
  prefersReducedMotion: boolean | null;
}

export const NavItem = ({ 
  to, 
  isActive, 
  index, 
  variants, 
  icon, 
  label,
  prefersReducedMotion 
}: NavItemProps) => (
  <motion.div
    custom={index}
    initial="initial"
    animate="animate"
    variants={variants}
    whileTap="tap"
  >
    <Link to={to} className={`nav-item ${isActive ? "active" : ""}`}>
      <motion.div 
        whileHover={prefersReducedMotion ? {} : { y: -3 }} 
        transition={{ type: "spring", stiffness: 300 }}
      >
        {icon}
        <span className="text-xs mt-1">{label}</span>
      </motion.div>
    </Link>
  </motion.div>
);
