import { Request, Response } from "express";

import { ApiError } from "../utils/api-errors.js";
import { bookService } from "../services/book.service.js";
import { createBookSchema } from "../validators/create-book.js";
import { tryCatch } from "../middlewares/try-catch.middleware.js";
import { containsRestrictedWords } from "../utils/contains-restricted-word.js";

export const getBooks = tryCatch(async (_: Request, res: Response) => {
  const books = await bookService.getAllBooks();
  res.json({ books });
});

export const createBook = tryCatch(async (req: Request, res: Response) => {
  const parsedBody = createBookSchema.safeParse(req.body);

  if (!parsedBody.success)
    throw ApiError.BadRequest("Validation failed", parsedBody.error.errors);

  const { title, content } = parsedBody.data;

  if (containsRestrictedWords(title) || containsRestrictedWords(content))
    throw ApiError.BadRequest(
      "The title or content contains restricted words and cannot be used."
    );

  const book = await bookService.createBook(parsedBody.data);

  if (!book) throw ApiError.Internal("Unable to create a book");

  res.status(201).json({ book });
});

export const getBook = tryCatch(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) throw ApiError.BadRequest("No id provided");

  const book = await bookService.getBookById(id);

  if (!book) throw ApiError.NotFound("Book not found");

  res.json({ book });
});
