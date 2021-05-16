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
        pois: poi,
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
        county: data.county
      });
      console.log("newPoi", newPoi);
      // var creatorEmail = request.auth.credentials.id;
      // data.donor = this.users[creatorEmail];
      // this.pois.push(data);
      await newPoi.save();
      
      return h.redirect("/report");
    }
  }
};

module.exports = Pois;
