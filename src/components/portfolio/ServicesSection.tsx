import { motion } from "framer-motion";
import { Globe, Server, Database, Layers } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Frontend Development",
    problem: "Your website feels slow, outdated, and loses customers.",
    solution: "Pixel-perfect, lightning-fast UIs with React, TypeScript, and modern CSS that convert visitors into clients.",
  },
  {
    icon: Server,
    title: "Java Backend",
    problem: "Your backend can't scale and breaks under pressure.",
    solution: "Robust, enterprise-grade Java services with clean OOP architecture built for growth and reliability.",
  },
  {
    icon: Database,
    title: "Database Design",
    problem: "Your data is messy, queries are slow, and reports take forever.",
    solution: "Optimized SQL schemas with proper indexing and query design for blazing-fast data operations.",
  },
  {
    icon: Layers,
    title: "Full-Stack Solutions",
    problem: "You need a complete product but hiring multiple devs is expensive.",
    solution: "End-to-end development from frontend to backend, with clean architecture and seamless integration.",
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">What I Do</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Problems I <span className="text-gradient">Solve</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I don't just write code — I solve business problems with elegant technical solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-card rounded-2xl border border-border p-8 hover:border-accent/40 transition-all duration-500 hover:shadow-lg overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">{service.title}</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <span className="text-destructive font-semibold text-xs uppercase tracking-wider mt-1 shrink-0">Problem</span>
                    <p className="text-muted-foreground text-sm">{service.problem}</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-accent font-semibold text-xs uppercase tracking-wider mt-1 shrink-0">Solution</span>
                    <p className="text-foreground/80 text-sm">{service.solution}</p>
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
