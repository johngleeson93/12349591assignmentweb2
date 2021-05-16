"use strict";

const Mongoose = require("mongoose");
const Boom = require("@hapi/boom");
const Schema = Mongoose.Schema;

const countySchema = new Schema({
  name: String
});

countySchema.statics.findByName = function(name) {
  return this.findOne({ name : name});
};

module.exports = Mongoose.model("County", countySchema);
