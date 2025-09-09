import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Heart, MapPin, Video, Bell } from "lucide-react";
import { HealthMap } from "./HealthMap";
import { DigitalHealthCard } from "./DigitalHealthCard";
import { LeafletHealthMap } from "./LeafletHealthMap";
import { useState } from "react";

export const HealthDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Wilson",
      specialty: "General Medicine",
      date: "2024-01-15",
      time: "10:00 AM",
      type: "Video Consultation",
    },
    {
      id: 2,
      doctor: "Dr. Raj Kumar",
      specialty: "Cardiology",
      date: "2024-01-18",
      time: "2:30 PM",
      type: "In-person",
    },
  ];

  const healthAlerts = [
    {
      id: 1,
      type: "medicine",
      message: "Take your blood pressure medication in 2 hours",
      priority: "high",
    },
    {
      id: 2,
      type: "checkup",
      message: "Annual health screening due next week",
      priority: "medium",
    },
  ];

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Heart },
    { id: "map", label: "Find Hospitals", icon: MapPin },
    { id: "health-card", label: "Health Card", icon: CalendarDays },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
      {/* Navigation */}
      <nav className="bg-card border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-primary">MigrantHealth</h1>
            </div>
            <div className="flex space-x-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "ghost"}
                    onClick={() => setActiveTab(item.id)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Welcome back, John Doe
              </h2>
              <p className="text-muted-foreground text-lg">
                Your health records are secure and accessible across all healthcare facilities
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Health Alerts */}
              <Card className="p-6 card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-primary" />
                    Health Alerts
                  </h3>
                  <Badge variant="destructive" className="text-xs">
                    {healthAlerts.length} Active
                  </Badge>
                </div>
                <div className="space-y-3">
                  {healthAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-3 rounded-lg border bg-muted/30 medical-transition hover:bg-muted/50"
                    >
                      <div className="flex items-start justify-between">
                        <p className="text-sm text-foreground">{alert.message}</p>
                        <Badge
                          variant={alert.priority === "high" ? "destructive" : "secondary"}
                          className="text-xs ml-2"
                        >
                          {alert.priority}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Upcoming Appointments */}
              <Card className="p-6 card-shadow lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center">
                    <CalendarDays className="w-5 h-5 mr-2 text-primary" />
                    Upcoming Appointments
                  </h3>
                  <Button size="sm" className="medical-gradient">
                    Book New
                  </Button>
                </div>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="p-4 rounded-lg border bg-card medical-transition hover:shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <Heart className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-foreground">
                                {appointment.doctor}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {appointment.specialty}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {appointment.date} at {appointment.time}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{appointment.type}</Badge>
                          {appointment.type === "Video Consultation" && (
                            <Button size="sm" variant="outline">
                              <Video className="w-4 h-4 mr-1" />
                              Join Call
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center card-shadow medical-transition hover:glow-shadow">
                <div className="text-2xl font-bold text-success">142</div>
                <p className="text-sm text-muted-foreground">Health Score</p>
              </Card>
              <Card className="p-6 text-center card-shadow medical-transition hover:glow-shadow">
                <div className="text-2xl font-bold text-primary">8</div>
                <p className="text-sm text-muted-foreground">Active Medications</p>
              </Card>
              <Card className="p-6 text-center card-shadow medical-transition hover:glow-shadow">
                <div className="text-2xl font-bold text-warning">3</div>
                <p className="text-sm text-muted-foreground">Pending Tests</p>
              </Card>
              <Card className="p-6 text-center card-shadow medical-transition hover:glow-shadow">
                <div className="text-2xl font-bold text-accent">24</div>
                <p className="text-sm text-muted-foreground">Days Since Last Visit</p>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "map" && <LeafletHealthMap />}
        {activeTab === "health-card" && <DigitalHealthCard />}
      </main>
    </div>
  );
};