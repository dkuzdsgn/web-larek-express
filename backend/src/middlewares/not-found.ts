import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/non-found-error';

const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new NotFoundError('Маршрут не найден'));
};

export default notFound;
