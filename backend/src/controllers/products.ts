import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/non-found-error';

export const getProducts = (_req: Request, res: Response, next: NextFunction) => Product.find({})
  .then((products) => res.send({
    items: products,
    total: products.length,
  }))
  .catch(next);

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  Product.create(req.body)
    .then((product) => res.status(201).send(product))
    .catch((error) => {
      if (error instanceof MongooseError.ValidationError) {
        return next(
          new BadRequestError('Переданы некорректные данные в методы создания товара, заказа'),
        );
      }
      if (error.code === 11000) {
        return next(
          new ConflictError('Ошибка при создании товара с уже существующим полем title'),
        );
      }
      if (error.code === 404) {
        return next(
          new NotFoundError('Маршрут не найден'),
        );
      }

      return next(error);
    });
};
