import express, {Application, Request, Response} from 'express'
import postRouter from './routes/postRoutes'
import userRouter from './routes/userRoutes'

const app: Application = express();
app.use(express.json());

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

app.use('/', (req: Request, res: Response) => {
    res.send('hello, world!');
});

export default app;