'use strict';
const Boom = require('@hapi/boom');
const Poi = require('../models/poi');

const Users = {
  find: {
    auth: false,
    handler: async function (request, h) {
      const users = await Users.find();
      return users;
    },
  },
  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await User.findOne({ _id: request.params.id });
        if (!user) {
          return Boom.notFound("No user with this id");
        }
        return user;
      } catch (err) {
        return Boom.notFound("No user with this id");
      }
    },
  },
  create: {
    auth: false,
    handler: async function (request, h) {
      const data = request.payload;
      const newUser = new User({
        name: data.name,
        description: data.description
      });
      const  user = await newUser.save();
      if (user) {
        return h.response(user).code(201);
      }
      return Boom.badImplementation("error creating user");
    },
  },

};

module.exports = Users;