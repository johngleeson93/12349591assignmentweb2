"use strict";

const assert = require("chai").assert;
const axios = require("axios");

suite("Poi API tests", function() {
  test("get Poi", async function() {
    const response = await axios.get("http://localhost:3000/api/poi");
    const pois = response.data;
    assert.equal(2, pois.length);
    assert.equal(pois[0].name, "ABCDE");
    assert.equal(pois[0].description, "String");

    assert.equal(pois[1].name, "XYZ");
    assert.equal(pois[1].description, "SDFGHJK");
  });
  test("get one candidate", async function() {
    let response = await axios.get("http://localhost:3000/api/poi");
    const pois = response.data;
    assert.equal(2, pois.length);

    const onePoiUrl = "http://localhost:3000/api/poi/" + pois[0]._id;
    response = await axios.get(onePoiUrl);
    const onePoi = response.data;

    assert.equal(onePoi.name, "ABCDE");
    assert.equal(onePoi.description, "String");
  });
  test("create a poi", async function() {
    const poiUrl = "http://localhost:3000/api/poi";
    const newPoi = {
      name: "ABCDE",
      description: "String"
    };

    const response = await axios.post(poiUrl, newPoi);
    const returnedPoi = response.data;
    assert.equal(201, response.status);

    assert.equal(returnedPoi.name, "ABCDE");
    assert.equal(returnedPoi.description, "String");
  });
});