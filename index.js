"use strict";

const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const Handlebars = require("handlebars");
const Cookie = require("@hapi/cookie");
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const env = require('dotenv');
require('./app/models/db');


env.config();

const server = Hapi.server({
  port: 3000,
  host: "localhost"
});

app.use(express.static(__dirname + '/public/uploads'));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://johngleeson93:<Johnnyg93>@johnscluster.7bntq.mongodb.net/johnsCluster?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
server.bind({
  users: [],
  //currentUser: [],
  pois: []
});

async function init() {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  server.views({
    engines: {
      hbs: require("handlebars")
    },
    relativeTo: __dirname,
    path: "./app/views",
    layoutPath: "./app/views/layouts",
    partialsPath: "./app/views/partials",
    layout: true,
    isCached: false
  });
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: "poi",
      password: "password-should-be-32-characters",
      isSecure: false
    },
    redirectTo: "/"
  });
  server.auth.default("session");
  server.route(require("./routes"))
  server.route(require('./routes-api'));
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
