"use strict";

const assert = require("chai").assert;
const PoiService = require("./poi-service");
const fixtures = require("./fixtures.json");
const axios = require("axios");

suite("Pois API tests", function () {

  let newComments = fixtures.newComments;
  let newPoi = fixtures.newPoi;
  let newUser = fixtures.newUser;
  const poiService = new PoiService("http://localhost:3000");
  const _ = require("lodash");

  setup(async function () {
    await poiService.deleteAllComments();
    await poiService.deleteAllUsers();
    await poiService.deleteAllPois();
  });

  teardown(async function () {
    await poiService.deleteAllComments();
    await poiService.deleteAllUsers();
    await poiService.deleteAllPois();
  });

  test("create a comment", async function () {
    const createdUser = await poiService.createUser(newUser);
    const createdPoi = await poiService.createPoi(newPoi);

    const newComment = {
      comment: newComments[0].comment,
      poi: createdPoi._id,
      user: createdUser._id
    }
    const returnedComment = await poiService.createComment(newComment);
    assert(_.some([returnedComment], newComment), "returnedComment must be a superset of newComments");
    assert.isDefined(returnedComment._id);
  });

  test("get a comment", async function () {
    const c1 = await poiService.createComment(newComments);
    const c2 = await poiService.getComment(c1._id);
    assert.deepEqual(c1, c2);
  });

  test("get invalid comment", async function () {
    const c1 = await poiService.getComment("1234");
    assert.isNull(c1);
    const c2 = await poiService.getComment("012345678901234567890123");
    assert.isNull(c2);
  });

  test("delete a comment", async function () {
    let c = await poiService.createComment(newComments);
    assert(c._id != null);
    await poiService.deleteOneComment(c._id);
    c = await poiService.getComment(c._id);
    assert(c == null);
  });

  test("get all comments", async function () {
    for (let c of newComments) {
      await poiService.createComment(c);
    }

    const allComments = await poiService.getComments();
    assert.equal(allComments.length, newComments.length);
  });

  test("get comments' detail", async function () {
    for (let c of newComments) {
      await poiService.createComment(c);
    }

    const allComments = await poiService.getComments();
    for (var i = 0; i < allComments.length; i++) {
      assert(_.some([allComments[i]], newComments[i]), "returnedComment must be a superset of newComment");
    }
  });

  test("get all comments empty", async function () {
    const allComments = await poiService.getComments();
    assert.equal(allComments.length, 0);
  });

});