import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  Award,
  Settings,
  LogOut,
  Users,
  PlusCircle,
  ClipboardCheck,
  User,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const freelancerNavItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "My Projects", icon: Briefcase, path: "/dashboard/projects" },
  { label: "Credibility", icon: Award, path: "/dashboard/credibility" },
  { label: "Browse Jobs", icon: Users, path: "/dashboard/jobs" },
  { label: "Profile", icon: User, path: "/dashboard/profile" },
];

const clientNavItems: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "My Projects", icon: Briefcase, path: "/dashboard/projects" },
  { label: "Create Project", icon: PlusCircle, path: "/dashboard/create-project" },
  { label: "Verify Work", icon: ClipboardCheck, path: "/dashboard/verify" },
  { label: "Find Talent", icon: Users, path: "/dashboard/talent" },
  { label: "Profile", icon: User, path: "/dashboard/profile" },
];

export const DashboardSidebar = () => {
  const location = useLocation();
  const { role, profile, signOut } = useAuth();

  const navItems = role === "client" ? clientNavItems : freelancerNavItems;

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-card border-r border-border h-screen flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <span className="text-accent-foreground font-display font-bold text-lg">S</span>
          </div>
          <span className="font-display font-bold text-xl text-foreground">
            SkillBridge
          </span>
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-accent font-semibold text-sm">
              {profile?.full_name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {profile?.full_name || "User"}
            </p>
            <p className="text-xs text-muted-foreground capitalize">{role}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Link
          to="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 px-4 text-muted-foreground hover:text-destructive"
          onClick={signOut}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Sign Out</span>
        </Button>
      </div>
    </motion.aside>
  );
};
