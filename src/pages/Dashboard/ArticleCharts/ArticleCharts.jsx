import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure/useAxiosSecure";


const ArticleCharts = () => {
  const [articleData, setArticleData] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/articles").then((res) => {
      const articles = res.data;

      // Count articles by publisher
      const publisherCounts = {};
      articles.forEach((article) => {
        const publisher = article.publisher;
        publisherCounts[publisher] = (publisherCounts[publisher] || 0) + 1;
      });

      // Prepare chart data
      const chartArray = [["Publisher", "Articles"]];
      Object.entries(publisherCounts).forEach(([publisher, count]) => {
        chartArray.push([publisher, count]);
      });

      setArticleData(chartArray);
    });
  }, [axiosSecure]);

  return (
    <div className="max-w-4xl mx-auto space-y-12 p-4">
      
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">📈 Bar Chart: Number of Articles</h2>
        <Chart
          chartType="ColumnChart"
          data={articleData}
          options={{
            title: "Number of Articles per Publisher",
            legend: { position: "none" },
            hAxis: { title: "Publisher" },
            vAxis: { title: "Articles" },
            colors: ["#4CAF50"],
          }}
          width={"100%"}
          height={"400px"}
        />
      </div>
    </div>
  );
};

export default ArticleCharts;
