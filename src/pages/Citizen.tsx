import { useState } from "react";
import { Plus, Home, FileText } from "lucide-react";
import { motion } from "framer-motion";
import CitizenHome from "@/components/citizen/CitizenHome";
import CitizenActivity from "@/components/citizen/CitizenActivity";
import ReportFlow from "@/components/citizen/ReportFlow";
import { ProfileDropdown } from "@/components/ProfileDropdown";

type CitizenTab = "home" | "activity" | "report";

const Citizen = () => {
  const [activeTab, setActiveTab] = useState<CitizenTab>("home");
  const [showReportFlow, setShowReportFlow] = useState(false);

  const renderContent = () => {
    if (showReportFlow) {
      return <ReportFlow onClose={() => setShowReportFlow(false)} />;
    }

    switch (activeTab) {
      case "home":
        return <CitizenHome />;
      case "activity":
        return <CitizenActivity />;
      default:
        return <CitizenHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pb-20 md:pb-0">
      {/* Profile Dropdown (Desktop) */}
      {!showReportFlow && (
        <div className="fixed top-4 right-4 z-50 hidden md:block">
          <ProfileDropdown />
        </div>
      )}
      
      {renderContent()}

      {/* Floating Action Button (Mobile) */}
      {!showReportFlow && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowReportFlow(true)}
          className="fixed bottom-24 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/50 md:hidden"
        >
          <Plus className="h-8 w-8" />
        </motion.button>
      )}

      {/* Bottom Navigation (Mobile) */}
      {!showReportFlow && (
        <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-sm md:hidden">
          <div className="grid grid-cols-3 gap-1 px-2 py-3">
            <button
              onClick={() => setActiveTab("home")}
              className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-colors ${
                activeTab === "home"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="text-xs font-medium">Home</span>
            </button>

            <button
              onClick={() => setActiveTab("activity")}
              className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 transition-colors ${
                activeTab === "activity"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs font-medium">Activity</span>
            </button>

            <button
              onClick={() => setShowReportFlow(true)}
              className="flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-muted"
            >
              <Plus className="h-5 w-5" />
              <span className="text-xs font-medium">Report</span>
            </button>
          </div>
        </nav>
      )}

      {/* Desktop Sidebar */}
      {!showReportFlow && (
        <nav className="fixed left-0 top-0 hidden h-screen w-64 border-r border-border bg-card md:block">
          <div className="flex h-full flex-col">
            <div className="p-6 border-b border-border">
              <h1 className="text-2xl font-bold text-primary">CityCare</h1>
              <p className="text-sm text-muted-foreground">Citizen Portal</p>
            </div>

            <div className="flex-1 p-6 space-y-2">
              <button
                onClick={() => setActiveTab("home")}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                  activeTab === "home"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Home</span>
              </button>

              <button
                onClick={() => setActiveTab("activity")}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                  activeTab === "activity"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <FileText className="h-5 w-5" />
                <span className="font-medium">My Activity</span>
              </button>

              <button
                onClick={() => setShowReportFlow(true)}
                className="flex w-full items-center gap-3 rounded-lg bg-primary px-4 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Plus className="h-5 w-5" />
                <span className="font-medium">Report Issue</span>
              </button>
            </div>

            <div className="border-t border-border p-6">
              <div className="flex items-center justify-center">
                <ProfileDropdown />
              </div>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Citizen;
