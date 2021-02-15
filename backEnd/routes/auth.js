const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../model/User");

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user.save(async (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send(doc);
  });
});

module.exports = router;
