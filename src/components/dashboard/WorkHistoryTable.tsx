import { motion } from "framer-motion";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface WorkHistoryItem {
  id: string;
  project_id: string;
  submitted_at: string | null;
  verified_at: string | null;
  delivered_on_time: boolean | null;
  quality_rating: number | null;
  status: string;
  submission_notes: string | null;
  projects: {
    title: string;
  };
}

interface WorkHistoryTableProps {
  items: WorkHistoryItem[];
  variant?: "freelancer" | "client";
  onVerify?: (id: string, approved: boolean, rating: number) => void;
}

const statusConfig = {
  pending: { 
    label: "Pending", 
    color: "bg-muted text-muted-foreground", 
    icon: Clock 
  },
  submitted: { 
    label: "Submitted", 
    color: "bg-gold/10 text-gold-foreground", 
    icon: AlertCircle 
  },
  verified: { 
    label: "Verified", 
    color: "bg-score-excellent/10 text-score-excellent", 
    icon: CheckCircle 
  },
  rejected: { 
    label: "Rejected", 
    color: "bg-destructive/10 text-destructive", 
    icon: XCircle 
  },
};

export const WorkHistoryTable = ({ items, variant = "freelancer", onVerify }: WorkHistoryTableProps) => {
  if (items.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 text-center">
        <p className="text-muted-foreground">
          {variant === "freelancer" 
            ? "No work history yet. Complete projects to build your track record."
            : "No work submissions to review."}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-2xl border border-border overflow-hidden"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Submitted</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>On Time</TableHead>
            <TableHead>Quality</TableHead>
            {variant === "client" && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const status = statusConfig[item.status as keyof typeof statusConfig] || statusConfig.pending;
            const StatusIcon = status.icon;

            return (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.projects?.title || "Unknown Project"}
                </TableCell>
                <TableCell>
                  {item.submitted_at 
                    ? format(new Date(item.submitted_at), "MMM d, yyyy")
                    : "-"}
                </TableCell>
                <TableCell>
                  <Badge className={`${status.color} flex items-center gap-1 w-fit`}>
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </Badge>
                </TableCell>
                <TableCell>
                  {item.delivered_on_time === null ? (
                    "-"
                  ) : item.delivered_on_time ? (
                    <CheckCircle className="w-5 h-5 text-score-excellent" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive" />
                  )}
                </TableCell>
                <TableCell>
                  {item.quality_rating ? (
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{item.quality_rating}</span>
                      <span className="text-muted-foreground">/5</span>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
                {variant === "client" && item.status === "submitted" && onVerify && (
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="default"
                        onClick={() => onVerify(item.id, true, 4)}
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onVerify(item.id, false, 0)}
                      >
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </motion.div>
  );
};
