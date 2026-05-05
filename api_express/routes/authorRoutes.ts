import { Router } from "express";
import * as AuthorController from "../controllers/authorController";

const router = Router();

router.get("/", AuthorController.getAuthors);
router.get("/:id", AuthorController.getAuthor);
router.post("/", AuthorController.createAuthor);
router.put("/:id", AuthorController.updateAuthor);
router.delete("/:id", AuthorController.deleteAuthor);

export default router;
