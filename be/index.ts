import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRouter from './routes/userRoutes';
import seasonsRouter from './routes/seasonsRoutes';
import teamRouter from './routes/teamRoutes';
import contactRoutes from './routes/contactRoutes';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import auth from './middlewares/authMiddleware';
import {
  protectedGameResultsRouter,
  unprotectedGameResultsRouter,
} from './routes/gameResultsRoutes';
import {
  protectedTeamRegistrationRouter,
  unprotectedTeamRegistrationRouter,
} from './routes/teamRegistrationRoutes';

dotenv.config();

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  credentials: true,
  origin: whitelist,
};

const app = express();
const port = process.env.PORT;
const dbUri = process.env.DB_URI as string;

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use('/', userRouter);
app.use('/seasons', seasonsRouter);
app.use('/game-results', unprotectedGameResultsRouter);
app.use('/teams', teamRouter);
app.use('/contact', contactRoutes);
app.use('/team-registration', unprotectedTeamRegistrationRouter);

app.use(auth);

app.use('/game-results', protectedGameResultsRouter);
app.use('/team-registration', protectedTeamRegistrationRouter);

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  });
