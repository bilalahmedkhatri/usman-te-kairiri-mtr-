import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

const regions = [
  {
    name: "East Africa",
    offices: [
      { city: "Mombasa", country: "Kenya", phone: "+254 700 123 456", email: "africa@carsint.com" },
      { city: "Dar es Salaam", country: "Tanzania", phone: "+255 700 987 654", email: "tanzania@carsint.com" }
    ]
  },
  {
    name: "Caribbean",
    offices: [
      { city: "Kingston", country: "Jamaica", phone: "+1 876 555 1234", email: "carib@carsint.com" },
      { city: "Nassau", country: "Bahamas", phone: "+1 242 555 6789", email: "bahamas@carsint.com" }
    ]
  },
  {
    name: "Oceania",
    offices: [
      { city: "Auckland", country: "New Zealand", phone: "+64 9 123 4567", email: "nz@carsint.com" }
    ]
  }
];

export default function RegionalContactsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-heading mb-6">Regional Offices</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          We have agents and partners worldwide to assist with your import process locally.
        </p>
      </div>

      <div className="grid gap-12 max-w-4xl mx-auto">
        {regions.map((region) => (
          <div key={region.name}>
            <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">{region.name}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {region.offices.map((office) => (
                <Card key={office.city}>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" /> {office.city}, {office.country}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <a href={`tel:${office.phone}`} className="hover:text-foreground">{office.phone}</a>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <a href={`mailto:${office.email}`} className="hover:text-foreground">{office.email}</a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
