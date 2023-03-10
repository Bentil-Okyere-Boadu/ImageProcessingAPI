import { Request, Response } from 'express';

const notFound = (_req: Request, res: Response) =>
  res.status(404).send(`Resource not found`);

export default notFound;
