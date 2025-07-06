export const GridExample = () => {
  return (
    <div>
      <h2 className="mt-4 text-3xl font-bold">Grid Example using tailwind</h2>
      <div className="grid grid-cols-12">
        {/* First child occupying 4 columns */}
        <div className="bg-blue-600 col-span-4 p-2">Child 1</div>
        {/* Second child occupying 6 columns */}
        <div className="bg-red-600 col-span-6 p-2">Child 2</div>
        {/* Third child occupying 2 columns */}
        <div className="bg-yellow-600 col-span-2 p-2">Child 3</div>
      </div>
    </div>
  );
};
