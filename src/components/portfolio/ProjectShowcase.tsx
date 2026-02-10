import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink, Github, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Project {
  title: string;
  problem: string;
  stack: string[];
  solution: string;
  result: string;
  demo: string;
  github: string;
}

export const ProjectShowcase = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Project>({
    title: "", problem: "", stack: [], solution: "", result: "", demo: "", github: "",
  });
  const [stackInput, setStackInput] = useState("");

  const handleAdd = () => {
    if (!form.title || !form.problem) return;
    setProjects([...projects, { ...form, stack: stackInput.split(",").map(s => s.trim()).filter(Boolean) }]);
    setForm({ title: "", problem: "", stack: [], solution: "", result: "", demo: "", github: "" });
    setStackInput("");
    setShowForm(false);
  };

  const handleRemove = (i: number) => setProjects(projects.filter((_, idx) => idx !== i));

  return (
    <section id="projects" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">Portfolio</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real problems, real solutions, real results.
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/30 transition-all duration-500 hover:shadow-lg relative"
            >
              <button onClick={() => handleRemove(i)} className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="p-8 md:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  <div className="flex-1 space-y-5">
                    <h3 className="font-display text-2xl font-bold text-foreground">{project.title}</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <span className="text-destructive font-semibold text-xs uppercase tracking-wider">Problem</span>
                        <p className="text-muted-foreground text-sm">{project.problem}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-accent font-semibold text-xs uppercase tracking-wider">Solution</span>
                        <p className="text-foreground/80 text-sm">{project.solution}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-gold font-semibold text-xs uppercase tracking-wider">Result</span>
                      <p className="text-foreground font-medium text-sm">{project.result}</p>
                    </div>
                  </div>
                  <div className="lg:w-56 shrink-0 flex flex-col gap-4">
                    <div>
                      <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-2 block">Tech Stack</span>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span key={tech} className="px-3 py-1 rounded-full bg-secondary text-foreground/70 text-xs font-medium border border-border">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      {project.demo && project.demo !== "#" && (
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <a href={project.demo} target="_blank" rel="noopener noreferrer"><ExternalLink className="w-4 h-4 mr-1" /> Demo</a>
                        </Button>
                      )}
                      {project.github && project.github !== "#" && (
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <a href={project.github} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4 mr-1" /> Code</a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {projects.length === 0 && !showForm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 border-2 border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground mb-4">No projects yet. Add your first project!</p>
            </motion.div>
          )}

          {showForm && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border border-border p-8 space-y-4">
              <h3 className="font-display text-xl font-bold text-foreground">Add Project</h3>
              <Input placeholder="Project Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <Textarea placeholder="Problem it solved" value={form.problem} onChange={e => setForm({ ...form, problem: e.target.value })} />
              <Input placeholder="Tech Stack (comma-separated)" value={stackInput} onChange={e => setStackInput(e.target.value)} />
              <Textarea placeholder="Solution you built" value={form.solution} onChange={e => setForm({ ...form, solution: e.target.value })} />
              <Input placeholder="Result / Impact" value={form.result} onChange={e => setForm({ ...form, result: e.target.value })} />
              <Input placeholder="Live Demo URL (optional)" value={form.demo} onChange={e => setForm({ ...form, demo: e.target.value })} />
              <Input placeholder="GitHub URL (optional)" value={form.github} onChange={e => setForm({ ...form, github: e.target.value })} />
              <div className="flex gap-3">
                <Button onClick={handleAdd}><Plus className="w-4 h-4 mr-1" /> Add Project</Button>
                <Button onClick={() => setShowForm(false)} variant="outline">Cancel</Button>
              </div>
            </motion.div>
          )}

          {!showForm && (
            <div className="text-center">
              <Button onClick={() => setShowForm(true)} size="lg">
                <Plus className="w-5 h-5 mr-2" /> Add Project
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
