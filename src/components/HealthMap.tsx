import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, AlertTriangle, Map, Navigation } from "lucide-react";
import { useState } from "react";

export const HealthMap = () => {
  const [selectedHospital, setSelectedHospital] = useState<number | null>(null);

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
      distance: "2.3 km",
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
      distance: "1.8 km",
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
      distance: "5.1 km",
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
      distance: "8.2 km",
    },
  ];

  // Sample outbreak data
  const outbreaks = [
    {
      id: 1,
      disease: "Dengue",
      area: "Central Delhi",
      severity: "medium",
      cases: 45,
      lastUpdated: "2 hours ago",
    },
    {
      id: 2,
      disease: "Chikungunya",
      area: "South Delhi",
      severity: "high",
      cases: 28,
      lastUpdated: "4 hours ago",
    },
    {
      id: 3,
      disease: "Malaria",
      area: "East Delhi",
      severity: "low",
      cases: 12,
      lastUpdated: "1 day ago",
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "default";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Healthcare Facilities & Health Alerts
        </h2>
        <p className="text-muted-foreground">
          Find nearby hospitals, clinics, and stay informed about health alerts in your area
        </p>
      </div>

      {/* Interactive Map Placeholder */}
      <Card className="p-0 overflow-hidden card-shadow">
        <div className="h-[400px] bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center relative">
          <div className="text-center">
            <Map className="w-16 h-16 text-primary/50 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">Interactive Map</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Real-time hospital locations and outbreak zones
            </p>
            <Button className="medical-gradient">
              <Navigation className="w-4 h-4 mr-2" />
              Open Full Map
            </Button>
          </div>
          
          {/* Hospital Markers Simulation */}
          <div className="absolute top-4 left-4 space-y-2">
            {hospitals.slice(0, 2).map((hospital) => (
              <div
                key={hospital.id}
                className="flex items-center space-x-2 bg-card/90 backdrop-blur-sm p-2 rounded-lg shadow-sm"
              >
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-xs font-medium">{hospital.name}</span>
              </div>
            ))}
          </div>

          {/* Outbreak Zones Simulation */}
          <div className="absolute top-4 right-4 space-y-2">
            {outbreaks.slice(0, 2).map((outbreak) => (
              <div
                key={outbreak.id}
                className="flex items-center space-x-2 bg-destructive/90 text-destructive-foreground backdrop-blur-sm p-2 rounded-lg shadow-sm"
              >
                <AlertTriangle className="w-3 h-3" />
                <span className="text-xs font-medium">{outbreak.disease} Alert</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hospitals List */}
        <Card className="p-6 card-shadow">
          <h3 className="font-semibold mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary" />
            Nearby Hospitals ({hospitals.length})
          </h3>
          <div className="space-y-4">
            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className={`p-4 border rounded-lg medical-transition cursor-pointer ${
                  selectedHospital === hospital.id 
                    ? 'border-primary bg-primary/5 shadow-md' 
                    : 'hover:shadow-md hover:border-primary/50'
                }`}
                onClick={() => setSelectedHospital(selectedHospital === hospital.id ? null : hospital.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold">{hospital.name}</h4>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>★ {hospital.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{hospital.address}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <Badge 
                        variant={hospital.type === "Government" ? "secondary" : "default"}
                      >
                        {hospital.type}
                      </Badge>
                      <div className="flex items-center text-muted-foreground">
                        <Navigation className="w-3 h-3 mr-1" />
                        {hospital.distance}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedHospital === hospital.id && (
                  <div className="mt-4 pt-4 border-t space-y-3">
                    <div>
                      <h5 className="text-sm font-medium mb-2">Specialties</h5>
                      <div className="flex flex-wrap gap-1">
                        {hospital.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      <span>{hospital.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Open 24/7</span>
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <Button size="sm" className="flex-1">
                        Book Appointment
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Get Directions
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Health Alerts */}
        <Card className="p-6 card-shadow">
          <h3 className="font-semibold mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-warning" />
            Active Health Alerts
          </h3>
          <div className="space-y-4">
            {outbreaks.map((outbreak) => (
              <div
                key={outbreak.id}
                className="p-4 border rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-warning" />
                    <h4 className="font-semibold">{outbreak.disease} Outbreak</h4>
                  </div>
                  <Badge variant={getSeverityColor(outbreak.severity) as any}>
                    {outbreak.severity.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Area:</span>
                    <span>{outbreak.area}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Cases:</span>
                    <span className="font-medium">{outbreak.cases}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Last Updated:</span>
                    <span className="text-xs">{outbreak.lastUpdated}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <Button size="sm" variant="outline" className="w-full">
                    View Prevention Guidelines
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Contact */}
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Phone className="w-5 h-5 text-destructive" />
              <h4 className="font-semibold text-destructive">Emergency Helpline</h4>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              For immediate medical assistance
            </p>
            <div className="flex items-center space-x-4">
              <Button size="sm" variant="destructive">
                Call 108
              </Button>
              <Button size="sm" variant="outline">
                Call 102
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};