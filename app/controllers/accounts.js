"use strict";
const User = require("../models/user");
const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const sanHtml = require("../Services/sanitize-html");
const joi = require ("@hapi/joi");

const saltRounds = 10;

const Accounts = {
  index: {
    auth: false,
    handler: function(request, h) {
      return h.view("main", { title: "Welcome" });
    }
  },
  showSignup: {
    auth: false,
    handler: function(request, h) {
      return h.view("signup", { title: "Sign up" });
    }
  },
  signup: {
    auth: false,
    validate: {
      payload: {
        firstName: joi.string().regex(/^[a-zA-Z]+$/).required(),
        // begin with upper case letter
        lastName: joi.string().regex(/^[a-zA-Z]+$/).required(),
        // begin with upper case letter
        email: joi.string().email().required().min(2).max(40),
        password: joi.string().required().min(2).max(10),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("signup", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function(request, h) {
      try {
        const payload = request.payload;
        let user = await User.findByEmail(payload.email);
        if (user) {
          const message = "Email address is already registered";
          throw Boom.badData(message);
        }
        // hash the password
        const hash = await bcrypt.hash(payload.password, saltRounds);

        const firstName = sanHtml(payload.firstName);
        const lastName = sanHtml(payload.lastName);
        const newUser = new User({
          firstName: firstName,
          lastName: lastName,
          email: payload.email,
          password: hash
        });
        user = await newUser.save();
        request.cookieAuth.set({ id: user.id });
        return h.redirect("/home");
      } catch (err) {console.log(err.message);
        return h.view("signup", { errors: [{ message: err.message }] });
      }
    }
  },
  showLogin: {
    auth: false,
    handler: function(request, h) {
      return h.view("login", { title: "Login" });
    }
  },
  login: {
    auth: false,
    validate: {
      payload: {
        email: joi.string().email().required().min(2).max(40),
        password: joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function (request, h, error) {
        return h
          .view("login", {
            title: "Login error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function(request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);
        if (!user) {
          const message = "Email address is not registered";
          throw Boom.unauthorized(message);
        }

        const isMatch = await user.comparePassword(password);
        if (isMatch) {
          request.cookieAuth.set({ id: user.id });
          return h.redirect("/home");
        } else {
          return "Unable to login";
        }
      } catch
        (err)
      {console.log(err.message)
        return h.view("login", { errors: [{ message: err.message }] });
      }
    }
  },
  logout: {
    handler: function(request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    }
  }
};

module.exports = Accounts;
