import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, Shield, TrendingUp, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReports } from "@/contexts/ReportContext";

const Index = () => {
  const navigate = useNavigate();
  const { getTotalResolved, reports } = useReports();
  const totalResolved = getTotalResolved();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="relative px-6 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-6xl text-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8 inline-flex items-center gap-3 rounded-full bg-primary/10 px-6 py-3"
            >
              <MapPin className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-primary">CityCare</span>
            </motion.div>

            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
              Smart City, <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Smarter Solutions
              </span>
            </h1>

            <p className="mb-12 text-xl text-muted-foreground md:text-2xl">
              AI-powered platform connecting citizens with city services
            </p>

            {/* Community Impact */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-16 inline-flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3 shadow-lg"
            >
              <TrendingUp className="h-6 w-6 text-success" />
              <div className="text-left">
                <p className="text-sm text-muted-foreground">Community Impact</p>
                <p className="text-2xl font-bold text-success">{totalResolved} Issues Resolved</p>
              </div>
            </motion.div>

            {/* Portal Selection */}
            <div className="grid gap-8 md:grid-cols-2">
              {/* Citizen Portal */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card p-8 transition-all hover:border-primary hover:shadow-xl"
              >
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="mb-3 text-2xl font-bold">Citizen Portal</h2>
                  <p className="mb-6 text-muted-foreground">
                    Report issues, track progress, and help improve your community
                  </p>
                  <ul className="mb-6 space-y-2 text-left text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Interactive map reporting
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      AI-enhanced descriptions
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Real-time status tracking
                    </li>
                  </ul>
                  <Button
                    onClick={() => navigate("/citizen")}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    Enter Citizen Portal
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>

              {/* Admin Portal */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="group relative overflow-hidden rounded-2xl border-2 border-border bg-card p-8 transition-all hover:border-primary hover:shadow-xl"
              >
                <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative">
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="mb-3 text-2xl font-bold">Admin Command Center</h2>
                  <p className="mb-6 text-muted-foreground">
                    Tactical dashboard for city management and workflow optimization
                  </p>
                  <ul className="mb-6 space-y-2 text-left text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Live map with priority pins
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Kanban workflow board
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Analytics & insights
                    </li>
                  </ul>
                  <Button
                    onClick={() => navigate("/admin")}
                    variant="outline"
                    className="w-full"
                    size="lg"
                  >
                    Enter Command Center
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-border bg-card/50 px-6 py-16 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-center"
            >
              <p className="mb-2 text-5xl font-bold text-primary">{reports.length}</p>
              <p className="text-muted-foreground">Total Reports</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <p className="mb-2 text-5xl font-bold text-warning">
                {reports.filter(r => r.status === "In Progress").length}
              </p>
              <p className="text-muted-foreground">Active Cases</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="text-center"
            >
              <p className="mb-2 text-5xl font-bold text-success">{totalResolved}</p>
              <p className="text-muted-foreground">Resolved Issues</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
