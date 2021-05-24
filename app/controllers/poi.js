"use strict";
const Poi = require("../models/poi");
const County = require("../models/counties");
const sanHtml = require("../Services/sanitize-html");

const Pois = {
  home: {
    handler: async function(request, h) {
      const counties = await County.find().lean();
      return h.view("home", {
        title: "Welcome",
        countiesList: counties
      });
    }
  },
  report: {
    handler: async function(request, h) {
      const poi = await Poi.find().populate("county").lean();
      return h.view("report", {
        title: "POIs  ",
        pois: poi
      });
    }
  },
  create: {
    handler: async function(request, h) {
      const data = request.payload;
      const name = sanHtml(data.name);
      const description = sanHtml(data.description);
      const latitude = sanHtml(data.latitude);
      const longitude = sanHtml(data.longitude);
      console.log("data", data);
      const newPoi = new Poi({
        name: name,
        description: description,
        county: data.county,
        latitude: latitude,
        longitude: longitude
      });
      console.log("newPoi", newPoi);
      await newPoi.save();

      return h.redirect("/report");
    }
  },
  deletePoi: {
    handler: async function(request, h) {
      try {
        Poi.findByIdAndRemove(request.params.id, function(err) {
          if (err) {
            console.log("Error: Poi not deleted");
          } else {
            console.log("Success: Poi deleted");
          }
        });
        return h.redirect("/report");
      } catch (e) {
        return h.view("main", { errors: [{ message: e.message }] });
      }
    }
  },
  updatePoi: {
    handler: async function(request, h) {
      const poiId = request.params.id;
      console.log("poiId", poiId);
      const poi = await Poi.findOne({ _id: poiId }).lean();
      console.log("poi", poi);
      return h.view("updatePOI", {
        title: "Update " + poi.name,
        poi: poi
      });
    }
  },
  afterUpdatePoi: {
    handler: async function(request, h) {
      const poiId = request.params.id;
      let poi = await Poi.findOne({ _id: poiId });
      const data = request.payload;
      const name = sanHtml(data.name);
      const description = sanHtml(data.description);
      const latitude = sanHtml(data.latitude);
      const longitude = sanHtml(data.longitude);
      poi.name = name;
      poi.description = description;
      poi.county;
      poi.latitude = latitude;
      poi.longitude = longitude;
      console.log("poi", poi);
      await poi.save();
      return h.redirect("/report");
    }
  }

};

module.exports = Pois;
