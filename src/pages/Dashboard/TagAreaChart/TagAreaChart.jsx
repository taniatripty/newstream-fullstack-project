import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import useAxiosSecure from "../../../hooks/useAuth/useAxiosSecure/useAxiosSecure";

const TagAreaChart = () => {
  const [data, setData] = useState([["Tag", "Percentage"]]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/articles").then((res) => {
      const articles = res.data;

      // Count tags across all articles
      const tagCounts = {};
      articles.forEach((article) => {
        if (Array.isArray(article.tags)) {
          article.tags.forEach((tag) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
      });

      const totalTags = Object.values(tagCounts).reduce((sum, count) => sum + count, 0);

      const chartData = [["Tag", "Percentage"]];
      Object.entries(tagCounts).forEach(([tag, count]) => {
        const percentage = parseFloat(((count / totalTags) * 100).toFixed(2));
        chartData.push([tag, percentage]);
      });

      setData(chartData);
    });
  }, [axiosSecure]);

  const options = {
    title: "Percentage of Articles by Tag",
    hAxis: { title: "Tag" },
    vAxis: { title: "Percentage (%)" },
    legend: "none",
    areaOpacity: 0.3,
    colors: ['#1E88E5'],
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Article Percentage by Tags</h2>
      <Chart
        chartType="AreaChart"
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default TagAreaChart;
