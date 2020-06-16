const express = require("express");
const passport = require("passport");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res) => {
  try {
    if (req.user) {
      console.log(req.user.dataValues)
      res.render("user", { user: req.user });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);

    res.status(500).send();
  }
});

router.get(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const data = await db.user.findAll({ include: [db.history] });

      res.json(data);
    } catch (error) {
      console.error(error);

      res.status(500).send();
    }
  }
);

router.get("/api/users/:id", async (req, res) => {
  try {
    const data = await db.user.findAll({ where: { id: req.params.id }, include: [db.history] });

    res.json(data);
  } catch (error) {
    console.error(error);

    res.status(500).send();
  }
});

router.post(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const data = await db.user.create(req.body);

    res.json(data);
  }
);

router.delete(
  "/api/users/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const data = await db.user.destroy({ where: { id: req.params.id } });

      res.json(data);
    } catch (error) {
      console.error(error);

      res.status(500).send();
    }
  }
);

module.exports = router;
