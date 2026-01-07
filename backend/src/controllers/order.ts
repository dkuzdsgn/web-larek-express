import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';

export const createOrder = (req: Request, res: Response) => {
  const { total } = req.body;

  Promise.resolve()
    .then(() => {
      res.send({
        id: faker.string.uuid(),
        total,
      });
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

