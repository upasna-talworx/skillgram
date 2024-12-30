import { prisma } from "@calcom/prisma";

export async function fetchCompaniesHandler() {
  try {
    // Fetch companies from the Company table
    const companies = await prisma.company.findMany({
      select: {
        id: true, // Fetch the `id` field
        name: true, // Fetch the `companyName` field
      },
    });

    // Transform the data into the desired format
    return companies.map((company) => ({
      id: company.id,
      label: company.name,
    }));
  } catch (error) {
    // Handle any potential errors (e.g., log them or throw a custom error)
    console.error("Error fetching companies:", error);
    throw new Error("Failed to fetch companies.");
  }
}
