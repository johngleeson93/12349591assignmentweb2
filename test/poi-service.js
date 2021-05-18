"use strict";

const axios = require("axios");
const baseUrl = "http://localhost:3000";

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
}

module.exports = PoiService;