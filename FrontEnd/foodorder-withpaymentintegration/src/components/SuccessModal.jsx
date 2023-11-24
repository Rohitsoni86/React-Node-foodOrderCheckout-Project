import React from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessModal({
  status,
  showModal,
  setShowModal,
  rozarDetails,
}) {
  const navigate = useNavigate();

  const exitModal = () => {
    console.log(showModal);
    setShowModal(!showModal);
  };

  return (
    <div className=" fixed z-30 flex h-screen w-screen top-0 left-0 flex-col items-center justify-center space-y-6 backdrop-opacity-10 backdrop-invert bg-white/10 px-4 sm:flex-row sm:space-x-6 sm:space-y-0">
      {status ? (
        <>
          <div className="w-full fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 max-w-sm overflow-hidden rounded-lg bg-gray-100 shadow-md duration-300 hover:scale-105 hover:shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mt-8 h-16 w-16 text-green-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <h1 className="mt-2 text-center text-2xl font-bold text-gray-500">
              Success
            </h1>
            <p className="my-4 text-center text-sm text-gray-500">
              <span className="text-md font-bold text-black">Payment_id:</span>{" "}
              {rozarDetails.razorpay_payment_id}
            </p>
            <div className="space-x-4 bg-gray-100 py-4 text-center">
              <button className="inline-block rounded-md bg-red-500 px-10 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400">
                Cancel
              </button>
              <button
                onClick={exitModal}
                className="inline-block rounded-md bg-green-500 px-10 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400"
              >
                Close
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 max-w-sm overflow-hidden rounded-lg bg-gray-100 shadow-md duration-300 hover:scale-105 hover:shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mt-8 h-16 w-16 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
            <h1 className="mt-2 text-center text-2xl font-bold text-gray-500">
              Cancel
            </h1>
            <p className="my-4 text-center text-sm text-gray-500">
              <span className="text-md font-bold text-black">Order_id:</span>{" "}
              {rozarDetails.razorpay_order_id}
            </p>
            <div className="space-x-4 bg-gray-100 py-4 text-center">
              <button className="inline-block rounded-md bg-red-500 px-10 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400">
                Cancel
              </button>
              <button
                onClick={exitModal}
                className="inline-block rounded-md bg-green-500 px-10 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400"
              >
                Try Again
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
