import React from 'react';
import ArticleCharts from '../ArticleCharts/ArticleCharts';
import ArticlePieChart from '../ArticlePieChart/ArticlePieChart';

const DashboardHome = () => {
    return (
        <div>
             <ArticleCharts></ArticleCharts>
    <ArticlePieChart></ArticlePieChart>
        </div>
    );
};

export default DashboardHome;