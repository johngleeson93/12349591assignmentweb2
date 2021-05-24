"use strict";

const axios = require("axios");

class PoiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getPois() {
    const response = await axios.get(this.baseUrl + "/api/poi");
    return response.data;
  }

  async getPoi(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/poi/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createPoi(newPoi) {
    const response = await axios.post(this.baseUrl + "/api/poi", newPoi);
    return response.data;
  }

  async deleteAllPois() {
    const response = await axios.delete(this.baseUrl + "/api/poi");
    return response.data;
  }

  async deleteOnePoi(id) {
    const response = await axios.delete(this.baseUrl + "/api/poi/" + id);
    return response.data;
  }

  async getUsers() {
    const response = await axios.get(this.baseUrl + "/api/user");
    return response.data;
  }

  async getUser(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/user/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async deleteAllUsers() {
    const response = await axios.delete(this.baseUrl + "/api/user");
    return response.data;
  }

  async createUser(newUser) {
    const response = await axios.post(this.baseUrl + "/api/user", newUser);
    return response.data;
  }

  async deleteOneUser(id) {
    const response = await axios.delete(this.baseUrl + "/api/user/" + id);
    return response.data;
  }

  async authenticate(user) {
    try {
      const response = await axios.post(this.baseUrl + "/api/user/authenticate", user);
      axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.token;
      return response.data;
    } catch (e) {
      return null;
    }
  }
  async clearAuth(user) {
    axios.defaults.headers.common["Authorization"] = "";
  }
  // CATEGORIES
  async getCounties() {
    const response = await axios.get(this.baseUrl + "/api/counties");
    return response.data;
  }

  async getCounty(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/counties/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createCounty(newCounty) {
    const response = await axios.post(this.baseUrl + "/api/counties", newCounty);
    return response.data;
  }

  async deleteAllCounties() {
    const response = await axios.delete(this.baseUrl + "/api/counties");
    return response.data;
  }

  async deleteOneCounty(id) {
    const response = await axios.delete(this.baseUrl + "/api/counties/" + id);
    return response.data;
  }
// COMMENTS
  async getComments() {
    const response = await axios.get(this.baseUrl + "/api/comments");
    return response.data;
  }

  async getComment(id) {
    try {
      const response = await axios.get(this.baseUrl + "/api/comments/" + id);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  async createComment(newComment) {
    const response = await axios.post(this.baseUrl + "/api/comments", newComment);
    return response.data;
  }

  async deleteAllComments() {
    const response = await axios.delete(this.baseUrl + "/api/comments");
    return response.data;
  }

  async deleteOneComment(id) {
    const response = await axios.delete(this.baseUrl + "/api/comments/" + id);
    return response.data;
  }

}

module.exports = PoiService;