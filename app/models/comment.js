"use strict";

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const commentSchema = new Schema({
  date: Date,
  comment: String,
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  poi: {type: Schema.Types.ObjectId, ref: 'Poi'}
});

commentSchema.statics.findCommentsByPoi = function(poiId) {
  return this.find({ poi : poiId}).lean().populate("user").populate("poi");
};

commentSchema.statics.findCommentsByUser = function(userId) {
  return this.find({ user : userId}).lean().populate("user").populate("poi");
};

module.exports = Mongoose.model("Comment", commentSchema);