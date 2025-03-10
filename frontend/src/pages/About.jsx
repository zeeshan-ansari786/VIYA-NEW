import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
              <b className='text-gray-800'>Welcome to VIYA - Your Destination for Elegant Furniture</b>
              <p>At VIYA, we believe that your home is more than just a place; it's a reflection of your personality, lifestyle, and memories. With this philosophy in mind, we are dedicated to bringing you exquisite furniture pieces that seamlessly blend functionality, comfort, and style.</p>
              <b className='text-gray-800'>Our Story</b>
              <p>Founded with a passion for design and a commitment to quality, VIYA was born out of the desire to provide homeowners with furniture that inspires. Our journey began with a simple mission: to curate a diverse range of furniture that transforms spaces into beautiful, welcoming havens. Whether you're furnishing your living room, bedroom, or workspace, we offer timeless designs that suit every taste and need.</p>
              <b className='text-gray-800'>Our Commitment</b>
              <p>At VIYA, we envision creating homes filled with warmth, comfort, and elegance. We continuously innovate to bring you trendy yet functional furniture that enhances your lifestyle.</p>
          </div>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <div className='flex flex-col justify-center gap-6  text-gray-600'>
        <b className='text-gray-800'>Our Vision</b>
        <p>
        At VIYA, we envision creating homes filled with warmth, comfort, and elegance. To enhance your shopping experience, we are introducing a VR-supported website that allows you to visualize how our furniture will look in your space before making a purchase.
        </p>
        <p>
        This innovative feature brings convenience and confidence to your design choices, ensuring your selections perfectly complement your home.
        </p>
        </div>
      </div>
      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE VIYA'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <p className=' text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Affordable Luxury:</b>
            <p className=' text-gray-600'>Beautiful designs that don't compromise your budget.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <p className=' text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping has ever been easier. We are committed to eco-friendly materials and responsible sourcing.</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <p className=' text-gray-600'>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
