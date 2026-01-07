import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import { errors } from 'celebrate';
import productRouter from './routes/product';
import orderRouter from './routes/order';
import errorHandler from './middlewares/error-handler';
import { requestLogger, errorLogger } from './middlewares/logger';

const { PORT = 3000, DB_ADDRESS } = process.env;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(errors());

app.use(errorLogger);

app.use(errorHandler);

mongoose.connect(DB_ADDRESS as string);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
