import { useState } from "react";
import { SidebarIcon } from "../icons/SidebarIcon";
import { useEffect } from "react";

export const Sidebar4 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (isDesktop == false) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isDesktop]);

  if (!isSidebarOpen) {
    return (
      <div className="fixed top-0 left-0">
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="cursor-pointer hover:bg-slate-200"
        >
          <SidebarIcon />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-80 h-screen top-0 left-0 bg-red-100 absolute md:relative">
        <div
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="cursor-pointer hover:bg-slate-200"
        >
          <SidebarIcon />
        </div>
      </div>
    );
  }
};

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};
