import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/5 to-transparent rounded-full" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8"
        >
          <Zap className="w-4 h-4 text-gold" />
          <span className="text-primary-foreground/90 text-sm font-medium">
            Work Verification Platform
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 leading-tight"
        >
          Build Trust Through
          <br />
          <span className="text-gradient">Verified Work</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          SkillBridge calculates freelancer credibility based on verified completions,
          on-time delivery, and skill relevance—not just reviews.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Button asChild variant="gold" size="xl">
            <Link to="/signup">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-1" />
            </Link>
          </Button>
          <Button asChild variant="heroOutline" size="xl">
            <Link to="/login">
              Sign In
            </Link>
          </Button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 text-primary-foreground/60"
        >
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-gold" />
            <span className="text-sm">10,000+ Freelancers</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            <span className="text-sm">Verified Scores</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-gold" />
            <span className="text-sm">Real-time Updates</span>
          </div>
        </motion.div>

        {/* Floating score card preview */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="glass-card max-w-md mx-auto p-8 rounded-3xl border border-primary-foreground/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center text-accent-foreground font-display font-bold text-xl">
                JD
              </div>
              <div className="text-left">
                <h3 className="text-primary-foreground font-semibold">Jane Doe</h3>
                <p className="text-primary-foreground/60 text-sm">Full Stack Developer</p>
              </div>
            </div>
            
            <div className="bg-primary-foreground/5 rounded-2xl p-6 mb-4">
              <div className="text-center">
                <div className="text-5xl font-display font-bold text-gradient mb-1">94</div>
                <div className="text-primary-foreground/60 text-sm">Credibility Score</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-primary-foreground font-semibold">47</div>
                <div className="text-primary-foreground/50 text-xs">Projects</div>
              </div>
              <div>
                <div className="text-primary-foreground font-semibold">98%</div>
                <div className="text-primary-foreground/50 text-xs">On-Time</div>
              </div>
              <div>
                <div className="text-primary-foreground font-semibold">12</div>
                <div className="text-primary-foreground/50 text-xs">Skills</div>
              </div>
            </div>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 -z-10 blur-3xl opacity-30">
            <div className="w-full h-full bg-gradient-to-r from-accent via-gold to-accent rounded-3xl" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
