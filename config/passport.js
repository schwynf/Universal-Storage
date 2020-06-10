const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const jwtSecret = require("./jwt-config");
const db = require("../models");

module.exports = passport => {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser(async (id, cb) => {
    const data = await db.user.findOne({ where: { id: id } });

    cb(null, data);
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      // passport by default expects username/pass, here we change to email/pass
      {
        usernameField: "email",
        passwordField: "password",
        session: true
      },
      // sign up
      async (email, password, cb) => {
        // checks if already in db
        let data = await db.user.findOne({ where: { email: email } });

        if (data) {
          return cb(null, false, {
            // if already in db returns msg
            message: "Oops! Email already signed-up."
          });
        } else {
          // if not already in db, creates record in db
          data = await db.user.create({
            email: email,
            // hashes pw as to not store in plain text
            password: db.user.generateHash(password)
          });
          // creates sign up record
          const record = {
            status: "SignUp",
            userId: data.dataValues.id
          };
          data = await db.history.create(record);
          
          // returns created record
          return cb(null, data);
        }
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
         // passport by default expects username/pass, here we change to email/pass

      {
        usernameField: "email",
        passwordField: "password",
        session: false
      },
      // sign in
      async (email, password, cb) => {
        // looks for user in db
        let data = await db.user.findOne({ where: { email: email } });
        // if no email in db, return msg
        if (!data) {
          return cb(null, false, { message: "No email found." });
        }
        // if pw does not match return msg
        if (!db.user.validPassword(password, data.password)) {
          return cb(null, false, { message: "Oops! Wrong password!" });
        }
        // creates log in record
        const record = {
          status: "LogIn",
          userId: data.id
        };

        await db.history.create(record);
        // verify cb returns log in record
        return cb(null, data);
      }
    )
  );

  const opts = {
    jwtFromRequest: req => {
      return req.cookies.jwt;
    },
    secretOrKey: jwtSecret.secret
  };

  passport.use(
    "jwt",
    new JwtStrategy(opts, async (jwtpayload, cb) => {
      const data = await db.user.findOne({ id: jwtpayload.sub });

      if (data) {
        return cb(null, data);
      } else {
        return cb(null, false, { message: "No user found." });
      }
    })
  );
};
