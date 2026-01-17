import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-display font-bold text-lg">S</span>
              </div>
              <span className="font-display font-bold text-xl">SkillBridge</span>
            </Link>
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Building trust through verified work history. The smart way to evaluate freelancer credibility.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Features</Link></li>
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">How It Works</Link></li>
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Pricing</Link></li>
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">API Docs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">About</Link></li>
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Blog</Link></li>
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Careers</Link></li>
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2024 SkillBridge. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <a href="#" className="hover:text-primary-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-primary-foreground transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
