import express from "express";
import "./sequelize";
import User from "./models/User";
import categoryRoutes from "./routes/categoryRoutes";
import authorRoutes from "./routes/authorRoutes";
import booksRoutes from "./routes/bookRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import userRoutes from "./routes/userRoutes";
import { globalLimiter } from "./middleware/rateLimiter";

const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(globalLimiter);

app.use(express.static('public'));

app.get("/api", async (req, res) => {
  res.send("La meilleure API créée par Erdem et Zidane");
});

app.use("/api/categories", categoryRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", userRoutes);


export default app;
