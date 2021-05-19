"use strict";
const Poi = require("../models/poi");
const County = require("../models/counties");

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
      console.log("data", data);
      const newPoi = new Poi({
        name: data.name,
        description: data.description,
        county: data.county,
        latitude: data.latitude,
        longitude: data.longitude
      });
      console.log("newPoi", newPoi);
      // var creatorEmail = request.auth.credentials.id;
      // data.donor = this.users[creatorEmail];
      // this.pois.push(data);
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
      poi.name = data.name;
      poi.description = data.description;
      poi.latitude = data.latitude;
      poi.longitude = data.longitude;
      console.log("poi",poi);
      await poi.save();
      return h.redirect("/report");
    }
  }

};

module.exports = Pois;
