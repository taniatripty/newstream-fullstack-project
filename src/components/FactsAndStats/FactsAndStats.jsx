// import React, { useEffect, useState } from "react";
// import CountUp from "react-countup";
// import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";


// const FactsAndStats = () => {
//   const axiosSecure = useAxiosSecure();
//   const [articleCount, setArticleCount] = useState(0);
//   const [publisherCount, setPublisherCount] = useState(0);
//   const [tagCount, setTagCount] = useState(0);

//   useEffect(() => {
//     axiosSecure.get("/articles").then((res) => {
//       const articles = res.data;

//       // Total articles
//       setArticleCount(articles.length);

//       // Unique publishers
//       const uniquePublishers = new Set(articles.map((a) => a.publisher));
//       setPublisherCount(uniquePublishers.size);

//       // Unique tags
//       const tags = articles.flatMap((a) => a.tags || []);
//       const uniqueTags = new Set(tags);
//       setTagCount(uniqueTags.size);
//     });
//   }, [axiosSecure]);

//   return (
//     <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-14 px-6 rounded my-10">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
//         <div>
//           <h3 className="text-4xl font-bold">
//             <CountUp end={articleCount} duration={2} />+
//           </h3>
//           <p className="text-lg mt-2">Articles Published</p>
//         </div>
//         <div>
//           <h3 className="text-4xl font-bold">
//             <CountUp end={publisherCount} duration={2} />+
//           </h3>
//           <p className="text-lg mt-2">Active Publishers</p>
//         </div>
//         <div>
//           <h3 className="text-4xl font-bold">
//             <CountUp end={tagCount} duration={2} />+
//           </h3>
//           <p className="text-lg mt-2">Unique Categories</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FactsAndStats;
import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import useAxiosSecure from "../../hooks/useAuth/useAxiosSecure/useAxiosSecure";

const FactsAndStats = () => {
  const axiosSecure = useAxiosSecure();
  const [articleCount, setArticleCount] = useState(0);
  const [publisherCount, setPublisherCount] = useState(0);
  const [tagCount, setTagCount] = useState(0);

  useEffect(() => {
    axiosSecure.get("/articles").then((res) => {
      const articles = res.data;

      // total articles
      setArticleCount(articles.length);

      // unique publishers
      const uniquePublishers = new Set(articles.map((a) => a.publisher));
      setPublisherCount(uniquePublishers.size);

      // unique tags
      const tags = articles.flatMap((a) => a.tags || []);
      const uniqueTags = new Set(tags);
      setTagCount(uniqueTags.size);
    });
  }, [axiosSecure]);

  const stats = [
    { count: articleCount, label: "Articles Published", color: "indigo-600" },
    { count: publisherCount, label: "Active Publishers", color: "green-600" },
    { count: tagCount, label: "Unique Categories", color: "purple-600" },
  ];

  return (
    <div className="py-6 px-6 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1  md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative shadow-2xl rounded-xl p-[3px] overflow-hidden"
          >
            {/* moving border */}
            <div className="absolute inset-0 rounded-xl borderAnim"></div>

            {/* inner card */}
            <div className="relative bg-white rounded-xl p-8 flex flex-col items-center shadow-md">
              <h3 className={`text-5xl font-extrabold text-${stat.color}`}>
                <CountUp end={stat.count} duration={2} />+
              </h3>
              <p className="text-lg font-medium text-gray-700 mt-3">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactsAndStats;
