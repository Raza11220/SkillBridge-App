import { motion } from "framer-motion";
import { Briefcase, Clock, DollarSign, TrendingUp, Users, CheckCircle } from "lucide-react";

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subtext?: string;
  trend?: number;
  delay?: number;
}

const StatCard = ({ icon: Icon, label, value, subtext, trend, delay = 0 }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-card rounded-xl border border-border p-6"
  >
    <div className="flex items-start justify-between">
      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-accent" />
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-sm ${trend >= 0 ? "text-score-excellent" : "text-destructive"}`}>
          <TrendingUp className={`w-4 h-4 ${trend < 0 ? "rotate-180" : ""}`} />
          <span>{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
    <div className="mt-4">
      <p className="text-3xl font-display font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
      {subtext && (
        <p className="text-xs text-muted-foreground mt-2">{subtext}</p>
      )}
    </div>
  </motion.div>
);

interface FreelancerStatsProps {
  totalProjects: number;
  activeProjects: number;
  totalEarnings: number;
  credibilityScore: number;
}

export const FreelancerStats = ({ 
  totalProjects, 
  activeProjects, 
  totalEarnings, 
  credibilityScore 
}: FreelancerStatsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard
      icon={Briefcase}
      label="Total Projects"
      value={totalProjects}
      subtext="Completed projects"
      delay={0}
    />
    <StatCard
      icon={Clock}
      label="Active Projects"
      value={activeProjects}
      subtext="In progress"
      delay={0.1}
    />
    <StatCard
      icon={DollarSign}
      label="Total Earnings"
      value={`$${totalEarnings.toLocaleString()}`}
      trend={12}
      delay={0.2}
    />
    <StatCard
      icon={TrendingUp}
      label="Credibility Score"
      value={credibilityScore}
      subtext="Out of 100"
      trend={5}
      delay={0.3}
    />
  </div>
);

interface ClientStatsProps {
  totalProjects: number;
  activeProjects: number;
  totalSpent: number;
  freelancersHired: number;
}

export const ClientStats = ({ 
  totalProjects, 
  activeProjects, 
  totalSpent, 
  freelancersHired 
}: ClientStatsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <StatCard
      icon={Briefcase}
      label="Total Projects"
      value={totalProjects}
      subtext="Projects created"
      delay={0}
    />
    <StatCard
      icon={Clock}
      label="Active Projects"
      value={activeProjects}
      subtext="In progress"
      delay={0.1}
    />
    <StatCard
      icon={DollarSign}
      label="Total Spent"
      value={`$${totalSpent.toLocaleString()}`}
      delay={0.2}
    />
    <StatCard
      icon={Users}
      label="Freelancers Hired"
      value={freelancersHired}
      delay={0.3}
    />
  </div>
);
