import { Request, Response } from 'express';
import { spawn } from 'child_process';
import multer from 'multer';
import path from 'path';
import Book from '../models/Book';

// Get tous les books
export const getBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.findAndCountAll({
            include: [
                { 
                    association: 'author', 
                    attributes: ['id', 'first_name', 'last_name'] 
                },
                { 
                    association: 'category', 
                    attributes: ['id', 'name'] 
                },
            ],
        });
        res.json({
            error: false,
            result: books
        });
    } catch (error: any) {
    // Ça, ça va s'afficher sur ton PC, pas sur le téléphone
    console.log("----- ERREUR DÉTAILLÉE -----");
    console.error(error); 
    console.log("----------------------------");

    res.status(500).json({ 
        error: true, 
        message: error.message || "Erreur interne du serveur sans message" 
    });
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
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };

        if (!files || !files['epub']) {
            return res.status(400).json({ error: true, message: 'L’epub est obligatoire' });
        }

        const epubFile = files['epub'][0];
        const epubPath = path.resolve(epubFile.path);
        
        const coverImage = files['cover_image'] ? files['cover_image'][0].filename : null;
        const extractPdf = files['extract_pdf'] ? files['extract_pdf'][0].filename : null;

        const pythonProcess = spawn('python', ['parser.py', epubPath]);

        let pythonData = "";

        pythonProcess.stdout.on('data', (data) => {
            pythonData += data.toString();
        });

        pythonProcess.on('close', async (code) => {
            if (code !== 0) {
                console.error("Erreur script Python code:", code);
                return res.status(500).json({ error: true, message: "Erreur lors de l’analyse du livre" });
            }

            try {
                const extracted = pythonData ? JSON.parse(pythonData) : {};

                const book = await Book.create({
                    title: extracted.title || req.body.title || 'Titre inconnu',
                    summary: extracted.summary || req.body.summary || null,
                    epubPath: epubFile.filename,
                    cover_image: coverImage, 
                    extract_pdf: extractPdf,
                    page_count: req.body.page_count || null,
                    publisher: req.body.publisher || null,
                    edition_year: req.body.edition_year || null,
                    userId: req.body.userId || null,
                    authorId: req.body.authorId || 1,
                    categoryId: req.body.categoryId || 1,
                } as any);

                return res.status(201).json({ error: false, result: book });

            } catch (err) {
                console.error("Erreur lors de la création en DB:", err);
                return res.status(500).json({ error: true, message: "Erreur lors de l'enregistrement" });
            }
        });

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