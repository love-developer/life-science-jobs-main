import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, BadgeCheck, ArrowLeft, Clock, Globe, Languages, MessageSquare, Calendar, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { consultantsData } from "@/components/FeaturedConsultants";

const ConsultantProfile = () => {
  const { id } = useParams();
  const consultant = consultantsData.find((c) => c.id === Number(id));

  if (!consultant) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Consultant not found</h1>
          <Link to="/browse">
            <Button variant="outline">Back to Browse</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back link */}
          <Link
            to="/browse"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Consultants
          </Link>

          {/* Profile header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-border bg-card p-8 mb-6"
          >
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="w-20 h-20 ring-2 ring-border">
                  {consultant.avatarUrl && (
                    <AvatarImage src={consultant.avatarUrl} alt={consultant.name} />
                  )}
                  <AvatarFallback className="bg-primary/8 font-semibold text-primary text-xl">
                    {consultant.avatar}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-card ${
                    consultant.isOnline ? "bg-emerald-500" : "bg-muted-foreground/30"
                  }`}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-foreground tracking-tight">{consultant.name}</h1>
                  {consultant.verified && (
                    <BadgeCheck className="h-5 w-5 text-primary" />
                  )}
                </div>
                <p className="text-muted-foreground mb-3">{consultant.title}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {consultant.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4" /> {consultant.country}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {consultant.rating} ({consultant.reviews} reviews)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Languages className="h-4 w-4" /> {consultant.languages.join(", ")}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 sm:self-start">
                <div className="text-right">
                  <span className="text-3xl font-bold text-foreground">${consultant.hourlyRate}</span>
                  <span className="text-sm text-muted-foreground">/hr</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <MessageSquare className="h-4 w-4 mr-1.5" /> Message
                  </Button>
                  <Button size="sm" className="rounded-lg shadow-glow">
                    <Calendar className="h-4 w-4 mr-1.5" /> Book Now
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 space-y-6"
            >
              {/* About */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-3">About</h2>
                <p className="text-muted-foreground leading-relaxed">{consultant.bio}</p>
              </div>

              {/* Expertise */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {consultant.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 rounded-lg">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Reviews placeholder */}
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Reviews</h2>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {consultant.rating} · {consultant.reviews} reviews
                  </span>
                </div>
                <div className="space-y-4">
                  {[
                    { author: "VP of Regulatory", text: "Exceptional knowledge of FDA submission processes. Delivered ahead of schedule.", rating: 5 },
                    { author: "Clinical Director", text: "Very thorough and professional. Would highly recommend for complex projects.", rating: 5 },
                    { author: "Quality Manager", text: "Great communication and deep domain expertise. A pleasure to work with.", rating: 4 },
                  ].map((review, i) => (
                    <div key={i} className="border-b border-border last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-sm font-medium text-foreground">{review.author}</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: review.rating }).map((_, j) => (
                            <Star key={j} className="h-3 w-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-sm font-semibold text-foreground mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-muted-foreground">Availability</span>
                      <p className="font-medium text-foreground">
                        {consultant.isOnline ? "Available Now" : "Check Schedule"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-muted-foreground">Projects Completed</span>
                      <p className="font-medium text-foreground">{consultant.reviews}+</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Languages className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-muted-foreground">Languages</span>
                      <p className="font-medium text-foreground">{consultant.languages.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Similar Consultants</h3>
                <div className="space-y-3">
                  {consultantsData
                    .filter((c) => c.id !== consultant.id)
                    .slice(0, 3)
                    .map((c) => (
                      <Link
                        key={c.id}
                        to={`/consultant/${c.id}`}
                        className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary/8 text-primary text-xs font-medium">
                            {c.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{c.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{c.title}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ConsultantProfile;
