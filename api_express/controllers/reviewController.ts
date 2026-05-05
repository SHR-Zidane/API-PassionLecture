import { Request, Response } from 'express';
import Review from '../models/Review';
import { DatabaseSync } from 'node:sqlite';

// get tous les reviews
export const getReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await Review.findAndCountAll({
            include: ['user', 'book']
        });
        return res.json({
            error: false,
            result: reviews
        });
    } catch (error: any) {
        console.error(error);
        return res.json({
            error: true,
            message: error.message || 'Internal Server Error'
        });
    }
}

// create une review
export const createReview = async (req: Request, res: Response) => {
    try {
        const review = await Review.create(req.body);
        return res.json({
            error: false,
            result: review
        });
    } catch (error: any) {
        return res.json({
            error: true,
            message: error.message
        });
    }
};

// get une review
export const getReview = async (req: Request, res: Response) => {
    const reviewId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const review = await Review.findByPk(reviewId, {
        include: ['user', 'book']
    });
    if (!review) {
        return res.json({
            error: true,
            message: 'Review not found'
        });
    }
    res.json({
        error: false,
        result: {
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            published_at: review.published_at,
            user: review.user,
            book: review.book,
            created_at: review.created_at,
            updated_at: review.updated_at
        }
    });
};


// update une review
export const updateReview = async (req: Request, res: Response) => {
    const reviewId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const review = await Review.findByPk(reviewId);
    if (!review) {
        return res.json({
            error: true,
            message: 'Review not found'
        });
    }
    await review.update(req.body);
    res.json({
        error: false,
        result: review
    });
};

// delete une review
export const deleteReview = async (req: Request, res: Response) => {
    const reviewId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const review = await Review.findByPk(reviewId);
    if (!review) {
        return res.json({
            error: true,
            message: 'Review not found'
        });
    }
    await review.destroy();
    res.json({
        error: false,
        message: 'Review deleted'
    });
};
