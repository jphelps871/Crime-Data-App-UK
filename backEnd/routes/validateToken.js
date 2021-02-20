const express = require("express");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

router.get("/checkToken", (req, res) => {
  const token = req.cookies.authcookie;
  if (!token) return res.status(401).send("Sorry, you need to sign in");

  jwt.verify(token, process.env.TOKEN_JWT, (err, decoded) => {
    if (err) return res.status(401).send(err.message);
    console.log(decoded);
    res.send("Success");
  });
});

module.exports = router;
