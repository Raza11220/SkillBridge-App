import { motion } from "framer-motion";

const skillCategories = [
  {
    category: "Frontend",
    color: "accent",
    skills: [
      { name: "HTML5 / CSS3", level: 95 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "React / TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Responsive Design", level: 94 },
    ],
  },
  {
    category: "Java & Backend",
    color: "gold",
    skills: [
      { name: "Core Java", level: 90 },
      { name: "OOP Principles", level: 92 },
      { name: "DSA", level: 85 },
      { name: "Spring Boot", level: 78 },
      { name: "REST APIs", level: 88 },
    ],
  },
  {
    category: "Database",
    color: "score-good",
    skills: [
      { name: "SQL (MySQL/Postgres)", level: 88 },
      { name: "Database Design", level: 85 },
      { name: "Query Optimization", level: 80 },
      { name: "Data Modeling", level: 82 },
    ],
  },
  {
    category: "Python & Tools",
    color: "score-average",
    skills: [
      { name: "Python Scripting", level: 75 },
      { name: "Automation", level: 78 },
      { name: "Git & CI/CD", level: 85 },
      { name: "Testing", level: 80 },
    ],
  },
];

const getBarColor = (color: string) => {
  const map: Record<string, string> = {
    accent: "bg-accent",
    gold: "bg-gold",
    "score-good": "bg-score-good",
    "score-average": "bg-score-average",
  };
  return map[color] || "bg-accent";
};

const getTrackColor = (color: string) => {
  const map: Record<string, string> = {
    accent: "bg-accent/15",
    gold: "bg-gold/15",
    "score-good": "bg-score-good/15",
    "score-average": "bg-score-average/15",
  };
  return map[color] || "bg-accent/15";
};

export const SkillsRadar = () => {
  return (
    <section id="skills" className="py-24 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">Tech Stack</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Skills & <span className="text-gradient-accent">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Proficiency levels based on real-world project experience and continuous learning.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
              className="bg-card rounded-2xl border border-border p-8"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-6">{cat.category}</h3>
              <div className="space-y-5">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-foreground/80">{skill.name}</span>
                      <span className="text-sm font-semibold text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className={`h-2 rounded-full ${getTrackColor(cat.color)} overflow-hidden`}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: ci * 0.1 + si * 0.08, ease: "easeOut" }}
                        className={`h-full rounded-full ${getBarColor(cat.color)}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
