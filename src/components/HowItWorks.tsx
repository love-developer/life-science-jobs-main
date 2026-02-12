import { motion } from "framer-motion";
import { UserPlus, Search, MessageSquare, Handshake } from "lucide-react";

const steps = [
  { icon: Search, title: "Search Experts", desc: "Browse consultants by specialization, industry experience, and availability." },
  { icon: UserPlus, title: "Review Profiles", desc: "Evaluate credentials, client reviews, and detailed areas of expertise." },
  { icon: MessageSquare, title: "Connect & Discuss", desc: "Message consultants directly to discuss your project scope and requirements." },
  { icon: Handshake, title: "Engage & Deliver", desc: "Agree on terms and start your project with full platform support." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-28 bg-background overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-medium text-xs uppercase tracking-widest">Simple Process</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">How It Works</h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Finding the right life sciences consultant takes just a few steps.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 100 }}
            className="text-center relative group"
          >
            {i < steps.length - 1 && (
              <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-px bg-border" />
            )}
            <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mx-auto mb-4 relative group-hover:bg-primary/12 transition-colors">
              <step.icon className="h-6 w-6 text-primary" strokeWidth={1.8} />
              <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <h3 className="font-semibold text-foreground mb-2 text-sm">{step.title}</h3>
            <p className="text-sm text-muted-foreground max-w-[220px] mx-auto leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
