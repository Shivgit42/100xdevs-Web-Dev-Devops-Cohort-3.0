export const SidebarClass1 = () => {
  return (
    <div className="flex">
      <div className="w-0 h-screen md:w-80 transition-all duration-300 md:translate-x-0 -translate-x-80 ">
        Sidebar
      </div>
      <div className="w-full h-screen bg-red-400">Content</div>
    </div>
  );
};
