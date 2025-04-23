import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  variants: {
    initial: { opacity: number; y?: number };
    animate: (i: number) => { y: number; opacity: number; transition: any };
    tap: { scale?: number };
  };
  custom?: number;
}

const NavItem = ({ to, icon, label, isActive, variants, custom }: NavItemProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      custom={custom}
      whileTap="tap"
    >
      <Link
        to={to}
        className={cn(
          "flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg transition-colors",
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        {icon}
        <span className="text-xs font-medium tracking-wide">{label}</span>
      </Link>
    </motion.div>
  );
};

export default NavItem;
