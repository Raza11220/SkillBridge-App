import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Complete Projects",
    description: "Freelancers complete work and submit for client verification.",
  },
  {
    number: "02",
    title: "Client Verifies",
    description: "Clients confirm completion, rate delivery time, and verify skills used.",
  },
  {
    number: "03",
    title: "Score Updates",
    description: "Credibility score recalculates based on verified work history.",
  },
  {
    number: "04",
    title: "Build Reputation",
    description: "Consistent performance builds a trusted, verifiable track record.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 px-6 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It <span className="text-gradient-accent">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A transparent, rule-based system that builds credibility through verified work.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl p-8 border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg h-full">
                  <div className="text-5xl font-display font-bold text-accent/20 mb-4">
                    {step.number}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
