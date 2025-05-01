import express from 'express';
import cors from 'cors';

import { PORT } from './config/env.js'; 

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import profileRouter from './routes/profile.routes.js';
import connectToDatabase from './database/mongodb.js'; 
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import topicRouter from './routes/topic.routes.js';
import templateRouter from './routes/template.routes.js';
import submissionRouter from './routes/submission.routes.js';
import commentRouter from './routes/comment.routes.js';
import likeRouter from './routes/like.routes.js';
import formResponseRouter from './routes/formResponse.routes.js';
import uploadRouter from './routes/upload.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express(); 

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(arcjetMiddleware);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));


app.use('/api/v1/upload', uploadRouter);
app.use('/api/v1/topics', topicRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', arcjetMiddleware, userRouter);
app.use('/api/v1/profiles', arcjetMiddleware, profileRouter);
app.use('/api/v1/templates', arcjetMiddleware, templateRouter);
app.use('/api/v1/submissions', arcjetMiddleware, submissionRouter);
app.use('/api/v1/comments', arcjetMiddleware, commentRouter);
app.use('/api/v1/likes', arcjetMiddleware, likeRouter);
app.use('/api/v1/form-responses', arcjetMiddleware, formResponseRouter);

app.use(errorMiddleware);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}/`);

    await connectToDatabase();
    });

export default app; 