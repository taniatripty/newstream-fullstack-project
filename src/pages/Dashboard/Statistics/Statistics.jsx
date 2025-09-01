import React from 'react';
import UserStatistics from '../../../components/UserStatistics/UserStatistics';
import FactsAndStats from '../../../components/FactsAndStats/FactsAndStats';

const Statistics = () => {
    return (
        <div>
          <div className='flex justify-center items-center mt-6  '>
            <h2 className=' text-2xl font-bold'>User Statistics</h2>
          </div>
            <UserStatistics></UserStatistics>
             <div className='flex justify-center items-center mt-6  '>
            <h2 className=' text-2xl font-bold'> Article Statistics</h2>
          </div>
            <FactsAndStats></FactsAndStats>
        </div>
    );
};

export default Statistics;