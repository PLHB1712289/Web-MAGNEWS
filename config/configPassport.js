const key = require("./key");
const FacebookStrategy = require("passport-facebook").Strategy;
const session = require("express-session");
const bodyParser = require("body-parser");
const axios = require("axios");

const config = (app, passport) => {
  console.log("config passport");

  passport.use(
    new FacebookStrategy(
      {
        clientID: key.facebook_api_key,
        clientSecret: key.facebook_api_secret,
        callbackURL: key.callback_url,
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(async function () {
          console.log(accessToken, refreshToken, profile, done);
          const avatarRequest = await axios.get(
            `https://graph.facebook.com/${profile.id}/picture?redirect=false&access+token=${accessToken}`
          );
          const avatar = avatarRequest.data.data.url;
          //console.log(avatarRequest);
          profile = {
            id: profile.id,
            displayName: profile.displayName,
            avatar: avatar,
          };
          return done(null, profile);
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(session({ secret: "magNews", key: "news" }));
  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = config;
