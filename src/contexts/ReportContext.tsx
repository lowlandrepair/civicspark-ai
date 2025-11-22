import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Report, ReportStatus, ReportPriority } from "@/types/report";

interface ReportContextType {
  reports: Report[];
  addReport: (report: Omit<Report, "id" | "timestamp" | "upvotes">) => void;
  updateReport: (id: string, updates: Partial<Report>) => void;
  deleteReport: (id: string) => void;
  getReportById: (id: string) => Report | undefined;
  upvoteReport: (id: string) => void;
  getTotalResolved: () => number;
}

const ReportContext = createContext<ReportContextType | undefined>(undefined);

const STORAGE_KEY = "citycare_reports";

// Mock data seeded for New York City area
const mockReports: Report[] = [
  {
    id: "1",
    title: "Large pothole on Broadway",
    category: "Pothole",
    description: "Deep pothole causing traffic issues near Times Square intersection. Approximately 2 feet wide and 6 inches deep.",
    status: "In Progress",
    priority: "High",
    coordinates: { lat: 40.7580, lng: -73.9855 },
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 23,
    imageUrl: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400"
  },
  {
    id: "2",
    title: "Broken streetlight",
    category: "Lighting",
    description: "Street lighting is completely out on 5th Avenue between 42nd and 43rd. Safety concern for pedestrians at night.",
    status: "Pending",
    priority: "High",
    coordinates: { lat: 40.7549, lng: -73.9840 },
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 15,
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400"
  },
  {
    id: "3",
    title: "Overflowing trash bins",
    category: "Trash",
    description: "Multiple trash receptacles overflowing in Central Park near Bethesda Fountain. Attracting rodents and creating unsanitary conditions.",
    status: "Resolved",
    priority: "Medium",
    coordinates: { lat: 40.7739, lng: -73.9718 },
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 8,
    imageUrl: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400"
  },
  {
    id: "4",
    title: "Graffiti on subway entrance",
    category: "Graffiti",
    description: "Extensive graffiti vandalism on the Union Square subway entrance. Needs immediate cleaning.",
    status: "In Progress",
    priority: "Medium",
    coordinates: { lat: 40.7359, lng: -73.9911 },
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 12,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400"
  },
  {
    id: "5",
    title: "Water main leak",
    category: "Water Leak",
    description: "Significant water leak flooding the sidewalk on Madison Avenue. Water pressure appears low in surrounding buildings.",
    status: "In Progress",
    priority: "High",
    coordinates: { lat: 40.7614, lng: -73.9776 },
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    upvotes: 34,
    imageUrl: "https://images.unsplash.com/photo-1584555613497-9ecf9dd06f68?w=400"
  },
  {
    id: "6",
    title: "Damaged tree blocking sidewalk",
    category: "Tree Maintenance",
    description: "Large tree branch has fallen and is blocking the entire sidewalk on Park Avenue. Pedestrians forced into street.",
    status: "Pending",
    priority: "High",
    coordinates: { lat: 40.7489, lng: -73.9680 },
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    upvotes: 19,
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400"
  },
  {
    id: "7",
    title: "Potholes on Brooklyn Bridge",
    category: "Pothole",
    description: "Multiple potholes forming on the Brooklyn Bridge pedestrian walkway. Creating hazards for cyclists and walkers.",
    status: "Pending",
    priority: "Medium",
    coordinates: { lat: 40.7061, lng: -73.9969 },
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    upvotes: 27,
    imageUrl: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400"
  },
  {
    id: "8",
    title: "Illegal dumping site",
    category: "Trash",
    description: "Large pile of construction debris and household waste illegally dumped in empty lot in Chinatown.",
    status: "Resolved",
    priority: "Medium",
    coordinates: { lat: 40.7156, lng: -73.9970 },
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 14,
    imageUrl: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400"
  },
  {
    id: "9",
    title: "Dark alley needs lighting",
    category: "Lighting",
    description: "Alley between buildings on the Lower East Side has no lighting at all. Major safety concern reported by residents.",
    status: "Pending",
    priority: "High",
    coordinates: { lat: 40.7209, lng: -73.9845 },
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    upvotes: 31,
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400"
  },
  {
    id: "10",
    title: "Fire hydrant leaking",
    category: "Water Leak",
    description: "Fire hydrant on West Side Highway continuously leaking water. Causing ice formation in cold weather.",
    status: "In Progress",
    priority: "Medium",
    coordinates: { lat: 40.7410, lng: -74.0070 },
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    upvotes: 9,
    imageUrl: "https://images.unsplash.com/photo-1584555613497-9ecf9dd06f68?w=400"
  },
  {
    id: "11",
    title: "Road crack needs repair",
    category: "Pothole",
    description: "Large crack developing across the entire width of street in Greenwich Village. Could become major pothole soon.",
    status: "Pending",
    priority: "Low",
    coordinates: { lat: 40.7336, lng: -74.0027 },
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 6,
    imageUrl: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=400"
  },
  {
    id: "12",
    title: "Broken traffic light",
    category: "Lighting",
    description: "Traffic signal stuck on red at Houston Street intersection. Causing confusion and traffic backup.",
    status: "Resolved",
    priority: "High",
    coordinates: { lat: 40.7258, lng: -74.0022 },
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 42,
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400"
  },
  {
    id: "13",
    title: "Sidewalk tree root damage",
    category: "Tree Maintenance",
    description: "Tree roots have completely broken up sidewalk creating trip hazards on the Upper West Side.",
    status: "Pending",
    priority: "Medium",
    coordinates: { lat: 40.7870, lng: -73.9754 },
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 11,
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400"
  },
  {
    id: "14",
    title: "Park bench vandalism",
    category: "Graffiti",
    description: "Multiple park benches in Washington Square Park defaced with spray paint.",
    status: "Resolved",
    priority: "Low",
    coordinates: { lat: 40.7308, lng: -73.9973 },
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    upvotes: 5,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400"
  },
  {
    id: "15",
    title: "Abandoned shopping carts",
    category: "Trash",
    description: "Several shopping carts abandoned on East River waterfront. Creating obstruction on bicycle path.",
    status: "In Progress",
    priority: "Low",
    coordinates: { lat: 40.7468, lng: -73.9714 },
    timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(),
    upvotes: 7,
    imageUrl: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400"
  }
];

export const ReportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reports, setReports] = useState<Report[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setReports(JSON.parse(stored));
    } else {
      // Seed with mock data if empty
      setReports(mockReports);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockReports));
    }
  }, []);

  // Save to localStorage whenever reports change
  useEffect(() => {
    if (reports.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    }
  }, [reports]);

  const addReport = (report: Omit<Report, "id" | "timestamp" | "upvotes">) => {
    const newReport: Report = {
      ...report,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      upvotes: 0
    };
    setReports(prev => [newReport, ...prev]);
  };

  const updateReport = (id: string, updates: Partial<Report>) => {
    setReports(prev => 
      prev.map(report => 
        report.id === id ? { ...report, ...updates } : report
      )
    );
  };

  const deleteReport = (id: string) => {
    setReports(prev => prev.filter(report => report.id !== id));
  };

  const getReportById = (id: string) => {
    return reports.find(report => report.id === id);
  };

  const upvoteReport = (id: string) => {
    setReports(prev =>
      prev.map(report =>
        report.id === id ? { ...report, upvotes: report.upvotes + 1 } : report
      )
    );
  };

  const getTotalResolved = () => {
    return reports.filter(r => r.status === "Resolved").length;
  };

  return (
    <ReportContext.Provider
      value={{
        reports,
        addReport,
        updateReport,
        deleteReport,
        getReportById,
        upvoteReport,
        getTotalResolved
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReports = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReports must be used within ReportProvider");
  }
  return context;
};
