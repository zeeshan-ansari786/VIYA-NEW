import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(products || []);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const categoryList = {
    "Storage & Organisation": ["Bookcases & Shelving Units", "Storage Solution Systems", "Cabinets & Media Furniture"],
    "Furniture": ["Tables & Chairs", "Desks", "Wardrobes & Dressers"],
    "Sofas & Armchairs": ["Recliners", "Sectional Sofas", "Loveseats"],
    "Office Furniture": ["Office Chairs", "Office Desks", "Filing Cabinets"],
    "Beds & Mattresses": ["Single Beds", "Double Beds", "Memory Foam Mattresses"],
    "Outdoor Products": ["Garden Furniture", "Hammocks", "Outdoor Storage"],
  };

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory(prev => 
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...products];

    // Search Filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => 
        item.name && item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category Filter (Case-insensitive)
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => 
        item.category && category.some(cat => item.category.toLowerCase() === cat.toLowerCase())
      );
    }

    // Subcategory Filter (Case-insensitive)
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => 
        item.subCategory && subCategory.some(sub => item.subCategory.toLowerCase() === sub.toLowerCase())
      );
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let sortedProducts = [...filterProducts];

    if (sortType === 'low-high') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortType === 'high-low') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilterProducts(sortedProducts);
  };

  // 🛠 Debugging ke liye check karo ki products aa rahe hai ya nahi
  useEffect(() => {
    console.log("Products on first render:", products);
    if (products.length > 0) {
      applyFilter();
    }
  }, [products]); // ⬅️ Ensure ki products load hone ke baad hi filter apply ho

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt='' />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {Object.keys(categoryList).map((cat) => (
              <p key={cat} className='flex gap-2'>
                <input 
                  className='w-3' 
                  type='checkbox' 
                  value={cat} 
                  checked={category.includes(cat)}
                  onChange={toggleCategory} 
                /> 
                {cat}
              </p>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {category.flatMap(cat => categoryList[cat] || []).map(subCat => (
              <p key={subCat} className='flex gap-2'>
                <input 
                  className='w-3' 
                  type='checkbox' 
                  value={subCat} 
                  checked={subCategory.includes(subCat)}
                  onChange={toggleSubCategory} 
                /> 
                {subCat}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value='relevant'>Sort by: Relevant</option>
            <option value='low-high'>Sort by: Low to High</option>
            <option value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
