import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitizer from 'express-mongo-sanitize';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import homeRouter from './routes/homeRoutes';
import userRouter from './routes/userRoutes';
import bookingRouter from './routes/bookingRoutes';
import AppError from './utils/appError';

const app = express();

//set http security headers
app.use(helmet());

app.enable('trust proxy');

// Implement CORS
// app.use(cors());
// Access-Control-Allow-Origin *
// api.Haus.com, front-end Haus.com
// app.use(cors({
//   origin: 'https://www.Haus.com'
// }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 500 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Too many requests from this IP please try again in an hour',
});

// Apply the rate limiting middleware to all requests
app.use('/api', limiter);

// protects against nosql query injection
app.use(mongoSanitizer());

const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

const corsOptns = cors();

app.options('*', corsOptns);
// app.options('/api/v1/tours/:id', cors());

//To access body of a req
app.use(express.json());

// To see cookie sent during authentication
app.use(cookieParser());
// app.get('/', (req, res) => {
//     res.send('this is Haus get');
// });

// app.get('/homes', (req, res) => {
//   res.send('this is Haus all homes');
// });

// app.post('/homes', (req, res) => {
//     console.log(req.body);
//   res.send('home created');
// });

// Routes

//log res headers
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

app.use('/api/v1/homes', homeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err: any, req: any, res: any, next: any) => {
  console.log('within global error handler');

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  let error = { ...err };
  error.message = err.message;
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

export default app;
