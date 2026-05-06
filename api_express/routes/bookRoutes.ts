import { Router } from "express";
import multer from "multer";
import * as BookController from "../controllers/bookController";
import path from "path";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "epub") {
            cb(null, "public/epub");
        } else if (file.fieldname === "cover_image") {
            cb(null, "public/cover_image");
        } else if (file.fieldname === "extract_pdf") {
            cb(null, "public/extract_pdf");
        } else {
            cb(new Error("Invalid file field"), "");
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
});

const upload = multer({ storage: storage });

router.get("/", BookController.getBooks);
router.get("/:id", BookController.getBook);

router.post("/", upload.fields([
    { name: 'epub', maxCount: 1 },
    { name: 'cover_image', maxCount: 1 },
    { name: 'extract_pdf', maxCount: 1 }
]), BookController.createBook);

router.put("/:id", BookController.updateBook);
router.delete("/:id", BookController.deleteBook);

export default router;