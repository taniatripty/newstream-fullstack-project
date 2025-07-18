import React from 'react';
import TrendingTicker from '../TrendingTicker/TrendingTicker';
import TrendingSlider from '../TrendingSlider/TrendingSlider';
import UserStatistics from '../UserStatistics/UserStatistics';
import PlansSection from '../PlansSection/PlansSection';


const Home = () => {
    return (
        <div>
            <TrendingSlider></TrendingSlider>
            <UserStatistics></UserStatistics>
            <PlansSection></PlansSection>
         <TrendingTicker></TrendingTicker>
        </div>
    );
};

export default Home;