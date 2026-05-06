import rateLimit from 'express-rate-limit';

export const globalLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10, 
    message: 'doucement, réessaeyez dans une minute.',
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
        return false;
    },
});

