import { motion, useScroll, useTransform } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useRef } from "react";
import AnimatedCounter from "@/components/AnimatedCounter";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const tags = ["Regulatory Affairs", "Quality Assurance", "Clinical Trials", "Drug Safety"];

  return (
    <section ref={sectionRef} className="relative min-h-[92vh] flex items-center overflow-hidden bg-foreground">
      {/* Abstract gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(234,62%,20%)] via-[hsl(250,50%,15%)] to-[hsl(270,40%,12%)]" />
        <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div style={{ opacity }} className="container relative z-10 mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-8 border border-white/10 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            The #1 Life Sciences Talent Network
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          >
            Find Expert Pharma &{" "}
            <span className="text-gradient bg-gradient-to-r from-[hsl(234,70%,70%)] to-[hsl(270,60%,70%)] bg-clip-text text-transparent">
              Biotech
            </span>{" "}
            Consultants
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-white/50 mb-10 max-w-xl leading-relaxed"
          >
            Connect with vetted freelance consultants across regulatory affairs, clinical development, quality assurance, and more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 transition-colors group-focus-within:text-white/60" />
              <Input
                placeholder="Search by expertise, e.g. 'GMP Auditing'"
                className="pl-11 h-13 bg-white/[0.07] border-white/10 text-white placeholder:text-white/30 focus:bg-white/[0.1] focus:border-white/20 transition-all rounded-xl"
              />
            </div>
            <Link to="/browse">
              <Button size="lg" className="h-13 px-8 py-[10px] rounded-xl shadow-glow">
                Search <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-wrap gap-2"
          >
            {tags.map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + i * 0.08, duration: 0.3 }}
              >
                <Link
                  to="/browse"
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.06] text-white/50 text-xs border border-white/[0.08] hover:bg-white/[0.1] hover:text-white/70 transition-all duration-200"
                >
                  {tag}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="mt-20 flex items-center gap-10 flex-wrap"
        >
          <AnimatedCounter target="2,500+" label="Verified Consultants" />
          <div className="w-px h-10 bg-white/10 hidden sm:block" />
          <AnimatedCounter target="98%" label="Client Satisfaction" />
          <div className="w-px h-10 bg-white/10 hidden sm:block" />
          <AnimatedCounter target="45+" label="Specializations" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
