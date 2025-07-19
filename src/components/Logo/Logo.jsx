import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import news from '../../assets/newstream.jpg'

const colors = ["#e11d48", "#2563eb", "#10b981", "#f59e0b", "#8b5cf6"];

const Logo = () => {
  const words = ["News", "Stream"];
  const { text, count } = useTypewriter({
    words,
    loop: 0,
    typeSpeed: 120,
    deleteSpeed: 40,
    delaySpeed: 1500,
  });

  const activeIndex = words.findIndex((w) => {
    if (!text) return false;
    return w.startsWith(text) || text.startsWith(w);
  });

  return (
    <div className="flex items-center gap-4 select-none cursor-pointer">
      {/* Circle icon with gradient background */}
      <div className="w-8 h-8 rounded-full  shadow-lg flex items-center justify-center">
        <img
          src={news}
          alt="NewsStream Logo"
          className="w-10 h-10 object-cover rounded-full"
        />
      </div>

      {/* Animated Text with Glow */}
      <h1 className="text-xl font-extrabold tracking-wide flex flex-wrap items-center">
        {words.map((word, index) => {
          const isActive = index === activeIndex;
          const color = isActive
            ? colors[(count + index) % colors.length]
            :  "#6b7280"; // gray-500 fallback

          return (
            <span
              key={index}
              style={{
                color,
                textShadow: isActive ? `0 0 8px ${color}` : "none",
                transition: "all 0.3s ease",
              }}
              className="mr-2"
            >
              {isActive ? text : word}
            </span>
          );
        })}
        <Cursor />
      </h1>
    </div>
  );
};

export default Logo;
