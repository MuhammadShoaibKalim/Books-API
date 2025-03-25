
import express from "express";
const router = express.Router();
import { getBooks, getBook, createBook, updateBook, deleteBook } from "../controllers/book.controller.js";


router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);


export default router;