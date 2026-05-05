import { Request, Response } from 'express';
import Review from '../models/Review';

// get tous les reviews
export const getReviews = async (req: Request, res: Response) => {
    try {
        const reviews = await Review.findAndCountAll();
        return res.status(200).json({
            error: false,
            result: reviews
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({
            error: true,
            message: error.message || 'Internal Server Error'
        });
    }
};

// create une review
export const createReview = async (req: Request, res: Response) => {
    try {
        const review = await Review.create(req.body);
        return res.status(201).json({
            error: false,
            result: review
        });
    } catch (error: any) {
        return res.status(400).json({
            error: true,
            message: error.message
        });
    }
};

// get une review
export const getReview = async (req: Request, res: Response) => {
    const reviewId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const review = await Review.findByPk(reviewId);
    if (!review) {
        return res.status(404).json({
            error: true,
            message: 'Review not found'
        });
    }
    res.status(200).json({
        error: false,
        result: review
    });
};


// update une review
export const updateReview = async (req: Request, res: Response) => {
    const reviewId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const review = await Review.findByPk(reviewId);
    if (!review) {
        return res.status(404).json({
            error: true,
            message: 'Review not found'
        });
    }
    await review.update(req.body);
    res.status(200).json({
        error: false,
        result: review
    });
};

// delete une review
export const deleteReview = async (req: Request, res: Response) => {
    const reviewId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const review = await Review.findByPk(reviewId);
    if (!review) {
        return res.status(404).json({
            error: true,
            message: 'Review not found'
        });
    }
    await review.destroy();
    res.status(204).json({
        error: false,
        message: 'Review deleted'
    });
};
