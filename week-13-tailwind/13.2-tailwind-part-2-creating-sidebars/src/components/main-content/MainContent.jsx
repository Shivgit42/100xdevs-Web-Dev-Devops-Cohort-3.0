export const MainContent = () => {
  return (
    <div className="w-full">
      <div className="h-40 bg-black hidden md:block"></div>
      <div className="w-full grid grid-cols-10 gap-6 p-8">
        <div className="h-80 bg-red-200 rounded-2xl col-span-10 hidden md:block md:col-span-2 -translate-y-24 shadow-lg "></div>
        <div className="h-80 bg-green-200 rounded-2xl col-span-10 md:col-span-5 shadow-lg"></div>
        <div className="h-80 bg-yellow-200 rounded-2xl col-span-10 md:col-span-3 shadow-lg"></div>
      </div>
    </div>
  );
};
