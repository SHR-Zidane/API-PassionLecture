import { Request, Response } from 'express';
import Book from '../models/Book';

// get tous les books
export const getBooks = async (req: Request, res: Response) => {
    const books = await Book.findAndCountAll();
    res.status(200).json({
        error: false,
        result: books
    });
};

// get un book
export const getBook = async (req: Request, res: Response) => {
    const bookId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const book = await Book.findByPk(bookId);
    if (!book) {
        return res.status(404).json({
            error: true,
            message: 'Book not found'
        });
    }
    res.status(200).json({
        error: false,
        result: book
    });
};

// create un book
export const createBook = async (req: Request, res: Response) => {
    const book = await Book.create(req.body);
    res.status(201).json({
        error: false,
        result: book
    });
};

// update un book
export const updateBook = async (req: Request, res: Response) => {
    const bookId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const book = await Book.findByPk(bookId);
    if (!book) {
        return res.status(404).json({
            error: true,
            message: 'Book not found'
        });
    }
    await book.update(req.body);
    res.status(200).json({
        error: false,
        result: book
    });
};

// delete un book
export const deleteBook = async (req: Request, res: Response) => {
    const bookId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const book = await Book.findByPk(bookId);
    if (!book) {
        return res.status(404).json({
            error: true,
            message: 'Book not found'
        });
    }
    await book.destroy();
    res.status(204).json({
        error: false,
        message: 'Book deleted'
    });
};
