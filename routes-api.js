const Poi = require("./app/api/poi");
const user = require("./app/api/user");

module.exports = [
  // PoIs
  { method: "GET", path: "/api/poi", config: Poi.find },
  { method: "GET", path: "/api/poi/{id}", config: Poi.findOne },
  { method: "POST", path: "/api/poi", config: Poi.create },
  { method: "DELETE", path: "/api/poi/{id}", config: Poi.deleteOne },
  { method: "DELETE", path: "/api/poi", config: Poi.deleteAll },

  // Users
  { method: "GET", path: "/api/user", config: user.find },
  { method: "GET", path: "/api/user/{id}", config: user.findOne },
  { method: "POST", path: "/api/user", config: user.create },
  { method: "DELETE", path: "/api/user/{id}", config: user.deleteOne },
  { method: "DELETE", path: "/api/user", config: user.deleteAllUsers },
  { method: 'POST', path: '/api/users/authenticate', config: user.authenticate },
];