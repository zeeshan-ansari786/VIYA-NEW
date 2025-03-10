import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} className='mb-5 w-32' alt="" />
            <div className='flex flex-col justify-center gap-6 md:w-9/10 text-gray-600'>
            <p>
            Whether you just moved into a new home or looking to revamp your current one, we at VIYA are here to inspire you with affordable home furniture solutions, there is a piece of furniture to every corner of your home. Create a home that is perfect for you.
            </p>
            <p>
            Shopping at VIYA is a bit different and exciting compared to your shopping at an everyday retail. It is about experiencing solutions first hand and getting to know ideas and inspirations that can fit perfectly into your home. That’s why, we offer more than 7500 products, solutions at our store along with home furnishing ideas and services for you to explore.
            </p>
            <p>
            When you visit VIYA store, make yourself at home in our many room settings in the store. Squeeze the upholsteries, feel the oriental rugs, try the sofa beds and open the cabinets to feel the quality. On the price tag, you’ll find all you need to know about a product, including where in the store you can pick it up.
            </p>
            <p>
            Since most VIYA furniture is flat-packed, they are quite easy to bring home when you buy from the store.
            </p>
            </div>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li>+1-212-456-7890</li>
                <li>contact@viya.com</li>
            </ul>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2025@ viya.com - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
