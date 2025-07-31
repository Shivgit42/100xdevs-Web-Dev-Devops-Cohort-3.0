import { motion } from "framer-motion";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { LayersIcon } from "../icons/LayersIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LinkIcon } from "../icons/LinkIcon";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Sidebar = ({
  onSelectType,
  selectedType,
}: {
  onSelectType: (
    type: "twitter" | "youtube" | "document" | "link" | "tag" | null
  ) => void;
  selectedType: "twitter" | "youtube" | "document" | "link" | "tag" | null;
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("You have been successfully logged out", {
      duration: 3000,
      style: {
        background: "#1e293b",
        color: "#f8fafc",
      },
      icon: "👋",
    });
    navigate("/signup");
  };

  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="h-screen bg-white dark:bg-gray-900 top-0 left-0 w-72 fixed border-r border-gray-200 shadow-md pl-6 z-50 flex flex-col justify-between"
    >
      <div>
        <div className="flex text-2xl pt-6 items-center">
          <div className="pr-2">
            <Logo />
          </div>
          <span className="text-[#1f2937] font-semibold tracking-tight dark:text-white">
            ReBrain
          </span>
        </div>

        <div className="pt-10 space-y-2">
          <SidebarItem
            text="All Notes"
            icon={<LayersIcon className="w-6 h-6" />}
            isActive={selectedType === null}
            onClick={() => onSelectType(null)}
          />
          <SidebarItem
            text="Twitter"
            icon={<TwitterIcon className="w-6 h-6" />}
            isActive={selectedType === "twitter"}
            onClick={() => onSelectType("twitter")}
          />
          <SidebarItem
            text="Youtube"
            icon={<YoutubeIcon className="w-6 h-6" />}
            isActive={selectedType === "youtube"}
            onClick={() => onSelectType("youtube")}
          />
          <SidebarItem
            text="Documents"
            icon={<DocumentIcon className="w-6 h-6" />}
            isActive={selectedType === "document"}
            onClick={() => onSelectType("document")}
          />
          <SidebarItem
            text="Links"
            icon={<LinkIcon className="w-6 h-6" />}
            isActive={selectedType === "link"}
            onClick={() => onSelectType("link")}
          />
          <SidebarItem
            text="Tags"
            icon={<DocumentIcon className="w-6 h-6" />}
            isActive={selectedType === "tag"}
            onClick={() => onSelectType("tag")}
          />
        </div>
      </div>

      {/* Logout */}
      <div className="mt-auto px-4 pb-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 max-w-48 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-lg transition-colors duration-200 group cursor-pointer"
        >
          <LogOut className="h-5 w-5 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
          <span className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
            Sign out
          </span>
        </button>
      </div>
    </motion.div>
  );
};
