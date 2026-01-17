import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { WorkHistoryTable } from "@/components/dashboard/WorkHistoryTable";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

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

const VerifyWork = () => {
  const { user, role } = useAuth();
  const { toast } = useToast();
  const [workItems, setWorkItems] = useState<WorkHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && role === "client") {
      fetchWorkHistory();
    }
  }, [user, role]);

  const fetchWorkHistory = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("work_history")
        .select(`
          id,
          project_id,
          submitted_at,
          verified_at,
          delivered_on_time,
          quality_rating,
          status,
          submission_notes,
          projects (
            title
          )
        `)
        .eq("client_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setWorkItems(data as unknown as WorkHistoryItem[]);
    } catch (error) {
      console.error("Error fetching work history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id: string, approved: boolean, rating: number) => {
    try {
      const { error } = await supabase
        .from("work_history")
        .update({
          status: approved ? "verified" : "rejected",
          verified_at: new Date().toISOString(),
          quality_rating: approved ? rating : null,
          delivered_on_time: approved,
        })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: approved ? "Work verified!" : "Work rejected",
        description: approved 
          ? "The freelancer's credibility score will be updated."
          : "The freelancer has been notified.",
      });

      // Trigger credibility score recalculation
      if (approved) {
        await supabase.functions.invoke("calculate-credibility", {
          body: { work_history_id: id },
        });
      }

      fetchWorkHistory();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (role !== "client") {
    return (
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Only clients can verify work.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold text-foreground">
              Verify Work Submissions
            </h1>
            <p className="text-muted-foreground mt-1">
              Review and verify freelancer work to update their credibility scores.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : (
            <WorkHistoryTable
              items={workItems}
              variant="client"
              onVerify={handleVerify}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default VerifyWork;
