import express, {Application, Request, Response} from 'express'
import postRouter from './routes/postRoutes'
import userRouter from './routes/userRoutes'
import passport from "passport";
import { HttpError } from "http-errors";
import cityRoutes from "./routes/cityRoutes";
import { getWeather } from "./controllers/weatherController";

const app: Application = express();
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);
app.use('/api/cities', cityRoutes);
app.get('/api/weather', passport.authenticate('jwt'), getWeather);

app.use('/', (req: Request, res: Response) => {
    res.send('hello, world!');
});

app.use((err: any, res: Response) => {
    if (err instanceof HttpError) {
        return res.status(err.statusCode || 500).json({
            message: err.message,
            code: err.statusCode,
        })
    }

    return res.status(500).json({
        message: err.toString(),
        stack: err.stack,
    });
})

export default app;