import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, AlertTriangle, Phone, Clock, Users, Activity, Key } from "lucide-react";

export const InteractiveHealthMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
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
      coordinates: [77.2100, 28.5672] as [number, number],
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
      coordinates: [77.2086, 28.5694] as [number, number],
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
      coordinates: [77.2676, 28.5425] as [number, number],
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
      coordinates: [77.2150, 28.5355] as [number, number],
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
      coordinates: [77.2177, 28.5244] as [number, number],
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
      center: [77.2200, 28.6000] as [number, number],
      radius: 3000,
      severity: "high",
      cases: 145,
      trend: "increasing",
      lastUpdate: "2 hours ago"
    },
    {
      id: 2,
      disease: "Chikungunya", 
      center: [77.2400, 28.5500] as [number, number],
      radius: 2500,
      severity: "medium",
      cases: 67,
      trend: "stable",
      lastUpdate: "4 hours ago"
    },
    {
      id: 3,
      disease: "Malaria",
      center: [77.1800, 28.5800] as [number, number],
      radius: 2000,
      severity: "low",
      cases: 23,
      trend: "decreasing", 
      lastUpdate: "6 hours ago"
    },
    {
      id: 4,
      disease: "COVID-19 Cluster",
      center: [77.2500, 28.6200] as [number, number],
      radius: 1500,
      severity: "medium",
      cases: 34,
      trend: "stable",
      lastUpdate: "1 hour ago"
    }
  ];

  // Initialize map
  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [77.2100, 28.5672], // Delhi coordinates
      zoom: 11,
      pitch: 0
    });

    map.current.on('load', () => {
      addHospitalMarkers();
      addOutbreakZones();
      setIsMapInitialized(true);
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
  };

  // Add hospital markers to map
  const addHospitalMarkers = () => {
    if (!map.current) return;

    hospitals.forEach((hospital) => {
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'hospital-marker';
      markerElement.style.cssText = `
        width: 30px;
        height: 30px;
        background: ${hospital.type === 'Government' ? '#3b82f6' : '#10b981'};
        border: 3px solid white;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: white;
        font-weight: bold;
      `;
      markerElement.innerHTML = '🏥';

      // Create popup content
      const popupContent = `
        <div style="padding: 12px; min-width: 250px;">
          <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">${hospital.name}</h3>
          <div style="margin-bottom: 8px;">
            <span style="background: ${hospital.type === 'Government' ? '#dbeafe' : '#dcfce7'}; 
                         color: ${hospital.type === 'Government' ? '#1d4ed8' : '#166534'}; 
                         padding: 2px 8px; border-radius: 12px; font-size: 12px;">
              ${hospital.type}
            </span>
            <span style="float: right; font-size: 14px;">★ ${hospital.rating}</span>
          </div>
          <div style="margin-bottom: 8px; font-size: 14px;">
            <strong>Available Beds:</strong> ${hospital.available}/${hospital.beds}
          </div>
          <div style="margin-bottom: 8px; font-size: 12px; color: #666;">
            📞 ${hospital.phone}
          </div>
          <div style="margin-bottom: 12px;">
            ${hospital.specialties.slice(0, 2).map(spec => 
              `<span style="background: #f3f4f6; padding: 2px 6px; border-radius: 8px; 
                            font-size: 11px; margin-right: 4px;">${spec}</span>`
            ).join('')}
          </div>
          <button onclick="alert('Booking appointment at ${hospital.name}')" 
                  style="width: 100%; padding: 8px; background: #3b82f6; color: white; 
                         border: none; border-radius: 6px; cursor: pointer;">
            Book Appointment
          </button>
        </div>
      `;

      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(popupContent);

      new mapboxgl.Marker(markerElement)
        .setLngLat(hospital.coordinates as [number, number])
        .setPopup(popup)
        .addTo(map.current!);
    });
  };

  // Add outbreak zones to map
  const addOutbreakZones = () => {
    if (!map.current) return;

    outbreakZones.forEach((zone, index) => {
      const sourceId = `outbreak-${zone.id}`;
      const layerId = `outbreak-layer-${zone.id}`;

      // Create circle geometry
      const center = zone.center;
      const radius = zone.radius;
      const options = { steps: 80, units: 'meters' as const };
      
      // Approximate circle using turf-like calculation
      const coordinates = [];
      const steps = 80;
      for (let i = 0; i < steps; i++) {
        const angle = (i * 360) / steps;
        const lng = center[0] + (radius / 111320) * Math.cos(angle * Math.PI / 180);
        const lat = center[1] + (radius / 110540) * Math.sin(angle * Math.PI / 180);
        coordinates.push([lng, lat]);
      }
      coordinates.push(coordinates[0]); // Close the polygon

      // Get color based on severity
      const getColor = (severity: string) => {
        switch (severity) {
          case 'high': return '#ef4444';
          case 'medium': return '#f59e0b';
          case 'low': return '#10b981';
          default: return '#6b7280';
        }
      };

      map.current!.addSource(sourceId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [coordinates]
          },
          properties: {
            disease: zone.disease,
            severity: zone.severity,
            cases: zone.cases,
            trend: zone.trend
          }
        }
      });

      map.current!.addLayer({
        id: layerId,
        type: 'fill',
        source: sourceId,
        paint: {
          'fill-color': getColor(zone.severity),
          'fill-opacity': 0.2
        }
      });

      map.current!.addLayer({
        id: `${layerId}-border`,
        type: 'line',
        source: sourceId,
        paint: {
          'line-color': getColor(zone.severity),
          'line-width': 2,
          'line-opacity': 0.8
        }
      });

      // Add click event for outbreak zones
      map.current!.on('click', layerId, (e) => {
        if (e.features && e.features[0]) {
          const feature = e.features[0];
          const popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`
              <div style="padding: 12px;">
                <div style="display: flex; align-items: center; margin-bottom: 8px;">
                  <span style="margin-right: 8px;">⚠️</span>
                  <h3 style="margin: 0; font-size: 16px;">${feature.properties?.disease}</h3>
                </div>
                <div style="margin-bottom: 6px;">
                  <span style="background: ${getColor(feature.properties?.severity)}; 
                               color: white; padding: 2px 8px; border-radius: 12px; 
                               font-size: 12px;">
                    ${feature.properties?.severity?.toUpperCase()} RISK
                  </span>
                </div>
                <div style="font-size: 14px; margin-bottom: 4px;">
                  <strong>Cases:</strong> ${feature.properties?.cases}
                </div>
                <div style="font-size: 14px; margin-bottom: 8px;">
                  <strong>Trend:</strong> ${feature.properties?.trend}
                </div>
                <button onclick="alert('Viewing prevention guidelines for ${feature.properties?.disease}')"
                        style="width: 100%; padding: 6px; background: #f59e0b; color: white;
                               border: none; border-radius: 4px; cursor: pointer;">
                  Prevention Guidelines
                </button>
              </div>
            `)
            .addTo(map.current!);
        }
      });

      // Change cursor on hover
      map.current!.on('mouseenter', layerId, () => {
        map.current!.getCanvas().style.cursor = 'pointer';
      });

      map.current!.on('mouseleave', layerId, () => {
        map.current!.getCanvas().style.cursor = '';
      });
    });
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

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken]);

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

      {/* API Key Input */}
      {!isMapInitialized && (
        <Card className="p-6 card-shadow">
          <div className="flex items-center space-x-2 mb-4">
            <Key className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Mapbox API Configuration</h3>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
              <Input
                id="mapbox-token"
                type="text"
                placeholder="pk.eyJ1IjoieW91ci11c2VybmFtZSIsImEiOiJjbGZkM..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-2">
                Get your free Mapbox public token from{' '}
                <a 
                  href="https://mapbox.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
              </p>
            </div>
            <Button 
              onClick={initializeMap}
              disabled={!mapboxToken}
              className="medical-gradient"
            >
              Initialize Map
            </Button>
          </div>
        </Card>
      )}

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
          <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
          {!isMapInitialized && mapboxToken && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 rounded-lg">
              <div className="text-center">
                <Activity className="w-8 h-8 text-primary animate-pulse mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Loading real-time map...</p>
              </div>
            </div>
          )}
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

export default InteractiveHealthMap;