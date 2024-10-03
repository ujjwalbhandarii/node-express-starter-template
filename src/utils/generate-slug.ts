import { prisma } from "./prisma";

export const generateSlug = async (title: string): Promise<string> => {
  // Step 1: Convert the title to a lowercase slug with dashes separating words
  let slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove non-alphanumeric characters
    .replace(/\s+/g, "-") // Replace spaces with dashes
    .replace(/-+$/, ""); // Remove trailing dashes

  // Ensure the slug starts with a letter
  if (!/^[a-z]/.test(slug)) {
    slug = `a-${slug}`;
  }

  // Step 2: Ensuring the slug is unique by checking the database
  let uniqueSlug = slug;
  let count = 1;

  while (await checkSlugExists(uniqueSlug)) {
    // If slug exists, append a suffix like "-1", "-2"
    uniqueSlug = `${slug}-${count}`;
    count++;
  }

  return uniqueSlug;
};

export const checkSlugExists = async (slug: string): Promise<boolean> => {
  try {
    const existingBook = await prisma.book.findUnique({
      where: { slug },
    });

    return !!existingBook; // returing false if does not exist
  } catch (error) {
    console.error(error);
    return false;
  }
};
