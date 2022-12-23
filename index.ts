import express from 'express';
import imagesRoute from './src/routes/imagesRoute';
import notFound from './src/middleware/notFound';
import errorHandler from './src/middleware/errorHandler';
import fs, {promises as fsPromises} from 'fs';
import path from 'path';


const app = express();
const port = 8080;


app.get('/api', (_req, res) => {
  res.json('hello world')
})

app.use("/image", imagesRoute)
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server connected on port ${port}`);

  const buildImageDir = path.join(__dirname, '/images');
  const imageDir = path.join(__dirname, '../images');
  try {
    if (!fs.existsSync(buildImageDir)) {
      fs.mkdirSync(buildImageDir);
      fs.readdirSync(imageDir).forEach((file) => {
        fsPromises.copyFile(
          path.join(imageDir, file),
          `${buildImageDir}/${file}`
        );
      });
      fs.mkdirSync(path.join(__dirname, './src/assets'));
      fs.mkdirSync(path.join(__dirname, './src/assets/thumbs'));
      console.log('images copied successfully')
    }
  } catch (err) {
    console.log(err);
  }

});

export default app
