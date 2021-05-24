"use strict";
const Poi = require("../models/poi");
const Comment = require("../models/comment");
const User = require("../models/user");
const sanitize = require("../Services/sanitize-html");
const Joi = require("@hapi/joi");

const Social = {
  addComment: {
    validate: {
      payload: {
        comment: Joi.string().required().min(2).max(280)
      },
      options: {
        abortEarly: true
      },
      failAction: function(request, h, error) {

        const poiId = request.params.id;

        return h
          .redirect("/report/", {
            title: "Comment error",
            errors: error.details
          }).takeover();
      }
    },
    handler: async function(request, h) {
      let poiId;
      try {
        const data = request.payload;

        // get the point id
        poiId = request.params.id;

        // get the logged in user
        const loggedInUser = request.auth.credentials.id;

        // sanitise html from inputs
        const comment = sanitize(data.comment);

        const newComment = new Comment({
          date: new Date(Date.now()),
          poi: poiId,
          user: loggedInUser,
          comment
        });
        const createdComment = await newComment.save();
      } catch (error) {
        console.log(error);
      }
      return h.redirect("/view/" + poiId);
    },
    payload: {
      multipart: true,
      output: 'data',
      maxBytes: 209715200,
      parse: true
    }
  }
}

module.exports = Social;