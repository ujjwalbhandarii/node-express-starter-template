import express from "express";

import {
  createBook,
  getBook,
  getBooks,
} from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", createBook);

export default router;
