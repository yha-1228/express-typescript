import { Request, Response, NextFunction } from "express";

export const errorLogHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof Error) {
    console.error(err.stack);
  }

  next(err);
};
