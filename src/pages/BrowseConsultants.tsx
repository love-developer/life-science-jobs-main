import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Globe, Languages } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ConsultantCard, consultantsData } from "@/components/FeaturedConsultants";

const expertiseFilters = [
  "All", "Regulatory Affairs", "Quality Assurance", "Clinical Development",
  "Drug Safety", "CMC / Formulation", "Medical Affairs", "Manufacturing", "Biotech R&D",
  "Program Management", "Project Manager", "Translational Medicine", "Clinical Operations",
  "Quality Control", "Commercial / NPP", "Biostatistics", "Statistical Programming",
  "Data Management", "Medical Monitoring"
];

const countries = [
  "All", "Australia", "Brazil", "Canada", "China", "Colombia", "Denmark", "European Union",
  "France", "Germany", "India", "Japan", "Mexico", "New Zealand", "Norway", "Russia",
  "Saudi Arabia", "South Korea", "Sweden", "Switzerland", "Taiwan", "UAE",
  "United Kingdom", "United States"
];

const languagesList = [
  "All", "Arabic", "Chinese (Mandarin)", "Chinese (Cantonese)", "Colombian Spanish", "Danish",
  "Dutch", "English", "French", "German", "Hindi", "Italian", "Japanese", "Korean",
  "Malay", "Norwegian", "Portuguese", "Russian", "Spanish", "Swedish", "Tamil", "Thai",
  "Turkish", "Ukrainian", "Urdu"
];

const BrowseConsultants = () => {
  const [search, setSearch] = useState("");
  const [expertise, setExpertise] = useState("All");
  const [country, setCountry] = useState("All");
  const [language, setLanguage] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = useMemo(() => {
    let result = consultantsData;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.title.toLowerCase().includes(q) ||
          c.expertise.some((e) => e.toLowerCase().includes(q)) ||
          c.bio.toLowerCase().includes(q)
      );
    }

    if (expertise !== "All") {
      result = result.filter((c) =>
        c.expertise.some((e) => e.toLowerCase().includes(expertise.toLowerCase())) ||
        c.title.toLowerCase().includes(expertise.toLowerCase())
      );
    }

    if (country !== "All") {
      result = result.filter((c) => c.country === country);
    }

    if (language !== "All") {
      result = result.filter((c) => c.languages.includes(language));
    }

    if (sortBy === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    if (sortBy === "price-low") result = [...result].sort((a, b) => a.hourlyRate - b.hourlyRate);
    if (sortBy === "price-high") result = [...result].sort((a, b) => b.hourlyRate - a.hourlyRate);
    if (sortBy === "reviews") result = [...result].sort((a, b) => b.reviews - a.reviews);

    return result;
  }, [search, expertise, country, language, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">Find Consultants</h1>
            <p className="text-muted-foreground">Browse specialized life sciences professionals</p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, skill, or keyword..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-full md:w-48">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full md:w-48">
                <Languages className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languagesList.map((l) => (
                  <SelectItem key={l} value={l}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Expertise tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {expertiseFilters.map((tag) => (
              <button
                key={tag}
                onClick={() => setExpertise(tag)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors border ${
                  expertise === tag
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="mb-4 text-sm text-muted-foreground">
            {filtered.length} consultant{filtered.length !== 1 ? "s" : ""} found
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c) => (
                <ConsultantCard key={c.id} consultant={c} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No consultants match your search.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setExpertise("All"); setCountry("All"); setLanguage("All"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowseConsultants;
