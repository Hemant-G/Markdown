import mongoose, { Schema } from 'mongoose';

const noteSchema = new Schema({
  _id: String,
  title: String,
  content: String
});

export const Note = mongoose.model('Note', noteSchema)