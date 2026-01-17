import { motion } from "framer-motion";
import { CheckCircle, Clock, TrendingUp, Users, Shield, Award } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Verified Work History",
    description: "Every project completion is verified by clients, creating an authentic track record.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery Score",
    description: "Track record of meeting deadlines factored into overall credibility rating.",
  },
  {
    icon: TrendingUp,
    title: "Dynamic Scoring",
    description: "Scores update in real-time based on recent performance and consistency.",
  },
  {
    icon: Users,
    title: "Client Trust Factor",
    description: "Client verification reliability weighted into the scoring algorithm.",
  },
  {
    icon: Shield,
    title: "Skill Verification",
    description: "Skills matched against completed projects for authentic expertise proof.",
  },
  {
    icon: Award,
    title: "Work Consistency",
    description: "Long-term performance patterns that demonstrate reliable professionalism.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            How Credibility is{" "}
            <span className="text-gradient">Calculated</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our rule-based scoring system evaluates multiple factors to create a comprehensive
            credibility score that clients can trust.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
