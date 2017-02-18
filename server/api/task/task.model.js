'use strict';

import mongoose from 'mongoose';

var TaskSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  image: String,
  category: String,
  updatedAt: String,
  createdAt: String,
  modifiedBy: String
});

export default mongoose.model('Task', TaskSchema);
