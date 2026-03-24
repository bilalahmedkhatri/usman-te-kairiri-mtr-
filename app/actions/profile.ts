"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  country: z.string().optional(),
  companyName: z.string().optional(),
  companyAddress: z.string().optional(),
  companyPhone: z.string().optional(),
});

export async function updateProfile(data: z.infer<typeof profileSchema>) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized" };
    }

    const validatedData = profileSchema.parse(data);

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { company: true },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Update User
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        country: validatedData.country,
      },
    });

    // Handle Company update/creation
    if (validatedData.companyName) {
      if (user.companyId) {
        await prisma.company.update({
          where: { id: user.companyId },
          data: {
            name: validatedData.companyName,
            address: validatedData.companyAddress,
            phone: validatedData.companyPhone,
          },
        });
      } else {
        const newCompany = await prisma.company.create({
          data: {
            name: validatedData.companyName,
            address: validatedData.companyAddress,
            phone: validatedData.companyPhone,
          },
        });
        await prisma.user.update({
          where: { id: user.id },
          data: { companyId: newCompany.id },
        });
      }
    }

    revalidatePath("/dashboard/profile");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0]?.message || "Validation failed" };
    }
    console.error("Profile update error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}
