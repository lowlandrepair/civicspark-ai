import { motion } from "framer-motion";
import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";
import { useReports } from "@/contexts/ReportContext";
import { format } from "date-fns";

const CitizenActivity = () => {
  const { reports } = useReports();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Resolved":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "In Progress":
        return <Clock className="h-5 w-5 text-warning" />;
      case "Rejected":
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusSteps = (status: string) => {
    const steps = [
      { label: "Sent", completed: true },
      { label: "Received", completed: status !== "Pending" },
      { label: "Crew Dispatched", completed: status === "In Progress" || status === "Resolved" },
      { label: "Resolved", completed: status === "Resolved" }
    ];
    return steps;
  };

  return (
    <div className="min-h-screen bg-background p-6 md:ml-64">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-2 text-3xl font-bold">My Activity</h1>
          <p className="mb-8 text-muted-foreground">
            Track the status of your reports
          </p>
        </motion.div>

        <div className="space-y-6">
          {reports.map((report, index) => {
            const steps = getStatusSteps(report.status);
            return (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                {/* Report Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-2">
                      {getStatusIcon(report.status)}
                      <h3 className="text-lg font-semibold">{report.title}</h3>
                    </div>
                    <p className="mb-2 text-sm text-muted-foreground">
                      {report.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {report.category}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${
                        report.priority === "High"
                          ? "bg-destructive/10 text-destructive"
                          : report.priority === "Medium"
                          ? "bg-warning/10 text-warning"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {report.priority}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(report.timestamp), "MMM d")}
                  </span>
                </div>

                {/* Status Stepper */}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    {steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex flex-1 flex-col items-center">
                        {/* Step Circle */}
                        <div
                          className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                            step.completed
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-muted bg-background text-muted-foreground"
                          }`}
                        >
                          {step.completed ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                          )}
                        </div>
                        {/* Step Label */}
                        <span className={`mt-2 text-xs font-medium ${
                          step.completed ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {step.label}
                        </span>
                        
                        {/* Connecting Line */}
                        {stepIndex < steps.length - 1 && (
                          <div
                            className={`absolute top-5 h-0.5 transition-colors ${
                              step.completed && steps[stepIndex + 1].completed
                                ? "bg-primary"
                                : "bg-muted"
                            }`}
                            style={{
                              left: `calc(${(stepIndex * 100) / (steps.length - 1)}% + ${50 / (steps.length - 1)}%)`,
                              right: `calc(${100 - ((stepIndex + 1) * 100) / (steps.length - 1)}% + ${50 / (steps.length - 1)}%)`
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CitizenActivity;
