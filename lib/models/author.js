import { Schema, model } from 'mongoose';

const authorSchema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  birthDate: { type: Date, required: true }
});

export default model('author', authorSchema);
