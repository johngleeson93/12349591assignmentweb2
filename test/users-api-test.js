"use strict";

const assert = require("chai").assert;
const fixtures = require("./fixtures.json");
const _ = require("lodash");
const PoiService = require("./poi-service");

suite("Users API tests", function() {
  let users = fixtures.users;
  let newUser = fixtures.newUser;

  const poiService = new PoiService("http://localhost:3000");

  setup(async function() {
    await poiService.deleteAllUsers();
  });

  teardown(async function() {
    await poiService.deleteAllUsers();
  });

  test("create a user", async function() {
    const returnedUser = await poiService.createUser(newUser);
    assert(_.some([returnedUser], newUser), "returnedUser must be a superset of returnedUser");
    assert.isDefined(returnedUser._id);
  });

  test("get user", async function() {
    const c1 = await poiService.createUser(newUser);
    const c2 = await poiService.getUser(c1._id);
    assert.deepEqual(c1, c2);
  });

  test("get invalid candidate", async function() {
    const c1 = await poiService.getUser("1234");
    assert.isNull(c1);
    const c2 = await poiService.getUser("012345678901234567890123");
    assert.isNull(c2);
  });

  test("delete a candidate", async function() {
    let c = await poiService.createUser(newUser);
    assert(c._id != null);
    await poiService.deleteOneUser(c._id);
    c = await poiService.getUser(c._id);
    assert(c == null);
  });

  test("get all users", async function() {
    for (let c of users) {
      await poiService.createUser(c);
    }

    const allUsers = await poiService.getUsers();
    assert.equal(allUsers.length, users.length);
  });

  test("get candidates detail", async function() {
    for (let c of users) {
      await poiService.createUser(c);
    }

    const allUsers = await poiService.getUsers();
    for (let i = 0; i < users.length; i++) {
      assert(_.some([allUsers[i]], users[i]), "returnedUser must be a superset of newUser");
    }
  });

  test("get all users empty", async function() {
    const allUsers = await poiService.getUsers();
    assert.equal(allUsers.length, 0);
  });
});