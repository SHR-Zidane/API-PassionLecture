import { Request, Response } from 'express';
import User from '../models/User';
import { DatabaseSync } from 'node:sqlite';

// get tous les users
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAndCountAll();
        return res.json({
            error: false,
            result: users
        });
    } catch (error: any) {
        console.error(error);
        return res.json({
            error: true,
            message: error.message || 'Internal Server Error'
        });
    }
}

// create un user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        return res.json({
            error: false,
            result: user
        });
    } catch (error: any) {
        return res.json({
            error: true,
            message: error.message
        });
    }
};

// get un user
export const getUser = async (req: Request, res: Response) => {
    const userId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({
            error: true,
            message: 'User not found'
        });
    }
    res.json({
        error: false,
        result: user
    });
    
};


// update un user
export const updateUser = async (req: Request, res: Response) => {
    const userId = Number(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id);
    const user = await User.findByPk(userId);
    if (!user) {
        return res.status(404).json({
            error: true,
            message: 'User not found'
        });
    }
    await user.update(req.body);
    res.json({
        error: false,
        result: user
    });
};

// delete un user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'User not found'
            });
        }

        await user.destroy();
        
        return res.json({
            error: false,
            message: 'User deleted'
        });
    } catch (error: any) {
        console.error("ERREUR DELETE:", error); 
        return res.status(500).json({
            error: true,
            message: error.message
        });
    }
};
