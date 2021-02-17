const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");

const app = express();
const port = 5000;

dotenv.config();

// Connect to mongo DB
mongoose.connect(
  process.env.DB_CREDENTIALS,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB...")
);

// MIDDLEWARE
app.use(express.json());

app.use("/api/user", authRouter);

app.listen(port, () => console.log(`Listeneing it ${port}...`));
