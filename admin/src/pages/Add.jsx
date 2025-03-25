import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // Category & Size Mapping
  const categories = {
    "Storage & Organisation": ["Bookcases", "Shelving", "Cabinets"],
    "Furniture": ["Tables", "Chairs", "Desks"],
    "Sofas & Armchairs": ["Recliners", "Sectionals", "Loveseats"],
    "Office Furniture": ["Office Chairs", "Office Desks", "Cabinets"],
    "Beds & Mattresses": ["Single Beds", "Double Beds", "Memory Foam"],
    "Outdoor Products": ["Garden Furniture", "Hammocks", "Storage"],
  };

  const sizeOptions = {
    "Storage & Organisation": ["Small", "Medium", "Large"],
    "Furniture": ["Small", "Medium", "Large", "XL"],
    "Sofas & Armchairs": ["1-Seater", "2-Seater", "3-Seater"],
    "Office Furniture": ["Standard", "Large"],
    "Beds & Mattresses": ["Single", "Double", "King", "Queen"],
    "Outdoor Products": ["Compact", "Medium", "Large"],
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setSubCategory("");
    setSizes([]);
  };

  const toggleSize = (size) => {
    setSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setPrice("");
        setCategory("");
        setSubCategory("");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full max-w-2xl mx-auto p-8 bg-gray-100 text-gray-900 rounded-lg shadow-xl"
    >
      {/* Upload Image */}
      <div>
        <p className="mb-2 font-semibold text-lg text-gray-700">Upload Images</p>
        <div className="flex gap-3">
          {[1, 2, 3, 4].map((num) => (
            <label key={num} htmlFor={`image${num}`} className="cursor-pointer">
              <img
                className="w-24 h-24 border-2 border-gray-400 rounded-lg hover:border-blue-500 transition"
                src={!eval(`image${num}`) ? assets.upload_area : URL.createObjectURL(eval(`image${num}`))}
                alt=""
              />
              <input
                onChange={(e) => eval(`setImage${num}(e.target.files[0])`)}
                type="file"
                id={`image${num}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div>
        <label className="block text-lg font-medium mt-4 text-gray-700">Product Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          type="text"
          required
        />
      </div>

      <div>
        <label className="block text-lg font-medium mt-4 text-gray-700">Description</label>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      {/* Category & Subcategory */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1">
          <label className="block text-lg font-medium mt-4 text-gray-700">Category</label>
          <select
            onChange={(e) => handleCategoryChange(e.target.value)}
            value={category}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-lg font-medium mt-4 text-gray-700">Subcategory</label>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            disabled={!category}
          >
            <option value="">Select</option>
            {category &&
              categories[category].map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between mt-4">
  {/* Size Selection */}
  {category && sizeOptions[category] && (
    <div className="flex-1">
      <p className="text-lg font-medium text-gray-700">Available Sizes</p>
      <div className="flex flex-wrap gap-4 mt-1">
        {sizeOptions[category].map((size) => (
          <label key={size} className="flex items-center gap-2 text-gray-800 text-base">
            <input type="checkbox" checked={sizes.includes(size)} onChange={() => toggleSize(size)} />
            {size}
          </label>
        ))}
      </div>
    </div>
  )}

  {/* Bestseller Checkbox (Aligned & Styled) */}
  <div className="flex items-center mt-6">
    <input type="checkbox" id="bestseller" checked={bestseller} onChange={() => setBestseller(!bestseller)} />
    <label htmlFor="bestseller" className="ml-2 text-lg text-gray-700 font-medium">Bestseller</label>
  </div>
</div>


      {/* Submit Button */}
      <button className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-500 transition text-white rounded-lg text-lg font-semibold">
        ADD PRODUCT
      </button>
    </form>
  );
};

export default Add;
