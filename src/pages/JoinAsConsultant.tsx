import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Loader2, CheckCircle2, AlertCircle, User, MapPin, Briefcase, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  name: string | null;
  title: string | null;
  location: string | null;
  bio: string | null;
  expertise: string[] | null;
  services: string[] | null;
  yearsExperience: number | null;
  industries: string[] | null;
}

const JoinAsConsultant = () => {
  const { toast } = useToast();
  const [profileText, setProfileText] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [extracted, setExtracted] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    name: null,
    title: null,
    location: null,
    bio: null,
    expertise: null,
    services: null,
    yearsExperience: null,
    industries: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Validate required fields
    if (!profile.name || !profile.title || !profile.location) {
      toast({ 
        title: "Missing Information", 
        description: "Please fill in your name, title, and location.", 
        variant: "destructive" 
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would normally save to your database
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({ 
        title: "Application Submitted!", 
        description: "Your consultant application has been received. We'll review it within 48 hours." 
      });
      
      // Reset form
      setProfile({
        name: null,
        title: null,
        location: null,
        bio: null,
        expertise: null,
        services: null,
        yearsExperience: null,
        industries: null,
      });
      setProfileText("");
      setExtracted(false);
      
    } catch (error) {
      toast({ 
        title: "Submission Failed", 
        description: "There was an error submitting your application. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExtract = async () => {
    if (profileText.trim().length < 30) {
      toast({ title: "Too short", description: "Please paste more content from your LinkedIn profile.", variant: "destructive" });
      return;
    }

    setIsExtracting(true);
    setExtracted(false);

    try {
      const { data, error } = await supabase.functions.invoke("extract-linkedin", {
        body: { profileText },
      });

      if (error || !data?.success) {
        toast({
          title: "Extraction failed",
          description: data?.error || error?.message || "Could not extract profile. Try entering details manually.",
          variant: "destructive",
        });
        return;
      }

      setProfile(data.data);
      setExtracted(true);
      toast({ title: "Profile extracted!", description: "We've auto-filled your details from LinkedIn." });
    } catch (err) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Join Vixia as a Consultant
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Copy & paste your LinkedIn profile content to get started quickly, or fill in your details manually.
          </p>
        </motion.div>

        {/* LinkedIn Import */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-card p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Linkedin className="h-5 w-5 text-primary" />
            <h2 className="font-display font-semibold text-foreground">Import from LinkedIn</h2>
            <Badge variant="secondary" className="text-xs ml-auto">
              <Sparkles className="h-3 w-3 mr-1" /> AI-Powered
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            Go to your LinkedIn profile, select all the text (Ctrl+A / Cmd+A), copy it, and paste it below. Our AI will extract your details automatically.
          </p>
          <Textarea
            value={profileText}
            onChange={(e) => setProfileText(e.target.value)}
            placeholder="Paste your LinkedIn profile content here…&#10;&#10;Example: John Doe • Regulatory Affairs Director • Boston, MA&#10;About: 20+ years of experience in…&#10;Experience: Director at Pfizer…&#10;Skills: FDA Submissions, GMP Auditing…"
            rows={6}
            disabled={isExtracting}
            className="mb-3"
          />
          <div className="flex items-center gap-3">
            <Button onClick={handleExtract} disabled={isExtracting || profileText.length < 30}>
              {isExtracting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Extracting…
                </>
              ) : (
                "Extract Profile"
              )}
            </Button>
            {isExtracting && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                Analyzing with AI… This takes a few seconds.
              </span>
            )}
          </div>
        </motion.div>

        {/* Profile Form */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-6 space-y-5"
          >
            {extracted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center gap-2 text-sm text-primary bg-primary/10 rounded-lg px-4 py-2"
              >
                <CheckCircle2 className="h-4 w-4" />
                Profile data imported from LinkedIn. Review and edit below.
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1">
                  <User className="h-3.5 w-3.5" /> Full Name
                </label>
                <Input
                  value={profile.name || ""}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Dr. Jane Smith"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" /> Professional Title
                </label>
                <Input
                  value={profile.title || ""}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  placeholder="Regulatory Affairs Director"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> Location
              </label>
              <Input
                value={profile.location || ""}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                placeholder="Boston, MA"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Bio</label>
              <Textarea
                value={profile.bio || ""}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Brief professional summary…"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Areas of Expertise</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(profile.expertise || []).map((skill, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive/20 hover:text-destructive transition-colors"
                    onClick={() =>
                      setProfile({
                        ...profile,
                        expertise: profile.expertise?.filter((_, idx) => idx !== i) || [],
                      })
                    }
                  >
                    {skill} ×
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Type a skill and press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val) {
                      setProfile({
                        ...profile,
                        expertise: [...(profile.expertise || []), val],
                      });
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Services Offered</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {(profile.services || []).map((svc, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="cursor-pointer hover:bg-destructive/20 hover:text-destructive transition-colors"
                    onClick={() =>
                      setProfile({
                        ...profile,
                        services: profile.services?.filter((_, idx) => idx !== i) || [],
                      })
                    }
                  >
                    {svc} ×
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Type a service and press Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val) {
                      setProfile({
                        ...profile,
                        services: [...(profile.services || []), val],
                      });
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Years of Experience</label>
                <Input
                  type="number"
                  value={profile.yearsExperience ?? ""}
                  onChange={(e) => setProfile({ ...profile, yearsExperience: parseInt(e.target.value) || null })}
                  placeholder="15"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Industries</label>
                <Input
                  value={(profile.industries || []).join(", ")}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      industries: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Pharma, Biotech, Medical Devices"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border flex gap-3">
              <Button 
                className="flex-1" 
                size="lg" 
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Your profile will be reviewed within 48 hours. We'll notify you via email.
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JoinAsConsultant;
