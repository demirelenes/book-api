import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'author', required: true },
  price: { type: Number, required: true, min: 0 },
  isbn: { type: String, required: true, unique: true },
  language: { type: String, required: true },
  numberOfPages: { type: Number, required: true, min: 1 },
  publisher: { type: String, required: true }
});

export default model('book', bookSchema);
