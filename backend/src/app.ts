import express from 'express';
import cors from 'cors';
import homeRouter from './routes/homeRoutes';
import userRouter from './routes/userRoutes';
import bookingRouter from './routes/bookingRoutes';

const app = express(); 

app.enable('trust proxy');

// Implement CORS
app.use(cors());
// Access-Control-Allow-Origin *
// api.Haus.com, front-end Haus.com
// app.use(cors({
//   origin: 'https://www.Haus.com'
// }))

const corsOptns = cors();

app.options('*', corsOptns);
// app.options('/api/v1/tours/:id', cors());

//To access body of a req
app.use(express.json());

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

app.use('/api/v1/homes', homeRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/bookings', bookingRouter);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler);

export default app;
