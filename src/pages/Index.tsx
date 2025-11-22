import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, Shield, TrendingUp, MapPin, ArrowRight, LogIn, Globe, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReports } from "@/contexts/ReportContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Index = () => {
  const navigate = useNavigate();
  const { getTotalResolved, reports } = useReports();
  const { user, isAdmin } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const totalResolved = getTotalResolved();

  const handlePortalNavigation = (portal: "citizen" | "admin") => {
    if (!user) {
      navigate("/auth");
    } else if (portal === "admin" && !isAdmin) {
      navigate("/citizen");
    } else {
      navigate(`/${portal}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Top Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Globe className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <div className="p-2 space-y-1">
              {[
                { code: "en", label: "English" },
                { code: "sq", label: "Shqip" },
                { code: "es", label: "Español" },
                { code: "fr", label: "Français" },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as any)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                    language === lang.code
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dark Mode Toggle */}
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>

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
            {/* Logo and Auth Button */}
            <div className="mb-8 flex items-center justify-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-6 py-3"
              >
                <MapPin className="h-6 w-6 text-primary" />
                <span className="text-2xl font-bold text-primary">CityCare</span>
              </motion.div>
              
              {!user && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    onClick={() => navigate("/auth")}
                    variant="outline"
                    className="gap-2"
                  >
                    <LogIn className="h-4 w-4" />
                    {t("landing.signIn")}
                  </Button>
                </motion.div>
              )}
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
              {t("landing.smartCity")} <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                {t("landing.smarterSolutions")}
              </span>
            </h1>

            <p className="mb-12 text-xl text-muted-foreground md:text-2xl">
              {t("landing.aiPowered")}
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
                <p className="text-sm text-muted-foreground">{t("landing.communityImpact")}</p>
                <p className="text-2xl font-bold text-success">{totalResolved} {t("landing.issuesResolved")}</p>
              </div>
            </motion.div>

            {/* Portal Selection */}
            <div className={`grid gap-8 ${user && isAdmin ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-xl mx-auto'}`}>
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
                  <h2 className="mb-3 text-2xl font-bold">{t("citizen.subtitle")}</h2>
                  <p className="mb-6 text-muted-foreground">
                    {t("citizen.citizenPortalDescription")}
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
                    onClick={() => handlePortalNavigation("citizen")}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    size="lg"
                  >
                    {user ? t("landing.openCitizen") : t("landing.signIn")}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.div>

              {/* Admin Portal - Only visible to admins */}
              {user && isAdmin && (
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
                    <h2 className="mb-3 text-2xl font-bold">{t("admin.subtitle")}</h2>
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
                      onClick={() => handlePortalNavigation("admin")}
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      {t("landing.openAdmin")}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </motion.div>
              )}
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

      {/* Features Section */}
      <section className="px-6 py-20 bg-gradient-to-br from-primary/5 to-background">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose CityCare?</h2>
            <p className="text-xl text-muted-foreground">
              Modern technology meets community engagement
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="rounded-xl border border-border bg-card p-6 text-center"
            >
              <div className="mb-4 inline-flex rounded-full bg-primary/10 p-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Location-Based Reporting</h3>
              <p className="text-muted-foreground">
                Pin-point exact locations on an interactive map for accurate issue reporting
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="rounded-xl border border-border bg-card p-6 text-center"
            >
              <div className="mb-4 inline-flex rounded-full bg-primary/10 p-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure & Verified</h3>
              <p className="text-muted-foreground">
                Your data is protected with enterprise-grade security and authentication
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              className="rounded-xl border border-border bg-card p-6 text-center"
            >
              <div className="mb-4 inline-flex rounded-full bg-primary/10 p-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Updates</h3>
              <p className="text-muted-foreground">
                Track your reports from submission to resolution with live status updates
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of citizens working together to build a better community
            </p>
            <Button
              onClick={() => !user ? navigate("/auth") : navigate("/citizen")}
              size="lg"
              className="text-lg px-8 py-6"
            >
              {user ? "Go to Portal" : "Get Started Today"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
