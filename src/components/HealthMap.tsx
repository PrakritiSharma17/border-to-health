import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, AlertTriangle } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom hospital icon
const hospitalIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3063/3063361.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export const HealthMap = () => {
  const mapRef = useRef<any>(null);

  // Sample hospital data
  const hospitals = [
    {
      id: 1,
      name: "AIIMS Delhi",
      lat: 28.5672,
      lng: 77.2100,
      address: "AIIMS Campus, Ansari Nagar, New Delhi",
      phone: "+91-11-2658-8500",
      type: "Government",
      specialties: ["Cardiology", "Neurology", "Oncology"],
      rating: 4.5,
    },
    {
      id: 2,
      name: "Safdarjung Hospital",
      lat: 28.5694,
      lng: 77.2086,
      address: "Ring Road, Safdarjung Enclave, New Delhi",
      phone: "+91-11-2670-6123",
      type: "Government",
      specialties: ["Emergency", "General Medicine", "Surgery"],
      rating: 4.2,
    },
    {
      id: 3,
      name: "Apollo Hospital",
      lat: 28.5425,
      lng: 77.2676,
      address: "Press Enclave Road, Sarita Vihar, Delhi",
      phone: "+91-11-2692-5858",
      type: "Private",
      specialties: ["Cardiology", "Transplant", "Cancer Care"],
      rating: 4.8,
    },
    {
      id: 4,
      name: "Fortis Hospital",
      lat: 28.5355,
      lng: 77.2150,
      address: "B-22, Sector 62, Noida",
      phone: "+91-120-247-2222",
      type: "Private",
      specialties: ["Orthopedics", "Neurosurgery", "Pediatrics"],
      rating: 4.6,
    },
  ];

  // Sample outbreak data
  const outbreaks = [
    {
      id: 1,
      disease: "Dengue",
      lat: 28.6000,
      lng: 77.2200,
      radius: 3000,
      severity: "medium",
      cases: 45,
    },
    {
      id: 2,
      disease: "Chikungunya",
      lat: 28.5500,
      lng: 77.2400,
      radius: 2000,
      severity: "high",
      cases: 28,
    },
    {
      id: 3,
      disease: "Malaria",
      lat: 28.5800,
      lng: 77.1800,
      radius: 2500,
      severity: "low",
      cases: 12,
    },
  ];

  const getOutbreakColor = (severity: string) => {
    switch (severity) {
      case "high": return "#ef4444";
      case "medium": return "#f59e0b";
      case "low": return "#10b981";
      default: return "#6b7280";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Healthcare Facilities & Outbreak Map
        </h2>
        <p className="text-muted-foreground">
          Find nearby hospitals, clinics, and stay informed about health alerts in your area
        </p>
      </div>

      {/* Legend */}
      <Card className="p-4 card-shadow">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            Map Legend
          </h3>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm">Hospitals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full opacity-50"></div>
              <span className="text-sm">High Risk Outbreak</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-amber-500 rounded-full opacity-50"></div>
              <span className="text-sm">Medium Risk Outbreak</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full opacity-50"></div>
              <span className="text-sm">Low Risk Outbreak</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2 p-0 overflow-hidden card-shadow">
          <div className="h-[600px]">
            <MapContainer
              center={[28.5672, 77.2100]}
              zoom={11}
              ref={mapRef}
              style={{ height: "100%", width: "100%" }}
              className="rounded-lg"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {/* Hospital Markers */}
              {hospitals.map((hospital) => (
                <Marker
                  key={hospital.id}
                  position={[hospital.lat, hospital.lng]}
                  icon={hospitalIcon}
                >
                  <Popup>
                    <div className="p-2 min-w-[250px]">
                      <h3 className="font-semibold text-lg mb-2">{hospital.name}</h3>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">{hospital.address}</p>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{hospital.phone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant={hospital.type === "Government" ? "secondary" : "default"}>
                            {hospital.type}
                          </Badge>
                          <div className="text-sm">★ {hospital.rating}</div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {hospital.specialties.slice(0, 2).map((specialty) => (
                            <Badge key={specialty} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" className="w-full mt-2">
                          Book Appointment
                        </Button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Outbreak Zones */}
              {outbreaks.map((outbreak) => (
                <Circle
                  key={outbreak.id}
                  center={[outbreak.lat, outbreak.lng]}
                  radius={outbreak.radius}
                  pathOptions={{
                    fillColor: getOutbreakColor(outbreak.severity),
                    fillOpacity: 0.2,
                    color: getOutbreakColor(outbreak.severity),
                    weight: 2,
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <h3 className="font-semibold">{outbreak.disease} Outbreak</h3>
                      </div>
                      <p className="text-sm">Cases reported: {outbreak.cases}</p>
                      <Badge 
                        variant={outbreak.severity === "high" ? "destructive" : 
                                outbreak.severity === "medium" ? "secondary" : "default"}
                        className="mt-2"
                      >
                        {outbreak.severity.toUpperCase()} Risk
                      </Badge>
                    </div>
                  </Popup>
                </Circle>
              ))}
            </MapContainer>
          </div>
        </Card>

        {/* Hospital List */}
        <div className="space-y-4">
          <Card className="p-4 card-shadow">
            <h3 className="font-semibold mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" />
              Nearby Hospitals
            </h3>
            <div className="space-y-3">
              {hospitals.map((hospital) => (
                <div
                  key={hospital.id}
                  className="p-3 border rounded-lg medical-transition hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{hospital.name}</h4>
                    <div className="text-xs text-muted-foreground">★ {hospital.rating}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{hospital.address}</p>
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={hospital.type === "Government" ? "secondary" : "default"}
                      className="text-xs"
                    >
                      {hospital.type}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      Open 24/7
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 card-shadow">
            <h3 className="font-semibold mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
              Active Health Alerts
            </h3>
            <div className="space-y-3">
              {outbreaks.map((outbreak) => (
                <div
                  key={outbreak.id}
                  className="p-3 border rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{outbreak.disease}</h4>
                    <Badge 
                      variant={outbreak.severity === "high" ? "destructive" : 
                              outbreak.severity === "medium" ? "secondary" : "default"}
                      className="text-xs"
                    >
                      {outbreak.severity.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {outbreak.cases} cases reported in this area
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};