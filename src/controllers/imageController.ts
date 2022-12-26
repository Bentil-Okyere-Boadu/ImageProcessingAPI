import { NextFunction, Request, Response } from 'express';
import ImageProcessor from '../services/imageProcessingService';
import { InvalidInput } from '../errors';

const getImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const filename = req.query.filename as unknown as string;
  const height = req.query.height as unknown as number;
  const width = req.query.width as unknown as number;
  if( typeof +width === 'string' || typeof +height === 'string'){
    const error = new InvalidInput('Invalid Input. Height and Width must be positive integers.')
    next(error)
  } else{
    try {
      const resizePhoto = new ImageProcessor(filename, +height, +width);
      const newPhoto = await resizePhoto.resize();
      res.status(200).sendFile(newPhoto);
    } catch (error) {
      next(error);
    }
  }
};

export default getImage;
