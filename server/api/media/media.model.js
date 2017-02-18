'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
    
var MediaSchema = new mongoose.Schema({
  originalFilename: String,
  path: String,
  size: String,
  type: String,
  name: String,
  uid: {type: ObjectId, ref: "User"},
  uname: String,
  uemail: String,
  active: Boolean
});

export default mongoose.model('Media', MediaSchema);
