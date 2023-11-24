const express = require("express");

const paymentRouteHandler = express.Router();
const {
  createOrder,
  getPaymetdetails,
} = require("../controllers/paymentController");

paymentRouteHandler.post("/app/user/createorder/", createOrder);
paymentRouteHandler.post("/app/user/paymentverification/", getPaymetdetails);

module.exports = paymentRouteHandler;
