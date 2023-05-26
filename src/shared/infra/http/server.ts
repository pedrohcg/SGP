import express, {Request, Response, NextFunction, json} from 'express';
import 'express-async-errors';

import 'reflect-metadata'

import AppError from '../../errors/AppError';
import routes from './routes';
/*import uploadConfig from '@config/upload';
import AppError from '@shared/erros/AppError';
import rateLimiter from './middlewares/rateLimiter';*/

import '../../container';

const app = express();

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});