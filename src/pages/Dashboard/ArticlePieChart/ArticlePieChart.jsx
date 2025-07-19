import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure/useAxiosSecure";

const ArticlePieChart = () => {
  const [data, setData] = useState([["Publisher", "Articles"]]);
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

      // Convert to chart data format
      const chartData = [["Publisher", "Articles"]];
      Object.entries(publisherCounts).forEach(([publisher, count]) => {
        chartData.push([publisher, count]);
      });

      setData(chartData);
    });
  }, [axiosSecure]);

  return (
    <div className="max-w-4xl mb-6 mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Article Distribution by Publisher</h2>
      <Chart
        chartType="PieChart"
        data={data}
        options={{
          pieHole: 0.4,
          is3D: false,
          slices: [{ color: '#3366CC' }, { color: '#DC3912' }, { color: '#FF9900' }],
        }}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default ArticlePieChart;
