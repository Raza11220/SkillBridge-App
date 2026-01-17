import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

interface SkillsSectionProps {
  userSkills: FreelancerSkill[];
  allSkills: Skill[];
  userId: string;
  onSkillsUpdate: () => void;
}

const proficiencyLabels = ["", "Beginner", "Elementary", "Intermediate", "Advanced", "Expert"];

export const SkillsSection = ({ 
  userSkills, 
  allSkills, 
  userId, 
  onSkillsUpdate 
}: SkillsSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(
    new Set(userSkills.map(us => us.skill_id))
  );
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleToggleSkill = (skillId: string) => {
    const newSelected = new Set(selectedSkills);
    if (newSelected.has(skillId)) {
      newSelected.delete(skillId);
    } else {
      newSelected.add(skillId);
    }
    setSelectedSkills(newSelected);
  };

  const handleSaveSkills = async () => {
    setLoading(true);
    try {
      // Get current skill IDs
      const currentSkillIds = new Set(userSkills.map(us => us.skill_id));
      
      // Skills to add
      const toAdd = [...selectedSkills].filter(id => !currentSkillIds.has(id));
      
      // Skills to remove
      const toRemove = [...currentSkillIds].filter(id => !selectedSkills.has(id));

      // Remove skills
      if (toRemove.length > 0) {
        await supabase
          .from("freelancer_skills")
          .delete()
          .eq("user_id", userId)
          .in("skill_id", toRemove);
      }

      // Add new skills
      if (toAdd.length > 0) {
        await supabase
          .from("freelancer_skills")
          .insert(toAdd.map(skillId => ({
            user_id: userId,
            skill_id: skillId,
            proficiency_level: 3,
          })));
      }

      toast({
        title: "Skills updated",
        description: "Your skills have been updated successfully.",
      });
      
      onSkillsUpdate();
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update skills. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveSkill = async (skillId: string) => {
    try {
      await supabase
        .from("freelancer_skills")
        .delete()
        .eq("user_id", userId)
        .eq("skill_id", skillId);

      toast({
        title: "Skill removed",
        description: "The skill has been removed from your profile.",
      });
      
      onSkillsUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove skill. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Group skills by category
  const skillsByCategory = allSkills.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card rounded-2xl border border-border p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold text-foreground">
          Your Skills
        </h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Plus className="w-4 h-4 mr-1" />
              Add Skills
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Manage Your Skills</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="font-semibold text-foreground mb-3">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => {
                      const isSelected = selectedSkills.has(skill.id);
                      return (
                        <button
                          key={skill.id}
                          onClick={() => handleToggleSkill(skill.id)}
                          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                            isSelected
                              ? "bg-accent text-accent-foreground"
                              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 inline mr-1" />}
                          {skill.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveSkills} disabled={loading}>
                {loading ? "Saving..." : "Save Skills"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {userSkills.length === 0 ? (
        <p className="text-muted-foreground">
          Add your skills to help clients find you for relevant projects.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {userSkills.map((userSkill) => (
            <Badge
              key={userSkill.id}
              variant="secondary"
              className="px-3 py-1.5 text-sm flex items-center gap-2 group"
            >
              <span>{userSkill.skills.name}</span>
              <span className="text-xs text-muted-foreground">
                {proficiencyLabels[userSkill.proficiency_level]}
              </span>
              <button
                onClick={() => handleRemoveSkill(userSkill.skill_id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-muted-foreground hover:text-destructive" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </motion.div>
  );
};
