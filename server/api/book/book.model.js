'use strict';

import mongoose from 'mongoose';

var BookSchema = new mongoose.Schema({
  name: String,
  author: Array,
  active: Boolean,
  price: Number,
  category: String,
  image: String,
  isbn: String,
  weight: String,
  releaseDate: String,
  updatedAt: String,
  createdAt: String,
  modifiedBy: String
});

export default mongoose.model('Book', BookSchema);
