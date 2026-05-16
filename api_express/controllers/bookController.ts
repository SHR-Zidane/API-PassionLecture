import { Request, Response } from 'express';
import { spawn } from 'child_process';
import multer from 'multer';
import path from 'path';
import Book from '../models/Book';
import Author from '../models/Author';
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
        const coverFolder = path.resolve('public/cover_image');

        const pythonProcess = spawn('python', ['parser.py', epubPath, coverFolder]);

        let pythonData = "";
        let pythonError = "";

        pythonProcess.stdout.on('data', (data) => {
            pythonData += data.toString();
        });

        // Optionnel : on capture les erreurs python pour le log
        pythonProcess.stderr.on('data', (data) => {
            pythonError += data.toString();
        });

        pythonProcess.on('close', async (code) => {
            if (code !== 0) {
                console.error("Erreur Python:", pythonError);
            }

            try {
                const extracted = pythonData ? JSON.parse(pythonData) : {};
                
                // 1. GESTION DE L'AUTEUR (Extraction et vérification)
                let finalAuthorId = req.body.authorId || 1;

                if (extracted.author) {
                    const parts = extracted.author.split(' ');
                    const firstName = parts[0] || 'Inconnu';
                    const lastName = parts.slice(1).join(' ') || '';

                    // findOrCreate cherche si l'auteur existe, sinon il le crée
                    const [authorInstance] = await Author.findOrCreate({
                        where: { first_name: firstName, last_name: lastName } as any,
                        defaults: { first_name: firstName, last_name: lastName } as any
                    });
                    
                    finalAuthorId = authorInstance.id;
                }

                // 2. CRÉATION DU LIVRE
                const book = await Book.create({
                    title: extracted.title || req.body.title || 'Titre inconnu',
                    summary: extracted.summary || req.body.summary || null,
                    epubPath: epubFile.filename,
                    cover_image: extracted.cover_image || coverImage,
                    extract_pdf: extractPdf,
                    authorId: finalAuthorId,
                    categoryId: req.body.categoryId || 1,
                    userId: req.body.userId || null,
                    page_count: req.body.page_count || null,
                    publisher: req.body.publisher || null,
                    edition_year: req.body.edition_year || null,
                } as any);

                return res.status(201).json({ error: false, result: book });

            } catch (err) {
                console.error("Erreur détaillée lors de l'insertion :", err);
                return res.status(500).json({ error: true, message: "Erreur lors du traitement final des données." });
            }
        });

    } catch (error: any) {
        console.error("Erreur Controller:", error);
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