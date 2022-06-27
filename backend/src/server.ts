import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';


//handle synchronous errors
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION!  Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

let envVar = dotenv.config({ path: './config.env'});


const DB = process.env.DATABASE!.replace(
  '<password>',
  process.env.DATABASE_PASSWORD!
);
 
mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => { 
  console.log(`App running on port ${port}...`);
});

//handle asynchronous errors
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  // console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('Process terminated!');
  });
});
