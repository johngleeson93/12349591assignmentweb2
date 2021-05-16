"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
  name: String,
  description: String,
  county: {type: Schema.Types.ObjectId, ref: 'County'}
});

module.exports = Mongoose.model("Poi", poiSchema);
