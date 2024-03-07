import express from 'express';
import { router } from './app/routes';
import { cors } from './app/middlewares/cors';

const app = express();
app.use(express.json());
app.use(cors);
app.use(router);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
