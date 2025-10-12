import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fecthAllOrders = async () => {
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
        try {
          const response = await axios.post(backendUrl + "/api/order/status", {
            orderId,
            status: event.target.value
          }, { headers: { token } });

          if (response.data.success) {
            await fecthAllOrders();
          }
        } catch (error) {
          console.log(error);
          toast.error(response.data.message);
        }
  }

  useEffect(() => {
    fecthAllOrders();
  }, []);

  return (
    <div className="flex flex-col gap-4 pt-16 pl-[25%] text-[15px] w-[90vw] max-w-[1500px] mx-auto">
      <div className="w-full">
        <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
          Order Page
        </h3>
        {orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200 flex flex-col md:flex-row md:items-start gap-4"
          >
            <img
              src={assets.parcel_icon}
              alt=""
              className="w-12 h-12 object-contain"
            />
            <div className="flex-1 space-y-3">
              <div className="bg-gray-50 p-4 rounded-md">
                {order.items.map((item, index) => {
                  if (index == order.items.length - 1) {
                    return (
                      <p key={index} className="text-gray-700">
                        {" "}
                        <span className="font-medium">{item.name}</span> x{" "}
                        {item.quantity}{" "}
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {" "}
                          {item.size}{" "}
                        </span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} className="text-gray-700 mb-2">
                        {" "}
                        <span className="font-medium">{item.name}</span> x{" "}
                        {item.quantity}{" "}
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {" "}
                          {item.size}{" "}
                        </span>
                        
                      </p>
                    );
                  }
                })}
              </div>
              <p className="font-semibold text-gray-800">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="text-gray-600 text-sm">
                <p className="mb-1">{order.address.street}</p>
                <p className="mb-1">
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipCode}
                </p>
              </div>

              <p className="text-blue-600 font-medium">{order.address.phone}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md text-sm space-y-2 min-w-[200px]">
              <p className="flex justify-between">
                <span className="text-gray-500">Items:</span>{" "}
                <span className="font-medium">{order.items.length}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Method:</span>{" "}
                <span className="font-medium">{order.paymentMethod}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Payment:</span>{" "}
                <span
                  className={`font-medium ${
                    order.payment ? "text-green-600" : "text-orange-500"
                  }`}
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p className="flex justify-between">
                <span className="text-gray-500">Date:</span>{" "}
                <span className="font-medium">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </p>
              <p className="flex justify-between text-lg font-bold mt-3 pt-3 border-t border-gray-200">
                <span>Total:</span>{" "}
                <span className="text-green-700">
                  {currency}
                  {order.amount}
                </span>
              </p>
            </div>
            <select onChange={(event)=>statusHandler(event,order._id)} value= {order.status} className="w-full md:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
