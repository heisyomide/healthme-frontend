"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix missing marker icons (runs only client-side)
const fixLeafletIcons = () => {
  const iconRetinaUrl = "/leaflet/marker-icon-2x.png";
  const iconUrl = "/leaflet/marker-icon.png";
  const shadowUrl = "/leaflet/marker-shadow.png";

  delete (L.Icon.Default.prototype as any)._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
  });
};

type Practitioner = {
  id: number;
  name: string;
  specialty: string;
  location: string;
  lat: number;
  lng: number;
};

interface MapProps {
  userLocation: [number, number];
  practitioners: Practitioner[];
}

export default function PractitionerMap({ userLocation, practitioners }: MapProps) {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  return (
    <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(13,148,136,0.15)] mb-16">
      <MapContainer
        center={userLocation}
        zoom={8}
        scrollWheelZoom={false}
        className="h-[400px] w-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={userLocation}>
          <Popup>You are here 📍</Popup>
        </Marker>
        {practitioners.map((pr) => (
          <Marker key={pr.id} position={[pr.lat, pr.lng]}>
            <Popup>
              <strong>{pr.name}</strong> <br />
              {pr.specialty} <br />
              {pr.location}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}