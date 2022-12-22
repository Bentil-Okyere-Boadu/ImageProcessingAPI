import express from 'express';
import imagesRoute from './src/routes/imagesRoute';
import notFound from './src/middleware/notFound';
import errorHandler from './src/middleware/errorHandler';


const app = express();
const port = 3000;


app.get('/api', (_req, res) => {
  res.json('hello world')
})

app.use("/image", imagesRoute)
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
});

export default app
