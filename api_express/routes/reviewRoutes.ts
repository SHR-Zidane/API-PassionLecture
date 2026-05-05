import { Router } from "express";
import * as ReviewController from "../controllers/reviewController";

const router = Router();

router.get("/", ReviewController.getReviews);
router.get("/:id", ReviewController.getReview);
router.post("/", ReviewController.createReview);
router.put("/:id", ReviewController.updateReview);
router.delete("/:id", ReviewController.deleteReview);

export default router;
