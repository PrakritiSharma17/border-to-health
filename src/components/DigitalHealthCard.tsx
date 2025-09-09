import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  User, 
  Calendar, 
  MapPin, 
  Shield, 
  Heart, 
  Download, 
  Share2,
  QrCode,
  Fingerprint
} from "lucide-react";

export const DigitalHealthCard = () => {
  const healthCardData = {
    id: "ABHA-1234-5678-9012",
    name: "John Doe",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    bloodGroup: "O+",
    address: "123 Main Street, Delhi, India 110001",
    emergencyContact: "+91-9876543210",
    issueDate: "2023-01-15",
    expiryDate: "2028-01-15",
    migrantStatus: "Interstate Migrant",
    visaNumber: "N/A",
    lastUpdated: "2024-01-10",
  };

  const medicalInfo = {
    allergies: ["Penicillin", "Peanuts"],
    chronicConditions: ["Hypertension"],
    medications: ["Amlodipine 5mg", "Metformin 500mg"],
    vaccinations: [
      { name: "COVID-19", date: "2023-09-15", status: "Complete" },
      { name: "Hepatitis B", date: "2023-06-10", status: "Complete" },
      { name: "Influenza", date: "2023-10-20", status: "Complete" },
    ],
  };

  const recentVisits = [
    {
      date: "2024-01-05",
      hospital: "AIIMS Delhi",
      doctor: "Dr. Sarah Wilson",
      diagnosis: "Routine Checkup",
      status: "Completed"
    },
    {
      date: "2023-12-20",
      hospital: "Safdarjung Hospital",
      doctor: "Dr. Raj Kumar",
      diagnosis: "Blood Pressure Monitoring",
      status: "Completed"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Digital Health Card
        </h2>
        <p className="text-muted-foreground">
          Your secure digital identity for healthcare access across India
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Digital Health Card */}
        <div className="space-y-6">
          <Card className="p-0 overflow-hidden medical-shadow">
            {/* Card Header */}
            <div className="medical-gradient p-6 text-primary-foreground">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-6 h-6" />
                  <span className="text-sm font-medium">ABHA Digital Health Card</span>
                </div>
                <QrCode className="w-8 h-8" />
              </div>
              
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{healthCardData.name}</h3>
                  <p className="text-primary-foreground/80 text-sm">ID: {healthCardData.id}</p>
                </div>
                <div className="text-right">
                  <div className="text-primary-foreground/80 text-xs">Valid Until</div>
                  <div className="font-semibold">{healthCardData.expiryDate}</div>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Date of Birth</div>
                  <div className="font-medium">{healthCardData.dateOfBirth}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Blood Group</div>
                  <div className="font-medium text-red-600">{healthCardData.bloodGroup}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Gender</div>
                  <div className="font-medium">{healthCardData.gender}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Status</div>
                  <Badge variant="secondary">{healthCardData.migrantStatus}</Badge>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center text-muted-foreground text-xs mb-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  Address
                </div>
                <div className="text-sm">{healthCardData.address}</div>
              </div>

              <div>
                <div className="text-muted-foreground text-xs">Emergency Contact</div>
                <div className="text-sm font-medium">{healthCardData.emergencyContact}</div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Fingerprint className="w-3 h-3 mr-1" />
                  Biometric Verified
                </div>
                <div className="text-xs text-muted-foreground">
                  Updated: {healthCardData.lastUpdated}
                </div>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button className="flex-1" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button className="flex-1" variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share Card
            </Button>
            <Button className="flex-1">
              <QrCode className="w-4 h-4 mr-2" />
              Show QR
            </Button>
          </div>
        </div>

        {/* Medical Information */}
        <div className="space-y-6">
          {/* Medical Summary */}
          <Card className="p-6 card-shadow">
            <h3 className="font-semibold mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-primary" />
              Medical Summary
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Allergies</h4>
                <div className="flex flex-wrap gap-2">
                  {medicalInfo.allergies.map((allergy) => (
                    <Badge key={allergy} variant="destructive" className="text-xs">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Chronic Conditions</h4>
                <div className="flex flex-wrap gap-2">
                  {medicalInfo.chronicConditions.map((condition) => (
                    <Badge key={condition} variant="secondary" className="text-xs">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Current Medications</h4>
                <div className="space-y-1">
                  {medicalInfo.medications.map((medication) => (
                    <div key={medication} className="text-sm p-2 bg-muted/50 rounded">
                      {medication}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Vaccination Records */}
          <Card className="p-6 card-shadow">
            <h3 className="font-semibold mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-accent" />
              Vaccination Records
            </h3>
            
            <div className="space-y-3">
              {medicalInfo.vaccinations.map((vaccination) => (
                <div key={vaccination.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{vaccination.name}</div>
                    <div className="text-xs text-muted-foreground">{vaccination.date}</div>
                  </div>
                  <Badge variant="default" className="text-xs">
                    {vaccination.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Medical History */}
          <Card className="p-6 card-shadow">
            <h3 className="font-semibold mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Recent Medical Visits
            </h3>
            
            <div className="space-y-3">
              {recentVisits.map((visit, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-sm">{visit.hospital}</div>
                    <Badge variant="outline" className="text-xs">{visit.status}</Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div>Dr: {visit.doctor}</div>
                    <div>Diagnosis: {visit.diagnosis}</div>
                    <div>Date: {visit.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};