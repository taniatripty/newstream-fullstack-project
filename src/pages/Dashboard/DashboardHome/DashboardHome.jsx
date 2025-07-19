import ArticleCharts from "../ArticleCharts/ArticleCharts";
import ArticlePieChart from "../ArticlePieChart/ArticlePieChart";
import TagAreaChart from "../TagAreaChart/TagAreaChart";

const DashboardHome = () => {
  return (
    <div>
      <ArticleCharts></ArticleCharts>
      <ArticlePieChart></ArticlePieChart>
      <TagAreaChart></TagAreaChart>
    </div>
  );
};

export default DashboardHome;
