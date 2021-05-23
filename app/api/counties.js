'use strict';

const County = require('../models/counties');
const Boom = require("@hapi/boom");

const Counties = {
  find: {
    auth: false,
    handler: async function (request, h) {
      const counties = await County.find();
      return counties;
    },
  },
//api test to find one county and if not found throw error
  findOne: {
    auth: false,
      handler: async function (request, h) {
      try {
        const county = await County.findOne({ _id: request.params.id });
        if (!county) {
          return Boom.notFound("No county with this id");
        }
        return county;
      } catch (err) {
        return Boom.notFound("No county with this id");
      }
    },
  },
//api test to create one county and if not found throw error
  create: {
    auth: false,
      handler: async function (request, h) {
      const data = request.payload;
      const newCounty = new County({
        name: data.name
      });
      const county = await newCounty.save();
      if (county) {
        return h.response(county).code(201);
      }
      return Boom.badImplementation("error creating county");
    },
  },
//api test to delete all counties and if not found throw error
  deleteAllCounties: {
    auth: false,
      handler: async function (request, h) {
      await County.deleteMany({});
      return { success: true };
    },
  },
//api test to delete one county and if not found throw error
  deleteOne: {
    auth: false,
      handler: async function (request, h) {
      const county = await County.deleteOne({ _id: request.params.id });
      if (county) {
        return { success: true };
      }
      return Boom.notFound("id not found");
    },
  },
};

module.exports = Counties;