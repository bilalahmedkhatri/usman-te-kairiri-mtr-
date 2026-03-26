export default function TermsPaymentPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-heading mb-6">Terms & Payment</h1>
        <p className="text-muted-foreground text-lg">
          Please read our terms of service and payment information carefully.
        </p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">1. Payment Terms</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Payment for all vehicles must be made in full within 5 business days of the invoice date.
            We accept payments via Telegraphic Transfer (T/T) to our designated bank account in Japan.
            Please ensure that all bank charges are paid by the sender.
          </p>
          <div className="bg-muted p-6 rounded-lg border">
            <h3 className="font-bold mb-2">Our Bank Details</h3>
            <ul className="list-none space-y-2 text-sm text-foreground">
              <li><strong>Bank Name:</strong> Sumitomo Mitsui Banking Corporation</li>
              <li><strong>Branch:</strong> Yokohama Branch</li>
              <li><strong>Account Name:</strong> TE KAIRIRI MOTORS Co., Ltd.</li>
              <li><strong>Swift Code:</strong> SMBCJPJT</li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">2. Shipping Terms (CNF/CIF)</h2>
          <p className="text-muted-foreground leading-relaxed">
            All vehicle prices are typically quoted as FOB (Free on Board).
            Shipping charges (freight) and insurance (if CIF) are calculated separately based on the
            destination port and vehicle dimensions. The vehicle will only be shipped once the
            full payment (Vehicle Cost + Freight) is received.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">3. Cancellation Policy</h2>
          <p className="text-muted-foreground leading-relaxed">
            If a buyer wishes to cancel an order after payment has been received but before shipment
            reservation, a cancellation fee of 50,000 JPY or 20% of the invoice value (whichever is higher)
            will apply. Once shipment is booked, cancellation may not be possible or will incur
            significantly higher penalties.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Warranty & Claims</h2>
          <p className="text-muted-foreground leading-relaxed">
            Vehicles are sold &quot;as is&quot;. While we provide accurate inspection sheets, we do not offer
            warranties on used vehicles exported outside of Japan. Claims for substantial discrepancies
            must be made within 7 days of vehicle arrival at the destination port, supported by
            independent survey reports.
          </p>
        </section>
      </div>
    </div>
  );
}
