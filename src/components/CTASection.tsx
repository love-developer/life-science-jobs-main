import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => (
  <section className="py-28 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary via-[hsl(250,55%,45%)] to-accent" />
    <div className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }}
    />

    <div className="container relative z-10 mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 60 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Ready to Find Your Expert?
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Join thousands of pharmaceutical and biotech companies that trust Vixia to find specialized talent.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/browse">
            <Button size="lg" className="bg-white text-foreground hover:bg-white/90 text-base px-8 rounded-xl shadow-lg">
              Find a Consultant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/join">
            <Button size="lg" variant="outline" className="text-base px-8 border-white/20 text-white hover:bg-white/10 rounded-xl">
              List Your Services
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
