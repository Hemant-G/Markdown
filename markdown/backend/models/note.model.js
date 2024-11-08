import mongoose, { Schema } from 'mongoose';

const noteSchema = new Schema({
  title: String,
  pages: [{
    title: String,
    content: String,
  }],
});

export const Note = mongoose.model('Note', noteSchema)