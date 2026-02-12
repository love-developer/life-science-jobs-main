import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-soft"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">Vx</span>
          </div>
          <span className="font-semibold text-xl tracking-tight text-foreground">
            Vix<span className="text-primary">ia</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/browse" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Find Consultants
          </Link>
          <a href="#categories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Expertise
          </a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Log In
          </Button>
          <Link to="/join">
            <Button size="sm" className="shadow-glow">
              Get Started
            </Button>
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <Link to="/browse" className="block text-sm text-muted-foreground hover:text-foreground">
            Find Consultants
          </Link>
          <a href="#categories" className="block text-sm text-muted-foreground hover:text-foreground">
            Expertise
          </a>
          <a href="#how-it-works" className="block text-sm text-muted-foreground hover:text-foreground">
            How It Works
          </a>
          <a href="#pricing" className="block text-sm text-muted-foreground hover:text-foreground">
            Pricing
          </a>
          <Link to="/dashboard" className="block text-sm text-muted-foreground hover:text-foreground">
            Dashboard
          </Link>
          <div className="flex gap-2 pt-3 border-t border-border">
            <Button variant="ghost" size="sm" className="flex-1">
              Log In
            </Button>
            <Link to="/join" className="flex-1">
              <Button size="sm" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
