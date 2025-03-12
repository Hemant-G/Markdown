import mongoose, { Schema } from 'mongoose';

const noteSchema = new Schema({
  title: String,
  pages: [{
    title: String,
    content: String,
  }],
  authorId: String,
});

export const Note = mongoose.model('Note', noteSchema)