"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-heading mb-6">Frequently Asked Questions</h1>
        <p className="text-muted-foreground text-lg">
          Everything you need to know about the import process.
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="border rounded-lg px-4 bg-card">
          <AccordionTrigger className="text-lg font-medium">How long does shipping take?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Shipping times vary by destination. Generally:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Africa (East/South): 4-6 weeks</li>
              <li>Caribbean: 6-8 weeks</li>
              <li>Oceania: 3-4 weeks</li>
              <li>Europe: 5-7 weeks</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" className="border rounded-lg px-4 bg-card">
          <AccordionTrigger className="text-lg font-medium">What documents will I receive?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            We send the following original documents via courier:
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Bill of Lading (B/L)</li>
              <li>Export Certificate (deregistration paper)</li>
              <li>Commercial Invoice</li>
              <li>Inspection Certificate (if required)</li>
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3" className="border rounded-lg px-4 bg-card">
          <AccordionTrigger className="text-lg font-medium">Do you guarantee the vehicle condition?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Yes. We provide accurate inspection sheets for every vehicle. For peace of mind, all vehicles undergo a pre-export inspection. We disclose any known issues upfront in the vehicle report.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4" className="border rounded-lg px-4 bg-card">
          <AccordionTrigger className="text-lg font-medium">Can I cancel my order?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            Orders can be cancelled prior to shipment booking, subject to a cancellation fee to cover administrative costs. Once the vessel is booked, cancellation is more complex and may incur higher costs.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5" className="border rounded-lg px-4 bg-card">
          <AccordionTrigger className="text-lg font-medium">What payment methods do you accept?</AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            We primarily accept Telegraphic Transfer (bank wire transfer) to our Japanese bank account. We also accept Letter of Credit (L/C) for bulk orders upon approval.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
