import express, { NextFunction, Request, Response } from 'express';

/** Logging the reques */
const errorHandling = (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('not found');
    return res.status(404).json({ message: error.message });
};

export default errorHandling;
