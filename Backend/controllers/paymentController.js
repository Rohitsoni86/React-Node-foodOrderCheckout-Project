// Razor Pay
const Razorpay = require("razorpay");
const crypto = require("crypto");

const instance = new Razorpay({
  key_id: "XXXXX",
  key_secret: "XXXX",
});

// Create New Order
const createOrder = async (req, res, next) => {
  const orderAmount = req.body.amount;

  console.log(orderAmount);
  console.log("Order Creating Req !");

  // Create Order

  const orderOptions = {
    amount: parseInt(orderAmount) * 100,
    currency: "INR",
    receipt: "receipt#1",
  };

  try {
    const userOrder = await instance.orders.create(orderOptions);
    console.log(userOrder);

    if (userOrder) {
      res.status(200).send({
        orderCreated: true,
        orderID: userOrder.id,
        receipt: userOrder.receipt,
      });
    } else {
      console.log("Some Error Occurs !!");
      res
        .status(500)
        .send(
          "Internal Server Error \n Something Went Wrong Login User !!  Try Again !! "
        );
    }
  } catch (error) {
    console.log("Error While Creating Order !!");
    console.log(error);
    res
      .status(500)
      .send(
        "Internal Server Error \n Something Went Wrong Login User !!  Try Again !! "
      );
  }
};

const getPaymetdetails = async (req, res) => {
  console.log(req.body);

  const body = req.body.order_id + "|" + req.body.payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "XXXX")
    .update(body.toString())
    .digest("hex");

  let recSignature = req.body.razorpay_signature;
  console.log(`Expected Signature ${expectedSignature}`);
  console.log(`Received Signature ${recSignature}`);

  if (recSignature == expectedSignature) {
    res.status(200).send({
      orderCreated: true,
    });
  } else {
    res.status(500).send({
      orderCreated: false,
    });
  }
};

module.exports = { createOrder, getPaymetdetails };
