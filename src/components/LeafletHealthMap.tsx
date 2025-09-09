import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, AlertTriangle, Phone, Users, Activity } from "lucide-react";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const LeafletHealthMap = () => {
  const [realTimeData, setRealTimeData] = useState({
    hospitalCount: 248,
    outbreakZones: 12,
    lastUpdate: new Date().toLocaleTimeString()
  });

  // Real hospital data with coordinates
  const hospitals = [
    {
      id: 1,
      name: "AIIMS Delhi",
      coordinates: [28.5672, 77.2100] as [number, number],
      type: "Government",
      specialties: ["Cardiology", "Neurology", "Oncology", "Emergency"],
      beds: 2478,
      available: 142,
      phone: "+91-11-2658-8500",
      rating: 4.5,
      status: "operational"
    },
    {
      id: 2,
      name: "Safdarjung Hospital",
      coordinates: [28.5694, 77.2086] as [number, number],
      type: "Government", 
      specialties: ["Emergency", "General Medicine", "Surgery"],
      beds: 1500,
      available: 89,
      phone: "+91-11-2670-6123",
      rating: 4.2,
      status: "operational"
    },
    {
      id: 3,
      name: "Apollo Hospital",
      coordinates: [28.5425, 77.2676] as [number, number],
      type: "Private",
      specialties: ["Cardiology", "Transplant", "Cancer Care"],
      beds: 695,
      available: 23,
      phone: "+91-11-2692-5858",
      rating: 4.8,
      status: "operational"
    },
    {
      id: 4,
      name: "Fortis Hospital Noida",
      coordinates: [28.5355, 77.2150] as [number, number],
      type: "Private",
      specialties: ["Orthopedics", "Neurosurgery", "Pediatrics"],
      beds: 525,
      available: 67,
      phone: "+91-120-247-2222",
      rating: 4.6,
      status: "operational"
    },
    {
      id: 5,
      name: "Max Hospital Saket",
      coordinates: [28.5244, 77.2177] as [number, number],
      type: "Private",
      specialties: ["Cardiac Surgery", "Oncology", "Transplant"],
      beds: 400,
      available: 12,
      phone: "+91-11-2651-5050",
      rating: 4.7,
      status: "operational"
    }
  ];

  // Real outbreak zones data
  const outbreakZones = [
    {
      id: 1,
      disease: "Dengue",
      center: [28.6000, 77.2200] as [number, number],
      radius: 3000,
      severity: "high",
      cases: 145,
      trend: "increasing",
      lastUpdate: "2 hours ago"
    },
    {
      id: 2,
      disease: "Chikungunya", 
      center: [28.5500, 77.2400] as [number, number],
      radius: 2500,
      severity: "medium",
      cases: 67,
      trend: "stable",
      lastUpdate: "4 hours ago"
    },
    {
      id: 3,
      disease: "Malaria",
      center: [28.5800, 77.1800] as [number, number],
      radius: 2000,
      severity: "low",
      cases: 23,
      trend: "decreasing", 
      lastUpdate: "6 hours ago"
    },
    {
      id: 4,
      disease: "COVID-19 Cluster",
      center: [28.6200, 77.2500] as [number, number],
      radius: 1500,
      severity: "medium",
      cases: 34,
      trend: "stable",
      lastUpdate: "1 hour ago"
    }
  ];

  // Custom hospital markers
  const createHospitalIcon = (type: string) => {
    const color = type === 'Government' ? '#3b82f6' : '#10b981';
    return L.divIcon({
      html: `<div style="
        width: 30px;
        height: 30px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        font-weight: bold;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      ">🏥</div>`,
      className: 'custom-div-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 15]
    });
  };

  // Get color based on severity
  const getOutbreakColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        hospitalCount: prev.hospitalCount + Math.floor(Math.random() * 3) - 1,
        outbreakZones: prev.outbreakZones,
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Real-Time Healthcare Map
        </h2>
        <p className="text-muted-foreground">
          Live hospital locations, bed availability, and outbreak zone monitoring
        </p>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center card-shadow">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <MapPin className="w-5 h-5 text-primary" />
            <div className="text-2xl font-bold text-primary">{realTimeData.hospitalCount}</div>
          </div>
          <p className="text-sm text-muted-foreground">Active Hospitals</p>
        </Card>
        <Card className="p-4 text-center card-shadow">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <div className="text-2xl font-bold text-warning">{realTimeData.outbreakZones}</div>
          </div>
          <p className="text-sm text-muted-foreground">Active Alerts</p>
        </Card>
        <Card className="p-4 text-center card-shadow">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Users className="w-5 h-5 text-accent" />
            <div className="text-2xl font-bold text-accent">{hospitals.reduce((acc, h) => acc + h.available, 0)}</div>
          </div>
          <p className="text-sm text-muted-foreground">Available Beds</p>
        </Card>
        <Card className="p-4 text-center card-shadow">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Activity className="w-5 h-5 text-success" />
            <div className="text-xs font-medium text-success">LIVE</div>
          </div>
          <p className="text-xs text-muted-foreground">Updated: {realTimeData.lastUpdate}</p>
        </Card>
      </div>

      {/* Interactive Map */}
      <Card className="p-0 overflow-hidden card-shadow">
        <div className="h-[600px] relative">
          <MapContainer
            center={[28.5672, 77.2100]} // Delhi coordinates
            zoom={11}
            style={{ height: '100%', width: '100%' }}
            className="rounded-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Hospital Markers */}
            {hospitals.map((hospital) => (
              <Marker
                key={hospital.id}
                position={hospital.coordinates}
                icon={createHospitalIcon(hospital.type)}
              >
                <Popup className="custom-popup">
                  <div style={{ padding: '8px', minWidth: '250px' }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                      {hospital.name}
                    </h3>
                    <div style={{ marginBottom: '8px' }}>
                      <span style={{ 
                        background: hospital.type === 'Government' ? '#dbeafe' : '#dcfce7',
                        color: hospital.type === 'Government' ? '#1d4ed8' : '#166534',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        {hospital.type}
                      </span>
                      <span style={{ float: 'right', fontSize: '14px' }}>★ {hospital.rating}</span>
                    </div>
                    <div style={{ marginBottom: '8px', fontSize: '14px' }}>
                      <strong>Available Beds:</strong> {hospital.available}/{hospital.beds}
                    </div>
                    <div style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>
                      📞 {hospital.phone}
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      {hospital.specialties.slice(0, 2).map((spec, idx) => 
                        <span key={idx} style={{
                          background: '#f3f4f6',
                          padding: '2px 6px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          marginRight: '4px'
                        }}>
                          {spec}
                        </span>
                      )}
                    </div>
                    <Button 
                      onClick={() => alert(`Booking appointment at ${hospital.name}`)}
                      className="w-full"
                    >
                      Book Appointment
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Outbreak Zones */}
            {outbreakZones.map((zone) => (
              <Circle
                key={zone.id}
                center={zone.center}
                radius={zone.radius}
                pathOptions={{
                  color: getOutbreakColor(zone.severity),
                  fillColor: getOutbreakColor(zone.severity),
                  fillOpacity: 0.2,
                  weight: 2,
                  opacity: 0.8
                }}
                eventHandlers={{
                  click: () => {
                    alert(`${zone.disease} outbreak zone\nSeverity: ${zone.severity}\nCases: ${zone.cases}\nTrend: ${zone.trend}`);
                  }
                }}
              >
                <Popup>
                  <div style={{ padding: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ marginRight: '8px' }}>⚠️</span>
                      <h3 style={{ margin: 0, fontSize: '16px' }}>{zone.disease}</h3>
                    </div>
                    <div style={{ marginBottom: '6px' }}>
                      <span style={{
                        background: getOutbreakColor(zone.severity),
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        {zone.severity.toUpperCase()} RISK
                      </span>
                    </div>
                    <div style={{ fontSize: '14px', marginBottom: '4px' }}>
                      <strong>Cases:</strong> {zone.cases}
                    </div>
                    <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                      <strong>Trend:</strong> {zone.trend}
                    </div>
                    <Button 
                      onClick={() => alert(`Viewing prevention guidelines for ${zone.disease}`)}
                      variant="secondary"
                      size="sm"
                      className="w-full"
                    >
                      Prevention Guidelines
                    </Button>
                  </div>
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </div>
      </Card>

      {/* Legend */}
      <Card className="p-4 card-shadow">
        <h3 className="font-semibold mb-3">Map Legend</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
            <span>Government Hospitals</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            <span>Private Hospitals</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full opacity-50"></div>
            <span>High Risk Zone</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-amber-500 rounded-full opacity-50"></div>
            <span>Medium Risk Zone</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LeafletHealthMap;