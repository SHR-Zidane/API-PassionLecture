import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import Book from '../models/Book';

// Get tous les books
export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.findAndCountAll();
        res.json({
            error: false,
            result: books
        });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
};

// Get un book
export const getBook = async (req: Request, res: Response) => {
    try {
        const bookId = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) as string;
        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({ error: true, message: 'Book not found' });
        }

        res.json({ error: false, result: book });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
};


// Create un book
export const createBook = async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: true, message: 'No file uploaded' });
        }

        const { title, authorId, categoryId, summary, page_count, extract_pdf, publisher, edition_year, cover_image, userId } = req.body;
        const epubPath = path.join('public', 'epub', req.file.filename);

        console.log(req.body);
        console.log(req.file);
        const book = await Book.create({
            title,
            summary,
            page_count,
            extract_pdf,
            publisher,
            edition_year,
            cover_image,
            epubPath: req.file.filename,
            userId,
            authorId,
            categoryId,
        } as any);

        return res.status(201).json({
            error: false,
            result: book
        });

        // const book = await Book.create(req.body);
        // 
        // return res.status(201).json({
        //     error: false,
        //     result: book
        // });
    } catch (error: any) {
        return res.status(500).json({ error: true, message: error.message });
    }
};

// Update un book
export const updateBook = async (req: Request, res: Response) => {
    try {
        const bookId = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) as string;
        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({ error: true, message: 'Book not found' });
        }

        await book.update(req.body);

        res.json({ error: false, result: book });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
};

// Delete un book
export const deleteBook = async (req: Request, res: Response) => {
    try {
        const bookId = (Array.isArray(req.params.id) ? req.params.id[0] : req.params.id) as string;
        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({ error: true, message: 'Book not found' });
        }

        await book.destroy();

        res.json({ error: false, message: 'Book deleted' });
    } catch (error: any) {
        res.status(500).json({ error: true, message: error.message });
    }
};