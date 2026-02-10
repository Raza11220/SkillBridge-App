import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Dashboard",
    problem: "Client needed real-time sales analytics but existing tools were too complex and slow.",
    stack: ["React", "TypeScript", "Java", "PostgreSQL"],
    solution: "Built a custom dashboard with real-time charts, inventory tracking, and automated reporting.",
    result: "40% faster data access, 2x increase in team productivity",
    demo: "#",
    github: "#",
  },
  {
    title: "Task Management API",
    problem: "Startup's workflow was scattered across spreadsheets and emails.",
    stack: ["Java", "Spring Boot", "SQL", "REST API"],
    solution: "Designed a clean REST API with role-based access, task assignment, and deadline tracking.",
    result: "Streamlined operations for 200+ users across 3 departments",
    demo: "#",
    github: "#",
  },
  {
    title: "Portfolio Generator",
    problem: "Freelancers spent hours building portfolios instead of doing client work.",
    stack: ["React", "Tailwind CSS", "Python", "Automation"],
    solution: "One-click portfolio builder with customizable templates and auto-deployment.",
    result: "Saved users an average of 8 hours on portfolio creation",
    demo: "#",
    github: "#",
  },
];

export const ProjectShowcase = () => {
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
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:border-accent/30 transition-all duration-500 hover:shadow-lg"
            >
              <div className="p-8 md:p-10">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                  {/* Left: content */}
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

                  {/* Right: tech + actions */}
                  <div className="lg:w-56 shrink-0 flex flex-col gap-4">
                    <div>
                      <span className="text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-2 block">Tech Stack</span>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-secondary text-foreground/70 text-xs font-medium border border-border"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-auto">
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-1" /> Live Demo
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-1" /> Code
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
