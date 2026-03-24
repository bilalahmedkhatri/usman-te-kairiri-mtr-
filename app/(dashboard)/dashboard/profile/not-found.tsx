import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserX } from "lucide-react";

export default function ProfileNotFound() {
  return (
    <div className="flex h-[calc(100vh-200px)] items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900/20">
            <UserX className="h-6 w-6 text-orange-600" />
          </div>
          <CardTitle className="text-2xl">User Not Found</CardTitle>
          <CardDescription>
            The profile you are looking for does not exist or has been removed.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild variant="default">
            <Link href="/dashboard">Return to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
