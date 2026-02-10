import { PortfolioNavbar } from "@/components/portfolio/PortfolioNavbar";
import { PortfolioHero } from "@/components/portfolio/PortfolioHero";
import { ServicesSection } from "@/components/portfolio/ServicesSection";
import { SkillsRadar } from "@/components/portfolio/SkillsRadar";
import { ProjectShowcase } from "@/components/portfolio/ProjectShowcase";
import { WorkProcess } from "@/components/portfolio/WorkProcess";
import { WhyHireMe } from "@/components/portfolio/WhyHireMe";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { PortfolioFooter } from "@/components/portfolio/PortfolioFooter";

const Index = () => {
  return (
    <div className="min-h-screen">
      <PortfolioNavbar />
      <PortfolioHero />
      <ServicesSection />
      <SkillsRadar />
      <ProjectShowcase />
      <WorkProcess />
      <WhyHireMe />
      <ContactSection />
      <PortfolioFooter />
    </div>
  );
};

export default Index;
