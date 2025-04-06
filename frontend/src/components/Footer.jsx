import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm'>

        <div>
            <a href='/'><img src={assets.logo} className='mb-5 w-32' alt="" /></a>
            <div className='flex flex-col justify-center gap-6 md:w-9/10 text-gray-600'>
          
            <p>
            When you visit VIYA store, make yourself at home in our many room settings in the store. Squeeze the upholsteries, feel the oriental rugs, try the sofa beds and open the cabinets to feel the quality. On the price tag, you’ll find all you need to know about a product, including where in the store you can pick it up.
            </p>
            <p>
            Since most VIYA furniture is flat-packed, they are quite easy to bring home when you buy from the store.
            </p>
            </div>
        </div>

        <div>
            <p><br /><br /></p>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li><a href='/'>Home</a></li>
                <li><a href='/about'>About us</a></li>
                <li><a href='/contact'>Contact Us</a></li>
                <li><a href='/'>Privacy policy</a></li>
            </ul>
        </div>

        <div>
            <p><br /><br /></p>
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
