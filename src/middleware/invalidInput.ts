import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';


const invalidInput = (_req: Request, res: Response) =>
  res.status(StatusCodes.BAD_REQUEST).send(`Invalid input`);

export default invalidInput;