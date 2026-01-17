import { motion } from "framer-motion";
import { Calendar, DollarSign, Users, CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface Project {
  id: string;
  title: string;
  description: string | null;
  budget: number | null;
  deadline: string | null;
  complexity: number;
  status: string;
  created_at: string;
}

interface ProjectCardProps {
  project: Project;
  variant?: "freelancer" | "client";
  onAction?: (projectId: string, action: string) => void;
}

const statusConfig = {
  draft: { label: "Draft", color: "bg-muted text-muted-foreground", icon: Clock },
  open: { label: "Open", color: "bg-accent/10 text-accent", icon: Users },
  in_progress: { label: "In Progress", color: "bg-gold/10 text-gold-foreground", icon: Clock },
  completed: { label: "Completed", color: "bg-score-excellent/10 text-score-excellent", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-destructive/10 text-destructive", icon: XCircle },
};

const complexityLabels = ["", "Simple", "Easy", "Medium", "Complex", "Expert"];

export const ProjectCard = ({ project, variant = "freelancer", onAction }: ProjectCardProps) => {
  const status = statusConfig[project.status as keyof typeof statusConfig] || statusConfig.draft;
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-xl border border-border p-6 hover:border-accent/30 transition-all duration-300 hover:shadow-md"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-display text-lg font-semibold text-foreground mb-1">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description || "No description provided"}
          </p>
        </div>
        <Badge className={`${status.color} ml-4 flex items-center gap-1`}>
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </Badge>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        {project.budget && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span>${project.budget.toLocaleString()}</span>
          </div>
        )}
        {project.deadline && (
          <div className="flex items-center gap-1 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(project.deadline), "MMM d, yyyy")}</span>
          </div>
        )}
        <div className="flex items-center gap-1 text-muted-foreground">
          <span>Complexity:</span>
          <span className="font-medium text-foreground">
            {complexityLabels[project.complexity]}
          </span>
        </div>
      </div>

      {variant === "client" && onAction && (
        <div className="flex gap-2 pt-4 border-t border-border">
          {project.status === "draft" && (
            <>
              <Button 
                size="sm" 
                onClick={() => onAction(project.id, "publish")}
              >
                Publish Project
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onAction(project.id, "edit")}
              >
                Edit
              </Button>
            </>
          )}
          {project.status === "open" && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onAction(project.id, "view-applicants")}
            >
              View Applicants
            </Button>
          )}
          {project.status === "in_progress" && (
            <Button 
              size="sm"
              onClick={() => onAction(project.id, "view-submissions")}
            >
              View Submissions
            </Button>
          )}
        </div>
      )}

      {variant === "freelancer" && onAction && (
        <div className="flex gap-2 pt-4 border-t border-border">
          <Button 
            size="sm"
            onClick={() => onAction(project.id, "view")}
          >
            View Details
          </Button>
          {project.status === "in_progress" && (
            <Button 
              size="sm" 
              variant="gold"
              onClick={() => onAction(project.id, "submit-work")}
            >
              Submit Work
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
};
