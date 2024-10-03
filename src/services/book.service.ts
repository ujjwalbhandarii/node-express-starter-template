import { prisma } from "../utils/prisma.js";
import { generateSlug } from "../utils/generate-slug.js";
import type { CreateBookBody } from "../validators/create-book.js";

export class BookService {
  async getAllBooks() {
    return await prisma.book.findMany();
  }

  async createBook(bookData: CreateBookBody) {
    const slug = await generateSlug(bookData.title);

    return await prisma.book.create({
      data: {
        ...bookData,
        slug,
      },
    });
  }

  async getBookById(id: string) {
    return await prisma.book.findFirst({
      where: { id },
    });
  }
}

// Create a singleton instance
export const bookService = new BookService();
