import React from 'react';
import TrendingTicker from '../TrendingTicker/TrendingTicker';
import TrendingSlider from '../TrendingSlider/TrendingSlider';
import UserStatistics from '../UserStatistics/UserStatistics';
import PlansSection from '../PlansSection/PlansSection';
import AllPublisher from '../../pages/Dashboard/AllPublisher/AllPublisher';
import SubscriptionPromptModal from '../SubscriptionPromptModal/SubscriptionPromptModal';
import FactsAndStats from '../FactsAndStats/FactsAndStats';


const Home = () => {
    return (
        <div>
            <TrendingSlider></TrendingSlider>
            <SubscriptionPromptModal>s</SubscriptionPromptModal>
            <UserStatistics></UserStatistics>
            <AllPublisher></AllPublisher>
            <PlansSection></PlansSection>
         <TrendingTicker></TrendingTicker>
         <FactsAndStats></FactsAndStats>
        </div>
    );
};

export default Home;