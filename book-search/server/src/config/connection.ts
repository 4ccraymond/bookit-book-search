// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

// const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks';
// console.log('Connecting to MongoDB...');

// mongoose.connect(connectionString);

// const db = mongoose.connection;

// db.on('error', (err) => {
//   console.error('❌ MongoDB connection error:', err.message);
// });

// db.once('open', () => {
//   console.log('✅ MongoDB connection opened!');
// });

// export default db;

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Database connected.');
    return mongoose.connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed.');
  }
};

export default db;