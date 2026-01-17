import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, ArrowLeft, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CreateProject = () => {
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState<Date>();
  const [complexity, setComplexity] = useState("3");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a project.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("projects")
        .insert({
          client_id: user.id,
          title,
          description,
          budget: budget ? parseFloat(budget) : null,
          deadline: deadline?.toISOString() || null,
          complexity: parseInt(complexity),
          status: "draft",
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Project created!",
        description: "Your project has been created as a draft.",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error creating project",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (role !== "client") {
    return (
      <div className="min-h-screen bg-background flex">
        <DashboardSidebar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Only clients can create projects.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Create New Project
            </h1>
            <p className="text-muted-foreground mb-8">
              Define your project details to find the perfect freelancer.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Build a React Dashboard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project requirements, goals, and any specific details..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget (USD)</Label>
                    <Input
                      id="budget"
                      type="number"
                      placeholder="e.g., 5000"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      min="0"
                      step="100"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Deadline</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !deadline && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {deadline ? format(deadline, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={deadline}
                          onSelect={setDeadline}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complexity">Project Complexity</Label>
                  <Select value={complexity} onValueChange={setComplexity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select complexity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Simple - Basic task</SelectItem>
                      <SelectItem value="2">Easy - Straightforward work</SelectItem>
                      <SelectItem value="3">Medium - Standard project</SelectItem>
                      <SelectItem value="4">Complex - Advanced skills needed</SelectItem>
                      <SelectItem value="5">Expert - Highly specialized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  disabled={loading || !title}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Project"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CreateProject;
