import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/testing')
  } 
  catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
};


