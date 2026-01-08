
import React from "react";

const Shimmer = () => {
  return (
    <div className="max-w-[1250px] mx-auto mt-20 px-4">
      
      {/* Top section (Categories) */}
      <div className="mb-16 pb-6 shadow-[inset_0_-1px_0_rgba(255,255,255,1),_0_1px_0_rgba(0,0,0,0.12)]">
        <div className="w-[250px] h-4 bg-gray-200 mb-10 animate-pulse"></div>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {Array(7)
            .fill("")
            .map((_, i) => (
              <div
                key={i}
                className="min-w-[120px] h-[120px] sm:min-w-[150px] sm:h-[150px] rounded-full bg-gray-300 animate-pulse"
              />
            ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-6 mb-8">
        <div className="w-[200px] h-5 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="w-[260px] h-5 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Restaurant Cards */}
      <div className="flex flex-wrap justify-center gap-6">
        {Array(8)
          .fill("")
          .map((_, i) => (
            <div
              key={i}
              className="w-[260px] rounded-2xl bg-gray-200 p-3 animate-pulse"
            >
              <div className="w-full h-[180px] bg-gray-300 rounded-xl mb-4"></div>
              <div className="w-40 h-3 bg-gray-300 rounded mb-3"></div>
              <div className="w-28 h-3 bg-gray-300 rounded"></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Shimmer;

