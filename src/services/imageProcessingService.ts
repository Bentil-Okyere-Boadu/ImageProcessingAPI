import { searchFile } from './fileService';
import path from 'path';
import { NotFound } from '../errors';
import transformImage from './transformImage';

class ImageProcessor {
  filename: string;
  height: number;
  width: number;
  outputDir: string = path.join(__dirname, '../assets/thumbs');
  inputDir: string = path.join(__dirname, '../../images');

  constructor(filename: string, height: number, width: number) {
    this.filename = filename;
    this.height = height;
    this.width = width;
  }

  checkFileInImages(): boolean {
    return searchFile(this.filename, this.inputDir);
  }

  checkFileInThumbs(): boolean {
    const thumbName: string = this.filename.concat(
      `${this.height}x${this.width}.jpg`
    );
    return searchFile(thumbName, this.outputDir);
  }

  async resize() {
    if (this.checkFileInThumbs()) {
      return this.outputDir.concat(
        this.filename,
        `${this.height}x${this.width}.jpg`
      );
    } else if (this.checkFileInImages()) {
      await transformImage(this.filename, this.width, this.height);
      return path.join(
        this.outputDir,
        this.filename.concat(`${this.height}x${this.width}.jpg`)
      );
    } else throw new NotFound('File not found');
  }
}

export default ImageProcessor;
