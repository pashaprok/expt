import express, {Application} from "express";
import bodyParser from 'body-parser'
import postRouter from './routes/postRoutes'

const app: Application = express();
app.use(bodyParser.json());

app.use('/api/posts', postRouter);

app.use('/', (req, res) => {
    res.send('hello, world!');
});

export default app;