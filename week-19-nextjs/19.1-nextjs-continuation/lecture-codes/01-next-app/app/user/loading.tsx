export default function Loading() {
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="flex flex-col items-center space-y-3">
        <div className="w-10 h-10 border-4 border-black/50 border-t-transparent rounded-full animate-spin "></div>
        <p className="text-lg font-semibold text-gray-600">
          Loading<span className="animate-pulse">...</span>
        </p>
      </div>
    </div>
  );
}
