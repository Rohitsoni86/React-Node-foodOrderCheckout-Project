import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// REDUX TOOLKIT

import { useSelector, useDispatch } from "react-redux";
import SuccessModal from "../components/SuccessModal";

export default function CheckoutPage() {
  const [orderdetails, setOrderDetails] = useState([]);

  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(12);
  const [taxes, setTaxes] = useState(0);
  const [summaryTotal, setSumTotal] = useState(0);

  const [userOrderId, setUserOrderId] = useState("");

  // Roxar details

  const [rozarDetails, setRozarDetails] = useState({});

  /// For Modal

  const [showModal, setShowModal] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState(null);

  const orderDetails = useSelector((state) => state.orderdetails);

  // Handler Function

  const paymentSuccess = ({
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
  }) => {
    let data = JSON.stringify({
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      razorpay_signature: razorpay_signature,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3001/app/user/paymentverification/",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(response.data);
        setPaymentStatus(true);
        setShowModal(true);
      })
      .catch((error) => {
        console.log(error);
        setPaymentStatus(false);
        alert(error);
      });
  };

  // OPTIONS FOR RAZOR PAYMENT
  const checkOutOptions = {
    key: "rzp_test_sSlN7R1KAINo41", // Enter the Key ID generated from the Dashboard
    amount: summaryTotal * 10000, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Rohit Soni", //your business name
    description: "Food Order",
    image: "https://example.com/your_logo",
    order_id: userOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    // callback_url: "http://localhost:3001/app/user/paymentverification/",
    handler: function (response) {
      paymentSuccess(response);
      console.log(response);
      setRozarDetails(response);
    },
    prefill: {
      //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
      name: "Rohit Soni", //your customer's name
      email: "rohit@example.com",
      contact: "8319227549", //Provide the customer's phone number for better conversion rates
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const checkoutPage = new window.Razorpay(checkOutOptions);

  const proceedToPay = (e) => {
    checkoutPage.open();
    e.preventDefault();
  };

  // LOGIC
  useEffect(() => {
    console.log(orderDetails.orderItems);
    if (orderDetails.orderItems) {
      setOrderDetails(orderDetails.orderItems);
      let orderDItems = orderDetails.orderItems;

      let Subtotal = orderDItems.reduce((accumulator, object) => {
        return accumulator + object.Price;
      }, 0);

      setSubtotal(Subtotal);
      let discountP = Math.round(Subtotal * (43.1534 / 100));
      setDiscount(discountP);

      let TaxAmmount = parseFloat(((Subtotal * 2.622) / 100).toFixed(2));

      setTaxes(TaxAmmount);

      let OrderTotal = Subtotal - discountP + TaxAmmount + 12;
      setSumTotal(OrderTotal);

      // now generate order id
      let data = JSON.stringify({
        amount: OrderTotal,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3001/app/user/createorder/",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data);

          setUserOrderId(response.data.orderID);
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    } else {
      console.log("No data !!");
      return;
    }
  }, []);
  const navigate = useNavigate();

  // Rect Redux

  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-center ">
      {/* headerComponent */}
      <div className="header">
        {/* IMAGE */}
        <img
          src="https://images.pexels.com/photos/2067401/pexels-photo-2067401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="food Banner"
          className="max-h-64  md:max-h-96 min-w-full"
        />
        <div className="info w-96 h-48 md:w-[500px] md:h-auto relative md:absolute md:top-[20%] md:left-[25%] lg:left-[35%] mx-auto -top-[80px] md:text-center shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] bg-white">
          <h2 className="text-2xl md:text-4xl font-bold text-center p-4 ">
            TSX PIZZERIAS
          </h2>

          <div className="btnContainer flex flex-row justify-center gap-2  py-4">
            <div className="btnDelivery">
              <button
                type="button"
                onClick={() => alert("This is a demo app !")}
                className="inline-block rounded bg-red-500 px-6 pb-2 pt-2.5 text-xs md:text-base font-medium uppercase leading-normal text-neutral-50  shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:border hover:border-black hover:text-black hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)]  focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)]"
              >
                DELIVERY
              </button>
            </div>
            <div className="btnPickup ">
              <button
                type="button"
                onClick={() => alert("This is a demo app !")}
                className="inline-block rounded bg-neutral-800 hover:bg-white hover:text-red-500 hover:border hover:border-red-500 px-6 pb-2 pt-2.5 text-xs md:text-base font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]  focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0  active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)]"
              >
                PICK UP
              </button>
            </div>
          </div>

          <div className="subInfo border flex flex-row justify-evenly px-5">
            <p>25 min</p>
            <p>₹20</p>
            <p>Discounts</p>
          </div>
          <h2 className="text-xs font-semibold text-center p-2">
            Menu Hours: 10:00 AM to 11:00 PM
          </h2>
        </div>
      </div>
      {/* headerComponent */}

      {/* ORDER LIST */}

      <div className="container2 px-10 py-5  border border-b-slate-600">
        <div className="header flex flex-row justify-between">
          <h2 className="text-2xl font-bold underline-offset-2  underline decoration-4 decoration-[#E92F48] ">
            Your Order
          </h2>
          <div className="btnCn">
            <button
              onClick={() => alert("This is a demo app !")}
              className="text-lg font-bold text-[#E92F48]"
            >
              Add item +{" "}
            </button>
          </div>
        </div>
        {/* onClick={alert("This is a demo app !")} */}
        {/* Now Map ITEMS */}

        <div className="outerCon flex flex-col p-2">
          {orderdetails ? (
            orderdetails.map(({ id, Name, Ingredients, Price }) => {
              return (
                <>
                  <div className="orderListitem my-2 flex flex-row justify-between pb-4">
                    <div className="leftSide flex">
                      <div className="count p-2">
                        <h2 className="text-xs font-semibold p-2 rounded-md bg-[#E92F48] text-white">
                          {id}
                        </h2>
                      </div>
                      <div className="OrderName">
                        <h2 className="text-lg italic text-[#424242]">
                          {Name}
                        </h2>
                        <p className="text-base text-[#7E8389]">
                          {Ingredients}
                        </p>
                      </div>
                    </div>

                    <div className="rightSidePriceCont">
                      <h2 className="text-lg text-[#424242]">₹{Price}</h2>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <>
              <h2>No Orders !</h2>
            </>
          )}
        </div>
        {/* Now Map ITEMS */}

        {/* SUMMARY */}

        <h2 className="text-xl font-bold py-5 underline-offset-2  underline decoration-4 decoration-[#E92F48] ">
          Summary
        </h2>

        <div className="totalContainer flex flex-col ">
          <div className="p-2 flex flex-row justify-between">
            <h2 className=" text-[#7E8389] text-base">Subtotal</h2>
            <h2 className="text-lg text-[#424242]">₹{subtotal}</h2>
          </div>
          <div className="p-2 flex flex-row justify-between">
            <h2 className=" text-[#7E8389] text-base">Discount</h2>
            <h2 className="text-lg text-[#5A8CD7]"> - ₹{discount}</h2>
          </div>
          <div className="p-2 flex flex-row justify-between">
            <h2 className=" text-[#7E8389] text-base">Delivery Fee</h2>
            <h2 className="text-lg text-[#424242]">₹{deliveryFee}</h2>
          </div>
          <div className="p-2 flex flex-row justify-between">
            <h2 className=" text-[#7E8389] text-base">Taxes</h2>
            <h2 className="text-lg text-[#424242]">₹{taxes}</h2>
          </div>

          {/* TOTAL */}

          <div className=" py-4 flex flex-row justify-between">
            <h2 className=" text-[#424242] font-extrabold text-2xl">Total</h2>
            <h2 className="text-lg font-extrabold  text-[#424242]">
              ₹{summaryTotal}
            </h2>
          </div>
          {/* TOTAL */}
        </div>
        {/* SUMMARY */}
      </div>

      <div className="footerBTN rounded-b-md mb-4 bg-black p-2 text-center">
        <button className="text-white" onClick={proceedToPay}>
          Place Order
        </button>
      </div>
      {showModal && (
        <SuccessModal
          rozarDetails={rozarDetails}
          status={paymentStatus}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}
