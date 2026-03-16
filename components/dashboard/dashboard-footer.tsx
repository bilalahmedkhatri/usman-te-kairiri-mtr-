"use client";

import { useQuery } from "@tanstack/react-query";
import { settingsApi } from "@/lib/api";
import Link from "next/link";

export function DashboardFooter() {
  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: () => settingsApi.getAll(),
  });

  const currentYear = new Date().getFullYear();
  const copyrightYear = settings?.copyright_year || currentYear;

  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold mb-4">
              {settings?.company_name || "TE KAIRIRI MOTORS"}
            </h3>
            {settings?.address && (
              <p className="text-sm text-muted-foreground mb-2">
                {settings.address}
              </p>
            )}
            {settings?.phone && (
              <p className="text-sm text-muted-foreground mb-2">
                Phone: {settings.phone}
              </p>
            )}
            {settings?.license_number && (
              <p className="text-sm text-muted-foreground">
                License# : {settings.license_number}
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Dashboard</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/inventory" className="text-muted-foreground hover:text-foreground">
                  Inventory Management
                </Link>
              </li>
              <li>
                <Link href="/dashboard/orders" className="text-muted-foreground hover:text-foreground">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/dashboard/customers" className="text-muted-foreground hover:text-foreground">
                  Customers
                </Link>
              </li>
              <li>
                <Link href="/dashboard/reports" className="text-muted-foreground hover:text-foreground">
                  Reports
                </Link>
              </li>
              <li>
                <Link href="/dashboard/settings" className="text-muted-foreground hover:text-foreground">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Emails */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              {settings?.email_primary && (
                <li>
                  <a
                    href={`mailto:${settings.email_primary}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {settings.email_primary}
                  </a>
                </li>
              )}
              {settings?.email_info && (
                <li>
                  <a
                    href={`mailto:${settings.email_info}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Info: {settings.email_info}
                  </a>
                </li>
              )}
              {settings?.email_manager && (
                <li>
                  <a
                    href={`mailto:${settings.email_manager}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Manager: {settings.email_manager}
                  </a>
                </li>
              )}
              {settings?.email_sales && (
                <li>
                  <a
                    href={`mailto:${settings.email_sales}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Sales: {settings.email_sales}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Additional Info */}
          <div>
            <h3 className="font-semibold mb-4">Information</h3>
            <p className="text-sm text-muted-foreground">
              Professional vehicle export services worldwide. Trusted by customers
              across multiple countries and regions.
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {copyrightYear} {settings?.company_name || "TE KAIRIRI MOTORS"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}