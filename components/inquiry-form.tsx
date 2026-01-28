"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Vehicle } from "@/lib/api";
import { Loader2, Mail, MessageCircle } from "lucide-react";

interface InquiryFormProps {
  vehicle: Vehicle;
}

export function InquiryForm({ vehicle }: InquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const { mutate: submitInquiry, isPending } = useMutation({
    mutationFn: async (data: typeof formData) => {
      // In production, this would call an API endpoint
      // For now, we'll use mailto as fallback
      const subject = `Inquiry about ${vehicle.title || `${vehicle.make} ${vehicle.model}`}`;
      const body = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nMessage:\n${data.message}\n\nVehicle: ${vehicle.title || `${vehicle.make} ${vehicle.model} ${vehicle.year}`}\nStock Number: ${vehicle.stock_number || "N/A"}`;
      window.location.href = `mailto:tokyointernationaljp@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    },
    onSuccess: () => {
      alert("Your inquiry has been sent! We'll contact you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry(formData);
  };

  const whatsappMessage = `Hello, I'm interested in this vehicle:\n${vehicle.title || `${vehicle.make} ${vehicle.model} ${vehicle.year}`}\nStock Number: ${vehicle.stock_number || "N/A"}\n\nPlease provide more information.`;
  const whatsappUrl = `https://wa.me/819040268828?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inquiry About This Vehicle</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Ask about pricing, shipping, inspection, or any other questions..."
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Send Inquiry
              </>
            )}
          </Button>
        </form>

        <div className="border-t pt-4 space-y-2">
          <p className="text-sm font-medium">Or contact us directly:</p>
          <div className="flex flex-col gap-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Us
              </Button>
            </a>
            <a href="mailto:tokyointernationaljp@gmail.com">
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Email Sales
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
