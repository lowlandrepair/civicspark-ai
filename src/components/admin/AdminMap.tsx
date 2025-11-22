import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useReports } from "@/contexts/ReportContext";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const AdminMap = () => {
  const { reports, updateReport } = useReports();
  const activeReports = reports.filter(r => r.status !== "Resolved");

  const getMarkerIcon = (priority: string, status: string) => {
    let color = "#3b82f6"; // default blue
    if (priority === "High") color = "#ef4444";
    else if (priority === "Medium") color = "#f59e0b";
    
    if (status === "Resolved") color = "#22c55e";
    
    return L.divIcon({
      className: "custom-marker",
      html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 4px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.4);"></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  return (
    <div className="h-screen">
      {/* Header */}
      <div className="border-b border-border bg-card p-6">
        <h1 className="text-3xl font-bold">Live Map View</h1>
        <p className="text-muted-foreground">Interactive city-wide issue tracking</p>
      </div>

      {/* Legend */}
      <div className="absolute right-6 top-28 z-[1000] rounded-lg border border-border bg-card p-4 shadow-lg">
        <h3 className="mb-3 font-semibold">Priority Levels</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-destructive" />
            <span className="text-sm">High Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-warning" />
            <span className="text-sm">Medium Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-primary" />
            <span className="text-sm">Low Priority</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-success" />
            <span className="text-sm">Resolved</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="h-[calc(100vh-113px)]">
        <MapContainer
          center={[40.7580, -73.9855]}
          zoom={12}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {reports.map((report) => (
            <Marker
              key={report.id}
              position={[report.coordinates.lat, report.coordinates.lng]}
              icon={getMarkerIcon(report.priority, report.status)}
            >
              <Popup className="custom-popup" minWidth={300}>
                <div className="space-y-3">
                  <div>
                    <h4 className="mb-1 text-lg font-semibold">{report.title}</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        report.priority === "High" ? "bg-destructive/10 text-destructive" :
                        report.priority === "Medium" ? "bg-warning/10 text-warning" :
                        "bg-primary/10 text-primary"
                      }`}>
                        {report.priority}
                      </span>
                      <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">
                        {report.category}
                      </span>
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        report.status === "Resolved" ? "bg-success/10 text-success" :
                        report.status === "In Progress" ? "bg-warning/10 text-warning" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {report.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  
                  {report.imageUrl && (
                    <img
                      src={report.imageUrl}
                      alt="Report"
                      className="h-32 w-full rounded-lg object-cover"
                    />
                  )}
                  
                  <div className="flex gap-2">
                    {report.status === "Pending" && (
                      <Button
                        size="sm"
                        onClick={() => updateReport(report.id, { status: "In Progress" })}
                        className="flex-1"
                      >
                        Start Work
                      </Button>
                    )}
                    {report.status === "In Progress" && (
                      <Button
                        size="sm"
                        onClick={() => updateReport(report.id, { status: "Resolved" })}
                        className="flex-1 bg-success hover:bg-success/90"
                      >
                        Mark Resolved
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default AdminMap;
