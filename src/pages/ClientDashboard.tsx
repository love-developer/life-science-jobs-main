import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Calendar, 
  Clock, 
  DollarSign, 
  FileText, 
  Users, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Timer,
  Search,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Project {
  id: string;
  title: string;
  consultant: {
    name: string;
    avatar: string;
    avatarUrl?: string;
  };
  status: "active" | "completed" | "pending" | "on-hold";
  startDate: string;
  endDate?: string;
  budget: number;
  spent: number;
  progress: number;
  description: string;
  nextMilestone?: string;
  priority: "low" | "medium" | "high";
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "FDA Submission Strategy for Biologics",
    consultant: { name: "Dr. Sarah Chen", avatar: "SC", avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    budget: 25000,
    spent: 12500,
    progress: 45,
    description: "Regulatory strategy and submission preparation for new biologic drug",
    nextMilestone: "Pre-IND Meeting - Feb 15",
    priority: "high"
  },
  {
    id: "2", 
    title: "Clinical Trial Protocol Design",
    consultant: { name: "James Okonkwo, PhD", avatar: "JO" },
    status: "active",
    startDate: "2024-02-01",
    endDate: "2024-04-30",
    budget: 18000,
    spent: 6000,
    progress: 30,
    description: "Phase II clinical trial protocol development for oncology drug",
    nextMilestone: "Protocol Finalization - Feb 28",
    priority: "medium"
  },
  {
    id: "3",
    title: "GMP Audit Preparation",
    consultant: { name: "Maria Gonzalez", avatar: "MG", avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face" },
    status: "completed",
    startDate: "2023-11-01",
    endDate: "2024-01-15",
    budget: 15000,
    spent: 14800,
    progress: 100,
    description: "Preparation and support for FDA GMP audit",
    priority: "high"
  },
  {
    id: "4",
    title: "Pharmacovigilance System Setup",
    consultant: { name: "Dr. Raj Patel", avatar: "RP" },
    status: "pending",
    startDate: "2024-03-01",
    endDate: "2024-05-30",
    budget: 20000,
    spent: 0,
    progress: 0,
    description: "Implementation of comprehensive pharmacovigilance system",
    nextMilestone: "System Requirements - Mar 15",
    priority: "medium"
  }
];

const statusColors = {
  active: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200", 
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  "on-hold": "bg-red-100 text-red-800 border-red-200"
};

const statusIcons = {
  active: <Clock className="h-3 w-3" />,
  completed: <CheckCircle className="h-3 w-3" />,
  pending: <Timer className="h-3 w-3" />,
  "on-hold": <AlertCircle className="h-3 w-3" />
};

const priorityColors = {
  low: "bg-gray-100 text-gray-700",
  medium: "bg-orange-100 text-orange-700", 
  high: "bg-red-100 text-red-700"
};

const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-foreground mb-2">{project.title}</h3>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{project.consultant.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(project.startDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Badge className={`${statusColors[project.status]} flex items-center gap-1`}>
          {statusIcons[project.status]}
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </Badge>
        <Badge className={priorityColors[project.priority]}>
          {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
        </Badge>
      </div>
    </div>

    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>

    {project.nextMilestone && (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <span className="font-medium text-blue-800">Next Milestone:</span>
          <span className="text-blue-700">{project.nextMilestone}</span>
        </div>
      </div>
    )}

    <div className="space-y-3">
      <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Progress</span>
        <span className="font-medium">{project.progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${project.progress}%` }}
        />
      </div>

      <div className="flex justify-between items-center pt-2 border-t border-border">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Budget:</span>
            <span className="font-medium">${project.budget.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Spent:</span>
            <span className="font-medium">${project.spent.toLocaleString()}</span>
          </div>
        </div>
        <Button size="sm" variant="outline">
          View Details
        </Button>
      </div>
    </div>
  </motion.div>
);

const ClientDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.consultant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const stats = useMemo(() => {
    const active = mockProjects.filter(p => p.status === "active").length;
    const completed = mockProjects.filter(p => p.status === "completed").length;
    const totalBudget = mockProjects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = mockProjects.reduce((sum, p) => sum + p.spent, 0);
    
    return { active, completed, totalBudget, totalSpent };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Client Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects and track consultant progress</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.active}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.completed}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalBudget.toLocaleString()}</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalSpent.toLocaleString()}</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full md:w-auto">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="on-hold">On Hold</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="text-center py-16">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No projects found</p>
              <Button variant="outline" className="mt-4">
                Start New Project
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClientDashboard;
