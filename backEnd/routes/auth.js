const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { registerValidation, signInValidation } = require("../validation");
const User = require("../model/User");

router.post("/register", async (req, res) => {
  // If validation fails, send and exit function
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check email does not exist
  const hasEmail = await User.findOne({ email: req.body.email });
  if (hasEmail) return res.status(400).send("Email already exists");

  // hash password
  const password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  user.save(async (err, doc) => {
    if (err) return res.status(400).send(err);
    res.send("Thank you for registering!");
  });
});

router.post("/signIn", async (req, res) => {
  const { error } = signInValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userEmail = await User.findOne({ email: req.body.email });
  if (!userEmail)
    return res.status(400).send("Sorry, we could not find that email");

  // unhash password
  const matchedPassword = await bcrypt.compare(
    req.body.password,
    userEmail.password
  );
  if (!matchedPassword)
    return res.status(400).send("Sorry, incorrect password");

  const token = jwt.sign({ _id: userEmail._id }, process.env.TOKEN_JWT);
  // res.header("auth-token", token).send("Logged in!!");
  res
    .cookie("authcookie", token, {
      maxAge: 900000,
      httpOnly: true,
      secure: false,
    })
    .send("Logged in!!");
});

module.exports = router;
