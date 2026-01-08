const ShimmerMenu = () => {
  return (
    <div className="flex flex-col items-center">
      
      <div className="w-[150px] h-8 bg-gray-200 my-8 rounded animate-pulse"></div>

     
      <div className="w-[250px] h-5 bg-gray-200 rounded mb-2 animate-pulse"></div>
      <div className="w-[150px] h-5 bg-gray-200 rounded animate-pulse"></div>

      
      <div className="w-6/12 my-10">
        
        <div className="w-[180px] h-6 bg-gray-300 mb-6 rounded animate-pulse"></div>

        
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="flex justify-between items-start border-b py-6"
          >
            
            <div className="w-8/12">
              <div className="w-[120px] h-5 bg-gray-200 mb-3 rounded animate-pulse"></div>
              <div className="w-[80px] h-4 bg-gray-200 mb-4 rounded animate-pulse"></div>

              <div className="w-full h-4 bg-gray-200 mb-2 rounded animate-pulse"></div>
              <div className="w-10/12 h-4 bg-gray-200 mb-2 rounded animate-pulse"></div>
              <div className="w-6/12 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>

            
            <div className="relative w-[180px] h-[120px]">
              <div className="w-full h-full bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[70px] h-7 bg-gray-300 rounded-xl animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShimmerMenu;
