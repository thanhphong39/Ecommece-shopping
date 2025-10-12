import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadOrderData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItems = [];

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item.status = order.status;
            item.payment = order.payment;
            item.paymentMethod = order.paymentMethod;
            item.date = order.date;
            allOrdersItems.push(item);
          });
        });

        // Sắp xếp đơn hàng mới nhất lên trên
        setOrderData(allOrdersItems.reverse());
      } else {
        setError(response.data.message || "Không thể tải đơn hàng");
      }
    } catch (error) {
      console.error("Error loading orders:", error);
      setError("Có lỗi xảy ra khi tải đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t text-gray-300 pt-16">
      <div className="text-xl sm:text-2xl my-3">
        <Title text1={"YOUR"} text2={"ORDERS"} />
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-black"></div>
          <p className="mt-2 text-gray-600">Đang tải đơn hàng...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : orderData.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          <p>Bạn chưa có đơn hàng nào</p>
          <button
            onClick={() => navigate("/collection")}
            className="mt-4 bg-black text-white px-6 py-2 font-medium"
          >
            Mua sắm ngay
          </button>
        </div>
      ) : (
        <div>
          {orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t text-gray-600 flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20"
                  src={
                    item.image && item.image.length > 0
                      ? item.image[0]
                      : "/placeholder.jpg"
                  }
                  alt=""
                />
                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">
                      Price: {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-2">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-2">
                    Payment:{" "}
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`min-w-2 h-2 rounded-full ${
                      item.status === "Order Placed"
                        ? "bg-blue-500"
                        : item.status === "Shipped"
                        ? "bg-yellow-500"
                        : item.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="bg-black text-white px-6 py-2 font-medium"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
