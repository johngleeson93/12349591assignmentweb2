"use strict";
const Boom = require("@hapi/boom");
const User = require("../models/user");
const utils = require("./utils");

const Users = {
  find: {
    auth: false,
    handler: async function(request, h) {
      const user = await User.find();
      return user;
    }
  },
  findOne: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await User.findOne({ _id: request.params.id });
        if (!user) {
          return Boom.notFound("No user with this id");
        }
        return user;
      } catch (err) {
        return Boom.notFound("No user with this id");
      }
    }
  },
  create: {
    auth: false,
    handler: async function(request, h) {
      const data = request.payload;
      const newUser = new User({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      });
      const user = await newUser.save();
      if (user) {
        return h.response(user).code(201);
      }
      return Boom.badImplementation("error creating user");
    }
  },
  deleteOne: {
    auth: false,
    handler: async function(request, h) {
      const response = await User.deleteOne({ _id: request.params.id });
      if (response.deletedCount == 1) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    }
  },
  deleteAllUsers: {
    auth: false,
    handler: async function(request, h) {
      await User.remove({});
      return { success: true };
    }
  },
  authenticate: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await User.findOne({ email: request.payload.email });
        if (!user) {
          return Boom.unauthorized("User not found");
        } else if (user.password !== request.payload.password) {
          return Boom.unauthorized("Invalid password");
        } else {
          const token = utils.createToken(user);
          return h.response({ success: true, token: token }).code(201);
        }
      } catch (err) {
        return Boom.notFound("internal db failure");
      }
    }
  }

};
module.exports = Users;