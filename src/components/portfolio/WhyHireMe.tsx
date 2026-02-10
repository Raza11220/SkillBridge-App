import { motion } from "framer-motion";
import { Code2, Zap, TrendingUp, MessageCircle } from "lucide-react";

const reasons = [
  { icon: Code2, title: "Clean Code", description: "Readable, maintainable, and well-documented. Future devs will thank you." },
  { icon: Zap, title: "Fast Delivery", description: "Tight deadlines don't scare me. I ship quality on schedule, every time." },
  { icon: TrendingUp, title: "Scalable Solutions", description: "Architecture designed to grow with your business, not against it." },
  { icon: MessageCircle, title: "Client-Focused", description: "Proactive communication with regular updates. No surprises, no ghosting." },
];

export const WhyHireMe = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-3 block">Why Me</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why <span className="text-gradient">Hire Me?</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex gap-5 p-6 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                <r.icon className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-1">{r.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{r.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
