import React from "react";

export const BookCard = ({ index, data }) => {
  return (
    <div
      className="p-5 rounded-2xl shadow-sm shadow-white/50 transform transition duration-500 ease-in-out hover:scale-110  backdrop-blur-[5px] text-[#FAF9F6]"
      key={index}
    >
      <h1 className="text-2xl font-bold">{data.author}</h1>
      <p>{data.summary}</p>
    </div>
  );
};
