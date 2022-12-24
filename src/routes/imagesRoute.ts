import { Router } from 'express';
import getImage from '../controllers/imageController';

const imagesRoute = Router();

imagesRoute.get('/', getImage);

export default imagesRoute;
