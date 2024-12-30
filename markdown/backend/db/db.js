import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Note');
    console.log("MongoDB connected");
  } 
  catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
};


