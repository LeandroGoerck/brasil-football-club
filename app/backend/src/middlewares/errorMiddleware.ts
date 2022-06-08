import { Request, Response, NextFunction } from 'express';

const validateToken = (
  (err: { status: number, message: string }, req: Request, res: Response, next: NextFunction) => {
    const { status, message } = err;
    if (status !== undefined) return res.status(status).json({ message });
    res.status(500).json({ message: 'Internal server Error' });
    next();
  });

export default validateToken;
