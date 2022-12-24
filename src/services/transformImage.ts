import path from 'path';
import sharp from 'sharp';

const outputDir: string = path.join(__dirname, '../assets/thumbs');

const transformImage = async (
  filename: string,
  width: number,
  height: number
): Promise<void> => {
  const filepath = path.join(__dirname, '../../images', `${filename}.jpg`);
  await sharp(filepath)
    .resize(width, height)
    .toFile(path.join(outputDir, filename.concat(`${height}x${width}.jpg`)));
};

export default transformImage;
