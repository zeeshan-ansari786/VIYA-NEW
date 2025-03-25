import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );

      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 md:p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Page</h3>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border border-gray-300 bg-white shadow-md hover:shadow-lg transition-all duration-300 p-4 md:p-6 rounded-lg"
            key={index}
          >
            {/* Order Icon */}
            <img
              className="w-14 h-14 object-cover rounded-md"
              src={assets.parcel_icon}
              alt="Order Icon"
            />

            {/* Order Details */}
            <div>
              {order.items.map((item, idx) => (
                <p key={idx} className="text-gray-700 py-0.5">
                  {item.name} x {item.quantity} <span>{item.size}</span>
                  {idx !== order.items.length - 1 && ","}
                </p>
              ))}
              <p className="mt-3 font-medium text-gray-900">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="text-gray-600">
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>
              <p className="text-gray-700">{order.address.phone}</p>
            </div>

            {/* Order Summary */}
            <div className="text-gray-800">
              <p className="text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>
                Payment:{" "}
                <span
                  className={
                    order.payment ? "text-green-600 font-semibold" : "text-red-600 font-semibold"
                  }
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Order Amount */}
            <p className="text-[15px] font-bold text-gray-900">
              {currency}
              {order.amount}
            </p>

            {/* Order Status Dropdown */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 font-semibold bg-gray-100 border border-gray-300 rounded-md text-gray-800 cursor-pointer hover:bg-gray-200 transition"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
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
