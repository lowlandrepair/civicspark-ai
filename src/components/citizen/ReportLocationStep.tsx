import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface MapEventsProps {
  setPosition: (pos: { lat: number; lng: number }) => void;
}

function MapEvents({ setPosition }: MapEventsProps) {
  useMapEvents({
    moveend: (e) => {
      const center = e.target.getCenter();
      setPosition({ lat: center.lat, lng: center.lng });
    },
  });
  return null;
}

interface ReportLocationStepProps {
  onConfirm: (coords: { lat: number; lng: number }) => void;
  onBack: () => void;
}

const ReportLocationStep = ({ onConfirm, onBack }: ReportLocationStepProps) => {
  const [position, setPosition] = useState({ lat: 40.7580, lng: -73.9855 }); // NYC default
  const mapRef = useRef<any>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex h-[calc(100vh-73px)] flex-col"
    >
      {/* Instructions */}
      <div className="bg-primary/5 p-4 text-center">
        <p className="text-sm font-medium text-foreground">
          Drag the map to position the center pin at the exact location
        </p>
      </div>

      {/* Map Container */}
      <div className="relative flex-1">
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={13}
          className="h-full w-full"
          zoomControl={true}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapEvents setPosition={setPosition} />
        </MapContainer>

        {/* Fixed Center Pin */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-[1000] -translate-x-1/2 -translate-y-full">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg
              width="40"
              height="50"
              viewBox="0 0 40 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 0C8.95 0 0 8.95 0 20C0 35 20 50 20 50C20 50 40 35 40 20C40 8.95 31.05 0 20 0Z"
                fill="hsl(var(--primary))"
              />
              <circle cx="20" cy="20" r="8" fill="white" />
            </svg>
          </motion.div>
        </div>

        {/* Coordinates Display */}
        <div className="absolute bottom-4 left-4 z-[1000] rounded-lg bg-card/95 px-4 py-2 shadow-lg backdrop-blur-sm">
          <p className="text-xs text-muted-foreground">Selected Location</p>
          <p className="font-mono text-sm font-medium">
            {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="border-t border-border bg-card p-4">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={() => onConfirm(position)}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Confirm Location
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ReportLocationStep;
