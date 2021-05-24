"use strict";
const assert = require("chai").assert;
const poiService = require("./poi-service");
const fixtures = require("./fixtures.json");
const axios = require("axios");

suite("Counties API tests", function () {

  let counties = fixtures.counties;
  let newCounty = fixtures.newCounty;
  const poiservice = new poiService("http://localhost:3000");
  const _ = require("lodash");

  setup(async function () {
    await poiservice.deleteAllCounties();
  });

  teardown(async function () {
    await poiservice.deleteAllCounties();
  });

  test("create a county", async function () {
    const returnedCounty = await poiservice.createCounty(newCounty);
    assert(_.some([returnedCounty], newCounty), "returnedCounty must be a superset of newCounty");
    assert.isDefined(returnedCounty._id);
  });

  test("get a county", async function () {
    const c1 = await poiservice.createCounty(newCounty);
    const c2 = await poiservice.getCounty(c1._id);
    assert.deepEqual(c1, c2);
  });

  test("get invalid County", async function () {
    const c1 = await poiservice.getCounty("1234");
    assert.isNull(c1);
    const c2 = await poiservice.getCounty("012345678901234567890123");
    assert.isNull(c2);
  });

  test("delete a County", async function () {
    let c = await poiservice.createCounty(newCounty);
    assert(c._id != null);
    await poiservice.deleteOneCounty(c._id);
    c = await poiservice.getCounty(c._id);
    assert(c == null);
  });

  test("get all counties", async function () {
    for (let c of counties) {
      await poiservice.createCounty(c);
    }

    const allCounties = await poiservice.getCounties();
    assert.equal(allCounties.length, counties.length);
  });

  test("get category's detail", async function () {
    for (let c of counties) {
      await poiservice.createCounty(c);
    }

    const allCounties = await poiservice.getCounties();
    for (var i = 0; i < counties.length; i++) {
      assert(_.some([allCounties[i]], counties[i]), "returnedCounty must be a superset of newCounty");
    }
  });

  test("get all counties empty", async function () {
    const allCounties = await poiservice.getCounties();
    assert.equal(allCounties.length, 0);
  });

});