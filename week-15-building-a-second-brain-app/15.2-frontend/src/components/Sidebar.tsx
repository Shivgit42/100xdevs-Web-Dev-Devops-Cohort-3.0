import { motion } from "framer-motion";
import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { LayersIcon } from "../icons/LayersIcon";
import { DocumentIcon } from "../icons/DocumentIcon";
import { LinkIcon } from "../icons/LinkIcon";

export const Sidebar = ({
  onSelectType,
  selectedType,
}: {
  onSelectType: (
    type: "twitter" | "youtube" | "document" | "link" | "tag" | null
  ) => void;
  selectedType: "twitter" | "youtube" | "document" | "link" | "tag" | null;
}) => {
  return (
    <motion.div
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="h-screen bg-white dark:bg-gray-900 top-0 left-0 w-72 fixed border-r border-gray-200 shadow-md pl-6 z-50"
    >
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
    </motion.div>
  );
};
