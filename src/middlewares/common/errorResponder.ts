import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

export const errorResponder = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (res.headersSent) {
    return next(err);
  }

  if (createHttpError.isHttpError(err)) {
    const message = err.statusCode >= 500 ? "Server error" : err.message;
    res.status(err.statusCode).send({ exception: { message } });
  } else if (err instanceof Error) {
    res.status(500).send({ exception: { message: "Server error." } });
  } else {
    res.status(500).send({ exception: "Server error." });
  }
};
