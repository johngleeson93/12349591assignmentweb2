'use strict';

const Comment = require('../models/comment');
const Boom = require("@hapi/boom");

const Comments = {
  find: {
    auth: false,
    handler: async function (request, h) {
      const comments = await Comment.find();
      return comments;
    },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const comment = await Comment.findOne({ _id: request.params.id });
        if (!comment) {
          return Boom.notFound("No Comment with this id");
        }
        return comment;
      } catch (err) {
        return Boom.notFound("No Comment with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      const data = request.payload;
      const newComment = new Comment({
        comment: data.comment,
        poi: data.poi,
        user: data.user
      });
      const comment = await newComment.save();
      if (comment) {
        return h.response(comment).code(201);
      }
      return Boom.badImplementation("error creating comment");
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      await Comment.deleteMany({});
      return { success: true };
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request, h) {
      const comment = await Comment.deleteOne({ _id: request.params.id });
      if (comment) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
};

module.exports = Comments;