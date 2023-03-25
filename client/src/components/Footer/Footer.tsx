import { Icon } from '@iconify/react';
import { Container } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <footer className='py-4 bg-custom-red min-h-[35vh] flex items-center'>
      <div className='grid sm:grid-cols-4 sm:justify-items-center  align-middle max-w-6xl m-auto gap-2 sm:gap-0'>
        <div></div>
        <div className=''>
          <h2 className='font-semibold text-white'>ABOUT US</h2>
          <p className='text-xs mt-1 text-white '>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti
            vel tenetur blanditiis? Soluta quam est debitis, quae molestiae
            aliquid reiciendis. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Iure, obcaecati.
          </p>
        </div>
        <div className=''>
          <h2 className='font-semibold  text-white '>CUSTOMER SERVICE</h2>
          <ul className='flex flex-col gap-2 mt-1'>
            <li className='text-white text-xs'>Our Location</li>
            <li className='text-white text-xs'>Terms and Conditions</li>
            <li className='text-white text-xs'>Feedback</li>
            <li className='text-white text-xs'>Contact Us</li>
          </ul>
        </div>
        <div className=''>
          <h2 className='font-semibold  text-white '>CONNECT WITH US</h2>
          <ul className='flex  gap-2 mt-1'>
            <li className='text-white text-xl'>
              <Icon icon='ic:twotone-facebook' />
            </li>
            <li className='text-white text-xl'>
              <Icon icon='ph:instagram-logo-fill' />
            </li>
            <li className='text-white text-xl'>
              <Icon icon='mdi:linkedin' />
            </li>
            <li className='text-white text-xl'>
              <Icon icon='ant-design:twitter-circle-filled' />
            </li>
          </ul>
        </div>
        {/* <div className=''>
            <h2 className='font-semibold  text-white '>CONTACT US</h2>
            <ul className='flex flex-col gap-2 mt-1'>
              <li className='text-white text-xs'>CONTACT US</li>
              <li className='text-white text-xs'>TERMS AND CONDITIONS</li>
              <li className='text-white text-xs'>FEEDBACK</li>
            </ul>
          </div> */}
      </div>
    </footer>
  );
};

export default Footer;
