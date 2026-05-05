import { Request, Response } from 'express';
import Category from '../models/Category';

// get tous les catégories
export const getCategories = async (req: Request, res: Response) => {
    const categories = await Category.findAndCountAll();
    res.json({
        error: false,
        result: categories
    });
};

// get une catégorie
export const getCategory = async (req: Request, res: Response) => {
    const categoryId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const category = await Category.findByPk(categoryId);
    if (!category) {
        return res.json({
            error: true,
            message: 'Category not found'
        });
    }
    res.json({
        error: false,
        result: category
    });
};

// create une catégorie
export const createCategory = async (req: Request, res: Response) => {
    const category = await Category.create(req.body);
    res.json({
        error: false,
        result: category
    });
};

// update une catégorie
export const updateCategory = async (req: Request, res: Response) => {
    const categoryId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const category = await Category.findByPk(categoryId);
    if (!category) {
        return res.json({
            error: true,
            message: 'Category not found'
        });
    }
    await category.update(req.body);
    res.json({
        error: false,
        result: category
    });
};

// delete une catégorie
export const deleteCategory = async (req: Request, res: Response) => {
    const categoryId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const category = await Category.findByPk(categoryId);
    if (!category) {
        return res.json({
            error: true,
            message: 'Category not found'
        });
    }
    await category.destroy();
    res.json({
        error: false,
        message: 'Category deleted'
    });
};
