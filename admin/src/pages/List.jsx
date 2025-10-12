import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="flex flex-col gap-6 pt-16 pl-[25%] text-[15px] w-[90vw] max-w-[1500px] mx-auto bg-gray-50 rounded-lg shadow-md p-6">
      <p className="mb-4 text-2xl font-bold text-gray-800 border-b pb-2">
        All Product List
      </p>
      <div className="flex flex-col gap-4">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 bg-gray-200 text-base font-semibold rounded-lg shadow-sm">
          <b className="text-gray-700">Image</b>
          <b className="text-gray-700">Name</b>
          <b className="text-gray-700">Category</b>
          <b className="text-gray-700">Price</b>
          <b className="text-center text-gray-700">Action</b>
        </div>

        {list.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 bg-white text-base rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <img
              className="w-20 h-20 object-cover rounded-md border border-gray-300"
              src={item.image[0]}
              alt=""
            />
            <p className="text-gray-800 font-medium">{item.name}</p>
            <p className="text-gray-600">{item.category}</p>
            <p className="text-gray-800 font-semibold">
              {currency}
              {item.price}
            </p>
            <div className="flex gap-3 justify-center">
              <button className="bg-pink-300 text-white px-4 py-2 rounded-lg text-base hover:bg-pink-500 transition-colors">
                Edit
              </button>
              <button
                onClick={() => removeProduct(item._id)}
                className="bg-black text-white px-4 py-2 rounded-lg text-base hover:bg-gray-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
