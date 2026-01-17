import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { CredibilityScoreCard } from "@/components/dashboard/CredibilityScoreCard";
import { FreelancerStats, ClientStats } from "@/components/dashboard/StatsCards";
import { ProjectCard } from "@/components/dashboard/ProjectCard";
import { SkillsSection } from "@/components/dashboard/SkillsSection";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface CredibilityScore {
  overall_score: number;
  delivery_score: number;
  quality_score: number;
  consistency_score: number;
  skill_match_score: number;
  total_projects: number;
  on_time_deliveries: number;
}

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

interface Skill {
  id: string;
  name: string;
  category: string | null;
}

interface FreelancerSkill {
  id: string;
  skill_id: string;
  proficiency_level: number;
  skills: Skill;
}

const Dashboard = () => {
  const { user, role, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [credibilityScore, setCredibilityScore] = useState<CredibilityScore | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [userSkills, setUserSkills] = useState<FreelancerSkill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user, role]);

  const fetchDashboardData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch credibility score for freelancers
      if (role === "freelancer") {
        const { data: scoreData } = await supabase
          .from("credibility_scores")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle();

        if (scoreData) {
          setCredibilityScore(scoreData as CredibilityScore);
        }

        // Fetch assigned projects
        const { data: assignmentsData } = await supabase
          .from("project_assignments")
          .select("project_id")
          .eq("freelancer_id", user.id);

        if (assignmentsData && assignmentsData.length > 0) {
          const projectIds = assignmentsData.map(a => a.project_id);
          const { data: projectsData } = await supabase
            .from("projects")
            .select("*")
            .in("id", projectIds)
            .order("created_at", { ascending: false })
            .limit(5);

          if (projectsData) {
            setProjects(projectsData as Project[]);
          }
        }

        // Fetch all skills
        const { data: allSkills } = await supabase
          .from("skills")
          .select("*")
          .order("name");

        if (allSkills) {
          setSkills(allSkills as Skill[]);
        }

        // Fetch user's skills
        await fetchUserSkills();
      } else if (role === "client") {
        // Fetch client's projects
        const { data: projectsData } = await supabase
          .from("projects")
          .select("*")
          .eq("client_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5);

        if (projectsData) {
          setProjects(projectsData as Project[]);
        }
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserSkills = async () => {
    if (!user) return;

    const { data: userSkillsData } = await supabase
      .from("freelancer_skills")
      .select(`
        id,
        skill_id,
        proficiency_level,
        skills (
          id,
          name,
          category
        )
      `)
      .eq("user_id", user.id);

    if (userSkillsData) {
      setUserSkills(userSkillsData as unknown as FreelancerSkill[]);
    }
  };

  const handleProjectAction = (projectId: string, action: string) => {
    console.log("Project action:", projectId, action);
    // TODO: Implement project actions
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-bold text-foreground">
              Welcome back, {profile?.full_name?.split(" ")[0] || "User"}!
            </h1>
            <p className="text-muted-foreground mt-1">
              {role === "freelancer" 
                ? "Here's an overview of your credibility and projects."
                : "Manage your projects and find talented freelancers."}
            </p>
          </motion.div>

          {/* Stats */}
          {role === "freelancer" ? (
            <FreelancerStats
              totalProjects={credibilityScore?.total_projects || 0}
              activeProjects={projects.filter(p => p.status === "in_progress").length}
              totalEarnings={0}
              credibilityScore={Math.round(Number(credibilityScore?.overall_score) || 50)}
            />
          ) : (
            <ClientStats
              totalProjects={projects.length}
              activeProjects={projects.filter(p => p.status === "in_progress").length}
              totalSpent={0}
              freelancersHired={0}
            />
          )}

          {/* Main content grid */}
          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            {/* Left column - main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Credibility Score for freelancers */}
              {role === "freelancer" && (
                <CredibilityScoreCard score={credibilityScore} />
              )}

              {/* Recent Projects */}
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  {role === "freelancer" ? "Your Projects" : "Your Projects"}
                </h2>
                {projects.length === 0 ? (
                  <div className="bg-card rounded-2xl border border-border p-8 text-center">
                    <p className="text-muted-foreground">
                      {role === "freelancer"
                        ? "No projects assigned yet. Browse available jobs to get started."
                        : "No projects yet. Create your first project to find talented freelancers."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        variant={role === "client" ? "client" : "freelancer"}
                        onAction={handleProjectAction}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right column - sidebar content */}
            <div className="space-y-8">
              {/* Skills section for freelancers */}
              {role === "freelancer" && user && (
                <SkillsSection
                  userSkills={userSkills}
                  allSkills={skills}
                  userId={user.id}
                  onSkillsUpdate={fetchUserSkills}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
