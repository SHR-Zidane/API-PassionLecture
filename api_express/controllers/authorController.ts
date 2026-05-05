import { Request, Response } from 'express';
import Author from '../models/Author';

// get tous les auteurs
export const getAuthors = async (req: Request, res: Response) => {
    const authors = await Author.findAndCountAll();
    res.status(200).json({
        error: false,
        result: authors
    });
};

// get un auteur
export const getAuthor = async (req: Request, res: Response) => {
    const authorId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const author = await Author.findByPk(authorId);
    if (!author) {
        return res.status(404).json({
            error: true,
            message: 'Author not found'
        });
    }
    res.status(200).json({
        error: false,
        result: author
    });
};

// create un auteur
export const createAuthor = async (req: Request, res: Response) => {
    const author = await Author.create(req.body);
    res.status(201).json({
        error: false,
        result: author
    });
};

// update un auteur
export const updateAuthor = async (req: Request, res: Response) => {
    const authorId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const author = await Author.findByPk(authorId);
    if (!author) {
        return res.status(404).json({
            error: true,
            message: 'Author not found'
        });
    }
    await author.update(req.body);
    res.status(200).json({
        error: false,
        result: author
    });
};

// delete un auteur
export const deleteAuthor = async (req: Request, res: Response) => {
    const authorId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const author = await Author.findByPk(authorId);
    if (!author) {
        return res.status(404).json({
            error: true,
            message: 'Author not found'
        });
    }
    await author.destroy();
    res.status(204).json({
        error: false,
        message: 'Author deleted'
    });
};
