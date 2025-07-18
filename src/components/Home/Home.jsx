import React from 'react';
import TrendingTicker from '../TrendingTicker/TrendingTicker';
import TrendingSlider from '../TrendingSlider/TrendingSlider';


const Home = () => {
    return (
        <div>
            <TrendingSlider></TrendingSlider>
         <TrendingTicker></TrendingTicker>
        </div>
    );
};

export default Home;