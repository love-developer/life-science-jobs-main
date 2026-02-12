import { Link } from "react-router-dom";
import { Linkedin, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold text-sm">Vx</span>
            </div>
            <span className="font-semibold text-lg tracking-tight">Vixia</span>
          </div>
          <p className="text-sm text-background/40 leading-relaxed">
            The premier marketplace connecting pharmaceutical, biotech, and life sciences professionals with top talent.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm text-background/80">For Clients</h4>
          <ul className="space-y-2.5 text-sm text-background/40">
            <li><Link to="/browse" className="hover:text-background transition-colors">Find Consultants</Link></li>
            <li><a href="#" className="hover:text-background transition-colors">Post a Project</a></li>
            <li><a href="#" className="hover:text-background transition-colors">Enterprise Solutions</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm text-background/80">For Consultants</h4>
          <ul className="space-y-2.5 text-sm text-background/40">
            <li><Link to="/join" className="hover:text-background transition-colors">Join as Consultant</Link></li>
            <li><a href="#" className="hover:text-background transition-colors">Success Stories</a></li>
            <li><a href="#" className="hover:text-background transition-colors">Resources</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm text-background/80">Company</h4>
          <ul className="space-y-2.5 text-sm text-background/40">
            <li><a href="#" className="hover:text-background transition-colors">About</a></li>
            <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-background transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <a href="#" className="text-background/30 hover:text-background/60 transition-colors" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="#" className="text-background/30 hover:text-background/60 transition-colors" aria-label="X (Twitter)">
            <Twitter className="h-4 w-4" />
          </a>
        </div>
        <p className="text-xs text-background/30">© 2026 Vixia. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
