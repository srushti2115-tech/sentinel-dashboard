import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { fraudHotspots } from "@/data/mockData";

export default function FraudMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    const map = L.map(mapRef.current, {
      center: [22.5, 78.9],
      zoom: 5,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    fraudHotspots.forEach((spot) => {
      const color =
        spot.riskLevel === "high" ? "#e04040" : spot.riskLevel === "medium" ? "#e8a020" : "#22c55e";
      const radius = Math.max(spot.count * 150, 8000);

      L.circle([spot.lat, spot.lng], {
        radius,
        color,
        fillColor: color,
        fillOpacity: 0.25,
        weight: 1.5,
      })
        .bindPopup(
          `<div style="color:#000;font-family:Inter"><b>${spot.city}</b><br/>Frauds: ${spot.count}<br/>Risk: ${spot.riskLevel}</div>`
        )
        .addTo(map);
    });

    mapInstance.current = map;

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4">Fraud Location Heatmap</h3>
      <div ref={mapRef} className="h-72 rounded-lg overflow-hidden" />
    </div>
  );
}
