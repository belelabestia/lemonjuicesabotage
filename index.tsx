import express, { type Request, type Response } from 'express';
import html from './src/lib/html';
import { Article } from './src/pages/article';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  html.send(res, <Article />, 'Home');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
