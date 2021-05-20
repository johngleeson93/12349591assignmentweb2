"use strict";

const sanitize = require('sanitize-html');

const sanHtml = function (stringToSanitize) {
  return sanitize(stringToSanitize, {
    allowedTags: [],
    allowedAttributes: {},
    allowedIframeHostnames: []
  });
}

module.exports = sanHtml;