import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    const hasFewImages = image.length < 3; // Check if images are less than 3

    return (
        <Link 
            onClick={() => scrollTo(0, 0)} 
            className='relative block text-gray-700 cursor-pointer group' 
            to={`/product/${id}`}
        >
            {/* Product Card */}
            <div className='relative rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1'>

                {/* Product Image */}
                <div className='relative'>
                    <img 
                        className='w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105' 
                        src={image[0]} 
                        alt={name} 
                    />

                    {/* Low Image Warning Badge */}
                    {hasFewImages && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            Low Images
                        </span>
                    )}
                </div>

                {/* Price (Always Visible) */}
                <div className="text-center text-gray-800 font-bold text-lg mt-2">
                    {currency}{price}
                </div>

                {/* Product Details (Shown on Hover) */}
                <div className='absolute bottom-0 left-0 w-full bg-black bg-opacity-75 text-white p-3 opacity-0 translate-y-full transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0'>
                    <p className='text-sm'>{name}</p>
                </div>

            </div>
        </Link>
    );
};

export default ProductItem;
