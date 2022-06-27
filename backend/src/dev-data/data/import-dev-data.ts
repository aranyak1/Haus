// to execute this write npx ts-node import-dev-data.ts --import
import fs from 'fs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Home from './../../models/homeModel';
import User from './../../models/userModel';

let envVar = dotenv.config({ path: './../../../config.env' });

// console.log(envVar);

const DB = process.env.DATABASE!.replace(
  '<password>',
  process.env.DATABASE_PASSWORD!,
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'));

// READ JSON FILE
const homes = JSON.parse(fs.readFileSync(`${__dirname}/homes.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));

console.log(process.argv);
// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Home.create(homes);
    await User.create(users, { validateBeforeSave: false });
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// // DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Home.deleteMany();
    await User.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
