import { motion } from "framer-motion";
import { ClipboardList, Palette, Code2, TestTube, Rocket } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Requirement", description: "Deep-dive into your goals, users, and constraints to define a clear scope." },
  { icon: Palette, title: "Design", description: "Wireframes and architecture decisions before a single line of code." },
  { icon: Code2, title: "Development", description: "Clean, tested code with daily progress updates and demos." },
  { icon: TestTube, title: "Testing", description: "Rigorous QA with unit tests, integration tests, and user acceptance." },
  { icon: Rocket, title: "Delivery", description: "Deployed, documented, and handed off with ongoing support." },
];

export const WorkProcess = () => {
  return (
    <section id="process" className="py-24 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">How I Work</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            My <span className="text-gradient-accent">Process</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A transparent, structured workflow that keeps you informed at every stage.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="bg-card rounded-2xl border border-border p-6 hover:border-accent/30 transition-all duration-300 hover:shadow-md h-full flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                    <step.icon className="w-7 h-7 text-accent" />
                  </div>
                  <span className="text-accent/40 font-display font-bold text-xs mb-2">0{i + 1}</span>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
