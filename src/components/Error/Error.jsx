import React from 'react';
import { Link } from 'react-router';
import errorpic from '../../assets/error.gif'

const Error = () => {
    return (
          <div className='min-h-screen'>
            <h2 className='text-2xl font-bold text-center relative top-32'>Opps page is not found</h2>
            <div className='flex justify-center  '>
                
            <img  className='rounded-4xl  lg:h-[520px]'  src={errorpic} alt="" />
            </div>
            <h2 className='text-center text-2xl font-bold relative -top-28'>Looks like you're lost</h2>
            <p className='text-center text-sm text-gray-500  relative -top-28'>The page you are looking for is not available!</p>
            <div className='flex justify-center'>
                <Link to='/'>
            <button className=' btn relative -top-24 bg-green-700 mb-8 text-white rounded-4xl px-6'> please Go Home</button>
            </Link>
            </div>
        </div>
    );
};

export default Error;