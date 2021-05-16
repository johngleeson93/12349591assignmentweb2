"use strict";
const Poi = require("../models/poi");

const Pois = {
  home: {
    handler: function(request, h) {
      return h.view("home", { title: "Welcome" });
    }
  },
   report: {
    handler: async function(request, h) {
      const poi = await Poi.find().lean();
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
        description: data.description
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
