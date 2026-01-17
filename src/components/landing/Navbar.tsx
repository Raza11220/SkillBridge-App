import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
            <span className="text-accent-foreground font-display font-bold text-lg">S</span>
          </div>
          <span className="font-display font-bold text-xl text-primary-foreground">
            SkillBridge
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-medium">
            Features
          </Link>
          <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-medium">
            How It Works
          </Link>
          <Link to="/" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm font-medium">
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild variant="gold" size="sm">
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </motion.nav>
  );
};
