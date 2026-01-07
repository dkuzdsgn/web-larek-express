import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import { Types } from 'mongoose';
import Product, { IProduct } from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find<IProduct>({});
    const { items, total } = req.body;

    let calculatedTotal = 0;

    items.forEach((id: Types.ObjectId) => {
      const product = products.find((p) => p._id.equals(id));

      if (!product) {
        throw new BadRequestError('Товар не найден');
      }

      if (product.price === null) {
        throw new BadRequestError('Товар не продаётся');
      }

      calculatedTotal += product.price;
    });

    if (calculatedTotal !== total) {
      throw new BadRequestError('Неверная сумма заказа');
    }

    res.send({
      id: faker.string.uuid(),
      total,
    });
  } catch (err) {
    next(err);
  }
};

export default createOrder;
