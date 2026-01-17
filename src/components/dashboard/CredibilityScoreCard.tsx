import { motion } from "framer-motion";
import { TrendingUp, Clock, Star, Award, CheckCircle } from "lucide-react";

interface CredibilityScore {
  overall_score: number;
  delivery_score: number;
  quality_score: number;
  consistency_score: number;
  skill_match_score: number;
  total_projects: number;
  on_time_deliveries: number;
}

interface CredibilityScoreCardProps {
  score: CredibilityScore | null;
}

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-score-excellent";
  if (score >= 75) return "text-score-good";
  if (score >= 50) return "text-score-average";
  if (score >= 25) return "text-score-low";
  return "text-score-poor";
};

const getScoreLabel = (score: number) => {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 50) return "Average";
  if (score >= 25) return "Needs Work";
  return "Getting Started";
};

const ScoreRing = ({ score, size = 180 }: { score: number; size?: number }) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/30"
        />
        {/* Score circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(43 96% 56%)" />
            <stop offset="100%" stopColor="hsl(38 92% 50%)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-display font-bold text-foreground"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {Math.round(score)}
        </motion.span>
        <span className="text-sm text-muted-foreground">{getScoreLabel(score)}</span>
      </div>
    </div>
  );
};

const MetricCard = ({
  icon: Icon,
  label,
  value,
  suffix = "",
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  suffix?: string;
}) => (
  <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50 border border-border">
    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-accent" />
    </div>
    <div>
      <p className="text-2xl font-display font-bold text-foreground">
        {value}{suffix}
      </p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  </div>
);

export const CredibilityScoreCard = ({ score }: CredibilityScoreCardProps) => {
  if (!score) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8">
        <h2 className="font-display text-xl font-semibold text-foreground mb-4">
          Credibility Score
        </h2>
        <p className="text-muted-foreground">
          Complete your first project to start building your credibility score.
        </p>
      </div>
    );
  }

  const onTimeRate = score.total_projects > 0 
    ? Math.round((score.on_time_deliveries / score.total_projects) * 100) 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl border border-border p-8"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Credibility Score
        </h2>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10">
          <TrendingUp className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-accent">Verified</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Main score ring */}
        <div className="flex-shrink-0">
          <ScoreRing score={Number(score.overall_score)} />
        </div>

        {/* Score breakdown */}
        <div className="flex-1 grid grid-cols-2 gap-4 w-full">
          <MetricCard 
            icon={Clock} 
            label="Delivery Score" 
            value={Math.round(Number(score.delivery_score))} 
            suffix="%" 
          />
          <MetricCard 
            icon={Star} 
            label="Quality Score" 
            value={Math.round(Number(score.quality_score))} 
            suffix="%" 
          />
          <MetricCard 
            icon={Award} 
            label="Total Projects" 
            value={score.total_projects} 
          />
          <MetricCard 
            icon={CheckCircle} 
            label="On-Time Rate" 
            value={onTimeRate} 
            suffix="%" 
          />
        </div>
      </div>

      {/* Score explanation */}
      <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
        <h3 className="font-semibold text-foreground mb-2">How is this calculated?</h3>
        <p className="text-sm text-muted-foreground">
          Your credibility score combines delivery performance ({Math.round(Number(score.delivery_score))}%), 
          quality ratings ({Math.round(Number(score.quality_score))}%), work consistency ({Math.round(Number(score.consistency_score))}%), 
          and skill match ({Math.round(Number(score.skill_match_score))}%) from verified project completions.
        </p>
      </div>
    </motion.div>
  );
};
