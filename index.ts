import express from 'express';
import lib from './src/lib';
import { home } from './src/api/home';
import { post } from './src/api/post';
import { style } from './src/api/style';

const app = express();
const port = 3000;

const initResult = await lib.Db.init();
if (initResult.branch === 'error') process.exit(1);

app.use(express.json());

app.get('/', home);
app.get('/favicon.ico', (req, res) => res.send());
app.get('/style.css', style);
app.get('/:slug', post);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
