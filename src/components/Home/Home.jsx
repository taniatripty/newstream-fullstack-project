import React from 'react';

import TrendingSlider from '../TrendingSlider/TrendingSlider';
import UserStatistics from '../UserStatistics/UserStatistics';
import PlansSection from '../PlansSection/PlansSection';
import AllPublisher from '../../pages/Dashboard/AllPublisher/AllPublisher';
import SubscriptionPromptModal from '../SubscriptionPromptModal/SubscriptionPromptModal';
import FactsAndStats from '../FactsAndStats/FactsAndStats';
import LatestNews from '../LatestNews/LatestNews';
import MostReadArticles from '../MostReadArticles/MostReadArticles';
import NewsletterSignup from '../NewsletterSignup/NewsletterSignup';
import ShowReviews from '../Reviews/ShowReviews';


const Home = () => {
    return (
        <div>
            <TrendingSlider></TrendingSlider>
            <LatestNews></LatestNews>
            <MostReadArticles></MostReadArticles>
            <SubscriptionPromptModal></SubscriptionPromptModal>
            <UserStatistics></UserStatistics>
            <AllPublisher></AllPublisher>
            <PlansSection></PlansSection>
         <ShowReviews></ShowReviews>
        
         <NewsletterSignup></NewsletterSignup>
         <FactsAndStats></FactsAndStats>
        </div>
    );
};

export default Home;