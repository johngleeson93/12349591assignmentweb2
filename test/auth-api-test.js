"use strict";

const assert = require("chai").assert;
const poiService = require("./poi-service");
const fixtures = require("./fixtures.json");
const utils = require("../app/api/utils.js");

suite("Authentication API tests", function () {
  let user = fixtures.users;
  let newUser = fixtures.newUser;

  const poiservice = new poiService("http://localhost:3000");

  setup(async function () {
    await poiservice.deleteAllUsers();
  });

  test("authenticate", async function () {
    const returnedUser = await poiservice.createUser(newUser);
    const response = await poiservice.authenticate(newUser);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify Token", async function () {
    const returnedUser = await poiservice.createUser(newUser);
    const response = await poiservice.authenticate(newUser);

    const userInfo = utils.decodeToken(response.token);
    assert.equal(userInfo.email, returnedUser.email);
    assert.equal(userInfo.userId, returnedUser._id);
  });
});
