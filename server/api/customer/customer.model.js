'use strict';

import mongoose from 'mongoose';

var CustomerSchema = new mongoose.Schema({
  name: String,
  address: String,
  photo: String,
  country: String,
  active: Boolean,
  updatedAt: String,
  createdAt: String,
  modifiedBy: String
});

export default mongoose.model('Customer', CustomerSchema);
