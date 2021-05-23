const Poi = require("./app/api/poi");
const user = require("./app/api/user");
const counties = require("./app/api/counties");

module.exports = [
  // PoIs
  { method: "GET", path: "/api/poi", config: Poi.find },
  { method: "GET", path: "/api/poi/{id}", config: Poi.findOne },
  { method: "POST", path: "/api/poi", config: Poi.create },
  { method: "DELETE", path: "/api/poi/{id}", config: Poi.deleteOne },
  { method: "DELETE", path: "/api/poi", config: Poi.deleteAll },

  //counties
  { method: "GET", path: "/api/counties", config: counties.find },
  { method: "GET", path: "/api/counties/{id}", config: counties.findOne },
  { method: "POST", path: "/api/counties", config: counties.create },
  { method: "DELETE", path: "/api/counties/{id}", config: counties.deleteOne },
  { method: "DELETE", path: "/api/counties", config: counties.deleteAllCounties },

  // Users
  { method: "GET", path: "/api/user", config: user.find },
  { method: "GET", path: "/api/user/{id}", config: user.findOne },
  { method: "POST", path: "/api/user", config: user.create },
  { method: "DELETE", path: "/api/user/{id}", config: user.deleteOne },
  { method: "DELETE", path: "/api/user", config: user.deleteAllUsers },
  { method: 'POST', path: '/api/users/authenticate', config: user.authenticate },
];