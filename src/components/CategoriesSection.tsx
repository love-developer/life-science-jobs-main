import { motion } from "framer-motion";
import { FlaskConical, Shield, Microscope, FileCheck, Pill, Dna, HeartPulse, Factory, ClipboardList, FolderKanban, Beaker, Stethoscope, CheckSquare, Rocket, Briefcase, Users } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { icon: FileCheck, name: "Regulatory Affairs", count: "340+", desc: "FDA, EMA submissions & compliance", color: "from-blue-500/10 to-blue-600/5", iconColor: "text-blue-500" },
  { icon: Shield, name: "Quality Assurance", count: "280+", desc: "GMP, GLP, GDP auditing & systems", color: "from-emerald-500/10 to-emerald-600/5", iconColor: "text-emerald-500" },
  { icon: Microscope, name: "Clinical Development", count: "310+", desc: "Trial design, monitoring & management", color: "from-violet-500/10 to-violet-600/5", iconColor: "text-violet-500" },
  { icon: Pill, name: "Drug Safety", count: "190+", desc: "Pharmacovigilance & risk management", color: "from-rose-500/10 to-rose-600/5", iconColor: "text-rose-500" },
  { icon: Dna, name: "Biotech R&D", count: "250+", desc: "Gene therapy, biologics, cell therapy", color: "from-cyan-500/10 to-cyan-600/5", iconColor: "text-cyan-500" },
  { icon: FlaskConical, name: "CMC / Formulation", count: "210+", desc: "Process development & manufacturing", color: "from-amber-500/10 to-amber-600/5", iconColor: "text-amber-500" },
  { icon: HeartPulse, name: "Medical Affairs", count: "170+", desc: "MSLs, KOL engagement, publications", color: "from-pink-500/10 to-pink-600/5", iconColor: "text-pink-500" },
  { icon: Factory, name: "Manufacturing", count: "220+", desc: "Scale-up, tech transfer, validation", color: "from-slate-500/10 to-slate-600/5", iconColor: "text-slate-500" },
  { icon: ClipboardList, name: "Program Management", count: "150+", desc: "Program leads, portfolio oversight", color: "from-indigo-500/10 to-indigo-600/5", iconColor: "text-indigo-500" },
  { icon: FolderKanban, name: "Project Manager", count: "200+", desc: "Timeline, budget & resource management", color: "from-teal-500/10 to-teal-600/5", iconColor: "text-teal-500" },
  { icon: Beaker, name: "Translational Medicine", count: "130+", desc: "Bench-to-bedside research translation", color: "from-purple-500/10 to-purple-600/5", iconColor: "text-purple-500" },
  { icon: Stethoscope, name: "Clinical Operations", count: "260+", desc: "Site ops, CRO management, enrollment", color: "from-red-500/10 to-red-600/5", iconColor: "text-red-500" },
  { icon: CheckSquare, name: "Quality Control", count: "180+", desc: "Analytical testing, stability, release", color: "from-green-500/10 to-green-600/5", iconColor: "text-green-500" },
  { icon: Rocket, name: "Commercial / NPP", count: "140+", desc: "Launch strategy, new product planning", color: "from-orange-500/10 to-orange-600/5", iconColor: "text-orange-500" },
  { icon: Briefcase, name: "Business Development", count: "160+", desc: "Partnerships, licensing & deal strategy", color: "from-sky-500/10 to-sky-600/5", iconColor: "text-sky-500" },
  { icon: Users, name: "Patient Advocacy", count: "120+", desc: "Patient engagement, access & outreach", color: "from-fuchsia-500/10 to-fuchsia-600/5", iconColor: "text-fuchsia-500" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 18 },
  },
};

const CategoriesSection = () => (
  <section id="categories" className="py-28 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-medium text-xs uppercase tracking-widest">Areas of Expertise</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
          Specialized Consultants for Every Need
        </h2>
        <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
          Browse consultants across the full pharmaceutical and biotech value chain.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {categories.map((cat) => (
          <motion.div key={cat.name} variants={cardVariants}>
            <Link
              to="/browse"
              className="group block p-5 rounded-2xl border border-border bg-card hover:border-primary/30 hover-lift transition-all duration-300"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3.5`}>
                <cat.icon className={`h-5 w-5 ${cat.iconColor}`} strokeWidth={1.8} />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-1">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mb-2.5 leading-relaxed">{cat.desc}</p>
              <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                {cat.count} consultants →
              </span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default CategoriesSection;
