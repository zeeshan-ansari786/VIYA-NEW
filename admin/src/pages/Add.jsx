import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [availableSizes, setAvailableSizes] = useState([]); // Dynamically updates available sizes

  // Category-wise subcategory mapping
  const subCategories = {
    "Storage & organisation": ["Bookcases & Shelving Units", "Storage Solution Systems", "Cabinets & Media Furniture"],
    "Furniture": ["Tables & Chairs", "Desks", "Wardrobes & Dressers"],
    "Sofas & armchairs": ["Recliners", "Sectional Sofas", "Loveseats"],
    "Office furniture": ["Office Chairs", "Office Desks", "Filing Cabinets"],
    "Beds & mattresses": ["Single Beds", "Double Beds", "Memory Foam Mattresses"],
    "Outdoor products": ["Garden Furniture", "Hammocks", "Outdoor Storage"],
  };

  // Category-wise available sizes
  const sizeOptions = {
    "Storage & organisation": ["SMALL", "MEDIUM", "LARGE"],
    "Furniture": ["SMALL", "MEDIUM", "LARGE", "EXTRA LARGE"],
    "Sofas & armchairs": ["2-SEATER", "3-SEATER", "4-SEATER"],
    "Office furniture": ["STANDARD", "LARGE"],
    "Beds & mattresses": ["SINGLE", "DOUBLE", "KING", "QUEEN"],
    "Outdoor products": ["COMPACT", "MEDIUM", "LARGE"],
  };

  // Handle category change
  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setSubCategory(""); // Reset subcategory on category change
    setSizes([]); // Reset selected sizes
    setAvailableSizes(sizeOptions[selectedCategory] || []); // Update available sizes based on category
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

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setCategory("");
        setSubCategory("");
        setSizes([]);
        setBestseller(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      {/* Image Upload */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((num) => (
            <label key={num} htmlFor={`image${num}`}>
              <img
                className="w-20"
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

      {/* Product Name & Description */}
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Type here" required />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full max-w-[500px] px-3 py-2" type="text" placeholder="Write content here" required />
      </div>

      {/* Category & Subcategory Selection */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => handleCategoryChange(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="">Select Category</option>
            {Object.keys(subCategories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Subcategory */}
        <div>
          <p className="mb-2">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
            disabled={!category}
          >
            <option value="">Select Sub Category</option>
            {category &&
              subCategories[category].map((subCat) => (
                <option key={subCat} value={subCat}>
                  {subCat}
                </option>
              ))}
          </select>
        </div>

        {/* Price Input */}
        <div>
          <p className="mb-2">Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full px-3 py-2 sm:w-[120px]" type="number" placeholder="25" />
        </div>
      </div>

      {/* Product Sizes - Dynamic Based on Category */}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {availableSizes.map((size) => (
            <div key={size} onClick={() => setSizes((prev) =>
                prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
              )}
            >
              <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
          <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>

      {/* Submit Button */}
      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
