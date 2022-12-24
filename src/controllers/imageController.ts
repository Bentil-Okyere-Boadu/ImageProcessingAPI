import { NextFunction, Request, Response } from 'express';
import ImageProcessor from '../services/imageProcessingService';

const getImage = async (req: Request, res: Response, next: NextFunction) => {
  const filename = req.query.filename as unknown as string;
  const height = req.query.height as unknown as number;
  const width = req.query.width as unknown as number;
  try {
    const resizePhoto = new ImageProcessor(filename, +height, +width);
    const newPhoto = await resizePhoto.resize();
    res.status(200).sendFile(newPhoto);
  } catch (error) {
    next(error);
  }
};

export default getImage;
