import { Request, Response, NextFunction } from "express";

import { ApiError } from "../utils/api-errors.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
    });
  }

  // // Handling Prisma errors
  // if (err instanceof PrismaClientKnownRequestError) {
  //   if (err.code === "P2002") {
  //     return res.status(400).json({
  //       message: "Credential Already Taken!",
  //     });
  //   }
  //   if (err.code === "P2021") {
  //     return res.status(404).json({
  //       message: "Resource Not Found",
  //     });
  //   }
  // }

  console.error("Unexpected error:", err);

  console.error(err);
  return res.status(500).json({
    message: "Internal Server Error",
  });
};
