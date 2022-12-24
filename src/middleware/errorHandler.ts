import { Request, Response } from 'express';
import { CustomAPIError } from '../errors';
import { StatusCodes } from 'http-status-codes';

const errorHandler = (err: Error, _req: Request, res: Response) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCodes).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Something went wrong. Try again later');
};

export default errorHandler;
