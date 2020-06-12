const express = require("express");
const passport = require("passport");
const router = express.Router();
const db = require("../models");

// Passport
require("../config/passport")(passport);
router.use(passport.initialize());
router.use(passport.session());

router.delete("/api/passwords/:id", async (req, res) => {
  try {
    if (req.user) {
      const data = await db.passwords.destroy({
        where: {
          id: req.params.id
        }
      })
      res.json(data)
    }
    else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error)
  }
});

router.get("/api/passwords", async (req, res) => {
  try {
    if (req.user) {
      const data = await db.passwords.findAll({
        where: {
          userId: req.user.dataValues.id
        }
      });
      res.json(data);
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);

    res.status(500).send();
  }
});

router.post("/api/passwords",passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    if (req.user) {
      req.body.userId = req.user.dataValues.id;
      const data = await db.passwords.create(req.body);
      res.json(data);
    }
    else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;