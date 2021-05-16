'use strict';
const Boom = require('@hapi/boom');
const Poi = require('../models/poi');

const Pois = {
  find: {
    auth: false,
    handler: async function (request, h) {
      const pois = await Poi.find();
      return pois;
    },
  },
  findOne: {
    auth: false,
    handler: async function (request, h) {
      try {
        const poi = await Poi.findOne({ _id: request.params.id });
        if (!poi) {
          return Boom.notFound("No Poi with this id");
        }
        return poi;
      } catch (err) {
        return Boom.notFound("No Poi with this id");
      }
    },
  },
  create: {
    auth: false,
    handler: async function (request, h) {
      const data = request.payload;
      const newPoi = new Poi({
        name: data.name,
        description: data.description
      });
      const  poi = await newPoi.save();
      if (poi) {
        return h.response(poi).code(201);
      }
      return Boom.badImplementation("error creating candidate");
    },
  },

};

module.exports = Pois;