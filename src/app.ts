import express, { Application, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import Routes from './routes/index';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config';
import mongoose from 'mongoose';
import { logger } from './config/wistonLogger';
import { log } from 'console';
import { initSocket } from './controllers/notificationController';
import { Server } from 'socket.io';
import http from 'http';
import errorMiddleware from './middlewares/errorMiddleware';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

// Load environment variables
dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);

// app.use(cors(corsOptions));
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

app.use(cookieParser());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(`${__dirname}/public`));

app.use(errorMiddleware);

// connectDB();
const uri = process.env.MONGODB_URI as string;
mongoose.connect(uri, {}).then(() => {
  logger.info('Connected to MongoDB✈️');
});

// Middleware to add db to req
app.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

// Swagger docs
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospypa API',
      version: '1.0.0',
    },
    servers: [
      {
        url: '/api/v1',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/swagger_docs/*.yaml', './routes/*.ts'],
};

const specs = swaggerJsdoc(options);
app.use('/hospypa', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/v1', Routes);

io.on('connection', (socket) => {
  console.log('a user connected 😎');
  socket.on('disconnect', () => {
    console.log('user disconnected 😌');
  });
});

// Passing the Socket.IO instance to the notification controller
initSocket(io);

export { app };
