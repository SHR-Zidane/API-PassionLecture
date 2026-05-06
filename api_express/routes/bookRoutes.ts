import { Router } from "express";
import multer from "multer";
import * as BookController from "../controllers/bookController";

const router = Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/epub');
        console.log(file.originalname);
        console.log(req.body);
    },
    filename: function (req, file, cb) {
        console.log(file);
        console.log(file.originalname);
        console.log(req.body);
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get("/", BookController.getBooks);
router.get("/:id", BookController.getBook);
router.post("/", upload.single("epub"), BookController.createBook);
router.put("/:id", BookController.updateBook);
router.delete("/:id", BookController.deleteBook);


export default router;
