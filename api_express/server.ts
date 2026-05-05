import express from "express";
import cors from "cors";
import "./sequelize";
import User from "./models/User";
import categoryRoutes from "./routes/categoryRoutes";
import authorRoutes from "./routes/authorRoutes";
import booksRoutes from "./routes/bookRoutes";
import reviewRoutes from "./routes/reviewRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("La meilleure API créée par Erdem et Zidane");
});

app.use("/api/categories", categoryRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/reviews", reviewRoutes);



app.get("/users", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const user = await User.findByPk(Number(req.params.id));
  user ? res.json(user) : res.status(404).send("User not found");
});

app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

app.put("/users/:id", async (req, res) => {
  const user = await User.findByPk(Number(req.params.id));
  if (!user) return res.status(404).send("User not found");
  await user.update(req.body);
  res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  await User.destroy({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});

export default app;
