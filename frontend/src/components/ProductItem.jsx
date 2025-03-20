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
            {/* Product Image */}
            <div className='overflow-hidden relative rounded-lg shadow-md'>
                <img 
                    className='w-full h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110' 
                    src={image[0]} 
                    alt={name} 
                />

                {/* Low Image Warning Badge */}
                {hasFewImages && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        Low Images
                    </span>
                )}

                {/* Product Details (Shown on Hover) */}
                <div className='absolute bottom-0 left-0 w-full bg-black bg-opacity-70 text-white p-3 opacity-0 translate-y-full transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0'>
                    <p className='text-sm'>{name}</p>
                    <p className='text-sm font-medium'>{currency}{price}</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;