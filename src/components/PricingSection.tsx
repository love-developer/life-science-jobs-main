import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/month",
    description: "Perfect for individuals and small teams getting started.",
    features: [
      "Access to verified consultants",
      "Up to 5 consultant connections/month",
      "Basic search & filters",
      "In-app messaging",
      "Email support",
      "Profile bookmarking",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Business",
    price: "$199",
    period: "/month",
    description: "For organizations needing deep expertise at scale.",
    features: [
      "Everything in Starter",
      "Unlimited consultant connections",
      "Advanced search & analytics",
      "Priority matching algorithm",
      "Dedicated account manager",
      "Custom contract templates",
      "Team collaboration tools",
      "API access & integrations",
    ],
    cta: "Contact Sales",
    highlighted: true,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-28 bg-muted/30 overflow-hidden">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <span className="text-primary font-medium text-xs uppercase tracking-widest">Pricing</span>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
          Simple, Transparent Pricing
        </h2>
        <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
          Choose the plan that fits your consulting needs. No hidden fees.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 100 }}
            className={`rounded-2xl p-8 flex flex-col transition-all duration-300 ${
              plan.highlighted
                ? "bg-foreground text-background ring-1 ring-foreground shadow-2xl relative"
                : "bg-card text-card-foreground border border-border shadow-soft hover-lift"
            }`}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-8 text-[11px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <div className="mt-5 flex items-baseline gap-1">
              <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
              <span className={`text-sm ${plan.highlighted ? "text-background/50" : "text-muted-foreground"}`}>
                {plan.period}
              </span>
            </div>
            <p className={`mt-3 text-sm leading-relaxed ${plan.highlighted ? "text-background/60" : "text-muted-foreground"}`}>
              {plan.description}
            </p>
            <ul className="mt-8 space-y-3 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check className={`h-4 w-4 mt-0.5 shrink-0 ${plan.highlighted ? "text-primary" : "text-primary"}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className={`mt-8 w-full rounded-xl ${plan.highlighted ? "shadow-glow" : ""}`}
              variant={plan.highlighted ? "default" : "outline"}
              size="lg"
            >
              {plan.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
