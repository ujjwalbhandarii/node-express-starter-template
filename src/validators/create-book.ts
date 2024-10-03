import { z } from "zod";

const createBookSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title cannot exceed 100 characters"),
  author: z
    .string()
    .min(3, "Author name must be at least 3 characters long")
    .max(50, "Author name cannot exceed 50 characters"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters long")
    .max(5000, "Content cannot exceed 5000 characters"),
  cover: z
    .string()
    .url("Cover must be a valid URL")
    .min(1, "Cover Image is required"),
});

type CreateBookBody = z.infer<typeof createBookSchema>;

export { createBookSchema, CreateBookBody };
