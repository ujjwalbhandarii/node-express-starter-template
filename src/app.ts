import cors from "cors";
import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";

import BookRoute from "./routes/book.route.js";
import AuthRoute from "./routes/auth.route.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";

config();
const app = express();
const PORT = process.env.PORT || 9999;

app.use(
  cors({
    origin: "*",
    credentials: true,
    allowedHeaders: "*",
  })
);

// Only json and URL encoded body could be received
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

function bootstrap() {
  app.get("/", (_, res) => res.send("Server running..."));

  app.use("/auth", AuthRoute);
  app.use("/book", BookRoute);

  // middlewares
  app.use(errorHandler);

  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
  );
}

bootstrap();
