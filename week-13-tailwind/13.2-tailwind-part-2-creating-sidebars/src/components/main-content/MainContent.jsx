export const MainContent = () => {
  return (
    <div className="w-full">
      <div className="h-40 bg-black"></div>
      <div className="w-full grid grid-cols-10 gap-6 mx-10">
        <div className="h-80 bg-red-200 rounded-2xl col-span-2 -translate-y-12 shadow-lg"></div>
        <div className="h-80 bg-green-200 rounded-2xl col-span-5 mt-24 shadow-lg"></div>
        <div className="h-80 bg-yellow-200 rounded-2xl col-span-3 mt-24 shadow-lg"></div>
      </div>
    </div>
  );
};
