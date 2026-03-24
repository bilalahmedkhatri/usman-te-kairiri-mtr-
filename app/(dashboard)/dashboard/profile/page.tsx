import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      company: true,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
      </div>
      <ProfileForm
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          country: user.country,
          role: user.role,
          image: user.image,
        }}
        company={user.company ? {
          id: user.company.id,
          name: user.company.name,
          address: user.company.address,
          phone: user.company.phone,
        } : null}
      />
    </div>
  );
}
