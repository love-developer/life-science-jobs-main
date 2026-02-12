import { motion } from "framer-motion";
import { Star, MapPin, BadgeCheck, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

export interface Consultant {
  id: number;
  name: string;
  title: string;
  location: string;
  country: string;
  languages: string[];
  rating: number;
  reviews: number;
  hourlyRate: number;
  expertise: string[];
  bio: string;
  verified: boolean;
  avatar: string;
  avatarUrl?: string;
  isOnline?: boolean;
}

export const consultantsData: Consultant[] = [
  {
    id: 1, name: "Dr. Sarah Chen", title: "Regulatory Affairs Director", location: "Boston, MA",
    country: "United States", languages: ["English", "Mandarin"],
    rating: 4.9, reviews: 47, hourlyRate: 250, verified: true, avatar: "SC", 
    avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face", isOnline: true,
    expertise: ["FDA Submissions", "IND/NDA", "Regulatory Strategy"],
    bio: "20+ years leading regulatory submissions for biologics and small molecules across global markets."
  },
  {
    id: 2, name: "James Okonkwo, PhD", title: "Clinical Operations Lead", location: "London, UK",
    country: "United Kingdom", languages: ["English", "French"],
    rating: 4.8, reviews: 32, hourlyRate: 200, verified: true, avatar: "JO",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    expertise: ["Phase I-III Trials", "Site Management", "Protocol Design"],
    bio: "Former VP Clinical Ops at a top-10 pharma with expertise in oncology and rare disease trials."
  },
  {
    id: 3, name: "Maria Gonzalez", title: "Quality Systems Consultant", location: "Basel, CH",
    country: "Switzerland", languages: ["English", "German", "Spanish"],
    rating: 5.0, reviews: 58, hourlyRate: 275, verified: true, avatar: "MG", isOnline: true,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
    expertise: ["GMP Auditing", "CAPA Systems", "Quality Culture"],
    bio: "Led quality systems at 3 major biotech companies. Specializes in inspection readiness and remediation."
  },
  {
    id: 4, name: "Dr. Raj Patel", title: "Pharmacovigilance Expert", location: "Mumbai, IN",
    country: "India", languages: ["English", "Hindi"],
    rating: 4.7, reviews: 23, hourlyRate: 175, verified: true, avatar: "RP",
    avatarUrl: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
    expertise: ["Signal Detection", "Risk Management", "REMS Programs"],
    bio: "15+ years in drug safety with deep experience in post-marketing surveillance and safety reporting."
  },
  {
    id: 5, name: "Emma Lindström", title: "CMC Development Specialist", location: "Stockholm, SE",
    country: "Sweden", languages: ["English", "Swedish"],
    rating: 4.9, reviews: 41, hourlyRate: 230, verified: true, avatar: "EL", isOnline: true,
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    expertise: ["Process Development", "Tech Transfer", "Biologics"],
    bio: "Expert in upstream/downstream bioprocess development for mAbs and cell & gene therapies."
  },
  {
    id: 6, name: "Dr. Michael Torres", title: "Medical Science Liaison", location: "San Francisco, CA",
    country: "United States", languages: ["English", "Spanish"],
    rating: 4.8, reviews: 29, hourlyRate: 195, verified: true, avatar: "MT",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    expertise: ["KOL Engagement", "Medical Strategy", "Publications"],
    bio: "Seasoned MSL with oncology and immunology expertise across both startup and enterprise pharma."
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, type: "spring" as const, stiffness: 100, damping: 18 },
  }),
};

const ConsultantCard = ({ consultant, index = 0 }: { consultant: Consultant; index?: number }) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  return (
    <>
      <motion.div
        custom={index}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="group rounded-2xl border border-border bg-card p-6 hover-lift transition-all duration-300"
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <Avatar className="w-12 h-12 ring-2 ring-border">
              {consultant.avatarUrl && (
                <AvatarImage src={consultant.avatarUrl} alt={consultant.name} />
              )}
              <AvatarFallback className="bg-primary/8 font-semibold text-primary text-sm">
                {consultant.avatar}
              </AvatarFallback>
            </Avatar>
            <span
              className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${
                consultant.isOnline ? "bg-emerald-500" : "bg-muted-foreground/30"
              }`}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-foreground text-sm truncate">{consultant.name}</h3>
              {consultant.verified && (
                <BadgeCheck className="h-4 w-4 text-primary flex-shrink-0" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{consultant.title}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {consultant.location}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {consultant.rating}
                <span className="text-muted-foreground/60">({consultant.reviews})</span>
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{consultant.bio}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {consultant.expertise.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-[11px] font-normal rounded-md px-2 py-0.5">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="font-bold text-foreground text-lg">${consultant.hourlyRate}</span>
            <span className="text-xs text-muted-foreground">/hr</span>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="rounded-lg text-xs group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
              onClick={() => setIsPaymentModalOpen(true)}
            >
              <CreditCard className="h-3 w-3 mr-1" />
              Hire Now
            </Button>
            <Link to={`/consultant/${consultant.id}`}>
              <Button size="sm" variant="outline" className="rounded-lg text-xs group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                View Profile
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        consultant={consultant}
        projectTitle="New Project"
        estimatedHours={40}
      />
    </>
  );
};

const FeaturedConsultants = () => (
  <section className="py-28 bg-muted/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-end md:justify-between mb-14"
      >
        <div>
          <span className="text-primary font-medium text-xs uppercase tracking-widest">Featured Experts</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 tracking-tight">
            Top-Rated Consultants
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg">
            Vetted industry professionals ready to support your next project.
          </p>
        </div>
        <Link to="/browse">
          <Button variant="outline" className="mt-4 md:mt-0 rounded-lg">
            View All Consultants
          </Button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {consultantsData.slice(0, 6).map((c, i) => (
          <ConsultantCard key={c.id} consultant={c} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturedConsultants;
export { ConsultantCard };
