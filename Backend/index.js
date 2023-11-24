const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

//Routes
const paymentRouteHandler = require("./routes/paymentRouteHandler");

// Middle Wares
app.use(cors());
app.use(bodyParser.json());

const greetUser = (req, res, next) => {
  res.status(200).send("Welcome To Your Application !!!");
};

app.get("/", greetUser);

//Handle Route

app.use(paymentRouteHandler);

// use port 3000 unless there exists a preconfigured port
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server Started !! at ${port}`);
});
