import { Book } from "../models/books.model.js";

export const createBook = async (req, res) => {
    try {
        const { title, year, author } = req.body;

        if (!title || !year || !author?.name) {
            return res.status(400).json({ 
                success: false, 
                message: "Title, year, and author name are required" 
            });
        }

        const book = new Book({ title, year, author });
        await book.save();

        res.status(201).json({ 
            success: true, 
            message: "Book created successfully", 
            data: book 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Internal server error", 
            error: error.message 
        });
    }
};

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ success: true, data: books });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Internal server error", 
            error: error.message 
        });
    }
};

export const getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Internal server error", 
            error: error.message 
        });
    }
};

export const updateBook = async (req, res) => {
    try {
        const { title, year, author } = req.body;

        if (!title && !year && !author) {
            return res.status(400).json({ 
                success: false, 
                message: "At least one field (title, year, or author) is required for update" 
            });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, year, author },
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        res.status(200).json({ 
            success: true, 
            message: "Book updated successfully", 
            data: updatedBook 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Internal server error", 
            error: error.message 
        });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        res.status(200).json({ success: true, message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Internal server error", 
            error: error.message 
        });
    }
};
